import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await axiosSecure.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleVerifyToggle = async (email) => {
    await axiosSecure.put(`/employees/${email}/verify`);
    fetchEmployees();
  };

  const handlePay = async (email) => {
    try {
      await axiosSecure.post(`/employees/${email}/pay`, {
        month,
        year,
      });
      toast("Payment successful");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const openPayModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Bank Account</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleVerifyToggle(employee.email)}
                  >
                    {employee.isVerified ? (
                      <Check color="success" />
                    ) : (
                      <Close color="error" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{employee.bank_account_no || "N/A"}</TableCell>
                <TableCell>${employee.salary}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => openPayModal(employee)}
                    disabled={!employee.isVerified}
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Payment */}
      {selectedEmployee && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h3>Pay {selectedEmployee.name}</h3>
            <TextField
              label="Salary"
              value={selectedEmployee.salary}
              fullWidth
              disabled
              margin="normal"
            />

            {/* Month Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Month</InputLabel>
              <Select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                label="Month"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((monthName, index) => (
                  <MenuItem key={index} value={monthName}>
                    {monthName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Year Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                label="Year"
              >
                {years.map((yearItem) => (
                  <MenuItem key={yearItem} value={yearItem}>
                    {yearItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={() => handlePay(selectedEmployee.email)}
              fullWidth
              sx={{ mt: 2 }}
            >
              Confirm Pay
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeList;

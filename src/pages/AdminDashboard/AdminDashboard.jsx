import  { useEffect, useState } from "react";
// Import the axiosSecure instance
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [openFireModal, setOpenFireModal] = useState(false);
  const [openSalaryModal, setOpenSalaryModal] = useState(false);
  const [employeeToFire, setEmployeeToFire] = useState(null);
  const [employeeToUpdateSalary, setEmployeeToUpdateSalary] = useState(null);
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    // Fetch the verified employees
    const fetchEmployees = async () => {
      try {
        const response = await axiosSecure.get("/verified-employees"); // Using axiosSecure
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleFireClick = (employee) => {
    setEmployeeToFire(employee);
    setOpenFireModal(true);
  };

  const handleFireConfirm = async () => {
    if (employeeToFire) {
      try {
        await axiosSecure.put(`/employees/${employeeToFire.email}/fire`); // Using axiosSecure
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.email === employeeToFire.email ? { ...emp, isFired: true } : emp
          )
        );
        setOpenFireModal(false);
      } catch (error) {
        console.error("Error firing employee:", error);
      }
    }
  };

  const handleFireCancel = () => {
    setOpenFireModal(false);
  };

  const handleMakeHR = async (email) => {
    try {
      await axiosSecure.put(`/employees/${email}/make-hr`); // Using axiosSecure
      setEmployees((prev) =>
        prev.map((emp) => (emp.email === email ? { ...emp, role: "HR" } : emp))
      );
    } catch (error) {
      console.error("Error promoting employee to HR:", error);
    }
  };

  const handleSalaryChangeClick = (employee) => {
    setEmployeeToUpdateSalary(employee);
    setNewSalary(employee.salary); // Set initial salary
    setOpenSalaryModal(true);
  };

  const handleSalaryConfirm = async () => {
    if (employeeToUpdateSalary && newSalary) {
      try {
        await axiosSecure.put(
          `/employees/${employeeToUpdateSalary.email}/salary`,
          { salary: newSalary }
        ); // Using axiosSecure
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.email === employeeToUpdateSalary.email
              ? { ...emp, salary: newSalary }
              : emp
          )
        );
        setOpenSalaryModal(false);
      } catch (error) {
        console.error("Error updating salary:", error);
      }
    }
  };

  const handleSalaryCancel = () => {
    setOpenSalaryModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Make HR</TableCell>
              <TableCell>Fire</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.email}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  {employee.role !== "HR" && !employee.isFired && (
                    <Button
                      onClick={() => handleMakeHR(employee.email)}
                      variant="contained"
                      color="primary"
                    >
                      Make HR
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {!employee.isFired ? (
                    <Button
                      onClick={() => handleFireClick(employee)}
                      variant="contained"
                      sx={{
                        backgroundColor: "error.main",
                        "&:hover": { backgroundColor: "error.dark" },
                      }}
                    >
                      Fire
                    </Button>
                  ) : (
                    <span>Fired</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSalaryChangeClick(employee)}
                    variant="contained"
                    color="success"
                  >
                    Adjust Salary
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal for Fire */}
      <Dialog open={openFireModal} onClose={handleFireCancel}>
        <DialogTitle>Confirm Fire Employee</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to fire {employeeToFire?.name}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFireCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFireConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Salary Adjustment */}
      <Dialog open={openSalaryModal} onClose={handleSalaryCancel}>
        <DialogTitle>Adjust Salary</DialogTitle>
        <DialogContent>
          <TextField
            label="New Salary"
            type="number"
            fullWidth
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSalaryCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSalaryConfirm} color="success">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

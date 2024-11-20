import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const DetailsPage = () => {
  const { slug } = useParams();
  const [employee, setEmployee] = useState(null);
  const [salaryHistory, setSalaryHistory] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axiosSecure.get(`/employees/${slug}`);
        const { employee, salaryHistory } = response.data;

        // Get current date and calculate one year ago
        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        // Transform, sort, and filter the salary history
        const filteredSalaryHistory = salaryHistory
          .map((record) => ({
            ...record,
            amount: Number(record.amount), // Ensure numeric `amount`
            date: new Date(`${record.month} 1, ${record.year}`), // Add a sortable date field
          }))
          .filter((record) => record.date >= oneYearAgo) // Include only last 12 months
          .sort((a, b) => a.date - b.date); // Sort by date

        setEmployee(employee);
        setSalaryHistory(filteredSalaryHistory);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployeeDetails();
  }, [slug]);

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      {/* Employee Overview */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Employee Overview
          </Typography>
          <Typography>Email: {employee.employeeEmail}</Typography>
          <Typography>
            Last Paid: {new Date(employee.paidAt).toLocaleString()}
          </Typography>
          <Typography>Last Payment Amount: ${employee.amount}</Typography>
        </CardContent>
      </Card>

      {/* Salary History Table */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Salary History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Paid At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryHistory.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.month}</TableCell>
                  <TableCell>{record.year}</TableCell>
                  <TableCell>${record.amount}</TableCell>
                  <TableCell>
                    {new Date(record.paidAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Salary Trend Bar Chart */}
      <Box sx={{ marginBottom: 3, maxWidth: "100%", overflowX: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Salary Trend (Last 12 Months)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={(record) => `${record.month} ${record.year}`} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DetailsPage;

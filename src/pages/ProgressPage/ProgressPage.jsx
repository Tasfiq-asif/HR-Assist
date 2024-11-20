import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { axiosSecure } from "../../hooks/useAxiosSecure";

const ProgressPage = () => {
  const [workEntries, setWorkEntries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Fetch all employees (unique emails)
    axiosSecure.get("/work-entries").then(({ data }) => {
      const uniqueEmployees = Array.from(
        new Set(data.map((entry) => entry.employeeEmail))
      );
      setEmployees(uniqueEmployees);
    });
  }, []);

  const fetchFilteredEntries = () => {
    axiosSecure
      .get("/work-entries", {
        params: {
          employeeEmail: selectedEmployee || undefined,
          month: selectedMonth || undefined,
        },
      })
      .then(({ data }) => setWorkEntries(data));
  };

  useEffect(() => {
    fetchFilteredEntries();
  }, [selectedEmployee, selectedMonth]);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          select
          label="Employee"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All Employees</MenuItem>
          {employees.map((email) => (
            <MenuItem key={email} value={email}>
              {email}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Month"
          type="month"
          value={selectedMonth || ""}
          onChange={(e) => setSelectedMonth(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true, // Keeps the label above the input field
          }}
          placeholder="Select a month" // Optional: Provides clarity when no value is selected
        />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Employee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workEntries.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.task}</TableCell>
              <TableCell>{entry.hours}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.employeeEmail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgressPage;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const WorksheetTable = ({ workEntries }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Hours Worked</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.task}</TableCell>
              <TableCell>{entry.hours}</TableCell>
              <TableCell>{entry.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorksheetTable;

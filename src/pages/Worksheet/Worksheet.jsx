import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WorksheetTable from "../../components/WorkSheetTable/WorksheetTable";


const tasksOptions = ["Sales", "Support", "Content", "Paper-work"];
const Worksheet = () => {
    const {user} = useAuth();
    const [task,setTask] = useState();
    const[hours,setHours] = useState();
    const [date, setDate] = useState(dayjs());
    const [workEntries, setWorkEntries] = useState([]);

    useEffect(()=>{
     const fetchWorkEntries = async()=>{
        try {
            
            const response = await axiosSecure(`worksheet/${user.email}`);
            setWorkEntries(response.data);
        } catch (error) {
            console.error("Error fetching work entries:", error);
        }
     }
     fetchWorkEntries();
    }
    ,[user.email])

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const newEntry = {
          task,
          hours: parseFloat(hours),
          date: date.format("YYYY-MM-DD"),
          employeeEmail: user.email,
        };
        try {
      const response = await axiosSecure.post("/work-entries", newEntry);
      setWorkEntries([response.data, ...workEntries]);
      setTask("");
      setHours("");
      setDate(dayjs());
    } catch (error) {
      console.error("Error submitting work entry:", error);
    }
  };


console.log(workEntries)
    return (
    <Box sx={{ padding: 2 }}>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* Task Dropdown */}
        <TextField
          select
          label="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          sx={{ minWidth: 120 }}
        >
          {tasksOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Hours Worked */}
        <TextField
          type="number"
          label="Hours Worked"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
          sx={{ maxWidth: 120 }}
        />

        {/* MUI Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>

      {/* Table Component */}
      <WorksheetTable workEntries={workEntries} />
    </Box>
    );
};

export default Worksheet;
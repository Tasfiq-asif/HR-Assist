import { Box, CssBaseline } from "@mui/material";
import Appbar from "../components/AppBar/Appbar";
import SideBar from "../components/SideBar/SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const handleDrawerToggle = () => {
      setOpen(!open);
    };
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Appbar open={open} onDrawerToggle={handleDrawerToggle} />
        <SideBar open={open} onClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            transition: "margin 0.3s ease",
            marginLeft: open ? 240 : 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
};

export default Dashboard;
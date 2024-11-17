import { Box, CssBaseline } from "@mui/material";

import SideBar from "../components/SideBar/SideBar";

import { Outlet } from "react-router-dom";

const sidebarWidth = 240;
const Dashboard = () => {

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <Appbar open={open} onDrawerToggle={handleDrawerToggle} /> */}
        <SideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginLeft: `${sidebarWidth}px`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
};

export default Dashboard;
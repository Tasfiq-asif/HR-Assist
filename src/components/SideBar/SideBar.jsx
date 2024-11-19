
import {

  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,

  Box,

} from "@mui/material";
import {
  Home as HomeIcon,
  Description as WorkSheetIcon,
  History as PaymentHistoryIcon,
  People as EmployeesIcon,
  Logout as LogoutIcon,
  Timeline as ProgressIcon,

} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useRoles from "../../hooks/useRoles";
import useAuth from "../../hooks/useAuth";

const sidebarWidth = 240;

const getMenuItems = (role) => {
  switch (role) {
    case "Employee":
      return [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        {
          text: "Work Sheet",
          icon: <WorkSheetIcon />,
          path: "/dashboard/work-sheet",
        },
        {
          text: "Payment History",
          icon: <PaymentHistoryIcon />,
          path: "/dashboard/payment-history",
        },
        { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
      ];
    case "HR":
      return [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        {
          text: "Employee List",
          icon: <EmployeesIcon />,
          path: "/dashboard/employee-list",
        },
        {
          text: "Progress",
          icon: <ProgressIcon />,
          path: "/dashboard/progress",
        },
        { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
      ];
    case "Admin":
      return [
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
        {
          text: "Employees",
          icon: <EmployeesIcon />,
          path: "/dashboard/admin-dashboard",
        },
        { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
      ];
    default:
      return [];
  }
};

const SideBar = () => {
  const [role] = useRoles();
  const navigate = useNavigate();
  const menuItems = getMenuItems(role);
   const { logOut } = useAuth();
  const handleLogout = () => {
    logOut(); // Close menu after logout
  };
  // const handleMenuClick = (path) => {
  //   navigate(path);
  //   onClose(); // Close the sidebar after navigation
  // };

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: "100vh",
        backgroundColor: "#1e293b", // Sidebar background color
        color: "#ffffff", // Text color
        paddingTop: 2,
        position: "fixed", // Make sidebar fixed
        top: 0,
        left: 0,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.text === "Logout") {
                  handleLogout();
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "#475569",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;

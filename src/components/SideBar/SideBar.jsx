
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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

const drawerWidth = 240;

const getMenuItems = (role) => {
  switch (role) {
    case "Employee":
      return [
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
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
        { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
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
          path: "/dashboard/employees",
        },
        { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
      ];
    default:
      return [];
  }
};

const SideBar = ({ open, onClose }) => {
  const [role] = useRoles();
  const navigate = useNavigate();
  const menuItems = getMenuItems(role);
  const handleMenuClick = (path) => {
    navigate(path);
    onClose(); // Close the sidebar after navigation
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;

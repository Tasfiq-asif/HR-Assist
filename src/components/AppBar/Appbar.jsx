import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Appbar = ({ open, onDrawerToggle }) => {
  return (
    <AppBar position="fixed" sx={{ transition: "margin 0.3s ease" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: open ? "none" : "block" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          HR Assist Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
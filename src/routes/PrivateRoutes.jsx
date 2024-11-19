import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a loading spinner while checking authentication
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

 
  if (user && allowedRoles.includes(user.role)) {
    return children; 
  }


  return (
    <Navigate
      to={"/"} 
      state={{ from: location.pathname }} 
      replace={true}
    />
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.element.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // List of allowed roles
};

export default PrivateRoutes;

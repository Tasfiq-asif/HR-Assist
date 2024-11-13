import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

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

  if (user) return children;

  return (
    <Navigate
      to={"/login"}
      state={{ from: location.pathname }}
      replace={true}
    ></Navigate>
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoutes;

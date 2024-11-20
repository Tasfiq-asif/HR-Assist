import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import Worksheet from "../pages/Worksheet/Worksheet";
import EmployeeList from "../pages/EmployeeList/EmployeeList";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes allowedRoles={["Employee", "HR", "Admin"]}>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "work-sheet",
        element: <Worksheet />,
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoutes allowedRoles={["HR", "Admin"]}>
            <EmployeeList />
          </PrivateRoutes>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoutes allowedRoles={["Admin"]}>
            <AdminDashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoutes allowedRoles={["Employee"]}>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "details/:slug",
        element: (
          <PrivateRoutes allowedRoles={["HR", "Admin"]}>
            <DetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "progress",
        element: (
          <PrivateRoutes allowedRoles={["HR", "Admin"]}>
            <ProgressPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;

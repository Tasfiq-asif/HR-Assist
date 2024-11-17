import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import Worksheet from "../pages/Worksheet/Worksheet";

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
    element:(
      <PrivateRoutes>
        <Dashboard/>
      </PrivateRoutes>
    ),
    children: [
      {path: "work-sheet",
      element: <Worksheet />,},
    ]
    
  },
]);

export default router;

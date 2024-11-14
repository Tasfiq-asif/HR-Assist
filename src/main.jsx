import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@mui/material";
import AuthProviders from './providers/AuthProviders.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes.jsx';
import theme from './Theme/theme.js';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </ThemeProvider>
  </StrictMode>
);

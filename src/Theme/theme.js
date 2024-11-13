import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B4242', // Dark Greenish Teal
    },
    secondary: {
      main: '#5C8374', // Muted Green
    },
    background: {
      default: '#9EC8B9', // Light Teal for background
    },
    text: {
      primary: '#092635', // Dark Blue for main text
      secondary: '#5C8374', // Muted Green for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // White text on buttons
          backgroundColor: '#1B4242', // Primary button color
          '&:hover': {
            backgroundColor: '#092635', // Darker shade on hover
            color: '#FFFFFF',
          },
        },
      },
    },
  },
});

export default theme;

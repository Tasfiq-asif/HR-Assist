import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email";
    tempErrors.password =
      password.length >= 6 ? "" : "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      console.log("Google sign-in result:", result);

      if (!result || !result.user) {
        throw new Error("Failed to retrieve user data from Google sign-in.");
      }

      const { email, displayName, photoURL } = result.user;

      if (!email || !displayName) {
        throw new Error("Google user data is incomplete.");
      }

      console.log("Google User:", { email, displayName, photoURL });

      toast.success("Sign In Successful");
      navigate(from);
    } catch (err) {
      console.error("Error during Google Sign-In:", err);
      toast.error(err.message || "An error occurred during sign-in");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await signIn(email, password);
        toast.success("Sign In Successful");
        navigate(from);
      } catch (err) {
        toast.error(err?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" align="center" mb={2} color="primary">
          Welcome Back!
        </Typography>
        <Typography variant="body1" align="center" mb={4} color="textSecondary">
          Login to your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px", mb: 2 }}
          >
            Log In
          </Button>
        </form>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            padding: "10px",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleGoogleSignIn}
        >
          <Google sx={{ mr: 1 }} />
          Sign In with Google
        </Button>
        <Typography variant="body2" align="center" color="textSecondary">
          <p>Do not have an account?</p>
          <a
            href="/register"
            style={{ color: "#3f51b5", textDecoration: "none" }}
          >
            Sign up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

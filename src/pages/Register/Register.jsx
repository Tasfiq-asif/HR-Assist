import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";


const Register = () => {
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [phone, setPhone] = useState("");
     const [password, setPassword] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const [errors, setErrors] = useState({});
     const navigate = useNavigate(); // Optional
     const axiosPublic = useAxiosPublic();

     const handleShowPassword = () => setShowPassword(!showPassword);

     const { signInWithGoogle, createUser, updateUserProfile, logOut } =
       useAuth();
    const location = useLocation();

    const from = location.state?.from || "/";

     const handleGoogleSignIn = async () => {
       try {
         const result = await signInWithGoogle();
         const userInfo = {
           email: result.user?.email,
           name: result.user?.displayName,
           role: "guest",
         };
         await axiosPublic.post("/user", userInfo);
         toast.success("Sign In Successful");
         navigate(from);
       } catch (err) {
         toast.error(err?.message);
       }
     };

     // Basic validation
     const validate = () => {
       let tempErrors = {};
       tempErrors.email = /\S+@\S+\.\S+/.test(email)
         ? ""
         : "Enter a valid email";
       tempErrors.password =
         password.length >= 6 ? "" : "Password must be at least 6 characters";
       tempErrors.phone =
         phone.length >= 10 ? "" : "Phone must be at least 10 numbers";
       setErrors(tempErrors);
       return Object.values(tempErrors).every((error) => error === "");
     };

     const handleSubmit = async (event) => {
       event.preventDefault();
       if (validate()) {
         try {
           await createUser(email, password);
           updateUserProfile(name);
           const userInfo = {
             email: email,
             name: name,
             phone: phone,
             role: "guest",
           };
           console.log(userInfo);
           toast.success("User created successfully");
           navigate("/login");
         } catch (err) {
           toast.error(err?.message);
           console.error("Error during logout:", err); // Log the error
         }
       }
     };


    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#f4f6f8"
        px={2} // Padding on smaller devices
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: { xs: 350, sm: 400 }, // Responsive max width
            width: "100%",
            borderRadius: 2, // Rounded corners
          }}
        >
          <Typography variant="h4" align="center" mb={2} color="primary">
            Register Now
          </Typography>
          <Typography
            variant="body1"
            align="center"
            mb={4}
            color="textSecondary"
          >
            Enter details for your new account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />
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
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phone}
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
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
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
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
              Register
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
            Already have an account?
            <a
              href="/login"
              style={{
                color: "#3f51b5",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Log in
            </a>
          </Typography>
        </Paper>
      </Box>
    );
};

export default Register;
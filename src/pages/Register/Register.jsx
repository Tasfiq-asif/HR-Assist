import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";


const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // Role selection
  const [bankAccountNo, setBankAccountNo] = useState("");

  const [designation, setDesignation] = useState("");
  const [photo, setPhoto] = useState(null); // For file upload
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "Employee",
      };
      await axiosPublic.post("/user", userInfo);
      toast.success("Sign In Successful");
      navigate(from);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Validation
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email";
    tempErrors.password =
      password.length >= 6 ? "" : "Password must be at least 6 characters";
    tempErrors.phone =
      phone.length >= 10 ? "" : "Phone must be at least 10 digits";
    tempErrors.role = role ? "" : "Role is required";
    tempErrors.bankAccountNo = bankAccountNo
      ? ""
      : "Bank account number is required";
  
    tempErrors.designation = designation ? "" : "Designation is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === "");
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        // Upload the photo to ImgBB if a file is selected
        let photoUrl = "";
        if (photo) {
          photoUrl = await uploadImage(photo);
        }

        // Create the user with email and password
        await createUser(email, password);
        await updateUserProfile(name);
        // Prepare user data to send to backend
        const userData = {
          email,
          name,
          phone,
          role,
          bank_account_no: bankAccountNo,
          designation,
          photo: photoUrl, // The uploaded photo URL from ImgBB
        };

        // Send user data to the backend
        await axiosPublic.post("/user", userData);
        toast.success("User created successfully");
        navigate("/login");
      } catch (err) {
        toast.error(err?.message);
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
        <Typography variant="body1" align="center" mb={4} color="textSecondary">
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
          <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(errors.role)}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              value={role}
              labelId="role-label"
              label="Role"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
            {errors.role && (
              <Typography color="error">{errors.role}</Typography>
            )}
          </FormControl>
          <TextField
            label="Bank Account Number"
            variant="outlined"
            fullWidth
            value={bankAccountNo}
            onChange={(e) => setBankAccountNo(e.target.value)}
            error={Boolean(errors.bankAccountNo)}
            helperText={errors.bankAccountNo}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            error={Boolean(errors.designation)}
            helperText={errors.designation}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 3 }}
          >
            Upload Photo
            <input
              type="file"
              hidden
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Button>
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
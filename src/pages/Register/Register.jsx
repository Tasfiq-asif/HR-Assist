import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
 
  TextField,
  Typography,
} from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-hot-toast";

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
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    signInWithGoogle,
    createUser,
    updateUserProfile,
    loading,
    logOut,
    setLoading,
  } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleShowPassword = () => setShowPassword(!showPassword);

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
        let photoUrl = "";
        if (photo) {
          try {
            photoUrl = await uploadImage(photo);
          } catch {
            toast.error("Image upload failed. Please try again.");
            return; // Exit early if image upload fails
          }
        }

        // Create the user with email and password
        try {
          const userCredential = await createUser(email, password);

          if (userCredential?.user?.email) {
            // Update the user's profile with the name
            await updateUserProfile(name);

            // Prepare user data
            const userData = {
              email,
              name,
              phone,
              role,
              bank_account_no: bankAccountNo,
              designation,
              photo: photoUrl,
            };

            // Send user data to the backend
            await axiosPublic.post("/user", userData);

            // Log out after user creation (if needed for your flow)
            await logOut();

            toast.success("User created successfully!");
            navigate("/login");
          }
        } catch (err) {
          console.error("Error during user creation:", err); // Log the error details here
          toast.error(
            err.code === "auth/email-already-in-use"
              ? "This email is already in use. Please try another email."
              : err?.message || "An error occurred during registration."
          );
          setLoading(false)
        }
      } catch (err) {
        // Catch any other errors (e.g., network issues, axios failures, etc.)
        console.error("Unexpected error:", err); // Log any unexpected errors
        toast.error(
          err?.message || "An unexpected error occurred. Please try again."
        );
        setLoading(false);
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      // Generate a URL for the image file to show as a preview
      const fileURL = URL.createObjectURL(file);
      setPhotoPreview(fileURL);
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

          <Box display="flex" alignItems="center" mb={2}>
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
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
            {photoPreview && (
              <Box
                component="img"
                src={photoPreview}
                alt="Preview"
                sx={{ width: 40, height: 40, borderRadius: "50%", ml: 2,mb: 3 }}
              />
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mb: 3 }}
          >
            Register
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleGoogleSignIn}
            sx={{ mb: 3 }}
          >
            <Google sx={{ mr: 1 }} />
            Sign Up with Google
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

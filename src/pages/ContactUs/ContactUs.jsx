import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import { axiosPublic } from "../../hooks/useAxiosPublic";


const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPublic.post("/contact", {
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess(true);
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Address: 123 Dummy Street, Some City, Some Country
      </Typography>
      {success && (
        <Typography variant="body1" color="green" sx={{ mb: 2 }}>
          Message sent successfully!
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs;

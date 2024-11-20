import { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

import { axiosSecure } from "../../hooks/useAxiosSecure";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Fetch all messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosSecure.get("/admin/messages");
        setMessages(response.data);
      } catch (error) {
        setError("Failed to fetch messages. Please try again later.",error);
      }
    };

    fetchMessages();
  }, []);

  // Handle delete message
  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/admin/messages/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Admin Messages
      </Typography>

      {error && (
        <Typography variant="body1" color="red" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {messages.length === 0 ? (
        <Typography variant="body1">No messages to display.</Typography>
      ) : (
        messages.map((message) => (
          <Paper
            key={message._id}
            sx={{
              padding: 2,
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">{message.email}</Typography>
              <Typography variant="body1">{message.message}</Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(message._id)}
            >
              Delete
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Messages;

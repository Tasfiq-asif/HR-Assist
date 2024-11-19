// Banner.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import BannerImage from "../../assets/Banner.jpg"; // Import the image

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${BannerImage})`, // Gradient overlay
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Success Through Innovation
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Our company is at the forefront of success in the industry, driven by
        innovation and teamwork.
      </Typography>
      <Button
        variant="contained"
        sx={{
          padding: "10px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
        }}
      >
        Learn More
      </Button>
    </Box>
  );
};

export default Banner;

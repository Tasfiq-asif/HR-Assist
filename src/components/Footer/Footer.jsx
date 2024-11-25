import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1B4242", // Dark Greenish Teal
        color: "#ffffff", // White text color
        padding: 3,
        marginTop: "20px",

      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              HR-Assists
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Empowering HR teams with streamlined employee management tools.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link
                  href="#"
                  color="inherit"
                  sx={{ display: "block", marginTop: 1 }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="inherit"
                  sx={{ display: "block", marginTop: 1 }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  color="inherit"
                  sx={{ display: "block", marginTop: 1 }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Email:{" "}
              <Link href="mailto:contact@hrassists.com" color="inherit">
                contact@hrassists.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Phone: +123 456 7890
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: 4,
            padding: 2,
            backgroundColor: "#092635", // Dark Blueish shade for the footer's bottom
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} HR-Assists. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

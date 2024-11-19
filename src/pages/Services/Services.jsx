import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

// Import your custom images from the assets folder
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.jpg";

const servicesData = [
  {
    title: "Employee Workflow Monitoring",
    description: "Track and monitor employee workflow seamlessly",
    image: service1, // Use the custom image
  },
  {
    title: "Salary & Payroll Management",
    description: "Easy and timely management of salaries and payroll",
    image: service2, // Use the custom image
  },
  {
    title: "Contract Management",
    description: "Store and manage contracts digitally",
    image: service3, // Use the custom image
  },
  {
    title: "Employee Performance Reports",
    description: "Track and analyze employee performance",
    image: service4, // Use the custom image
  },
];

const Services = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <CardContent sx={{ padding: "20px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#777",
                    lineHeight: 1.6,
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;

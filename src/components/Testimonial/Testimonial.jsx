// Testimonials.js

import { Box, Typography, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles for carousel

const testimonials = [
  {
    name: "John Doe",
    title: "Employee",
    quote:
      "This company helped me grow professionally and personally. I feel like part of a big family.",
  },
  {
    name: "Jane Smith",
    title: "HR Executive",
    quote:
      "We are committed to providing the best working environment for our employees. It's all about collaboration.",
  },
  {
    name: "Paul Lee",
    title: "Manager",
    quote:
      "Innovation and dedication are the backbone of our company’s success. Proud to be part of this team.",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#e0e0e0" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 4 }}>
        What People Say About Us
      </Typography>
      <Carousel>
        {testimonials.map((testimonial, index) => (
          <Paper
            key={index}
            sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}
          >
            <Typography variant="h6">{testimonial.quote}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontStyle: "italic", marginTop: 2 }}
            >
              - {testimonial.name}, {testimonial.title}
            </Typography>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonials;

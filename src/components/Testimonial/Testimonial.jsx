import { Box, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
    <Box
      sx={{
        padding: 6,
        background: "linear-gradient(to right, #1B4242, #9EC8B9)",
        color: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          fontWeight: "bold",
          letterSpacing: 1.2,
        }}
      >
        What People Say About Us
      </Typography>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        style={{ padding: "20px" }}
        className="custom-swiper" // Add a custom class name
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                maxWidth: 600,
                margin: "10px auto",
                backgroundColor: "#ffffff",
                color: "#333",
                borderRadius: 2,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontStyle: "italic",
                    marginBottom: 2,
                    textAlign: "center",
                  }}
                >
                  "{testimonial.quote}"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#1B4242",
                  }}
                >
                  - {testimonial.name}, {testimonial.title}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonials;

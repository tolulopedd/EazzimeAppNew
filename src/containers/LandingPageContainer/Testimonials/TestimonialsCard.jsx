"use client";
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsCard = () => {
  const userTestimonies = [
    {
      id: 1,
      username: "Gloria Akinpelu",
      userRole: "System Administrator",
      testimony: `As an employee utilizing EazziMe, I can confidently say it's been a
            game-changer for me. Gone are the days of anxiously waiting for the
            end of the pay cycle to access my hard-earned money. With EazziMe, I
            have the flexibility to access a portion of my earned wages whenever I
            need them`,
    },
    {
      id: 2,
      username: "Saheed Atanda",
      userRole: "Project Manager",
      testimony: `As an employee utilizing EazziMe, I can confidently say it's been a
            game-changer for me. Gone are the days of anxiously waiting for the
            end of the pay cycle to access my hard-earned money. With EazziMe, I
            have the flexibility to access a portion of my earned wages whenever I
            need them`,
    },
    {
      id: 3,
      username: "Dorcas Williams",
      userRole: "Software Developer",
      testimony: `As an employee utilizing EazziMe, I can confidently say it's been a
            game-changer for me. Gone are the days of anxiously waiting for the
            end of the pay cycle to access my hard-earned money. With EazziMe, I
            have the flexibility to access a portion of my earned wages whenever I
            need them`,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Slider autoplay infinite autoplaySpeed={5000}>
        {userTestimonies.map((data) => {
          const { id, userRole, username, testimony } = data;
          return (
            <Card
              key={id}
              sx={{
                backgroundColor: "#D0E7F0",
                height: "345px",
                width: "568px",
                borderRadius: "30px",
                padding: "2rem",
              }}
            >
              <CardContent
                sx={{
                  fontSize: { lg: "1em", md: "1em", sm: "0.7em", xs: "0.7em" },
                }}
              >
                {testimony}
              </CardContent>
              <CardContent
                sx={{
                  padding: {
                    lg: "3rem 0 0 1rem",
                    md: "3rem 0 0 1rem",
                    sm: "1rem 0 0 1rem",
                    xs: "1rem 0 0 1rem",
                  },
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", alignItems: "end" }}
                >
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography
                      sx={{
                        fontSize: "1em",
                        fontWeight: "600",
                        color: "buttonColor.main",
                        textAlign: "left",
                        padding: {
                          lg: "0 0 1rem 0",
                          md: "0 0 1rem 0",
                          sm: "0 0 0.5rem 0",
                          xs: "0 0 0.5rem 0",
                        },
                      }}
                    >
                      {username}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8em",
                        color: "buttonColor.main",
                        textAlign: "left",
                      }}
                    >
                      {userRole}
                    </Typography>
                  </Grid>
                  {/* <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Grid sx={{ margin: "0 2rem 0 0" }}>
                      <Button>
                        <FaChevronLeft size={15} />
                      </Button>
                    </Grid>
                    <Grid>
                      <Button>
                        <FaChevronRight size={15} />
                      </Button>
                    </Grid>
                  </Grid> */}
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Slider>
    </Box>
  );
};

export default TestimonialsCard;

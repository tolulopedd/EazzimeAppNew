import React from "react";
import { Box } from "@mui/material";
import TopNav from "./TopNav";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUsSection";
import Partners from "./PartnersSection";
import Benefits from "./BenefitSection";
import PartnerWithUs from "./PartnerWithUs";
import Testimonials from "./Testimonials";
import FooterSection from "./FooterSection";

const LandingPageContainer = () => {
  return (
    <Box>
      <TopNav />
      <HeroSection/>
      <AboutUs/>
      <Partners/>
      <Benefits/>
      <PartnerWithUs/>
      <Testimonials/>
      <FooterSection/>
    </Box>
  );
};

export default LandingPageContainer;

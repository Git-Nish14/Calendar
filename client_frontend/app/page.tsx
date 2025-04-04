import React from "react";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const CalendarLandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default CalendarLandingPage;

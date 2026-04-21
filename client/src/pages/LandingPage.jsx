import { motion } from "framer-motion";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import Team from "../components/Team";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      <Hero />
      <AboutSection />
      <ServicesSection />
      <Features />
      <DashboardPreview />
      <Team />
      <TestimonialsSection />
      <NewsletterSection />
    </motion.div>
  );
}

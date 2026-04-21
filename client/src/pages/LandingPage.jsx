import { motion } from "framer-motion";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import ProjectsSection from "../components/ProjectsSection";
import Team from "../components/Team";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
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
      <ProjectsSection />
      <Team />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
    </motion.div>
  );
}

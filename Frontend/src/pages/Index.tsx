import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <section id="services">
          <ServicesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <WhyChooseUsSection />
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

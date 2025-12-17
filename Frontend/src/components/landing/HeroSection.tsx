import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero-soft" />
      <div className="absolute top-0 right-0 w-1/2 h-full gradient-hero opacity-5 blur-3xl" />
      
      {/* Floating elements */}
      <div className="absolute top-32 left-10 w-24 h-24 rounded-full gradient-hero opacity-10 animate-float" />
      <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full gradient-hero opacity-10 animate-float" style={{
      animationDelay: '2s'
    }} />
      
      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          
          
          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up stagger-1">
            Get Qualified Leads & Booked Appointments —{" "}
            <span className="text-gradient">For Only $7/Hour.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
            Professional trained callers to grow your business with high-quality leads 
            and consistent appointments. Scale your sales pipeline without the overhead.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up stagger-3">
            <Link to="/book">
              <Button variant="hero" size="lg" className="group">
                <Calendar className="w-5 h-5" />
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-up stagger-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>U.S. trained callers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Daily reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
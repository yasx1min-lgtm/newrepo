import { Phone, Target, Calendar, Database, RefreshCw } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Lead Generation",
    description: "We identify and qualify prospects that match your ideal customer profile, filling your pipeline with ready-to-buy leads.",
  },
  {
    icon: Phone,
    title: "Cold Calling",
    description: "Professional outreach campaigns with trained callers who represent your brand with excellence and close deals.",
  },
  {
    icon: Calendar,
    title: "Appointment Setting",
    description: "Direct calendar bookings with qualified prospects, delivered straight to your schedule without the hassle.",
  },
  {
    icon: Database,
    title: "CRM Management",
    description: "Complete CRM integration and management, keeping your data organized and actionable at all times.",
  },
  {
    icon: RefreshCw,
    title: "Follow-up Automation",
    description: "Systematic follow-up sequences that nurture leads and maximize conversion rates automatically.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero-soft opacity-50" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive lead generation and appointment setting services designed to fuel your growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

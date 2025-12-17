import { Search, FileText, PhoneCall, CalendarCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Business Discovery",
    description: "We learn about your business, target market, and goals to create a customized outreach strategy.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Script + Ideal Lead Profile",
    description: "We craft compelling scripts and define your ideal customer profile for maximum conversion.",
  },
  {
    step: "03",
    icon: PhoneCall,
    title: "Calling & Qualifying",
    description: "Our trained callers reach out to prospects, qualify leads, and handle objections professionally.",
  },
  {
    step: "04",
    icon: CalendarCheck,
    title: "Booked Appointments",
    description: "Qualified appointments are booked directly to your calendar. You just show up and close.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-background text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-lg text-background/70">
            We handle the entire outreach process so you can focus on closing deals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-background/20" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="font-display text-4xl font-bold text-background/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-background/70 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

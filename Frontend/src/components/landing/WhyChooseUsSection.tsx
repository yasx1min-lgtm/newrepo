import { GraduationCap, Globe, DollarSign, FileBarChart, PhoneForwarded, FileCheck } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Trained Callers",
    description: "Professional callers with extensive sales training",
  },
  {
    icon: Globe,
    title: "No Accent",
    description: "Clear English speakers for smooth communication",
  },
  {
    icon: DollarSign,
    title: "$7/Hour Only",
    description: "Unbeatable rates with no hidden fees",
  },
  {
    icon: FileBarChart,
    title: "Daily Reporting",
    description: "Transparent metrics and progress updates",
  },
  {
    icon: PhoneForwarded,
    title: "Live Transfers",
    description: "Hot leads transferred directly to your team",
  },
  {
    icon: FileCheck,
    title: "High Conversion Scripts",
    description: "Proven scripts that actually convert",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Competitive Edge You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine expertise, technology, and proven processes to deliver results.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

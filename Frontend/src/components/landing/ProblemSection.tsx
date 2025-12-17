import { AlertCircle, Clock, TrendingDown, Users } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Low-Quality Leads",
    description: "Spending money on leads that never convert, wasting time and budget on dead-end prospects.",
  },
  {
    icon: Clock,
    title: "No Time for Follow-ups",
    description: "Your team is too busy to consistently follow up, letting potential deals slip through the cracks.",
  },
  {
    icon: TrendingDown,
    title: "Inconsistent Appointments",
    description: "Sales calendar is unpredictable with feast-or-famine booking patterns hurting revenue.",
  },
  {
    icon: Users,
    title: "Poor Sales Pipeline",
    description: "No systematic approach to prospecting leaves your pipeline dry and unpredictable.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sound Familiar?
          </h2>
          <p className="text-lg text-muted-foreground">
            Most businesses struggle with these common challenges that kill growth and waste resources.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 hover:shadow-card transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

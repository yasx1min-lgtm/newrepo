import { Star, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Michael Thompson",
    role: "CEO, Apex Solutions",
    content: "We've tripled our qualified appointments in just 2 months. The ROI has been incredible. Their callers are professional and represent our brand perfectly.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Sales Director, GrowthForce",
    content: "Best decision we made for our sales team. We went from struggling to fill our calendar to having consistent daily appointments. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Founder, TechBridge Inc",
    content: "At $7/hour, this is an absolute no-brainer. The quality of leads and the professionalism of the callers exceeded all our expectations.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our clients say about working with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call Demo */}
        <div className="max-w-xl mx-auto text-center">
          <div className="p-8 rounded-2xl gradient-hero text-primary-foreground">
            <h3 className="font-display text-2xl font-bold mb-3">
              Hear Our Callers in Action
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Listen to a sample call and experience the quality of our trained professionals.
            </p>
            <Button variant="heroOutline" size="lg" className="group">
              <Play className="w-5 h-5" />
              Play Call Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

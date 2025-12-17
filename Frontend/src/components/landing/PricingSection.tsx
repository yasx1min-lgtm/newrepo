import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
const benefits = ["Trained professional callers", "CRM integration included", "Daily performance reports", "Direct appointment booking", "Custom scripts development", "Quality assurance monitoring", "No long-term contracts", "Cancel anytime"];
const PricingSection = () => {
  return <section className="py-20 lg:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent, Affordable Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            One simple rate. No hidden fees. No surprises.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-background border-2 border-primary shadow-card overflow-hidden px-[47px]">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 gradient-hero opacity-5 blur-3xl" />
            
            <div className="relative z-10">
              {/* Popular badge */}
              <div className="absolute -top-4 -right-4 px-4 py-1.5 rounded-full gradient-hero text-primary-foreground text-sm font-semibold shadow-glow">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <p className="text-muted-foreground mb-2">Per Hour Rate</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl md:text-7xl font-display font-extrabold text-foreground">$7</span>
                  <span className="text-xl text-muted-foreground">/hour</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Billed weekly or monthly</p>
              </div>
              
              <div className="space-y-4 mb-10">
                {benefits.map(benefit => <div key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>)}
              </div>
              
              
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                Start with a free consultation • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;
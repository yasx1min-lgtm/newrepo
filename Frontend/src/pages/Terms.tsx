import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-lg">
            Last updated: December 2024
          </p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using Dialinity's services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Services</h2>
            <p>
              Dialinity provides professional cold calling, lead generation, and appointment setting services. 
              Our services are designed to help businesses grow through qualified leads and consistent appointments.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Pricing and Payment</h2>
            <p>
              Our services are billed at the agreed-upon hourly rate. Payment terms will be specified in your 
              service agreement. All fees are non-refundable unless otherwise stated.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Client Responsibilities</h2>
            <p>
              Clients are responsible for providing accurate information, including call scripts, target 
              audience details, and any necessary training materials.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Confidentiality</h2>
            <p>
              We maintain strict confidentiality regarding all client information and business data. 
              Our team members are bound by confidentiality agreements.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p>
              Dialinity shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of our services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at info@dialinity.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

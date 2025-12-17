import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-lg">
            Last updated: December 2024
          </p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including name, email address, phone number, 
              and any other information you choose to provide when using our services.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and comply with legal obligations.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as required by law.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. 
              Contact us to exercise these rights.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Cookies</h2>
            <p>
              We may use cookies and similar tracking technologies to track activity on our website 
              and hold certain information to improve your experience.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at info@dialinity.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

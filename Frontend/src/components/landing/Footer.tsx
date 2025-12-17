import { Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="py-16 bg-foreground text-background">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4">
              ​Dial<span className="text-primary">inity</span>
            </h3>
            <p className="text-background/70 max-w-md mb-6">
              Professional cold calling, lead generation, and appointment setting services 
              at just $7/hour. Grow your business with qualified leads and consistent appointments.
            </p>
            <div className="flex gap-4">
              <a href="mailto:contact@leadcraftpro.com" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>​info@dialinity.com</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-background/70 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-background/70 hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-background/70 hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-background/70 hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2026 Dialinity. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/terms" className="text-background/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-background/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
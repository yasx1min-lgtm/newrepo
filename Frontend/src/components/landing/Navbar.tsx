import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Show CTA when scrolled past ~500px (hero CTA out of view)
      setShowCTA(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    label: "Services",
    href: "#services"
  }, {
    label: "How It Works",
    href: "#how-it-works"
  }, {
    label: "Pricing",
    href: "#pricing"
  }, {
    label: "Testimonials",
    href: "#testimonials"
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold text-foreground">
            ​Dial<span className="text-primary">inity</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>)}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {showCTA && <Link to="/book"><Button size="sm" className="animate-fade-in">
                Book a Free Consultation
              </Button></Link>}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => <a key={link.label} href={link.href} className="text-foreground font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>)}
              <Link to="/book"><Button className="mt-2">Book Consultation</Button></Link>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;
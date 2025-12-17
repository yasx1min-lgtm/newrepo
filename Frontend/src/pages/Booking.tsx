import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Users, CheckCircle2, ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consultation request submitted! We'll be in touch soon.");
    // Reset form
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", guests: "" });
  };

  const canProceedToStep2 = selectedDate && selectedTime;
  const canSubmit = formData.firstName && formData.email;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-hero-soft" />
      <div className="absolute top-0 right-0 w-1/2 h-full gradient-hero opacity-5 blur-3xl" />
      <div className="absolute top-32 left-10 w-24 h-24 rounded-full gradient-hero opacity-10 animate-float" />
      <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full gradient-hero opacity-10 animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 py-8 lg:py-12">
        {/* Back button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Free Consultation
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your <span className="text-gradient">Free Strategy Call</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a call with our team to discuss how we can help grow your business with professional cold calling services.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
            step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Select Time</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
            step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Your Details</span>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-8 animate-fade-up">
              {/* Calendar */}
              <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Select a Date
                </h2>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-xl border-0 pointer-events-auto w-full"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4 w-full",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-primary/10 rounded-lg transition-all",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex w-full",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-10 w-full text-center text-sm p-0 relative",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 rounded-lg transition-all mx-auto",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                  }}
                />
              </div>

              {/* Time slots */}
              <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/50 shadow-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select a Time
                </h2>
                {selectedDate ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Available times for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                            selectedTime === time
                              ? "gradient-hero text-primary-foreground shadow-glow"
                              : "bg-background border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <Calendar className="w-12 h-12 mb-4 opacity-50" />
                    <p>Please select a date first</p>
                  </div>
                )}

                {canProceedToStep2 && (
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 group"
                    variant="hero"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto animate-fade-up">
              <div className="p-6 md:p-10 rounded-3xl bg-card border border-border/50 shadow-card">
                {/* Selected time summary */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your selected time</p>
                    <p className="font-display font-semibold text-foreground">
                      {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="ml-auto text-primary hover:text-primary hover:bg-primary/10"
                  >
                    Change
                  </Button>
                </div>

                {/* Zoom meeting indicator */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
                  <Video className="w-5 h-5 text-blue-500" />
                  <p className="text-sm font-medium text-foreground">
                    This meeting will be held via <span className="text-blue-500">Zoom</span>
                  </p>
                </div>

                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Your Contact Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        First Name *
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Last Name
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Smith"
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="h-12 rounded-xl border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Add Guests
                    </label>
                    <Input
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      placeholder="guest1@email.com, guest2@email.com"
                      className="h-12 rounded-xl border-border/50 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate multiple email addresses with commas
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                      size="lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="flex-1 group"
                      disabled={!canSubmit}
                    >
                      Book Consultation
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>100% Free</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>No Obligation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>30-Minute Call</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

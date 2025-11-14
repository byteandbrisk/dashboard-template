import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Mail, MapPin, Phone, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    timeline: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Timeline: ${formData.timeline || 'N/A'}\n` +
      `Budget: ${formData.budget || 'N/A'}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open mailto link
    window.location.href = `mailto:hello@byteandbrisk.com?subject=${subject}&body=${body}`;
    
    // Show success message
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Opening your email client...');
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[color:var(--success-light)] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[color:var(--success)]" />
                </div>
                {/* Confetti-like sparkles */}
                <Sparkles className="w-6 h-6 text-[color:var(--primary)] absolute -top-2 -right-2 animate-bounce" />
                <Sparkles className="w-5 h-5 text-[color:var(--warning)] absolute -bottom-1 -left-2 animate-pulse" />
                <Sparkles className="w-4 h-4 text-[color:var(--info)] absolute top-4 -right-6 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
            
            <h2 className="mb-3">Thank You!</h2>
            <p className="text-[color:var(--text-muted)] mb-8">
              We've received your message and will get back to you within 1 business day.
              Our team is excited to discuss your project!
            </p>
            
            <Button onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[color:var(--bg)] to-[color:var(--surface-muted)]">
      {/* Hero Section */}
      <div className="bg-[color:var(--surface)] border-b border-[color:var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-[color:var(--primary-light)] text-[color:var(--primary)] text-sm">
            <Mail className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="mb-4">Let's Talk About Your Project</h1>
          <p className="text-lg text-[color:var(--text-muted)] max-w-2xl mx-auto">
            Have a question or want to work together? Fill out the form below and our team will reach out to you shortly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-[color:var(--danger)]">*</span>
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-[color:var(--danger)]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Project Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger id="timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3months">1-3 months</SelectItem>
                          <SelectItem value="3-6months">3-6 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<10k">Less than $10k</SelectItem>
                          <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                          <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                          <SelectItem value="50k+">$50k+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-[color:var(--danger)]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                    <p className="text-sm text-[color:var(--text-muted)]">
                      Please provide as much detail as possible
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" size="lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          phone: '',
                          timeline: '',
                          budget: '',
                          message: '',
                        });
                        toast('Form cleared');
                      }}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Image */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--primary-light)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[color:var(--primary)]" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a 
                      href="mailto:hello@byteandbrisk.com"
                      className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--primary)] transition-colors"
                    >
                      hello@byteandbrisk.com
                    </a>
                  </div>
                </div>

                {/* <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--success-light)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[color:var(--success)]" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-[color:var(--text-muted)]">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--info-light)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[color:var(--info)]" />
                  </div>
                  <div>
                    <div className="font-medium">Office</div>
                    <div className="text-sm text-[color:var(--text-muted)]">
                      123 Business Ave<br />
                      San Francisco, CA 94102
                    </div>
                  </div>
                </div> */}

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--warning-light)] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[color:var(--warning)]" />
                  </div>
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-sm text-[color:var(--text-muted)]">
                      Mon-Fri: 9am - 6pm PST<br />
                      Sat-Sun: Closed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Element */}
            {/* <Card className="overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1646579886741-12b59840c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbGxhYm9yYXRpb24lMjB0ZWFtfGVufDF8fHx8MTc2MTc0OTk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Contact us"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="mb-1">We're here to help</h3>
                  <p className="text-sm opacity-90">
                    Our team is ready to assist with your questions
                  </p>
                </div>
              </div>
            </Card> */}

            {/* Quick Response */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--success-light)] mb-3">
                    <CheckCircle2 className="w-6 h-6 text-[color:var(--success)]" />
                  </div>
                  <h4 className="mb-2">Quick Response Time</h4>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    We typically respond within 24 hours during business days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

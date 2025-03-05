
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Instagram, Linkedin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-medium mt-2">Contact</h1>
            <p className="mt-4 text-muted-foreground">
              I'm open to commissions, collaborations, exhibition opportunities, and general inquiries.
              Don't hesitate to reach out.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 animate-fade-in-up">
            <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                <Mail size={20} />
              </div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="mt-2 text-muted-foreground">kassiamarin486@gmail.com</p>
              <a 
                href="mailto:kassiamarin486@gmail.com" 
                className="mt-4 text-sm font-medium hover:opacity-70 transition-opacity"
              >
                Send an email
              </a>
            </div>
            
            <div className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                <Phone size={20} />
              </div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="mt-2 text-muted-foreground">+47 909 66 965</p>
              <a 
                href="tel:+47909 66 965" 
                className="mt-4 text-sm font-medium hover:opacity-70 transition-opacity"
              >
                Call me
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center animate-fade-in">
            <h3 className="text-lg font-medium mb-4">Connect with me on Social Media</h3>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://instagram.com/kassiamarin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
                <span>Instagram</span>
                <ExternalLink size={16} />
              </a>
              <a 
                href="https://linkedin.com/in/kassiamarin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
                <span>LinkedIn</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-medium mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-border rounded-md px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-border rounded-md px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Commission">Commission Inquiry</option>
                  <option value="Exhibition">Exhibition Opportunity</option>
                  <option value="Collaboration">Collaboration Proposal</option>
                  <option value="Purchase">Artwork Purchase</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-border rounded-md px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-full bg-foreground text-background font-medium transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-foreground/90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

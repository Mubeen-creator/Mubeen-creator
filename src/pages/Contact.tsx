
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

const Contact = () => {
  const { toast } = useToast();
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or a service like EmailJS
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "hello@portfolio.com",
      link: "mailto:hello@portfolio.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <Github className="h-6 w-6 text-primary" />,
      title: "GitHub",
      value: "github.com/username",
      link: "https://github.com/username",
    },
    {
      icon: <Linkedin className="h-6 w-6 text-primary" />,
      title: "LinkedIn",
      value: "linkedin.com/in/username",
      link: "https://linkedin.com/in/username",
    },
  ];

  useEffect(() => {
    // Header animations
    const headerElements = headerRef.current;
    if (headerElements) {
      const tl = gsap.timeline();
      tl.from(".contact-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".contact-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Form animations
    const formElement = formRef.current;
    if (formElement) {
      gsap.from(".form-element", {
        scrollTrigger: {
          trigger: formElement,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Contact info animations
    const contactSection = contactRef.current;
    if (contactSection) {
      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: contactSection,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="contact-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="contact-subtitle max-w-[700px] text-lg md:text-xl text-muted-foreground">
              Have a project in mind or want to discuss opportunities? Feel free to reach out and I'll get back to you soon.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email address"
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Message subject"
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message"
                    rows={5}
                  />
                </div>
                <Button type="submit" size="lg" className="form-element rounded-full px-8">
                  Send Message
                </Button>
              </form>
            </div>
            <div ref={contactRef} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="contact-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-start space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Working Hours</h3>
                <p className="text-muted-foreground mb-4">
                  I'm available for projects and consultations during the following hours:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;


import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const footer = footerRef.current;
    if (footer) {
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
      
      gsap.from(".footer-social-icon", {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Call to Action Section */}
      <div className="relative z-10 bg-gradient-to-b from-background to-accent/10 pt-16 pb-8 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="footer-content max-w-3xl mx-auto bg-card shadow-2xl rounded-2xl border border-border/60 p-8 mb-16 transform-gpu hover:-translate-y-2 transition-transform duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your project?</h3>
              <p className="text-muted-foreground mb-6">Get in touch today and let's create something amazing together.</p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact" className="flex items-center">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 lg:gap-16">
            <div className="footer-content md:col-span-1">
              <h3 className="font-heading text-2xl font-bold mb-6 text-primary">Portfolio</h3>
              <p className="text-muted-foreground mb-8">
                Creating modern and innovative digital experiences with a focus on performance and aesthetics.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon h-10 w-10 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon h-10 w-10 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon h-10 w-10 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-icon h-10 w-10 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
            
            <div className="footer-content md:col-span-1">
              <h4 className="font-heading text-lg font-bold mb-6">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> About
                  </Link>
                </li>
                <li>
                  <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Skills
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Projects
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-content md:col-span-1">
              <h4 className="font-heading text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/services/web-development" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Web Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/ui-ux-design" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link to="/services/technical-consulting" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Technical Consulting
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center">
                    <span className="mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span> Custom Solutions
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-content md:col-span-1">
              <h4 className="font-heading text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 opacity-60">📍</span>
                  <span className="text-muted-foreground">San Francisco, CA</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 opacity-60">📧</span>
                  <a href="mailto:hello@portfolio.com" className="text-muted-foreground hover:text-primary transition-colors duration-200">hello@portfolio.com</a>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 opacity-60">☎️</span>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors duration-200">+1 (234) 567-890</a>
                </li>
                <li className="mt-6">
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/contact">Send Message</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-border/40 py-6 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Portfolio. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

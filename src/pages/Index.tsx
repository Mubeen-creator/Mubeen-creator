import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Code, LucideIcon, Palette, Terminal, 
  Rocket, Globe, Laptop, Smartphone, Zap,
  Github, Twitter, Linkedin, Instagram
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Service card component
interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const ServiceCard = ({ title, description, icon: Icon, className = "" }: ServiceCardProps) => {
  return (
    <div className={`p-6 rounded-xl glass border-primary/20 ${className}`}>
      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Project card component
interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const ProjectCard = ({ id, title, description, tags, image, featured = false }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Set up hover animations
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleMouseEnter = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    
    gsap.to(card, {
      scale: 1.03,
      rotationY: 5,
      rotationX: -5,
      ease: "power2.out",
      duration: 0.4,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    });
  };
  
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    gsap.to(card, {
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.4,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    });
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(card, {
      rotationY: x * 10,
      rotationX: -y * 10,
      ease: "power2.out",
      duration: 0.1
    });
  };

  const handleViewProject = () => {
    // Store the current scroll position
    const scrollPosition = window.scrollY;
    
    // Create a clone of the card for the zoom animation
    const card = cardRef.current;
    if (!card) return;
    
    const cardRect = card.getBoundingClientRect();
    const clone = card.cloneNode(true) as HTMLElement;
    
    // Style the clone to look exactly like the original and position it absolutely
    clone.style.position = "fixed";
    clone.style.left = `${cardRect.left}px`;
    clone.style.top = `${cardRect.top}px`;
    clone.style.width = `${cardRect.width}px`;
    clone.style.height = `${cardRect.height}px`;
    clone.style.zIndex = "9999";
    clone.style.transition = "none";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);
    
    // Create a black overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    overlay.style.zIndex = "9998";
    overlay.style.transition = "background-color 0.7s ease";
    document.body.appendChild(overlay);
    
    // Hide the original card
    card.style.opacity = "0";
    
    // Animate the overlay
    setTimeout(() => {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }, 50);
    
    // Create Galaxy Zoom animation with GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        // Navigate to the project page
        navigate(`/projects/${id}`);
        // Remove the clone and overlay
        document.body.removeChild(clone);
        document.body.removeChild(overlay);
        // Restore the original card's opacity
        setTimeout(() => {
          if (card) card.style.opacity = "1";
        }, 300);
      }
    });
    
    tl.to(clone, {
      duration: 0.7,
      top: window.innerHeight / 2 - cardRect.height,
      left: window.innerWidth / 2 - cardRect.width / 2,
      scale: 1.2,
      rotation: 0,
      ease: "power3.inOut"
    })
    .to(clone, {
      duration: 0.5,
      opacity: 0,
      scale: 2.5,
      ease: "power2.in"
    }, "+=0.1");
  };

  return (
    <Card 
      ref={cardRef} 
      className={`overflow-hidden h-full flex flex-col group transform-gpu shine-effect ${featured ? 'border-primary/30' : ''}`}
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-accent text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border/40 pt-4">
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:text-primary"
          onClick={handleViewProject}
        >
          View Project <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Extended project data
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with a clean UI, advanced filtering, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["React", "NextJS", "Tailwind", "Stripe"],
    featured: true,
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "An analytics dashboard for a SaaS platform with real-time data visualization and user management.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["TypeScript", "React", "D3.js", "Firebase"],
    featured: true,
  },
  {
    id: 3,
    title: "Mobile App UI",
    description: "A mobile application UI design for a fitness tracking app with dark mode and custom animations.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    tags: ["Figma", "UI Design", "Prototyping"],
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A personal portfolio website with smooth animations, parallax effects, and responsive design.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "GSAP", "Tailwind CSS"],
    featured: true,
  },
];

// Testimonials data for the landing page
const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechStart",
    content: "Working with this developer was an absolute pleasure. Their attention to detail and creative approach brought our vision to life perfectly.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Sarah Miller",
    role: "Marketing Director, GrowthLabs",
    content: "The website exceeded all our expectations. Not only does it look stunning, but the performance and user experience are outstanding.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Michael Chen",
    role: "Founder, DesignWave",
    content: "Incredibly talented developer with an eye for design. They transformed our outdated site into a modern masterpiece that's driving real results.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
  },
];

// Stats data
const statsData = [
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "5+" },
  { label: "Awards", value: "12" },
];

const Index = () => {
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animations
    const heroElements = heroRef.current;
    if (heroElements) {
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-image",
          {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }

    // Services section animations with scroll trigger
    const servicesSection = servicesRef.current;
    if (servicesSection) {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Projects section animations with scroll trigger
    const projectsSection = projectsRef.current;
    if (projectsSection) {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: projectsSection,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
    
    // Testimonials animations
    const testimonialsSection = testimonialsRef.current;
    if (testimonialsSection) {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: testimonialsSection,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
    
    // Stats animations
    const statsSection = statsRef.current;
    if (statsSection) {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsSection,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      });
      
      gsap.from(".stat-value", {
        scrollTrigger: {
          trigger: statsSection,
          start: "top 80%",
        },
        textContent: "0",
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.2,
        delay: 0.5,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30"
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
                Full Stack Developer & UI/UX Designer
              </div>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Creating <span className="text-primary relative">Digital Experiences</span> That Matter
              </h1>
              <p className="hero-subtitle max-w-[700px] text-lg md:text-xl text-muted-foreground">
                I blend creativity and technical expertise to build modern, responsive websites 
                and applications that help businesses thrive in the digital world.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/contact">Let's Work Together</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mt-8 group">
                <span className="text-sm text-muted-foreground">Follow me:</span>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:scale-110 group-hover:translate-y-0 group-hover:scale-100"
                    style={{ transitionDelay: "0.1s" }}
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:scale-110 group-hover:translate-y-0 group-hover:scale-100"
                    style={{ transitionDelay: "0.2s" }}
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:scale-110 group-hover:translate-y-0 group-hover:scale-100"
                    style={{ transitionDelay: "0.3s" }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-accent hover:bg-primary/20 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:scale-110 group-hover:translate-y-0 group-hover:scale-100"
                    style={{ transitionDelay: "0.4s" }}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="hero-image relative perspective-1200">
              <div className="relative transform-gpu transition-all duration-500 rotate-3 hover:rotate-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Developer working" 
                  className="relative rounded-2xl object-cover w-full h-[500px] shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-background rounded-2xl p-4 shadow-xl">
                  <div className="text-center px-3 py-2">
                    <div className="font-mono text-sm">Available for work</div>
                    <div className="flex items-center justify-center mt-1">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">Online now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="font-bold text-4xl md:text-5xl text-primary mb-2">
                  <span className="stat-value">{stat.value}</span>
                </div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
              What I Do
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">My Services</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Specialized services tailored to your digital needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="service-card">
              <ServiceCard
                title="Web Development"
                description="Building modern, responsive websites and web applications with the latest technologies."
                icon={Code}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                title="UI/UX Design"
                description="Creating beautiful user interfaces and experiences that engage and convert."
                icon={Palette}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                title="Technical Consulting"
                description="Providing expert advice on software architecture, technology stack, and best practices."
                icon={Terminal}
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
              My Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Featured Projects</h2>
            <p className="max-w-[700px] text-muted-foreground">
              A selection of my recent work showcasing my skills and expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="project-card perspective-1000">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  featured={project.featured}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-2">
              What Clients Say
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Testimonials</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Hear from clients about their experience working with me
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <Card className="h-full border-border perspective-1000 hover:border-primary/30 transition-colors duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/reviews">View All Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 overflow-hidden bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              Let's Connect
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to start your project?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's work together to create something amazing. I'm currently available for
              freelance work and remote positions.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 mt-4">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, MessageSquare, Users } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  project: string;
}

const Reviews = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechVision Inc.",
      content: "Working with this developer was an absolute pleasure. Their attention to detail and ability to translate our vision into a beautiful, functional website exceeded our expectations. They were responsive, communicative, and delivered the project ahead of schedule.",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      rating: 5,
      project: "Company Website Redesign"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "GrowthLabs",
      content: "The e-commerce platform built for us has transformed our business. Sales have increased by 45% since launch, and customer feedback has been overwhelmingly positive. The developer's expertise in both design and functionality created a seamless shopping experience.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder",
      company: "Artisanal Crafts",
      content: "As a small business owner, I needed a website that would showcase my products while being easy to update. This developer delivered exactly what I needed and provided excellent training on how to manage the site myself. I'm now able to focus on creating my products instead of worrying about my online presence.",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      rating: 4,
      project: "Small Business Website"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Product Manager",
      company: "InnovateTech",
      content: "The web application developed for our team has streamlined our internal processes significantly. The developer took the time to understand our complex workflow and created an intuitive interface that our entire team was able to adopt with minimal training. Their technical expertise is matched by their ability to understand business needs.",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      project: "Internal Dashboard Application"
    },
    {
      id: 5,
      name: "Olivia Parker",
      position: "Creative Director",
      company: "Design Studio Pro",
      content: "Our portfolio website needed to showcase our design work in the best possible light. This developer created a stunning, visually-driven site that loads quickly and presents our work beautifully across all devices. Their understanding of design principles made collaboration effortless.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      project: "Portfolio Website"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Operations Manager",
      company: "Logistics Plus",
      content: "The custom logistics solution developed for our company has improved our efficiency by 30%. The system is robust, reliable, and perfectly tailored to our unique requirements. Even after the project was completed, the developer was available for questions and minor adjustments.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 4,
      project: "Logistics Management System"
    }
  ];

  const stats = [
    { value: "100+", label: "Projects Completed" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "50+", label: "Repeat Clients" },
    { value: "8+", label: "Years Experience" }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -150) {
      // Swipe right
      prevSlide();
    }
  };

  // Add mouse movement tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  
  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    // Header animations
    if (headerRef.current) {
      const tl = gsap.timeline();
      tl.from(".reviews-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      }).from(".reviews-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
    }

    // Stats animations with 3D effect
    if (statsRef.current) {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".stat-value", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%"
        },
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        stagger: 0.2,
        ease: "power2.out"
      });
      
      // Add hover effect for stat items
      document.querySelectorAll('.stat-item').forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -5,
            scale: 1.05,
            duration: 0.3,
            ease: "back.out"
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "back.out"
          });
        });
      });
    }

    // Testimonials animations with 3D hover effect
    if (testimonialsRef.current) {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      // Set up 3D effect for testimonial cards
      document.querySelectorAll('.testimonial-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            z: 20,
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            z: 0,
            scale: 1,
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            duration: 0.3,
            ease: "power2.out",
            rotateX: 0,
            rotateY: 0
          });
        });
      });
    }

    // Set up auto-sliding
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Animation for slider with enhanced transition
    const animateSlide = () => {
      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: `-${activeIndex * 100}%`,
          duration: 0.6,
          ease: "back.out(1.2)"
        });
      }
    };

    animateSlide();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(slideInterval);
      
      // Clean up event listeners
      document.querySelectorAll('.stat-item, .testimonial-card').forEach((element) => {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
        element.removeEventListener('mousemove', () => {});
      });
    };
  }, [activeIndex]);

  return (
    <>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="reviews-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Client <span className="text-primary">Testimonials</span>
            </h1>
            <p className="reviews-subtitle max-w-[700px] text-lg md:text-xl text-muted-foreground">
              Discover what clients have to say about their experiences working with me on various projects.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with 3D hover effect */}
      <section ref={statsRef} className="py-20 lg:py-24 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item perspective-[1000px] transition-all duration-300">
                <div className="flex flex-col items-center bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 transform transition-all duration-300">
                  <span className="stat-value text-4xl md:text-5xl font-bold text-primary mb-3">{stat.value}</span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials with 3D effect */}
      <section ref={testimonialsRef} className="py-12 lg:py-24 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Featured Reviews
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Read through a selection of client testimonials and discover how my work has helped businesses achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="testimonial-card perspective-[1000px]">
                <Card 
                  className="h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl"
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    handleMouseMove(e, card);
                  }}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                >
                  <CardContent className="p-6 flex-grow flex flex-col relative overflow-hidden">
                    {/* Add decorative elements for 3D effect */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
                    
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center mt-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-offset-2 ring-primary/20 transition-all duration-300 hover:ring-primary">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Slider with enhanced 3D effect */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Client Success Stories
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Swipe through testimonials from clients across different industries and projects
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-10">
            <div 
              className="overflow-hidden perspective-[1200px]" 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ width: `${testimonials.length * 100}%` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} style={{ width: `${100 / testimonials.length}%` }} className="px-4">
                    <Card 
                      className="h-full flex flex-col transform-gpu transition-all duration-300 hover:shadow-xl"
                      onMouseMove={(e) => {
                        const card = e.currentTarget;
                        handleMouseMove(e, card);
                      }}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <CardContent className="p-8 flex-grow relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
                        
                        <div className="mb-6 flex items-center justify-between relative z-10">
                          <div className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full">
                            {testimonial.project}
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-lg mb-8 relative z-10">"{testimonial.content}"</p>
                        <div className="flex items-center relative z-10">
                          <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-offset-2 ring-primary/20 transition-all duration-300 hover:ring-primary">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">{testimonial.name}</p>
                            <p className="text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows with enhanced hover effect */}
            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full hover:scale-110 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button 
              variant="outline" 
              size="icon"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full hover:scale-110 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots with enhanced hover effect */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === activeIndex ? 'bg-primary' : 'bg-primary/20'
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with 3D effect */}
      <section className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8 space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transform hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transform hover:scale-110 hover:bg-primary/20 transition-all duration-300">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Ready to join our satisfied clients?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact me today to discuss your project needs and discover how I can help bring your vision to life with the same level of excellence and dedication.
            </p>
            <Button size="lg" className="px-8 hover:scale-105 transition-all hover:shadow-lg hover:shadow-primary/20">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;


import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Palette, Terminal, Rocket, Globe, Laptop, Smartphone, Zap } from "lucide-react";
import gsap from "gsap";
import VideoBackground from "@/components/VideoBackground";

// Service data with expanded details for all services
const serviceData = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Creating modern, responsive websites and web applications that deliver exceptional user experiences.",
    icon: Code,
    fullDescription: `Our web development services focus on building fast, responsive, and user-friendly websites 
    that help businesses achieve their digital goals. We use the latest technologies and best practices to 
    ensure your website is not only visually appealing but also performant and accessible.`,
    process: [
      "Discovery and Requirements Analysis",
      "UX/UI Design and Prototyping",
      "Frontend & Backend Development",
      "Testing and Quality Assurance",
      "Deployment and Maintenance"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    benefits: [
      "Improved user engagement and conversion rates",
      "Mobile-optimized experiences across all devices",
      "Fast loading speeds and performance",
      "SEO-friendly structure and implementation",
      "Scalable architecture for future growth"
    ],
    portfolioItems: [
      {
        title: "E-commerce Platform",
        description: "A modern online store with advanced filtering and payment processing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
      },
      {
        title: "Business Dashboard",
        description: "Real-time analytics and reporting platform for enterprise clients",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/517069920.sd.mp4?s=ee513ec939060b8276e8c7728db8ca435540ae55&profile_id=164&oauth2_token_id=57447761"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Creating beautiful user interfaces and experiences that engage and convert.",
    icon: Palette,
    fullDescription: `Our UI/UX design process combines aesthetics with functionality to create delightful user experiences.
    We focus on understanding your users' needs and behaviors to design interfaces that are intuitive,
    engaging, and aligned with your business objectives.`,
    process: [
      "User Research and Persona Development",
      "Information Architecture and User Flows",
      "Wireframing and Prototyping",
      "Visual Design and Branding",
      "Usability Testing and Iteration"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Usability Testing"],
    benefits: [
      "Increased user satisfaction and loyalty",
      "Higher conversion rates and engagement",
      "Reduced development costs through early problem detection",
      "Consistent brand experience across platforms",
      "Data-driven design decisions"
    ],
    portfolioItems: [
      {
        title: "Mobile App Redesign",
        description: "Complete UX overhaul for a fitness tracking application",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9"
      },
      {
        title: "Banking Dashboard",
        description: "User-centered design for financial management platform",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/528759540.sd.mp4?s=7ec3ad5ea61f875b273aeae0fffa8e694d9544e6&profile_id=164&oauth2_token_id=57447761"
  },
  {
    id: "technical-consulting",
    title: "Technical Consulting",
    description: "Providing expert advice on software architecture, technology stack, and best practices.",
    icon: Terminal,
    fullDescription: `Our technical consulting services help businesses make informed technology decisions that
    align with their strategic goals. We provide expert guidance on software architecture, technology selection,
    security best practices, and technical strategy to ensure your digital initiatives succeed.`,
    process: [
      "Technology Assessment and Gap Analysis",
      "Architecture Design and Review",
      "Technology Selection and Evaluation",
      "Performance Optimization",
      "Security and Compliance Review"
    ],
    technologies: ["System Architecture", "Cloud Solutions", "DevOps", "Security", "Performance Optimization"],
    benefits: [
      "Reduced technical debt and maintenance costs",
      "Improved system performance and scalability",
      "Enhanced security posture and compliance",
      "Better alignment of technology with business goals",
      "Accelerated digital transformation"
    ],
    portfolioItems: [
      {
        title: "Cloud Migration Strategy",
        description: "AWS migration roadmap for enterprise SaaS product",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
      },
      {
        title: "System Architecture Redesign",
        description: "Microservices architecture for legacy application",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/435675134.sd.mp4?s=01ad1ba42dcbc4a60f78d721ac2fecb4a46724f0&profile_id=164&oauth2_token_id=57447761"
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile applications with seamless user experiences.",
    icon: Smartphone,
    fullDescription: `We develop high-performance, feature-rich mobile applications for iOS and Android platforms that 
    deliver exceptional user experiences. Whether you need a native app or a cross-platform solution, our team 
    utilizes the latest technologies and methodologies to create mobile solutions that drive engagement and results.`,
    process: [
      "Market Research and Concept Validation",
      "User Experience Design and Prototyping",
      "Development and Integration",
      "Quality Assurance and Testing",
      "Deployment and Ongoing Support"
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase", "AWS Mobile"],
    benefits: [
      "Increased customer engagement and retention",
      "Cross-platform compatibility",
      "Intuitive and responsive user interfaces",
      "Optimized performance and battery usage",
      "Integration with device features and third-party services"
    ],
    portfolioItems: [
      {
        title: "Health & Fitness App",
        description: "Comprehensive health tracking and workout planning application",
        image: "https://images.unsplash.com/photo-1576442312432-f41d1fd1d8eb"
      },
      {
        title: "Food Delivery Platform",
        description: "On-demand food delivery service with real-time tracking",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/394394359.sd.mp4?s=8e674482526709fa715be1651dc0935ee4cbb16a&profile_id=164&oauth2_token_id=57447761"
  },
  {
    id: "ecommerce-solutions",
    title: "E-commerce Solutions",
    description: "Building scalable online stores with seamless shopping experiences and secure payment processing.",
    icon: Globe,
    fullDescription: `We create comprehensive e-commerce solutions that transform your business model and drive sales. 
    From storefront design to payment integration and inventory management, we deliver end-to-end e-commerce 
    platforms that provide seamless shopping experiences for your customers.`,
    process: [
      "Business Requirements Analysis",
      "Platform Selection and Strategy",
      "Design and User Experience",
      "Development and Integration",
      "Testing, Launch, and Growth Optimization"
    ],
    technologies: ["Shopify", "WooCommerce", "Magento", "Custom Solutions", "Payment Gateways", "Analytics"],
    benefits: [
      "Increased sales and conversion rates",
      "Streamlined inventory and order management",
      "Secure and convenient payment processing",
      "Personalized customer experiences",
      "Detailed analytics and business insights"
    ],
    portfolioItems: [
      {
        title: "Fashion Boutique",
        description: "Custom e-commerce platform for a luxury fashion brand",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
      },
      {
        title: "Electronics Marketplace",
        description: "Multi-vendor marketplace for consumer electronics",
        image: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/474126381.sd.mp4?s=1bcf4126ae6c08eee231415520121f991279a538&profile_id=164&oauth2_token_id=57447761"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Developing comprehensive strategies to grow your online presence and reach your target audience.",
    icon: Rocket,
    fullDescription: `Our digital marketing services help businesses reach their target audience, increase brand awareness,
    and drive conversions through data-driven strategies. We combine creativity with analytics to develop
    comprehensive marketing campaigns that deliver measurable results across multiple digital channels.`,
    process: [
      "Market and Competitor Analysis",
      "Strategy Development and Planning",
      "Content Creation and Campaign Execution",
      "Performance Monitoring and Optimization",
      "Reporting and Strategy Refinement"
    ],
    technologies: ["SEO", "PPC", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics"],
    benefits: [
      "Increased brand visibility and recognition",
      "Higher quality traffic and lead generation",
      "Improved conversion rates and ROI",
      "Data-driven decision making",
      "Competitive advantage in the digital landscape"
    ],
    portfolioItems: [
      {
        title: "SaaS Growth Campaign",
        description: "Comprehensive marketing strategy for a B2B SaaS platform",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312"
      },
      {
        title: "E-commerce SEO Overhaul",
        description: "Search engine optimization for an online retailer",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"
      }
    ],
    videoSrc: "https://player.vimeo.com/external/330412624.sd.mp4?s=39df58c0c8340f58a512106d6b272578625a9f79&profile_id=164&oauth2_token_id=57447761"
  }
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData.find(s => s.id === slug);
  
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!service) return;
    
    // Animation for heading section
    const headingElements = headingRef.current;
    if (headingElements) {
      const tl = gsap.timeline();
      tl.from(".service-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(".service-description", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");
    }
    
    // Animation for content section with improved smoothness
    const contentElements = contentRef.current;
    if (contentElements) {
      gsap.from(".service-content", {
        scrollTrigger: {
          trigger: contentElements,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });
    }
    
    // Animation for process section with improved smoothness
    const processElements = processRef.current;
    if (processElements) {
      gsap.from(".process-item", {
        scrollTrigger: {
          trigger: processElements,
          start: "top 80%",
        },
        opacity: 0,
        x: -20,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }
    
    // Animation for benefits section with improved smoothness
    const benefitsElements = benefitsRef.current;
    if (benefitsElements) {
      gsap.from(".benefit-item", {
        scrollTrigger: {
          trigger: benefitsElements,
          start: "top 80%",
        },
        opacity: 0,
        y: 15,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
    
    // Animation for portfolio section with improved smoothness
    const portfolioElements = portfolioRef.current;
    if (portfolioElements) {
      gsap.from(".portfolio-item", {
        scrollTrigger: {
          trigger: portfolioElements,
          start: "top 80%",
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, [service]);
  
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">The service you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/services">Back to Services</Link>
        </Button>
      </div>
    );
  }
  
  const ServiceIcon = service.icon;
  
  return (
    <>
      {/* Hero Section with Video Background */}
      <VideoBackground videoSrc={service.videoSrc}>
        <div ref={headingRef} className="flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 transform-gpu hover:scale-110 transition-all duration-300">
            <ServiceIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="service-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            {service.title}
          </h1>
          <p className="service-description max-w-[800px] text-lg md:text-xl text-gray-300">
            {service.description}
          </p>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-background/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </VideoBackground>
      
      {/* Full Description Section */}
      <section className="py-16 lg:py-24">
        <div ref={contentRef} className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="service-content">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground mb-6">{service.fullDescription}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                {service.technologies.map((tech, index) => (
                  <span key={index} className="px-4 py-2 rounded-full text-sm bg-accent text-accent-foreground hover:scale-105 transition-transform duration-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="service-content h-full relative overflow-hidden rounded-2xl shadow-2xl perspective-1000">
              {/* Interactive 3D card with image */}
              <div className="transform-gpu transition-all duration-500 hover:scale-105 h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-70"></div>
                <img
                  src={service.portfolioItems[0].image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-accent/30">
        <div ref={processRef} className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-primary/30 md:before:mx-auto md:before:translate-x-0">
            {service.process.map((step, index) => (
              <div 
                key={index} 
                className={`process-item relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:justify-between md:space-x-4 mb-12`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white transition-transform duration-300 hover:scale-110">
                    {index + 1}
                  </div>
                  <div className={`space-y-1 md:w-[300px] text-left ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-xl font-bold">{step}</h3>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[300px] shadow-lg transform-gpu hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <p className="text-muted-foreground">
                    {`Step ${index + 1} of our comprehensive ${service.title.toLowerCase()} process, focusing on ${step.toLowerCase()} to ensure exceptional results.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div ref={benefitsRef} className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="benefit-item bg-card p-6 rounded-xl border border-border shadow-md transform-gpu hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:bg-primary/30">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.split(' ')[0]}</h3>
                <p className="text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section className="py-16 lg:py-24 bg-accent/30">
        <div ref={portfolioRef} className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-item perspective-1000">
                <div className="relative overflow-hidden rounded-xl shadow-lg transform-gpu hover:scale-105 transition-all duration-500 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's discuss your {service.title.toLowerCase()} needs and create a tailored solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="rounded-full px-8 hover:scale-105 transition-all duration-300">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 hover:scale-105 transition-all duration-300">
                <Link to="/services">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;

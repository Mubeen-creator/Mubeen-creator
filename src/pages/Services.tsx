
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Code, Palette, Smartphone, Globe, Zap, Briefcase } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  slug: string;
  title: string;
  description: string;
  icon: any;
  highlights: string[];
  details: {
    description: string;
    process: {
      title: string;
      description: string;
    }[];
    technologies: string[];
    benefits: string[];
    pricing: {
      basic: string;
      standard: string;
      premium: string;
    };
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

// Detailed services data
const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Modern, responsive websites and web applications tailored to your specific needs.",
    icon: Code,
    highlights: [
      "Custom website development",
      "Progressive web apps (PWAs)",
      "E-commerce solutions",
      "CMS integration",
      "Performance optimization"
    ],
    details: {
      description: "I build custom, high-performance websites and web applications using the latest technologies and best practices. From simple landing pages to complex web platforms, I focus on creating responsive, accessible, and user-friendly digital experiences that help businesses achieve their goals.",
      process: [
        {
          title: "Discovery",
          description: "Understanding your business goals, target audience, and project requirements through in-depth consultation."
        },
        {
          title: "Planning",
          description: "Creating a detailed project plan, sitemap, and technical specifications to guide the development process."
        },
        {
          title: "Design",
          description: "Developing wireframes and visual designs that align with your brand and meet user needs."
        },
        {
          title: "Development",
          description: "Building the website or application using modern frameworks and clean, maintainable code."
        },
        {
          title: "Testing",
          description: "Rigorous testing across devices and browsers to ensure quality and performance."
        },
        {
          title: "Launch",
          description: "Deploying the site to production and providing thorough documentation."
        }
      ],
      technologies: [
        "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", 
        "GraphQL", "Tailwind CSS", "GSAP", "Framer Motion", "AWS"
      ],
      benefits: [
        "Improved online presence and brand visibility",
        "Enhanced user experience and engagement",
        "Increased conversion rates and sales",
        "Better performance and SEO rankings",
        "Scalable solution that grows with your business"
      ],
      pricing: {
        basic: "$2,500 - $5,000",
        standard: "$5,000 - $15,000",
        premium: "$15,000+"
      },
      faqs: [
        {
          question: "How long does it typically take to build a website?",
          answer: "The timeline depends on the project scope and complexity. Simple websites can take 2-4 weeks, while complex web applications may take 3-6 months or more. We'll provide a specific timeline during the planning phase."
        },
        {
          question: "Do you provide website maintenance services?",
          answer: "Yes, I offer ongoing maintenance and support services to ensure your website remains secure, up-to-date, and performing optimally. Maintenance packages can be tailored to your specific needs."
        },
        {
          question: "Can you work with my existing brand guidelines?",
          answer: "Absolutely. I can adapt to existing brand guidelines to ensure your website aligns perfectly with your overall brand identity and messaging."
        }
      ]
    }
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-focused design that enhances engagement and provides exceptional user experiences.",
    icon: Palette,
    highlights: [
      "User research and personas",
      "Wireframing and prototyping",
      "Visual design",
      "Usability testing",
      "Design systems"
    ],
    details: {
      description: "Great design is more than aesthetics—it's about creating intuitive, enjoyable experiences that solve real user problems. My comprehensive UI/UX design process focuses on understanding user needs and business objectives to create digital products that look beautiful and work beautifully.",
      process: [
        {
          title: "Research",
          description: "Conducting user research, competitive analysis, and stakeholder interviews to understand the problem space."
        },
        {
          title: "Strategy",
          description: "Defining user personas, journey maps, and information architecture to guide the design process."
        },
        {
          title: "Wireframing",
          description: "Creating low-fidelity wireframes to establish layout and functionality before visual design."
        },
        {
          title: "UI Design",
          description: "Developing high-fidelity mockups with attention to visual hierarchy, typography, and brand consistency."
        },
        {
          title: "Prototyping",
          description: "Building interactive prototypes to test user flows and interactions."
        },
        {
          title: "Testing",
          description: "Conducting usability testing to validate designs and identify areas for improvement."
        }
      ],
      technologies: [
        "Figma", "Adobe XD", "Sketch", "Framer", "InVision", "Zeplin", 
        "Principle", "Maze", "Hotjar", "UserTesting"
      ],
      benefits: [
        "Increased user satisfaction and engagement",
        "Higher conversion rates and customer retention",
        "Reduced development costs by identifying issues early",
        "Competitive advantage through superior user experience",
        "Consistent and cohesive brand experience across touchpoints"
      ],
      pricing: {
        basic: "$3,000 - $7,000",
        standard: "$7,000 - $15,000",
        premium: "$15,000+"
      },
      faqs: [
        {
          question: "What deliverables will I receive from the design process?",
          answer: "Typical deliverables include user personas, journey maps, wireframes, UI style guides, high-fidelity mockups, interactive prototypes, and design specifications for developers."
        },
        {
          question: "How do you ensure the designs will work for my target audience?",
          answer: "I incorporate user research and testing throughout the design process to validate assumptions and ensure the final design meets the needs of your specific target audience."
        },
        {
          question: "Can you redesign my existing product?",
          answer: "Yes, I offer redesign services for existing products, starting with a UX audit to identify improvement opportunities before beginning the redesign process."
        }
      ]
    }
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver seamless experiences.",
    icon: Smartphone,
    highlights: [
      "iOS and Android development",
      "React Native applications",
      "Flutter development",
      "App performance optimization",
      "App store submission"
    ],
    details: {
      description: "I develop high-quality mobile applications for iOS and Android platforms that combine beautiful design with powerful functionality. Whether you need a native app for maximum performance or a cross-platform solution for cost efficiency, I deliver mobile experiences that users love and businesses rely on.",
      process: [
        {
          title: "Concept",
          description: "Defining app concept, goals, and target audience to guide development."
        },
        {
          title: "Design",
          description: "Creating wireframes and UI designs optimized for mobile interfaces and platforms."
        },
        {
          title: "Development",
          description: "Building the application using either native technologies or cross-platform frameworks."
        },
        {
          title: "Testing",
          description: "Comprehensive testing across devices, screen sizes, and operating systems."
        },
        {
          title: "Deployment",
          description: "App store submission and handling of the review process."
        },
        {
          title: "Maintenance",
          description: "Ongoing updates, performance monitoring, and feature enhancements."
        }
      ],
      technologies: [
        "React Native", "Flutter", "Swift", "Kotlin", "Firebase", 
        "Redux", "MobX", "GraphQL", "SQLite", "Realm"
      ],
      benefits: [
        "Expanded market reach through mobile channels",
        "Enhanced customer engagement and loyalty",
        "New revenue streams and business opportunities",
        "Improved brand presence on mobile platforms",
        "Competitive advantage in the mobile-first world"
      ],
      pricing: {
        basic: "$10,000 - $25,000",
        standard: "$25,000 - $75,000",
        premium: "$75,000+"
      },
      faqs: [
        {
          question: "Should I build a native or cross-platform app?",
          answer: "The choice depends on your specific requirements, budget, and timeline. Native apps offer the best performance and platform-specific features, while cross-platform solutions like React Native offer cost efficiency and faster development. I can help you make the right decision for your project."
        },
        {
          question: "How long does it take to develop a mobile app?",
          answer: "Development timelines vary based on complexity. Simple apps might take 2-3 months, while complex applications with custom features can take 6-12 months. We'll provide a detailed timeline during the planning phase."
        },
        {
          question: "Do you handle app store submissions?",
          answer: "Yes, I manage the entire submission process for both Apple App Store and Google Play Store, including preparing screenshots, descriptions, and handling any review issues that may arise."
        }
      ]
    }
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Strategic digital marketing solutions to grow your online presence and reach.",
    icon: Globe,
    highlights: [
      "SEO optimization",
      "Content marketing",
      "Social media strategy",
      "Email campaigns",
      "Analytics and reporting"
    ],
    details: {
      description: "I help businesses grow their online presence and reach their target audience through data-driven digital marketing strategies. From SEO and content marketing to social media management and email campaigns, I create comprehensive marketing solutions that generate tangible results.",
      process: [
        {
          title: "Audit",
          description: "Analyzing current digital presence, competitors, and market opportunities."
        },
        {
          title: "Strategy",
          description: "Developing a tailored marketing plan aligned with business goals and audience needs."
        },
        {
          title: "Implementation",
          description: "Executing marketing campaigns across selected channels and platforms."
        },
        {
          title: "Optimization",
          description: "Continuous testing and refinement based on performance data."
        },
        {
          title: "Reporting",
          description: "Regular analytics reports with insights and recommendations."
        },
        {
          title: "Scaling",
          description: "Expanding successful strategies and exploring new opportunities."
        }
      ],
      technologies: [
        "Google Analytics", "Google Search Console", "SEMrush", "Ahrefs", 
        "Mailchimp", "Klaviyo", "HubSpot", "Buffer", "Hootsuite", "Meta Business Suite"
      ],
      benefits: [
        "Increased website traffic and qualified leads",
        "Improved search engine rankings and visibility",
        "Enhanced brand awareness and recognition",
        "Higher engagement and conversion rates",
        "Data-driven insights for business decision making"
      ],
      pricing: {
        basic: "$1,500 - $3,000/month",
        standard: "$3,000 - $7,000/month",
        premium: "$7,000+/month"
      },
      faqs: [
        {
          question: "How quickly will I see results from digital marketing efforts?",
          answer: "Results timelines vary by channel. Some tactics like PPC can show immediate results, while SEO typically takes 3-6 months to see significant improvements. I focus on both quick wins and long-term sustainable growth."
        },
        {
          question: "Do you offer standalone services or only comprehensive packages?",
          answer: "I offer both comprehensive marketing packages and standalone services such as SEO, social media management, or content marketing, depending on your specific needs and priorities."
        },
        {
          question: "How do you measure and report on marketing performance?",
          answer: "I provide regular reporting with key performance indicators relevant to your business goals. Reports include detailed analytics, insights, and strategic recommendations for ongoing optimization."
        }
      ]
    }
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    description: "Comprehensive branding solutions that establish a strong, memorable identity.",
    icon: Zap,
    highlights: [
      "Brand strategy",
      "Logo design",
      "Brand guidelines",
      "Visual identity",
      "Brand messaging"
    ],
    details: {
      description: "I help businesses create and refine their brand identity to stand out in crowded markets and connect with their audience. From strategic positioning to visual identity development, I craft cohesive brand experiences that communicate your unique value and leave a lasting impression.",
      process: [
        {
          title: "Discovery",
          description: "Exploring your brand's essence, values, audience, and market position."
        },
        {
          title: "Strategy",
          description: "Developing brand positioning, personality, and messaging framework."
        },
        {
          title: "Identity",
          description: "Creating visual elements including logo, color palette, typography, and imagery."
        },
        {
          title: "Guidelines",
          description: "Documenting comprehensive brand guidelines for consistent application."
        },
        {
          title: "Collateral",
          description: "Designing key brand touchpoints and marketing materials."
        },
        {
          title: "Launch",
          description: "Supporting brand rollout and implementation across channels."
        }
      ],
      technologies: [
        "Adobe Creative Suite", "Figma", "Sketch", "InDesign", 
        "Illustrator", "Photoshop", "Brandmark", "Invision"
      ],
      benefits: [
        "Distinctive market positioning and competitive advantage",
        "Increased brand recognition and recall",
        "Stronger emotional connection with your audience",
        "Consistent brand experience across all touchpoints",
        "Foundation for effective marketing and communications"
      ],
      pricing: {
        basic: "$3,000 - $7,000",
        standard: "$7,000 - $15,000",
        premium: "$15,000+"
      },
      faqs: [
        {
          question: "Do I need a complete rebrand or just a brand refresh?",
          answer: "This depends on your current brand equity and business goals. A brand audit can help determine whether an evolution (refresh) or revolution (rebrand) is appropriate. I can guide you through this decision based on a thorough assessment."
        },
        {
          question: "What deliverables are included in a typical branding project?",
          answer: "Deliverables typically include brand strategy documentation, logo files in various formats, color palette specifications, typography guidelines, usage examples, and comprehensive brand guidelines. Additional collateral like business cards, stationery, and social media templates can be included based on project scope."
        },
        {
          question: "How long does a branding project take?",
          answer: "A comprehensive branding project typically takes 6-12 weeks, depending on scope and complexity. Simpler projects focused on visual identity may be completed in 4-6 weeks."
        }
      ]
    }
  },
  {
    slug: "consulting-strategy",
    title: "Consulting & Strategy",
    description: "Expert guidance on technology choices, product strategy, and digital transformation.",
    icon: Briefcase,
    highlights: [
      "Technology consulting",
      "Digital transformation",
      "Product strategy",
      "Technical architecture",
      "Team training"
    ],
    details: {
      description: "I provide strategic technology consulting to help businesses make informed decisions about digital products, technical architecture, and transformation initiatives. Drawing on extensive industry experience, I offer practical guidance that bridges business objectives with technical realities.",
      process: [
        {
          title: "Assessment",
          description: "Evaluating current systems, processes, and capabilities against business goals."
        },
        {
          title: "Research",
          description: "Exploring relevant technologies, industry trends, and best practices."
        },
        {
          title: "Strategy",
          description: "Developing recommendations and roadmaps aligned with business objectives."
        },
        {
          title: "Planning",
          description: "Creating detailed implementation plans with clear milestones and deliverables."
        },
        {
          title: "Guidance",
          description: "Providing ongoing expert advice and direction during implementation."
        },
        {
          title: "Evaluation",
          description: "Measuring outcomes and adjusting strategies as needed."
        }
      ],
      technologies: [
        "Architecture Design", "System Integration", "Cloud Migration", 
        "DevOps Implementation", "Agile Transformation", "Digital Workspace"
      ],
      benefits: [
        "Informed technology decisions aligned with business goals",
        "Reduced implementation risks and technical debt",
        "Optimized resource allocation and investment",
        "Accelerated digital transformation initiatives",
        "Enhanced team capabilities and technological self-sufficiency"
      ],
      pricing: {
        basic: "$150 - $200/hour",
        standard: "$5,000 - $15,000/project",
        premium: "$10,000 - $30,000/month"
      },
      faqs: [
        {
          question: "How do you tailor consulting services to my specific industry?",
          answer: "I take time to understand your industry's unique challenges, regulations, and opportunities before providing recommendations. My experience spans multiple sectors, and I continuously research industry-specific trends and best practices."
        },
        {
          question: "Can you help train our internal team during the consulting engagement?",
          answer: "Yes, knowledge transfer and team enablement are key components of my consulting approach. I can provide workshops, training sessions, and documentation to help your team build capabilities and self-sufficiency."
        },
        {
          question: "What makes your consulting approach different?",
          answer: "My approach combines strategic thinking with practical implementation experience. I don't just provide theoretical recommendations—I offer actionable guidance grounded in real-world technical expertise and a focus on measurable business outcomes."
        }
      ]
    }
  }
];

// Process steps for overall service approach
const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your goals, requirements, and vision through in-depth consultations."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Developing a comprehensive plan tailored to your specific needs and objectives."
  },
  {
    number: "03",
    title: "Design",
    description: "Creating intuitive, beautiful interfaces and experiences that engage your users."
  },
  {
    number: "04",
    title: "Development",
    description: "Building robust, scalable solutions with clean, maintainable code."
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous quality assurance to ensure flawless functionality and performance."
  },
  {
    number: "06",
    title: "Launch",
    description: "Seamless deployment and ongoing support to keep your project running smoothly."
  }
];

// Service Detail Page Component
const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Find the service based on slug
  const service = services.find(s => s.slug === slug);
  
  // Redirect to services page if service not found
  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);
  
  useEffect(() => {
    if (!service) return;
    
    // Animate header section
    const headerElements = headerRef.current;
    if (headerElements) {
      const tl = gsap.timeline();
      tl.from(".detail-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".detail-description", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(".back-button", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3");
    }
    
    // Animate details section
    const detailsSection = detailsRef.current;
    if (detailsSection) {
      gsap.from(".detail-content", {
        scrollTrigger: {
          trigger: detailsSection,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }
    
    // Animate process steps
    const processSection = processRef.current;
    if (processSection) {
      gsap.from(".process-item", {
        scrollTrigger: {
          trigger: processSection,
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: "power3.out"
      });
    }
    
    // Animate technologies
    const techSection = techRef.current;
    if (techSection) {
      gsap.from(".tech-item", {
        scrollTrigger: {
          trigger: techSection,
          start: "top 85%"
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
    
    // Animate pricing cards
    const pricingSection = pricingRef.current;
    if (pricingSection) {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: pricingSection,
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }
    
    // Animate FAQs
    const faqSection = faqRef.current;
    if (faqSection) {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: faqSection,
          start: "top 85%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out"
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [service, navigate]);
  
  if (!service) return null;
  
  return (
    <>
      {/* Header Section */}
      <section ref={headerRef} className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30">
        <div className="container px-4 md:px-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/services')}
            className="back-button mb-8 flex items-center hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
          
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <service.icon className="h-10 w-10 text-primary" />
            </div>
            <h1 className="detail-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              {service.title}
            </h1>
            <p className="detail-description max-w-[800px] text-lg md:text-xl text-muted-foreground">
              {service.details.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section ref={processRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
            Our <span className="text-primary">Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.details.process.map((step, index) => (
              <div key={index} className="process-item transform-gpu hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
                <Card className="h-full border-border hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <span className="font-bold text-primary">{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section ref={techRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
            Technologies & <span className="text-primary">Tools</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.details.technologies.map((tech, index) => (
              <div 
                key={index} 
                className="tech-item px-5 py-3 bg-card rounded-full border border-border hover:border-primary/50 hover:-translate-y-1 transform-gpu transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section ref={detailsRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
            Key <span className="text-primary">Benefits</span>
          </h2>
          
          <div className="detail-content grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.details.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <span className="text-primary text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
            Pricing <span className="text-primary">Options</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Basic", price: service.details.pricing.basic, features: ["Essential features", "Standard support", "Basic documentation"] },
              { name: "Standard", price: service.details.pricing.standard, features: ["All Basic features", "Advanced functionality", "Priority support", "Detailed documentation", "1 month of maintenance"] },
              { name: "Premium", price: service.details.pricing.premium, features: ["All Standard features", "Custom solutions", "24/7 support", "Comprehensive documentation", "3 months of maintenance", "Strategy consultation"] },
            ].map((plan, index) => (
              <div key={index} className="pricing-card perspective-1000">
                <Card className={`h-full border-border transition-all duration-300 transform-gpu ${index === 1 ? 'border-primary/50 shadow-lg relative -mt-4 md:-mt-8' : 'hover:border-primary/30'}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="px-4 py-1 bg-primary text-white text-sm rounded-full">Recommended</span>
                    </div>
                  )}
                  <CardContent className="p-6 pt-8">
                    <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-center text-primary mb-6">{plan.price}</div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className={`w-full ${index === 1 ? '' : 'variant-outline'}`}
                      variant={index === 1 ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-16">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {service.details.faqs.map((faq, index) => (
              <div key={index} className="faq-item mb-8 last:mb-0">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 lg:py-32 overflow-hidden bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Contact me today to discuss how my {service.title.toLowerCase()} services can help your business grow and succeed.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

// Main Services Page Component
const ServicesPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Header animations
    if (headerRef.current) {
      const tl = gsap.timeline();
      tl.from(".services-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      }).from(".services-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
    }

    // Services animations
    if (servicesRef.current) {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(".service-icon", {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%"
        },
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3
      });
    }

    // Process steps animation
    if (processRef.current) {
      gsap.from(".process-step", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%"
        },
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(".step-number", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%"
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.3
      });

      // Process line animation
      gsap.from(".process-line", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%"
        },
        height: 0,
        duration: 1.5,
        ease: "power3.inOut"
      });
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.from(".cta-container", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Handle service card click to navigate to service detail
  const handleServiceClick = (slug: string) => {
    navigate(`/services/${slug}`);
  };

  return (
    <>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="services-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              My <span className="text-primary">Services</span>
            </h1>
            <p className="services-subtitle max-w-[700px] text-lg md:text-xl text-muted-foreground">
              Specialized solutions designed to bring your vision to life and help your business thrive
              in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card perspective-1000">
                <Card 
                  className="h-full flex flex-col border-border hover:border-primary/50 transition-all duration-300 transform-gpu hover:-translate-y-2"
                  onClick={() => handleServiceClick(service.slug)}
                >
                  <CardContent className="p-6 flex-grow cursor-pointer">
                    <div className="flex justify-center mb-6">
                      <div className="service-icon text-5xl w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                        <service.icon className="h-10 w-10" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-center mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full group"
                      onClick={() => handleServiceClick(service.slug)}
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              My Process
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              A systematic approach ensures every project is delivered with excellence and meets your objectives
            </p>
          </div>

          <div className="relative">
            {/* Vertical line connecting all steps */}
            <div className="process-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/20 h-full hidden md:block"></div>

            <div className="space-y-24 md:space-y-0">
              {processSteps.map((step, index) => (
                <div key={index} className={`process-step relative ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} md:w-1/2 md:pl-12 md:pr-12 mb-12 md:mb-24`}>
                  <div className={`bg-card rounded-xl p-8 shadow-lg border border-border relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    {/* Number badge */}
                    <div className="step-number absolute -top-6 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-auto md:-translate-x-0 md:m-0">
                      <div className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg ${index % 2 === 0 ? 'md:-left-20' : 'md:-right-20'} md:absolute`}>
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="cta-container rounded-2xl bg-primary/10 border border-primary/20 p-8 md:p-12 text-center perspective-1000 transform-gpu hover:scale-[1.01] transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg mb-8 max-w-[600px] mx-auto text-muted-foreground">
              Contact me today to discuss your needs and discover how my services can help you achieve your goals.
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

// Main component that determines whether to show the service list or a specific service
const Services = () => {
  const { slug } = useParams();
  
  return slug ? <ServiceDetail /> : <ServicesPage />;
};

export default Services;

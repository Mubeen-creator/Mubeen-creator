
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with a clean UI, advanced filtering, and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["React", "NextJS", "Tailwind", "Stripe"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "An analytics dashboard for a SaaS platform with real-time data visualization and user management.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tags: ["TypeScript", "React", "D3.js", "Firebase"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: true,
  },
  {
    id: 3,
    title: "Mobile App UI",
    description: "A mobile application UI design for a fitness tracking app with dark mode and custom animations.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    tags: ["Figma", "UI Design", "Prototyping"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A personal portfolio website with smooth animations, parallax effects, and responsive design.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "GSAP", "Tailwind CSS"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: false,
  },
  {
    id: 5,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: false,
  },
  {
    id: 6,
    title: "Blog Platform",
    description: "A modern blog platform with markdown support, categories, and a powerful admin dashboard.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    tags: ["Next.js", "Sanity.io", "Tailwind CSS"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
    featured: false,
  },
];

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const [filter, setFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projectsData);
    } else if (filter === "featured") {
      setFilteredProjects(projectsData.filter(project => project.featured));
    }
  }, [filter]);

  useEffect(() => {
    // Header animations
    const headerElements = headerRef.current;
    if (headerElements) {
      const tl = gsap.timeline();
      tl.from(".projects-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".projects-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Projects section animations with enhanced 3D effects
    const projectsSection = projectsRef.current;
    if (projectsSection) {
      // Initial animation for cards
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: projectsSection,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
      
      // Set up hover animations for each card
      document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', (e) => {
          const target = e.currentTarget as HTMLElement;
          gsap.to(target, {
            rotateY: ((e as MouseEvent).clientX - target.getBoundingClientRect().left) / 10,
            rotateX: -((e as MouseEvent).clientY - target.getBoundingClientRect().top) / 10,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Enhance image
          const image = target.querySelector('.card-image') as HTMLElement;
          if (image) {
            gsap.to(image, {
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          
          // Enhance tags
          const tags = target.querySelectorAll('.tag-item');
          gsap.to(tags, {
            y: -5,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out"
          });
        });
        
        card.addEventListener('mouseleave', (e) => {
          const target = e.currentTarget as HTMLElement;
          gsap.to(target, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Reset image
          const image = target.querySelector('.card-image') as HTMLElement;
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          
          // Reset tags
          const tags = target.querySelectorAll('.tag-item');
          gsap.to(tags, {
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out"
          });
        });
        
        card.addEventListener('mousemove', (e) => {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();
          const x = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
          const y = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(target, {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.1,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Clean up event listeners
      document.querySelectorAll('.project-card').forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
        card.removeEventListener('mousemove', () => {});
      });
    };
  }, [filteredProjects]);

  return (
    <>
      {/* Header Section */}
      <section
        ref={headerRef}
        className="py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/30"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Recent <span className="text-primary">Projects</span>
            </h1>
            <p className="projects-subtitle max-w-[700px] text-lg md:text-xl text-muted-foreground">
              A selection of my recent work showcasing my skills and expertise in web development and design.
            </p>
            <div className="flex gap-4 mt-8">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="rounded-full hover:scale-105 transition-all"
              >
                All Projects
              </Button>
              <Button
                variant={filter === "featured" ? "default" : "outline"}
                onClick={() => setFilter("featured")}
                className="rounded-full hover:scale-105 transition-all"
              >
                Featured
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card perspective-[1000px]">
                <Card className="overflow-hidden h-full flex flex-col group transform-gpu">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-image object-cover w-full h-full transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="tag-item px-2 py-1 rounded-full text-xs bg-accent text-muted-foreground transition-all duration-300 hover:bg-primary/20 hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm" asChild className="transition-transform duration-300 hover:translate-y-[-2px]">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="transition-transform duration-300 hover:translate-y-[-2px]">
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 mt-4 hover:scale-105 transition-all hover:shadow-lg hover:shadow-primary/20">
              <Link to="/contact">Let's Connect <ArrowRight className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;

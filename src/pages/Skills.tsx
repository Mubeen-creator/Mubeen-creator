
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/VideoBackground";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the skill categories and skills
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 98 },
      { name: "Redux", level: 85 },
      { name: "Next.js", level: 80 }
    ],
    icon: "📱"
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 78 },
      { name: "REST APIs", level: 92 }
    ],
    icon: "🖥️"
  },
  {
    name: "Design",
    skills: [
      { name: "Figma", level: 88 },
      { name: "UI/UX", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "SASS/SCSS", level: 90 },
      { name: "Responsive Design", level: 95 }
    ],
    icon: "🎨"
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 78 },
      { name: "CI/CD", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Jest", level: 82 },
      { name: "Webpack", level: 85 }
    ],
    icon: "🔧"
  }
];

// Skill component with animated circles
const SkillCircle = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  
  useEffect(() => {
    if (circleRef.current && textRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(textRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  
  useEffect(() => {
    if (isVisible && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset,
          duration: 1.5,
          ease: "power2.out",
        }
      );
      
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out",
        }
      );
    }
  }, [isVisible, circumference, strokeDashoffset]);
  
  return (
    <div className="skill-circle-wrapper flex flex-col items-center justify-center transform-gpu hover:scale-110 transition-transform duration-300">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            fill="none"
            transform="rotate(-90, 50, 50)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        
        {/* Text in center */}
        <div 
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        >
          <span className="text-2xl font-bold">{level}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium">{name}</p>
    </div>
  );
};

// Hexagon skill visualization
const SkillHexagon = ({ category, index }: { category: any; index: number }) => {
  const hexRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (hexRef.current) {
      gsap.from(hexRef.current, {
        scrollTrigger: {
          trigger: hexRef.current,
          start: "top 80%",
        },
        scale: 0.5,
        opacity: 0,
        rotation: -30,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
      });
      
      // Animate skill bars inside
      const skillBars = hexRef.current.querySelectorAll(".skill-bar");
      gsap.from(skillBars, {
        scrollTrigger: {
          trigger: hexRef.current,
          start: "top 80%",
        },
        scaleX: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5 + index * 0.1,
        ease: "power2.out",
      });
    }
  }, [index]);
  
  // Generate a color based on the category index
  const getColor = (idx: number) => {
    const colors = [
      "from-purple-500 to-blue-500",
      "from-blue-500 to-teal-500",
      "from-amber-500 to-pink-500",
      "from-emerald-500 to-cyan-500"
    ];
    return colors[idx % colors.length];
  };
  
  return (
    <div 
      ref={hexRef}
      className="hex-container perspective-1000 transform-gpu transition-all duration-300 hover:scale-105 hover:rotate-3"
    >
      <div className={`bg-gradient-to-br ${getColor(index)} p-6 rounded-2xl shadow-xl`}>
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-2">{category.icon}</span>
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
        </div>
        <div className="space-y-4">
          {category.skills.map((skill: any, idx: number) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-100 font-medium">{skill.name}</span>
                <span className="text-gray-200">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`skill-bar h-full bg-white rounded-full origin-left`} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const hexagonsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Header animations
    const headerElements = headerRef.current;
    if (headerElements) {
      const tl = gsap.timeline();
      tl.from(".skills-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".skills-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".skills-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }

    // Skills circles animations
    const skillsCircles = circlesRef.current;
    if (skillsCircles) {
      gsap.from(".skill-circle-wrapper", {
        scrollTrigger: {
          trigger: skillsCircles,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Header Section with Video Background */}
      <VideoBackground videoSrc="https://player.vimeo.com/external/368760166.sd.mp4?s=113d2361132c696a0a362c559d3f7bc35b9b1b54&profile_id=164&oauth2_token_id=57447761">
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-6">
          <h1 className="skills-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            My <span className="text-primary">Skills</span>
          </h1>
          <p className="skills-subtitle max-w-[700px] text-lg md:text-xl text-gray-300">
            A showcase of my technical expertise and professional capabilities
            across various domains of web development and design.
          </p>
          <Button variant="outline" size="lg" className="skills-cta rounded-full bg-background/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
            <Link to="/contact">Work With Me</Link>
          </Button>
        </div>
      </VideoBackground>

      {/* Interactive Skill Circles */}
      <section ref={circlesRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Core Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
            <SkillCircle name="React" level={95} color="#61DAFB" />
            <SkillCircle name="TypeScript" level={90} color="#3178C6" />
            <SkillCircle name="Node.js" level={88} color="#339933" />
            <SkillCircle name="HTML/CSS" level={98} color="#E34F26" />
            <SkillCircle name="UI/UX" level={85} color="#FF7C00" />
            <SkillCircle name="Next.js" level={80} color="#000000" />
          </div>
        </div>
      </section>
      
      {/* Hexagon Skill Categories */}
      <section ref={hexagonsRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Skill Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <SkillHexagon key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div ref={skillsRef} className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Professional Experience</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:translate-x-0">
            <div className="timeline-item relative flex flex-col md:flex-row items-center md:justify-between md:space-x-8">
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary">
                  <span className="sr-only">2022</span>
                </div>
                <div className="space-y-1 md:w-[300px] text-left md:text-right">
                  <div className="text-sm text-muted-foreground">2022 - Present</div>
                  <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
                  <p className="text-muted-foreground">TechCorp Inc.</p>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[400px] perspective-1000 hover:shadow-xl transform-gpu transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <p className="text-muted-foreground">
                  Led the frontend development team for a flagship SaaS product,
                  improving performance by 40% and implementing modern React patterns.
                  Mentored junior developers and established coding standards.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">React</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">TypeScript</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">Redux</span>
                </div>
              </div>
            </div>

            <div className="timeline-item relative flex flex-col md:flex-row-reverse items-center md:justify-between md:space-x-8">
              <div className="flex items-center space-x-4 md:space-x-8 md:flex-row-reverse">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary">
                  <span className="sr-only">2019</span>
                </div>
                <div className="space-y-1 md:w-[300px] text-left">
                  <div className="text-sm text-muted-foreground">2019 - 2022</div>
                  <h3 className="text-xl font-bold">Frontend Developer</h3>
                  <p className="text-muted-foreground">WebSolutions LLC</p>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[400px] perspective-1000 hover:shadow-xl transform-gpu transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <p className="text-muted-foreground">
                  Developed responsive websites and web applications for clients in
                  various industries. Worked directly with clients to gather requirements
                  and implement solutions that exceeded expectations.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">JavaScript</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">React</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">SASS</span>
                </div>
              </div>
            </div>

            <div className="timeline-item relative flex flex-col md:flex-row items-center md:justify-between md:space-x-8">
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary">
                  <span className="sr-only">2017</span>
                </div>
                <div className="space-y-1 md:w-[300px] text-left md:text-right">
                  <div className="text-sm text-muted-foreground">2017 - 2019</div>
                  <h3 className="text-xl font-bold">Junior Web Developer</h3>
                  <p className="text-muted-foreground">Digital Agency Co.</p>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[400px] perspective-1000 hover:shadow-xl transform-gpu transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <p className="text-muted-foreground">
                  Started my career building websites for small to medium businesses.
                  Collaborated with designers to turn mockups into functional websites.
                  Gained experience in responsive design and cross-browser compatibility.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">HTML/CSS</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">jQuery</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">WordPress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Grid */}
      <section className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Tools & Technologies</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "VS Code", icon: "💻" },
              { name: "Git", icon: "🔄" },
              { name: "Figma", icon: "🎨" },
              { name: "Docker", icon: "🐳" },
              { name: "AWS", icon: "☁️" },
              { name: "GraphQL", icon: "⚡" },
              { name: "MongoDB", icon: "🍃" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "Jest", icon: "🧪" },
              { name: "Webpack", icon: "📦" },
              { name: "Tailwind CSS", icon: "🌈" },
              { name: "Firebase", icon: "🔥" }
            ].map((tool, index) => (
              <div 
                key={index}
                className="tool-item flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border shadow-md transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/40"
              >
                <span className="text-4xl mb-3">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Want to work together?
            </h2>
            <p className="text-muted-foreground text-lg">
              I'm always looking for new and exciting projects to work on. If you
              have a project in mind, let's discuss how we can make it happen.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 mt-4">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Add some custom styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .hex-container:hover {
          transform: translateY(-10px) rotate(3deg);
        }
      `}} />
    </>
  );
};

export default Skills;


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animations
    const headerElements = headerRef.current;
    if (headerElements) {
      const tl = gsap.timeline();
      tl.from(".about-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".about-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Bio section animations
    const bioSection = bioRef.current;
    if (bioSection) {
      const bioItems = bioSection.querySelectorAll(".bio-item");
      gsap.from(bioItems, {
        scrollTrigger: {
          trigger: bioSection,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Timeline animations
    const timelineSection = timelineRef.current;
    if (timelineSection) {
      const timelineItems = timelineSection.querySelectorAll(".timeline-item");
      gsap.from(timelineItems, {
        scrollTrigger: {
          trigger: timelineSection,
          start: "top 70%",
        },
        x: -50,
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
      <VideoBackground videoSrc="https://player.vimeo.com/external/297927791.sd.mp4?s=5ceeec8c83fcb634312c157cc101b5bd19fff622&profile_id=164&oauth2_token_id=57447761">
        <div ref={headerRef} className="flex flex-col items-center text-center space-y-6">
          <h1 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="about-subtitle max-w-[700px] text-lg md:text-xl text-gray-300">
            A passionate web developer and designer with a focus on creating
            beautiful, functional, and user-centered digital experiences.
          </p>
          <Button variant="outline" size="lg" className="rounded-full flex gap-2 bg-background/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white">
            <Download className="h-4 w-4" /> Download Resume
          </Button>
        </div>
      </VideoBackground>

      {/* Bio Section */}
      <section ref={bioRef} className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
            <div className="col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-6">
                  Bio
                </h2>
                <div className="aspect-square rounded-xl bg-card mb-6 overflow-hidden relative card-3d perspective-1000 transform-gpu transition-all duration-500 hover:rotate-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  <img
                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Location:</strong>{" "}
                    <span className="text-muted-foreground">San Francisco, CA</span>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:hello@portfolio.com"
                      className="text-primary hover:underline"
                    >
                      hello@portfolio.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="space-y-10">
                <div className="bio-item space-y-4">
                  <h3 className="text-xl font-bold">My Journey</h3>
                  <p className="text-muted-foreground">
                    I'm a web developer with over 5 years of experience creating websites
                    and applications that are not only visually appealing but also
                    functional and user-friendly. My journey in tech began when I was in
                    college, where I discovered my passion for coding and design.
                  </p>
                  <p className="text-muted-foreground">
                    After graduating with a degree in Computer Science, I joined a digital
                    agency where I honed my skills working on various projects for clients
                    across different industries. This experience gave me insights into
                    different business needs and how technology can address them
                    effectively.
                  </p>
                </div>

                <div className="bio-item space-y-4">
                  <h3 className="text-xl font-bold">My Approach</h3>
                  <p className="text-muted-foreground">
                    I believe in a holistic approach to web development, where design,
                    functionality, and user experience work together harmoniously. Each
                    project I undertake is an opportunity to create something meaningful
                    that serves both the client's objectives and the end-users' needs.
                  </p>
                  <p className="text-muted-foreground">
                    My process involves close collaboration with clients, understanding
                    their vision, and translating it into a tangible digital product. I
                    focus on clean, maintainable code and responsive designs that work
                    seamlessly across all devices.
                  </p>
                </div>

                <div className="bio-item space-y-4">
                  <h3 className="text-xl font-bold">Beyond Coding</h3>
                  <p className="text-muted-foreground">
                    When I'm not coding, you can find me exploring hiking trails,
                    attending tech meetups, or experimenting with photography. I believe
                    that these diverse interests contribute to my creativity and
                    problem-solving abilities in my professional work.
                  </p>
                  <p className="text-muted-foreground">
                    I'm also passionate about continuous learning and regularly attend
                    workshops and conferences to stay updated with the latest trends and
                    technologies in the web development world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={timelineRef} className="py-20 lg:py-32 overflow-hidden bg-accent/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12">
            Professional Journey
          </h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:translate-x-0 md:space-y-16">
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
              <div className="bg-card p-4 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[300px] transform-gpu hover:scale-105 hover:rotate-3 transition-transform duration-300">
                <p className="text-sm text-muted-foreground">
                  Leading frontend development for enterprise SaaS products, mentoring
                  junior developers, and implementing best practices.
                </p>
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
              <div className="bg-card p-4 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[300px] transform-gpu hover:scale-105 hover:rotate-3 transition-transform duration-300">
                <p className="text-sm text-muted-foreground">
                  Developed responsive websites and web applications for clients in various
                  industries, focusing on performance and accessibility.
                </p>
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
              <div className="bg-card p-4 rounded-lg border border-border mt-4 md:mt-0 ml-14 md:ml-0 md:w-[300px] transform-gpu hover:scale-105 hover:rotate-3 transition-transform duration-300">
                <p className="text-sm text-muted-foreground">
                  Assisted in building websites for small to medium businesses, collaborating
                  with designers and learning the fundamentals of web development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're looking for a new website, a redesign, or a digital
              consultant, I'm here to help you achieve your goals.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 mt-4 hover:scale-105 transition-transform duration-300">
              <Link to="/contact">Let's Connect</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

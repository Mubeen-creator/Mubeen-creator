
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import gsap from "gsap";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];
  
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Animate nav items
    const tl = gsap.timeline();
    tl.fromTo(
      ".nav-item", 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }
    );
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-md shadow-md" 
        : "bg-background/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link 
          to="/" 
          className="font-heading text-2xl font-bold text-primary transform hover:scale-105 transition-all duration-300"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item px-4 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors duration-200 relative group ${
                location.pathname === item.path 
                  ? "text-primary font-medium" 
                  : ""
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                location.pathname === item.path ? "scale-x-100" : ""
              }`}></span>
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-md border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? "text-primary font-medium bg-accent/50" 
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animation: "fadeSlideIn 0.3s ease-out forwards"
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;

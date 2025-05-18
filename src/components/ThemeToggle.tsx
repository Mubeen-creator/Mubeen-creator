
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark'; // Default to dark theme
  });

  useEffect(() => {
    // On component mount, set the theme based on localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-primary/10 hover:bg-primary/20 transition-all"
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-gold-light rotate-90 transition-all duration-300" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-gold transition-all duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

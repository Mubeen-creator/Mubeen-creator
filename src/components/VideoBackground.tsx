
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface VideoBackgroundProps {
  videoSrc: string;
  overlayColor?: string;
  children: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  overlayColor = "from-black/80 to-background/90", 
  children 
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    
    if (overlay) {
      // Create a subtle animated overlay effect
      gsap.to(overlay, {
        backgroundPosition: "200% 100%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Ensure video is playing
    if (video) {
      video.play().catch(err => {
        console.log("Auto-play prevented:", err);
        // Add play button if autoplay fails
      });
    }
  }, []);
  
  return (
    <div className="relative overflow-hidden min-h-[400px]">
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay 
        muted 
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Animated Overlay */}
      <div 
        ref={overlayRef}
        className={`absolute inset-0 bg-gradient-to-b ${overlayColor} bg-[length:200%_200%] z-10`}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 py-20 lg:py-32">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;

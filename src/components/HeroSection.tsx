
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !textRef.current || !containerRef.current || !buttonRef.current) return;

    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial container fade in
    tl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
    
    // Logo animation - fade in and scale
    tl.fromTo(logoRef.current, 
      {
        opacity: 0,
        scale: 0.8,
        filter: "blur(8px)"
      }, 
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5
      }, 
      "-=0.5" // Overlap with previous animation
    );
    
    // Text animation
    tl.fromTo(textRef.current,
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 1
      },
      "-=0.8"
    );
    
    // Button animation
    tl.fromTo(buttonRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8
      },
      "-=0.6"
    );

    // Continuous subtle animation for logo
    gsap.to(logoRef.current, {
      repeat: -1,
      yoyo: true,
      scale: 1.03,
      filter: "drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.4))",
      duration: 3,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Refined background with more artistic touch */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://dl.dropboxusercontent.com/s/fi/exqofds6tq0pkqsp2uf0p/2L5A5990.JPG?rlkey=2ujtknbudpg8hsod15zevcipd&st=tjnh5vvh&dl=0')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-background/40"></div>
      </div>
      
      {/* Main content with asymmetrical layout */}
      <div 
        ref={containerRef} 
        className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      >
        {/* Left column - Logo */}
        <div className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end overflow-visible">
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-5 -right-5 w-32 h-32 rounded-full bg-accent/20 blur-xl"></div>
            <div className="absolute -z-10 -top-8 -left-8 w-24 h-24 rounded-full bg-primary/5 blur-lg"></div>
            
            <img 
              ref={logoRef}
              src="https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0" 
              alt="Kassia Marin Logo" 
              className="max-w-full h-auto max-h-[340px] relative z-10"
            />
          </div>
        </div>
        
        {/* Right column - Text content */}
        <div className="md:col-span-7 lg:col-span-6 text-left md:pl-4 lg:pl-8">
          <p 
            ref={textRef} 
            className="text-lg md:text-xl text-muted-foreground md:max-w-md lg:max-w-lg"
          >
            Kassia Marin is a contemporary artist based in Oslo, working with painting, text, and video to explore memory, perception, and the fluid nature of recollection. Her work invites contemplation, blurring the boundaries between past and present.
          </p>
          
          <div 
            ref={buttonRef} 
            className="mt-8 flex flex-col sm:flex-row gap-4 items-start"
          >
            <Link 
              to="/gallery" 
              className="group px-8 py-3 rounded-full bg-foreground text-background font-medium transition-all hover:bg-foreground/90 flex items-center"
            >
              View Gallery
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 rounded-full border border-foreground bg-transparent font-medium transition-all hover:bg-foreground/5"
            >
              Contact Me
            </Link>
          </div>
          
          {/* Decorative element */}
          <div className="hidden md:block absolute -bottom-16 right-12 w-64 h-64 rounded-full bg-secondary/30 blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

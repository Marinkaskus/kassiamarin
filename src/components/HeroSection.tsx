
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const logoUrl = "https://dl.dropboxusercontent.com/s/fi/mouik1soo1yaoflt186dp/Logo.png?rlkey=e1ua3zw7f1i9ikvj24b6fxswl&st=h4na5yc9&dl=0";

  useEffect(() => {
    if (!logoRef.current) return;

    // Initial animation - fade in and scale
    gsap.fromTo(logoRef.current, {
      opacity: 0,
      scale: 0.7,
      filter: "blur(8px)"
    }, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power2.out"
    });

    // Continuous subtle animation
    gsap.to(logoRef.current, {
      repeat: -1,
      yoyo: true,
      scale: 1.05,
      filter: "drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.3))",
      duration: 3,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('https://dl.dropboxusercontent.com/s/fi/exqofds6tq0pkqsp2uf0p/2L5A5990.JPG?rlkey=2ujtknbudpg8hsod15zevcipd&st=tjnh5vvh&dl=0')] bg-cover bg-center opacity-10"></div>
      
      <div className="container-custom relative z-10 flex flex-col justify-center items-center text-center">
        {/* Logo with animation */}
        <div className="flex justify-center max-w-4xl mx-auto overflow-visible">
          <img 
            ref={logoRef}
            src={logoUrl}
            alt="Kassia Marin Logo" 
            className="max-w-full h-auto max-h-[320px]"
          />
        </div>
        
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up">Kassia Marin is a contemporary artist based in Oslo, working with painting, text, and video to explore memory, perception, and the fluid nature of recollection. Her work invites contemplation, blurring the boundaries between past and present.</p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up">
          <Link to="/gallery" className="group px-8 py-3 rounded-full bg-foreground text-background font-medium transition-all hover:bg-foreground/90 flex items-center">
            View Gallery
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/contact" className="px-8 py-3 rounded-full border border-foreground bg-transparent font-medium transition-all hover:bg-foreground/5">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

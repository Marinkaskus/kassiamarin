
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('https://dl.dropboxusercontent.com/s/exqofds6tq0pkqq/2L5A5990.JPG')] bg-cover bg-center opacity-10"></div>
      
      <div className="container-custom relative z-10 flex flex-col justify-center items-center text-center">
        <span className="text-sm uppercase tracking-widest animate-fade-in-down">Visual Artist</span>
        
        {/* Replace text with logo - enlarged 10x (half of 20x) */}
        <div className="mt-2 flex justify-center animate-fade-in max-w-4xl mx-auto">
          <img 
            src="https://dl.dropboxusercontent.com/s/mouik1soo1yaoflt/Logo.png" 
            alt="Kassia Marin Logo" 
            className="max-w-full h-auto max-h-[320px]"
          />
        </div>
        
        <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up">
          I'm Kassia Marin, a contemporary artist exploring memory, perception, and the fluidity of recollection through painting, text, and video. My work creates immersive visual experiences that invite contemplation and challenge the boundaries between past and present.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up">
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
      </div>
    </section>
  );
};

export default HeroSection;

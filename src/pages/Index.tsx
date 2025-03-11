import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { previousProjects } from '@/data/projectsData';
import ProjectTeaser from '@/components/ProjectTeaser';
const Index = () => {
  // Get up to 3 projects for the teaser section
  const featuredProjects = previousProjects.slice(0, 3);
  return <Layout>
      <HeroSection />
      
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Featured Works</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Recent Projects</h2>
            </div>
            <Link to="/portfolio" className="group flex items-center text-sm font-medium mt-4 md:mt-0 hover:opacity-70 transition-opacity">
              View Portfolio 
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map(project => <ProjectTeaser key={project.id} project={project} />)}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground">About Me</span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2">Kassia Marin</h2>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>
                Kassia Marin is a contemporary visual artist based in Oslo. 
                Her practice involves painting, video, and mixed media, often incorporating text. 
                Her work explores themes of memory, transformation, and the fragility of experience, focusing on how personal narratives and emotions are expressed through tangible forms. 
                Kassia examines the passage of time and the tension between presence and absence, reflecting on how memories shape identity. In a world increasingly dominated by digital media, she believes in the enduring power of material art to foster introspection and genuine connection.</p>
               
              </div>
              <Link to="/about" className="inline-block mt-8 px-6 py-2 border border-foreground rounded-full hover:bg-foreground/5 transition-colors">
                Read More
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-accent -z-10"></div>
              <img src="https://dl.dropboxusercontent.com/s/fi/88f2ddqseerh4h98t12i8/20230919_113701.jpg?rlkey=usum14gsmbbwz057jrd83zz90&st=559y6b5o&dl=0" alt="Kassia Marin in her studio" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-foreground text-background">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-medium">Interested in collaborating?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-background/80">
            I'm open to exhibitions, commissions, and creative partnerships. 
            Let's create something meaningful together.
          </p>
          <Link to="/contact" className="mt-8 inline-block px-8 py-3 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>;
};
export default Index;

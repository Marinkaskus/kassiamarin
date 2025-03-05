
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="animate-fade-in-up">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">About</span>
                <h1 className="text-4xl md:text-5xl font-medium mt-2 mb-8">Kassia Marin</h1>
                
                <div className="relative">
                  <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-accent -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" 
                    alt="Kassia Marin in her studio" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6 text-muted-foreground animate-fade-in">
                <p>
                  I am a contemporary visual artist based in Norway, with a practice spanning painting, 
                  photography, mixed media, and digital art. My work explores the interplay between 
                  natural forms and abstract expression, seeking to evoke emotional responses through 
                  color, texture, and composition.
                </p>
                
                <p>
                  After completing my formal education in Fine Arts at the Oslo National Academy of the Arts, 
                  I've dedicated my career to developing a unique visual language that bridges traditional 
                  techniques with modern perspectives.
                </p>
                
                <p>
                  My artistic process begins with immersion in natural environments, gathering impressions 
                  and emotional responses that later translate into abstract and semi-representational works. 
                  Through layering, experimentation with materials, and intuitive mark-making, each piece 
                  evolves organically into a visual dialogue between deliberate intention and spontaneous discovery.
                </p>
                
                <p>
                  I believe art has the power to offer new ways of seeing and understanding our relationship 
                  with the world around us. My hope is that my work creates moments of connection, reflection, 
                  and perhaps a rediscovery of beauty in the overlooked aspects of our everyday experience.
                </p>
              </div>
            </div>
            
            <div className="mt-20 grid md:grid-cols-2 gap-12 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-medium mb-6">Education</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2010 - 2014</div>
                    <div className="font-medium">Master of Fine Arts</div>
                    <div>Oslo National Academy of the Arts, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2006 - 2010</div>
                    <div className="font-medium">Bachelor of Arts, Visual Studies</div>
                    <div>Bergen Academy of Art and Design, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2005 - 2006</div>
                    <div className="font-medium">Foundation in Art and Design</div>
                    <div>Oslo School of Visual Arts, Norway</div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-medium mb-6">Awards & Recognition</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Nordic Arts Council Grant</div>
                    <div>For the project "Nature Reimagined"</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2020</div>
                    <div className="font-medium">Emerging Artist Award</div>
                    <div>Contemporary Arts Foundation, Stockholm</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2018</div>
                    <div className="font-medium">Residency Program</div>
                    <div>International Arts Colony, Copenhagen</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-20 animate-fade-in">
              <h2 className="text-2xl font-medium mb-6">Artist Statement</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  In my practice, I seek to create a visual language that explores the liminal spaces 
                  between representation and abstraction. Drawing inspiration from natural environments 
                  and personal experiences, my work investigates themes of memory, transition, and 
                  environmental consciousness.
                </p>
                
                <p>
                  I am particularly interested in the way light, color, and space can evoke emotional 
                  responses and create atmospheric narratives. Through an intuitive process of layering, 
                  mark-making, and material exploration, I aim to create works that invite viewers into 
                  contemplative spaces where familiar forms reveal themselves slowly through abstraction.
                </p>
                
                <p>
                  Each piece becomes a meditation on presence and absence, revealing and concealing, 
                  permanence and ephemerality. In a world increasingly mediated by digital screens and 
                  virtual experiences, I believe in the continued relevance and power of material art 
                  forms to create moments of authentic connection and introspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

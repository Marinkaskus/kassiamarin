
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
                    src="https://dl.dropboxusercontent.com/s/fi/e9m3o8jrdfqu2f7npi4u4/IMG_20210428_194746.jpg?rlkey=um38ypc42lecml4t5bghlqffp&st=7kcl5mdy&dl=0" 
                    alt="Kassia Marin in her studio" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6 text-muted-foreground animate-fade-in">
                <p>
                Kassia Marin is a contemporary visual artist based in Norway, working across painting, mixed media, text, and video. 
                Her practice explores the intricate nature of memory, identity, and perception, investigating how personal histories are shaped by time. 
                Through her work, she examines the delicate and often distorted transformation of memories, probing the tension between past and present, and questioning their emotional weight.
                </p>
                
                <p>
                With a formal education in Fine Arts from the Oslo National Academy of the Arts, Kassia has dedicated her career to exploring how memories and dreams influence our emotional and psychological landscapes. 
                Her work often intertwines text and imagery, creating a dialogue between personal experience and broader, universal themes.
                </p>
                
                <p>
                Kassia’s process is driven by both introspection and external observation, drawing inspiration from moments of stillness—such as sleepless nights—where memories, dreams, and fragmented thoughts resurface. 
                These moments become material for her layered paintings and video installations, evoking the instability of memory and the fluidity of time.
                </p>
                
                <p>
                Text plays a central role in her practice, used to capture fleeting thoughts and memories that might otherwise disappear. 
                Writing becomes a way to make the ephemeral tangible, bridging the gap between thought and reality. 
                In her video works, the stillness of the world is disrupted by inner narratives, creating a contrast that reflects the complexity of human experience.
                </p>

                <p>
                Through her art, Kassia seeks to explore how memories shape our understanding of self and the world.
                Her hope is that her work invites viewers to reflect on their own memories and experiences, fostering a deeper connection to both their inner worlds and the world around them.
                </p>
              </div>
            </div>
            
            <div className="mt-20 grid md:grid-cols-1 gap-12 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-medium mb-6">Education</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2021 - 2024</div>
                    <div className="font-medium">Bachelor of Fine Art</div>
                    <div>Oslo National Academy of The Arts</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2019 - 2021</div>
                    <div className="font-medium">Higher Vocational Education in Visual Arts</div>
                    <div>Einar Granum School of Art, Norway</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-20 animate-fade-in">
              <h2 className="text-2xl font-medium mb-6">Artist Statement</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                 In my practice, I aim to create a visual language that navigates the intersection between memory, personal experience, and abstraction.
                  Drawing from the fluidity of my own recollections and the manipulation of time, my work examines themes of uncertainty, transformation, and the complex nature of how we remember.
                </p>
                
                <p>
                  I am deeply interested in how light, texture, and space can evoke emotional responses and narrate the stories of our inner worlds. 
                  Through an intuitive process of layering, mark-making, and material exploration, my pieces invite viewers to step into a space where memories are not simply recalled but reinterpreted. 
                  In doing so, I attempt to give form to that which is often intangible — the fragile nature of memory itself.
                </p>
                
                <p>
                  Each artwork is a meditation on presence and absence, on the balance between remembering and forgetting, and on the ephemeral quality of our personal histories.
                  My practice emphasizes the ongoing dialogue between what we perceive and what we cannot fully grasp. 
                  In a time when our experiences are often mediated through digital screens, I believe in the enduring power of physical artworks to forge authentic connections, to provoke introspection, and to offer a space for reflection on the nature of memory and identity.
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

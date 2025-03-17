
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Kassia Marin - Norwegian Contemporary Artist</title>
        <meta name="description" content="Learn about Kassia Marin, a contemporary visual artist from Norway, her education, artistic practice, and philosophy on memory and identity in art." />
        <meta name="keywords" content="Kassia Marin, Norwegian artist, contemporary art, Oslo National Academy of the Arts, visual artist, Oslo artist" />
        <link rel="canonical" href="https://kassiamarin.studio/about" />
        <meta property="og:title" content="About Kassia Marin - Norwegian Contemporary Artist" />
        <meta property="og:description" content="Learn about Kassia Marin, a contemporary visual artist from Norway, exploring memory and identity in her work." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/about" />
        <meta property="og:image" content="/lovable-uploads/adcd076a-9326-426d-a0fa-d3b5ec6bb70f.png" />
      </Helmet>
      
      <section className="pt-32 pb-20 md:pt-36">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-16 md:gap-24">
              {/* Header Section */}
              <div className="animate-fade-in">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">About</span>
                <h1 className="text-4xl md:text-5xl font-medium mt-2 mb-6">Kassia Marin</h1>
                
                <div className="grid md:grid-cols-2 gap-12 mt-10">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-accent -z-10"></div>
                    <img 
                      src="https://dl.dropboxusercontent.com/s/fi/88f2ddqseerh4h98t12i8/20230919_113701.jpg?rlkey=usum14gsmbbwz057jrd83zz90&st=559y6b5o&dl=0" 
                      alt="Kassia Marin in her studio" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  {/* Bio */}
                  <div className="space-y-6 text-muted-foreground">
                    <p className="font-medium text-foreground text-lg">
                      Contemporary visual artist based in Norway, working across painting, mixed media, text, and video.
                    </p>
                    
                    <p>
                      <strong>Kassia Marin</strong> is a contemporary visual artist based in Norway, working across painting, mixed media, text, and video. 
                      Her practice explores the intricate nature of memory, identity, and perception, investigating how personal histories are shaped by time. 
                      Through her work, she examines the delicate and often distorted transformation of memories, probing the tension between past and present, and questioning their emotional weight.
                    </p>
                    
                    <p>
                      With a formal education in Fine Arts from the <strong>Oslo National Academy of the Arts</strong>, Kassia has dedicated her career to exploring how memories and dreams influence our emotional and psychological landscapes. 
                      Her work often intertwines text and imagery, creating a dialogue between personal experience and broader, universal themes.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Extended Bio */}
              <div className="grid md:grid-cols-1 gap-8 animate-fade-in">
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    Kassia's process is driven by both introspection and external observation, drawing inspiration from moments of stillness—such as sleepless nights—where memories, dreams, and fragmented thoughts resurface. 
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
              
              {/* Artist Statement */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-medium mb-6">Artist Statement</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                   I work with memory, time, and how we process our past. My art, which includes painting, writing, and video, explores how memories change over time and how we make sense of them. 
                   I use light, texture, and space to reflect the way we remember and forget.
                  </p>
                  
                  <p>
                   Through my work, I try to understand myself and others, showing the fragile nature of memory and how it shapes who we are. 
                   In a world where we often feel disconnected or alienated, I believe art is a space where we can confront and share these emotions, allowing us to experience something together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

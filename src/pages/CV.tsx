

import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';

const CV = () => {
  return (
    <Layout>
      <Helmet>
        <title>CV - Kassia Marin</title>
        <meta name="description" content="Curriculum Vitae of Kassia Marin, a contemporary visual artist from Norway. Education, exhibitions, and professional experience." />
        <meta name="keywords" content="Kassia Marin CV, artist resume, exhibitions, education, contemporary artist, Norwegian artist" />
        <link rel="canonical" href="https://kassiamarin.studio/cv" />
        <meta property="og:title" content="CV - Kassia Marin" />
        <meta property="og:description" content="Curriculum Vitae of Kassia Marin, a contemporary visual artist from Norway." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/cv" />
      </Helmet>
      
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="animate-fade-in-up">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">CV</span>
              <h1 className="text-4xl md:text-5xl font-medium mt-2 mb-8">Kassia Marin</h1>
              
              {/* Education Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-medium mb-6">Education</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2021 - 2024</div>
                    <div className="font-medium">Bachelor i Billedkunst</div>
                    <div>Kunsthøyskolen i Oslo, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2019 - 2021</div>
                    <div className="font-medium">3Dim Fagbrev</div>
                    <div>Einar Granum Kunstfagskole, Oslo, Norway</div>
                  </li>
                </ul>
              </div>
              
              <Separator className="my-10" />
              
              {/* Exhibitions Section */}
              <div>
                <h2 className="text-2xl font-medium mb-6">Exhibitions</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2024</div>
                    <div className="font-medium">
                      Free Education for Some <span className="font-normal">(Group Exhibition)</span>
                      <a 
                        href="https://www.oslokunstforening.no/eventer/utstillings%C3%A5pning-kunstakademiets-avgangsutstilling-ba-2024" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span className="text-sm">View Exhibition</span>
                      </a>
                    </div>
                    <div>Oslo Kunstforening, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2023</div>
                    <div className="font-medium">
                      Children's Children <span className="font-normal">(Solo Exhibition)</span>
                      <a 
                        href="https://khio.no/events/1746" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span className="text-sm">View Exhibition</span>
                      </a>
                    </div>
                    <div>White Box, KhiO, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Play Date <span className="font-normal">(Solo Exhibition)</span></div>
                    <div>Skylight, Seilduken, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">
                      Samspill mellom kropp og objekt <span className="font-normal">(Curator)</span>
                      <a 
                        href="https://www.bodobiennale.no/en/bodoe-biennale-2022/interaction-between-body-object-bodoe-cultural-school-kassia-r-marin" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span className="text-sm">View Project</span>
                      </a>
                    </div>
                    <div>Bodø Biennale, Bodø, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">
                      Performance Night <span className="font-normal">(Group Exhibition)</span>
                      <a 
                        href="https://kunstnerneshus.no/program/arrangementer/performance-nights" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span className="text-sm">View Event</span>
                      </a>
                    </div>
                    <div>Kunstnernes Hus, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="font-medium">1BA <span className="font-normal">(Group Exhibition)</span></div>
                    <div>Seilduken, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="font-medium">
                      Malstrøm <span className="font-normal">(Solo Exhibition)</span>
                      <a 
                        href="https://www.gallerivekta.no/utstillinger/kassia-rebekka-marin-malstrom/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        <span className="text-sm">View Project</span>
                      </a>
                    </div>
                    <div>Galleri Vekta, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="font-medium">Du-ma acasa <span className="font-normal">(Solo Exhibition)</span></div>
                    <div>Galleri Granum, Larvik, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2020</div>
                    <div className="font-medium">Vårutstillingen <span className="font-normal">(Group Exhibition)</span></div>
                    <div>Einar Granum Kunstfagskole, Oslo, Norway</div>
                  </li>
                </ul>
              </div>
              
              <Separator className="my-10" />
              
              {/* Professional Experience Section */}
              <div>
                <h2 className="text-2xl font-medium mb-6">Professional Experience</h2>
                <ul className="space-y-4">
                  <li>
                    <div className="text-sm text-muted-foreground">2024</div>
                    <div className="font-medium">Host</div>
                    <div>Oslo Open, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Workshop Instructor</div>
                    <div>Bodø Biennale & Bodø Cultural School, Bodø, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2018</div>
                    <div className="font-medium">Workshop Instructor</div>
                    <div>Art Workshop, Stormen Kunst, Bodø, Norway</div>
                       <a 
                      href="https://www.bodobiennale.no/bodoe-biennale-2018/program/kunstverksted-for-barn-festivalutstillingen-paa-stormen-kunst" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span className="text-sm">View Project</span>
                    </a>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2018</div>
                    <div className="font-medium">Workshop</div>
                    <div>European Capital of Culture, Bodø, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2016 - 2018</div>
                    <div className="font-medium">Board Member & Event Planner</div>
                    <div>Unge Stormen, Bodø, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2018</div>
                    <div className="font-medium">Youth Representative</div>
                    <div>Expert Panel at UKM, Bodø/Nordland, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2017</div>
                    <div className="font-medium">Medvirkende</div>
                    <div>Expert NPU-Konferansen 2017: Ungt Publikum</div> <a 
                      href="https://norskpublikumsutvikling.no/konferanse/npu-konferansen-2017-ungt-publikum" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center ml-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span className="text-sm">View Project</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CV;

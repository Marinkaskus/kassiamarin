
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About & CV - Kassia Marin</title>
        <meta name="description" content="Kassia Marin (b.2000) is a contemporary visual artist based in Oslo, Norway. View her biography, artist statement, and CV." />
        <meta name="keywords" content="Kassia Marin, Norwegian artist, contemporary art, Oslo National Academy of the Arts, visual artist, Oslo artist" />
        <link rel="canonical" href="https://kassiamarin.studio/about" />
        <meta property="og:title" content="About & CV - Kassia Marin" />
        <meta property="og:description" content="Kassia Marin (b.2000) is a contemporary visual artist based in Oslo, Norway." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kassiamarin.studio/about" />
      </Helmet>
      
      <section className="pt-32 pb-20 md:pt-36">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-16 md:gap-24">
              {/* Header & Bio Section */}
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-12">
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
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-medium">Kassia Marin</h1>
                    <p className="text-lg text-muted-foreground">
                      Kassia Marin (b.2000) lives and works in Oslo, Norway.
                    </p>
                    <p className="text-muted-foreground">
                      Marin is a contemporary visual artist based in Norway, working across painting, mixed media, text, and video.
                    </p>
                  </div>
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
              
              {/* CV Section */}
              <div className="animate-fade-in">
                <h2 className="text-2xl font-medium mb-8">Curriculum Vitae</h2>
                
                <div className="space-y-12">
                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-medium mb-4">Education</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2021 - 2024</TableCell>
                          <TableCell>
                            <span className="block">Bachelor i Billedkunst</span>
                            <span className="text-muted-foreground">Kunsthøyskolen i Oslo, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2019 - 2021</TableCell>
                          <TableCell>
                            <span className="block">3Dim Fagbrev</span>
                            <span className="text-muted-foreground">Einar Granum Kunstfagskole, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Exhibitions */}
                  <div>
                    <h3 className="text-xl font-medium mb-4">Exhibitions</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2024</TableCell>
                          <TableCell>
                            <span className="block">Free Education for Some <span className="font-normal">(Group Exhibition)</span></span>
                            <span className="text-muted-foreground">Oslo Kunstforening, Oslo, Norway</span>
                            <a 
                              href="https://www.oslokunstforening.no/eventer/utstillings%C3%A5pning-kunstakademiets-avgangsutstilling-ba-2024" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Exhibition</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2023</TableCell>
                          <TableCell>
                            <span className="block">Children's Children <span className="font-normal">(Solo Exhibition)</span></span>
                            <span className="text-muted-foreground">White Box, KhiO, Oslo, Norway</span>
                            <a 
                              href="https://khio.no/events/1746" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Exhibition</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2022</TableCell>
                          <TableCell>
                            <span className="block">Play Date <span className="font-normal">(Solo Exhibition)</span></span>
                            <span className="text-muted-foreground">Skylight, Seilduken, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2022</TableCell>
                          <TableCell>
                            <span className="block">Samspill mellom kropp og objekt <span className="font-normal">(Curator)</span></span>
                            <span className="text-muted-foreground">Bodø Biennale, Bodø, Norway</span>
                            <a 
                              href="https://www.bodobiennale.no/en/bodoe-biennale-2022/interaction-between-body-object-bodoe-cultural-school-kassia-r-marin" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Project</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2022</TableCell>
                          <TableCell>
                            <span className="block">Performance Night <span className="font-normal">(Group Exhibition)</span></span>
                            <span className="text-muted-foreground">Kunstnernes Hus, Oslo, Norway</span>
                            <a 
                              href="https://kunstnerneshus.no/program/arrangementer/performance-nights" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Event</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2021</TableCell>
                          <TableCell>
                            <span className="block">1BA <span className="font-normal">(Group Exhibition)</span></span>
                            <span className="text-muted-foreground">Seilduken, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2021</TableCell>
                          <TableCell>
                            <span className="block">Malstrøm <span className="font-normal">(Solo Exhibition)</span></span>
                            <span className="text-muted-foreground">Galleri Vekta, Oslo, Norway</span>
                            <a 
                              href="https://www.gallerivekta.no/utstillinger/kassia-rebekka-marin-malstrom/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Project</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2021</TableCell>
                          <TableCell>
                            <span className="block">Du-ma acasa <span className="font-normal">(Solo Exhibition)</span></span>
                            <span className="text-muted-foreground">Galleri Granum, Larvik, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2020</TableCell>
                          <TableCell>
                            <span className="block">Vårutstillingen <span className="font-normal">(Group Exhibition)</span></span>
                            <span className="text-muted-foreground">Einar Granum Kunstfagskole, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Professional Experience */}
                  <div>
                    <h3 className="text-xl font-medium mb-4">Professional Experience</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2024</TableCell>
                          <TableCell>
                            <span className="block">Host</span>
                            <span className="text-muted-foreground">Oslo Open, Oslo, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2022</TableCell>
                          <TableCell>
                            <span className="block">Workshop Instructor</span>
                            <span className="text-muted-foreground">Bodø Biennale & Bodø Cultural School, Bodø, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2018</TableCell>
                          <TableCell>
                            <span className="block">Workshop Instructor</span>
                            <span className="text-muted-foreground">Art Workshop, Stormen Kunst, Bodø, Norway</span>
                            <a 
                              href="https://www.bodobiennale.no/bodoe-biennale-2018/program/kunstverksted-for-barn-festivalutstillingen-paa-stormen-kunst" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Project</span>
                            </a>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2018</TableCell>
                          <TableCell>
                            <span className="block">Workshop</span>
                            <span className="text-muted-foreground">European Capital of Culture, Bodø, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2016 - 2018</TableCell>
                          <TableCell>
                            <span className="block">Board Member & Event Planner</span>
                            <span className="text-muted-foreground">Unge Stormen, Bodø, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2018</TableCell>
                          <TableCell>
                            <span className="block">Youth Representative</span>
                            <span className="text-muted-foreground">Expert Panel at UKM, Bodø/Nordland, Norway</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 font-medium">2017</TableCell>
                          <TableCell>
                            <span className="block">Medvirkende</span>
                            <span className="text-muted-foreground">Expert NPU-Konferansen 2017: Ungt Publikum</span>
                            <a 
                              href="https://norskpublikumsutvikling.no/konferanse/npu-konferansen-2017-ungt-publikum" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-1 text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              <span className="text-sm">View Project</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
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

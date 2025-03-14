
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';

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
                    <div className="font-medium">Free Education for Some <span className="font-normal">(Group Exhibition)</span></div>
                    <div>Oslo Kunstforening, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2023</div>
                    <div className="font-medium">Children's Children <span className="font-normal">(Solo Exhibition)</span></div>
                    <div>White Box, KhiO, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Play Date <span className="font-normal">(Solo Exhibition)</span></div>
                    <div>Skylight, Seilduken, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Samspill mellom kropp og objekt <span className="font-normal">(Curator)</span></div>
                    <a href="https://kassiamarin.studio" target="_blank" class="https://www.bodobiennale.no/en/bodoe-biennale-2022/interaction-between-body-object-bodoe-cultural-school-kassia-r-marin">
    Visit My Website
</a>

<style>
    .custom-link {
        color: #000; /* Black text */
        text-decoration: none; /* Removes underline */
        font-weight: bold;
    }
    .custom-link:hover {
        color: #ff6600; /* Changes color on hover */
    }
</style>

                    <div>Bodø Biennale, Bodø, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2022</div>
                    <div className="font-medium">Performance Night <span className="font-normal">(Group Exhibition)</span></div>
                    <div>Kunstnernes Hus, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="font-medium">1BA <span className="font-normal">(Group Exhibition)</span></div>
                    <div>Seilduken, Oslo, Norway</div>
                  </li>
                  <li>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="font-medium">Malstrøm <span className="font-normal">(Solo Exhibition)</span></div>
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

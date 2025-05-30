
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Baerebjelke = () => {
  return (
    <Layout>
      <Helmet>
        <title>Bærebjelke - Utstilling | Kassia Marin</title>
        <meta name="description" content="Bærebjelke utstilling av Kassia Marin. Åpner 4. juli 2025 kl. 18:00-20:00. Åpent alle dager frem til 27. juli mellom kl. 12:00 og 15:00." />
      </Helmet>
      
      <section className="pt-28 pb-20">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium mb-6">Bærebjelke</h1>
            <p className="text-xl text-muted-foreground">Kommende utstilling</p>
          </div>

          <div className="mb-12">
            <img 
              src="https://dl.dropboxusercontent.com/s/fi/y7brrog0cnu85r57ljdq0/Plakat_Ferdig_A3_B-rebjelke-Website.png?rlkey=re6k6e8voivpbxlew4rxbca93&st=57szrrzo&dl=0"
              alt="Bærebjelke utstilling plakat"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="text-center mb-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <a 
                href="https://fb.me/e/6fWiLUCkx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Se Facebook-event
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="mr-2 h-5 w-5" />
                  Åpningstider
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Utstillingen åpner</h3>
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>4. juli 2025</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>18:00 - 20:00</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Utstillingen er åpen</h3>
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Alle dager frem til 27. juli</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>12:00 - 15:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>NB:</strong> Stengt på mandager i denne perioden
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-2 h-5 w-5" />
                  Om utstillingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bærebjelke er en kommende utstilling som vil utforske temaer rundt struktur, 
                  støtte og de fundamentale elementene som bærer oss gjennom livet. 
                  Utstillingen inviterer publikum til å reflektere over både fysiske og 
                  metaforiske bærebjelker i våre liv.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Mer informasjon om utstillingen vil bli tilgjengelig nærmere åpningsdatoen.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Baerebjelke;

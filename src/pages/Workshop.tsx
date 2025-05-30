
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Calendar, CreditCard } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Define the form schema with validation rules
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Navn må være minst 2 tegn.",
  }),
  age: z.string().refine((val) => {
    const age = parseInt(val);
    return age > 0 && age < 18;
  }, {
    message: "Alder må være under 18 år.",
  }),
  guardianName: z.string().min(2, {
    message: "Oppgi navn på foresatt.",
  }),
  guardianPhone: z.string().min(8, {
    message: "Oppgi et gyldig telefonnummer.",
  }),
  email: z.string().email({
    message: "Oppgi en gyldig e-postadresse.",
  }),
  workshopDates: z.array(z.string()).min(1, {
    message: "Velg minst én dato for workshop.",
  }),
  additionalInfo: z.string().optional(),
  photoPermission: z.boolean(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Du må bekrefte at påmeldingen er bindende.",
  }),
});

const Workshop = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      guardianName: "",
      guardianPhone: "",
      email: "",
      workshopDates: [],
      additionalInfo: "",
      photoPermission: false,
      acceptTerms: false,
    },
  });

  // Available workshop dates in July 2025 - Updated to remove July 24th and 26th dates
  const workshopDates = [
    {
      id: "5-jul-2025",
      label: "Lørdag 5. juli 2025 - 12:00-15:00"
    },
    {
      id: "10-jul-2025",
      label: "Torsdag 10. juli 2025 - 12:00-15:00"
    },
    {
      id: "12-jul-2025",
      label: "Lørdag 12. juli 2025 - 12:00-15:00"
    },
    {
      id: "17-jul-2025",
      label: "Torsdag 17. juli 2025 - 12:00-15:00"
    },
    {
      id: "19-jul-2025",
      label: "Lørdag 19. juli 2025 - 12:00-15:00"
    }
  ];

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Format the data for better email readability
      const formattedData = {
        fullName: values.fullName,
        age: values.age,
        guardianName: values.guardianName,
        guardianPhone: values.guardianPhone,
        email: values.email,
        workshopDates: values.workshopDates.join(", "),
        additionalInfo: values.additionalInfo || "Ingen tilleggsinformasjon",
        photoPermission: values.photoPermission ? "Ja" : "Nei",
        acceptTerms: values.acceptTerms ? "Ja" : "Nei",
      };
      
      // Create email subject and body
      const emailSubject = `Påmelding Workshop: ${values.fullName}, ${values.age} år`;
      const emailBody = `
Påmelding til workshop:

Navn på deltaker: ${formattedData.fullName}
Alder: ${formattedData.age}
Navn på foresatt: ${formattedData.guardianName}
Telefon til foresatt: ${formattedData.guardianPhone}
E-post: ${formattedData.email}
Valgte datoer: ${formattedData.workshopDates}

Tilleggsinformasjon: ${formattedData.additionalInfo}

Fototillatelse: ${formattedData.photoPermission ? "Ja" : "Nei"}
Aksepterer bindende påmelding: ${formattedData.acceptTerms ? "Ja" : "Nei"}

Sendt: ${new Date().toLocaleString('no-NO')}
      `;
      
      // Create mailto link and open it
      const mailtoLink = `mailto:kassiamarin486@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');
      
      // Show success message
      toast({
        title: "Skjema klart til å sendes",
        description: "E-postklienten din er åpnet med skjemaet. Vennligst send e-posten for å fullføre registreringen.",
      });
      
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error preparing email:", error);
      toast({
        title: "Det oppstod en feil",
        description: "Kunne ikke klargjøre skjemaet. Vennligst prøv igjen eller kontakt oss direkte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Flisekunst for barn og unge - Workshop | Kassia Marin</title>
        <meta name="description" content="Kreativ sommerworkshop for barn og unge i Frognerparken. Utforsk flisemaling med akvarell og bli med på å skape et fellesverk!" />
        <meta name="keywords" content="flisekunst, workshop for barn, kunst for unge, Frognerparken, kunstworkshop Oslo, Kassia Marin" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-secondary to-background">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">Påmeldingsworkshop: Fliser, fortellinger og fellesverk</h1>
          <p className="text-xl md:text-2xl mb-4">Vil du være med og lage kunst som stilles ut i Wegnerpaviljongen?</p>
          <p className="text-muted-foreground text-lg mb-4">Juli 2025</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <p className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-medium animate-pulse">
              Påmelding åpner 10. juni 2025
            </p>
            <p className="inline-flex items-center bg-secondary/80 text-foreground px-4 py-2 rounded-lg font-medium">
              <CreditCard className="h-5 w-5 mr-2" />
              Deltakeravgift: 200 kr
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-4 border border-primary rounded-lg bg-primary/5 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-medium">Påmelding åpner 10. juni 2025</p>
            </div>
            
            <p className="text-lg mb-6">
              I denne spesialworkshopen inviterer Kassia Marin barn og unge til en fordypende og inspirerende opplevelse i kunstens verden. Sammen med kunstneren får deltakerne utforske parken, tegne det de ser, og male på keramiske fliser med motiver inspirert av natur, arkitektur og egne inntrykk.
            </p>
            
            <p className="text-lg mb-6">
              Workshopen starter med en guidet vandring i parken hvor vi tegner underveis. Etterpå jobber vi med flisene – én får deltakerne ta med hjem, og én blir en del av et fellesverk som stilles ut i paviljongen 24.–27. juli.
            </p>
            
            <p className="text-lg mb-8">
              Workshopen ledes av Kassia Marin, og gir deltakerne innblikk i både kunstneriske teknikker og kreative prosesser. Alt materiell er inkludert.
            </p>
            
            <div className="mb-8 p-4 border border-secondary rounded-lg bg-secondary/10">
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Deltakeravgift: 200 kr per deltaker</p>
                  <p className="text-sm text-muted-foreground">
                    Avgiften bidrar til å dekke materialkostnader.
                  </p>
                </div>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Tilrettelagt for barn og unge mellom 6 og 16 år, men åpen for alle</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Tid: Utvalgte dager i juli kl. 12:00–15:00</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Sted: Wegnerpaviljongen, Frognerparken</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Deltakeravgift: 200 kr for å dekke materialkostnader</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Begrenset antall plasser per økt (7–8 deltakere)</span>
              </li>
            </ul>
            
            <div className="bg-accent/30 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-3">For de yngste barna (under 9 år)</h3>
              <p className="mb-4">
                For barn under 9 år er det lettere å tilrettelegge for yngre barn, men workshopen er åpen for alle som vil delta. 
                Vi anbefaler også drop-in eventene som er et familietilbud som passer spesielt godt til en yngre aldersgruppe og krever ingen påmelding.
              </p>
              <p>
                Drop-in eventene annonseres på vår nettside og sosiale medier nærmere sommerferien.
              </p>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-3">Tilgjengelighetsinformasjon</h3>
              <ul className="space-y-2 text-sm">
                <li>• Aktivitetene er åpne for alle under 18 år</li>
                <li>• Workshopene er spesielt tilpasset aldersgruppen 9-16 år</li>
                <li>• Deltakeravgift: 200 kr per deltaker</li>
                <li>• Det kreves ingen forkunnskaper eller utstyr – alt nødvendig materiell inkluderes</li>
                <li>• Verkstedet foregår i et trygt, inkluderende og inspirerende miljø med profesjonell veiledning</li>
                <li>• Paviljongen er lett tilgjengelig i Frognerparken, men er ikke universelt utformet</li>
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <Button
                size="lg"
                className="rounded-full animate-pulse"
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Meld på nå
              </Button>
              <div className="mt-3">
                <p className="font-medium text-primary">
                  Påmelding åpner 10. juni 2025
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deltakeravgift: 200 kr per deltaker (betales ved påmelding)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="py-16 bg-secondary/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-medium mb-4">Påmeldingsskjema</h2>
              <p className="text-muted-foreground">
                Fyll ut skjemaet under for å melde på til workshop. 
                Bekreftelse sendes på e-post etter påmelding.
              </p>
              <div className="mt-3 p-3 bg-primary/10 rounded-md">
                <p className="font-medium">
                  Påmelding åpner 10. juni 2025
                </p>
              </div>
              <div className="mt-3 p-3 bg-secondary/80 rounded-md">
                <div className="flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <p className="font-medium">Deltakeravgift: 200 kr per deltaker</p>
                </div>
                <p className="text-sm mt-1">
                  Avgiften bidrar til å dekke materialkostnader.
                </p>
              </div>
              <div className="mt-3 p-3 bg-accent/30 rounded-md">
                <p className="font-medium text-accent-foreground">
                  NB! Workshopen er tilrettelagt for barn og unge mellom 6 og 16 år, men åpen for alle
                </p>
              </div>
              <div className="mt-3 p-3 bg-secondary/80 rounded-md">
                <p className="font-medium">
                  Velg gjerne flere datoer hvis du er fleksibel - dette hjelper oss å sette sammen grupper på best mulig måte
                </p>
              </div>
              <div className="mt-3 p-3 bg-accent/30 rounded-md">
                <p className="font-medium">
                  For barn under 9 år er det lettere å tilrettelegge for yngre barn, men vi anbefaler også drop-in eventene som er åpne for alle
                </p>
              </div>
              <p className="mt-2 font-medium text-primary">Merk: Kun én påmelding per skjema</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fullt navn på deltaker</FormLabel>
                        <FormControl>
                          <Input placeholder="Ola Nordmann" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alder</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="17" placeholder="1-17" {...field} />
                        </FormControl>
                        <FormDescription>Må være under 18 år (workshopen er tilrettelagt for 6-16 år)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Navn på foresatt</FormLabel>
                        <FormControl>
                          <Input placeholder="Kari Nordmann" {...field} />
                        </FormControl>
                        <FormDescription>For deltakere under 18 år</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="guardianPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefonnummer til foresatt</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="99999999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="navn@eksempel.no" {...field} />
                          </FormControl>
                          <FormDescription>Bekreftelse sendes hit</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="workshopDates"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel>Velg ønskede datoer for workshop</FormLabel>
                          <FormDescription>
                            Velg gjerne flere datoer hvis du er fleksibel slik at vi kan organisere gruppene best mulig
                          </FormDescription>
                        </div>
                        <div className="space-y-2">
                          {workshopDates.map((date) => (
                            <FormField
                              key={date.id}
                              control={form.control}
                              name="workshopDates"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={date.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(date.label)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, date.label])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== date.label
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {date.label}
                                      </span>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="mt-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tilleggsinformasjon</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Allergier, spesielle behov, eller tilrettelegging som er nødvendig" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Informer om eventuelle allergier eller spesielle behov som vi bør ta hensyn til
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="photoPermission"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Jeg gir tillatelse til at barnet kan fotograferes under workshop
                          </FormLabel>
                          <FormDescription>
                            Bilder kan bli brukt i dokumentasjon av prosjektet
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            required
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Jeg bekrefter at påmeldingen er bindende
                          </FormLabel>
                          <FormDescription>
                            Vennligst gi beskjed i god tid hvis du ikke kan delta
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Forbereder skjema..." : "Send påmelding"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground pt-4">
                    Informasjonen sendes til e-post: kassiamarin486@gmail.com
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with Contact Information */}
      <section className="py-12 bg-accent">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-medium mb-4">Kontaktinformasjon</h3>
            <div className="space-y-2">
              <p><strong>Kunstner:</strong> Kassia Marin</p>
              <p><strong>Nettside:</strong> <a href="https://kassiamarin.studio" className="underline">kassiamarin.studio</a></p>
              <p><strong>E-post:</strong> <a href="mailto:kassiamarin486@gmail.com" className="underline">kassiamarin486@gmail.com</a></p>
              <p><strong>Telefon:</strong> <a href="tel:+4790966965" className="underline">90966965</a></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Workshop;

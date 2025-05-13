import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Calendar } from 'lucide-react';
import emailjs from 'emailjs-com';

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
    return age >= 9 && age <= 16;
  }, {
    message: "Alder må være mellom 9 og 16 år.",
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
  workshopDate: z.string({
    required_error: "Velg en dato for workshopen.",
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
  
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Using public key here which is fine to include in the client-side code
    emailjs.init("user_HGn2dxYOudNRt58xRhjk2");
  }, []);
  
  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      guardianName: "",
      guardianPhone: "",
      email: "",
      additionalInfo: "",
      photoPermission: false,
      acceptTerms: false,
    },
  });

  // Available workshop dates in July 2025 - Updated to Thursdays and Saturdays from 12:00-15:00
  // Removed dates for July 3rd and July 31st
  const workshopDates = [
    "Lørdag 5. juli 2025 - 12:00-15:00",
    "Torsdag 10. juli 2025 - 12:00-15:00",
    "Lørdag 12. juli 2025 - 12:00-15:00",
    "Torsdag 17. juli 2025 - 12:00-15:00",
    "Lørdag 19. juli 2025 - 12:00-15:00",
    "Torsdag 24. juli 2025 - 12:00-15:00",
    "Lørdag 26. juli 2025 - 12:00-15:00",
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
        workshopDate: values.workshopDate,
        additionalInfo: values.additionalInfo || "Ingen tilleggsinformasjon",
        photoPermission: values.photoPermission ? "Ja" : "Nei",
        acceptTerms: values.acceptTerms ? "Ja" : "Nei",
      };
      
      // Send the email directly to your email address
      const result = await emailjs.send(
        "service_3pokarw", // Your EmailJS service ID
        "template_azsg4s9", // Your EmailJS template ID
        {
          to_name: "Kassia Marin",
          from_name: values.fullName,
          reply_to: values.email,
          subject: `Påmelding workshop: ${values.fullName}`,
          guardian_name: formattedData.guardianName,
          guardian_phone: formattedData.guardianPhone,
          participant_age: formattedData.age,
          workshop_date: formattedData.workshopDate,
          additional_info: formattedData.additionalInfo,
          photo_permission: formattedData.photoPermission ? "Ja" : "Nei",
          accepts_terms: formattedData.acceptTerms ? "Ja" : "Nei",
          message: `
            Påmelding til workshop:
            
            Navn på deltaker: ${formattedData.fullName}
            Alder: ${formattedData.age}
            Navn på foresatt: ${formattedData.guardianName}
            Telefon til foresatt: ${formattedData.guardianPhone}
            E-post: ${formattedData.email}
            Valgt dato: ${formattedData.workshopDate}
            
            Tilleggsinformasjon: ${formattedData.additionalInfo}
            
            Fototillatelse: ${formattedData.photoPermission}
            Aksepterer bindende påmelding: ${formattedData.acceptTerms}
            
            Sendt: ${new Date().toLocaleString('no-NO')}
          `,
        },
        "HGn2dxYOudNRt58xRhjk2" // Your EmailJS public key
      );
      
      console.log("Email sent successfully:", result);
      
      // Show success message
      toast({
        title: "Påmelding mottatt!",
        description: "Vi sender en bekreftelse til din e-post snart.",
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Det oppstod en feil",
        description: "Kunne ikke sende påmeldingen. Vennligst prøv igjen senere eller kontakt oss direkte.",
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
          <h1 className="text-4xl md:text-5xl font-medium mb-6">Flisekunst for barn og unge</h1>
          <p className="text-xl md:text-2xl mb-4">Sommerworkshop i Frognerparken</p>
          <p className="text-muted-foreground text-lg mb-4">Juli 2025</p>
          <p className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-medium animate-pulse">
            Påmelding åpner 10. juni 2025
          </p>
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
              En kreativ og gratis sommeraktivitet for barn og unge i Oslo! Utforsk flisemaling med akvarell, 
              delta i workshops med profesjonell kunstner, og bli med å skape et fellesverk i Paviljongen i Vigelandsparken.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>For barn og unge i alderen 9 til 16 år</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Workshopene foregår i juli 2025 i Paviljongen i Frognerparken</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Deltakelse er gratis, men krever forhåndspåmelding</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Begrenset antall plasser per økt (7–8 deltakere)</span>
              </li>
            </ul>
            
            <div className="bg-secondary p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-3">Tilgjengelighetsinformasjon</h3>
              <ul className="space-y-2 text-sm">
                <li>• Alle aktiviteter er gratis og tilrettelagt for barn og unge mellom 9 og 16 år</li>
                <li>• Det kreves ingen forkunnskaper eller utstyr – alt tilbys gratis</li>
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
              <p className="mt-3 font-medium text-primary">
                Påmelding åpner 10. juni 2025
              </p>
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
                          <Input type="number" min="9" max="16" placeholder="9-16" {...field} />
                        </FormControl>
                        <FormDescription>Må være mellom 9-16 år</FormDescription>
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
                    name="workshopDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ønsket dato for workshop</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Velg dato og tid" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {workshopDates.map((date) => (
                              <SelectItem key={date} value={date}>
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {date}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
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
                    {isSubmitting ? "Sender..." : "Send påmelding"}
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

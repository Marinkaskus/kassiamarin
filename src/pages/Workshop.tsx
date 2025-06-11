import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Calendar, CreditCard, CalendarPlus, X } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

  // Available workshop dates in July 2025 - Updated with correct dates
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
    },
    {
      id: "24-jul-2025",
      label: "Torsdag 24. juli 2025 - 12:00-15:00"
    },
    {
      id: "26-jul-2025",
      label: "Lørdag 26. juli 2025 - 12:00-15:00"
    }
  ];

  // Additional state for image modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Function to add calendar reminder
  const addCalendarReminder = () => {
    const startDate = new Date('2025-06-10T10:00:00');
    const endDate = new Date('2025-06-10T10:30:00');
    
    const event = {
      title: 'Påmelding åpner: Flisekunst Workshop - Kassia Marin',
      description: 'Påmelding til workshop "Fliser, fortellinger og fellesverk" åpner i dag. Besøk kassiamarin.studio/workshop for å melde deg på.',
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      location: 'Online - kassiamarin.studio/workshop'
    };
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    // Create ICS file for other calendar apps
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kassia Marin//Workshop Reminder//EN
BEGIN:VEVENT
UID:workshop-reminder-${Date.now()}@kassiamarin.studio
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
BEGIN:VALARM
TRIGGER:-PT30M
DESCRIPTION:Påmelding til workshop åpner snart!
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;
    
    // Try to open Google Calendar first
    window.open(googleCalendarUrl, '_blank');
    
    // Also create downloadable ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workshop-pamelding-reminder.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Kalender-påminnelse lagt til!",
      description: "Google Calendar åpnet og ICS-fil lastet ned. Velg den metoden som passer best for din kalender.",
    });
  };

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

  // Additional images to display at the bottom
  const additionalImages = [
    {
      id: 1,
      src: "https://dl.dropboxusercontent.com/s/fi//rhjezjhtv7a663o4ahda9/1.png?rlkey=gwx73hjh1dpr9rnlh7sje2gvb&st=jhzon9ab&dl=0",
      alt: "Workshop bilde 1"
    },
    {
      id: 2,
      src: "https://dl.dropboxusercontent.com/s/fi//6gusjhrfacmr03sc2u83j/2.png?rlkey=rorr6zsubkafmnspt1fejrcia&st=lz17tgcc&dl=0",
      alt: "Workshop bilde 2"
    }
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setImageModalOpen(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>Flisekunst for barn og unge - Workshop | Kassia Marin</title>
        <meta name="description" content="Kreativ sommerworkshop for barn og unge i Frognerparken. Utforsk flisemaling med akvarell og bli med på å skape et fellesverk!" />
        <meta name="keywords" content="flisekunst, workshop for barn, kunst for unge, Frognerparken, kunstworkshop Oslo, Kassia Marin" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-green-50">
        <div className="container-custom text-center">
          <div className="bg-green-600 text-white px-6 py-3 rounded-full inline-block mb-4 animate-pulse">
            <span className="text-lg font-bold">🎉 PÅMELDING ER ÅPEN! 🎉</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium mb-6">Påmeldingsworkshop: Fliser, fortellinger og fellesverk</h1>
          <p className="text-xl md:text-2xl mb-4">Vil du være med og lage kunst som stilles ut i Wegnerpaviljongen?</p>
          <p className="text-muted-foreground text-lg mb-4">Juli 2025</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg animate-bounce">
              MELD PÅ NÅ!
            </div>
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
            <div className="mb-8 p-6 border-2 border-green-500 rounded-lg bg-green-50 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <p className="font-bold text-xl text-green-700">Påmelding er nå åpen!</p>
              <p className="text-green-600 mt-1">Meld deg på ved å fylle ut skjemaet nederst på siden</p>
            </div>
            
            <p className="text-lg mb-6">
              I denne spesialworkshopen inviterer Kassia Marin barn og unge til en fordypende og inspirerende opplevelse i kunstens verden. Sammen med kunstneren får deltakerne utforske parken, tegne det de ser, og male på keramiske fliser med motiver inspirert av natur, arkitektur, egne inntrykk og sist men ikke minst Vigeland.
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
                <span>Tilrettelagt for barn og unge mellom 9 og 16 år, men åpen for alle under 18 år</span>
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
              <h3 className="text-lg font-medium mb-3">For barn under 9 år</h3>
              <p className="mb-4">
                For barn under 9 år anbefaler vi å delta på drop-in tilbudet, men alle er velkomne til workshopen! 
                Drop-in eventene er et familietilbud som passer spesielt godt for yngre barn og krever ingen påmelding.
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
                className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold animate-pulse"
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                MELD PÅ NÅ!
              </Button>
              <div className="mt-3">
                <p className="font-medium text-green-600 text-lg">
                  ✅ Påmeldingen er åpen!
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Deltakeravgift: 200 kr betales ved oppmøte via Vipps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Images Gallery */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="https://dl.dropboxusercontent.com/s/fi/6m3b1khr7599hmeixzb0s/250424_OsloKunstforening_DKSLab_KassiaMarin_17-redigert.jpg?rlkey=d6cb4zk2sbolj15mrx9qj0r4k&st=uf5ylwp7&dl=0"
                  alt="Kreativ prosess under workshop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="https://dl.dropboxusercontent.com/s/fi/dd556n1ch8kh0zk48rkwr/250424_OsloKunstforening_DKSLab_KassiaMarin_2-redigert.jpg?rlkey=or2u9hst96hd46fnfdlgtlpc9&st=lqo33ufy&dl=0"
                  alt="Workshop i aksjon med deltakere"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img 
                  src="https://dl.dropboxusercontent.com/s/fi/zt5yi19r04jk7vzopgedl/250424_OsloKunstforening_DKSLab_KassiaMarin_19-redigert.jpg?rlkey=8x7zs9c3ecb0srtw4ghqm519j&st=wipu67c3&dl=0"
                  alt="Workshop deltakere som arbeider med flisekunst"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Foto DKS-Lab: Sakib Saboor / Oslo Kunstforening
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="py-16 bg-green-50/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="bg-green-600 text-white px-6 py-3 rounded-full inline-block mb-4">
                <span className="text-lg font-bold">🎉 PÅMELDING ER ÅPEN! 🎉</span>
              </div>
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
                  <p className="font-medium">Deltakeravgift: 200 kr betales ved oppmøte via Vipps</p>
                </div>
                <p className="text-sm mt-1">
                  Avgiften bidrar til å dekke materialkostnader.
                </p>
              </div>
              <div className="mt-3 p-3 bg-accent/30 rounded-md">
                <p className="font-medium text-accent-foreground">
                  NB! Workshopen er tilrettelagt for barn og unge mellom 9 og 16 år, men åpen for alle under 18 år
                </p>
              </div>
              <div className="mt-3 p-3 bg-secondary/80 rounded-md">
                <p className="font-medium">
                  Velg gjerne flere datoer hvis du er fleksibel - dette hjelper oss å sette sammen grupper på best mulig måte
                </p>
              </div>
              <div className="mt-3 p-3 bg-accent/30 rounded-md">
                <p className="font-medium">
                  For barn under 9 år anbefaler vi å delta på drop-in tilbudet, men workshopen er åpen for alle
                </p>
              </div>
              <div className="mt-3 p-3 bg-primary/10 rounded-md">
                <p className="font-medium text-primary">
                  Påmeldingen er bindende - avmelding minimum 24 timer før via e-post
                </p>
              </div>
              <p className="mt-2 font-medium text-primary">Merk: Kun én påmelding per skjema</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-green-200">
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
                        <FormDescription>Må være under 18 år (workshopen er tilrettelagt for 9-16 år)</FormDescription>
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
                  
                  {/* NB! Info Section - moved here */}
                  <div className="mb-8 p-6 border-2 border-primary rounded-lg bg-primary/5">
                    <h3 className="text-lg font-bold mb-4 text-primary">NB! Viktig informasjon om betaling og avmelding</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CreditCard className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Betaling skjer ved oppmøte via Vipps</p>
                          <p className="text-sm text-muted-foreground">Deltakeravgift: 200 kr betales når du kommer til workshopen</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Påmeldingen er bindende</p>
                          <p className="text-sm text-muted-foreground">
                            Avmelding må skje minimum 24 timer før workshopen ved å sende e-post til kassiamarin486@gmail.com. 
                            Dette er viktig slik at flest mulig kan få være med på prosjektet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information Section */}
                  <div className="border-t pt-6 mt-6">
                    <div className="bg-accent/10 p-4 rounded-lg mb-4">
                      <h3 className="text-lg font-medium mb-2">Kontaktinformasjon</h3>
                      <div className="space-y-1 text-sm">
                        <p><strong>Kunstner:</strong> Kassia Marin</p>
                        <p><strong>Nettside:</strong> <a href="https://kassiamarin.studio" className="underline">kassiamarin.studio</a></p>
                        <p><strong>E-post:</strong> <a href="mailto:kassiamarin486@gmail.com" className="underline">kassiamarin486@gmail.com</a></p>
                        <p><strong>Telefon:</strong> <a href="tel:+4790966965" className="underline">90966965</a></p>
                      </div>
                    </div>
                  </div>
                  
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

      {/* Additional Images Section - moved after registration form */}
      <section className="py-12 bg-beige-100/40 paper-texture">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalImages.map((image) => (
                <div 
                  key={image.id}
                  className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => handleImageClick(image.src)}
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setImageModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Workshop bilde - forstørret"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Workshop;

</edits_to_apply>

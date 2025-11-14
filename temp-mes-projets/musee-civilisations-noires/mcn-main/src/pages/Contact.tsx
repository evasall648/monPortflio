import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Facebook, Instagram, Twitter, Globe, Users, Heart, Navigation } from "lucide-react";
import { Footer } from "@/components/Footer";

interface ContactProps {
  language: string;
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const translations = {
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous accompagner dans votre découverte du patrimoine africain",
      form: {
        title: "Envoyez-nous un message",
        name: "Nom complet",
        email: "Adresse email",
        subject: "Sujet",
        type: "Type de demande",
        message: "Votre message",
        send: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé avec succès !",
        error: "Erreur lors de l'envoi. Veuillez réessayer."
      },
      types: {
        general: "Question générale",
        visit: "Réservation de visite",
        group: "Visite de groupe",
        education: "Programme éducatif",
        partnership: "Partenariat",
        technical: "Support technique",
        other: "Autre"
      },
      info: {
        title: "Informations de contact",
        address: "Place de la Gare, Dakar, Sénégal",
        phone: "+221 33 821 00 00",
        email: "contact@mcn.sn",
        website: "www.mcn.sn",
        hours: "Horaires d'ouverture",
        schedule: "Mardi - Dimanche: 9h00 - 18h00",
        closed: "Fermé le lundi"
      },
      social: {
        title: "Suivez-nous",
        subtitle: "Restez connecté avec nos actualités culturelles"
      },
      team: {
        title: "Notre équipe",
        subtitle: "Une équipe passionnée au service du patrimoine africain"
      },
      map: {
        title: "Notre Localisation",
        subtitle: "Trouvez-nous facilement au cœur de Dakar",
        address: "Place de la Gare, Dakar, Sénégal",
        directions: "Itinéraire",
        viewMap: "Voir sur la carte"
      }
    },
    en: {
      title: "Contact Us",
      subtitle: "We are here to accompany you in your discovery of African heritage",
      form: {
        title: "Send us a message",
        name: "Full name",
        email: "Email address",
        subject: "Subject",
        type: "Request type",
        message: "Your message",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again."
      },
      types: {
        general: "General question",
        visit: "Visit booking",
        group: "Group visit",
        education: "Educational program",
        partnership: "Partnership",
        technical: "Technical support",
        other: "Other"
      },
      info: {
        title: "Contact Information",
        address: "Place de la Gare, Dakar, Senegal",
        phone: "+221 33 821 00 00",
        email: "contact@mcn.sn",
        website: "www.mcn.sn",
        hours: "Opening hours",
        schedule: "Tuesday - Sunday: 9:00 AM - 6:00 PM",
        closed: "Closed on Monday"
      },
      social: {
        title: "Follow us",
        subtitle: "Stay connected with our cultural news"
      },
      team: {
        title: "Our team",
        subtitle: "A passionate team at the service of African heritage"
      },
      map: {
        title: "Our Location",
        subtitle: "Find us easily in the heart of Dakar",
        address: "Place de la Gare, Dakar, Senegal",
        directions: "Directions",
        viewMap: "View on map"
      }
    },
    wo: {
      title: "Jëndal nu",
      subtitle: "Nu ngi fii ngir jëkkal yéen ci seen gis bu patrimoine africain",
      form: {
        title: "Yónni nu message",
        name: "Tur bu leer",
        email: "Adresse email",
        subject: "Sujet",
        type: "Tugal bu laaj",
        message: "Seen message",
        send: "Yónni message",
        sending: "Yónni...",
        success: "Message yónni ak succès !",
        error: "Jafeer ci yónni. Téetal ci geneen."
      },
      types: {
        general: "Laaj bu gëwël",
        visit: "Jëkkal seet",
        group: "Seet bu group",
        education: "Programme bu jàng",
        partnership: "Partenariat",
        technical: "Support technique",
        other: "Geneen"
      },
      info: {
        title: "Xam-xam yu Contact",
        address: "Place de la Gare, Dakar, Senegal",
        phone: "+221 33 821 00 00",
        email: "contact@mcn.sn",
        website: "www.mcn.sn",
        hours: "Wakati yu ubbi",
        schedule: "Talaata - Dimanche: 9h00 - 18h00",
        closed: "Ubbu ci Alalt"
      },
      social: {
        title: "Toppal nu",
        subtitle: "Dëkk ak seen actualités culturelles"
      },
      team: {
        title: "Seen équipe",
        subtitle: "Équipe bu bëgg ci seen jëkkal bu patrimoine africain"
      },
      map: {
        title: "Seen Localisation",
        subtitle: "Gis nu ci xol bu Dakar",
        address: "Place de la Gare, Dakar, Senegal",
        directions: "Itinéraire",
        viewMap: "Gis ci carte"
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulation d'envoi - remplacer par votre logique d'API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", type: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-[hsl(var(--earth-brown))] to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-slide-in-up">
            <div className="relative">
              <h1 className="mb-8 text-5xl md:text-6xl font-bold leading-tight text-shadow-lg">{t.title}</h1>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-xl leading-relaxed opacity-95 max-w-3xl mx-auto text-shadow">
              {t.subtitle}
            </p>
            <div className="mt-12 flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gradient flex items-center gap-3">
                    <Send className="h-8 w-8 text-accent" />
                    {t.form.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-semibold">
                          {t.form.name} *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="h-12"
                          placeholder={language === 'fr' ? 'Votre nom complet' : language === 'en' ? 'Your full name' : 'Seen tur bu leer'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-semibold">
                          {t.form.email} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="h-12"
                          placeholder={language === 'fr' ? 'votre@email.com' : language === 'en' ? 'your@email.com' : 'seen@email.com'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-base font-semibold">
                        {t.form.type} *
                      </Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={language === 'fr' ? 'Sélectionnez le type de demande' : language === 'en' ? 'Select request type' : 'Tànn tugal bu laaj'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t.types.general}</SelectItem>
                          <SelectItem value="visit">{t.types.visit}</SelectItem>
                          <SelectItem value="group">{t.types.group}</SelectItem>
                          <SelectItem value="education">{t.types.education}</SelectItem>
                          <SelectItem value="partnership">{t.types.partnership}</SelectItem>
                          <SelectItem value="technical">{t.types.technical}</SelectItem>
                          <SelectItem value="other">{t.types.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-base font-semibold">
                        {t.form.subject} *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="h-12"
                        placeholder={language === 'fr' ? 'Objet de votre message' : language === 'en' ? 'Subject of your message' : 'Sujet bu seen message'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base font-semibold">
                        {t.form.message} *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        rows={6}
                        className="resize-none"
                        placeholder={language === 'fr' ? 'Décrivez votre demande en détail...' : language === 'en' ? 'Describe your request in detail...' : 'Wax seen laaj ci détail...'}
                      />
                    </div>

                    {/* Status messages */}
                    {submitStatus === "success" && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">{t.form.success}</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">{t.form.error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-semibold btn-museum shadow-african hover:shadow-golden"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          {t.form.sending}
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-6 w-6" />
                          {t.form.send}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Informations principales */}
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-accent" />
                    {t.info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t.info.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0" />
                    <a href={`tel:${t.info.phone}`} className="font-semibold text-foreground hover:text-accent transition-colors">
                      {t.info.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                    <a href={`mailto:${t.info.email}`} className="font-semibold text-foreground hover:text-accent transition-colors">
                      {t.info.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Globe className="h-6 w-6 text-accent flex-shrink-0" />
                    <a href={`https://${t.info.website}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-accent transition-colors">
                      {t.info.website}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Horaires */}
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-3">
                    <Clock className="h-6 w-6 text-accent" />
                    {t.info.hours}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">{t.info.schedule}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>{t.info.closed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Réseaux sociaux */}
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-3">
                    <Users className="h-6 w-6 text-accent" />
                    {t.social.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{t.social.subtitle}</p>
                  <div className="flex gap-4">
                    <a 
                      href="https://facebook.com/museedescivilisationsnoires" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                    >
                      <Facebook className="h-6 w-6 text-accent" />
                    </a>
                    <a 
                      href="https://instagram.com/museedescivilisationsnoires" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                    >
                      <Instagram className="h-6 w-6 text-accent" />
                    </a>
                    <a 
                      href="https://twitter.com/museedescivilisationsnoires" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110"
                    >
                      <Twitter className="h-6 w-6 text-accent" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section équipe */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.team.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.team.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-enhanced glass text-center group hover:shadow-african transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  {language === 'fr' ? 'Passion & Engagement' : 
                   language === 'en' ? 'Passion & Commitment' : 
                   'Passion & Engagement'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fr' ? 'Notre équipe est animée par la passion de partager la richesse du patrimoine africain' : 
                   language === 'en' ? 'Our team is driven by the passion to share the richness of African heritage' : 
                   'Seen équipe dafa nekk ci passion bu partage richesse bu patrimoine africain'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-enhanced glass text-center group hover:shadow-african transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  {language === 'fr' ? 'Expertise Culturelle' : 
                   language === 'en' ? 'Cultural Expertise' : 
                   'Expertise Culturelle'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fr' ? 'Des professionnels qualifiés pour vous accompagner dans votre découverte' : 
                   language === 'en' ? 'Qualified professionals to guide you in your discovery' : 
                   'Professionnels yu qualifiés ngir jëkkal yéen ci seen gis'}
                </p>
              </CardContent>
            </Card>

            <Card className="card-enhanced glass text-center group hover:shadow-african transition-all duration-500 hover:scale-105">
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  {language === 'fr' ? 'Innovation Digitale' : 
                   language === 'en' ? 'Digital Innovation' : 
                   'Innovation Digitale'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'fr' ? 'Nous utilisons les technologies modernes pour rendre le patrimoine accessible' : 
                   language === 'en' ? 'We use modern technologies to make heritage accessible' : 
                   'Nu jëfandikoo technologies modernes ngir def patrimoine accessible'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Carte */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.map.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.map.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Informations de localisation */}
            <div className="space-y-8">
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-accent" />
                    {t.map.address}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t.map.address}</p>
                        <p className="text-muted-foreground">
                          {language === 'fr' ? 'Situé au cœur de Dakar, à proximité de la gare' : 
                           language === 'en' ? 'Located in the heart of Dakar, near the station' : 
                           'Nekk ci xol bu Dakar, ci wetu gare'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-accent flex-shrink-0" />
                      <a href={`tel:+221338210000`} className="font-semibold text-foreground hover:text-accent transition-colors">
                        +221 33 821 00 00
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                      <a href={`mailto:contact@mcn.sn`} className="font-semibold text-foreground hover:text-accent transition-colors">
                        contact@mcn.sn
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        asChild 
                        className="btn-museum shadow-african hover:shadow-golden flex-1"
                      >
                        <a 
                          href="https://www.google.com/maps/dir/?api=1&destination=Place+de+la+Gare+Dakar+Senegal" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Navigation className="mr-3 h-5 w-5" />
                          {t.map.directions}
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        asChild 
                        className="flex-1 border-2 border-accent/30 hover:border-accent hover:bg-accent/10"
                      >
                        <a 
                          href="https://www.google.com/maps/place/Place+de+la+Gare+Dakar+Senegal" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-3 h-5 w-5" />
                          {t.map.viewMap}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations de transport */}
              <Card className="card-enhanced glass">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gradient">
                    {language === 'fr' ? 'Comment nous rejoindre' : 
                     language === 'en' ? 'How to reach us' : 
                     'Naka nu gis'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {language === 'fr' ? 'En transport en commun' : 
                           language === 'en' ? 'By public transport' : 
                           'Ci transport public'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Bus et cars rapides vers Place de la Gare' : 
                           language === 'en' ? 'Bus and rapid cars to Place de la Gare' : 
                           'Bus ak cars rapides ci Place de la Gare'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {language === 'fr' ? 'En taxi' : 
                           language === 'en' ? 'By taxi' : 
                           'Ci taxi'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Demandez Place de la Gare, Musée des Civilisations Noires' : 
                           language === 'en' ? 'Ask for Place de la Gare, Museum of Black Civilizations' : 
                           'Laaj Place de la Gare, Musée yu Civilisations Noires'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {language === 'fr' ? 'En voiture' : 
                           language === 'en' ? 'By car' : 
                           'Ci oto'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'fr' ? 'Parking disponible à proximité' : 
                           language === 'en' ? 'Parking available nearby' : 
                           'Parking am ci wetu'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Carte intégrée */}
            <div className="relative">
              <Card className="card-enhanced glass overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-96">
                    {/* Carte Google Maps intégrée */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.5!2d-17.4418!3d14.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQxJzM0LjEiTiAxN8KwMjYnMzAuNSJX!5e0!3m2!1sfr!2ssn!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Musée des Civilisations Noires - Localisation"
                      className="rounded-lg"
                    />
                    
                    {/* Overlay avec informations */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">
                              {language === 'fr' ? 'Musée des Civilisations Noires' : 
                               language === 'en' ? 'Museum of Black Civilizations' : 
                               'Musée yu Civilisations Noires'}
                            </h3>
                            <p className="text-sm text-muted-foreground">{t.map.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Contact;

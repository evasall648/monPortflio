import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail, Globe, Facebook, Instagram, Twitter, Users, Award, BookOpen, Camera, Building2, Heart, Star, ExternalLink, Calendar } from "lucide-react";
import { museumInfo } from "@/data/mcn/museumInfo";
import { collections } from "@/data/mcn/collections";
import heroMuseum from "@/assets/hero-museum.jpg";
import videoMusee from "@/assets/videomusee.mp4";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import { Footer } from "@/components/Footer";

interface MuseumInfoProps {
  language: string;
}

export const MuseumInfo = ({ language }: MuseumInfoProps) => {
  const t = {
    fr: {
      title: "À Propos du Musée",
      subtitle: "Découvrez l'histoire et la mission du Musée des Civilisations Noires",
      info: "Informations Pratiques",
      collections: "Nos Collections",
      contact: "Contact",
      visit: "Planifier une Visite",
      hours: "Horaires",
      admission: "Tarifs",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      website: "Site Web",
      facilities: "Équipements",
      social: "Réseaux Sociaux",
      ecosystem: "Écosystème Culturel Sénégalais",
      ecosystemDesc: "Découvrez les institutions culturelles partenaires et l'écosystème artistique du Sénégal",
      partners: "Institutions Partenaires",
      culturalSites: "Sites Culturels",
      events: "Événements Culturels"
    },
    en: {
      title: "About the Museum",
      subtitle: "Discover the history and mission of the Museum of Black Civilizations",
      info: "Practical Information",
      collections: "Our Collections",
      contact: "Contact",
      visit: "Plan a Visit",
      hours: "Hours",
      admission: "Admission",
      address: "Address",
      phone: "Phone",
      email: "Email",
      website: "Website",
      facilities: "Facilities",
      social: "Social Media",
      ecosystem: "Senegalese Cultural Ecosystem",
      ecosystemDesc: "Discover partner cultural institutions and Senegal's artistic ecosystem",
      partners: "Partner Institutions",
      culturalSites: "Cultural Sites",
      events: "Cultural Events"
    },
    wo: {
      title: "Ci Musée",
      subtitle: "Gis histoire ak mission bu Musée yu Noirs",
      info: "Informations Pratiques",
      collections: "Seen Collections",
      contact: "Contact",
      visit: "Defar benn Seet",
      hours: "Waxtu",
      admission: "Tarifs",
      address: "Adresse",
      phone: "Telephone",
      email: "Email",
      website: "Site Web",
      facilities: "Équipements",
      social: "Réseaux Sociaux",
      ecosystem: "Écosystème Culturel Sénégalais",
      ecosystemDesc: "Gis institutions culturelles partenaires ak écosystème artistique bu Senegaal",
      partners: "Institutions Partenaires",
      culturalSites: "Sites Culturels",
      events: "Événements Culturels"
    }
  };

  const currentT = t[language as keyof typeof t];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-slide-in-up">
          <div className="relative">
            <h1 className="mb-8 text-6xl md:text-7xl font-bold text-gradient leading-tight text-shadow-lg">
              {currentT.title}
            </h1>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-[hsl(var(--gold))]/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[hsl(var(--terracotta))]/20 to-[hsl(var(--earth-brown))]/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-shadow">
            {currentT.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-[hsl(var(--gold))] rounded-full animate-shimmer"></div>
          </div>
        </div>

        {/* Museum Description */}
        <Card className="mb-12 shadow-[var(--shadow-medium)]">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-accent">
                  {museumInfo.name[language as keyof typeof museumInfo.name]}
                </h2>
                <p className="text-foreground leading-relaxed mb-6">
                  {museumInfo.description[language as keyof typeof museumInfo.description]}
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  {museumInfo.mission[language as keyof typeof museumInfo.mission]}
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={museumInfo.images.exterior}
                  alt="Musée des Civilisations Noires"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = heroMuseum;
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Section - En haut */}
        <div className="mb-12">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-[hsl(var(--gold))] bg-clip-text text-transparent">
              {language === 'fr' ? 'Découvrez le Musée' : language === 'en' ? 'Discover the Museum' : 'Gis Musée bi'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'fr' ? 'Une visite immersive en vidéo' : language === 'en' ? 'An immersive video tour' : 'Seet immersive ci video'}
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full object-cover relative z-10"
                controls
                preload="metadata"
                playsInline
              >
                <source src={videoMusee} type="video/mp4" />
                {language === 'fr' ? 'Votre navigateur ne supporte pas la lecture vidéo.' : 
                 language === 'en' ? 'Your browser does not support video playback.' : 
                 'Seen navigateur duppu support lecture video.'}
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none z-20">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === 'fr' ? 'Visite Virtuelle du Musée' : 
                     language === 'en' ? 'Virtual Museum Tour' : 
                     'Seet Virtuel bu Musée'}
                  </h3>
                  <p className="text-sm opacity-90">
                    {language === 'fr' ? 'Explorez les coulisses et l\'architecture du musée' : 
                     language === 'en' ? 'Explore the museum\'s behind-the-scenes and architecture' : 
                     'Seet coulisses ak architecture bu musée'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Museum Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center shadow-[var(--shadow-medium)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold text-accent">18,000</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Œuvres' : language === 'en' ? 'Artworks' : 'Liggéey'}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-[var(--shadow-medium)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Niveaux' : language === 'en' ? 'Floors' : 'Étages'}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-[var(--shadow-medium)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <BookOpen className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold text-accent">14,000</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'm²' : language === 'en' ? 'm²' : 'm²'}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-[var(--shadow-medium)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Camera className="h-8 w-8 text-accent mb-2" />
                <div className="text-2xl font-bold text-accent">2018</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Inauguration' : language === 'en' ? 'Inauguration' : 'Inauguration'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Museum Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {language === 'fr' ? 'Galerie du Musée' : language === 'en' ? 'Museum Gallery' : 'Galerie bu Musée'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={museumInfo.images.exterior}
                  alt="Extérieur du musée"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = heroMuseum;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-white/90 text-black">
                    {language === 'fr' ? 'Extérieur' : language === 'en' ? 'Exterior' : 'Extérieur'}
                  </Badge>
                </div>
              </div>
            </Card>
            
            <Card className="group hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={museumInfo.images.interior}
                  alt="Intérieur du musée"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = image1;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-white/90 text-black">
                    {language === 'fr' ? 'Intérieur' : language === 'en' ? 'Interior' : 'Intérieur'}
                  </Badge>
                </div>
              </div>
            </Card>
            
            <Card className="group hover:shadow-[var(--shadow-medium)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={museumInfo.images.gallery}
                  alt="Galerie du musée"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = image2;
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-white/90 text-black">
                    {language === 'fr' ? 'Galerie' : language === 'en' ? 'Gallery' : 'Galerie'}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>


        {/* Practical Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-accent mr-3" />
                <h3 className="text-lg font-semibold">{currentT.hours}</h3>
              </div>
              <p className="text-foreground">
                {museumInfo.hours[language as keyof typeof museumInfo.hours]}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-accent mr-3" />
                <h3 className="text-lg font-semibold">{currentT.address}</h3>
              </div>
              <p className="text-foreground">
                {museumInfo.address[language as keyof typeof museumInfo.address]}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-accent mr-3" />
                <h3 className="text-lg font-semibold">{currentT.admission}</h3>
              </div>
              <p className="text-foreground">
                {museumInfo.admission[language as keyof typeof museumInfo.admission]}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Collections */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">{currentT.collections}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="group hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name[language as keyof typeof collection.name]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {collection.name[language as keyof typeof collection.name]}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {collection.description[language as keyof typeof collection.description]}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      {collection.numberOfPieces} pièces
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {collection.period[language as keyof typeof collection.period]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <Card className="mb-12 shadow-[var(--shadow-medium)]">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-accent">{currentT.facilities}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {museumInfo.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="p-2 text-center">
                  {facility}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-accent">{currentT.contact}</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-accent mr-3" />
                  <span>{museumInfo.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-accent mr-3" />
                  <span>{museumInfo.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-accent mr-3" />
                  <span>{museumInfo.contact.website}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-accent">{currentT.social}</h2>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={museumInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={museumInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={museumInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Écosystème Culturel Sénégalais */}
        <section className="py-16 bg-gradient-to-br from-muted/20 via-background to-muted/10 rounded-2xl mb-12">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl font-bold text-gradient leading-tight">
              {currentT.ecosystem}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {currentT.ecosystemDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Institutions Partenaires */}
            <Card className="card-enhanced hover:shadow-african transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-accent">{currentT.partners}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Musée Théodore Monod d'art africain (ex-IFAN)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Monument de la renaissance africaine</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Maison d'Ousmane Sow (le Sphinx)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Musée de la Femme « Henriette Bathily »</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sites Culturels */}
            <Card className="card-enhanced hover:shadow-african transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-accent">{currentT.culturalSites}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>Théâtre national Daniel Sorano</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>Village des arts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>Galerie nationale d'art</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span>Maison des Esclaves (Gorée)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Événements Culturels */}
            <Card className="card-enhanced hover:shadow-african transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-accent">{currentT.events}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>Festivals de musique traditionnelle</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>Expositions d'art contemporain</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>Spectacles de danse</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>Conférences culturelles</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lien vers le site culturel */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-all duration-300">
              <a 
                href="https://www.au-senegal.com/-art-et-culture-.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                {language === 'fr' ? 'Découvrir l\'agenda culturel du Sénégal' : 
                 language === 'en' ? 'Discover Senegal\'s cultural agenda' : 
                 'Gis agenda culturel bu Senegaal'}
              </a>
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <a href="/gallery">
              {currentT.visit}
            </a>
          </Button>
        </div>

        {/* Footer */}
        <Footer language={language} />
      </div>
    </div>
  );
};

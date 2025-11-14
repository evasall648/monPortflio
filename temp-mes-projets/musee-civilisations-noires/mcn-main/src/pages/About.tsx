import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Award, 
  Heart, 
  Globe, 
  BookOpen, 
  Crown, 
  Sparkles, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Star,
  Shield,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import heroImage from "@/assets/hero-museum.jpg";
import facadeImage from "@/assets/facade.jpeg";
import grandhallImage from "@/assets/grandhall.jpeg";
import celebrationImage from "@/assets/celebrationartistique.jpeg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

interface AboutProps {
  language: string;
}

const About = ({ language }: AboutProps) => {
  // Images du carousel
  const carouselImages = [
    { src: heroImage, alt: "Musée des Civilisations Noires - Vue extérieure" },
    { src: facadeImage, alt: "Façade du Musée des Civilisations Noires" },
    { src: grandhallImage, alt: "Grand Hall du Musée" },
    { src: celebrationImage, alt: "Célébration artistique au Musée" },
    { src: image1, alt: "Collection d'œuvres d'art du Musée" },
    { src: image2, alt: "Exposition temporaire au Musée" },
    { src: image3, alt: "Salle d'exposition du Musée" },
    { src: image4, alt: "Installation artistique au Musée" },
    { src: image5, alt: "Galerie du Musée des Civilisations Noires" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotation du carousel avec animation améliorée
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300); // Délai pour l'effet de transition
    }, 2000); // Change d'image toutes les 2 secondes (encore plus rapide)

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const translations = {
    fr: {
      hero: {
        title: "À Propos du Musée des Civilisations Noires",
        subtitle: "Découvrez l'histoire et la mission de notre institution culturelle",
        description: "Un espace dédié à la préservation, à la valorisation et à la transmission du patrimoine africain à travers les âges."
      },
      mission: {
        title: "Notre Mission",
        subtitle: "Préserver et célébrer le patrimoine africain",
        description: "Le Musée des Civilisations Noires a pour mission de préserver, documenter et mettre en valeur la richesse culturelle des civilisations africaines. Nous nous engageons à rendre ce patrimoine accessible au plus grand nombre grâce aux technologies numériques.",
        values: [
          {
            icon: Shield,
            title: "Préservation",
            description: "Conserver et protéger les trésors culturels africains pour les générations futures"
          },
          {
            icon: BookOpen,
            title: "Éducation",
            description: "Transmettre les connaissances et l'histoire des civilisations africaines"
          },
          {
            icon: Globe,
            title: "Accessibilité",
            description: "Rendre le patrimoine accessible à tous, partout dans le monde"
          },
          {
            icon: Heart,
            title: "Célébration",
            description: "Célébrer la diversité et la richesse des cultures africaines"
          }
        ]
      },
      history: {
        title: "Notre Histoire",
        subtitle: "Une institution au service du patrimoine africain",
        description: "Fondé en 2018, le Musée des Civilisations Noires est né de la volonté de créer un espace dédié à la mise en valeur du patrimoine africain. Situé au cœur de Dakar, il symbolise le renouveau culturel africain et l'importance de préserver notre héritage commun.",
        timeline: [
          {
            year: "2018",
            title: "Inauguration",
            description: "Ouverture officielle du Musée des Civilisations Noires"
          },
          {
            year: "2019",
            title: "Première Exposition",
            description: "Lancement de la première exposition permanente"
          },
          {
            year: "2020",
            title: "Digitalisation",
            description: "Début de la transformation numérique du musée"
          },
          {
            year: "2024",
            title: "Innovation",
            description: "Lancement de la plateforme numérique interactive"
          }
        ]
      },
      collection: {
        title: "Notre Collection",
        subtitle: "Plus de 18 000 œuvres d'art exceptionnelles",
        description: "Notre collection rassemble des œuvres d'art, des objets culturels et des témoignages historiques provenant de toute l'Afrique. Chaque pièce raconte une histoire unique et contribue à la compréhension de notre patrimoine commun.",
        stats: [
          { number: "18,000+", label: "Œuvres d'art" },
          { number: "50+", label: "Pays représentés" },
          { number: "15", label: "Collections permanentes" },
          { number: "3", label: "Langues supportées" }
        ]
      },
      team: {
        title: "Notre Équipe",
        subtitle: "Des professionnels passionnés au service du patrimoine",
        description: "Notre équipe est composée d'experts en histoire de l'art, de conservateurs, de chercheurs et de techniciens dédiés à la préservation et à la mise en valeur du patrimoine africain.",
        roles: [
          {
            title: "Conservateurs",
            description: "Experts en préservation et restauration d'œuvres d'art"
          },
          {
            title: "Chercheurs",
            description: "Spécialistes de l'histoire et des civilisations africaines"
          },
          {
            title: "Médiateurs",
            description: "Professionnels de la transmission culturelle et éducative"
          },
          {
            title: "Techniciens",
            description: "Experts en technologies numériques et innovation"
          }
        ]
      },
      visit: {
        title: "Visitez le Musée",
        subtitle: "Découvrez nos espaces et nos services",
        description: "Le Musée des Civilisations Noires vous accueille dans un cadre exceptionnel au cœur de Dakar. Découvrez nos expositions, participez à nos événements et explorez notre patrimoine.",
        services: [
          "Visites guidées multilingues",
          "Expositions temporaires",
          "Ateliers éducatifs",
          "Conférences et événements",
          "Visites virtuelles",
          "Accès numérique"
        ]
      },
      cta: {
        title: "Rejoignez-nous",
        subtitle: "Découvrez le patrimoine africain",
        gallery: "Explorer la Galerie",
        contact: "Nous Contacter",
        visit: "Planifier une Visite"
      }
    },
    en: {
      hero: {
        title: "About the Museum of Black Civilizations",
        subtitle: "Discover the history and mission of our cultural institution",
        description: "A space dedicated to preserving, enhancing and transmitting African heritage through the ages."
      },
      mission: {
        title: "Our Mission",
        subtitle: "Preserve and celebrate African heritage",
        description: "The Museum of Black Civilizations is committed to preserving, documenting and showcasing the cultural richness of African civilizations. We are committed to making this heritage accessible to everyone through digital technologies.",
        values: [
          {
            icon: Shield,
            title: "Preservation",
            description: "Conserve and protect African cultural treasures for future generations"
          },
          {
            icon: BookOpen,
            title: "Education",
            description: "Transmit knowledge and history of African civilizations"
          },
          {
            icon: Globe,
            title: "Accessibility",
            description: "Make heritage accessible to all, everywhere in the world"
          },
          {
            icon: Heart,
            title: "Celebration",
            description: "Celebrate the diversity and richness of African cultures"
          }
        ]
      },
      history: {
        title: "Our History",
        subtitle: "An institution at the service of African heritage",
        description: "Founded in 2018, the Museum of Black Civilizations was born from the desire to create a space dedicated to showcasing African heritage. Located in the heart of Dakar, it symbolizes African cultural renewal and the importance of preserving our common heritage.",
        timeline: [
          {
            year: "2018",
            title: "Inauguration",
            description: "Official opening of the Museum of Black Civilizations"
          },
          {
            year: "2019",
            title: "First Exhibition",
            description: "Launch of the first permanent exhibition"
          },
          {
            year: "2020",
            title: "Digitization",
            description: "Beginning of the museum's digital transformation"
          },
          {
            year: "2024",
            title: "Innovation",
            description: "Launch of the interactive digital platform"
          }
        ]
      },
      collection: {
        title: "Our Collection",
        subtitle: "Over 18,000 exceptional artworks",
        description: "Our collection brings together artworks, cultural objects and historical testimonies from all over Africa. Each piece tells a unique story and contributes to understanding our common heritage.",
        stats: [
          { number: "18,000+", label: "Artworks" },
          { number: "50+", label: "Countries represented" },
          { number: "15", label: "Permanent collections" },
          { number: "3", label: "Supported languages" }
        ]
      },
      team: {
        title: "Our Team",
        subtitle: "Passionate professionals at the service of heritage",
        description: "Our team is made up of art history experts, curators, researchers and technicians dedicated to preserving and showcasing African heritage.",
        roles: [
          {
            title: "Curators",
            description: "Experts in preservation and restoration of artworks"
          },
          {
            title: "Researchers",
            description: "Specialists in African history and civilizations"
          },
          {
            title: "Mediators",
            description: "Cultural and educational transmission professionals"
          },
          {
            title: "Technicians",
            description: "Digital technology and innovation experts"
          }
        ]
      },
      visit: {
        title: "Visit the Museum",
        subtitle: "Discover our spaces and services",
        description: "The Museum of Black Civilizations welcomes you in an exceptional setting in the heart of Dakar. Discover our exhibitions, participate in our events and explore our heritage.",
        services: [
          "Multilingual guided tours",
          "Temporary exhibitions",
          "Educational workshops",
          "Conferences and events",
          "Virtual tours",
          "Digital access"
        ]
      },
      cta: {
        title: "Join us",
        subtitle: "Discover African heritage",
        gallery: "Explore Gallery",
        contact: "Contact Us",
        visit: "Plan a Visit"
      }
    },
    wo: {
      hero: {
        title: "Ci Musée yu Civilisations Noires",
        subtitle: "Gis histoire ak mission bu seen institution culturelle",
        description: "Espace bu jëkk ci préservation, valorisation ak transmission bu patrimoine africain ci temps yu leer."
      },
      mission: {
        title: "Seen Mission",
        subtitle: "Préserver ak célébrer patrimoine africain",
        description: "Musée yu Civilisations Noires dafa am mission bu préservation, documentation ak mise en valeur bu richesse culturelle yu civilisations africaines. Nu dafa jëkkal ngir def patrimoine accessible ci ñépp ci technologies numériques.",
        values: [
          {
            icon: Shield,
            title: "Préservation",
            description: "Conserver ak protéger trésors culturels africains ci générations yu kanam"
          },
          {
            icon: BookOpen,
            title: "Éducation",
            description: "Transmettre connaissances ak histoire yu civilisations africaines"
          },
          {
            icon: Globe,
            title: "Accessibilité",
            description: "Def patrimoine accessible ci ñépp, fii ak fii ci aduna"
          },
          {
            icon: Heart,
            title: "Célébration",
            description: "Célébrer diversité ak richesse yu cultures africaines"
          }
        ]
      },
      history: {
        title: "Seen Histoire",
        subtitle: "Institution ci seen jëkkal bu patrimoine africain",
        description: "Def ci 2018, Musée yu Civilisations Noires dafa jëkk ci bëgg bu def espace bu jëkk ci mise en valeur bu patrimoine africain. Nekk ci xol bu Dakar, dafa wone cultural renewal africain ak importance bu préservation bu seen patrimoine commun.",
        timeline: [
          {
            year: "2018",
            title: "Inauguration",
            description: "Ubbi officiel bu Musée yu Civilisations Noires"
          },
          {
            year: "2019",
            title: "Première Exposition",
            description: "Jëkkal bu première exposition permanente"
          },
          {
            year: "2020",
            title: "Digitalisation",
            description: "Jëkkal bu transformation numérique bu musée"
          },
          {
            year: "2024",
            title: "Innovation",
            description: "Jëkkal bu plateforme numérique interactive"
          }
        ]
      },
      collection: {
        title: "Seen Collection",
        subtitle: "18 000 liggéey yu art yu exceptionnelles",
        description: "Seen collection dafa rassembler liggéey yu art, objets culturels ak témoignages historiques yu jëkk ci Afrika bu leer. Képp pièce dafa wax histoire bu unique ak dafa jagle compréhension bu seen patrimoine commun.",
        stats: [
          { number: "18,000+", label: "Liggéey yu art" },
          { number: "50+", label: "Réew yu wone" },
          { number: "15", label: "Collections permanentes" },
          { number: "3", label: "Làkk yu supportées" }
        ]
      },
      team: {
        title: "Seen Équipe",
        subtitle: "Professionnels yu bëgg ci seen jëkkal bu patrimoine",
        description: "Seen équipe dafa nekk ci experts ci histoire yu art, conservateurs, chercheurs ak techniciens yu jëkkal ci préservation ak mise en valeur bu patrimoine africain.",
        roles: [
          {
            title: "Conservateurs",
            description: "Experts ci préservation ak restauration yu liggéey yu art"
          },
          {
            title: "Chercheurs",
            description: "Spécialistes ci histoire ak civilisations africaines"
          },
          {
            title: "Médiateurs",
            description: "Professionnels yu transmission culturelle ak éducative"
          },
          {
            title: "Techniciens",
            description: "Experts ci technologies numériques ak innovation"
          }
        ]
      },
      visit: {
        title: "Seet Musée",
        subtitle: "Gis seen espaces ak seen services",
        description: "Musée yu Civilisations Noires dafa jëkkal yéen ci cadre exceptionnel ci xol bu Dakar. Gis seen expositions, jagle seen événements ak seet seen patrimoine.",
        services: [
          "Seet yu guidées multilingues",
          "Expositions temporaires",
          "Ateliers éducatifs",
          "Conférences ak événements",
          "Seet virtuelles",
          "Am ci numérique"
        ]
      },
      cta: {
        title: "Dëkk ak nu",
        subtitle: "Gis patrimoine africain",
        gallery: "Seet Nataal",
        contact: "Jëndal nu",
        visit: "Planifier Seet"
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-[hsl(var(--earth-brown))] to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-slide-in-up">
            <div className="relative">
              <h1 className="mb-8 text-5xl md:text-6xl font-bold leading-tight text-shadow-lg">{t.hero.title}</h1>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-xl leading-relaxed opacity-95 max-w-3xl mx-auto text-shadow">
              {t.hero.subtitle}
            </p>
            <p className="text-lg leading-relaxed opacity-90 max-w-2xl mx-auto mt-6 text-shadow">
              {t.hero.description}
            </p>
            <div className="mt-12 flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section - Moved to first position */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.visit.title}</h2>
              <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">{t.visit.subtitle}</p>
              <p className="text-lg text-foreground/90 leading-relaxed mb-8">
                {t.visit.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.visit.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-foreground font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in">
              <div className="relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-african relative">
                  {/* Image principale avec effet de transition amélioré */}
                  <img
                    src={carouselImages[currentImageIndex].src}
                    alt={carouselImages[currentImageIndex].alt}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
                      isTransitioning 
                        ? 'scale-110 blur-sm opacity-70' 
                        : 'scale-100 blur-0 opacity-100'
                    } group-hover:scale-105`}
                  />
                  
                  {/* Overlay de transition */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-accent/20 to-[hsl(var(--gold))]/20 transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  {/* Effet de brillance pendant la transition */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-all duration-500 ${
                    isTransitioning ? 'translate-x-full' : '-translate-x-full'
                  }`}></div>
                </div>
                
                {/* Indicateurs du carousel améliorés */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentImageIndex(index);
                          setIsTransitioning(false);
                        }, 150);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white shadow-lg scale-125 ring-2 ring-white/50' 
                          : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Overlay décoratif avec animation améliorée */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent to-[hsl(var(--gold))] rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--terracotta))] to-[hsl(var(--earth-brown))] rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
                
                {/* Effet de particules flottantes */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.mission.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.mission.subtitle}</p>
            <p className="text-lg text-foreground/90 max-w-4xl mx-auto mt-6 leading-relaxed">
              {t.mission.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.mission.values.map((value, index) => (
              <Card
                key={index}
                className="group card-enhanced hover:shadow-african transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-slide-up glass relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-[hsl(var(--gold))]"></div>
                <CardContent className="p-8 text-center relative">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold group-hover:text-accent transition-colors duration-300">{value.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.history.title}</h2>
              <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">{t.history.subtitle}</p>
              <p className="text-lg text-foreground/90 leading-relaxed mb-8">
                {t.history.description}
              </p>
            </div>

            <div className="space-y-6 animate-fade-in">
              {t.history.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-6 animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection Stats */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.collection.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.collection.subtitle}</p>
            <p className="text-lg text-foreground/90 max-w-4xl mx-auto mt-6 leading-relaxed">
              {t.collection.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.collection.stats.map((stat, index) => (
              <Card key={index} className="card-enhanced glass text-center group hover:shadow-african transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <p className="text-lg font-semibold text-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.team.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.team.subtitle}</p>
            <p className="text-lg text-foreground/90 max-w-4xl mx-auto mt-6 leading-relaxed">
              {t.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.roles.map((role, index) => (
              <Card key={index} className="card-enhanced glass group hover:shadow-african transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{role.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-[hsl(var(--earth-brown))] to-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="mb-8 text-5xl md:text-6xl font-bold leading-tight">{t.cta.title}</h2>
            <p className="text-xl leading-relaxed opacity-95 max-w-3xl mx-auto mb-12">
              {t.cta.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="hero" size="lg" asChild className="btn-hero shadow-african hover:shadow-golden">
                <Link to="/gallery">
                  <Crown className="mr-3 h-6 w-6" />
                  {t.cta.gallery}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-primary-foreground/30 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300">
                <Link to="/contact">
                  <Mail className="mr-3 h-6 w-6" />
                  {t.cta.contact}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default About;


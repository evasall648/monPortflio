import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Play, Pause, Camera, Eye } from "lucide-react";
import { mcnArtworks } from "@/data/mcn/artworks";
import { collections } from "@/data/mcn/collections";
import heroMuseum from "@/assets/hero-museum.jpg";
import artworkMask from "@/assets/artwork-mask.jpg";
import artworkBronze from "@/assets/artwork-bronze.jpg";
import artworkTextile from "@/assets/artwork-textile.jpg";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import { Footer } from "@/components/Footer";

interface VirtualTourProps {
  language: string;
}

export const VirtualTour = ({ language }: VirtualTourProps) => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tourStops = [
    {
      id: "entrance",
      title: {
        fr: "Hall d'Entrée",
        en: "Main Entrance",
        wo: "Hall d'Entrée"
      },
      description: {
        fr: "Bienvenue au Musée des Civilisations Noires. Ce hall majestueux vous accueille dans un voyage à travers l'histoire et la culture africaines. Découvrez l'architecture moderne inspirée des formes traditionnelles africaines.",
        en: "Welcome to the Museum of Black Civilizations. This majestic hall welcomes you on a journey through African history and culture. Discover the modern architecture inspired by traditional African forms.",
        wo: "Bienvenue ci Musée yu Noirs. Bii hall majestueux dafa jëkk ci seen voyage ci biir histoire ak culture africaines. Gis architecture moderne bu inspire ci formes tradisyonel africaines."
      },
      image: heroMuseum,
      duration: "5 min",
      highlights: {
        fr: ["Architecture moderne", "Sculpture monumentale", "Hall d'accueil"],
        en: ["Modern architecture", "Monumental sculpture", "Welcome hall"],
        wo: ["Architecture moderne", "Sculpture monumentale", "Hall d'accueil"]
      }
    },
    {
      id: "masks",
      title: {
        fr: "Salle des Masques",
        en: "Masks Gallery",
        wo: "Salle yu Masque"
      },
      description: {
        fr: "Découvrez la collection exceptionnelle de masques cérémoniels. Chaque masque raconte une histoire unique et porte une signification spirituelle profonde. Ces œuvres témoignent de la diversité culturelle africaine.",
        en: "Discover the exceptional collection of ceremonial masks. Each mask tells a unique story and carries deep spiritual meaning. These works testify to African cultural diversity.",
        wo: "Gis collection exceptionnelle bu masque cérémoniels. Benn benn masque dafa wone histoire unique ak dafa am signification spirituelle bu rëy. Liggéey yii dañu wone diversité culturelle africaine."
      },
      image: artworkMask,
      duration: "10 min",
      artworks: mcnArtworks.filter(a => a.tags.includes('masque')),
      highlights: {
        fr: ["Masques wolof", "Cérémonies traditionnelles", "Art spirituel"],
        en: ["Wolof masks", "Traditional ceremonies", "Spiritual art"],
        wo: ["Masque yu Wolof", "Ceremonies tradisyonel", "Art spirituel"]
      }
    },
    {
      id: "bronze",
      title: {
        fr: "Salle Royale",
        en: "Royal Gallery",
        wo: "Salle Royal"
      },
      description: {
        fr: "Explorez les sculptures en bronze des royaumes sénégalais. Ces œuvres témoignent de la maîtrise technique et de la richesse culturelle de l'époque. Découvrez l'art de la fonte du bronze et son importance dans l'histoire africaine.",
        en: "Explore bronze sculptures from Senegalese kingdoms. These works testify to the technical mastery and cultural richness of the era. Discover the art of bronze casting and its importance in African history.",
        wo: "Seet sculptures yu bronze yu réewu yu Senegaal. Liggéey yii dañu wone maîtrise technique ak richesse culturelle bu waxtu. Gis art bu fonte bu bronze ak sa importance ci histoire africaine."
      },
      image: artworkBronze,
      duration: "12 min",
      artworks: mcnArtworks.filter(a => a.tags.includes('bronze')),
      highlights: {
        fr: ["Sculptures royales", "Technique de fonte", "Royaume du Djolof"],
        en: ["Royal sculptures", "Casting technique", "Djolof Kingdom"],
        wo: ["Sculptures royales", "Technique bu fonte", "Réewum Djolof"]
      }
    },
    {
      id: "textiles",
      title: {
        fr: "Salle des Textiles",
        en: "Textiles Gallery",
        wo: "Salle yu Textile"
      },
      description: {
        fr: "Admirez les textiles cérémoniels aux motifs complexes. Chaque couleur et motif a une signification symbolique liée aux traditions ancestrales. Ces œuvres témoignent du savoir-faire des tisserands africains.",
        en: "Admire ceremonial textiles with complex patterns. Each color and pattern has symbolic meaning linked to ancestral traditions. These works testify to the craftsmanship of African weavers.",
        wo: "Bari textile cérémoniels yu am motifs yu complex. Benn benn couleur ak motif am na signification symbolique ci traditions ancestrales. Liggéey yii dañu wone savoir-faire bu tisserands africains."
      },
      image: artworkTextile,
      duration: "8 min",
      artworks: mcnArtworks.filter(a => a.tags.includes('textile')),
      highlights: {
        fr: ["Textiles sérères", "Motifs géométriques", "Artisanat féminin"],
        en: ["Serer textiles", "Geometric patterns", "Women's craftsmanship"],
        wo: ["Textile yu Seereer", "Motifs géométriques", "Artisanat féminin"]
      }
    },
    {
      id: "contemporary",
      title: {
        fr: "Art Contemporain",
        en: "Contemporary Art",
        wo: "Art Contemporain"
      },
      description: {
        fr: "Découvrez l'art contemporain africain qui réinterprète les traditions avec des techniques modernes. Ces créations témoignent de la vitalité de l'art africain aujourd'hui et de son dialogue avec le monde.",
        en: "Discover contemporary African art that reinterprets traditions with modern techniques. These creations testify to the vitality of African art today and its dialogue with the world.",
        wo: "Gis art contemporain africain bu reinterpret traditions ak techniques modernes. Créations yii dañu wone vitalité bu art africain tey ak sa dialogue ak aduna."
      },
      image: image5,
      duration: "15 min",
      artworks: mcnArtworks.filter(a => a.tags.includes('contemporain')),
      highlights: {
        fr: ["Art moderne", "Identité africaine", "Techniques mixtes"],
        en: ["Modern art", "African identity", "Mixed techniques"],
        wo: ["Art moderne", "Identité africaine", "Techniques mixtes"]
      }
    },
    {
      id: "exhibitions",
      title: {
        fr: "Expositions Temporaires",
        en: "Temporary Exhibitions",
        wo: "Expositions Temporaires"
      },
      description: {
        fr: "Explorez les expositions temporaires qui enrichissent constamment la programmation du musée. Découvrez des œuvres d'artistes internationaux et des collaborations culturelles exceptionnelles.",
        en: "Explore temporary exhibitions that constantly enrich the museum's programming. Discover works by international artists and exceptional cultural collaborations.",
        wo: "Seet expositions temporaires yu enrichissent constamment programmation bu musée. Gis liggéey yu artistes internationaux ak collaborations culturelles yu exceptionnelles."
      },
      image: image3,
      duration: "20 min",
      artworks: mcnArtworks.filter(a => a.tags.includes('exposition')),
      highlights: {
        fr: ["Picasso à Dakar", "Léonard de Vinci", "Collaborations internationales"],
        en: ["Picasso in Dakar", "Leonardo da Vinci", "International collaborations"],
        wo: ["Picasso ci Dakar", "Léonard de Vinci", "Collaborations internationales"]
      }
    }
  ];

  const translations = {
    fr: {
      title: "Visite Virtuelle",
      subtitle: "Explorez le musée depuis chez vous",
      start: "Commencer la visite",
      next: "Suivant",
      previous: "Précédent",
      stop: "Arrêter",
      resume: "Reprendre",
      duration: "Durée",
      artworks: "Œuvres à voir",
      currentStop: "Étape actuelle"
    },
    en: {
      title: "Virtual Tour",
      subtitle: "Explore the museum from home",
      start: "Start tour",
      next: "Next",
      previous: "Previous",
      stop: "Stop",
      resume: "Resume",
      duration: "Duration",
      artworks: "Artworks to see",
      currentStop: "Current stop"
    },
    wo: {
      title: "Seet Virtuel",
      subtitle: "Seet musée bi ci kër",
      start: "Jëkk seet",
      next: "Ci kanam",
      previous: "Ci gannaaw",
      stop: "Dégg",
      resume: "Jëkk",
      duration: "Waxtu",
      artworks: "Liggéey yu seet",
      currentStop: "Étape bu tey"
    }
  };

  const t = translations[language as keyof typeof translations];
  const currentStopData = tourStops[currentStop];

  const nextStop = () => {
    if (currentStop < tourStops.length - 1) {
      setCurrentStop(currentStop + 1);
    }
  };

  const previousStop = () => {
    if (currentStop > 0) {
      setCurrentStop(currentStop - 1);
    }
  };

  const toggleTour = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="mb-6 text-6xl md:text-7xl font-bold text-gradient leading-tight">
            {t.title}
          </h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>


        {/* Tour Controls */}
        <Card className="mb-8 shadow-[var(--shadow-medium)] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={toggleTour}
                  className="hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 mr-2" />
                  ) : (
                    <Play className="h-5 w-5 mr-2" />
                  )}
                  {isPlaying ? t.stop : t.start}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={previousStop}
                    disabled={currentStop === 0}
                  >
                    {t.previous}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextStop}
                    disabled={currentStop === tourStops.length - 1}
                  >
                    {t.next}
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">{t.currentStop}</p>
                <p className="font-semibold">
                  {currentStop + 1} / {tourStops.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Stop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={currentStopData.image}
              alt={currentStopData.title[language as keyof typeof currentStopData.title]}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = heroMuseum; // Image de fallback
              }}
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-accent-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {currentStopData.duration}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 text-black">
                <Camera className="h-4 w-4 mr-2" />
                {currentStop + 1}/{tourStops.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {currentStopData.title[language as keyof typeof currentStopData.title]}
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-4">
                {currentStopData.description[language as keyof typeof currentStopData.description]}
              </p>
              
              {/* Highlights */}
              {currentStopData.highlights && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    {language === 'fr' ? 'Points forts' : language === 'en' ? 'Highlights' : 'Points yu gërë'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStopData.highlights[language as keyof typeof currentStopData.highlights].map((highlight, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/50">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {currentStopData.artworks && currentStopData.artworks.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {t.artworks}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStopData.artworks.map((artwork) => (
                      <div
                        key={artwork.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <img
                          src={artwork.image}
                          alt={artwork.title[language as keyof typeof artwork.title]}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {artwork.title[language as keyof typeof artwork.title]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {artwork.period[language as keyof typeof artwork.period]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Tour Progress */}
        <Card className="shadow-[var(--shadow-medium)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {language === 'fr' ? 'Progression de la visite' : language === 'en' ? 'Tour Progress' : 'Progression bu seet'}
              </h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStop + 1) / tourStops.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-6">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStop + 1) / tourStops.length) * 100}%` }}
              />
            </div>
            
            {/* Tour Steps Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {tourStops.map((stop, index) => (
                <button
                  key={stop.id}
                  onClick={() => setCurrentStop(index)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentStop 
                      ? 'ring-2 ring-accent scale-105' 
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={stop.image}
                    alt={stop.title[language as keyof typeof stop.title]}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = heroMuseum;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-xs font-semibold">
                        {stop.title[language as keyof typeof stop.title]}
                      </div>
                      <div className="text-xs opacity-90">
                        {stop.duration}
                      </div>
                    </div>
                  </div>
                  {index === currentStop && (
                    <div className="absolute top-1 right-1">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Footer language={language} />
      </div>
    </div>
  );
};

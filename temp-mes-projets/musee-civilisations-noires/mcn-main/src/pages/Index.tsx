import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Volume2, Globe, BookOpen, Sparkles, Crown, Building2, Users, Clock, Shield, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-museum.jpg";
import { mcnArtworks } from "@/data/mcn/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Footer } from "@/components/Footer";

interface IndexProps {
  language: string;
}

const Index = ({ language }: IndexProps) => {
  const translations = {
    fr: {
      hero: {
        title: "Découvrez le Patrimoine Africain",
        subtitle: "Explorez les trésors du Musée des Civilisations Noires",
        cta: "Explorer la Galerie",
        scanCta: "Scanner une Œuvre",
        featuresCta: "Découvrir les Fonctionnalités",
      },
      features: {
        title: "Pourquoi Visiter le Musée des Civilisations Noires ?",
        subtitle: "Découvrez les trésors uniques de notre patrimoine culturel africain",
        qr: {
          title: "Collection Exceptionnelle",
          desc: "Plus de 18 000 œuvres d'art témoignant de la richesse des civilisations africaines",
        },
        multilingual: {
          title: "Patrimoine Multilingue",
          desc: "Explorez l'histoire en Français, Anglais et Wolof pour une compréhension authentique",
        },
        audio: {
          title: "Histoire Vivante",
          desc: "Découvrez les récits et légendes qui ont façonné les civilisations africaines",
        },
        online: {
          title: "Accès Mondial",
          desc: "Partagez la beauté du patrimoine africain avec le monde entier",
        },
      },
      collection: {
        title: "Collection en Vedette",
        viewAll: "Voir Toute la Galerie",
      },
      about: {
        title: "À Propos du Musée",
        text: "Le Musée des Civilisations Noires est un espace culturel majeur dédié à la préservation et à la célébration du patrimoine africain. Notre mission est de rendre accessible cette richesse inestimable au plus grand nombre grâce au digital.",
      },
      discover: {
        title: "Découvrez le Patrimoine Africain",
        subtitle: "Explorez les trésors du Musée des Civilisations Noires",
        description: "Plongez dans l'histoire millénaire des civilisations africaines à travers une collection exceptionnelle d'œuvres d'art, d'objets culturels et de témoignages historiques. Chaque pièce raconte une histoire unique et contribue à la richesse de notre patrimoine commun.",
        cta: "Explorer la Galerie",
        features: [
          "Plus de 18 000 œuvres d'art",
          "Collections multilingues",
          "Visites virtuelles immersives",
          "Accès numérique mondial"
        ]
      },
    },
    en: {
      hero: {
        title: "Discover African Heritage",
        subtitle: "Explore the treasures of the Museum of Black Civilizations",
        cta: "Explore Gallery",
        scanCta: "Scan an Artwork",
        featuresCta: "Discover Features",
      },
      features: {
        title: "Why Visit the Museum of Black Civilizations?",
        subtitle: "Discover the unique treasures of our African cultural heritage",
        qr: {
          title: "Exceptional Collection",
          desc: "Over 18,000 artworks showcasing the richness of African civilizations",
        },
        multilingual: {
          title: "Multilingual Heritage",
          desc: "Explore history in French, English and Wolof for authentic understanding",
        },
        audio: {
          title: "Living History",
          desc: "Discover the stories and legends that shaped African civilizations",
        },
        online: {
          title: "Global Access",
          desc: "Share the beauty of African heritage with the entire world",
        },
      },
      collection: {
        title: "Featured Collection",
        viewAll: "View Full Gallery",
      },
      about: {
        title: "About the Museum",
        text: "The Museum of Black Civilizations is a major cultural space dedicated to preserving and celebrating African heritage. Our mission is to make this invaluable wealth accessible to everyone through digital technology.",
      },
      discover: {
        title: "Discover African Heritage",
        subtitle: "Explore the treasures of the Museum of Black Civilizations",
        description: "Dive into the millennial history of African civilizations through an exceptional collection of artworks, cultural objects and historical testimonies. Each piece tells a unique story and contributes to the richness of our common heritage.",
        cta: "Explore Gallery",
        features: [
          "Over 18,000 artworks",
          "Multilingual collections",
          "Immersive virtual tours",
          "Global digital access"
        ]
      },
    },
    wo: {
      hero: {
        title: "Gis Patrimoines bu Africa",
        subtitle: "Seet trésors yu Musée des Civilisations Noires",
        cta: "Seet Nataal",
        scanCta: "Scanner benn Liggéey",
        featuresCta: "Gis Fonctionnalités",
      },
      features: {
        title: "Lu Tax Seet Musée yu Civilisations Noires?",
        subtitle: "Gis trésors yu unique bu patrimoine culturel africain",
        qr: {
          title: "Collection Exceptionnelle",
          desc: "18 000 liggéey yu art yu wone richesse yu civilisations africaines",
        },
        multilingual: {
          title: "Patrimoine Multilingue",
          desc: "Seet histoire ci Français, Anglais ak Wolof ngir xam-xam bu dëgg",
        },
        audio: {
          title: "Histoire bu Dëgg",
          desc: "Gis récits ak légendes yu def civilisations africaines",
        },
        online: {
          title: "Am ci Aduna",
          desc: "Partage beauté bu patrimoine africain ak aduna bu leer",
        },
      },
      collection: {
        title: "Collection bu Vedette",
        viewAll: "Gis Nataal bu Leer",
      },
      about: {
        title: "Ci Musée",
        text: "Musée des Civilisations Noires dafa nekk espace culturel bu bari bu jëkk ci préservation ak célébration bu patrimoine africain. Seen mission mooy jagle richesse inestimable yi ci ñépp ci digital.",
      },
      discover: {
        title: "Gis Patrimoines bu Africa",
        subtitle: "Seet trésors yu Musée yu Civilisations Noires",
        description: "Dugg ci histoire bu millénaire yu civilisations africaines ci collection exceptionnelle yu liggéey yu art, objets culturels ak témoignages historiques. Képp pièce dafa wax histoire bu unique ak dafa jagle richesse bu seen patrimoine commun.",
        cta: "Seet Nataal",
        features: [
          "18 000 liggéey yu art",
          "Collections multilingues",
          "Seet virtuelles immersives",
          "Am ci digital mondial"
        ]
      },
    },
  };

  const t = translations[language as keyof typeof translations];

  const features = [
    { icon: Building2, title: t.features.qr.title, desc: t.features.qr.desc, color: "from-amber-500 to-orange-500" },
    { icon: BookOpen, title: t.features.multilingual.title, desc: t.features.multilingual.desc, color: "from-green-500 to-emerald-500" },
    { icon: Heart, title: t.features.audio.title, desc: t.features.audio.desc, color: "from-red-500 to-pink-500" },
    { icon: Globe, title: t.features.online.title, desc: t.features.online.desc, color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-slide-in-up">
            <div className="relative mt-32">
              <h1 className="mb-8 text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-hero animate-slide-up leading-tight text-shadow-lg">
              {t.hero.title}
            </h1>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-[hsl(var(--gold))]/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[hsl(var(--terracotta))]/20 to-[hsl(var(--earth-brown))]/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-slide-up text-shadow" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" size="lg" asChild className="btn-hero shadow-african hover:shadow-golden hover-lift transition-bounce">
                <Link to="/gallery">
                  <Crown className="mr-3 h-6 w-6" />
                  {t.hero.cta}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300 hover-scale hover-glow">
                <Link to="/scan">
                  <QrCode className="mr-3 h-6 w-6" />
                  {t.hero.scanCta}
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-32 h-1 bg-gradient-to-r from-accent to-[hsl(var(--gold))] rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-4 h-4 bg-accent/60 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-6 bg-[hsl(var(--gold))]/60 rounded-full"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '3s' }}>
          <div className="w-3 h-3 bg-[hsl(var(--terracotta))]/60 rounded-full"></div>
        </div>
      </section>


      {/* Featured Collection */}
      <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.collection.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fr' ? 'Découvrez nos œuvres les plus remarquables' : 
               language === 'en' ? 'Discover our most remarkable artworks' : 
               'Gis seen liggéey yu gërëy'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mcnArtworks.slice(0, 3).map((artwork, index) => (
              <div
                key={artwork.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ArtworkCard
                  id={artwork.id}
                  title={artwork.title[language as keyof typeof artwork.title]}
                  period={artwork.period[language as keyof typeof artwork.period]}
                  culture={artwork.culture[language as keyof typeof artwork.culture]}
                  image={artwork.image}
                  hasAudio={artwork.hasAudio}
                />
              </div>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <Button variant="museum" size="lg" asChild className="btn-museum shadow-african hover:shadow-golden">
              <Link to="/gallery">
                <Sparkles className="mr-3 h-6 w-6" />
                {t.collection.viewAll}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-[hsl(var(--earth-brown))] to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-slide-in-up">
            <div className="relative">
              <h2 className="mb-8 text-5xl md:text-6xl font-bold leading-tight text-shadow-lg">{t.about.title}</h2>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-xl leading-relaxed opacity-95 max-w-3xl mx-auto text-shadow">
              {t.about.text}
            </p>
            <div className="mt-12 flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vidéo YouTube */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">
              {language === 'fr' ? 'Découvrez le Musée en Vidéo' : 
               language === 'en' ? 'Discover the Museum in Video' : 
               'Gis Musée bi ci Video'}
            </h2>
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              {language === 'fr' ? 'Une visite immersive du Musée des Civilisations Noires' : 
               language === 'en' ? 'An immersive tour of the Museum of Black Civilizations' : 
               'Seet immersive bu Musée yu Civilisations Noires'}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/KqSqmk6NHT8"
                title={language === 'fr' ? 'Visite du Musée des Civilisations Noires' : 
                       language === 'en' ? 'Tour of the Museum of Black Civilizations' : 
                       'Seet bu Musée yu Civilisations Noires'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Déplacée avant le footer */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">{t.features.title}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group card-enhanced hover:shadow-african transition-all duration-500 hover:scale-105 hover:-translate-y-3 animate-slide-up glass relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                <CardContent className="p-8 text-center relative">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">{feature.desc}</p>
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${feature.color.split('-')[1]}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Badge du musée */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-accent/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-accent">
                      {language === 'fr' ? 'MUSÉE' : language === 'en' ? 'MUSEUM' : 'MUSÉE'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs du Musée des Civilisations Noires - Déplacée avant le footer */}
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">
              {language === 'fr' ? 'Les Valeurs du Musée des Civilisations Noires' : 
               language === 'en' ? 'Values of the Museum of Black Civilizations' : 
               'Valeurs yu Musée yu Civilisations Noires'}
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {language === 'fr' ? 'Un musée qui célèbre la diversité et la richesse des civilisations africaines' : 
               language === 'en' ? 'A museum that celebrates the diversity and richness of African civilizations' : 
               'Musée bu célèbre diversité ak richesse yu civilisations africaines'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent">
                {language === 'fr' ? 'Excellence Culturelle' : 
                 language === 'en' ? 'Cultural Excellence' : 
                 'Excellence Culturelle'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? 'Préservation et mise en valeur du patrimoine culturel africain d\'exception' : 
                 language === 'en' ? 'Preservation and enhancement of exceptional African cultural heritage' : 
                 'Préservation ak mise en valeur bu patrimoine culturel africain bu exception'}
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent">
                {language === 'fr' ? 'Transmission des Savoirs' : 
                 language === 'en' ? 'Knowledge Transmission' : 
                 'Transmission yu Savoirs'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? 'Transmettre l\'histoire et les traditions aux générations futures' : 
                 language === 'en' ? 'Transmit history and traditions to future generations' : 
                 'Transmettre histoire ak traditions ci générations yu kanam'}
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-accent">
                {language === 'fr' ? 'Ouverture au Monde' : 
                 language === 'en' ? 'Openness to the World' : 
                 'Ouverture ci Aduna'}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'fr' ? 'Partager la beauté et la richesse de la culture africaine avec le monde' : 
                 language === 'en' ? 'Share the beauty and richness of African culture with the world' : 
                 'Partage beauté ak richesse bu culture africaine ak aduna'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Heritage Section - Déplacée avant le footer */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image à gauche */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-african">
                  <img
                    src={heroImage}
                    alt={t.discover.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Overlay décoratif */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent to-[hsl(var(--gold))] rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--terracotta))] to-[hsl(var(--earth-brown))] rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Texte à droite */}
            <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
              <div>
                <h2 className="mb-6 text-5xl md:text-6xl font-bold text-gradient leading-tight">
                  {t.discover.title}
                </h2>
                <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
                  {t.discover.subtitle}
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {t.discover.description}
            </p>
          </div>

              {/* Liste des fonctionnalités */}
              <div className="space-y-4">
                {t.discover.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-lg font-medium text-foreground">{feature}</span>
                  </div>
                ))}
          </div>

              {/* Bouton CTA */}
              <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Button variant="hero" size="lg" asChild className="btn-hero shadow-african hover:shadow-golden">
              <Link to="/gallery">
                    <Crown className="mr-3 h-6 w-6" />
                    {t.discover.cta}
              </Link>
            </Button>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Index;

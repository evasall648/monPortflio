import { ArtworkCard } from "@/components/ArtworkCard";
import { mcnArtworks } from "@/data/mcn/artworks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/Footer";

interface GalleryProps {
  language: string;
}

export const Gallery = ({ language }: GalleryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtworks = mcnArtworks.filter((artwork) =>
    artwork.title[language as keyof typeof artwork.title]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const translations = {
    fr: {
      title: "Galerie des Œuvres",
      subtitle: "Découvrez notre collection exceptionnelle",
      search: "Rechercher une œuvre...",
      results: `${filteredArtworks.length} œuvre${filteredArtworks.length > 1 ? "s" : ""} trouvée${filteredArtworks.length > 1 ? "s" : ""}`,
    },
    en: {
      title: "Artwork Gallery",
      subtitle: "Discover our exceptional collection",
      search: "Search for an artwork...",
      results: `${filteredArtworks.length} artwork${filteredArtworks.length > 1 ? "s" : ""} found`,
    },
    wo: {
      title: "Nataal yu Liggéey",
      subtitle: "Gis seen collection exceptionnel",
      search: "Seet benn liggéey...",
      results: `${filteredArtworks.length} liggéey gis`,
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-slide-in-up">
          <div className="relative">
            <h1 className="mb-8 text-6xl md:text-7xl font-bold text-gradient leading-tight text-shadow-lg">
              {t.title}
            </h1>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-[hsl(var(--gold))]/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-[hsl(var(--terracotta))]/20 to-[hsl(var(--earth-brown))]/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-shadow">{t.subtitle}</p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-[hsl(var(--gold))] rounded-full animate-shimmer"></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-16 animate-slide-up">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-accent transition-colors duration-300" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-8 text-xl border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 transition-all duration-300 hover:shadow-lg rounded-2xl bg-card/50 backdrop-blur-sm"
            />
          </div>
          <p className="text-lg text-muted-foreground mt-4 text-center animate-fade-in">
            {t.results}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="animate-scale-in hover-lift"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ArtworkCard
                id={artwork.id}
                title={artwork.title[language as keyof typeof artwork.title]}
                period={artwork.period[language as keyof typeof artwork.period]}
                culture={artwork.culture[language as keyof typeof artwork.culture]}
                image={artwork.image}
                hasAudio={false}
              />
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">
              {language === "fr" && "Aucune œuvre trouvée"}
              {language === "en" && "No artwork found"}
              {language === "wo" && "Liggéey bu gis"}
            </h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {language === "fr" && "Essayez avec d'autres mots-clés"}
              {language === "en" && "Try with other keywords"}
              {language === "wo" && "Jëkk ak kàddu yu wene"}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

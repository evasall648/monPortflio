import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mcnArtworks } from "@/data/mcn/artworks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Volume2, QrCode, Clock, Globe2 } from "lucide-react";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Footer } from "@/components/Footer";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";

interface ArtworkDetailProps {
  language: string;
}

export const ArtworkDetail = ({ language }: ArtworkDetailProps) => {
  const { id } = useParams();
  const [showQR, setShowQR] = useState(false);

  const artwork = mcnArtworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">
            {language === "fr" && "Œuvre non trouvée"}
            {language === "en" && "Artwork not found"}
            {language === "wo" && "Liggéey gis-gis"}
          </h1>
          <Button variant="outline" asChild>
            <Link to="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "fr" && "Retour à la galerie"}
              {language === "en" && "Back to gallery"}
              {language === "wo" && "Dellu ci nataal"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const translations = {
    fr: {
      back: "Retour à la galerie",
      description: "Description",
      historical: "Contexte Historique",
      period: "Période",
      culture: "Culture",
      listen: "Écouter la description",
      playing: "En lecture...",
    },
    en: {
      back: "Back to gallery",
      description: "Description",
      historical: "Historical Context",
      period: "Period",
      culture: "Culture",
      listen: "Listen to description",
      playing: "Playing...",
    },
    wo: {
      back: "Dellu ci nataal",
      description: "Description",
      historical: "Contexte Historique",
      period: "Waxtu",
      culture: "Culture",
      listen: "Dégg description",
      playing: "Dafa dégg...",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8 hover:bg-accent/10 transition-colors duration-300">
          <Link to="/gallery" className="flex items-center gap-2 text-lg">
            <ArrowLeft className="h-5 w-5" />
            {t.back}
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-african aspect-[3/4] bg-muted group">
              <img
                src={artwork.image}
                alt={artwork.title[language as keyof typeof artwork.title]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-6 right-6 flex gap-2">
                <Badge className="bg-accent/90 backdrop-blur-sm text-accent-foreground shadow-lg">
                  {artwork.id}
                </Badge>
                <Button
                  onClick={() => setShowQR(true)}
                  size="sm"
                  className="bg-accent/90 backdrop-blur-sm text-accent-foreground shadow-lg hover:bg-accent"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div>
              <h1 className="mb-6 text-4xl md:text-5xl font-bold text-gradient leading-tight">
                {artwork.title[language as keyof typeof artwork.title]}
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge variant="secondary" className="text-lg py-3 px-6 bg-accent/10 border-accent/20">
                  <Clock className="h-5 w-5 mr-2" />
                  {artwork.period[language as keyof typeof artwork.period]}
                </Badge>
                <Badge variant="secondary" className="text-lg py-3 px-6 bg-[hsl(var(--gold))]/10 border-[hsl(var(--gold))]/20">
                  <Globe2 className="h-5 w-5 mr-2" />
                  {artwork.culture[language as keyof typeof artwork.culture]}
                </Badge>
              </div>
            </div>

            {artwork.hasAudio && (
              <div className="card-enhanced p-6">
                <AudioPlayer
                  text={`${artwork.title[language as keyof typeof artwork.title]}. ${artwork.description[language as keyof typeof artwork.description]}. ${artwork.historicalContext[language as keyof typeof artwork.historicalContext]}`}
                  language={language}
                  className="w-full"
                />
              </div>
            )}

            <Card className="card-enhanced shadow-african">
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-accent flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  {t.description}
                </h3>
                <p className="text-foreground leading-relaxed text-lg">
                  {artwork.description[language as keyof typeof artwork.description]}
                </p>
              </CardContent>
            </Card>

            <Card className="card-enhanced shadow-african">
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-accent flex items-center gap-3">
                  <div className="w-2 h-2 bg-[hsl(var(--gold))] rounded-full"></div>
                  {t.historical}
                </h3>
                <p className="text-foreground leading-relaxed text-lg">
                  {artwork.historicalContext[language as keyof typeof artwork.historicalContext]}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">QR Code de l'œuvre</h3>
                  <button
                    onClick={() => setShowQR(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <QRCodeDisplay 
                  artworkId={artwork.id}
                  artworkTitle={artwork.title[language as keyof typeof artwork.title]}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer language={language} />
      </div>
    </div>
  );
};

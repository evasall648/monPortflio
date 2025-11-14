import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Search, Camera, Volume2, Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mcnArtworks } from "@/data/mcn/artworks";
import { toast } from "sonner";
import { QRScanner } from "@/components/scanner/QRScanner";
import { AdvancedAudioPlayer } from "@/components/audio/AdvancedAudioPlayer";
import { Footer } from "@/components/Footer";

interface ScanQRProps {
  language: string;
}

export const ScanQR = ({ language }: ScanQRProps) => {
  const [qrCode, setQrCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [scannedArtwork, setScannedArtwork] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Gérer le paramètre d'œuvre spécifique depuis la galerie
  useEffect(() => {
    const artworkId = searchParams.get('artwork');
    if (artworkId) {
      const artwork = mcnArtworks.find(a => a.id === artworkId);
      if (artwork) {
        setScannedArtwork(artwork);
        setQrCode(artworkId);
        toast.success(`Scan QR pour ${artwork.title[language as keyof typeof artwork.title]}`);
      }
    }
  }, [searchParams, language]);

  const translations = {
    fr: {
      title: "Scanner un QR Code",
      subtitle: "Entrez le code de l'œuvre ou scannez son QR code",
      placeholder: "Ex: mask-001, bronze-001...",
      scan: "Scanner",
      scanCamera: "Scanner avec Caméra",
      manual: "Saisie Manuelle",
      input: "Code de l'œuvre",
      search: "Rechercher",
      notFound: "Code non trouvé",
      found: "Œuvre trouvée !",
    },
    en: {
      title: "Scan QR Code",
      subtitle: "Enter the artwork code or scan its QR code",
      placeholder: "Ex: mask-001, bronze-001...",
      scan: "Scan",
      scanCamera: "Scan with Camera",
      manual: "Manual Entry",
      input: "Artwork code",
      search: "Search",
      notFound: "Code not found",
      found: "Artwork found!",
    },
    wo: {
      title: "Scanner QR Code",
      subtitle: "Dugal code bi liggéey walla scanner sa QR code",
      placeholder: "Misaal: mask-001, bronze-001...",
      scan: "Scanner",
      scanCamera: "Scanner ak Caméra",
      manual: "Dugal Manual",
      input: "Code bi liggéey",
      search: "Seet",
      notFound: "Code gis-gis",
      found: "Liggéey gis!",
    },
  };

  const t = translations[language as keyof typeof translations];

  const handleSearch = () => {
    const artwork = mcnArtworks.find((a) => a.id === qrCode.toLowerCase().trim());
    
    if (artwork) {
      setScannedArtwork(artwork);
      toast.success(t.found);
      // navigate(`/artwork/${artwork.id}`);
    } else {
      toast.error(t.notFound);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleQRScan = (result: string) => {
    console.log('QR Code scanné:', result);
    setQrCode(result);
    
    // Chercher l'œuvre par ID exact ou par code QR
    const artwork = mcnArtworks.find((a) => {
      const cleanResult = result.toLowerCase().trim();
      const cleanId = a.id.toLowerCase();
      
      return (
        cleanId === cleanResult || 
        cleanResult.includes(cleanId) ||
        cleanId.includes(cleanResult) ||
        a.qrCode === result
      );
    });
    
    if (artwork) {
      setScannedArtwork(artwork);
      toast.success(`${t.found} : ${artwork.title[language as keyof typeof artwork.title]}`);
      console.log('Œuvre trouvée:', artwork.title[language as keyof typeof artwork.title]);
    } else {
      toast.error(`${t.notFound} : ${result}`);
      console.log('Codes disponibles:', mcnArtworks.map(a => a.id));
      console.log('Résultat scanné:', result);
    }
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center shadow-strong animate-glow">
                <QrCode className="h-16 w-16 text-accent-foreground" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/20 to-[hsl(var(--gold))]/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--terracotta))]/20 to-[hsl(var(--earth-brown))]/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <h1 className="mb-8 text-5xl md:text-6xl font-bold text-gradient leading-tight text-shadow-lg">{t.title}</h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-shadow">{t.subtitle}</p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-[hsl(var(--gold))] rounded-full animate-shimmer"></div>
            </div>
          </div>

          {/* Œuvre scannée ou sélectionnée */}
          {scannedArtwork && (
            <div className="mb-12 animate-fade-in">
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted shadow-md">
                      <img
                        src={scannedArtwork.image}
                        alt={scannedArtwork.title[language as keyof typeof scannedArtwork.title]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-green-600">
                          {language === 'fr' ? '✅ Œuvre scannée avec succès' : 
                           language === 'en' ? '✅ Artwork scanned successfully' : 
                           '✅ Liggéey scanner ak succès'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {scannedArtwork.title[language as keyof typeof scannedArtwork.title]}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-lg text-muted-foreground">
                          <span className="font-semibold text-accent">
                            {language === 'fr' ? 'Période :' : 
                             language === 'en' ? 'Period:' : 
                             'Jëmm:'}
                          </span> {scannedArtwork.period[language as keyof typeof scannedArtwork.period]}
                        </p>
                        <p className="text-lg text-muted-foreground">
                          <span className="font-semibold text-[hsl(var(--gold))]">
                            {language === 'fr' ? 'Culture :' : 
                             language === 'en' ? 'Culture:' : 
                             'Kulture:'}
                          </span> {scannedArtwork.culture[language as keyof typeof scannedArtwork.culture]}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="hero"
                          onClick={() => navigate(`/artwork/${scannedArtwork.id}`)}
                          className="px-6 py-3"
                        >
                          {language === 'fr' ? 'Voir les détails' : 
                           language === 'en' ? 'View Details' : 
                           'Gis Détails'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setScannedArtwork(null)}
                          className="px-6 py-3"
                        >
                          {language === 'fr' ? 'Scanner une autre' : 
                           language === 'en' ? 'Scan Another' : 
                           'Scanner Wees'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.input}
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder={t.placeholder}
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-lg py-6"
                    />
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleSearch}
                      className="px-8"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      {t.search}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">ou</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-8 text-center border-2 border-dashed border-border">
                  <Camera className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'fr' ? 'Scanner avec Caméra' : 
                     language === 'en' ? 'Scan with Camera' : 
                     'Scanner ak Caméra'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'fr' ? 'Pointez votre caméra vers un code QR d\'œuvre' : 
                     language === 'en' ? 'Point your camera at an artwork QR code' : 
                     'Pointez seen caméra ci code QR bu liggéey'}
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => setShowScanner(true)}
                    className="px-8 py-4 text-lg"
                  >
                    <Camera className="h-6 w-6 mr-3" />
                    {t.scanCamera}
                  </Button>
                </div>

                <div className="bg-accent/10 rounded-lg p-6">
                  <h3 className="font-semibold mb-2 text-accent">
                    {language === 'fr' ? 'Comment utiliser le scanner :' : 
                     language === 'en' ? 'How to use the scanner:' : 
                     'Ni nga jëf ak scanner:'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'fr' ? 'Utilisez votre caméra pour scanner les codes QR des œuvres du musée' : 
                     language === 'en' ? 'Use your camera to scan QR codes from museum artworks' : 
                     'Jëf ak seen caméra ngir scanner codes QR yu liggéey yu musée'}
                  </p>
                  
                  {/* Instructions pour utiliser le scanner */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {language === 'fr' ? '📱 Instructions d\'utilisation :' : 
                       language === 'en' ? '📱 Usage instructions:' : 
                       '📱 Nataal bu jëf:'}
                    </h4>
                    <ol className="text-sm text-blue-700 space-y-1">
                      <li>1. {language === 'fr' ? 'Cliquez sur "Scanner avec Caméra"' : 
                           language === 'en' ? 'Click on "Scan with Camera"' : 
                           'Tànn "Scanner ak Caméra"'}</li>
                      <li>2. {language === 'fr' ? 'Autorisez l\'accès à votre caméra' : 
                           language === 'en' ? 'Allow camera access' : 
                           'Jagle am ci seen caméra'}</li>
                      <li>3. {language === 'fr' ? 'Pointez vers un code QR d\'œuvre' : 
                           language === 'en' ? 'Point at an artwork QR code' : 
                           'Pointez ci QR code bu liggéey'}</li>
                      <li>4. {language === 'fr' ? 'L\'œuvre sera automatiquement détectée' : 
                           language === 'en' ? 'The artwork will be automatically detected' : 
                           'Liggéey bi dina gis-gis automatic'}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nouvelles fonctionnalités après scan */}
        {scannedArtwork && (
          <div className="mt-8 space-y-6">

            {/* Audio Player pour l'œuvre scannée */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {language === 'fr' ? 'Description Audio' : 
                       language === 'en' ? 'Audio Description' : 
                       'Description Audio'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'fr' ? 'Écoutez l\'histoire de cette œuvre' : 
                       language === 'en' ? 'Listen to this artwork\'s story' : 
                       'Dégg histoire bu liggéey bi'}
                    </p>
                  </div>
                </div>
                <AdvancedAudioPlayer
                  text={scannedArtwork.description[language as keyof typeof scannedArtwork.description]}
                  language={language}
                  artworkTitle={scannedArtwork.title[language as keyof typeof scannedArtwork.title]}
                  onLanguageChange={(lang) => console.log('Language changed:', lang)}
                />
              </CardContent>
            </Card>

            {/* Informations de l'œuvre scannée */}
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {language === 'fr' ? 'Œuvre Découverte' : 
                       language === 'en' ? 'Discovered Artwork' : 
                       'Liggéey Gis'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'fr' ? 'Félicitations ! Vous avez découvert une nouvelle œuvre' : 
                       language === 'en' ? 'Congratulations! You discovered a new artwork' : 
                       'Félicitations ! Yow gis benn liggéey bu bees'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img 
                      src={scannedArtwork.image} 
                      alt={scannedArtwork.title[language as keyof typeof scannedArtwork.title]}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">
                      {scannedArtwork.title[language as keyof typeof scannedArtwork.title]}
                    </h4>
                    <p className="text-muted-foreground">
                      {scannedArtwork.description[language as keyof typeof scannedArtwork.description]}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {scannedArtwork.period[language as keyof typeof scannedArtwork.period]}
                      </Badge>
                      <Badge variant="outline">
                        {scannedArtwork.culture[language as keyof typeof scannedArtwork.culture]}
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => navigate(`/artwork/${scannedArtwork.id}`)}
                      className="w-full"
                    >
                      {language === 'fr' ? 'Voir les Détails' : 
                       language === 'en' ? 'View Details' : 
                       'Seet Details'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <Footer language={language} />
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={handleCloseScanner}
          language={language}
        />
      )}
    </div>
  );
};

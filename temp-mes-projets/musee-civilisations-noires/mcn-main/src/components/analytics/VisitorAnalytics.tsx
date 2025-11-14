import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  Users,
  MapPin,
  Calendar,
  Star,
  Target,
  Zap,
  Award
} from "lucide-react";

interface AnalyticsProps {
  language: string;
}

interface VisitData {
  id: string;
  artworkId: string;
  artworkTitle: string;
  timestamp: Date;
  duration: number;
  interactions: number;
  language: string;
  device: string;
  location?: string;
}

interface AnalyticsData {
  totalVisits: number;
  totalTime: number;
  favoriteArtworks: string[];
  mostVisitedSections: string[];
  averageVisitDuration: number;
  languagePreference: string;
  deviceType: string;
  visitHistory: VisitData[];
  achievements: string[];
  socialShares: number;
  audioPlays: number;
  qrScans: number;
}

export const VisitorAnalytics = ({ language }: AnalyticsProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    totalTime: 0,
    favoriteArtworks: [],
    mostVisitedSections: [],
    averageVisitDuration: 0,
    languagePreference: language,
    deviceType: 'desktop',
    visitHistory: [],
    achievements: [],
    socialShares: 0,
    audioPlays: 0,
    qrScans: 0
  });

  const [showDetails, setShowDetails] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'all'>('all');

  useEffect(() => {
    // Charger les données analytics
    loadAnalyticsData();
    
    // Simuler la collecte de données en temps réel
    const interval = setInterval(() => {
      updateAnalytics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadAnalyticsData = () => {
    const savedData = localStorage.getItem('mcn-analytics');
    if (savedData) {
      setAnalytics(JSON.parse(savedData));
    }
  };

  const updateAnalytics = () => {
    // Simuler des mises à jour de données
    setAnalytics(prev => ({
      ...prev,
      totalVisits: prev.totalVisits + Math.floor(Math.random() * 3),
      totalTime: prev.totalTime + Math.floor(Math.random() * 60),
      audioPlays: prev.audioPlays + Math.floor(Math.random() * 2),
      qrScans: prev.qrScans + Math.floor(Math.random() * 2)
    }));
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return '📱';
      case 'tablet': return '📱';
      case 'desktop': return '💻';
      default: return '💻';
    }
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'fr': return '🇫🇷';
      case 'en': return '🇬🇧';
      case 'wo': return '🇸🇳';
      default: return '🌍';
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getEngagementLevel = () => {
    const totalInteractions = analytics.audioPlays + analytics.qrScans + analytics.socialShares;
    if (totalInteractions > 50) return { level: 'Expert', color: 'text-green-500', icon: '🏆' };
    if (totalInteractions > 20) return { level: 'Avancé', color: 'text-blue-500', icon: '⭐' };
    if (totalInteractions > 10) return { level: 'Intermédiaire', color: 'text-yellow-500', icon: '🎯' };
    return { level: 'Débutant', color: 'text-gray-500', icon: '🌱' };
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mcn-analytics.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const engagement = getEngagementLevel();

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-accent" />
            {language === 'fr' ? 'Analytics Visiteur' : language === 'en' ? 'Visitor Analytics' : 'Analytics Visiteur'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Vos statistiques de visite personnalisées' : 
             language === 'en' ? 'Your personalized visit statistics' : 
             'Seen statistiques bu seet personnalisées'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Masquer' : 'Détails'}
          </Button>
          <Button
            variant="outline"
            onClick={exportData}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">{analytics.totalVisits}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'fr' ? 'Visites' : language === 'en' ? 'Visits' : 'Seet'}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">
              {formatDuration(analytics.totalTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'fr' ? 'Temps total' : language === 'en' ? 'Total time' : 'Waxtu total'}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">{analytics.audioPlays}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'fr' ? 'Audio écoutés' : language === 'en' ? 'Audio played' : 'Audio déglu'}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">{analytics.qrScans}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'fr' ? 'QR scannés' : language === 'en' ? 'QR scanned' : 'QR scanned'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Niveau d'engagement */}
      <Card className="bg-gradient-to-r from-accent/10 to-yellow-500/10 border-2 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{engagement.icon}</div>
              <div>
                <h3 className="text-xl font-bold">
                  {language === 'fr' ? 'Niveau d\'Engagement' : language === 'en' ? 'Engagement Level' : 'Niveau d\'Engagement'}
                </h3>
                <p className={`text-lg font-semibold ${engagement.color}`}>
                  {engagement.level}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">
                {analytics.audioPlays + analytics.qrScans + analytics.socialShares}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Interactions' : language === 'en' ? 'Interactions' : 'Interactions'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Préférences utilisateur */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              {language === 'fr' ? 'Préférences' : language === 'en' ? 'Preferences' : 'Préférences'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === 'fr' ? 'Langue préférée' : language === 'en' ? 'Preferred language' : 'Langue préférée'}
                </span>
                <Badge variant="outline">
                  {getLanguageFlag(analytics.languagePreference)} {analytics.languagePreference.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === 'fr' ? 'Appareil' : language === 'en' ? 'Device' : 'Appareil'}
                </span>
                <Badge variant="outline">
                  {getDeviceIcon(analytics.deviceType)} {analytics.deviceType}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === 'fr' ? 'Durée moyenne' : language === 'en' ? 'Average duration' : 'Durée moyenne'}
                </span>
                <Badge variant="outline">
                  {formatDuration(analytics.averageVisitDuration)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              {language === 'fr' ? 'Activité' : language === 'en' ? 'Activity' : 'Activité'}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {language === 'fr' ? 'Audio' : language === 'en' ? 'Audio' : 'Audio'}
                  </span>
                  <span>{analytics.audioPlays}</span>
                </div>
                <Progress value={(analytics.audioPlays / 100) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {language === 'fr' ? 'QR Scans' : language === 'en' ? 'QR Scans' : 'QR Scans'}
                  </span>
                  <span>{analytics.qrScans}</span>
                </div>
                <Progress value={(analytics.qrScans / 50) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {language === 'fr' ? 'Partages' : language === 'en' ? 'Shares' : 'Partages'}
                  </span>
                  <span>{analytics.socialShares}</span>
                </div>
                <Progress value={(analytics.socialShares / 20) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détails avancés */}
      {showDetails && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              {language === 'fr' ? 'Détails Avancés' : language === 'en' ? 'Advanced Details' : 'Détails Avancés'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">
                  {language === 'fr' ? 'Œuvres Favorites' : language === 'en' ? 'Favorite Artworks' : 'Liggéey yu Bari'}
                </h4>
                <div className="space-y-2">
                  {analytics.favoriteArtworks.slice(0, 5).map((artwork, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{artwork}</span>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">
                  {language === 'fr' ? 'Sections Visitées' : language === 'en' ? 'Visited Sections' : 'Sections yu Seet'}
                </h4>
                <div className="space-y-2">
                  {analytics.mostVisitedSections.slice(0, 5).map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{section}</span>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

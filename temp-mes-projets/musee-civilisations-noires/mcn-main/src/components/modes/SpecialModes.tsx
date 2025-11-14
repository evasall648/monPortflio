import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Search, 
  Camera, 
  MapPin, 
  BookOpen, 
  Heart, 
  Star,
  Zap,
  Crown,
  Target,
  Eye,
  Brain,
  Compass,
  Sparkles,
  Shield,
  Sword,
  Trophy,
  Key,
  Lock,
  Unlock
} from "lucide-react";

interface SpecialModesProps {
  language: string;
  onModeChange: (mode: string) => void;
}

interface Mode {
  id: string;
  name: {
    fr: string;
    en: string;
    wo: string;
  };
  description: {
    fr: string;
    en: string;
    wo: string;
  };
  icon: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  duration: number;
  rewards: string[];
  requirements: string[];
  unlocked: boolean;
}

export const SpecialModes = ({ language, onModeChange }: SpecialModesProps) => {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);

  const modes: Mode[] = [
    {
      id: 'time-travel',
      name: {
        fr: 'Voyage dans le Temps',
        en: 'Time Travel',
        wo: 'Voyage ci Waxtu'
      },
      description: {
        fr: 'Explorez l\'évolution des œuvres à travers les siècles',
        en: 'Explore the evolution of artworks through the centuries',
        wo: 'Seet évolution bu liggéey ci biir siècles'
      },
      icon: '⏰',
      color: 'text-blue-500',
      difficulty: 'medium',
      duration: 15,
      rewards: ['Badge Historien', 'Points x2', 'Déblocage secret'],
      requirements: ['Niveau 3', '5 œuvres découvertes'],
      unlocked: true
    },
    {
      id: 'detective',
      name: {
        fr: 'Mode Détective',
        en: 'Detective Mode',
        wo: 'Mode Détective'
      },
      description: {
        fr: 'Résolvez des mystères et découvrez des secrets cachés',
        en: 'Solve mysteries and discover hidden secrets',
        wo: 'Yor mysteries ak gis secrets yu nëbb'
      },
      icon: '🔍',
      color: 'text-purple-500',
      difficulty: 'hard',
      duration: 20,
      rewards: ['Badge Détective', 'Œuvre exclusive', 'Accès VIP'],
      requirements: ['Niveau 5', 'Mode Voyage débloqué'],
      unlocked: false
    },
    {
      id: 'artist',
      name: {
        fr: 'Mode Artiste',
        en: 'Artist Mode',
        wo: 'Mode Artist'
      },
      description: {
        fr: 'Créez vos propres œuvres et collections',
        en: 'Create your own artworks and collections',
        wo: 'Def seen liggéey ak collections'
      },
      icon: '🎨',
      color: 'text-pink-500',
      difficulty: 'easy',
      duration: 10,
      rewards: ['Galerie personnelle', 'Partage social', 'Exposition virtuelle'],
      requirements: ['Niveau 2'],
      unlocked: true
    },
    {
      id: 'explorer',
      name: {
        fr: 'Mode Explorateur',
        en: 'Explorer Mode',
        wo: 'Mode Seetkat'
      },
      description: {
        fr: 'Découvrez des œuvres cachées et des trésors',
        en: 'Discover hidden artworks and treasures',
        wo: 'Gis liggéey yu nëbb ak trésors'
      },
      icon: '🗺️',
      color: 'text-green-500',
      difficulty: 'medium',
      duration: 25,
      rewards: ['Carte du trésor', 'Badge Explorateur', 'Bonus découverte'],
      requirements: ['Niveau 4', '3 modes débloqués'],
      unlocked: false
    },
    {
      id: 'master',
      name: {
        fr: 'Mode Maître',
        en: 'Master Mode',
        wo: 'Mode Boroom'
      },
      description: {
        fr: 'Défi ultime pour les experts du musée',
        en: 'Ultimate challenge for museum experts',
        wo: 'Défi ultime ngir experts yu musée'
      },
      icon: '👑',
      color: 'text-yellow-500',
      difficulty: 'expert',
      duration: 30,
      rewards: ['Titre Maître', 'Accès exclusif', 'Reconnaissance spéciale'],
      requirements: ['Niveau 10', 'Tous les modes débloqués'],
      unlocked: false
    }
  ];

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setProgress((30 - timeLeft) / 30 * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setActiveMode(null);
      // Récompenses
      setScore(score + 100);
      setAchievements(prev => [...prev, 'Mode terminé']);
    }
  }, [isPlaying, timeLeft]);

  const startMode = (modeId: string) => {
    const mode = modes.find(m => m.id === modeId);
    if (!mode || !mode.unlocked) return;

    setActiveMode(modeId);
    setTimeLeft(mode.duration * 60); // Convertir en secondes
    setIsPlaying(true);
    setProgress(0);
    onModeChange(modeId);
  };

  const stopMode = () => {
    setIsPlaying(false);
    setActiveMode(null);
    setTimeLeft(0);
    setProgress(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-orange-500';
      case 'expert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Shield className="h-4 w-4" />;
      case 'medium': return <Target className="h-4 w-4" />;
      case 'hard': return <Sword className="h-4 w-4" />;
      case 'expert': return <Crown className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
          {language === 'fr' ? 'Modes Spéciaux' : language === 'en' ? 'Special Modes' : 'Modes Spéciaux'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'fr' ? 'Découvrez des expériences uniques et des défis passionnants' : 
           language === 'en' ? 'Discover unique experiences and exciting challenges' : 
           'Gis expériences yu unique ak défis yu bari'}
        </p>
      </div>

      {/* Mode actif */}
      {activeMode && (
        <Card className="bg-gradient-to-r from-accent/10 to-yellow-500/10 border-2 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {modes.find(m => m.id === activeMode)?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {modes.find(m => m.id === activeMode)?.name[language as keyof typeof modes[0]['name']]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fr' ? 'Mode actif' : language === 'en' ? 'Active mode' : 'Mode actif'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={stopMode}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Arrêter
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Temps restant' : language === 'en' ? 'Time left' : 'Waxtu bu nëkk'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{score}</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Score' : language === 'en' ? 'Score' : 'Score'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'fr' ? 'Progression' : language === 'en' ? 'Progress' : 'Progression'}
                </div>
              </div>
            </div>

            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>
      )}

      {/* Liste des modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <Card
            key={mode.id}
            className={`group hover:shadow-lg transition-all duration-300 ${
              mode.unlocked 
                ? 'hover:scale-105' 
                : 'opacity-50 cursor-not-allowed'
            } ${activeMode === mode.id ? 'ring-2 ring-accent' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{mode.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {mode.name[language as keyof typeof mode.name]}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(mode.difficulty)}
                      >
                        {getDifficultyIcon(mode.difficulty)}
                        {mode.difficulty}
                      </Badge>
                      <Badge variant="secondary">
                        {mode.duration}min
                      </Badge>
                    </div>
                  </div>
                </div>
                {mode.unlocked ? (
                  <Unlock className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {mode.description[language as keyof typeof mode.description]}
              </p>

              {/* Récompenses */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" />
                  {language === 'fr' ? 'Récompenses' : language === 'en' ? 'Rewards' : 'Récompenses'}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {mode.rewards.map((reward, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Prérequis */}
              {!mode.unlocked && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Key className="h-4 w-4 text-orange-500" />
                    {language === 'fr' ? 'Prérequis' : language === 'en' ? 'Requirements' : 'Prérequis'}
                  </h4>
                  <div className="space-y-1">
                    {mode.requirements.map((req, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => startMode(mode.id)}
                  disabled={!mode.unlocked || isPlaying}
                  className="flex-1"
                  variant={activeMode === mode.id ? "default" : "outline"}
                >
                  {activeMode === mode.id ? (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'En cours...' : language === 'en' ? 'In progress...' : 'Ci biir...'}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Commencer' : language === 'en' ? 'Start' : 'Jëkk'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistiques globales */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-accent" />
            {language === 'fr' ? 'Statistiques' : language === 'en' ? 'Statistics' : 'Statistiques'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {modes.filter(m => m.unlocked).length}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Modes débloqués' : language === 'en' ? 'Unlocked modes' : 'Modes débloqués'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{score}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Score total' : language === 'en' ? 'Total score' : 'Score total'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {achievements.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Succès' : language === 'en' ? 'Achievements' : 'Succès'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {modes.filter(m => m.difficulty === 'expert').length}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Défis experts' : language === 'en' ? 'Expert challenges' : 'Défis experts'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

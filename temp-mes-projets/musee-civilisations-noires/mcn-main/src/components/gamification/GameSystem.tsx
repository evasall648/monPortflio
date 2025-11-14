import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  Zap, 
  Crown, 
  Medal, 
  Flame,
  BookOpen,
  Camera,
  Search,
  Heart
} from "lucide-react";

interface GameSystemProps {
  language: string;
  onScoreUpdate: (score: number) => void;
}

interface Achievement {
  id: string;
  title: {
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
  points: number;
  unlocked: boolean;
  category: 'discovery' | 'learning' | 'social' | 'exploration';
}

interface Badge {
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
  unlocked: boolean;
}

export const GameSystem = ({ language, onScoreUpdate }: GameSystemProps) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  const achievementsData: Achievement[] = [
    {
      id: 'first-visit',
      title: {
        fr: 'Premier Pas',
        en: 'First Steps',
        wo: 'Jëkk Jëkk'
      },
      description: {
        fr: 'Première visite du musée',
        en: 'First museum visit',
        wo: 'Jëkk seet ci musée'
      },
      icon: '👣',
      points: 50,
      unlocked: false,
      category: 'discovery'
    },
    {
      id: 'art-lover',
      title: {
        fr: 'Amateur d\'Art',
        en: 'Art Lover',
        wo: 'Bari Art'
      },
      description: {
        fr: 'Découvrir 10 œuvres',
        en: 'Discover 10 artworks',
        wo: 'Gis 10 liggéey'
      },
      icon: '🎨',
      points: 100,
      unlocked: false,
      category: 'discovery'
    },
    {
      id: 'historian',
      title: {
        fr: 'Historien',
        en: 'Historian',
        wo: 'Historien'
      },
      description: {
        fr: 'Lire toutes les descriptions',
        en: 'Read all descriptions',
        wo: 'Jàngal ñépp descriptions'
      },
      icon: '📚',
      points: 200,
      unlocked: false,
      category: 'learning'
    },
    {
      id: 'explorer',
      title: {
        fr: 'Explorateur',
        en: 'Explorer',
        wo: 'Seetkat'
      },
      description: {
        fr: 'Compléter la visite virtuelle',
        en: 'Complete virtual tour',
        wo: 'Jëkk seet virtuel'
      },
      icon: '🗺️',
      points: 150,
      unlocked: false,
      category: 'exploration'
    },
    {
      id: 'social-butterfly',
      title: {
        fr: 'Papillon Social',
        en: 'Social Butterfly',
        wo: 'Papillon Social'
      },
      description: {
        fr: 'Partager 5 œuvres',
        en: 'Share 5 artworks',
        wo: 'Partager 5 liggéey'
      },
      icon: '🦋',
      points: 75,
      unlocked: false,
      category: 'social'
    }
  ];

  const badgesData: Badge[] = [
    {
      id: 'bronze-collector',
      name: {
        fr: 'Collectionneur Bronze',
        en: 'Bronze Collector',
        wo: 'Collectionneur Bronze'
      },
      description: {
        fr: 'Collection de niveau bronze',
        en: 'Bronze level collection',
        wo: 'Collection niveau bronze'
      },
      icon: '🥉',
      color: '#CD7F32',
      unlocked: false
    },
    {
      id: 'silver-explorer',
      name: {
        fr: 'Explorateur Argent',
        en: 'Silver Explorer',
        wo: 'Seetkat Argent'
      },
      description: {
        fr: 'Exploration de niveau argent',
        en: 'Silver level exploration',
        wo: 'Seet niveau argent'
      },
      icon: '🥈',
      color: '#C0C0C0',
      unlocked: false
    },
    {
      id: 'gold-master',
      name: {
        fr: 'Maître Or',
        en: 'Gold Master',
        wo: 'Boroom Or'
      },
      description: {
        fr: 'Maîtrise de niveau or',
        en: 'Gold level mastery',
        wo: 'Maîtrise niveau or'
      },
      icon: '🥇',
      color: '#FFD700',
      unlocked: false
    }
  ];

  useEffect(() => {
    // Charger les données sauvegardées
    const savedScore = localStorage.getItem('mcn-score');
    const savedLevel = localStorage.getItem('mcn-level');
    const savedExp = localStorage.getItem('mcn-experience');
    const savedStreak = localStorage.getItem('mcn-streak');
    const savedAchievements = localStorage.getItem('mcn-achievements');
    const savedBadges = localStorage.getItem('mcn-badges');

    if (savedScore) setScore(parseInt(savedScore));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedExp) setExperience(parseInt(savedExp));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    // Sauvegarder les données
    localStorage.setItem('mcn-score', score.toString());
    localStorage.setItem('mcn-level', level.toString());
    localStorage.setItem('mcn-experience', experience.toString());
    localStorage.setItem('mcn-streak', streak.toString());
    localStorage.setItem('mcn-achievements', JSON.stringify(achievements));
    localStorage.setItem('mcn-badges', JSON.stringify(badges));
    
    onScoreUpdate(score);
  }, [score, level, experience, streak, achievements, badges, onScoreUpdate]);

  const addScore = (points: number, reason: string) => {
    const newScore = score + points;
    const newExp = experience + points;
    const newLevel = Math.floor(newExp / 100) + 1;
    
    setScore(newScore);
    setExperience(newExp);
    setLevel(newLevel);
    setStreak(streak + 1);

    // Vérifier les achievements
    checkAchievements();
    checkBadges();
  };

  const checkAchievements = () => {
    achievementsData.forEach(achievement => {
      if (!achievement.unlocked) {
        let shouldUnlock = false;
        
        switch (achievement.id) {
          case 'first-visit':
            shouldUnlock = score >= 50;
            break;
          case 'art-lover':
            shouldUnlock = score >= 200;
            break;
          case 'historian':
            shouldUnlock = score >= 500;
            break;
          case 'explorer':
            shouldUnlock = score >= 300;
            break;
          case 'social-butterfly':
            shouldUnlock = score >= 150;
            break;
        }

        if (shouldUnlock) {
          setAchievements(prev => [...prev, { ...achievement, unlocked: true }]);
          setShowAchievement(achievement);
          setTimeout(() => setShowAchievement(null), 3000);
        }
      }
    });
  };

  const checkBadges = () => {
    badgesData.forEach(badge => {
      if (!badge.unlocked) {
        let shouldUnlock = false;
        
        switch (badge.id) {
          case 'bronze-collector':
            shouldUnlock = level >= 3;
            break;
          case 'silver-explorer':
            shouldUnlock = level >= 5;
            break;
          case 'gold-master':
            shouldUnlock = level >= 10;
            break;
        }

        if (shouldUnlock) {
          setBadges(prev => [...prev, { ...badge, unlocked: true }]);
        }
      }
    });
  };

  const getLevelProgress = () => {
    const currentLevelExp = (level - 1) * 100;
    const nextLevelExp = level * 100;
    const progress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return Math.min(progress, 100);
  };

  const getStreakIcon = () => {
    if (streak >= 7) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (streak >= 3) return <Flame className="h-5 w-5 text-orange-500" />;
    return <Zap className="h-5 w-5 text-blue-500" />;
  };

  const getLevelIcon = () => {
    if (level >= 10) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (level >= 5) return <Trophy className="h-6 w-6 text-orange-500" />;
    return <Star className="h-6 w-6 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Score et Level */}
      <Card className="bg-gradient-to-r from-accent/10 to-yellow-500/10 border-2 border-accent/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getLevelIcon()}
              </div>
              <div className="text-2xl font-bold text-accent">{level}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Niveau' : language === 'en' ? 'Level' : 'Niveau'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">{score}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Points' : language === 'en' ? 'Points' : 'Points'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getStreakIcon()}
              </div>
              <div className="text-2xl font-bold text-accent">{streak}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Série' : language === 'en' ? 'Streak' : 'Série'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">{achievements.filter(a => a.unlocked).length}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Succès' : language === 'en' ? 'Achievements' : 'Succès'}
              </div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>
                {language === 'fr' ? 'Progression' : language === 'en' ? 'Progress' : 'Progression'}
              </span>
              <span>{Math.round(getLevelProgress())}%</span>
            </div>
            <Progress value={getLevelProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => addScore(10, 'discovery')}
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <Search className="h-6 w-6" />
          <span className="text-xs">
            {language === 'fr' ? 'Découvrir' : language === 'en' ? 'Discover' : 'Gis'}
          </span>
        </Button>
        
        <Button
          onClick={() => addScore(15, 'learning')}
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xs">
            {language === 'fr' ? 'Apprendre' : language === 'en' ? 'Learn' : 'Jàngal'}
          </span>
        </Button>
        
        <Button
          onClick={() => addScore(20, 'exploration')}
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <Camera className="h-6 w-6" />
          <span className="text-xs">
            {language === 'fr' ? 'Explorer' : language === 'en' ? 'Explore' : 'Seet'}
          </span>
        </Button>
        
        <Button
          onClick={() => addScore(5, 'social')}
          variant="outline"
          className="h-20 flex flex-col items-center gap-2"
        >
          <Heart className="h-6 w-6" />
          <span className="text-xs">
            {language === 'fr' ? 'Partager' : language === 'en' ? 'Share' : 'Partager'}
          </span>
        </Button>
      </div>

      {/* Achievements */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            {language === 'fr' ? 'Succès' : language === 'en' ? 'Achievements' : 'Succès'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementsData.map(achievement => {
              const unlocked = achievements.find(a => a.id === achievement.id)?.unlocked || false;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    unlocked 
                      ? 'border-accent bg-accent/10' 
                      : 'border-muted bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">
                        {achievement.title[language as keyof typeof achievement.title]}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.description[language as keyof typeof achievement.description]}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={unlocked ? "default" : "secondary"}>
                          {achievement.points} pts
                        </Badge>
                        {unlocked && <Badge className="bg-green-500">✓</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Medal className="h-5 w-5 text-accent" />
            {language === 'fr' ? 'Badges' : language === 'en' ? 'Badges' : 'Badges'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badgesData.map(badge => {
              const unlocked = badges.find(b => b.id === badge.id)?.unlocked || false;
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    unlocked 
                      ? 'border-accent bg-accent/10' 
                      : 'border-muted bg-muted/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="font-semibold">
                      {badge.name[language as keyof typeof badge.name]}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {badge.description[language as keyof typeof badge.description]}
                    </div>
                    {unlocked && (
                      <Badge className="bg-green-500 mt-2">✓ Débloqué</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification d'achievement */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <Card className="bg-accent text-white border-2 border-accent">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{showAchievement.icon}</div>
                <div>
                  <div className="font-bold">🎉 {language === 'fr' ? 'Succès débloqué !' : language === 'en' ? 'Achievement unlocked!' : 'Succès débloqué !'}</div>
                  <div className="text-sm">
                    {showAchievement.title[language as keyof typeof showAchievement.title]}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

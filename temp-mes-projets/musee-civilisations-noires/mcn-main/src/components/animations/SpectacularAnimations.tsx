import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Star, 
  Heart, 
  Eye, 
  Camera,
  Play,
  Pause,
  RotateCcw,
  Settings
} from "lucide-react";

interface SpectacularAnimationsProps {
  language: string;
  onAnimationComplete?: () => void;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const SpectacularAnimations = ({ language, onAnimationComplete }: SpectacularAnimationsProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'sparkles' | 'wave' | 'explosion' | 'spiral'>('sparkles');
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    '#D4AF37', // Gold
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#98D8C8'  // Mint
  ];

  useEffect(() => {
    if (isAnimating) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => stopAnimation();
  }, [isAnimating, animationType, speed, intensity]);

  const createParticle = (x: number, y: number): Particle => ({
    id: Math.random().toString(36).substr(2, 9),
    x,
    y,
    vx: (Math.random() - 0.5) * 4 * speed,
    vy: (Math.random() - 0.5) * 4 * speed,
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0,
    maxLife: 60 + Math.random() * 40
  });

  const createParticles = (count: number, x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(x, y));
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prev => {
        const updatedParticles = prev
          .map(particle => {
            // Mettre à jour la position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life++;

            // Appliquer les forces selon le type d'animation
            switch (animationType) {
              case 'sparkles':
                particle.vy += 0.1; // Gravité
                break;
              case 'wave':
                particle.vx += Math.sin(particle.life * 0.1) * 0.1;
                break;
              case 'explosion':
                const distance = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (distance > 0) {
                  particle.vx *= 0.98;
                  particle.vy *= 0.98;
                }
                break;
              case 'spiral':
                const angle = particle.life * 0.1;
                const radius = particle.life * 0.5;
                particle.x = canvas.width / 2 + Math.cos(angle) * radius;
                particle.y = canvas.height / 2 + Math.sin(angle) * radius;
                break;
            }

            return particle;
          })
          .filter(particle => particle.life < particle.maxLife);

        // Dessiner les particules
        updatedParticles.forEach(particle => {
          const alpha = 1 - (particle.life / particle.maxLife);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        return updatedParticles;
      });

      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const triggerAnimation = (type: 'sparkles' | 'wave' | 'explosion' | 'spiral') => {
    setAnimationType(type);
    setIsAnimating(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    createParticles(intensity, x, y);

    setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete?.();
    }, 3000);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createParticles(intensity, x, y);
  };

  const resetCanvas = () => {
    setParticles([]);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      {/* Contrôles */}
      <Card className="bg-gradient-to-r from-accent/10 to-yellow-500/10 border-2 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              {language === 'fr' ? 'Animations Spectaculaires' : language === 'en' ? 'Spectacular Animations' : 'Animations Spectaculaires'}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetCanvas}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
              >
                {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isAnimating ? 'Pause' : 'Play'}
              </Button>
            </div>
          </div>

          {/* Types d'animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Button
              variant={animationType === 'sparkles' ? 'default' : 'outline'}
              onClick={() => triggerAnimation('sparkles')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Sparkles className="h-6 w-6" />
              <span className="text-xs">
                {language === 'fr' ? 'Étincelles' : language === 'en' ? 'Sparkles' : 'Étincelles'}
              </span>
            </Button>

            <Button
              variant={animationType === 'wave' ? 'default' : 'outline'}
              onClick={() => triggerAnimation('wave')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Zap className="h-6 w-6" />
              <span className="text-xs">
                {language === 'fr' ? 'Onde' : language === 'en' ? 'Wave' : 'Onde'}
              </span>
            </Button>

            <Button
              variant={animationType === 'explosion' ? 'default' : 'outline'}
              onClick={() => triggerAnimation('explosion')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Star className="h-6 w-6" />
              <span className="text-xs">
                {language === 'fr' ? 'Explosion' : language === 'en' ? 'Explosion' : 'Explosion'}
              </span>
            </Button>

            <Button
              variant={animationType === 'spiral' ? 'default' : 'outline'}
              onClick={() => triggerAnimation('spiral')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <RotateCcw className="h-6 w-6" />
              <span className="text-xs">
                {language === 'fr' ? 'Spirale' : language === 'en' ? 'Spiral' : 'Spirale'}
              </span>
            </Button>
          </div>

          {/* Paramètres */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'fr' ? 'Vitesse' : language === 'en' ? 'Speed' : 'Vitesse'}
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{speed}x</span>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'fr' ? 'Intensité' : language === 'en' ? 'Intensity' : 'Intensité'}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{intensity} particules</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas d'animation */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              onClick={handleCanvasClick}
              className="w-full h-[400px] cursor-crosshair bg-gradient-to-br from-black via-purple-900 to-black"
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Overlay d'instructions */}
            <div className="absolute top-4 left-4 bg-black/50 text-white p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === 'fr' ? 'Cliquez pour créer des particules' : language === 'en' ? 'Click to create particles' : 'Click ngir def particules'}
                </span>
              </div>
              <div className="text-xs text-gray-300">
                {language === 'fr' ? 'Utilisez les boutons ci-dessus pour différents effets' : 
                 language === 'en' ? 'Use buttons above for different effects' : 
                 'Jëkk ci boutons ci kanam ngir effets yu wuute'}
              </div>
            </div>

            {/* Statistiques en temps réel */}
            <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-lg">
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span>{particles.length} particules</span>
                </div>
                <div className="text-xs text-gray-300">
                  {language === 'fr' ? 'Actives' : language === 'en' ? 'Active' : 'Actives'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effets spéciaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-6 w-6 text-red-500" />
              <h4 className="font-semibold">
                {language === 'fr' ? 'Effet Cœur' : language === 'en' ? 'Heart Effect' : 'Effet Xol'}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'fr' ? 'Particules en forme de cœur' : 
               language === 'en' ? 'Heart-shaped particles' : 
               'Particules ci forme bu xol'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Créer des particules en forme de cœur
                const canvas = canvasRef.current;
                if (!canvas) return;
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                for (let i = 0; i < 20; i++) {
                  const angle = (i / 20) * Math.PI * 2;
                  const x = centerX + Math.cos(angle) * 50;
                  const y = centerY + Math.sin(angle) * 30;
                  createParticles(5, x, y);
                }
              }}
              className="w-full"
            >
              <Heart className="h-4 w-4 mr-2" />
              Activer
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="h-6 w-6 text-blue-500" />
              <h4 className="font-semibold">
                {language === 'fr' ? 'Effet Flash' : language === 'en' ? 'Flash Effect' : 'Effet Flash'}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'fr' ? 'Explosion de lumière' : 
               language === 'en' ? 'Light explosion' : 
               'Explosion bu lumière'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                createParticles(100, centerX, centerY);
              }}
              className="w-full"
            >
              <Zap className="h-4 w-4 mr-2" />
              Activer
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Star className="h-6 w-6 text-yellow-500" />
              <h4 className="font-semibold">
                {language === 'fr' ? 'Effet Étoiles' : language === 'en' ? 'Stars Effect' : 'Effet Biddéw'}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {language === 'fr' ? 'Pluie d\'étoiles' : 
               language === 'en' ? 'Star rain' : 
               'Taw bu biddéw'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                
                for (let i = 0; i < 10; i++) {
                  const x = Math.random() * canvas.width;
                  const y = 0;
                  createParticles(10, x, y);
                }
              }}
              className="w-full"
            >
              <Star className="h-4 w-4 mr-2" />
              Activer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

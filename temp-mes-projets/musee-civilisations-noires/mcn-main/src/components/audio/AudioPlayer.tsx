import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Gauge, Zap } from "lucide-react";
import { toast } from "sonner";
import { speakText, getLanguageCode } from "@/lib/audioUtils";

interface AudioPlayerProps {
  text: string;
  language: string;
  className?: string;
}

export const AudioPlayer = ({ text, language, className }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const translations = {
    fr: {
      play: "Écouter",
      pause: "Pause",
      stop: "Arrêter",
      mute: "Couper le son",
      unmute: "Activer le son",
      loading: "Chargement...",
      error: "Erreur de lecture audio",
      notSupported: "Audio non supporté sur cet appareil",
      speed: "Vitesse",
      normal: "Normal",
      fast: "Rapide",
      faster: "Très rapide"
    },
    en: {
      play: "Listen",
      pause: "Pause",
      stop: "Stop",
      mute: "Mute",
      unmute: "Unmute",
      loading: "Loading...",
      error: "Audio playback error",
      notSupported: "Audio not supported on this device",
      speed: "Speed",
      normal: "Normal",
      fast: "Fast",
      faster: "Very Fast"
    },
    wo: {
      play: "Dégg",
      pause: "Pause",
      stop: "Dégg",
      mute: "Dégg",
      unmute: "Dégg",
      loading: "Chargement...",
      error: "Erreur de lecture audio",
      notSupported: "Audio gis-gis ci appareil bi",
      speed: "Tëx",
      normal: "Normal",
      fast: "Tëx",
      faster: "Tëx lool"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Vérifier si l'API Web Speech est supportée
  const isSpeechSupported = 'speechSynthesis' in window;

  // Obtenir le code de langue pour l'affichage
  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case 'wo':
        return 'Wolof (voix française)';
      case 'fr':
        return 'Français';
      case 'en':
        return 'English';
      default:
        return lang.toUpperCase();
    }
  };

  const speak = async () => {
    if (!isSpeechSupported) {
      toast.error(t.notSupported);
      return;
    }

    setIsLoading(true);
    setIsPlaying(true);
    setIsPaused(false);

    try {
      // Attendre que la synthèse soit prête
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      
      // Créer l'utterance avec les paramètres
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      utterance.rate = playbackRate;
      utterance.volume = isMuted ? 0 : Math.max(0.8, volume); // Volume minimum de 0.8 (80%)
      utterance.pitch = 1; // Pitch normal
      
      // Forcer un volume plus élevé si possible
      if (!isMuted && volume > 0.8) {
        utterance.volume = 1.0; // Forcer le maximum
      }
      
      utterance.onstart = () => {
        setIsLoading(false);
        setIsPlaying(true);
        console.log('Audio démarré pour la langue:', language, 'Volume:', utterance.volume);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentTime(0);
        console.log('Audio terminé pour la langue:', language);
      };
      
      utterance.onerror = (error) => {
        console.error('Erreur audio:', error);
        setIsLoading(false);
        setIsPlaying(false);
        toast.error(`${t.error}: ${error.error}`);
      };
      
      synthRef.current = utterance;
      
      // Attendre un peu avant de parler
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    } catch (error) {
      console.error('Erreur lors du démarrage audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
      toast.error(t.error);
    }
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (!newMutedState) {
        // Redémarrer seulement si on démutte
        setTimeout(() => {
          speak();
        }, 200);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    // Ne pas redémarrer automatiquement, laisser l'utilisateur contrôler
  };

  const handleSpeedChange = (newRate: number) => {
    setPlaybackRate(newRate);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speak();
      }, 200);
    }
  };


  // Nettoyer à la fermeture du composant
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSpeechSupported) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <VolumeX className="h-4 w-4" />
            <span className="text-sm">{t.notSupported}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground">
            Audio en {getLanguageDisplay(language)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <Button
                variant="hero"
                size="sm"
                onClick={speak}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isLoading ? t.loading : t.play}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={pause}
                >
                  {isPaused ? (
                    <Play className="h-4 w-4 mr-2" />
                  ) : (
                    <Pause className="h-4 w-4 mr-2" />
                  )}
                  {isPaused ? t.play : t.pause}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stop}
                >
                  <VolumeX className="h-4 w-4 mr-2" />
                  {t.stop}
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Contrôles de vitesse */}
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                <Button
                  variant={playbackRate === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpeedChange(1)}
                  className="h-6 px-2 text-xs"
                >
                  x1
                </Button>
                <Button
                  variant={playbackRate === 1.5 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpeedChange(1.5)}
                  className="h-6 px-2 text-xs"
                >
                  x1.5
                </Button>
                <Button
                  variant={playbackRate === 2 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpeedChange(2)}
                  className="h-6 px-2 text-xs"
                >
                  x2
                </Button>
              </div>
            </div>

            {/* Contrôles de volume */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              {!isMuted && (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.8"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <span className="text-xs text-muted-foreground w-8">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isPlaying && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-accent h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

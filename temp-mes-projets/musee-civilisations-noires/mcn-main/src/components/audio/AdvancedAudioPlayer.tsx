import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Languages, Music } from "lucide-react";

interface AdvancedAudioPlayerProps {
  text: string;
  language: string;
  artworkTitle: string;
  onLanguageChange: (lang: string) => void;
}

export const AdvancedAudioPlayer = ({ 
  text, 
  language, 
  artworkTitle, 
  onLanguageChange 
}: AdvancedAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳' }
  ];

  // Musique de fond traditionnelle
  const traditionalMusic = {
    fr: "🎵 Musique traditionnelle sénégalaise",
    en: "🎵 Traditional Senegalese music",
    wo: "🎵 Mousique tradisyonel bu Senegaal"
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      setVoices(speechSynthesis.getVoices());
      
      speechSynthesis.onvoiceschanged = () => {
        setVoices(speechSynthesis.getVoices());
      };
    }
  }, []);

  useEffect(() => {
    const voice = voices.find(v => 
      v.lang.startsWith(currentLanguage) && v.name.includes('Female')
    ) || voices.find(v => v.lang.startsWith(currentLanguage));
    
    if (voice) {
      setSelectedVoice(voice);
    }
  }, [voices, currentLanguage]);

  const speak = () => {
    if (!isSupported) return;

    // Arrêter la lecture précédente
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const pause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPlaying(false);
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    onLanguageChange(lang);
  };

  const reset = () => {
    stop();
    setPlaybackRate(1);
    setVolume(1);
    setIsMuted(false);
  };

  if (!isSupported) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground text-center">
          {language === 'fr' ? 'Audio non supporté sur cet appareil' : 
           language === 'en' ? 'Audio not supported on this device' : 
           'Audio duñu ko support ci bii appareil'}
        </p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-2 border-accent/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header avec titre et musique de fond */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-accent" />
                {language === 'fr' ? 'Audio Multilingue' : 
                 language === 'en' ? 'Multilingual Audio' : 
                 'Audio Multilingue'}
              </h3>
              <p className="text-sm text-muted-foreground">{artworkTitle}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBackgroundMusic(!backgroundMusic)}
              className={backgroundMusic ? "bg-accent text-white" : ""}
            >
              <Music className="h-4 w-4 mr-2" />
              {backgroundMusic ? "🎵" : "🔇"}
            </Button>
          </div>

          {/* Sélection de langue */}
          <div className="flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={currentLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center gap-2"
              >
                <span>{lang.flag}</span>
                {lang.name}
              </Button>
            ))}
          </div>

          {/* Contrôles audio */}
          <div className="flex items-center gap-4">
            <Button
              onClick={isPlaying ? pause : speak}
              variant="hero"
              size="lg"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              {isPlaying ? 
                (language === 'fr' ? 'Pause' : language === 'en' ? 'Pause' : 'Dégg') :
                (language === 'fr' ? 'Écouter' : language === 'en' ? 'Listen' : 'Déglu')
              }
            </Button>

            <Button
              onClick={stop}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Arrêter' : language === 'en' ? 'Stop' : 'Dégg'}
            </Button>

            <Button
              onClick={toggleMute}
              variant="outline"
              size="sm"
              className={isMuted ? "bg-red-500 text-white" : ""}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Paramètres avancés */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                {language === 'fr' ? 'Vitesse' : language === 'en' ? 'Speed' : 'Vitesse'}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">{playbackRate}x</span>
            </div>

            <div>
              <label className="text-sm font-medium">
                {language === 'fr' ? 'Volume' : language === 'en' ? 'Volume' : 'Volume'}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full"
                disabled={isMuted}
              />
              <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {/* Musique de fond */}
          {backgroundMusic && (
            <div className="bg-accent/10 p-3 rounded-lg">
              <p className="text-sm text-accent font-medium">
                {traditionalMusic[currentLanguage as keyof typeof traditionalMusic]}
              </p>
            </div>
          )}

          {/* Reset */}
          <Button
            onClick={reset}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {language === 'fr' ? 'Réinitialiser' : language === 'en' ? 'Reset' : 'Réinitialiser'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

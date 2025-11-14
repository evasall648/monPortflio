import { useState, useRef, useCallback } from "react";

interface UseAudioReturn {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  play: (text: string, language: string) => void;
  pause: () => void;
  stop: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

export const useAudio = (): UseAudioReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const play = useCallback((text: string, language: string) => {
    if (!('speechSynthesis' in window)) {
      console.error('Web Speech API not supported');
      return;
    }

    // Arrêter la lecture précédente
    if (synthRef.current) {
      window.speechSynthesis.cancel();
    }

    setIsLoading(true);
    setIsPlaying(true);
    setIsPaused(false);

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configuration de la voix selon la langue
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice;
    
    if (language === 'wo') {
      // Pour le wolof, utiliser une voix française (plus proche phonétiquement)
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('fr') && voice.name.includes('French')
      ) || voices.find(voice => voice.lang.startsWith('fr'));
    } else if (language === 'fr') {
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('fr') && voice.name.includes('French')
      ) || voices.find(voice => voice.lang.startsWith('fr'));
    } else if (language === 'en') {
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('English')
      ) || voices.find(voice => voice.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Configuration de la langue
    if (language === 'wo') {
      utterance.lang = 'fr-FR'; // Utiliser le français pour le wolof
    } else if (language === 'fr') {
      utterance.lang = 'fr-FR';
    } else if (language === 'en') {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentTime(0);
    };

    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale:', event);
      setIsLoading(false);
      setIsPlaying(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [volume, isMuted]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (synthRef.current) {
      synthRef.current.volume = !isMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  const setVolumeCallback = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (synthRef.current && !isMuted) {
      synthRef.current.volume = newVolume;
    }
  }, [isMuted]);

  return {
    isPlaying,
    isPaused,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    stop,
    toggleMute,
    setVolume: setVolumeCallback
  };
};

// Utilitaires pour la gestion audio

export const getVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis.getVoices();
};

export const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      // Attendre que les voix se chargent
      const checkVoices = () => {
        const voices = getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          setTimeout(checkVoices, 100);
        }
      };
      checkVoices();
    }
  });
};

export const getBestVoiceForLanguage = (voices: SpeechSynthesisVoice[], language: string): SpeechSynthesisVoice | null => {
  if (language === 'wo') {
    // Pour le wolof, utiliser une voix française
    return voices.find(voice => 
      voice.lang.startsWith('fr') && voice.name.includes('French')
    ) || voices.find(voice => voice.lang.startsWith('fr')) || voices[0];
  } else if (language === 'fr') {
    return voices.find(voice => 
      voice.lang.startsWith('fr') && voice.name.includes('French')
    ) || voices.find(voice => voice.lang.startsWith('fr')) || voices[0];
  } else if (language === 'en') {
    return voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('English')
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
  }
  
  return voices[0] || null;
};

export const getLanguageCode = (language: string): string => {
  switch (language) {
    case 'wo':
      return 'fr-FR'; // Utiliser le français pour le wolof
    case 'fr':
      return 'fr-FR';
    case 'en':
      return 'en-US';
    default:
      return 'fr-FR';
  }
};

export const speakText = async (
  text: string, 
  language: string, 
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: any) => void
): Promise<void> => {
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API not supported');
    return;
  }

  // Arrêter toute lecture en cours
  window.speechSynthesis.cancel();

  // Attendre que les voix se chargent
  const voices = await waitForVoices();
  const selectedVoice = getBestVoiceForLanguage(voices, language);

  const utterance = new SpeechSynthesisUtterance(text);
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  utterance.lang = getLanguageCode(language);
  utterance.rate = 0.8;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    console.log('Audio started for language:', language);
    onStart?.();
  };

  utterance.onend = () => {
    console.log('Audio ended for language:', language);
    onEnd?.();
  };

  utterance.onerror = (event) => {
    console.error('Audio error:', event);
    onError?.(event);
  };

  window.speechSynthesis.speak(utterance);
};

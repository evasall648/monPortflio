import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Lightbulb,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2
} from "lucide-react";

interface ChatbotProps {
  language: string;
  onNavigate: (path: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'navigation' | 'info';
  data?: any;
}

interface Suggestion {
  id: string;
  text: {
    fr: string;
    en: string;
    wo: string;
  };
  action: string;
  icon: string;
}

export const IntelligentChatbot = ({ language, onNavigate }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions: Suggestion[] = [
    {
      id: 'visit-info',
      text: {
        fr: 'Informations sur le musée',
        en: 'Museum information',
        wo: 'Informations ci musée'
      },
      action: 'navigate',
      icon: '🏛️'
    },
    {
      id: 'virtual-tour',
      text: {
        fr: 'Commencer la visite virtuelle',
        en: 'Start virtual tour',
        wo: 'Jëkk seet virtuel'
      },
      action: 'navigate',
      icon: '🎥'
    },
    {
      id: 'scan-qr',
      text: {
        fr: 'Scanner un code QR',
        en: 'Scan QR code',
        wo: 'Scanner QR code'
      },
      action: 'navigate',
      icon: '📱'
    },
    {
      id: 'gallery',
      text: {
        fr: 'Explorer la galerie',
        en: 'Explore gallery',
        wo: 'Seet galerie'
      },
      action: 'navigate',
      icon: '🖼️'
    }
  ];

  const responses = {
    fr: {
      greeting: "Bonjour ! Je suis votre guide virtuel du Musée des Civilisations Noires. Comment puis-je vous aider ?",
      help: "Je peux vous aider à naviguer dans le musée, vous donner des informations sur les œuvres, et vous guider dans votre visite.",
      museum_info: "Le Musée des Civilisations Noires a été inauguré en 2018. Il abrite plus de 18 000 œuvres et s'étend sur 14 000 m² sur 4 niveaux.",
      virtual_tour: "La visite virtuelle vous permet d'explorer le musée depuis chez vous. Vous pouvez naviguer entre les différentes salles et découvrir les œuvres.",
      scan_qr: "Le scanner QR vous permet de scanner les codes QR des œuvres pour obtenir des informations détaillées et des descriptions audio.",
      gallery: "La galerie présente toutes les œuvres du musée. Vous pouvez filtrer par période, culture ou type d'œuvre.",
      unknown: "Je ne comprends pas votre demande. Pouvez-vous reformuler ou utiliser les suggestions ci-dessous ?"
    },
    en: {
      greeting: "Hello! I'm your virtual guide to the Museum of Black Civilizations. How can I help you?",
      help: "I can help you navigate the museum, provide information about artworks, and guide you through your visit.",
      museum_info: "The Museum of Black Civilizations was inaugurated in 2018. It houses over 18,000 works and spans 14,000 m² across 4 levels.",
      virtual_tour: "The virtual tour allows you to explore the museum from home. You can navigate between different rooms and discover artworks.",
      scan_qr: "The QR scanner allows you to scan artwork QR codes for detailed information and audio descriptions.",
      gallery: "The gallery presents all museum artworks. You can filter by period, culture or type of artwork.",
      unknown: "I don't understand your request. Can you rephrase or use the suggestions below?"
    },
    wo: {
      greeting: "Salaam ! Manaay sa guide virtuel bu Musée yu Noirs. Nanga may jëkk ?",
      help: "Man naa la jëkk ci navigation ci musée, joxe informations ci liggéey, ak jëkk ci seen seet.",
      museum_info: "Musée yu Noirs dañu ko inauguré ci 2018. Dañu am 18 000 liggéey ak dañu am 14 000 m² ci 4 niveaux.",
      virtual_tour: "Seet virtuel dafa la man a seet musée bi ci kër. Man nga navigation ci biir salles yu wuute ak gis liggéey.",
      scan_qr: "Scanner QR dafa la man a scanner codes QR yu liggéey ngir gis informations yu detail ak descriptions audio.",
      gallery: "Galerie bi dafa wone ñépp liggéey yu musée. Man nga filter ci période, culture walla type bu liggéey.",
      unknown: "Manu ko xam seen demande. Man nga waxaat walla jëkk ci suggestions yii ?"
    }
  };

  useEffect(() => {
    // Message de bienvenue
    const welcomeMessage: Message = {
      id: '1',
      text: responses[language as keyof typeof responses].greeting,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler le temps de traitement
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const currentResponses = responses[language as keyof typeof responses];

    if (input.includes('bonjour') || input.includes('hello') || input.includes('salaam')) {
      return currentResponses.greeting;
    }
    
    if (input.includes('aide') || input.includes('help') || input.includes('jëkk')) {
      return currentResponses.help;
    }
    
    if (input.includes('musée') || input.includes('museum') || input.includes('musée')) {
      return currentResponses.museum_info;
    }
    
    if (input.includes('visite') || input.includes('tour') || input.includes('seet')) {
      return currentResponses.virtual_tour;
    }
    
    if (input.includes('scanner') || input.includes('scan') || input.includes('qr')) {
      return currentResponses.scan_qr;
    }
    
    if (input.includes('galerie') || input.includes('gallery') || input.includes('galerie')) {
      return currentResponses.gallery;
    }
    
    return currentResponses.unknown;
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    const message = suggestion.text[language as keyof typeof suggestion.text];
    handleSendMessage(message);
    setShowSuggestions(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Reconnaissance vocale non supportée');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'wo-SN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'wo-SN';
      utterance.volume = isMuted ? 0 : 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-2 border-accent/20">
      {/* Header */}
      <div className="p-4 border-b bg-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">
                {language === 'fr' ? 'Guide Virtuel' : language === 'en' ? 'Virtual Guide' : 'Guide Virtuel'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Assistant IA' : language === 'en' ? 'AI Assistant' : 'Assistant IA'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className={isMuted ? "bg-red-500 text-white" : ""}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              <Lightbulb className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-muted'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && (
                  <Bot className="h-4 w-4 mt-1 text-accent" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <User className="h-4 w-4 mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-accent" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">
              {language === 'fr' ? 'Suggestions' : language === 'en' ? 'Suggestions' : 'Suggestions'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="h-auto p-2 flex flex-col items-center gap-1"
              >
                <span className="text-lg">{suggestion.icon}</span>
                <span className="text-xs text-center">
                  {suggestion.text[language as keyof typeof suggestion.text]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              language === 'fr' ? 'Tapez votre message...' : 
              language === 'en' ? 'Type your message...' : 
              'Tape seen message...'
            }
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleVoiceInput}
            className={isListening ? "bg-red-500 text-white" : ""}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => handleSendMessage(inputValue)}
            size="sm"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  X, 
  Bot, 
  HelpCircle,
  Minimize2,
  MessageCircle,
  Sparkles,
  Zap,
  Send
} from "lucide-react";
import { IntelligentChatbot } from "./chatbot/IntelligentChatbot";

interface FloatingChatbotProps {
  language: string;
}

export const FloatingChatbot = ({ language }: FloatingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    console.log('Chatbot toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
    console.log('New state should be:', !isOpen);
  };
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  // Messages de bienvenue avec questions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: '1',
        text: language === 'fr' ? 'Bonjour ! Voici les questions disponibles :' :
              language === 'en' ? 'Hello! Here are the available questions:' :
              'Salaam ! Fii laaj yu am :',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language, messages.length]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Questions prédéfinies
  const predefinedQuestions = [
    {
      id: '1',
      text: {
        fr: 'Qu\'est-ce que le Musée des Civilisations Noires ?',
        en: 'What is the Museum of Black Civilizations?',
        wo: 'Lu nekk Musée yu Civilisations Noires ?'
      },
      answer: {
        fr: 'Le Musée des Civilisations Noires a été inauguré en 2018. Il abrite plus de 18 000 œuvres d\'art et s\'étend sur 14 000 m² sur 4 niveaux. Il célèbre la richesse et la diversité des civilisations africaines.',
        en: 'The Museum of Black Civilizations was inaugurated in 2018. It houses over 18,000 artworks and spans 14,000 m² across 4 levels. It celebrates the richness and diversity of African civilizations.',
        wo: 'Musée yu Civilisations Noires dañu ko inauguré ci 2018. Dañu am 18 000 liggéey ak dañu am 14 000 m² ci 4 niveaux. Dañu célèbre richesse ak diversité yu civilisations africaines.'
      }
    },
    {
      id: '2',
      text: {
        fr: 'Comment visiter le musée ?',
        en: 'How to visit the museum?',
        wo: 'Naka seet musée bi ?'
      },
      answer: {
        fr: 'Vous pouvez explorer notre galerie virtuelle, faire une visite virtuelle immersive, ou scanner les codes QR des œuvres pour des informations détaillées. Le musée est ouvert du mardi au dimanche de 9h à 18h.',
        en: 'You can explore our virtual gallery, take an immersive virtual tour, or scan artwork QR codes for detailed information. The museum is open Tuesday to Sunday from 9am to 6pm.',
        wo: 'Man nga seet seen galerie virtuelle, def seet virtuel immersif, walla scanner codes QR yu liggéey ngir gis informations yu detail. Musée bi dafa ubbi Talaata ba Dimanche ci 9h ba 18h.'
      }
    },
    {
      id: '3',
      text: {
        fr: 'Où se trouve le musée ?',
        en: 'Where is the museum located?',
        wo: 'Fan nga musée bi ?'
      },
      answer: {
        fr: 'Le musée est situé Place de la Gare, Dakar, Sénégal. Téléphone: +221 33 821 00 00. Email: contact@mcn.sn. Site web: www.mcn.sn',
        en: 'The museum is located at Place de la Gare, Dakar, Senegal. Phone: +221 33 821 00 00. Email: contact@mcn.sn. Website: www.mcn.sn',
        wo: 'Musée bi dafa nekk Place de la Gare, Dakar, Senegal. Téléphone: +221 33 821 00 00. Email: contact@mcn.sn. Site web: www.mcn.sn'
      }
    },
    {
      id: '4',
      text: {
        fr: 'Quelles œuvres puis-je voir ?',
        en: 'What artworks can I see?',
        wo: 'Liggéey lu man nga gis ?'
      },
      answer: {
        fr: 'Notre collection comprend des masques cérémoniels, des sculptures en bronze, des textiles traditionnels, des œuvres contemporaines, et des expositions temporaires. Plus de 18 000 œuvres d\'art de toute l\'Afrique.',
        en: 'Our collection includes ceremonial masks, bronze sculptures, traditional textiles, contemporary works, and temporary exhibitions. Over 18,000 artworks from all over Africa.',
        wo: 'Seen collection dafa am masques cérémoniels, sculptures ci bronze, textiles traditionnels, liggéey contemporains, ak expositions temporaires. 18 000 liggéey yu art yu jëkk ci Afrika bu leer.'
      }
    }
  ];

  // Réponse du bot basée sur la question choisie
  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Chercher la question correspondante
    for (const question of predefinedQuestions) {
      const questionText = question.text[language as keyof typeof question.text].toLowerCase();
      if (lowerMessage.includes(questionText.toLowerCase()) || 
          lowerMessage.includes(question.id) ||
          lowerMessage.includes(question.text.fr.toLowerCase().split(' ')[0])) {
        return question.answer[language as keyof typeof question.answer];
      }
    }
    
    // Réponse par défaut avec les questions
    return language === 'fr' ? 
      'Choisissez une question ci-dessus ou tapez 1, 2, 3, ou 4 pour une réponse rapide.' :
      language === 'en' ? 
      'Choose a question above or type 1, 2, 3, or 4 for a quick answer.' :
      'Tànn benn laaj ci kaw walla tape 1, 2, 3, walla 4 ngir jëf rapide.';
  };

  // Envoyer un message
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulation de réponse du bot
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const translations = {
    fr: {
      title: "Assistant Musée",
      subtitle: "Comment puis-je vous aider ?",
      help: "Aide"
    },
    en: {
      title: "Museum Assistant",
      subtitle: "How can I help you?",
      help: "Help"
    },
    wo: {
      title: "Assistant Musée",
      subtitle: "Nanga ma jëf ci yow ?",
      help: "Jëf"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <>
      {/* Bouton avec style progressif */}
      <div 
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 cursor-pointer flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{ 
          zIndex: 99999,
          position: 'fixed',
          bottom: '24px',
          right: '24px'
        }}
          >
            {isOpen ? (
              <X className="h-7 w-7 text-white drop-shadow-lg" />
            ) : (
              <div className="relative">
                <MessageCircle className="h-7 w-7 text-white drop-shadow-lg" />
                <Sparkles className="h-3 w-3 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
              </div>
            )}
      </div>

      {/* Chatbot panel professionnel */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-[9998] w-80 ${isMinimized ? 'h-16' : 'h-96'} transition-all duration-300`}>
          <Card className="h-full shadow-2xl border border-slate-200 bg-white">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Header stylé */}
              <div className="bg-gradient-to-r from-accent via-[hsl(var(--gold))] to-[hsl(var(--terracotta))] text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                      <div className="relative">
                        <MessageCircle className="h-5 w-5 text-white drop-shadow-lg" />
                        <Sparkles className="h-2 w-2 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm drop-shadow-sm">{t.title}</h3>
                      <p className="text-xs opacity-90 drop-shadow-sm">{t.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMinimize}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleChat}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat content - seulement si pas minimisé */}
              {!isMinimized && (
                <div className="flex-1 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Messages area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-start gap-3 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === 'user' 
                                ? 'bg-blue-500' 
                                : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                            }`}>
                              {message.sender === 'user' ? (
                                <span className="text-white text-xs font-bold">U</span>
                              ) : (
                                <Bot className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <div className={`rounded-lg p-3 ${
                              message.sender === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Bouton pour revenir aux questions */}
                      {messages.length > 1 && (
                        <div className="mb-4">
                          <button
                            onClick={() => setMessages([messages[0]])}
                            className="w-full p-2 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm text-blue-600 font-medium"
                          >
                            🔄 {language === 'fr' ? 'Autres questions' : language === 'en' ? 'Other questions' : 'Laaj yu wees'}
                          </button>
                        </div>
                      )}

                      {/* Questions prédéfinies - affichées seulement au début */}
                      {messages.length <= 1 && (
                        <div className="space-y-2">
                          {predefinedQuestions.map((question, index) => (
                            <button
                              key={question.id}
                              onClick={() => {
                                const questionMessage = {
                                  id: `q${question.id}`,
                                  text: question.text[language as keyof typeof question.text],
                                  sender: 'user' as const,
                                  timestamp: new Date()
                                };
                                setMessages(prev => [...prev, questionMessage]);
                                
                                // Réponse automatique immédiate
                                setTimeout(() => {
                                  const botResponse = {
                                    id: `a${question.id}`,
                                    text: question.answer[language as keyof typeof question.answer],
                                    sender: 'bot' as const,
                                    timestamp: new Date()
                                  };
                                  setMessages(prev => [...prev, botResponse]);
                                }, 300);
                              }}
                              className="w-full text-left p-3 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 rounded-lg border border-orange-200 hover:border-orange-300 transition-all duration-200 text-sm hover:scale-105"
                            >
                              <span className="font-semibold text-orange-600 mr-2">{index + 1}.</span>
                              {question.text[language as keyof typeof question.text]}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Typing indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Input area */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={language === 'fr' ? 'Tapez votre message...' :
                                     language === 'en' ? 'Type your message...' :
                                     'Tape seen message...'}
                          className="flex-1 text-sm"
                          disabled={isTyping}
                        />
                        <Button 
                          size="sm" 
                          onClick={sendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

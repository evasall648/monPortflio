import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import { Gallery } from "./pages/Gallery";
import { ArtworkDetail } from "./pages/ArtworkDetail";
import { ScanQR } from "./pages/ScanQR";
import { MuseumInfo } from "./pages/MuseumInfo";
import { VirtualTour } from "./pages/VirtualTour";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { QRRedirect } from "./pages/QRRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Composant pour faire défiler vers le haut à chaque changement de route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll immédiat vers le haut
    window.scrollTo(0, 0);
    
    // Animation fluide vers le haut (optionnel)
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Remettre le comportement par défaut après un court délai
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 100);
  }, [pathname]);

  return null;
};

const App = () => {
  const [language, setLanguage] = useState("fr");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navigation currentLanguage={language} onLanguageChange={setLanguage} />
          <Routes>
            <Route path="/" element={<Index language={language} />} />
            <Route path="/gallery" element={<Gallery language={language} />} />
            <Route path="/artwork/:id" element={<ArtworkDetail language={language} />} />
            <Route path="/scan" element={<ScanQR language={language} />} />
            <Route path="/museum-info" element={<MuseumInfo language={language} />} />
            <Route path="/virtual-tour" element={<VirtualTour language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/qr/:id" element={<QRRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Chatbot flottant sur toutes les pages */}
          <FloatingChatbot language={language} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

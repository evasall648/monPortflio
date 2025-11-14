import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface NavigationProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const Navigation = ({ currentLanguage, onLanguageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "wo", name: "Wolof" },
  ];

  const navItems = [
    { href: "/", label: { fr: "Accueil", en: "Home", wo: "Dëkk" } },
    { href: "/about", label: { fr: "À propos", en: "About", wo: "Ci ñu" } },
    { href: "/museum-info", label: { fr: "Le Musée", en: "The Museum", wo: "Musée bi" } },
    { href: "/gallery", label: { fr: "Galerie", en: "Gallery", wo: "Nataal" } },
    { href: "/virtual-tour", label: { fr: "Visite Virtuelle", en: "Virtual Tour", wo: "Seet Virtuel" } },
    { href: "/contact", label: { fr: "Contact", en: "Contact", wo: "Contact" } },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[hsl(var(--gold))] flex items-center justify-center">
              <span className="text-xl font-bold text-accent-foreground">M</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">
                {currentLanguage === "fr" && "Musée des Civilisations Noires"}
                {currentLanguage === "en" && "Museum of Black Civilizations"}
                {currentLanguage === "wo" && "Musée yu Noirs"}
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                >
                  <Link to={item.href}>
                    {item.label[currentLanguage as keyof typeof item.label]}
                  </Link>
                </Button>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {languages.find((l) => l.code === currentLanguage)?.code.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>



            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label[currentLanguage as keyof typeof item.label]}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

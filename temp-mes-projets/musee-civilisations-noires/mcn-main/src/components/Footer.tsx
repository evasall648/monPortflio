import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart } from "lucide-react";

interface FooterProps {
  language: string;
}

export const Footer = ({ language }: FooterProps) => {
  const translations = {
    fr: {
      about: "À Propos",
      aboutText: "Le Musée des Civilisations Noires célèbre la richesse et la diversité des civilisations africaines à travers une collection exceptionnelle d'œuvres d'art.",
      quickLinks: "Liens Rapides",
      contact: "Contact",
      address: "Place de la Gare, Dakar, Sénégal",
      phone: "+221 33 821 00 00",
      email: "contact@mcn.sn",
      website: "www.mcn.sn",
      social: "Suivez-nous",
      rights: "Tous droits réservés",
      madeWith: "Fait avec",
      by: "par l'équipe du Musée des Civilisations Noires"
    },
    en: {
      about: "About",
      aboutText: "The Museum of Black Civilizations celebrates the richness and diversity of African civilizations through an exceptional collection of artworks.",
      quickLinks: "Quick Links",
      contact: "Contact",
      address: "Place de la Gare, Dakar, Senegal",
      phone: "+221 33 821 00 00",
      email: "contact@mcn.sn",
      website: "www.mcn.sn",
      social: "Follow us",
      rights: "All rights reserved",
      madeWith: "Made with",
      by: "by the Museum of Black Civilizations team"
    },
    wo: {
      about: "Ci Musée",
      aboutText: "Musée yu Civilisations Noires dafa célèbre richesse ak diversité yu civilisations africaines ci collection exceptionnelle yu liggéey yu art.",
      quickLinks: "Liens yu Gëwël",
      contact: "Contact",
      address: "Place de la Gare, Dakar, Senegal",
      phone: "+221 33 821 00 00",
      email: "contact@mcn.sn",
      website: "www.mcn.sn",
      social: "Toppal nu",
      rights: "Droit yu ñépp",
      madeWith: "Def ak",
      by: "ci équipe bu Musée yu Civilisations Noires"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <footer className="bg-gradient-to-br from-primary via-[hsl(var(--earth-brown))] to-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* À Propos */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{t.about}</h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              {t.aboutText}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <span>{t.madeWith} <span className="text-red-400">
                {language === 'fr' ? 'par l\'équipe CDD Tech' : 
                 language === 'en' ? 'by CDD Tech team' : 
                 'ci équipe CDD Tech'}
              </span></span>
            </div>
          </div>

          {/* Liens Rapides */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{t.quickLinks}</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'Accueil' : language === 'en' ? 'Home' : 'Jëkk'}
              </Link>
              <Link to="/gallery" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'Galerie' : language === 'en' ? 'Gallery' : 'Nataal'}
              </Link>
              <Link to="/museum-info" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'À Propos du Musée' : language === 'en' ? 'About Museum' : 'Ci Musée'}
              </Link>
              <Link to="/virtual-tour" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'Visite Virtuelle' : language === 'en' ? 'Virtual Tour' : 'Seet Virtuel'}
              </Link>
              <Link to="/scan" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'Scanner QR' : language === 'en' ? 'Scan QR' : 'Scanner QR'}
              </Link>
              <Link to="/contact" className="block text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300">
                {language === 'fr' ? 'Contact' : language === 'en' ? 'Contact' : 'Contact'}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{t.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{t.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{t.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{t.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{t.website}</span>
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{t.social}</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com/museedescivilisationsnoires" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/museedescivilisationsnoires" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/museedescivilisationsnoires" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-sm text-primary-foreground/80">
                {language === 'fr' ? 'Restez connecté avec nos actualités culturelles' : 
                 language === 'en' ? 'Stay connected with our cultural news' : 
                 'Dëkk ak seen actualités culturelles'}
              </p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-center md:text-left">
              © 2024 Musée des Civilisations Noires. {t.rights}.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {language === 'fr' ? 'Confidentialité' : language === 'en' ? 'Privacy' : 'Confidentialité'}
              </Link>
              <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {language === 'fr' ? 'Conditions' : language === 'en' ? 'Terms' : 'Conditions'}
              </Link>
              <Link to="/accessibility" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {language === 'fr' ? 'Accessibilité' : language === 'en' ? 'Accessibility' : 'Accessibilité'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

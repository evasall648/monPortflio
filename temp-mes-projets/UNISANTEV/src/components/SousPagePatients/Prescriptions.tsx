"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord"; // Importation du ThemeContext
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  FileText,
  Send,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  CalendarIcon,
  Menu,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Imports des images individuelles pour chaque médecin
import FatouBadjiImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/FatouBadji.png";
import AbdouDialloImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/AbdouDiallo.png";
import MariamaKaneImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/MariamaKane.png";
import LindaBasseneImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/LindaBassene.png";
import FatimaGueyeImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/FatimaGueye.png";
import NdeyeAwaDiengImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/NdeyeAwaDieng.png";
import AwaSallImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/AwaSall.png";
import HawaDembaKeitaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/HawaDembaKeita.png";
import AdelineCorreaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/AdelineCorrea.png";
import PaulSarrImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/PaulSarr.png";
import KhadijaBarryImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/KhadijaBarry.png";
import MariamaSamakeImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/MariamaSamake.png";
import MocktarCamaraImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/MocktarCamara.png";
import KrisMemiagueImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/KrisMemiague.png";
import JeanThilbautImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/JeanThilbaut.png";

// Interface pour les données des médecins
interface Medecin {
  nom: string;
  specialite: string;
  image: string; // Image importée
}

// Interface pour les props du composant
interface MedecinProps {
  titre?: string;
}

// Interface pour les spécialités
interface Speciality {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
}

// Interface pour les créneaux horaires
interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

// Interface pour les avis
interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

// Interface pour les FAQ
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Interface pour les données du formulaire de contact
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Interface pour les données du formulaire de rendez-vous
interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  isNewPatient: boolean;
  insurance: string;
}

// Composants utilitaires
const Heart = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Baby = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M10 16c.5.3 1.5.5 2 .5s1.5-.2 2-.5" />
    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

// Liste des médecins avec leurs noms, spécialités et images respectives
const medecins: Medecin[] = [
  { nom: "Dr Fatou Badji", specialite: "Médecine générale", image: FatouBadjiImage },
  { nom: "Dr Abdou Diallo", specialite: "Médecine générale", image: AbdouDialloImage },
  { nom: "Dr Mariama Kane", specialite: "Médecine générale", image: MariamaKaneImage },
  { nom: "Dr Linda Basséne", specialite: "Médecine générale", image: LindaBasseneImage },
  { nom: "Dr Fatima Gueye", specialite: "Médecine générale", image: FatimaGueyeImage },
  { nom: "Dr Ndeye Awa Dieng", specialite: "Cardiologie", image: NdeyeAwaDiengImage },
  { nom: "Dr Awa Sall", specialite: "Cardiologie", image: AwaSallImage },
  { nom: "Dr Hawa Demba Keita", specialite: "Cardiologie", image: HawaDembaKeitaImage },
  { nom: "Dr Adéline Correa", specialite: "Chirurgie", image: AdelineCorreaImage },
  { nom: "Dr Paul Sarr", specialite: "Chirurgie", image: PaulSarrImage },
  { nom: "Dr Khadija Barry", specialite: "Chirurgie", image: KhadijaBarryImage },
  { nom: "Dr Mariama Samaké", specialite: "Radiologie", image: MariamaSamakeImage },
  { nom: "Dr Mocktar Camara", specialite: "Radiologie", image: MocktarCamaraImage },
  { nom: "Dr Kris Memiague", specialite: "Dermatologie", image: KrisMemiagueImage },
  { nom: "Dr Jean Thilbaut", specialite: "Pneumologie", image: JeanThilbautImage },
];

// Composant principal avec props typées
const MedecinComponent: React.FC<MedecinProps> = ({ titre = "Liste des Médecins" }) => {
  const [medecinSelectionne, setMedecinSelectionne] = useState<number | null>(null);
  const themeContext = useContext(ThemeContext); // Utilisation du ThemeContext
  if (!themeContext) {
    throw new Error("Medecin must be used within a ThemeContext.Provider");
  }
  const { isDarkMode } = themeContext;

  const toggleSelection = (index: number) => {
    setMedecinSelectionne(medecinSelectionne === index ? null : index);
  };

  // Composant interne pour les détails du médecin
  const MedecinDetails: React.FC<Medecin> = ({ nom, specialite, image }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const contactFormRef = useRef<HTMLFormElement>(null);
    const appointmentFormRef = useRef<HTMLFormElement>(null);

    const [activeTab, setActiveTab] = useState<"contact" | "appointment">("contact");
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [contactForm, setContactForm] = useState<ContactFormData>({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    const [appointmentForm, setAppointmentForm] = useState<AppointmentFormData>({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      reason: "",
      isNewPatient: false,
      insurance: "",
    });

    useEffect(() => {
      const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      darkModeMediaQuery.addEventListener("change", (e) => {});
      return () => darkModeMediaQuery.removeEventListener("change", () => {});
    }, []);

    useEffect(() => {
      if (mapRef.current) {
        console.log("Carte initialisée pour", nom);
      }
    }, []);

    const specialities: Speciality[] = [
      {
        id: 1,
        name: specialite === "Cardiologie" ? "Cardiologie" : "Médecine générale",
        icon: <Heart className="w-6 h-6" />,
        description: "Diagnostic et traitement des maladies cardiovasculaires",
      },
      {
        id: 2,
        name: "Médecine générale",
        icon: <User className="w-6 h-6" />,
        description: "Soins médicaux primaires pour patients de tous âges",
      },
      {
        id: 3,
        name: "Pédiatrie",
        icon: <Baby className="w-6 h-6" />,
        description: "Soins médicaux spécialisés pour les enfants",
      },
    ];

    const generateTimeSlots = (): TimeSlot[] => {
      const slots: TimeSlot[] = [];
      let id = 1;
      for (let hour = 8; hour < 18; hour++) {
        for (const minute of ["00", "30"]) {
          const available = Math.random() > 0.3;
          slots.push({ id: id++, time: `${hour}:${minute}`, available });
        }
      }
      return slots;
    };

    const timeSlots = generateTimeSlots();

    const reviews: Review[] = [
      {
        id: 1,
        name: "Fatou Diallo",
        rating: 5,
        date: "15/02/2025",
        comment: `${nom} est une excellente médecin. Elle prend le temps d'écouter et d'expliquer clairement les traitements.`,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 2,
        name: "Amadou Ndiaye",
        rating: 4,
        date: "03/01/2025",
        comment: "Très professionnelle et attentionnée. Le cabinet est moderne et bien équipé.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 3,
        name: "Marie Sène",
        rating: 5,
        date: "22/12/2024",
        comment: `Je recommande vivement ${nom} pour sa compétence et sa gentillesse.`,
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ];

    const faqs: FAQ[] = [
      {
        id: 1,
        question: `Comment prendre rendez-vous avec ${nom} ?`,
        answer: "Vous pouvez prendre rendez-vous en ligne via notre formulaire, par téléphone, ou directement au cabinet.",
      },
      {
        id: 2,
        question: "Quelles assurances sont acceptées ?",
        answer: `${nom} accepte la plupart des assurances maladies nationales et privées.`,
      },
      {
        id: 3,
        question: "Que faire en cas d'urgence médicale ?",
        answer: "En cas d'urgence grave, appelez le 15. Pour les urgences moins graves, contactez le cabinet.",
      },
      {
        id: 4,
        question: "Combien de temps dure une consultation ?",
        answer: "Une consultation standard dure environ 20 à 30 minutes.",
      },
      {
        id: 5,
        question: `${nom} effectue-t-elle des visites à domicile ?`,
        answer: "Oui, dans certains cas, sur rendez-vous.",
      },
    ];

    const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAppointmentFormChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { name, value, type } = e.target;
      if (type === "checkbox") {
        const checked = (e.target as HTMLInputElement).checked;
        setAppointmentForm((prev) => ({ ...prev, [name]: checked }));
      } else {
        setAppointmentForm((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Contact form submitted:", contactForm);
        setSubmitSuccess(true);
        setTimeout(() => {
          setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
          setSubmitSuccess(null);
        }, 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleAppointmentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Appointment form submitted:", appointmentForm);
        setSubmitSuccess(true);
        setTimeout(() => {
          setAppointmentForm({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            reason: "",
            isNewPatient: false,
            insurance: "",
          });
          setSubmitSuccess(null);
        }, 3000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    };

    const toggleFAQ = (id: number) => {
      setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <header
          className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className={`w-8 h-8 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
              <h1 className="text-xl font-bold">{nom}</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#about"
                className={`hover:underline ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
              >
                À propos
              </a>
              <a
                href="#services"
                className={`hover:underline ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
              >
                Services
              </a>
              <a
                href="#reviews"
                className={`hover:underline ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
              >
                Avis
              </a>
              <a
                href="#faq"
                className={`hover:underline ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
              >
                FAQ
              </a>
              <button
                onClick={() => setActiveTab("appointment")}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                Prendre RDV
              </button>
            </nav>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`md:hidden overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                  <a
                    href="#about"
                    className={`py-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    À propos
                  </a>
                  <a
                    href="#services"
                    className={`py-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </a>
                  <a
                    href="#reviews"
                    className={`py-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Avis
                  </a>
                  <a
                    href="#faq"
                    className={`py-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <button
                    onClick={() => {
                      setActiveTab("appointment");
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                      isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    Prendre RDV
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section
            className={`rounded-xl overflow-hidden shadow-lg mb-12 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{nom}</h1>
                <h2
                  className={`text-xl md:text-2xl font-semibold mb-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {specialite}
                </h2>
                <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Spécialiste en {specialite.toLowerCase()} avec plus de 15 ans d'expérience. Dévouée à fournir des soins
                  personnalisés et de haute qualité à tous mes patients.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-6 py-3 rounded-md transition-colors duration-300 ${
                      isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    Me contacter
                  </button>
                  <button
                    onClick={() => setActiveTab("appointment")}
                    className={`px-6 py-3 rounded-md border transition-colors duration-300 ${
                      isDarkMode
                        ? "border-green-600 text-green-400 hover:bg-green-900/20"
                        : "border-green-500 text-green-600 hover:bg-green-50"
                    }`}
                  >
                    Prendre rendez-vous
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={image}
                  alt={nom}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=600&width=800";
                  }}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <section
              id="about"
              className={`lg:w-1/3 rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      123 Avenue de la Médecine
                      <br />
                      Dakar, Sénégal
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${isDarkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}
                    >
                      Voir sur la carte
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>+221 77 123 45 67</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Lun-Ven, 8h-18h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${nom.toLowerCase().replace(/\s+/g, ".")}@example.com`}
                      className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}
                    >
                      {nom.toLowerCase().replace(/\s+/g, ".")}@example.com
                    </a>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Réponse sous 24-48h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horaires d'ouverture</h3>
                    <div className={`space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <p>Lundi - Vendredi: 8h - 18h</p>
                      <p>Samedi: 9h - 13h</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={mapRef}
                className={`mt-6 h-48 rounded-lg border transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700 bg-gray-700" : "border-gray-200 bg-gray-100"
                }`}
              >
                <div className="h-full flex items-center justify-center">
                  <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Carte interactive
                    <br />
                    <span className="text-sm">(Intégration Google Maps)</span>
                  </p>
                </div>
              </div>
            </section>

            <section
              className={`lg:w-2/3 rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div
                className={`flex border-b transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <button
                  className={`flex-1 py-4 font-medium transition-colors duration-300 ${
                    activeTab === "contact"
                      ? isDarkMode
                        ? "bg-gray-700 text-green-400 border-b-2 border-green-400"
                        : "bg-gray-50 text-green-600 border-b-2 border-green-500"
                      : isDarkMode
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("contact")}
                >
                  Me contacter
                </button>
                <button
                  className={`flex-1 py-4 font-medium transition-colors duration-300 ${
                    activeTab === "appointment"
                      ? isDarkMode
                        ? "bg-gray-700 text-green-400 border-b-2 border-green-400"
                        : "bg-gray-50 text-green-600 border-b-2 border-green-500"
                      : isDarkMode
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("appointment")}
                >
                  Prendre rendez-vous
                </button>
              </div>

              <div className="p-6">
                {activeTab === "contact" ? (
                  <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Envoyez-moi un message</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <User className="w-5 h-5" />
                          </span>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactFormChange}
                            required
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            }`}
                            placeholder="Votre nom complet"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <Mail className="w-5 h-5" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactFormChange}
                            required
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            }`}
                            placeholder="votre.email@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Téléphone
                      </label>
                      <div
                        className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                            : "bg-white border-gray-300 focus-within:border-green-500"
                        }`}
                      >
                        <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <Phone className="w-5 h-5" />
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactFormChange}
                          className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="77 123 45 67"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Sujet <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                            : "bg-white border-gray-300 focus-within:border-green-500"
                        }`}
                      >
                        <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <FileText className="w-5 h-5" />
                        </span>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactFormChange}
                          required
                          className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Sujet de votre message"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex border rounded-md overflow-hidden transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                            : "bg-white border-gray-300 focus-within:border-green-500"
                        }`}
                      >
                        <span className={`px-3 pt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <MessageSquare className="w-5 h-5" />
                        </span>
                        <textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactFormChange}
                          required
                          rows={5}
                          className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Votre message détaillé..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 rounded-md flex items-center space-x-2 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-800 disabled:text-gray-300"
                            : "bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300 disabled:text-gray-100"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Envoyer le message</span>
                          </>
                        )}
                      </button>
                    </div>
                    {submitSuccess !== null && (
                      <div
                        className={`p-4 rounded-md mt-4 ${
                          submitSuccess
                            ? isDarkMode
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-800"
                            : isDarkMode
                              ? "bg-red-900/30 text-red-400"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {submitSuccess ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                          <span>
                            {submitSuccess
                              ? "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais."
                              : "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."}
                          </span>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <form ref={appointmentFormRef} onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Prendre rendez-vous</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="appointment-name"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <User className="w-5 h-5" />
                          </span>
                          <input
                            type="text"
                            id="appointment-name"
                            name="name"
                            value={appointmentForm.name}
                            onChange={handleAppointmentFormChange}
                            required
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            }`}
                            placeholder="Votre nom complet"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="appointment-email"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <Mail className="w-5 h-5" />
                          </span>
                          <input
                            type="email"
                            id="appointment-email"
                            name="email"
                            value={appointmentForm.email}
                            onChange={handleAppointmentFormChange}
                            required
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            }`}
                            placeholder="votre.email@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="appointment-phone"
                        className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                            : "bg-white border-gray-300 focus-within:border-green-500"
                        }`}
                      >
                        <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <Phone className="w-5 h-5" />
                        </span>
                        <input
                          type="tel"
                          id="appointment-phone"
                          name="phone"
                          value={appointmentForm.phone}
                          onChange={handleAppointmentFormChange}
                          required
                          className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="77 123 45 67"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="appointment-date"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Date <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <CalendarIcon className="w-5 h-5" />
                          </span>
                          <input
                            type="date"
                            id="appointment-date"
                            name="date"
                            value={appointmentForm.date}
                            onChange={handleAppointmentFormChange}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="appointment-time"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Heure <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <span className={`px-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <Clock className="w-5 h-5" />
                          </span>
                          <select
                            id="appointment-time"
                            name="time"
                            value={appointmentForm.time}
                            onChange={handleAppointmentFormChange}
                            required
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                            }`}
                          >
                            <option value="">Sélectionnez une heure</option>
                            {timeSlots
                              .filter((slot) => slot.available)
                              .map((slot) => (
                                <option key={slot.id} value={slot.time}>
                                  {slot.time}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="appointment-reason"
                        className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Motif de la consultation <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={`flex border rounded-md overflow-hidden transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                            : "bg-white border-gray-300 focus-within:border-green-500"
                        }`}
                      >
                        <span className={`px-3 pt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <FileText className="w-5 h-5" />
                        </span>
                        <textarea
                          id="appointment-reason"
                          name="reason"
                          value={appointmentForm.reason}
                          onChange={handleAppointmentFormChange}
                          required
                          rows={3}
                          className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-white placeholder-gray-400"
                              : "bg-white text-gray-900 placeholder-gray-500"
                          }`}
                          placeholder="Décrivez brièvement le motif de votre consultation..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <input
                          type="checkbox"
                          id="new-patient"
                          name="isNewPatient"
                          checked={appointmentForm.isNewPatient}
                          onChange={(e) => setAppointmentForm((prev) => ({ ...prev, isNewPatient: e.target.checked }))}
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="new-patient">Je suis un nouveau patient</label>
                      </div>
                      <div>
                        <label
                          htmlFor="insurance"
                          className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Assurance
                        </label>
                        <div
                          className={`flex items-center border rounded-md overflow-hidden transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                              : "bg-white border-gray-300 focus-within:border-green-500"
                          }`}
                        >
                          <select
                            id="insurance"
                            name="insurance"
                            value={appointmentForm.insurance}
                            onChange={handleAppointmentFormChange}
                            className={`w-full py-2 px-3 outline-none transition-colors duration-300 ${
                              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                            }`}
                          >
                            <option value="">Sélectionnez votre assurance (optionnel)</option>
                            <option value="IPM">IPM</option>
                            <option value="IPRES">IPRES</option>
                            <option value="SUNU Assurance">SUNU Assurance</option>
                            <option value="NSIA">NSIA</option>
                            <option value="Autre">Autre</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-3 rounded-md flex items-center space-x-2 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-800 disabled:text-gray-300"
                            : "bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300 disabled:text-gray-100"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Traitement en cours...</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5" />
                            <span>Confirmer le rendez-vous</span>
                          </>
                        )}
                      </button>
                    </div>
                    {submitSuccess !== null && (
                      <div
                        className={`p-4 rounded-md mt-4 ${
                          submitSuccess
                            ? isDarkMode
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-800"
                            : isDarkMode
                              ? "bg-red-900/30 text-red-400"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {submitSuccess ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                          <span>
                            {submitSuccess
                              ? "Votre demande de rendez-vous a été enregistrée. Vous recevrez une confirmation par email dans les plus brefs délais."
                              : "Une erreur s'est produite lors de la demande de rendez-vous. Veuillez réessayer ou nous contacter par téléphone."}
                          </span>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </section>
          </div>

          <section
            id="services"
            className={`mb-12 rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <h2 className="text-2xl font-bold mb-6">Mes services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialities.map((speciality) => (
                <div
                  key={speciality.id}
                  className={`p-6 rounded-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 hover:border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    {speciality.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{speciality.name}</h3>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{speciality.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="reviews"
            className={`mb-12 rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <h2 className="text-2xl font-bold mb-6">Avis de patients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-6 rounded-lg border transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar}
                      alt={`Avatar de ${review.name}`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=50&width=50";
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{review.date}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <StarRating rating={review.rating} />
                  </div>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{review.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="faq"
            className={`mb-12 rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    className={`w-full flex justify-between items-center p-4 text-left font-medium transition-colors duration-300 ${
                      expandedFAQ === faq.id
                        ? isDarkMode
                          ? "bg-gray-700 text-green-400"
                          : "bg-gray-100 text-green-600"
                        : isDarkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={expandedFAQ === faq.id ? "true" : "false"}
                  >
                    <span>{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-white"
                        }`}
                      >
                        <div
                          className={`p-4 border-t transition-colors duration-300 ${isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-200 text-gray-700"}`}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </main>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          aria-label="Retour en haut"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"}`}>
      <div className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        Médecins  ›  Médecins
      </div>
      <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-gray-200" : "text-black"}`}>
        {titre}
      </h1>
      <div className="space-y-4">
        {medecins.map((medecin, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md transition-colors duration-200 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            role="region"
          >
            <div className="flex items-start gap-4">
              <img
                src={medecin.image}
                alt={`Photo de ${medecin.nom}`}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  console.error(`Erreur de chargement de l'image pour ${medecin.nom}`);
                  e.currentTarget.src = "https://via.placeholder.com/64";
                }}
              />
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                  {medecin.nom}
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {medecin.specialite}
                </p>
                <button
                  onClick={() => toggleSelection(index)}
                  className={`mt-2 hover:underline ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {medecinSelectionne === index ? "Masquer les détails" : "Voir plus"}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {medecinSelectionne === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MedecinDetails {...medecin} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedecinComponent;
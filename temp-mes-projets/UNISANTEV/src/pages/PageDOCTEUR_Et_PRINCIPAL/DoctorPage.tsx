import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FournisseurRendezVous } from "../../components/SousPageDocteur/AppointmentContext";
import TableauDeBord, { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord";
import DetailsRendezVous from "../../components/SousPageDocteur/DetailsRendezVous";
import Medecin from "../../components/SousPageDocteur/Medecin";
import Patients from "../../components/SousPageDocteur/Patients";
import Calendrier from "../../components/SousPageDocteur/Calendrier";
import MailApp from "../../components/SousPageDocteur/Email"; // Import de Email.tsx renommé MailApp
import Messages from "../../components/SousPageDocteur/Messages";
import Task from "../../components/SousPageDocteur/Task";
import Parametres from "../../components/SousPageDocteur/Parametres";
import Contact from "../../components/SousPageDocteur/Apropos";
import { Button } from "../../components/SousPageDocteur/ui/button";

import {
  Bell,
  Home,
  Calendar as CalendarIcon,
  Users,
  UserCircle,
  Settings,
  Mail,
  Clipboard,
  MessageSquare,
  Phone,
  Moon,
  Sun,
} from "lucide-react";
import profileImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/AwaSall.png";

const DoctorPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("tableau-de-bord");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fonction pour changer de page interne
  const handlePageChange = (page: string) => {
    console.log("Changement de page interne vers :", page);
    setCurrentPage(page);
  };

  // Fonction pour basculer entre les modes sombre et clair
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", (!isDarkMode).toString());
    console.log("Mode sombre activé :", !isDarkMode);
  };

  // Charger la préférence de mode sombre au montage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === "true");
      console.log("Mode sombre chargé depuis localStorage :", savedDarkMode);
    }
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("Déconnexion : Redirection vers /PageDOCTEUR_Et_PRINCIPAL/LoginPage");
    navigate("/PageDOCTEUR_Et_PRINCIPAL/LoginPage", { replace: true });
  };

  // Valeur du contexte du thème
  const themeContextValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <FournisseurRendezVous>
          {/* En-tête */}
          <header className={`bg-green-500 p-4 flex justify-between items-center fixed w-full z-50 transition-colors duration-300 ${isDarkMode ? "bg-green-700" : "bg-green-500"}`}>
            <div className="text-white font-bold text-xl">Clinique des Miracles</div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-green-600 transition-colors duration-200"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6 text-yellow-300 animate-pulse" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-200" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-green-600 transition-colors duration-200"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6" />
              </Button>
              <img
                src={profileImage}
                alt="Profil"
                className="h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                onError={() => console.error("Erreur de chargement de l'image profileImage")}
              />
            </div>
          </header>

          {/* Contenu principal */}
          <div className="flex pt-16 w-full">
            {/* Barre latérale */}
            <aside className={`w-64 h-[calc(100vh-4rem)] fixed left-0 top-16 z-40 flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}>
              <div className="flex flex-col items-center py-8 flex-shrink-0">
                <img
                  src={profileImage}
                  alt="Médecin"
                  className="h-20 w-20 rounded-full mb-2 hover:opacity-80 transition-opacity"
                  onError={() => console.error("Erreur de chargement de l'image profileImage")}
                />
                <h3 className={isDarkMode ? "text-gray-200" : "text-gray-700"}>Awa Sall</h3>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>DOCTEUR</p>
              </div>

              <nav className="px-4 flex-1 overflow-y-auto scrollbar-[6px] scrollbar-thumb-gray-300 scrollbar-track-white">
                <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  PRINCIPAL
                </p>
                <ul>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("tableau-de-bord")}
                    >
                      <Home className="h-5 w-5 mr-2" />
                      Tableau de bord
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("rendez-vous")}
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Rendez-vous
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("medecins")}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Médecins
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("patients")}
                    >
                      <UserCircle className="h-5 w-5 mr-2" />
                      Patients
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("calendrier")}
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Calendrier
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("email")}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("messages")}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Messages
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("taches")}
                    >
                      <Clipboard className="h-5 w-5 mr-2" />
                      Tâches
                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("contact")}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      A propos

                    </Button>
                  </li>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("parametres")}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Paramètres
                    </Button>
                  </li>
                  <li className="mt-4">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors duration-200 ${isDarkMode ? "text-red-400 hover:bg-red-900" : "text-red-500 hover:bg-red-100"}`}
                      onClick={handleLogout}
                    >
                      Déconnexion
                    </Button>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Contenu principal */}
            <main className={`ml-64 flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-[6px] ${isDarkMode ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"}`}>
              {currentPage === "tableau-de-bord" && <TableauDeBord />}
              {currentPage === "rendez-vous" && <DetailsRendezVous />}
              {currentPage === "medecins" && <Medecin />}
              {currentPage === "patients" && <Patients />}
              {currentPage === "calendrier" && <Calendrier />}
              {currentPage === "email" && <MailApp />}
              {currentPage === "messages" && <Messages />}
              {currentPage === "taches" && <Task />}
              {currentPage === "contact" && <Contact />}
              {currentPage === "parametres" && <Parametres />}
              {currentPage && ![
                "tableau-de-bord",
                "rendez-vous",
                "medecins",
                "patients",
                "calendrier",
                "email",
                "messages",
                "taches",
                "contact",
                "parametres",
              ].includes(currentPage) && (
                <div className={`${isDarkMode ? "text-red-400" : "text-red-500"}`}>
                  Page non trouvée : {currentPage}
                </div>
              )}
            </main>
          </div>
        </FournisseurRendezVous>
      </div>
    </ThemeContext.Provider>
  );
};

export default DoctorPage;
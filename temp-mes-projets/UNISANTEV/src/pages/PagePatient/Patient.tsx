"use client";

import React, { useState, useEffect } from "react";
import Dashboard from "../../components/SousPagePatients/Dashboard";
import PrendreRendezvous from "../../components/SousPagePatients/PrendreRendezvous";
import RendezVousAujourdhui from "../../components/SousPagePatients/RendezVousAujourdhui";
import Chat from "../../components/SousPagePatients/Chat";
import ConsultationsPassées from "../../components/SousPagePatients/ConsultationsPassées";
import RendezVousAvenir from "../../components/SousPagePatients/RendezVousAvenir";
import DossierMedical from "../../components/SousPagePatients/DossierMedical";
import Facturation from "../../components/SousPagePatients/Facturation";
import Prescriptions from "../../components/SousPagePatients/Prescriptions";
import Parametres from "../../components/SousPagePatients/Parametres";
import Localisation from "../../components/SousPagePatients/localisation";
import Deconnexion from "../../components/SousPagePatients/Deconnexion";
import { Sun, Moon } from "lucide-react";
import hawaPhoto from "../../assets/Image_Patient/hawa.jpg"; // Import de la photo de Hawa Demba Keita

const Patient: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const defaultProfilePhoto = hawaPhoto;

  useEffect(() => {
    console.log("useEffect exécuté");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    const savedPhoto = localStorage.getItem("profilePhoto");
    console.log("Photo sauvegardée :", savedPhoto);
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    } else {
      console.log("Utilisation de la photo par défaut :", defaultProfilePhoto);
      setProfilePhoto(defaultProfilePhoto);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setPhotoError("Veuillez sélectionner une image (JPEG, PNG, etc.)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        localStorage.setItem("profilePhoto", base64String);
        setPhotoError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setActiveSubSection(null);
  };

  const handleSubSectionClick = (subSection: string) => {
    setActiveSubSection(subSection === activeSubSection ? null : subSection);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <header
        className={`${
          isDarkMode ? "bg-green-700" : "bg-green-500"
        } p-4 flex justify-between items-center fixed w-full z-50 h-16`}
      >
        <div className="flex items-center">
          <div className="text-white font-bold text-xl mr-4 flex items-center">
            <span className="mr-2">➕</span> Clinique des Miracles
          </div>
          <button
            className="text-white hover:text-gray-200 transition-colors duration-200"
            title="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="text-white mr-4 hover:text-gray-200 transition-colors duration-200"
            title="Notifications"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button
            className="text-white mr-4 hover:text-gray-200 transition-colors duration-200"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        <aside
          className={`w-64 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } fixed left-0 top-16 bottom-0 shadow-md overflow-y-auto`}
        >
          <nav className="p-4 space-y-4">
            <div className={`flex items-center p-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <div className="relative">
                <label htmlFor="profilePhoto" className="cursor-pointer">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Photo de Hawa Demba Keita"
                      className="h-24 w-24 rounded-full mr-4 object-cover" // Taille augmentée de h-12 w-12 à h-24 w-24
                      onError={(e) => (e.currentTarget.src = "/default-moi.jpg")}
                    />
                  ) : (
                    <div
                      className={`h-24 w-24 rounded-full mr-4 flex items-center justify-center ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } border-2 border-dashed ${
                        isDarkMode ? "border-gray-500" : "border-gray-400"
                      } text-sm text-center`} // Taille augmentée ici aussi
                    >
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Ajouter</span>
                    </div>
                  )}
                </label>
                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  required
                />
              </div>
              <div>
                <div className="font-bold">Hawa Demba Keita</div>
                <div className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                  PATIENT
                </div>
                {photoError && (
                  <div className="text-red-500 text-xs mt-1">{photoError}</div>
                )}
                {!profilePhoto && !photoError && (
                  <div className="text-red-500 text-xs mt-1">Photo obligatoire</div>
                )}
              </div>
            </div>

            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "dashboard"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("dashboard")}
              title="Tableau de bord"
            >
              <span className="mr-2">📊</span> Tableau de bord
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "rendezvous"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("rendezvous")}
              title="Rendez-vous"
            >
              <span className="mr-2">📅</span> Rendez-vous
            </button>
            {activeSection === "rendezvous" && (
              <div className="pl-6 space-y-2">
                <button
                  className={`w-full flex items-center p-2 ${
                    activeSubSection === "prendre"
                      ? isDarkMode
                        ? "text-green-400 bg-gray-700"
                        : "text-green-500 bg-green-100"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  } rounded transition-colors duration-200`}
                  onClick={() => handleSubSectionClick("prendre")}
                  title="Prendre rendez-vous"
                >
                  <span className="mr-2">➕</span> Prendre rendez-vous
                </button>
                <button
                  className={`w-full flex items-center p-2 ${
                    activeSubSection === "aujourdhui"
                      ? isDarkMode
                        ? "text-green-400 bg-gray-700"
                        : "text-green-500 bg-green-100"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  } rounded transition-colors duration-200`}
                  onClick={() => handleSubSectionClick("aujourdhui")}
                  title="Rendez-vous d'aujourd'hui"
                >
                  <span className="mr-2">📅</span> Rendez-vous d'aujourd'hui
                </button>
                <button
                  className={`w-full flex items-center p-2 ${
                    activeSubSection === "avenir"
                      ? isDarkMode
                        ? "text-green-400 bg-gray-700"
                        : "text-green-500 bg-green-100"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  } rounded transition-colors duration-200`}
                  onClick={() => handleSubSectionClick("avenir")}
                  title="Rendez-vous à venir"
                >
                  <span className="mr-2">⏩</span> Rendez-vous à venir
                </button>
                <button
                  className={`w-full flex items-center p-2 ${
                    activeSubSection === "passees"
                      ? isDarkMode
                        ? "text-green-400 bg-gray-700"
                        : "text-green-500 bg-green-100"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-200"
                  } rounded transition-colors duration-200`}
                  onClick={() => handleSubSectionClick("passees")}
                  title="Consultations passées"
                >
                  <span className="mr-2">⏪</span> Consultations passées
                </button>
              </div>
            )}
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "prescriptions"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("prescriptions")}
              title="Prescriptions"
            >
              <span className="mr-2">💊</span> Medecins
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "facturation"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("facturation")}
              title="Facturation"
            >
              <span className="mr-2">💸</span> Facturation
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "dossier-medical"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("dossier-medical")}
              title="Dossier Médical"
            >
              <span className="mr-2">📋</span> Dossier Médical
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "chat"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("chat")}
              title="Chat"
            >
              <span className="mr-2">💬</span> Chat
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "parametres"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("parametres")}
              title="Paramètres"
            >
              <span className="mr-2">⚙️</span> Paramètres
            </button>
            <button
              className={`w-full flex items-center p-2 ${
                activeSection === "localisation"
                  ? isDarkMode
                    ? "text-green-400 bg-gray-700"
                    : "text-green-500 bg-green-100"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              } rounded transition-colors duration-200`}
              onClick={() => handleSectionClick("localisation")}
              title="Localisation"
            >
              <span className="mr-2">📍</span> Localisation
            </button>
            <Deconnexion onLogout={handleLogout} />
          </nav>
        </aside>

        <main
          className={`ml-64 flex-1 p-8 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
          } min-h-[calc(100vh-4rem)]`}
        >
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "rendezvous" && (
            <div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-white"
              } rounded-lg shadow-md p-6`}
            >
              <h2 className="text-xl font-semibold mb-4">
                {activeSubSection === "prendre" && "Prendre Rendez-vous"}
                {activeSubSection === "aujourdhui" && "Rendez-vous d'Aujourd'hui"}
                {activeSubSection === "avenir" && "Rendez-vous à Venir"}
                {activeSubSection === "passees" && "Consultations passées"}
                {!activeSubSection && "Rendez-vous"}
              </h2>
              {activeSubSection === "prendre" && <PrendreRendezvous />}
              {activeSubSection === "aujourdhui" && <RendezVousAujourdhui />}
              {activeSubSection === "avenir" && <RendezVousAvenir />}
              {activeSubSection === "passees" && <ConsultationsPassées />}
            </div>
          )}
          {activeSection === "prescriptions" && <Prescriptions />}
          {activeSection === "facturation" && <Facturation />}
          {activeSection === "dossier-medical" && <DossierMedical />}
          {activeSection === "chat" && <Chat />}
          {activeSection === "parametres" && <Parametres />}
          {activeSection === "localisation" && <Localisation />}
        </main>
      </div>
    </div>
  );
};

export default Patient;
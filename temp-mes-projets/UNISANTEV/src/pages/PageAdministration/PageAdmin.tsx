import React, { useState, createContext } from "react";
import { FournisseurRendezVous } from "../../components/SousPageAdministration/AppointmentContext";
import TableauDeBord1 from "../../components/SousPageAdministration/TableauDeBord1";
import TableauDeBord2 from "../../components/SousPageAdministration/TableauDeBord2";
import TableauDeBordMedecin from "../../components/SousPageAdministration/TableauDeBordMedecin";
import TableauDeBordPatient from "../../components/SousPageAdministration/TableauDeBordPatient";
import DetailsRendezVous from "../../components/SousPageAdministration/DetailsRendezVous";
import Medecin from "../../components/SousPageAdministration/Medecin";
import Patients from "../../components/SousPageAdministration/Patients";
import AttributionDesChambres from "../../components/SousPageAdministration/AttributionDesChambres";
import Medicaments from "../../components/SousPageAdministration/Medicaments";
import ListeDesStocks from "../../components/SousPageAdministration/ListeDesStocks";
import StockDeSang from "../../components/SousPageAdministration/StockDeSang";
import DonneurDeSang from "../../components/SousPageAdministration/DonneurDeSang";
import ListeDesFactures from "../../components/SousPageAdministration/ListeDesFactures";
import Depenses from "../../components/SousPageAdministration/Depenses";
import Taches from "../../components/SousPageAdministration/Taches";
import Calendrier from "../../components/SousPageAdministration/Calendrier";
import Contacts from "../../components/SousPageAdministration/Contact";
import Email from "../../components/SousPageAdministration/Email";

import { Button } from "../../components/SousPageAdministration/ui/button";
import Profil from "../../assets/Image_Administration/Profil.jpg";
import { Bell, Home, Calendar as CalendarIcon, Users, UserCircle, Settings, Mail, Clipboard, Phone, LogOut, Moon } from "lucide-react";

// Définir le ThemeContext
interface ThemeContextType {
  isDarkMode: boolean;
}
export const ThemeContext = createContext<ThemeContextType>({ isDarkMode: false });

const PageAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("tableau-de-bord");
  const [subMenuVisibility, setSubMenuVisibility] = useState({
    dashboard: false,
    appointment: false,
    room: false,
    pharmacy: false,
    bloodBank: false,
    accounts: false,
    email: false,
    taches: false,
    contact: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handlePageChange = (page: string, isSubMenu: boolean = false) => {
    setCurrentPage(page);
    if (!isSubMenu) {
      setSubMenuVisibility((prev) => ({
        ...prev,
        dashboard: page === "tableau-de-bord" ? !prev.dashboard : prev.dashboard,
        appointment: page === "rendez-vous" ? !prev.appointment : prev.appointment,
        room: page === "attribution-des-chambres" ? !prev.room : prev.room,
        pharmacy: page === "pharmacie" ? !prev.pharmacy : prev.pharmacy,
        bloodBank: page === "banque-du-sang" ? !prev.bloodBank : prev.bloodBank,
        accounts: page === "comptes" ? !prev.accounts : prev.accounts,
        email: page === "Email" ? !prev.email : prev.email,
        taches: page === "tache" ? !prev.taches : prev.taches,
        contact: page === "contacts" ? !prev.contact : prev.contact,
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      
      case "dashboard-medecin": return "Tableau de Bord Médecin";
      case "dashboard-patient": return "Tableau de Bord Patient";
      case "rendez-vous": return "Rendez-vous";
      case "view-appointment": return "Détail des Rendez-vous";
      case "medecins": return "Médecins";
      case "patient": return "Patients";
      case "attribution-des-chambres": return "Attribution des Chambres";
      case "pharmacie": return "Pharmacie";

      case "blood-donor": return "Donneur de Sang";
      case "comptes": return "Comptes";
  
      case "Email": return "Email";
      case "rediger-mail": return "Rédiger Mail";
      case "tache": return "Tâches";
      case "calendrier": return "Calendrier";
      case "contacts": return "Contacts";
      default: return "";
    }
  };

  const notifications = [
    "Vous avez un nouveau message de Dr. Ndeye Awa Dieng",
    "Rappel : Réunion à 14h",
    "Nouvelle demande de rendez-vous",
  ];

  return (
    <ThemeContext.Provider value={{ isDarkMode: darkMode }}>
      <FournisseurRendezVous>
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} flex`}>
          <header className="bg-[green] p-4 flex justify-between items-center fixed w-full z-50">
            <div className="text-white font-bold text-xl">Clinique des Miracles</div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleDarkMode}>
                <Moon className="h-6 w-6" />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-white" onClick={toggleNotifications}>
                  <Bell className="h-6 w-6" />
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Notifications</h3>
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index} className="text-gray-700 mb-1">{notification}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="text-white" onClick={handleLogout}>
                <LogOut className="h-6 w-6" />
              </Button>
            </div>
          </header>

          <div className="flex pt-16 w-full">
            <aside className={`w-64 ${darkMode ? "bg-gray-800" : "bg-white"} h-[calc(100vh-4rem)] fixed left-0 top-16 z-40 flex flex-col`}>
              <div className="flex flex-col items-center py-9 flex-shrink-0">
                <img src={Profil} alt="Admin" className="h-20 w-20 rounded-full mb-2" />
                <h3 className={`${darkMode ? "text-white" : "text-gray-900"} font-bold`}>Ndéye Awa Dieng</h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm`}>ADMINISTRATEUR</p>
              </div>

              <nav className="px-4 flex-1 overflow-y-auto">
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-2`}>PRINCIPAL</p>
                <ul>
                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("tableau-de-bord")}
                    >
                      <Home className="h-5 w-5 mr-2" /> Tableau de bord
                    </Button>
                    {subMenuVisibility.dashboard && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("dashboard1", true)}
                          >
                            Tableau de bord 1
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("dashboard2", true)}
                          >
                            Tableau de bord 2
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("dashboard-medecin", true)}
                          >
                            Tableau de bord Médecin
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("dashboard-patient", true)}
                          >
                            Tableau de bord Patient
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("rendez-vous")}
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" /> Rendez-vous
                    </Button>
                    {subMenuVisibility.appointment && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("view-appointment", true)}
                          >
                            Détails des rendez-vous
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("medecins")}
                    >
                      <Users className="h-5 w-5 mr-2" /> Médecins
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("patient")}
                    >
                      <UserCircle className="h-5 w-5 mr-2" /> Patient
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("attribution-des-chambres")}
                    >
                      <Home className="h-5 w-5 mr-2" /> Attribution des chambres
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("pharmacie")}
                    >
                      <Clipboard className="h-5 w-5 mr-2" /> Pharmacie
                    </Button>
                    {subMenuVisibility.pharmacy && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("medicaments", true)}
                          >
                            Médicaments
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("liste-des-stocks", true)}
                          >
                            Liste des stocks
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("banque-du-sang")}
                    >
                      <UserCircle className="h-5 w-5 mr-2" /> Banque du sang
                    </Button>
                    {subMenuVisibility.bloodBank && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("blood-stock", true)}
                          >
                            Stock de sang
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("blood-donor", true)}
                          >
                            Donneur de sang
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("comptes")}
                    >
                      <Settings className="h-5 w-5 mr-2" /> Comptes
                    </Button>
                    {subMenuVisibility.accounts && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("bill-list", true)}
                          >
                            Liste des factures
                          </Button>
                        </li>
                        <li className="mb-2">
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => handlePageChange("expenses", true)}
                          >
                            Dépenses
                          </Button>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("Email")}
                    >
                      <Mail className="h-5 w-5 mr-2" /> Email
                    </Button>
                    {subMenuVisibility.email && (
                      <ul className="ml-4 mt-2">
                        <li className="mb-2">
                    
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("tache")}
                    >
                      <Clipboard className="h-5 w-5 mr-2" /> Tâches
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("calendrier")}
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" /> Calendrier
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={() => handlePageChange("contacts")}
                    >
                      <Phone className="h-5 w-5 mr-2" /> Contacts
                    </Button>
                  </li>

                  <li className="mb-2">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" /> Déconnexion
                    </Button>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className={`ml-64 flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)] ${darkMode ? "bg-gray-900" : "bg-white"}`}>
              <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>{getPageTitle()}</h1>
              {currentPage === "tableau-de-bord" && <TableauDeBord1 />}
              {currentPage === "dashboard1" && <TableauDeBord1 />}
              {currentPage === "dashboard2" && <TableauDeBord2 />}
              {currentPage === "dashboard-medecin" && <TableauDeBordMedecin />}
              {currentPage === "dashboard-patient" && <TableauDeBordPatient />}
              {currentPage === "rendez-vous" && <DetailsRendezVous />}
              {currentPage === "view-appointment" && <DetailsRendezVous />}
              {currentPage === "medecins" && <Medecin />}
              {currentPage === "patient" && <Patients />}
              {currentPage === "attribution-des-chambres" && <AttributionDesChambres />}
              {currentPage === "pharmacie" && <Medicaments />}
              {currentPage === "medicaments" && <Medicaments />}
              {currentPage === "liste-des-stocks" && <ListeDesStocks />}
              {currentPage === "banque-du-sang" && <StockDeSang />}
              {currentPage === "blood-stock" && <StockDeSang />}
              {currentPage === "blood-donor" && <DonneurDeSang />}
              {currentPage === "comptes" && <ListeDesFactures />}
              {currentPage === "bill-list" && <ListeDesFactures />}
              {currentPage === "expenses" && <Depenses />}
              {currentPage === "tache" && <Taches />}
              {currentPage === "calendrier" && <Calendrier />}
              {currentPage === "contacts" && <Contacts />}
              {currentPage === "Email" && <Email />}
        
            </main>
          </div>
        </div>
      </FournisseurRendezVous>
    </ThemeContext.Provider>
  );
};

export default PageAdmin;
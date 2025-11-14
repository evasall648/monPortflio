"use client";

import React, { useContext, useState, useMemo } from "react";
import { ContexteRendezVous } from "./AppointmentContext";
import { ThemeContext } from "./TableauDeBord";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaEye, FaCheck, FaTimes, FaDownload, FaUser, FaCalendar, FaClock, FaEnvelope, FaPhone, FaVenusMars, FaEllipsisV, FaHourglassHalf } from "react-icons/fa";
import { Menu } from "@headlessui/react";

// Types
type Historique = {
  date: string;
  heure: string;
  statut: string;
  notesMedicales?: string;
};

type Patient = {
  nom: string;
  prenom: string;
  date: string;
  heure: string;
  email: string;
  telephone: string;
  genre: string;
  statut: string;
  historique: Historique[];
};

// Interface pour les traductions
interface Translation {
  firstName: string;
  lastName: string;
  date: string;
  time: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  actions: string;
  searchPlaceholder: string;
  filterByStatus: string;
  allStatuses: string;
  approved: string;
  pending: string;
  refused: string;
  patientList: string;
  previous: string;
  next: string;
  exportCSV: string;
  details: string;
  approve: string;
  cancel: string;
  pendingAction: string; // Ajout pour "En attente" dans les actions
  close: string;
  pastAppointments: string;
  noHistory: string;
  notes: string;
}

interface Translations {
  fr: Translation;
}

// Traductions avec typage explicite
const translations: Translations = {
  fr: {
    firstName: "Prénom",
    lastName: "Nom",
    date: "Date",
    time: "Heure",
    email: "Email",
    phone: "Téléphone",
    gender: "Genre",
    status: "Statut",
    actions: "Actions",
    searchPlaceholder: "Rechercher un patient...",
    filterByStatus: "Filtrer par statut",
    allStatuses: "Tous les statuts",
    approved: "Approuvé",
    pending: "En attente",
    refused: "Refusé",
    patientList: "Liste des Rendez-vous",
    previous: "Précédent",
    next: "Suivant",
    exportCSV: "Exporter en CSV",
    details: "Détails",
    approve: "Approuver",
    cancel: "Annuler",
    pendingAction: "Mettre en attente", // Ajout pour le menu des actions
    close: "Fermer",
    pastAppointments: "Historique des Rendez-vous",
    noHistory: "Aucun historique disponible",
    notes: "Notes",
  },
};

// Données initiales des patients avec historique enrichi
const initialPatients: Patient[] = [
  {
    nom: "Sall",
    prenom: "Ndeye",
    date: "2025-03-20",
    heure: "10:00",
    email: "sallndeye1@gmail.com",
    telephone: "770000000",
    genre: "Femme",
    statut: "Approuvé",
    historique: [
      { date: "2024-12-15", heure: "09:30", statut: "Terminé", notesMedicales: "Consultation générale, tout va bien" },
      { date: "2025-01-10", heure: "14:00", statut: "Terminé", notesMedicales: "Suivi post-opératoire" },
    ],
  },
  {
    nom: "Diop",
    prenom: "Aliou",
    date: "2025-03-26",
    heure: "10:00",
    email: "aliou.diop@gmail.com",
    telephone: "770000000",
    genre: "Homme",
    statut: "En attente",
    historique: [
      { date: "2024-11-20", heure: "11:00", statut: "Annulé", notesMedicales: "Patient absent" },
      { date: "2025-02-05", heure: "15:00", statut: "Terminé", notesMedicales: "Examen de routine" },
    ],
  },
  {
    nom: "Ba",
    prenom: "Aissatou",
    date: "2025-03-26",
    heure: "10:00",
    email: "aissatou.ba@gmail.com",
    telephone: "771000000",
    genre: "Femme",
    statut: "Approuvé",
    historique: [
      { date: "2024-10-10", heure: "08:30", statut: "Terminé", notesMedicales: "Consultation prénatale" },
    ],
  },
  {
    nom: "Sy",
    prenom: "Mamadou",
    date: "2025-03-28",
    heure: "10:00",
    email: "mamadou.sy@example.com",
    telephone: "771000002",
    genre: "Homme",
    statut: "Refusé",
    historique: [
      { date: "2025-01-25", heure: "13:00", statut: "Terminé", notesMedicales: "Douleurs dorsales traitées" },
      { date: "2025-02-20", heure: "10:30", statut: "Annulé", notesMedicales: "Patient a reporté" },
    ],
  },
  {
    nom: "Fall",
    prenom: "Awa",
    date: "2025-03-28",
    heure: "10:00",
    email: "awa.fall@gmail.com",
    telephone: "771000005",
    genre: "Femme",
    statut: "En attente",
    historique: [
      { date: "2024-12-01", heure: "16:00", statut: "Terminé", notesMedicales: "Vaccination effectuée" },
    ],
  },
  {
    nom: "Gaye",
    prenom: "Cheikh",
    date: "2025-03-28",
    heure: "10:00",
    email: "cheikh.gaye@example.com",
    telephone: "771000002",
    genre: "Homme",
    statut: "Approuvé",
    historique: [
      { date: "2025-02-15", heure: "09:00", statut: "Terminé", notesMedicales: "Contrôle annuel" },
    ],
  },
  {
    nom: "Ndour",
    prenom: "Fatou",
    date: "2025-03-28",
    heure: "10:00",
    email: "fatou.ndour@example.com",
    telephone: "771000045",
    genre: "Femme",
    statut: "Refusé",
    historique: [
      { date: "2024-11-15", heure: "14:30", statut: "Terminé", notesMedicales: "Consultation dermatologique" },
      { date: "2025-01-30", heure: "11:00", statut: "Refusé", notesMedicales: "Non conforme aux critères" },
    ],
  },
  {
    nom: "Mbaye",
    prenom: "Ibrahima",
    date: "2025-03-28",
    heure: "10:00",
    email: "ibrahima.mbaye@example.com",
    telephone: "771000047",
    genre: "Homme",
    statut: "En attente",
    historique: [
      { date: "2024-10-25", heure: "10:00", statut: "Terminé", notesMedicales: "Examen ophtalmologique" },
      { date: "2025-02-10", heure: "15:30", statut: "Terminé", notesMedicales: "Suivi lunettes" },
    ],
  },
  {
    nom: "Sene",
    prenom: "Moussa",
    date: "2025-03-28",
    heure: "10:00",
    email: "moussa.sene@example.com",
    telephone: "773020000",
    genre: "Homme",
    statut: "Approuvé",
    historique: [
      { date: "2025-01-05", heure: "12:00", statut: "Terminé", notesMedicales: "Consultation générale" },
    ],
  },
];

const ITEMS_PER_PAGE = 5;

const DetailsRendezVous: React.FC = () => {
  const contexte = useContext(ContexteRendezVous);
  const theme = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof Patient | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [lang] = useState<"fr">("fr");

  const t: Translation = translations[lang];

  if (!contexte) {
    return (
      <div className={`p-4 ${theme?.isDarkMode ? "bg-green-800 text-white" : "bg-green-600 text-white"} rounded-lg shadow-md`}>
        Erreur: Contexte non disponible
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="p-4 bg-red-600 text-white rounded-lg shadow-md">
        Erreur: Contexte de thème non disponible
      </div>
    );
  }

  const { isDarkMode } = theme;

  // Validation des données
  const validatePatient = (patient: Patient): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;
    const isEmailUnique = !patients.some(
      (p) => p.email === patient.email && (p.nom !== patient.nom || p.prenom !== patient.prenom)
    );
    return (
      emailRegex.test(patient.email) &&
      phoneRegex.test(patient.telephone) &&
      isEmailUnique &&
      patient.nom.trim() !== "" &&
      patient.prenom.trim() !== ""
    );
  };

  // Fonction pour abréger les emails
  const abbreviateEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return name.length > 10 ? `${name.slice(0, 7)}...@${domain}` : email;
  };

  // Filtrage et tri optimisés avec useMemo
  const filteredPatients = useMemo(() => {
    let result = patients.filter((patient) =>
      `${patient.prenom} ${patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "Tous") {
      result = result.filter((patient) => patient.statut === statusFilter);
    }

    if (dateFilter) {
      result = result.filter((patient) => patient.date === dateFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    return result;
  }, [patients, searchTerm, statusFilter, dateFilter, sortField, sortDirection]);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  // Gestion du tri
  const handleSort = (field: keyof Patient) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Gestion des actions
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Approuvé":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "Refusé":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      case "En attente":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Terminé":
        return <FaCheck className="text-green-500 dark:text-green-400" />;
      case "Annulé":
        return <FaTimes className="text-red-500 dark:text-red-400" />;
      case "Refusé":
        return <FaTimes className="text-gray-500 dark:text-gray-400" />;
      default:
        return null;
    }
  };

  const handleModalOpen = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleApprovePatient = (nom: string, prenom: string) => {
    setPatients(patients.map((p) =>
      p.nom === nom && p.prenom === prenom ? { ...p, statut: "Approuvé" } : p
    ));
    toast.success("Rendez-vous approuvé !", { position: "top-right" });
  };

  const handleCancelPatient = (nom: string, prenom: string) => {
    setPatients(patients.map((p) =>
      p.nom === nom && p.prenom === prenom ? { ...p, statut: "Refusé" } : p
    ));
    toast.success("Rendez-vous refusé !", { position: "top-right" });
  };

  const handlePendingPatient = (nom: string, prenom: string) => {
    setPatients(patients.map((p) =>
      p.nom === nom && p.prenom === prenom ? { ...p, statut: "En attente" } : p
    ));
    toast.success("Rendez-vous mis en attente !", { position: "top-right" });
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
      <ToastContainer />
      <div className={`max-w-7xl mx-auto rounded-xl shadow-lg p-6 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
          {t.patientList}
        </h2>

        {/* Filtres et Recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="statusFilter" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t.filterByStatus}
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
            >
              <option value="Tous">{t.allStatuses}</option>
              <option value="Approuvé">{t.approved}</option>
              <option value="En attente">{t.pending}</option>
              <option value="Refusé">{t.refused}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="dateFilter" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Filtrer par date
            </label>
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
            />
          </div>
        </div>

        {/* Tableau (avec mode cartes pour mobile) */}
        <div className={`overflow-x-auto rounded-lg border shadow-md md:block hidden ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${isDarkMode ? "bg-green-800 text-gray-200" : "bg-green-600 text-white"}`}>
              <tr>
                {[
                  { field: "prenom", icon: <FaUser />, label: t.firstName },
                  { field: "nom", icon: <FaUser />, label: t.lastName },
                  { field: "date", icon: <FaCalendar />, label: t.date },
                  { field: "heure", icon: <FaClock />, label: t.time },
                  { field: "email", icon: <FaEnvelope />, label: t.email },
                  { field: "telephone", icon: <FaPhone />, label: t.phone },
                  { field: "genre", icon: <FaVenusMars />, label: t.gender },
                  { field: "statut", icon: null, label: t.status },
                ].map(({ field, icon, label }) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field as keyof Patient)}
                    className={`p-4 text-left text-sm font-semibold uppercase cursor-pointer transition ${isDarkMode ? "hover:bg-green-900" : "hover:bg-green-700"}`}
                  >
                    <div className="flex items-center gap-2">
                      {icon}
                      {label}
                      {sortField === field && (
                        <FaSort className={sortDirection === "asc" ? "rotate-180" : ""} />
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4 text-left text-sm font-semibold uppercase">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? "divide-gray-700 bg-gray-800 text-gray-200" : "divide-gray-200 bg-white text-gray-800"}`}>
              {paginatedPatients.map((patient, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`transition duration-200 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                >
                  <td className="p-4">{patient.prenom}</td>
                  <td className="p-4">{patient.nom}</td>
                  <td className="p-4">{patient.date}</td>
                  <td className="p-4">{patient.heure}</td>
                  <td className="p-4">{abbreviateEmail(patient.email)}</td>
                  <td className="p-4">{patient.telephone}</td>
                  <td className="p-4">{patient.genre}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        patient.statut
                      )}`}
                    >
                      {patient.statut}
                    </span>
                  </td>
                  <td className="p-4">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className={`p-2 rounded-full transition ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-600"}`}>
                        <FaEllipsisV />
                      </Menu.Button>
                      <Menu.Items className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg z-10 ${isDarkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleModalOpen(patient)}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 dark:text-green-400`}
                              >
                                <FaEye /> {t.details}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleApprovePatient(patient.nom, patient.prenom)}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 dark:text-green-400`}
                              >
                                <FaCheck /> {t.approve}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handlePendingPatient(patient.nom, patient.prenom)}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400`}
                              >
                                <FaHourglassHalf /> {t.pendingAction}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleCancelPatient(patient.nom, patient.prenom)}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                              >
                                <FaTimes /> {t.cancel}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mode cartes pour mobile */}
        <div className="md:hidden space-y-4">
          {paginatedPatients.map((patient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg shadow-md border ${isDarkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}
            >
              <div className="space-y-2">
                <p><strong>{t.firstName} :</strong> {patient.prenom}</p>
                <p><strong>{t.lastName} :</strong> {patient.nom}</p>
                <p><strong>{t.date} :</strong> {patient.date}</p>
                <p><strong>{t.time} :</strong> {patient.heure}</p>
                <p><strong>{t.email} :</strong> {abbreviateEmail(patient.email)}</p>
                <p><strong>{t.phone} :</strong> {patient.telephone}</p>
                <p><strong>{t.gender} :</strong> {patient.genre}</p>
                <p>
                  <strong>{t.status} :</strong>{" "}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.statut)}`}>
                    {patient.statut}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleModalOpen(patient)}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  title={t.details}
                >
                  <FaEye /> <span className="sr-only">{t.details}</span>
                </button>
                <button
                  onClick={() => handleApprovePatient(patient.nom, patient.prenom)}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  title={t.approve}
                >
                  <FaCheck /> <span className="sr-only">{t.approve}</span>
                </button>
                <button
                  onClick={() => handlePendingPatient(patient.nom, patient.prenom)}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-yellow-700 text-white hover:bg-yellow-600" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
                  title={t.pendingAction}
                >
                  <FaHourglassHalf /> <span className="sr-only">{t.pendingAction}</span>
                </button>
                <button
                  onClick={() => handleCancelPatient(patient.nom, patient.prenom)}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-red-700 text-white hover:bg-red-600" : "bg-red-600 text-white hover:bg-red-700"}`}
                  title={t.cancel}
                >
                  <FaTimes /> <span className="sr-only">{t.cancel}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md transition ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600 disabled:bg-gray-600" : "bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"}`}
          >
            {t.previous}
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg shadow-sm ${currentPage === page ? (isDarkMode ? "bg-green-700 text-white" : "bg-green-600 text-white") : (isDarkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300")}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md transition ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600 disabled:bg-gray-600" : "bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"}`}
          >
            {t.next}
          </button>
        </div>

        {/* Export CSV */}
        <CSVLink
          data={patients}
          filename={"historique_patients.csv"}
          className={`mt-4 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
        >
          <FaDownload /> {t.exportCSV}
        </CSVLink>

        {/* Modale modernisée avec hauteur limitée pour le formulaire */}
        <AnimatePresence>
          {modalOpen && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh] ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}
              >
                {/* En-tête */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                    {`${selectedPatient.prenom} ${selectedPatient.nom}`}
                  </h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedPatient.statut
                    )}`}
                  >
                    {selectedPatient.statut}
                  </span>
                </div>

                {/* Informations principales avec hauteur limitée */}
                <div className="grid grid-cols-1 gap-4 mb-6 max-h-64 overflow-y-auto">
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FaCalendar className="text-green-500 dark:text-green-400" />
                    <span><strong>{t.date} :</strong> {selectedPatient.date}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FaClock className="text-green-500 dark:text-green-400" />
                    <span><strong>{t.time} :</strong> {selectedPatient.heure}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FaEnvelope className="text-green-500 dark:text-green-400" />
                    <span><strong>{t.email} :</strong> {selectedPatient.email}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FaPhone className="text-green-500 dark:text-green-400" />
                    <span><strong>{t.phone} :</strong> {selectedPatient.telephone}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <FaVenusMars className="text-green-500 dark:text-green-400" />
                    <span><strong>{t.gender} :</strong> {selectedPatient.genre}</span>
                  </div>
                </div>

                {/* Historique des rendez-vous */}
                <div className={`border-t pt-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {t.pastAppointments}
                  </h4>
                  {selectedPatient.historique.length > 0 ? (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {selectedPatient.historique.map((rendezVous, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg shadow-sm border ${isDarkMode ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-gray-50 text-gray-600 border-gray-100"}`}
                        >
                          <div className="text-sm flex items-start gap-2">
                            {getStatusIcon(rendezVous.statut)}
                            <div>
                              <p><strong>{t.date} :</strong> {rendezVous.date}</p>
                              <p><strong>{t.time} :</strong> {rendezVous.heure}</p>
                              <p><strong>{t.status} :</strong> {rendezVous.statut}</p>
                              <p className="mt-1">
                                <strong>{t.notes} :</strong>{" "}
                                <span className={`italic ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  {rendezVous.notesMedicales || t.noHistory}
                                </span>
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-sm italic ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {t.noHistory}
                    </p>
                  )}
                </div>

                {/* Boutons */}
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleModalClose}
                    className={`flex-1 py-2.5 rounded-lg transition duration-200 font-medium shadow-md ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  >
                    {t.close}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetailsRendezVous;
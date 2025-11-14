"use client";

import React, { useContext, useState, useMemo } from "react";
import { ContexteRendezVous } from "./AppointmentContext";
import { useTheme } from "./ThemeContext"; // Importation par défaut
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import { motion, AnimatePresence } from "framer-motion";
import { FaSort, FaEye, FaCheck, FaTimes, FaDownload, FaUser, FaCalendar, FaClock, FaEnvelope, FaPhone, FaVenusMars, FaEllipsisV, FaEdit, FaWhatsapp, FaPlus } from "react-icons/fa";
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
  upcoming: string;
  pending: string;
  canceled: string;
  refused: string;
  patientList: string;
  previous: string;
  next: string;
  exportCSV: string;
  details: string;
  approve: string;
  cancel: string;
  edit: string;
  close: string;
  pastAppointments: string;
  noHistory: string;
  notes: string;
  addAppointment: string;
  save: string;
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
    upcoming: "Prochain",
    pending: "En attente",
    canceled: "Annulé",
    refused: "Refusé",
    patientList: "Liste des Patients",
    previous: "Précédent",
    next: "Suivant",
    exportCSV: "Exporter en CSV",
    details: "Détails",
    approve: "Approuver",
    cancel: "Annuler",
    edit: "Modifier",
    close: "Fermer",
    pastAppointments: "Historique des Rendez-vous",
    noHistory: "Aucun historique disponible",
    notes: "Notes",
    addAppointment: "Ajouter un Rendez-vous",
    save: "Enregistrer",
  },
};

// Données initiales des patients avec historique enrichi
const initialPatients: Patient[] = [
  {
    nom: "Sall",
    prenom: "Ndeye",
    date: "2025-03-20",
    heure: "10:00",
    email: "ndeye.sall@example.com",
    telephone: "770000000",
    genre: "Femme",
    statut: "Prochain",
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
    email: "aliou.diop@example.com",
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
    email: "aissatou.ba@example.com",
    telephone: "771000000",
    genre: "Femme",
    statut: "Prochain",
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
    statut: "Annulé",
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
    email: "awa.fall@example.com",
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
    statut: "Prochain",
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
    statut: "Prochain",
    historique: [
      { date: "2025-01-05", heure: "12:00", statut: "Terminé", notesMedicales: "Consultation générale" },
    ],
  },
];

const ITEMS_PER_PAGE = 5;

const DetailsRendezVous: React.FC = () => {
  const { isDarkMode } = useTheme(); // Utilisation directe du hook personnalisé
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState<Patient>({
    nom: "",
    prenom: "",
    date: "",
    heure: "",
    email: "",
    telephone: "",
    genre: "",
    statut: "En attente",
    historique: [],
  });
  const [sortField, setSortField] = useState<keyof Patient | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [lang] = useState<"fr">("fr");

  const t: Translation = translations[lang];

    

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
      patient.prenom.trim() !== "" &&
      patient.date.trim() !== "" &&
      patient.heure.trim() !== "" &&
      patient.genre.trim() !== "" &&
      patient.statut.trim() !== ""
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
      case "Prochain":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
      case "Annulé":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
      case "En attente":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200";
      case "Refusé":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
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

  const handleModalOpen = (patient: Patient | null, mode: "view" | "edit" | "add" = "view") => {
    if (mode === "add") {
      setAddMode(true);
      setEditMode(false);
      setSelectedPatient(null);
      setNewPatient({
        nom: "",
        prenom: "",
        date: "",
        heure: "",
        email: "",
        telephone: "",
        genre: "",
        statut: "En attente",
        historique: [],
      });
    } else {
      setSelectedPatient(patient);
      setEditedPatient(patient ? { ...patient } : null);
      setEditMode(mode === "edit");
      setAddMode(false);
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPatient(null);
    setEditedPatient(null);
    setNewPatient({
      nom: "",
      prenom: "",
      date: "",
      heure: "",
      email: "",
      telephone: "",
      genre: "",
      statut: "En attente",
      historique: [],
    });
    setEditMode(false);
    setAddMode(false);
  };

  const handleApprovePatient = (nom: string, prenom: string) => {
    setPatients(patients.map((p) =>
      p.nom === nom && p.prenom === prenom ? { ...p, statut: "Prochain" } : p
    ));
    toast.success("Rendez-vous approuvé !", { position: "top-right" });
  };

  const handleCancelPatient = (nom: string, prenom: string) => {
    setPatients(patients.map((p) =>
      p.nom === nom && p.prenom === prenom ? { ...p, statut: "Annulé" } : p
    ));
    toast.success("Rendez-vous annulé !", { position: "top-right" });
  };

  const handleSaveEdit = () => {
    if (!editedPatient || !validatePatient(editedPatient)) {
      toast.error("Données invalides ou email déjà utilisé !", { position: "top-right" });
      return;
    }
    setPatients(patients.map((p) =>
      p.nom === selectedPatient?.nom && p.prenom === selectedPatient?.prenom ? editedPatient : p
    ));
    setSelectedPatient(editedPatient);
    setEditMode(false);
    toast.success("Patient modifié avec succès !", { position: "top-right" });
  };

  const handleAddPatient = () => {
    if (!validatePatient(newPatient)) {
      toast.error("Données invalides ou email déjà utilisé !", { position: "top-right" });
      return;
    }
    setPatients([...patients, newPatient]);
    handleModalClose();
    toast.success("Rendez-vous ajouté avec succès !", { position: "top-right" });
  };

  // Enhanced click handlers for phone and email
  const handlePhoneClick = (phone: string) => {
    if (/^\d{9}$/.test(phone)) {
      window.location.href = `tel:${phone}`;
      const whatsappUrl = `https://wa.me/221${phone}`;
      window.open(whatsappUrl, "_blank");
    } else {
      toast.error("Numéro de téléphone invalide !", { position: "top-right" });
    }
  };

  const handleEmailClick = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      window.location.href = `mailto:${email}`;
    } else {
      toast.error("Adresse email invalide !", { position: "top-right" });
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
      <ToastContainer />
      <div className={`max-w-7xl mx-auto rounded-xl shadow-lg p-6 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            {t.patientList}
          </h2>
          <button
            onClick={() => handleModalOpen(null, "add")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
          >
            <FaPlus /> {t.addAppointment}
          </button>
        </div>

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
              <option value="Prochain">{t.upcoming}</option>
              <option value="En attente">{t.pending}</option>
              <option value="Annulé">{t.canceled}</option>
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
                  <td className="p-4">
                    <a
                      href={`mailto:${patient.email}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleEmailClick(patient.email);
                      }}
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      {abbreviateEmail(patient.email)}
                    </a>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${patient.telephone}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePhoneClick(patient.telephone);
                        }}
                        className="text-green-600 dark:text-green-400 hover:underline"
                      >
                        {patient.telephone}
                      </a>
                      <a
                        href={`https://wa.me/221${patient.telephone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </td>
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
                                onClick={() => handleModalOpen(patient, "view")}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 dark:text-green-400`}
                              >
                                <FaEye /> {t.details}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleModalOpen(patient, "edit")}
                                className={`${active ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""} flex items-center gap-2 w-full px-4 py-2 text-sm text-green-600 dark:text-green-400`}
                              >
                                <FaEdit /> {t.edit}
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
                <p>
                  <strong>{t.email} :</strong>{" "}
                  <a
                    href={`mailto:${patient.email}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleEmailClick(patient.email);
                    }}
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    {abbreviateEmail(patient.email)}
                  </a>
                </p>
                <p>
                  <strong>{t.phone} :</strong>{" "}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${patient.telephone}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePhoneClick(patient.telephone);
                      }}
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      {patient.telephone}
                    </a>
                    <a
                      href={`https://wa.me/221${patient.telephone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </p>
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
                  onClick={() => handleModalOpen(patient, "view")}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  title={t.details}
                >
                  <FaEye /> <span className="sr-only">{t.details}</span>
                </button>
                <button
                  onClick={() => handleModalOpen(patient, "edit")}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  title={t.edit}
                >
                  <FaEdit /> <span className="sr-only">{t.edit}</span>
                </button>
                <button
                  onClick={() => handleApprovePatient(patient.nom, patient.prenom)}
                  className={`p-2 rounded-lg flex items-center gap-1 ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                  title={t.approve}
                >
                  <FaCheck /> <span className="sr-only">{t.approve}</span>
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
          {modalOpen && (
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
                {addMode ? (
                  <>
                    {/* En-tête pour ajouter un rendez-vous */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                        {t.addAppointment}
                      </h3>
                    </div>

                    {/* Formulaire pour ajouter un nouveau patient */}
                    <div className="grid grid-cols-1 gap-4 mb-6 max-h-64 overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addPrenom" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.firstName}
                        </label>
                        <input
                          id="addPrenom"
                          type="text"
                          value={newPatient.prenom}
                          onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })}
                          className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addNom" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.lastName}
                        </label>
                        <input
                          id="addNom"
                          type="text"
                          value={newPatient.nom}
                          onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })}
                          className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addDate" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.date}
                        </label>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-green-500 dark:text-green-400" />
                          <input
                            id="addDate"
                            type="date"
                            value={newPatient.date}
                            onChange={(e) => setNewPatient({ ...newPatient, date: e.target.value })}
                            className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addTime" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.time}
                        </label>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-green-500 dark:text-green-400" />
                          <input
                            id="addTime"
                            type="time"
                            value={newPatient.heure}
                            onChange={(e) => setNewPatient({ ...newPatient, heure: e.target.value })}
                            className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addEmail" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.email}
                        </label>
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-green-500 dark:text-green-400" />
                          <input
                            id="addEmail"
                            type="email"
                            value={newPatient.email}
                            onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                            className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addPhone" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.phone}
                        </label>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-green-500 dark:text-green-400" />
                          <input
                            id="addPhone"
                            type="tel"
                            value={newPatient.telephone}
                            onChange={(e) => setNewPatient({ ...newPatient, telephone: e.target.value })}
                            className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addGender" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.gender}
                        </label>
                        <div className="flex items-center gap-2">
                          <FaVenusMars className="text-green-500 dark:text-green-400" />
                          <select
                            id="addGender"
                            value={newPatient.genre}
                            onChange={(e) => setNewPatient({ ...newPatient, genre: e.target.value })}
                            className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                          >
                            <option value="">Sélectionner le genre</option>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addStatus" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {t.status}
                        </label>
                        <select
                          id="addStatus"
                          value={newPatient.statut}
                          onChange={(e) => setNewPatient({ ...newPatient, statut: e.target.value })}
                          className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                        >
                          <option value="Prochain">{t.upcoming}</option>
                          <option value="En attente">{t.pending}</option>
                          <option value="Annulé">{t.canceled}</option>
                          <option value="Refusé">{t.refused}</option>
                        </select>
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={handleAddPatient}
                        className={`flex-1 py-2.5 rounded-lg transition duration-200 font-medium shadow-md ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                      >
                        {t.save}
                      </button>
                      <button
                        onClick={handleModalClose}
                        className={`flex-1 py-2.5 rounded-lg transition duration-200 font-medium shadow-md ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                      >
                        {t.close}
                      </button>
                    </div>
                  </>
                ) : (
                  selectedPatient && (
                    <>
                      {/* En-tête pour voir ou modifier */}
                      <div className="flex justify-between items-center mb-6">
                        <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                          {editMode && editedPatient ? (
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editFullName" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Nom complet
                              </label>
                              <input
                                id="editFullName"
                                type="text"
                                value={`${editedPatient.prenom} ${editedPatient.nom}`}
                                onChange={(e) => {
                                  const [prenom, ...nomParts] = e.target.value.split(" ");
                                  setEditedPatient({ ...editedPatient, prenom, nom: nomParts.join(" ") });
                                }}
                                className={`border rounded p-1 w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                              />
                            </div>
                          ) : (
                            `${selectedPatient.prenom} ${selectedPatient.nom}`
                          )}
                        </h3>
                        {editMode && editedPatient ? (
                          <div className="flex flex-col gap-1">
                            <label htmlFor="editStatus" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              {t.status}
                            </label>
                            <select
                              id="editStatus"
                              value={editedPatient.statut}
                              onChange={(e) => setEditedPatient({ ...editedPatient, statut: e.target.value })}
                              className={`p-1 border rounded ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                            >
                              <option value="Prochain">{t.upcoming}</option>
                              <option value="En attente">{t.pending}</option>
                              <option value="Annulé">{t.canceled}</option>
                              <option value="Refusé">{t.refused}</option>
                            </select>
                          </div>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              selectedPatient.statut
                            )}`}
                          >
                            {selectedPatient.statut}
                          </span>
                        )}
                      </div>

                      {/* Informations principales avec hauteur limitée */}
                      <div className="grid grid-cols-1 gap-4 mb-6 max-h-64 overflow-y-auto">
                        {editMode && editedPatient ? (
                          <>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editDate" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t.date}
                              </label>
                              <div className="flex items-center gap-2">
                                <FaCalendar className="text-green-500 dark:text-green-400" />
                                <input
                                  id="editDate"
                                  type="date"
                                  value={editedPatient.date}
                                  onChange={(e) => setEditedPatient({ ...editedPatient, date: e.target.value })}
                                  className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editTime" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t.time}
                              </label>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-green-500 dark:text-green-400" />
                                <input
                                  id="editTime"
                                  type="time"
                                  value={editedPatient.heure}
                                  onChange={(e) => setEditedPatient({ ...editedPatient, heure: e.target.value })}
                                  className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editEmail" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t.email}
                              </label>
                              <div className="flex items-center gap-2">
                                <FaEnvelope className="text-green-500 dark:text-green-400" />
                                <input
                                  id="editEmail"
                                  type="email"
                                  value={editedPatient.email}
                                  onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                                  className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editPhone" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t.phone}
                              </label>
                              <div className="flex items-center gap-2">
                                <FaPhone className="text-green-500 dark:text-green-400" />
                                <input
                                  id="editPhone"
                                  type="tel"
                                  value={editedPatient.telephone}
                                  onChange={(e) => setEditedPatient({ ...editedPatient, telephone: e.target.value })}
                                  className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="editGender" className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t.gender}
                              </label>
                              <div className="flex items-center gap-2">
                                <FaVenusMars className="text-green-500 dark:text-green-400" />
                                <select
                                  id="editGender"
                                  value={editedPatient.genre}
                                  onChange={(e) => setEditedPatient({ ...editedPatient, genre: e.target.value })}
                                  className={`p-1 border rounded w-full ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                                >
                                  <option value="Homme">Homme</option>
                                  <option value="Femme">Femme</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
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
                              <a
                                href={`mailto:${selectedPatient.email}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEmailClick(selectedPatient.email);
                                }}
                                className="text-green-600 dark:text-green-400 hover:underline"
                              >
                                <strong>{t.email} :</strong> {selectedPatient.email}
                              </a>
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              <FaPhone className="text-green-500 dark:text-green-400" />
                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${selectedPatient.telephone}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePhoneClick(selectedPatient.telephone);
                                  }}
                                  className="text-green-600 dark:text-green-400 hover:underline"
                                >
                                  <strong>{t.phone} :</strong> {selectedPatient.telephone}
                                </a>
                                <a
                                  href={`https://wa.me/221${selectedPatient.telephone}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-600 dark:text-green-400 hover:underline"
                                >
                                  <FaWhatsapp />
                                </a>
                              </div>
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                              <FaVenusMars className="text-green-500 dark:text-green-400" />
                              <span><strong>{t.gender} :</strong> {selectedPatient.genre}</span>
                            </div>
                          </>
                        )}
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
                        {editMode ? (
                          <button
                            onClick={handleSaveEdit}
                            className={`flex-1 py-2.5 rounded-lg transition duration-200 font-medium shadow-md ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                          >
                            {t.save}
                          </button>
                        ) : null}
                        <button
                          onClick={handleModalClose}
                          className={`flex-1 py-2.5 rounded-lg transition duration-200 font-medium shadow-md ${isDarkMode ? "bg-green-700 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                        >
                          {t.close}
                        </button>
                      </div>
                    </>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetailsRendezVous;


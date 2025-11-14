"use client";

import React, { useContext, useState, useMemo, useRef, useEffect, useCallback, createContext } from "react";
import { ContexteRendezVous } from "../SousPageDocteur/AppointmentContext";
import {
  Calendar,
  Users,
  Activity,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  BarChart2,
  Search,
  Phone,
  Printer,
  Plus,
} from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { UseReactToPrintOptions, useReactToPrint } from "react-to-print";
import EvaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/Mh.png";

// Enregistrement des composants Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Contexte pour le thème
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Implémentation manuelle de debounce
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Types
type Medecin = {
  nom: string;
  specialite: string;
  telephone: string;
  statut: "Disponible" | "Absent";
  img: string;
  horaires?: string;
};

type Tache = {
  id: string;
  description: string;
  priorite: "Élevée" | "Normale" | "Basse";
  dueDate: string;
  assignéÀ: string;
  terminee?: boolean;
};

type RendezVous = {
  date: string;
  heure: string;
  statut: "Prochain" | "Terminé" | "Annulé";
};

// Données simulées avec l'image Mh.png pour tous les médecins
const medecinsData: Medecin[] = [
  { nom: "Dr Fatou Badji", specialite: "Médecine générale", telephone: "771000001", statut: "Disponible", img: EvaImage, horaires: "08:00 - 16:00" },
  { nom: "Dr Abdou Diallo", specialite: "Médecine générale", telephone: "771000002", statut: "Absent", img: EvaImage, horaires: "09:00 - 17:00" },
  { nom: "Dr Ndeye Awa Dieng", specialite: "Cardiologie", telephone: "771000006", statut: "Disponible", img: EvaImage, horaires: "10:00 - 18:00" },
];

const tachesData: Tache[] = [
  { id: "1", description: "Examiner les résultats sanguins", priorite: "Élevée", dueDate: "2025-03-10", assignéÀ: "Dr Fatou Badji", terminee: false },
  { id: "2", description: "Préparer le planning des vaccins", priorite: "Élevée", dueDate: "2025-03-11", assignéÀ: "Dr Abdou Diallo", terminee: false },
  { id: "3", description: "Visite de suivi pour Mme Faye", priorite: "Normale", dueDate: "2025-03-12", assignéÀ: "Dr Ndeye Awa Dieng", terminee: false },
  { id: "4", description: "Rédiger le rapport mensuel", priorite: "Normale", dueDate: "2025-03-15", assignéÀ: "Dr Fatou Badji", terminee: false },
  { id: "5", description: "Commander des fournitures médicales", priorite: "Basse", dueDate: "2025-03-20", assignéÀ: "Dr Abdou Diallo", terminee: false },
  { id: "6", description: "Consultation d’urgence pour Mr Sow", priorite: "Élevée", dueDate: "2025-03-10", assignéÀ: "Dr Ndeye Awa Dieng", terminee: false },
  { id: "7", description: "Mettre à jour les dossiers patients", priorite: "Basse", dueDate: "2025-03-14", assignéÀ: "Dr Fatou Badji", terminee: false },
];

const TableauDeBord: React.FC = () => {
  const contexte = useContext(ContexteRendezVous);
  const { isDarkMode } = useContext(ThemeContext);
  const componentRef = useRef<HTMLDivElement>(null);

  if (!contexte) {
    throw new Error("ContexteRendezVous n'est pas défini");
  }

  const { rendezVous } = contexte;

  // États
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    patientGroups: true,
    tasks: true,
    doctors: true,
  });
  const [taskFilter, setTaskFilter] = useState<"Toutes" | "Élevée" | "Normale" | "Basse">("Toutes");
  const [taskSortBy, setTaskSortBy] = useState<"date" | "priorite" | "nom">("date");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [taskSearch, setTaskSearch] = useState("");
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState<string>("Toutes");
  const [periodFilter, setPeriodFilter] = useState<"Jour" | "Semaine" | "Mois">("Mois");
  const [rendezVousFilter, setRendezVousFilter] = useState<"Tous" | "Prochain" | "Terminé" | "Annulé">("Tous");
  const [tasks, setTasks] = useState<Tache[]>(tachesData);
  const [doctors, setDoctors] = useState<Medecin[]>(medecinsData);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ description: "", priorite: "Normale", dueDate: "", assignéÀ: "" });

  // Données par défaut si rendezVous est vide
  const defaultRendezVous: RendezVous[] = [
    { date: "2025-03-10", heure: "10:00", statut: "Prochain" },
    { date: "2025-03-11", heure: "14:00", statut: "Terminé" },
  ];
  const rendezVousData = rendezVous.length > 0 ? rendezVous : defaultRendezVous;

  // Statistiques
  const statistiques = useMemo(() => {
    const today = new Date("2025-03-10");
    const filteredRendezVous = rendezVousData.filter((rdv) => {
      const rdvDate = new Date(rdv.date);
      if (periodFilter === "Jour") return rdvDate.toDateString() === today.toDateString();
      if (periodFilter === "Semaine") {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return rdvDate >= startOfWeek && rdvDate <= endOfWeek;
      }
      return true;
    }).filter((rdv) => rendezVousFilter === "Tous" || rdv.statut === rendezVousFilter);

    return {
      appointments: filteredRendezVous.length,
      surgeries: filteredRendezVous.filter((rdv) => rdv.statut === "Prochain").length,
      roomVisits: filteredRendezVous.length,
      capacity: Math.min((filteredRendezVous.length / 20) * 100, 100),
    };
  }, [rendezVousData, periodFilter, rendezVousFilter]);

  // Données des graphiques
  const chartData = {
    labels: ["Rendez-vous", "Chirurgies", "Visites"],
    datasets: [
      {
        label: "Statistiques Clinique",
        data: [statistiques.appointments, statistiques.surgeries, statistiques.roomVisits],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderColor: ["#2563EB", "#059669", "#D97706"],
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { font: { size: 14 }, color: isDarkMode ? "#D1D5DB" : "#1F2937" } },
      title: { display: true, text: `Statistiques ${periodFilter}`, font: { size: 18 }, color: isDarkMode ? "#D1D5DB" : "#1F2937" },
      tooltip: { backgroundColor: isDarkMode ? "#374151" : "#1F2937", titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 12 }, color: isDarkMode ? "#D1D5DB" : "#1F2937" } },
      x: { ticks: { font: { size: 12 }, color: isDarkMode ? "#D1D5DB" : "#1F2937" } },
    },
  };

  const groupesPatients = useMemo(() => [
    { id: "g1", nom: "Diabète", nombrePatients: 5, couleur: "bg-orange-500", progression: 25 },
    { id: "g2", nom: "Hypertension", nombrePatients: 8, couleur: "bg-purple-500", progression: 40 },
    { id: "g3", nom: "Asthme", nombrePatients: 3, couleur: "bg-green-500", progression: 15 },
  ], []);

  const patientChartData = {
    labels: groupesPatients.map((g) => g.nom),
    datasets: [
      {
        data: groupesPatients.map((g) => g.nombrePatients),
        backgroundColor: ["#F59E0B", "#8B5CF6", "#10B981"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right" as const, labels: { font: { size: 14 }, color: isDarkMode ? "#D1D5DB" : "#1F2937" } },
      tooltip: { backgroundColor: isDarkMode ? "#374151" : "#1F2937", titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
  };

  // Notifications
  const urgentTasks = useMemo(() => {
    const today = new Date();
    return tasks.filter((tache) => {
      const due = new Date(tache.dueDate);
      return !tache.terminee && tache.priorite === "Élevée" && due.getTime() - today.getTime() < 24 * 60 * 60 * 1000;
    });
  }, [tasks]);

  // Filtres et Tri
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((tache) => (taskFilter === "Toutes" ? true : tache.priorite === taskFilter))
      .filter((tache) => tache.description.toLowerCase().includes(taskSearch.toLowerCase()))
      .sort((a, b) => {
        if (taskSortBy === "date") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (taskSortBy === "priorite") return a.priorite.localeCompare(b.priorite);
        return a.description.localeCompare(b.description);
      });
  }, [tasks, taskFilter, taskSearch, taskSortBy]);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((medecin) => medecin.nom.toLowerCase().includes(doctorSearch.toLowerCase()))
      .filter((medecin) => doctorSpecialtyFilter === "Toutes" || medecin.specialite === doctorSpecialtyFilter);
  }, [doctors, doctorSearch, doctorSpecialtyFilter]);

  // Fonctions
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const completeTask = (id: string) => {
    setTasks(tasks.map((tache) => (tache.id === id ? { ...tache, terminee: true } : tache)));
  };

  const toggleDoctorStatus = (nom: string) => {
    setDoctors(doctors.map((doc) =>
      doc.nom === nom ? { ...doc, statut: doc.statut === "Disponible" ? "Absent" : "Disponible" } : doc
    ));
  };

  const addTask = () => {
    if (!newTask.description || !newTask.dueDate || !newTask.assignéÀ) return;
    const newTaskData: Tache = {
      id: `${tasks.length + 1}`,
      description: newTask.description,
      priorite: newTask.priorite as "Élevée" | "Normale" | "Basse",
      dueDate: newTask.dueDate,
      assignéÀ: newTask.assignéÀ,
      terminee: false,
    };
    setTasks([...tasks, newTaskData]);
    setNewTask({ description: "", priorite: "Normale", dueDate: "", assignéÀ: "" });
    setShowAddTaskModal(false);
  };

  const debouncedSetTaskSearch = useCallback(
    debounce((value: string) => setTaskSearch(value), 300),
    []
  );

  const debouncedSetDoctorSearch = useCallback(
    debounce((value: string) => setDoctorSearch(value), 300),
    []
  );

  const printOptions: UseReactToPrintOptions = {
    documentTitle: "Tableau de Bord - Unisante",
    onBeforePrint: () => console.log("Début de l'impression"),
    onAfterPrint: () => console.log("Impression terminée"),
    pageStyle: `
      @media print {
        body { font-size: 12pt; color: #000; }
        .no-print { display: none; }
        .print-block { display: block !important; }
        .shadow-lg { box-shadow: none; }
        .bg-gradient-to-br { background: #fff; }
        canvas { max-width: 100%; height: auto !important; }
      }
    `,
  };

  const handlePrint = useReactToPrint({
    ...printOptions,
    content: () => componentRef.current || null,
  });

  // Accessibilité : Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "1") toggleSection("stats");
      if (e.altKey && e.key === "2") toggleSection("patientGroups");
      if (e.altKey && e.key === "3") toggleSection("tasks");
      if (e.altKey && e.key === "4") toggleSection("doctors");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-200"} p-6 lg:p-10 font-sans`}>
      <div ref={componentRef} className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className={`text-4xl font-extrabold ${isDarkMode ? "text-gray-100" : "text-gray-900"} flex items-center gap-3`}>
            <BarChart2 className={`h-10 w-10 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} aria-hidden="true" />
            Tableau de Bord
          </h1>
          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"} rounded-lg shadow-md transition-all duration-200 no-print`}
            aria-label="Imprimer le tableau de bord"
          >
            <Printer className="h-5 w-5" aria-hidden="true" />
            Imprimer
          </button>
        </header>

        {/* Filtres de période */}
        <div className="flex flex-wrap gap-3">
          {["Jour", "Semaine", "Mois"].map((period) => (
            <button
              key={period}
              onClick={() => setPeriodFilter(period as "Jour" | "Semaine" | "Mois")}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                periodFilter === period
                  ? isDarkMode
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-indigo-600 text-white shadow-md"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Notifications */}
        {urgentTasks.length > 0 && (
          <div className={`${isDarkMode ? "bg-red-900 border-red-700 text-red-200" : "bg-red-50 border-red-500 text-red-700"} border-l-4 p-4 rounded-lg shadow-sm`}>
            <p className="font-semibold">{urgentTasks.length} tâche(s) urgente(s) à traiter dans les prochaines 24h !</p>
          </div>
        )}

        {/* Statistiques */}
        <section className="space-y-4">
          <div className="flex justify-between items-center lg:hidden">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Statistiques (Alt+1)</h2>
            <button
              onClick={() => toggleSection("stats")}
              className="p-2"
              aria-label={expandedSections.stats ? "Réduire la section Statistiques" : "Développer la section Statistiques"}
            >
              <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} ${expandedSections.stats ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>
          {(expandedSections.stats || window.innerWidth >= 1024) && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Rendez-vous", value: statistiques.appointments, icon: Calendar, color: "text-indigo-500" },
                { title: "Chirurgies", value: statistiques.surgeries, icon: Stethoscope, color: "text-green-500" },
                { title: "Visites", value: statistiques.roomVisits, icon: Users, color: "text-yellow-500" },
                { title: "Capacité", value: `${statistiques.capacity.toFixed(1)}%`, icon: Activity, color: "text-purple-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{stat.title}</h3>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                  </div>
                  <p className={`text-3xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"} mt-2`}>{stat.value}</p>
                  {stat.title === "Capacité" && (
                    <div className="mt-3">
                      <div className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"} w-full rounded-full h-2.5`}>
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full w-[${statistiques.capacity}%]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} lg:col-span-4 p-6 rounded-xl shadow-lg`}>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Vue Graphique</h3>
                  <div className="mt-2 sm:mt-0 w-full sm:w-auto">
                    <label htmlFor="rendezvous-filter" className="sr-only">Filtrer les rendez-vous</label>
                    <select
                      id="rendezvous-filter"
                      value={rendezVousFilter}
                      onChange={(e) => setRendezVousFilter(e.target.value as "Tous" | "Prochain" | "Terminé" | "Annulé")}
                      className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-700 border-gray-300"} w-full sm:w-auto px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="Tous">Tous</option>
                      <option value="Prochain">Prochain</option>
                      <option value="Terminé">Terminé</option>
                      <option value="Annulé">Annulé</option>
                    </select>
                  </div>
                </div>
                <div className="h-80 print-block">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Groupes de Patients */}
        <section className="space-y-4">
          <div className="flex justify-between items-center lg:hidden">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Groupes de Patients (Alt+2)</h2>
            <button
              onClick={() => toggleSection("patientGroups")}
              className="p-2"
              aria-label={expandedSections.patientGroups ? "Réduire la section Groupes de Patients" : "Développer la section Groupes de Patients"}
            >
              <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} ${expandedSections.patientGroups ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          </div>
          {(expandedSections.patientGroups || window.innerWidth >= 1024) && (
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-lg`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"} mb-4`}>Groupes de Patients</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupesPatients.map((groupe) => (
                  <div
                    key={groupe.id}
                    className={`${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} flex items-center gap-4 p-4 rounded-lg transition duration-200`}
                  >
                    <div className={`${groupe.couleur} h-12 w-12 rounded-full flex-shrink-0 shadow-md`} />
                    <div className="flex-1">
                      <p className={`text-base font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{groupe.nom}</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{groupe.nombrePatients} patients</p>
                      <div className={`mt-2 w-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full h-2`}>
                        <div
                          className={`${groupe.couleur} h-2 rounded-full w-[${groupe.progression}%]`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-80 print-block">
                <Doughnut data={patientChartData} options={doughnutOptions} />
              </div>
            </div>
          )}
        </section>

        {/* Tâches et Médecins */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tâches */}
          <section className="space-y-4">
            <div className="flex justify-between items-center lg:hidden">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Tâches (Alt+3)</h2>
              <button
                onClick={() => toggleSection("tasks")}
                className="p-2"
                aria-label={expandedSections.tasks ? "Réduire la section Tâches" : "Développer la section Tâches"}
              >
                <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} ${expandedSections.tasks ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
            {(expandedSections.tasks || window.innerWidth >= 1024) && (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-lg`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Tâches</h3>
                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className={`flex items-center gap-2 px-3 py-1 ${isDarkMode ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"} rounded-full shadow-md transition-all duration-200 no-print`}
                    aria-label="Ajouter une nouvelle tâche"
                  >
                    <Plus className="h-5 w-5" aria-hidden="true" />
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {["Toutes", "Élevée", "Normale", "Basse"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTaskFilter(filter as "Toutes" | "Élevée" | "Normale" | "Basse")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                          taskFilter === filter
                            ? isDarkMode
                              ? "bg-indigo-500 text-white shadow-md"
                              : "bg-indigo-600 text-white shadow-md"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="task-sort" className="sr-only">Trier les tâches</label>
                    <select
                      id="task-sort"
                      value={taskSortBy}
                      onChange={(e) => setTaskSortBy(e.target.value as "date" | "priorite" | "nom")}
                      className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-700 border-gray-300"} px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="date">Trier par Date</option>
                      <option value="priorite">Trier par Priorité</option>
                      <option value="nom">Trier par Nom</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Rechercher une tâche..."
                      onChange={(e) => debouncedSetTaskSearch(e.target.value)}
                      className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                      aria-label="Rechercher une tâche"
                    />
                  </div>
                </div>
                <div className={`space-y-4 max-h-96 overflow-y-auto scrollbar-thin ${isDarkMode ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"}`}>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((tache) => (
                      <div
                        key={tache.id}
                        className={`${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} flex items-center gap-4 p-4 rounded-lg transition duration-200`}
                      >
                        {tache.priorite === "Élevée" ? (
                          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" aria-hidden="true" />
                        ) : tache.priorite === "Normale" ? (
                          <Activity className="h-6 w-6 text-yellow-500 flex-shrink-0" aria-hidden="true" />
                        ) : (
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" aria-hidden="true" />
                        )}
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"} ${tache.terminee ? "line-through text-gray-500" : ""}`}
                          >
                            {tache.description}
                          </p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Priorité: {tache.priorite} • Assigné à: {tache.assignéÀ} • Échéance: {tache.dueDate}
                          </p>
                        </div>
                        {!tache.terminee && (
                          <button
                            onClick={() => completeTask(tache.id)}
                            className={`px-3 py-1 text-sm ${isDarkMode ? "text-green-400 border-green-400 hover:bg-green-900" : "text-green-600 border-green-600 hover:bg-green-50"} border rounded-full transition duration-200 no-print`}
                            aria-label={`Marquer la tâche ${tache.description} comme terminée`}
                          >
                            Terminer
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-center`}>Aucune tâche trouvée</p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Médecins */}
          <section className="space-y-4">
            <div className="flex justify-between items-center lg:hidden">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Médecins (Alt+4)</h2>
              <button
                onClick={() => toggleSection("doctors")}
                className="p-2"
                aria-label={expandedSections.doctors ? "Réduire la section Médecins" : "Développer la section Médecins"}
              >
                <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"} ${expandedSections.doctorsv ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
            {(expandedSections.doctors || window.innerWidth >= 1024) && (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow-lg`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"} mb-4`}>Médecins</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div>
                    <label htmlFor="specialty-filter" className="sr-only">Filtrer par spécialité</label>
                    <select
                      id="specialty-filter"
                      value={doctorSpecialtyFilter}
                      onChange={(e) => setDoctorSpecialtyFilter(e.target.value)}
                      className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-700 border-gray-300"} px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="Toutes">Toutes Spécialités</option>
                      <option value="Médecine générale">Médecine générale</option>
                      <option value="Cardiologie">Cardiologie</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Rechercher un médecin..."
                      onChange={(e) => debouncedSetDoctorSearch(e.target.value)}
                      className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`}
                      aria-label="Rechercher un médecin"
                    />
                  </div>
                </div>
                <div className={`space-y-4 max-h-96 overflow-y-auto scrollbar-thin ${isDarkMode ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800" : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"}`}>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((medecin) => (
                      <div
                        key={medecin.nom}
                        className={`${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} flex items-center gap-4 p-4 rounded-lg transition duration-200`}
                      >
                        <img
                          src={medecin.img}
                          alt={`Photo de ${medecin.nom}`}
                          className="h-12 w-12 rounded-full object-cover flex-shrink-0 shadow-sm"
                          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                        />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{medecin.nom}</p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{medecin.specialite} • {medecin.horaires}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            medecin.statut === "Disponible"
                              ? isDarkMode
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-800"
                              : isDarkMode
                              ? "bg-red-900 text-red-300"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {medecin.statut}
                        </span>
                        <button
                          onClick={() => toggleDoctorStatus(medecin.nom)}
                          className={`px-3 py-1 text-sm ${isDarkMode ? "text-indigo-400 border-indigo-400 hover:bg-indigo-900" : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"} border rounded-full transition duration-200 no-print`}
                          aria-label={medecin.statut === "Disponible" ? "Marquer comme Absent" : "Marquer comme Disponible"}
                        >
                          {medecin.statut === "Disponible" ? "Marquer Absent" : "Marquer Disponible"}
                        </button>
                        <a href={`tel:${medecin.telephone}`} className="no-print">
                          <button
                            className={`p-2 ${isDarkMode ? "text-green-400 hover:bg-green-900" : "text-green-600 hover:bg-green-50"} rounded-full transition duration-200`}
                            aria-label={`Appeler ${medecin.nom}`}
                          >
                            <Phone className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-center`}>Aucun médecin trouvé</p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Modal pour ajouter une tâche */}
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-xl w-full max-w-md`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"} mb-4`}>Ajouter une Tâche</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="task-description" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Description
                  </label>
                  <input
                    id="task-description"
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Entrez la description"
                  />
                </div>
                <div>
                  <label htmlFor="task-priority" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Priorité
                  </label>
                  <select
                    id="task-priority"
                    value={newTask.priorite}
                    onChange={(e) => setNewTask({ ...newTask, priorite: e.target.value })}
                    className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-700 border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="Élevée">Élevée</option>
                    <option value="Normale">Normale</option>
                    <option value="Basse">Basse</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="task-due-date" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Date d’échéance
                  </label>
                  <input
                    id="task-due-date"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-900 border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>
                <div>
                  <label htmlFor="task-assignee" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Assigné à
                  </label>
                  <select
                    id="task-assignee"
                    value={newTask.assignéÀ}
                    onChange={(e) => setNewTask({ ...newTask, assignéÀ: e.target.value })}
                    className={`${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-700 border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Sélectionner un médecin</option>
                    {medecinsData.map((medecin) => (
                      <option key={medecin.nom} value={medecin.nom}>
                        {medecin.nom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  className={`px-4 py-2 ${isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"} rounded-lg transition duration-200`}
                  aria-label="Annuler l’ajout de la tâche"
                >
                  Annuler
                </button>
                <button
                  onClick={addTask}
                  className={`px-4 py-2 ${isDarkMode ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"} rounded-lg transition duration-200`}
                  aria-label="Ajouter la tâche"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableauDeBord;
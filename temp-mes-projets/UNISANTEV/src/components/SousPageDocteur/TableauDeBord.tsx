"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  Activity,
  AlertCircle,
  BarChart2,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  LayoutDashboard,
  Loader2,
  Phone,
  Plus,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
  FontSpec,
} from "chart.js"

// Imports d'images spécifiques pour chaque médecin
import BadjiFatouImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/BadjiFatou.png"
import DialloKhadidiatouImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/DialloKhadidiatou.png"
import KaneMariamaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/KaneMariama.png"
import BasseneLindaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/BasseneLinda.png"
import GueyeFatimaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/GueyeFatima.png"
import DiengNdeyeAwaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/DiengNdeyeAwa.png"
import SallAwaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/AwaSall.png"
import KeitaHawaDembaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/KeitaHawaDemba.png"
import CorreaAdelineImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/CorreaAdeline.png"
import SarrMariataImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/SarrMariata.png"
import BarryKhadijaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/BarryKhadija.png"
import MemiagueKrisImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/KrisMemiague.png"
import BakanaDanichaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/BakanaDanicha.png"
import NdiayeModyYeroImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/NdiayeModyYero.png"
import BadjiNafiImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/BadjiNafi.png"
import DRSoumareImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/DRSoumare.png"

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
)

// Contexte pour le thème
interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

// Contexte pour les rendez-vous
interface RendezVous {
  id: string
  patientNom: string
  date: string
  heure: string
  statut: "Prochain" | "Terminé" | "Annulé"
  type: string
}

interface ContexteRendezVousType {
  rendezVous: RendezVous[]
  addRendezVous?: (rdv: RendezVous) => void
  updateRendezVous?: (id: string, rdv: Partial<RendezVous>) => void
  deleteRendezVous?: (id: string) => void
}

export const ContexteRendezVous = createContext<ContexteRendezVousType>({
  rendezVous: [],
})

// Debounce
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Types
type Medecin = {
  id: string
  nom: string
  specialite: string
  telephone: string
  statut: "Disponible" | "Absent"
  img: string
  horaires: string
  patients: number
}

type Tache = {
  id: string
  description: string
  priorite: "Élevée" | "Normale" | "Basse"
  dueDate: string
  assignéÀ: string
  terminee?: boolean
}

type GroupePatient = {
  id: string
  nom: string
  nombrePatients: number
  couleur: string
  progression: number
  tendance: "hausse" | "baisse" | "stable"
}

// Données des médecins avec images spécifiques
const medecinsData: Medecin[] = [
  { id: "m1", nom: "Badji Fatou", specialite: "Médecine générale", telephone: "771000001", statut: "Disponible", img: BadjiFatouImage, horaires: "LUN - VEN 08:00 - 16:00", patients: 42 },
  { id: "m2", nom: "Diallo Khadidiatou", specialite: "Médecine générale", telephone: "771000002", statut: "Absent", img: DialloKhadidiatouImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 38 },
  { id: "m3", nom: "Kane Mariama", specialite: "Médecine générale", telephone: "771000003", statut: "Disponible", img: KaneMariamaImage, horaires: "LUN - VEN 08:00 - 16:00", patients: 45 },
  { id: "m4", nom: "Basséne Linda", specialite: "Médecine générale", telephone: "771000004", statut: "Disponible", img: BasseneLindaImage, horaires: "LUN - VEN 08:00 - 16:00", patients: 36 },
  { id: "m5", nom: "Gueye Fatima", specialite: "Médecine générale", telephone: "771000005", statut: "Disponible", img: GueyeFatimaImage, horaires: "LUN - VEN 08:00 - 16:00", patients: 41 },
  { id: "m6", nom: "Dieng Ndeye Awa", specialite: "Cardiologie", telephone: "771000006", statut: "Disponible", img: DiengNdeyeAwaImage, horaires: "LUN - VEN 10:00 - 18:00", patients: 32 },
  { id: "m7", nom: "Sall Awa", specialite: "Cardiologie", telephone: "771000007", statut: "Disponible", img: SallAwaImage, horaires: "LUN - VEN 10:00 - 18:00", patients: 29 },
  { id: "m8", nom: "Keita Hawa Demba", specialite: "Cardiologie", telephone: "771000008", statut: "Disponible", img: KeitaHawaDembaImage, horaires: "LUN - VEN 10:00 - 18:00", patients: 34 },
  { id: "m9", nom: "Correa Adéline", specialite: "Chirurgie", telephone: "771000009", statut: "Disponible", img: CorreaAdelineImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 25 },
  { id: "m10", nom: "Sarr Mariata", specialite: "Chirurgie", telephone: "771000010", statut: "Disponible", img: SarrMariataImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 28 },
  { id: "m11", nom: "Barry Khadija", specialite: "Chirurgie", telephone: "771000011", statut: "Absent", img: BarryKhadijaImage, horaires: "LUN - SAM 08:00 - 16:00", patients: 31 },
  { id: "m12", nom: "Memiague Kris", specialite: "Dermatologie", telephone: "771000012", statut: "Absent", img: MemiagueKrisImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 27 },
  { id: "m13", nom: "Bakana Danicha", specialite: "Dermatologie", telephone: "771000013", statut: "Disponible", img: BakanaDanichaImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 33 },
  { id: "m14", nom: "Ndiaye Mody Yero", specialite: "Dermatologie", telephone: "771000014", statut: "Disponible", img: NdiayeModyYeroImage, horaires: "LUN - VEN 09:00 - 17:00", patients: 30 },
  { id: "m15", nom: "Badji Nafi", specialite: "Endocrinologie", telephone: "771000015", statut: "Disponible", img: BadjiNafiImage, horaires: "LUN - VEN 08:00 - 16:00", patients: 26 },
  { id: "m16", nom: "DR Soumaré", specialite: "Chirurgie", telephone: "+216 52 711 029", statut: "Disponible", img: DRSoumareImage, horaires: "LUN - VEN 10:00 - 18:00", patients: 34 },
]

// Données des tâches
const tachesData: Tache[] = [
  { id: "t1", description: "Rendez-vous avec Ndeye Sall", priorite: "Élevée", dueDate: "2025-03-14", assignéÀ: "Badji Fatou", terminee: false },
  { id: "t2", description: "Chirurgie avec Aliou Diop", priorite: "Élevée", dueDate: "2025-03-14", assignéÀ: "Sarr Mariata", terminee: false },
  { id: "t3", description: "Consultation de suivi", priorite: "Normale", dueDate: "2025-03-15", assignéÀ: "Dieng Ndeye Awa", terminee: false },
  { id: "t4", description: "Révision des dossiers patients", priorite: "Basse", dueDate: "2025-03-17", assignéÀ: "Kane Mariama", terminee: false },
  { id: "t5", description: "Préparer rapport mensuel", priorite: "Normale", dueDate: "2025-03-16", assignéÀ: "Gueye Fatima", terminee: false },
  { id: "t6", description: "Examen dermatologique urgent", priorite: "Élevée", dueDate: "2025-03-14", assignéÀ: "Bakana Danicha", terminee: false },
]

// Données des rendez-vous
const rendezVousData: RendezVous[] = [
  { id: "rdv1", patientNom: "Ndeye Sall", date: "2025-03-14", heure: "09:00", statut: "Prochain", type: "Consultation" },
  { id: "rdv2", patientNom: "Aliou Diop", date: "2025-03-14", heure: "11:30", statut: "Prochain", type: "Chirurgie" },
  { id: "rdv3", patientNom: "Mamadou Ndiaye", date: "2025-03-13", heure: "14:00", statut: "Terminé", type: "Suivi" },
  { id: "rdv4", patientNom: "Fatou Diallo", date: "2025-03-13", heure: "16:30", statut: "Terminé", type: "Consultation" },
  { id: "rdv5", patientNom: "Ousmane Sow", date: "2025-03-12", heure: "10:15", statut: "Terminé", type: "Examen" },
  { id: "rdv6", patientNom: "Aissatou Bah", date: "2025-03-15", heure: "08:45", statut: "Prochain", type: "Consultation" },
  { id: "rdv7", patientNom: "Ibrahima Diallo", date: "2025-03-12", heure: "15:00", statut: "Annulé", type: "Consultation" },
]

// Données des groupes de patients
const groupesPatientsData: GroupePatient[] = [
  { id: "g1", nom: "Diabète", nombrePatients: 42, couleur: "bg-orange-500", progression: 25, tendance: "hausse" },
  { id: "g2", nom: "Hypertension", nombrePatients: 38, couleur: "bg-purple-500", progression: 40, tendance: "stable" },
  { id: "g3", nom: "Asthme", nombrePatients: 23, couleur: "bg-green-500", progression: 15, tendance: "baisse" },
  { id: "g4", nom: "Cardiaque", nombrePatients: 31, couleur: "bg-green-500", progression: 35, tendance: "hausse" },
  { id: "g5", nom: "Dermatologie", nombrePatients: 27, couleur: "bg-pink-500", progression: 20, tendance: "stable" },
]

// Spécialités
const specialitesData = [
  "Toutes",
  "Médecine générale",
  "Cardiologie",
  "Chirurgie",
  "Dermatologie",
  "Endocrinologie",
  "Pneumologie",
  "Radiologie",
  "Obstétrique",
  "Odontologie",
]

// Données des tendances mensuelles
const tendancesMensuelles = {
  labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
  datasets: [
    {
      label: "Consultations",
      data: [65, 59, 80, 81, 56, 55, 72, 68, 74, 83, 90, 97],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.3,
      fill: true,
    },
    {
      label: "Chirurgies",
      data: [28, 32, 30, 29, 25, 27, 31, 33, 29, 35, 38, 40],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.3,
      fill: true,
    },
  ],
}

const TableauDeBord: React.FC = () => {
  const contexteRdv = useContext(ContexteRendezVous)
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error("TableauDeBord doit être utilisé dans un ThemeContext.Provider")
  const { isDarkMode } = themeContext
  const componentRef = useRef<HTMLDivElement>(null)

  // États
  const [expandedSections, setExpandedSections] = useState({
    stats: true,
    patientGroups: true,
    tasks: true,
    doctors: true,
  })
  const [taskFilter, setTaskFilter] = useState<"Toutes" | "Élevée" | "Normale" | "Basse">("Toutes")
  const [taskSortBy, setTaskSortBy] = useState<"date" | "priorite" | "nom">("date")
  const [doctorSearch, setDoctorSearch] = useState("")
  const [taskSearch, setTaskSearch] = useState("")
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState<string>("Toutes")
  const [periodFilter, setPeriodFilter] = useState<"Jour" | "Semaine" | "Mois">("Mois")
  const [tasks, setTasks] = useState<Tache[]>(tachesData)
  const [doctors] = useState<Medecin[]>(medecinsData)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    description: "",
    priorite: "Normale" as "Élevée" | "Normale" | "Basse",
    dueDate: "",
    assignéÀ: "",
  })
  const [activeTab, setActiveTab] = useState("apercu")
  const [isLoading, setIsLoading] = useState(false)
  const [rendezVous] = useState<RendezVous[]>(contexteRdv.rendezVous.length > 0 ? contexteRdv.rendezVous : rendezVousData)
  const [groupesPatients] = useState<GroupePatient[]>(groupesPatientsData)

  // Statistiques calculées
  const statistiques = useMemo(() => {
    interface Stats {
      appointments: number
      surgeries: number
      roomVisits: number
      capacity: number
    }

    let stats: Stats = { appointments: 0, surgeries: 0, roomVisits: 0, capacity: 0 }

    switch (periodFilter) {
      case "Jour":
        stats = { appointments: 8, surgeries: 3, roomVisits: 25, capacity: Math.min((25 / 40) * 100, 100) }
        break
      case "Semaine":
        stats = { appointments: 42, surgeries: 15, roomVisits: 120, capacity: Math.min((120 / 150) * 100, 100) }
        break
      case "Mois":
        stats = { appointments: 165, surgeries: 48, roomVisits: 450, capacity: Math.min((450 / 500) * 100, 100) }
        break
    }

    return stats
  }, [periodFilter])

  // Données des graphiques
  const chartData = useMemo(() => ({
    labels: ["Rendez-vous", "Chirurgies", "Visites"],
    datasets: [
      {
        label: `Statistiques Clinique - ${periodFilter}`,
        data: [statistiques.appointments, statistiques.surgeries, statistiques.roomVisits],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(245, 158, 11, 0.8)"],
        borderColor: ["rgb(37, 99, 235)", "rgb(5, 150, 105)", "rgb(217, 119, 6)"],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  }), [statistiques, periodFilter])

  const chartOptions: ChartOptions<"bar"> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
          color: isDarkMode ? "#D1D5DB" : "#1F2937",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: true,
        text: `Statistiques ${periodFilter}`,
        font: { size: 18, weight: "bold", family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        color: isDarkMode ? "#D1D5DB" : "#1F2937",
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(55, 65, 81, 0.9)" : "rgba(31, 41, 55, 0.9)",
        titleFont: { size: 14, weight: "bold", family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        bodyFont: { size: 13, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: { label: (context) => ` ${context.dataset.label}: ${context.raw}` },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: isDarkMode ? "rgba(75, 85, 99, 0.2)" : "rgba(209, 213, 219, 0.5)" },
        ticks: {
          stepSize: 50,
          font: { size: 12, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
          color: isDarkMode ? "#D1D5DB" : "#1F2937",
          padding: 8,
        },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, family: "'Inter', sans-serif'" } as Partial<FontSpec>, color: isDarkMode ? "#D1D5DB" : "#1F2937" },
        border: { display: false },
      },
    },
  }), [isDarkMode, periodFilter])

  const patientChartData = {
    labels: groupesPatients.map((g) => g.nom),
    datasets: [
      {
        data: groupesPatients.map((g) => g.nombrePatients),
        backgroundColor: ["rgba(245, 158, 11, 0.8)", "rgba(139, 92, 246, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(236, 72, 153, 0.8)"],
        borderColor: ["rgb(234, 88, 12)", "rgb(124, 58, 237)", "rgb(5, 150, 105)", "rgb(37, 99, 235)", "rgb(219, 39, 119)"],
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
      },
    ],
  }

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: { size: 13, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
          color: isDarkMode ? "#D1D5DB" : "#1F2937",
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(55, 65, 81, 0.9)" : "rgba(31, 41, 55, 0.9)",
        titleFont: { size: 14, weight: "bold", family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        bodyFont: { size: 13, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw || 0
            const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0)
            const percentage = Math.round((value / total) * 100)
            return ` ${label}: ${value} patients (${percentage}%)`
          },
        },
      },
    },
    cutout: "65%",
  }

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 13, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
          color: isDarkMode ? "#D1D5DB" : "#1F2937",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "rgba(55, 65, 81, 0.9)" : "rgba(31, 41, 55, 0.9)",
        titleFont: { size: 14, weight: "bold", family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        bodyFont: { size: 13, family: "'Inter', sans-serif'" } as Partial<FontSpec>,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: isDarkMode ? "rgba(75, 85, 99, 0.2)" : "rgba(209, 213, 219, 0.5)" },
        ticks: { font: { size: 12, family: "'Inter', sans-serif'" } as Partial<FontSpec>, color: isDarkMode ? "#D1D5DB" : "#1F2937", padding: 8 },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, family: "'Inter', sans-serif'" } as Partial<FontSpec>, color: isDarkMode ? "#D1D5DB" : "#1F2937" },
        border: { display: false },
      },
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6, borderWidth: 2, hoverBorderWidth: 3 },
    },
  }

  // Notifications
  const urgentTasks = useMemo(() => {
    const today = new Date()
    return tasks.filter((tache) => {
      const due = new Date(tache.dueDate)
      return !tache.terminee && tache.priorite === "Élevée" && due.getTime() - today.getTime() < 24 * 60 * 60 * 1000
    })
  }, [tasks])

  // Filtres et Tri
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((tache) => (taskFilter === "Toutes" ? true : tache.priorite === taskFilter))
      .filter((tache) => tache.description.toLowerCase().includes(taskSearch.toLowerCase()))
      .sort((a, b) => {
        if (taskSortBy === "date") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        if (taskSortBy === "priorite") {
          const priorityOrder = { Élevée: 0, Normale: 1, Basse: 2 }
          return priorityOrder[a.priorite] - priorityOrder[b.priorite]
        }
        return a.description.localeCompare(b.description)
      })
  }, [tasks, taskFilter, taskSearch, taskSortBy])

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((medecin) => medecin.nom.toLowerCase().includes(doctorSearch.toLowerCase()))
      .filter((medecin) => doctorSpecialtyFilter === "Toutes" || medecin.specialite === doctorSpecialtyFilter)
  }, [doctors, doctorSearch, doctorSpecialtyFilter])

  const filteredRendezVous = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return rendezVous.filter((rdv) => {
      const rdvDate = new Date(rdv.date)
      rdvDate.setHours(0, 0, 0, 0)

      if (periodFilter === "Jour") return rdvDate.getTime() === today.getTime()
      else if (periodFilter === "Semaine") {
        const oneWeekAgo = new Date(today)
        oneWeekAgo.setDate(today.getDate() - 7)
        return rdvDate >= oneWeekAgo && rdvDate <= today
      } else {
        const oneMonthAgo = new Date(today)
        oneMonthAgo.setMonth(today.getMonth() - 1)
        return rdvDate >= oneMonthAgo && rdvDate <= today
      }
    })
  }, [rendezVous, periodFilter])

  // Fonctions
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const completeTask = (id: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setTasks(tasks.map((tache) => (tache.id === id ? { ...tache, terminee: true } : tache)))
      setIsLoading(false)
    }, 500)
  }

  const addTask = () => {
    if (!newTask.description || !newTask.dueDate || !newTask.assignéÀ) return

    setIsLoading(true)
    setTimeout(() => {
      const newTaskData: Tache = {
        id: `t${tasks.length + 1}`,
        description: newTask.description,
        priorite: newTask.priorite,
        dueDate: newTask.dueDate,
        assignéÀ: newTask.assignéÀ,
        terminee: false,
      }
      setTasks([...tasks, newTaskData])
      setNewTask({ description: "", priorite: "Normale", dueDate: "", assignéÀ: "" })
      setShowAddTaskModal(false)
      setIsLoading(false)
    }, 800)
  }

  const debouncedSetTaskSearch = useCallback(debounce((value: string) => setTaskSearch(value), 300), [])
  const debouncedSetDoctorSearch = useCallback(debounce((value: string) => setDoctorSearch(value), 300), [])

  // Accessibilité : Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "1") toggleSection("stats")
      if (e.altKey && e.key === "2") toggleSection("patientGroups")
      if (e.altKey && e.key === "3") toggleSection("tasks")
      if (e.altKey && e.key === "4") toggleSection("doctors")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-900"} font-sans`}>
        <div ref={componentRef} className="container mx-auto py-6 px-4 max-w-7xl">
          {/* En-tête */}
          <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-xl shadow-lg">
                <LayoutDashboard className="h-8 w-8 text-green-500" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Médical</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Bienvenue dans votre espace de gestion</p>
              </div>
            </div>
          </header>

          {/* Tabs de navigation */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex rounded-lg shadow-sm ${isDarkMode ? "bg-gray-700" : "bg-white"} p-1`}>
              <button onClick={() => setActiveTab("apercu")} className={`px-4 py-2 font-medium rounded-md ${activeTab === "apercu" ? "bg-green-500 text-white" : `${isDarkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"}`}`}>Aperçu</button>
              <button onClick={() => setActiveTab("patients")} className={`px-4 py-2 font-medium rounded-md ${activeTab === "patients" ? "bg-green-500 text-white" : `${isDarkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"}`}`}>Patients</button>
              <button onClick={() => setActiveTab("medecins")} className={`px-4 py-2 font-medium rounded-md ${activeTab === "medecins" ? "bg-green-500 text-white" : `${isDarkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"}`}`}>Médecins</button>
            </div>
          </div>

          {/* Filtres de période */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {["Jour", "Semaine", "Mois"].map((period) => (
              <button
                key={period}
                onClick={() => setPeriodFilter(period as "Jour" | "Semaine" | "Mois")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${periodFilter === period ? "bg-green-500 text-white shadow-md" : `${isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Notifications */}
          {urgentTasks.length > 0 && (
            <div className={`bg-red-500/10 border-l-4 border-red-500 p-4 rounded-lg mb-6 shadow-md ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-500">{urgentTasks.length} tâche(s) urgente(s) à traiter</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>Ces tâches doivent être complétées dans les prochaines 24 heures.</p>
                </div>
              </div>
            </div>
          )}

          {/* Contenu principal basé sur l'onglet actif */}
          <div className={activeTab !== "apercu" ? "hidden" : ""}>
            {/* Statistiques */}
            <section className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-green-500" />
                  Statistiques
                  <span className={`text-sm font-normal ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>(Alt+1)</span>
                </h2>
                <button onClick={() => toggleSection("stats")} className="lg:hidden p-2" aria-label={expandedSections.stats ? "Réduire la section Statistiques" : "Développer la section Statistiques"}>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.stats ? "rotate-180" : ""}`} />
                </button>
              </div>

              {(expandedSections.stats || window.innerWidth >= 1024) && (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className={`rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div className="pb-2">
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Rendez-vous</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{statistiques.appointments}</div>
                        <div className={`p-2 ${isDarkMode ? "bg-green-900/30" : "bg-green-100"} rounded-full`}>
                          <Calendar className={`h-5 w-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                        </div>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>+12% par rapport au {periodFilter.toLowerCase()} précédent</p>
                    </div>

                    <div className={`rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div className="pb-2">
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Chirurgies</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{statistiques.surgeries}</div>
                        <div className={`p-2 ${isDarkMode ? "bg-green-900/30" : "bg-green-100"} rounded-full`}>
                          <Stethoscope className={`h-5 w-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                        </div>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>+5% par rapport au {periodFilter.toLowerCase()} précédent</p>
                    </div>

                    <div className={`rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div className="pb-2">
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Visites</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{statistiques.roomVisits}</div>
                        <div className={`p-2 ${isDarkMode ? "bg-amber-900/30" : "bg-amber-100"} rounded-full`}>
                          <Users className={`h-5 w-5 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
                        </div>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>+8% par rapport au {periodFilter.toLowerCase()} précédent</p>
                    </div>

                    <div className={`rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div className="pb-2">
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Capacité</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{statistiques.capacity.toFixed(1)}%</div>
                        <div className={`p-2 ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100"} rounded-full`}>
                          <Activity className={`h-5 w-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${statistiques.capacity}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div>
                        <h3 className="text-lg font-semibold">Activité par type</h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Répartition des activités pour la période sélectionnée</p>
                      </div>
                      <div className="h-80 mt-4">
                        <Bar data={chartData} options={chartOptions} />
                      </div>
                    </div>

                    <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                      <div>
                        <h3 className="text-lg font-semibold">Tendances mensuelles</h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Évolution des consultations et chirurgies</p>
                      </div>
                      <div className="h-80 mt-4">
                        <Line data={tendancesMensuelles} options={lineChartOptions} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* Groupes de Patients */}
            <section className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Groupes de Patients
                  <span className={`text-sm font-normal ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>(Alt+2)</span>
                </h2>
                <button onClick={() => toggleSection("patientGroups")} className="lg:hidden p-2" aria-label={expandedSections.patientGroups ? "Réduire la section Groupes de Patients" : "Développer la section Groupes de Patients"}>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.patientGroups ? "rotate-180" : ""}`} />
                </button>
              </div>

              {(expandedSections.patientGroups || window.innerWidth >= 1024) && (
                <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                  <div>
                    <h3 className="text-lg font-semibold">Répartition des patients par pathologie</h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Vue d'ensemble des groupes de patients suivis</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 mt-4">
                    <div className="space-y-4">
                      {groupesPatients.map((groupe) => (
                        <div key={groupe.id} className={`flex items-center gap-4 p-3 rounded-lg dark:hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors ${isDarkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                          <div className={`${groupe.couleur} h-10 w-10 rounded-full flex items-center justify-center text-white font-medium`}>{groupe.nom.charAt(0)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{groupe.nom}</p>
                              <span className={`px-2 py-1 rounded-full text-xs ${groupe.tendance === "hausse" ? "bg-green-500" : groupe.tendance === "baisse" ? "bg-red-500" : "bg-gray-500"} text-white`}>
                                {groupe.tendance === "hausse" ? "↑" : groupe.tendance === "baisse" ? "↓" : "→"} {groupe.nombrePatients} patients
                              </span>
                            </div>
                            <div className={`mt-2 h-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full`}>
                              <div className={`h-full ${groupe.couleur} rounded-full`} style={{ width: `${groupe.progression}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="h-80">
                      <Doughnut data={patientChartData} options={doughnutOptions} />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Contenu de l'onglet Patients */}
          <div className={activeTab !== "patients" ? "hidden" : ""}>
            <div className={`rounded-xl p-6 shadow-lg mb-8 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
              <div>
                <h3 className="text-lg font-semibold">Rendez-vous récents</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Liste des rendez-vous pour la période sélectionnée</p>
              </div>
              <div className="space-y-4 mt-4">
                {filteredRendezVous.length > 0 ? (
                  filteredRendezVous.map((rdv) => (
                    <div key={rdv.id} className={`flex items-center gap-4 p-3 rounded-lg dark:hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors ${isDarkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                      <div className={`p-2 rounded-full ${rdv.statut === "Prochain" ? `${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}` : rdv.statut === "Terminé" ? `${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}` : `${isDarkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"}`}`}>
                        {rdv.statut === "Prochain" ? <Calendar className="h-5 w-5" /> : rdv.statut === "Terminé" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <p className="font-medium">{rdv.patientNom}</p>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}>{rdv.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${rdv.statut === "Prochain" ? "bg-green-500" : rdv.statut === "Terminé" ? "bg-green-500" : "bg-red-500"} text-white`}>{rdv.statut}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(rdv.date)}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{rdv.heure}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`}>Aucun rendez-vous trouvé pour cette période</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tâches */}
            <section className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Tâches
                  <span className={`text-sm font-normal ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>(Alt+3)</span>
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowAddTaskModal(true)} className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"><Plus className="h-4 w-4 mr-1 inline" /> Ajouter</button>
                  <button onClick={() => toggleSection("tasks")} className="lg:hidden p-2" aria-label={expandedSections.tasks ? "Réduire la section Tâches" : "Développer la section Tâches"}>
                    <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.tasks ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {(expandedSections.tasks || window.innerWidth >= 1024) && (
                <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                  <div className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {["Toutes", "Élevée", "Normale", "Basse"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setTaskFilter(filter as "Toutes" | "Élevée" | "Normale" | "Basse")}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${taskFilter === filter ? "bg-green-500 text-white" : `${isDarkMode ? "bg-gray-600 text-gray-300 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <select
                          value={taskSortBy}
                          onChange={(e) => setTaskSortBy(e.target.value as "date" | "priorite" | "nom")}
                          className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                        >
                          <option value="date">Trier par Date</option>
                          <option value="priorite">Trier par Priorité</option>
                          <option value="nom">Trier par Nom</option>
                        </select>
                        <div className="relative">
                          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                          <input
                            type="text"
                            placeholder="Rechercher..."
                            onChange={(e) => debouncedSetTaskSearch(e.target.value)}
                            className={`pl-9 p-2 rounded-lg ${isDarkMode ? "bg-gray-600 text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} w-full sm:w-[200px] border`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((tache) => (
                        <div key={tache.id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${tache.terminee ? `${isDarkMode ? "bg-gray-600 text-gray-400" : "bg-gray-200 text-gray-500"}` : `${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-100 hover:bg-gray-200"}`}`}>
                          {tache.priorite === "Élevée" ? (
                            <div className={`p-1.5 ${isDarkMode ? "bg-red-900/30" : "bg-red-100"} rounded-full`}>
                              <AlertCircle className={`h-4 w-4 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                            </div>
                          ) : tache.priorite === "Normale" ? (
                            <div className={`p-1.5 ${isDarkMode ? "bg-amber-900/30" : "bg-amber-100"} rounded-full`}>
                              <Activity className={`h-4 w-4 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
                            </div>
                          ) : (
                            <div className={`p-1.5 ${isDarkMode ? "bg-green-900/30" : "bg-green-100"} rounded-full`}>
                              <CheckCircle className={`h-4 w-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className={`font-medium ${tache.terminee ? "line-through" : ""}`}>{tache.description}</p>
                            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              <span>Priorité: {tache.priorite}</span>
                              <span>•</span>
                              <span>Assigné à: {tache.assignéÀ}</span>
                              <span>•</span>
                              <span>Échéance: {formatDate(tache.dueDate)}</span>
                            </div>
                          </div>
                          {!tache.terminee && (
                            <button
                              onClick={() => completeTask(tache.id)}
                              disabled={isLoading}
                              className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-400"
                            >
                              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Terminer"}
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Aucune tâche trouvée</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Contenu de l'onglet Médecins */}
          <div className={activeTab !== "medecins" ? "hidden" : ""}>
            <section className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-green-500" />
                  Médecins
                  <span className={`text-sm font-normal ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>(Alt+4)</span>
                </h2>
                <button onClick={() => toggleSection("doctors")} className="lg:hidden p-2" aria-label={expandedSections.doctors ? "Réduire la section Médecins" : "Développer la section Médecins"}>
                  <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections.doctors ? "rotate-180" : ""}`} />
                </button>
              </div>

              {(expandedSections.doctors || window.innerWidth >= 1024) && (
                <div className={`rounded-xl p-6 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                  <div className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <select
                        value={doctorSpecialtyFilter}
                        onChange={(e) => setDoctorSpecialtyFilter(e.target.value)}
                        className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-700"} w-full sm:w-[200px]`}
                      >
                        {specialitesData.map((specialite) => (
                          <option key={specialite} value={specialite}>{specialite}</option>
                        ))}
                      </select>
                      <div className="relative ml-auto">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                        <input
                          type="text"
                          placeholder="Rechercher un médecin..."
                          onChange={(e) => debouncedSetDoctorSearch(e.target.value)}
                          className={`pl-9 p-2 rounded-lg ${isDarkMode ? "bg-gray-600 text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"} w-full sm:w-[250px] border`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((medecin) => (
                        <div key={medecin.id} className={`rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ${isDarkMode ? "bg-gray-600" : "bg-gray-100"} overflow-hidden`}>
                          <div className="p-0">
                            <div className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 border-2 border-green-500 rounded-full overflow-hidden">
                                  <img
                                    src={medecin.img}
                                    alt={`Photo de ${medecin.nom}`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => (e.currentTarget.src = "/placeholder.svg?height=200&width=200")}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{medecin.nom}</p>
                                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{medecin.specialite}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <span className={`px-2 py-1 rounded-full text-xs ${medecin.statut === "Disponible" ? "bg-green-500" : "bg-red-500"} text-white`}>{medecin.statut}</span>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{medecin.horaires}</p>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm"><span className="font-medium">{medecin.patients}</span> patients</p>
                                <a href={`tel:${medecin.telephone}`} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors" aria-label={`Appeler ${medecin.nom}`}>
                                  <Phone className="h-4 w-4" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 col-span-full">
                        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Aucun médecin trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Modal pour ajouter une tâche */}
          {showAddTaskModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className={`rounded-xl p-6 w-full max-w-md shadow-2xl ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-900"}`}>
                <div>
                  <h3 className="text-lg font-semibold">Ajouter une nouvelle tâche</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Créez une nouvelle tâche à assigner à un médecin</p>
                </div>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="task-description" className="block text-sm font-medium">Description</label>
                    <input
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Entrez la description de la tâche"
                      className={`w-full p-2 rounded-lg border ${isDarkMode ? "bg-gray-600 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-gray-100 border-gray-300 text-gray-700 placeholder-gray-500"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="task-priority" className="block text-sm font-medium">Priorité</label>
                    <select
                      id="task-priority"
                      value={newTask.priorite}
                      onChange={(e) => setNewTask({ ...newTask, priorite: e.target.value as "Élevée" | "Normale" | "Basse" })}
                      className={`w-full p-2 rounded-lg border ${isDarkMode ? "bg-gray-600 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-700"}`}
                    >
                      <option value="Élevée">Élevée</option>
                      <option value="Normale">Normale</option>
                      <option value="Basse">Basse</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="task-due-date" className="block text-sm font-medium">Date d'échéance</label>
                    <input
                      id="task-due-date"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className={`w-full p-2 rounded-lg border ${isDarkMode ? "bg-gray-600 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-700"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="task-assignee" className="block text-sm font-medium">Assigné à</label>
                    <select
                      id="task-assignee"
                      value={newTask.assignéÀ}
                      onChange={(e) => setNewTask({ ...newTask, assignéÀ: e.target.value })}
                      className={`w-full p-2 rounded-lg border ${isDarkMode ? "bg-gray-600 border-gray-600 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-700"}`}
                    >
                      <option value="">Sélectionner un médecin</option>
                      {doctors.map((medecin) => (
                        <option key={medecin.id} value={medecin.nom}>{medecin.nom}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowAddTaskModal(false)} className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-600 hover:bg-gray-500 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"} transition-colors`}>Annuler</button>
                  <button
                    onClick={addTask}
                    disabled={!newTask.description || !newTask.dueDate || !newTask.assignéÀ || isLoading}
                    className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white"} transition-colors disabled:bg-gray-400`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                        Création...
                      </>
                    ) : (
                      "Ajouter la tâche"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default TableauDeBord
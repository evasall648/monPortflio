"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Home,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  LogOut,
  Bell,
  Settings,
  Moon,
  Sun,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import Messagerie from '@/components/messaging/Messagerie'

// Données pour le graphique d'évolution des paiements (tous les mois)
const yearlyPaymentData = [
  { month: "Jan", amount: 450000, shortMonth: "Jan" },
  { month: "Fév", amount: 480000, shortMonth: "Fév" },
  { month: "Mar", amount: 510000, shortMonth: "Mar" },
  { month: "Avr", amount: 540000, shortMonth: "Avr" },
  { month: "Mai", amount: 570000, shortMonth: "Mai" },
  { month: "Juin", amount: 0, shortMonth: "Juin" },
  { month: "Juil", amount: 0, shortMonth: "Juil" },
  { month: "Août", amount: 0, shortMonth: "Août" },
  { month: "Sept", amount: 0, shortMonth: "Sept" },
  { month: "Oct", amount: 0, shortMonth: "Oct" },
  { month: "Nov", amount: 0, shortMonth: "Nov" },
  { month: "Déc", amount: 0, shortMonth: "Déc" },
]

// Données par mois (janvier à juin 2025)
const monthlyData = {
  "2025-01": {
    buildings: { total: 12, occupied: 10, free: 2 },
    apartments: { total: 68, occupied: 42, free: 26, occupancyRate: 62 },
    contracts: { active: 42, toRenew: 5, new: 3 },
    pieData: [
      { name: "Dépenses Jan", value: 35, color: "#F59E0B" },
      { name: "Services Jan", value: 40, color: "#3B82F6" },
      { name: "Impenses Jan", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-001", tenant: "Marie Dupont", amount: 850, date: "15/01/2025", status: "Payé" },
      { id: "PAY-002", tenant: "Jean Martin", amount: 920, date: "12/01/2025", status: "Payé" },
      { id: "PAY-003", tenant: "Sophie Bernard", amount: 780, date: "10/01/2025", status: "En attente" },
      { id: "PAY-004", tenant: "Pierre Durand", amount: 850, date: "08/01/2025", status: "Payé" },
      { id: "PAY-005", tenant: "Anna Moreau", amount: 920, date: "05/01/2025", status: "En retard" },
    ],
    pendingPayments: [
      {
        id: "PEND-001",
        tenant: "Pierre Durand",
        amount: 850,
        dueDate: "31/01/2025",
        daysLate: 0,
        status: "En attente",
      },
      { id: "PEND-002", tenant: "Anna Moreau", amount: 920, dueDate: "28/01/2025", daysLate: 3, status: "En retard" },
      { id: "PEND-003", tenant: "Claire Dubois", amount: 780, dueDate: "25/01/2025", daysLate: 6, status: "En retard" },
    ],
  },
  "2025-02": {
    buildings: { total: 12, occupied: 11, free: 1 },
    apartments: { total: 68, occupied: 45, free: 23, occupancyRate: 66 },
    contracts: { active: 45, toRenew: 3, new: 2 },
    pieData: [
      { name: "Dépenses Fév", value: 30, color: "#F59E0B" },
      { name: "Services Fév", value: 45, color: "#3B82F6" },
      { name: "Impenses Fév", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-006", tenant: "Claire Dubois", amount: 890, date: "15/02/2025", status: "Payé" },
      { id: "PAY-007", tenant: "Marc Leroy", amount: 950, date: "12/02/2025", status: "Payé" },
      { id: "PAY-008", tenant: "Julie Petit", amount: 820, date: "10/02/2025", status: "En attente" },
      { id: "PAY-009", tenant: "Thomas Blanc", amount: 890, date: "08/02/2025", status: "Payé" },
      { id: "PAY-010", tenant: "Emma Rousseau", amount: 760, date: "05/02/2025", status: "Payé" },
    ],
    pendingPayments: [
      { id: "PEND-004", tenant: "Thomas Blanc", amount: 890, dueDate: "28/02/2025", daysLate: 0, status: "En attente" },
      { id: "PEND-005", tenant: "Emma Rousseau", amount: 760, dueDate: "25/02/2025", daysLate: 2, status: "En retard" },
    ],
  },
  "2025-03": {
    buildings: { total: 12, occupied: 11, free: 1 },
    apartments: { total: 68, occupied: 47, free: 21, occupancyRate: 69 },
    contracts: { active: 47, toRenew: 4, new: 3 },
    pieData: [
      { name: "Dépenses Mar", value: 32, color: "#F59E0B" },
      { name: "Services Mar", value: 43, color: "#3B82F6" },
      { name: "Impenses Mar", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-011", tenant: "Lucas Girard", amount: 870, date: "15/03/2025", status: "Payé" },
      { id: "PAY-012", tenant: "Camille Roux", amount: 930, date: "12/03/2025", status: "Payé" },
      { id: "PAY-013", tenant: "Nicolas Faure", amount: 800, date: "10/03/2025", status: "En retard" },
      { id: "PAY-014", tenant: "Léa Mercier", amount: 870, date: "08/03/2025", status: "Payé" },
      { id: "PAY-015", tenant: "Hugo Garnier", amount: 940, date: "05/03/2025", status: "Payé" },
    ],
    pendingPayments: [
      { id: "PEND-006", tenant: "Léa Mercier", amount: 870, dueDate: "31/03/2025", daysLate: 0, status: "En attente" },
      { id: "PEND-007", tenant: "Hugo Garnier", amount: 940, dueDate: "28/03/2025", daysLate: 1, status: "En retard" },
    ],
  },
  "2025-04": {
    buildings: { total: 12, occupied: 12, free: 0 },
    apartments: { total: 68, occupied: 50, free: 18, occupancyRate: 74 },
    contracts: { active: 50, toRenew: 6, new: 4 },
    pieData: [
      { name: "Dépenses Avr", value: 28, color: "#F59E0B" },
      { name: "Services Avr", value: 47, color: "#3B82F6" },
      { name: "Impenses Avr", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-016", tenant: "Manon Lefebvre", amount: 910, date: "15/04/2025", status: "Payé" },
      { id: "PAY-017", tenant: "Théo Moreau", amount: 880, date: "12/04/2025", status: "Payé" },
      { id: "PAY-018", tenant: "Chloé Simon", amount: 850, date: "10/04/2025", status: "Payé" },
      { id: "PAY-019", tenant: "Maxime Laurent", amount: 910, date: "08/04/2025", status: "Payé" },
      { id: "PAY-020", tenant: "Sarah Michel", amount: 820, date: "05/04/2025", status: "Payé" },
    ],
    pendingPayments: [
      {
        id: "PEND-008",
        tenant: "Maxime Laurent",
        amount: 910,
        dueDate: "30/04/2025",
        daysLate: 0,
        status: "En attente",
      },
      { id: "PEND-009", tenant: "Sarah Michel", amount: 820, dueDate: "27/04/2025", daysLate: 0, status: "En attente" },
    ],
  },
  "2025-05": {
    buildings: { total: 12, occupied: 12, free: 0 },
    apartments: { total: 68, occupied: 52, free: 16, occupancyRate: 76 },
    contracts: { active: 52, toRenew: 7, new: 5 },
    pieData: [
      { name: "Dépenses Mai", value: 30, color: "#F59E0B" },
      { name: "Services Mai", value: 45, color: "#3B82F6" },
      { name: "Impenses Mai", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-021", tenant: "Antoine Dubois", amount: 950, date: "15/05/2025", status: "Payé" },
      { id: "PAY-022", tenant: "Océane Martin", amount: 890, date: "12/05/2025", status: "Payé" },
      { id: "PAY-023", tenant: "Julien Petit", amount: 870, date: "10/05/2025", status: "En attente" },
      { id: "PAY-024", tenant: "Inès Leroy", amount: 950, date: "08/05/2025", status: "Payé" },
      { id: "PAY-025", tenant: "Gabriel Roux", amount: 830, date: "05/05/2025", status: "Payé" },
    ],
    pendingPayments: [
      { id: "PEND-010", tenant: "Inès Leroy", amount: 950, dueDate: "31/05/2025", daysLate: 0, status: "En attente" },
      { id: "PEND-011", tenant: "Gabriel Roux", amount: 830, dueDate: "28/05/2025", daysLate: 0, status: "En attente" },
    ],
  },
  "2025-06": {
    buildings: { total: 12, occupied: 12, free: 0 },
    apartments: { total: 68, occupied: 54, free: 14, occupancyRate: 79 },
    contracts: { active: 54, toRenew: 8, new: 6 },
    pieData: [
      { name: "Dépenses Juin", value: 33, color: "#F59E0B" },
      { name: "Services Juin", value: 42, color: "#3B82F6" },
      { name: "Impenses Juin", value: 25, color: "#EF4444" },
    ],
    recentPayments: [
      { id: "PAY-026", tenant: "Prévision 1", amount: 960, date: "15/06/2025", status: "Prévu" },
      { id: "PAY-027", tenant: "Prévision 2", amount: 900, date: "12/06/2025", status: "Prévu" },
      { id: "PAY-028", tenant: "Prévision 3", amount: 880, date: "10/06/2025", status: "Prévu" },
      { id: "PAY-029", tenant: "Prévision 4", amount: 960, date: "08/06/2025", status: "Prévu" },
      { id: "PAY-030", tenant: "Prévision 5", amount: 840, date: "05/06/2025", status: "Prévu" },
    ],
    pendingPayments: [
      { id: "PEND-012", tenant: "Prévision A", amount: 960, dueDate: "30/06/2025", daysLate: 0, status: "Prévu" },
      { id: "PEND-013", tenant: "Prévision B", amount: 840, dueDate: "27/06/2025", daysLate: 0, status: "Prévu" },
    ],
  },
}

// Données pour le graphique d'évolution mensuelle (tous les mois)
const monthlyEvolutionData = [
  { month: "Jan", revenue: 450000, expenses: 45000, profit: 405000 },
  { month: "Fév", revenue: 480000, expenses: 48000, profit: 432000 },
  { month: "Mar", revenue: 510000, expenses: 51000, profit: 459000 },
  { month: "Avr", revenue: 540000, expenses: 54000, profit: 486000 },
  { month: "Mai", revenue: 570000, expenses: 57000, profit: 513000 },
  { month: "Juin", revenue: 590000, expenses: 59000, profit: 531000 },
  { month: "Juil", revenue: 0, expenses: 0, profit: 0 },
  { month: "Août", revenue: 0, expenses: 0, profit: 0 },
  { month: "Sept", revenue: 0, expenses: 0, profit: 0 },
  { month: "Oct", revenue: 0, expenses: 0, profit: 0 },
  { month: "Nov", revenue: 0, expenses: 0, profit: 0 },
  { month: "Déc", revenue: 0, expenses: 0, profit: 0 },
]

// Données vides pour les mois futurs
const emptyData = {
  buildings: { total: 0, occupied: 0, free: 0 },
  apartments: { total: 0, occupied: 0, free: 0, occupancyRate: 0 },
  contracts: { active: 0, toRenew: 0, new: 0 },
  pieData: [],
  recentPayments: [],
  pendingPayments: [],
}

// Composant pour les graphiques circulaires
const CircularProgress = ({ percentage, color, size = 80 }: { percentage: number; color: string; size?: number }) => {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

// Composant personnalisé pour le tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    if (value === 0) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-500">Aucune donnée disponible</p>
        </div>
      )
    }
    return (
      <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-lg">
        <p className="font-medium text-blue-900">{`${label}`}</p>
        <p className="text-sm text-blue-600">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
          }).format(value)}
        </p>
      </div>
    )
  }
  return null
}

const AgentDashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState("2025-05") // Mai par défaut
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Utilisez le hook useAuth pour accéder à l'utilisateur connecté et à la fonction de déconnexion
  const { user, logout } = useAuth()

  // Mise à jour de la date et l'heure
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Génération des options de mois (tous les mois de 2025)
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1)
    return {
      value: date.toISOString().slice(0, 7),
      label: date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    }
  })

  // Récupération des données selon le mois sélectionné
  const data = monthlyData[selectedMonth as keyof typeof monthlyData] || emptyData
  const hasData = selectedMonth in monthlyData

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className={`h-full ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-white"}`}>
      <div className="h-full overflow-auto">
        {/* En-tête avec profil */}
        <div
          className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} border-b px-6 py-4`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-blue-900"}`}>Accueil</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Expire dans 8.2 jours abonnement
                </Badge>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-blue-600"} flex items-center gap-2`}>
                  <Calendar className="h-4 w-4" />
                  {currentDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <Clock className="h-4 w-4 ml-4" />
                  {currentDate.toLocaleTimeString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[200px] bg-white border-blue-200">
                  <SelectValue placeholder="Sélectionner un mois" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="border-blue-200"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                >
                  <Settings className="h-5 w-5" />
                </Button>
                {/* Zone du profil utilisateur - Afficher les infos de l'utilisateur connecté */}
                <div
                  className={`flex items-center gap-3 pl-4 border-l ${isDarkMode ? "border-gray-600" : "border-blue-200"}`}
                 // onClick={() => setIsProfileModalOpen(true)} // Géré plus tard avec la modale
                >
                  <Avatar className="h-8 w-8">
                    {/* Afficher la photo de l'utilisateur ou un fallback */}
                    <AvatarImage src={user?.photo_url ? `http://localhost/PROJET%20IMMO/backend/${user.photo_url}` : "/avatar.png"} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {/* Afficher les initiales si pas de photo */}
                      {user ? `${user.prenom[0]}${user.nom[0]}` : "JD"}
                      </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    {/* Afficher le nom et prénom de l'utilisateur */}
                    <p className={`font-medium ${isDarkMode ? "text-white" : "text-blue-900"}`}>{user ? `${user.prenom} ${user.nom}` : "John Doe"}</p>
                    {/* Afficher le rôle de l'utilisateur */}
                    <p className={`${isDarkMode ? "text-gray-300" : "text-blue-600"}`}>{user ? user.role : "Agent immobilier"}</p>
                  </div>
                </div>
                 {/* Bouton de déconnexion */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout} // Appel à la fonction de déconnexion du hook
                    className={`${isDarkMode ? "text-gray-300 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!hasData && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">Aucune donnée disponible pour ce mois.</span>
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            {/* Section principale (9/12) */}
            <div className="col-span-9">
              {/* Cartes statistiques principales - Bâtiments et Appartements */}
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">🏢</div>
                      <CircularProgress
                        percentage={
                          data.buildings.total > 0
                            ? Math.round((data.buildings.occupied / data.buildings.total) * 100)
                            : 0
                        }
                        color="#3B82F6"
                      />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                        Bâtiments
                      </h3>
                      <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                        {data.buildings.total}
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {data.buildings.occupied} occupés, {data.buildings.free} libres
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">🏠</div>
                      <CircularProgress percentage={data.apartments.occupancyRate} color="#10B981" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                        Appartements occupés
                      </h3>
                      <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                        {data.apartments.occupied}
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Sur {data.apartments.total} total
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">🏘️</div>
                      <CircularProgress
                        percentage={
                          data.apartments.total > 0
                            ? Math.round((data.apartments.free / data.apartments.total) * 100)
                            : 0
                        }
                        color="#F59E0B"
                      />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                        Appartements libres
                      </h3>
                      <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-1`}>
                        {data.apartments.free}
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Disponibles à la location
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cartes compactes - Contrats */}
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-lg">📄</span>
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Contrats actifs
                        </p>
                        <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.contracts.active}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-lg">⏰</span>
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          À renouveler
                        </p>
                        <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.contracts.toRenew}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-lg">✨</span>
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Nouveaux contrats
                        </p>
                        <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.contracts.new}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Graphiques */}
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                {/* Graphique en barres - Évolution des paiements mensuels (MODIFIÉ) */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                      Évolution des paiements mensuels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyPaymentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis
                            dataKey="shortMonth"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "#6B7280" }}
                          />
                          <YAxis hide />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="amount"
                            fill="#3B82F6"
                            radius={[4, 4, 0, 0]}
                            opacity={1}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Dépenses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Impenses</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      {hasData && data.pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={data.pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                              {data.pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                          Aucune donnée disponible
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tableaux des paiements */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Paiements en attente */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                      Paiements en attente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasData && data.pendingPayments.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={`border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Locataire
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Montant
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Échéance
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Statut
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.pendingPayments.map((payment, index) => (
                              <tr
                                key={index}
                                className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}
                              >
                                <td className={`py-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {payment.tenant}
                                </td>
                                <td className={`py-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {formatCurrency(payment.amount)}
                                </td>
                                <td className={`py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                  {payment.dueDate}
                                </td>
                                <td className="py-2">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      payment.status === "En attente"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : payment.status === "En retard"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {payment.status}
                                    {payment.daysLate > 0 && ` (${payment.daysLate}j)`}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-4">Aucun paiement en attente</div>
                    )}
                  </CardContent>
                </Card>

                {/* Paiements récents */}
                <Card
                  className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                      Paiements récents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasData && data.recentPayments.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={`border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Locataire
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Montant
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Date
                              </th>
                              <th className={`text-left py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Statut
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.recentPayments.map((payment, index) => (
                              <tr
                                key={index}
                                className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}
                              >
                                <td className={`py-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {payment.tenant}
                                </td>
                                <td className={`py-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {formatCurrency(payment.amount)}
                                </td>
                                <td className={`py-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                  {payment.date}
                                </td>
                                <td className="py-2">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      payment.status === "Payé"
                                        ? "bg-green-100 text-green-800"
                                        : payment.status === "En attente"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : payment.status === "Prévu"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {payment.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-4">Aucun paiement récent</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar droite (3/12) */}
            <div className="col-span-3 space-y-6">
              {/* Section Factures passées */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                    Factures passées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        PAYÉES
                      </div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {hasData
                          ? `${Math.round((data.contracts.active / (data.contracts.active + data.contracts.toRenew)) * 100)}%`
                          : "0%"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        IMPAYÉES
                      </div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {hasData
                          ? `${Math.round((data.contracts.toRenew / (data.contracts.active + data.contracts.toRenew)) * 100)}%`
                          : "0%"}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-200">
                    📊 Télécharger paiements
                  </Button>
                </CardContent>
              </Card>

              {/* Petit graphique - Évolution mensuelle */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}>
                <CardHeader className="pb-4">
                  <CardTitle
                    className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"} flex items-center gap-2`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Performance mensuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyEvolutionData.slice(0, 6)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#6B7280" }}
                        />
                        <YAxis hide />
                        <Tooltip formatter={(value: number) => [formatCurrency(value), ""]} />
                        <Bar dataKey="profit" fill="#10B981" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Section Bilan - Évolution annuelle */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                    Bilan annuel 2025
                  </CardTitle>
                  <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Évolution des revenus
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyEvolutionData}>
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                          connectNulls={false}
                        />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#6B7280" }}
                        />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value: number) => [value > 0 ? formatCurrency(value) : "Pas de données", ""]}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Section Résumés */}
              <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"} shadow-lg`}>
                <CardHeader className="pb-4">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-600"}`}>
                    Résumés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          LOCATAIRES
                        </div>
                        <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.contracts.active}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          BÂTIMENTS
                        </div>
                        <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.buildings.total}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Home className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          APPARTEMENTS
                        </div>
                        <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {data.apartments.total}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard

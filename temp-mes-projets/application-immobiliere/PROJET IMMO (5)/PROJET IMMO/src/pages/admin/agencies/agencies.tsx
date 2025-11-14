"use client"

import type React from "react"
import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/AdminCompotenants/ui/Card"
import {
  Plus,
  Search,
  Building,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Check,
  ChevronsUpDown,
  TrendingUp,
  Save,
  Star,
  DollarSign,
  Target,
  Clock,
  ImageIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/AdminCompotenants/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/AdminCompotenants/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Checkbox } from "@/components/AdminCompotenants/ui/checkbox"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { ScrollArea } from "@/components/AdminCompotenants/ui/scroll-area"
import { Textarea } from "@/components/AdminCompotenants/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"
import { Progress } from "@/components/AdminCompotenants/ui/progress"
import { toast } from "@/hooks/use-toast"
import { ModernChart } from "@/components/AdminCompotenants/ui/modern-chart"
import { StatsCard } from "@/components/AdminCompotenants/ui/stats-card"
import { FileUpload } from "@/components/AdminCompotenants/ui/file-upload"

// Types
interface Agency {
  id: number
  name: string
  address: string
  city: string
  zipCode: string
  phone: string
  email: string
  agentsCount: number
  buildingsCount: number
  apartmentsCount: number
  status: "active" | "inactive" | "pending"
  createdAt: string
  notes?: string
  image?: string
  rating: number
  performance: {
    occupancyRate: number
    revenueGrowth: number
    avgRent: number
    maintenanceRate: number
    satisfaction: number
    efficiency: number
  }
  monthlyData: Array<{
    month: string
    revenue: number
    occupancy: number
    newContracts: number
    satisfaction: number
  }>
}

interface AgencyFormData {
  name: string
  address: string
  city: string
  zipCode: string
  phone: string
  email: string
  status: "active" | "inactive" | "pending"
  image?: string
}

interface Property {
  id: number
  name: string
  type: "residential" | "commercial"
  address: string
  units: number
  occupancyRate: number
  revenue: number
  image?: string
  description?: string
  price?: number
}

interface PropertyFormData {
  name: string
  type: "residential" | "commercial"
  address: string
  units: number
  price: number
  description: string
}

interface Agent {
  id: number
  name: string
  role: "director" | "senior" | "junior"
  properties: number
  performance: number
  revenue: number
  image?: string
  email?: string
  phone?: string
}

// Localisation française
const t = {
  title: "Agences Immobilières",
  subtitle: "Plateforme de gestion avancée pour votre réseau d'agences",
  newAgency: "Nouvelle agence",
  addAgency: "Ajouter une agence",
  editAgency: "Modifier l'agence",
  deleteAgency: "Supprimer l'agence",
  viewDetails: "Voir les détails",
  export: "Exporter",
  filters: "Filtres",
  save: "Enregistrer",
  cancel: "Annuler",
  delete: "Supprimer",
  edit: "Modifier",
  add: "Ajouter",
  apply: "Appliquer",
  reset: "Réinitialiser",
  saving: "Enregistrement...",
  deleting: "Suppression...",
  loading: "Chargement...",
  active: "Actif",
  inactive: "Inactif",
  pending: "En attente",
  agencyName: "Nom de l'agence",
  address: "Adresse",
  city: "Ville",
  zipCode: "Code postal",
  phone: "Téléphone",
  email: "Email",
  status: "Statut",
  overview: "Vue d'ensemble",
  properties: "Propriétés",
  agents: "Agents",
  performance: "Performance",
  analytics: "Analyses",
  searchPlaceholder: "Rechercher une agence...",
  occupancyRate: "Taux d'occupation",
  revenueGrowth: "Croissance des revenus",
  avgRent: "Loyer moyen",
  maintenanceRate: "Taux d'entretien",
  satisfaction: "Satisfaction client",
  efficiency: "Efficacité",
  revenue: "Revenus",
  rating: "Note",
  viewAll: "Voir tout",
  managedProperties: "Propriétés gérées",
  realEstateAgents: "Agents immobiliers",
  performanceIndicators: "Indicateurs de performance",
  monthlyTrends: "Tendances mensuelles",
  keyMetrics: "Métriques clés",
  topPerformers: "Meilleurs performers",
  recentActivity: "Activité récente",
}

// Mock data initial avec images
const INITIAL_AGENCIES: Agency[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Agence ${["Immobilière", "du Centre", "Moderne", "Premium", "Elite", "Prestige"][i % 6]} ${i + 1}`,
  address: `${(i + 1) * 10} ${["Rue de la Paix", "Avenue des Champs", "Boulevard Haussmann", "Place Vendôme"][i % 4]}`,
  city: ["Paris", "Lyon", "Marseille", "Nice", "Toulouse"][i % 5],
  zipCode: ["75000", "69000", "13000", "06000", "31000"][i % 5],
  phone: `+33 1 ${String(i + 1).padStart(2, "0")} ${String(i + 1).padStart(2, "0")} ${String(i + 1).padStart(2, "0")} ${String(i + 1).padStart(2, "0")}`,
  email: `contact@agence${i + 1}.fr`,
  agentsCount: Math.floor(Math.random() * 15) + 3,
  buildingsCount: Math.floor(Math.random() * 20) + 5,
  apartmentsCount: Math.floor(Math.random() * 100) + 20,
  status: ["active", "inactive", "pending"][i % 3] as Agency["status"],
  createdAt: new Date(2023, i % 12, (i + 1) * 2).toISOString(),
  notes: "",
  image: `/placeholder.svg?height=200&width=300&text=Agence+${i + 1}`,
  rating: 3.5 + Math.random() * 1.5,
  performance: {
    occupancyRate: 75 + Math.floor(Math.random() * 20),
    revenueGrowth: -5 + Math.floor(Math.random() * 15),
    avgRent: 800 + Math.floor(Math.random() * 400),
    maintenanceRate: 2 + Math.floor(Math.random() * 8),
    satisfaction: 70 + Math.floor(Math.random() * 25),
    efficiency: 65 + Math.floor(Math.random() * 30),
  },
  monthlyData: Array.from({ length: 12 }, (_, month) => ({
    month: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"][month],
    revenue: 50000 + Math.floor(Math.random() * 30000),
    occupancy: 75 + Math.floor(Math.random() * 20),
    newContracts: 5 + Math.floor(Math.random() * 15),
    satisfaction: 70 + Math.floor(Math.random() * 25),
  })),
}))

// Utility functions pour la persistance
const STORAGE_KEY = "agencies-data"
const PROPERTIES_STORAGE_KEY = "properties-data"
const AGENTS_STORAGE_KEY = "agents-data"

const saveToStorage = (agencies: Agency[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(agencies))
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
    }
  }
}

const loadFromStorage = (): Agency[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error)
    }
  }
  return INITIAL_AGENCIES
}

const savePropertiesToStorage = (properties: Property[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties))
      console.log("Propriétés sauvegardées:", properties.length)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des propriétés:", error)
    }
  }
}

const loadPropertiesFromStorage = (): Property[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(PROPERTIES_STORAGE_KEY)
      if (stored) {
        const properties = JSON.parse(stored)
        console.log("Propriétés chargées:", properties.length)
        return properties
      }
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés:", error)
    }
  }
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Propriété ${i + 1}`,
    type: i % 2 === 0 ? "residential" : "commercial",
    address: `${(i + 1) * 15} Avenue de la République, Paris`,
    units: 4 + Math.floor(Math.random() * 16),
    occupancyRate: 70 + Math.floor(Math.random() * 25),
    revenue: 25000 + Math.floor(Math.random() * 35000),
    image: `/placeholder.svg?height=150&width=200&text=Propriété+${i + 1}`,
    description: `Description de la propriété ${i + 1}`,
    price: 250000 + Math.floor(Math.random() * 500000),
  }))
}

const saveAgentsToStorage = (agents: Agent[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents))
      console.log("Agents sauvegardés:", agents.length)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des agents:", error)
    }
  }
}

const loadAgentsFromStorage = (): Agent[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(AGENTS_STORAGE_KEY)
      if (stored) {
        const agents = JSON.parse(stored)
        console.log("Agents chargés:", agents.length)
        return agents
      }
    } catch (error) {
      console.error("Erreur lors du chargement des agents:", error)
    }
  }
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: ["Marie Dubois", "Pierre Martin", "Sophie Bernard", "Jean Moreau", "Lucie Petit", "Antoine Roux"][i],
    role: ["director", "senior", "senior", "junior", "junior", "junior"][i] as Agent["role"],
    properties: 5 + Math.floor(Math.random() * 15),
    performance: 75 + Math.floor(Math.random() * 20),
    revenue: 150000 + Math.floor(Math.random() * 100000),
    image: `/placeholder.svg?height=80&width=80&text=${["MD", "PM", "SB", "JM", "LP", "AR"][i]}`,
    email: `${["marie.dubois", "pierre.martin", "sophie.bernard", "jean.moreau", "lucie.petit", "antoine.roux"][i]}@agence.fr`,
    phone: `+33 1 ${String(i + 20).padStart(2, "0")} ${String(i + 10).padStart(2, "0")} ${String(i + 5).padStart(2, "0")} ${String(i + 15).padStart(2, "0")}`,
  }))
}

// Helper Components
const AgencyStatusBadge = ({ status }: { status: Agency["status"] }) => {
  const variants = {
    active: {
      className:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      icon: CheckCircle2,
      label: t.active,
    },
    inactive: {
      className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      icon: AlertCircle,
      label: t.inactive,
    },
    pending: {
      className:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      icon: Clock,
      label: t.pending,
    },
  }

  const variant = variants[status]
  const Icon = variant.icon

  return (
    <Badge className={`${variant.className} px-3 py-1 text-xs font-medium`}>
      <Icon className="h-3 w-3 mr-1" />
      {variant.label}
    </Badge>
  )
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = "blue",
}: {
  title: string
  value: string | number
  change?: number
  icon: React.ComponentType<{ className?: string }>
  color?: string
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    orange: "from-orange-500 to-amber-500",
    red: "from-red-500 to-pink-500",
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {change >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {change >= 0 ? "+" : ""}
                {change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

const RatingDisplay = ({ rating }: { rating: number }) => (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))}
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">{rating.toFixed(1)}</span>
  </div>
)

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-full mb-4">
      <Building className="h-12 w-12 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Aucune agence trouvée</h3>
    <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
      Commencez par ajouter votre première agence immobilière à la plateforme.
    </p>
    <Button
      onClick={onAdd}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
    >
      <Plus className="h-4 w-4 mr-2" />
      {t.addAgency}
    </Button>
  </div>
)

const getImageSrc = (image: string | undefined, fallback: string) => {
  if (!image) return fallback
  // Si l'image est une URL data (base64), l'utiliser directement
  if (image.startsWith("data:")) return image
  // Si l'image est une URL, l'utiliser directement
  if (image.startsWith("http") || image.startsWith("/")) return image
  // Sinon, utiliser le fallback
  return fallback
}

export default function ModernAgenciesPage() {
  // State principal avec persistance
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "city" | "rating" | "performance">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  const [filterCity, setFilterCity] = useState("")

  // Dialog states
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [currentAgency, setCurrentAgency] = useState<Agency | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Agent dialog states
  const [showAddAgentDialog, setShowAddAgentDialog] = useState(false)
  const [showEditAgentDialog, setShowEditAgentDialog] = useState(false)
  const [showDeleteAgentDialog, setShowDeleteAgentDialog] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [agentFormData, setAgentFormData] = useState({
    name: "",
    role: "junior" as Agent["role"],
    email: "",
    phone: "",
  })
  const [agentImage, setAgentImage] = useState<string | null>(null)

  // Property dialog states
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false)
  const [showEditPropertyDialog, setShowEditPropertyDialog] = useState(false)
  const [showDeletePropertyDialog, setShowDeletePropertyDialog] = useState(false)
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null)
  const [propertyFormData, setPropertyFormData] = useState<PropertyFormData>({
    name: "",
    type: "residential",
    address: "",
    units: 1,
    price: 0,
    description: "",
  })
  const [propertyImage, setPropertyImage] = useState<string | null>(null)

  // Form states
  const [formData, setFormData] = useState<AgencyFormData>({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    status: "active",
  })
  const [notes, setNotes] = useState("")
  const [agencyImage, setAgencyImage] = useState<string | null>(null)

  // CORRECTION: États séparés pour properties et agents avec forçage de re-render
  const [properties, setProperties] = useState<Property[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [dataVersion, setDataVersion] = useState(0) // Pour forcer les re-renders

  // Charger les données au montage du composant
  useEffect(() => {
    console.log("Chargement initial des données...")
    const savedAgencies = loadFromStorage()
    const savedProperties = loadPropertiesFromStorage()
    const savedAgents = loadAgentsFromStorage()

    setAgencies(savedAgencies)
    setProperties(savedProperties)
    setAgents(savedAgents)

    console.log("Données chargées:", {
      agencies: savedAgencies.length,
      properties: savedProperties.length,
      agents: savedAgents.length,
    })
  }, [])

  // Sauvegarder automatiquement quand les données changent
  useEffect(() => {
    if (agencies.length > 0) {
      saveToStorage(agencies)
    }
  }, [agencies])

  // CORRECTION: Fonctions de mise à jour avec callback pour forcer le re-render
  const updateProperties = useCallback((newProperties: Property[]) => {
    console.log("Mise à jour des propriétés:", newProperties.length)
    setProperties(newProperties)
    savePropertiesToStorage(newProperties)
    setDataVersion((prev) => prev + 1) // Force le re-render
  }, [])

  const updateAgents = useCallback((newAgents: Agent[]) => {
    console.log("Mise à jour des agents:", newAgents.length)
    setAgents(newAgents)
    saveAgentsToStorage(newAgents)
    setDataVersion((prev) => prev + 1) // Force le re-render
  }, [])

  // Filtered and sorted agencies
  const filteredAgencies = useMemo(() => {
    return agencies
      .filter((agency) => {
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          if (
            !agency.name.toLowerCase().includes(query) &&
            !agency.city.toLowerCase().includes(query) &&
            !agency.email.toLowerCase().includes(query)
          ) {
            return false
          }
        }

        if (filterStatus.length > 0 && !filterStatus.includes(agency.status)) {
          return false
        }

        if (filterCity && filterCity !== "all" && agency.city !== filterCity) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name)
            break
          case "city":
            comparison = a.city.localeCompare(b.city)
            break
          case "rating":
            comparison = a.rating - b.rating
            break
          case "performance":
            comparison = a.performance.occupancyRate - b.performance.occupancyRate
            break
        }

        return sortOrder === "asc" ? comparison : -comparison
      })
  }, [agencies, searchQuery, filterStatus, filterCity, sortBy, sortOrder])

  // Global statistics
  const globalStats = useMemo(() => {
    const total = agencies.length
    const active = agencies.filter((a) => a.status === "active").length
    const avgRating = total > 0 ? agencies.reduce((sum, a) => sum + a.rating, 0) / total : 0
    const totalRevenue = agencies.reduce(
      (sum, a) => sum + a.monthlyData.reduce((monthSum, m) => monthSum + m.revenue, 0),
      0,
    )
    const avgOccupancy = total > 0 ? agencies.reduce((sum, a) => sum + a.performance.occupancyRate, 0) / total : 0

    return {
      total,
      active,
      avgRating,
      totalRevenue,
      avgOccupancy,
      growth: 12.5, // Mock growth percentage
    }
  }, [agencies])

  // Chart data
  const chartData = useMemo(() => {
    const firstAgency = agencies[0] || INITIAL_AGENCIES[0]

    const revenueData =
      firstAgency?.monthlyData.map((item) => ({
        name: item.month,
        value: item.revenue,
      })) || []

    const occupancyData =
      firstAgency?.monthlyData.map((item) => ({
        name: item.month,
        value: item.occupancy,
      })) || []

    const performanceData = agencies.slice(0, 6).map((agency) => ({
      name: agency.name.split(" ").slice(0, 2).join(" "),
      value: agency.performance.occupancyRate,
    }))

    const statusData = [
      { name: "Actif", value: agencies.filter((a) => a.status === "active").length },
      { name: "Inactif", value: agencies.filter((a) => a.status === "inactive").length },
      { name: "En attente", value: agencies.filter((a) => a.status === "pending").length },
    ]

    return { revenueData, occupancyData, performanceData, statusData }
  }, [agencies])

  // Handlers
  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
      email: "",
      status: "active",
    })
    setAgencyImage(null)
  }

  // CORRECTION: Fonctions de reset améliorées
  const resetPropertyForm = useCallback(() => {
    setPropertyFormData({
      name: "",
      type: "residential",
      address: "",
      units: 1,
      price: 0,
      description: "",
    })
    setPropertyImage(null)
    setCurrentProperty(null)
  }, [])

  const resetAgentForm = useCallback(() => {
    setAgentFormData({
      name: "",
      role: "junior",
      email: "",
      phone: "",
    })
    setAgentImage(null)
    setCurrentAgent(null)
  }, [])

  const getNextId = () => {
    if (agencies.length === 0) return 1
    return Math.max(...agencies.map((a) => a.id)) + 1
  }

  const getNextPropertyId = () => {
    if (properties.length === 0) return 1
    return Math.max(...properties.map((p) => p.id)) + 1
  }

  const getNextAgentId = () => {
    if (agents.length === 0) return 1
    return Math.max(...agents.map((a) => a.id)) + 1
  }

  const handleSaveAgency = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (showAddDialog) {
        const newAgency: Agency = {
          id: getNextId(),
          name: formData.name,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          phone: formData.phone,
          email: formData.email,
          agentsCount: 0,
          buildingsCount: 0,
          apartmentsCount: 0,
          status: formData.status,
          createdAt: new Date().toISOString(),
          notes: "",
          image: agencyImage || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(formData.name)}`,
          rating: 4.0,
          performance: {
            occupancyRate: 85,
            revenueGrowth: 0,
            avgRent: 900,
            maintenanceRate: 5,
            satisfaction: 80,
            efficiency: 75,
          },
          monthlyData: Array.from({ length: 12 }, (_, month) => ({
            month: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"][month],
            revenue: 50000,
            occupancy: 85,
            newContracts: 8,
            satisfaction: 80,
          })),
        }

        setAgencies((prev) => [...prev, newAgency])
        setShowAddDialog(false)
        resetForm()

        toast({
          title: "Agence ajoutée",
          description: `L'agence ${newAgency.name} a été ajoutée avec succès.`,
        })
      } else if (showEditDialog && currentAgency) {
        const updatedAgencies = agencies.map((agency) =>
          agency.id === currentAgency.id
            ? {
                ...agency,
                name: formData.name,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
                phone: formData.phone,
                email: formData.email,
                status: formData.status,
                image: agencyImage || agency.image,
              }
            : agency,
        )

        setAgencies(updatedAgencies)
        setShowEditDialog(false)
        resetForm()

        toast({
          title: "Agence modifiée",
          description: `L'agence ${formData.name} a été modifiée avec succès.`,
        })
      }

      setIsLoading(false)
    }, 800)
  }

  const handleDeleteAgency = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (currentAgency) {
        const updatedAgencies = agencies.filter((agency) => agency.id !== currentAgency.id)
        setAgencies(updatedAgencies)
        toast({
          title: "Agence supprimée",
          description: `L'agence ${currentAgency.name} a été supprimée avec succès.`,
        })
      }

      setShowDeleteDialog(false)
      setCurrentAgency(null)
      setIsLoading(false)
    }, 600)
  }

  const handleOpenEditDialog = (agency: Agency) => {
    setCurrentAgency(agency)
    setFormData({
      name: agency.name,
      address: agency.address,
      city: agency.city,
      zipCode: agency.zipCode,
      phone: agency.phone,
      email: agency.email,
      status: agency.status,
    })
    // Charger l'image existante
    setAgencyImage(agency.image || null)
    setShowEditDialog(true)
  }

  const handleOpenDetailDialog = (agency: Agency) => {
    setCurrentAgency(agency)
    setNotes(agency.notes || "")
    setActiveTab("overview")
    setShowDetailDialog(true)
  }

  const handleImageUpload = (_file: File | null, preview: string | null) => {
    setAgencyImage(preview)
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as "active" | "inactive" | "pending" })
  }

  // CORRECTION: Property handlers complètement refaits
  const handleSaveProperty = useCallback(() => {
    if (!propertyFormData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la propriété est requis.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log("Sauvegarde de la propriété:", propertyFormData)

    // Simulation d'une sauvegarde asynchrone
    setTimeout(() => {
      try {
        if (showAddPropertyDialog) {
          const newProperty: Property = {
            id: getNextPropertyId(),
            name: propertyFormData.name.trim(),
            type: propertyFormData.type,
            address: propertyFormData.address.trim(),
            units: propertyFormData.units,
            occupancyRate: 85,
            revenue: 25000,
            image:
              propertyImage ||
              `/placeholder.svg?height=150&width=200&text=${encodeURIComponent(propertyFormData.name)}`,
            description: propertyFormData.description.trim(),
            price: propertyFormData.price,
          }

          console.log("Nouvelle propriété créée:", newProperty)

          // Mise à jour immédiate de l'état
          const updatedProperties = [...properties, newProperty]
          updateProperties(updatedProperties)

          // Fermer le dialogue et réinitialiser
          setShowAddPropertyDialog(false)
          resetPropertyForm()

          toast({
            title: "Propriété ajoutée",
            description: `La propriété "${newProperty.name}" a été ajoutée avec succès.`,
          })
        } else if (showEditPropertyDialog && currentProperty) {
          const updatedProperties = properties.map((property) =>
            property.id === currentProperty.id
              ? {
                  ...property,
                  name: propertyFormData.name.trim(),
                  type: propertyFormData.type,
                  address: propertyFormData.address.trim(),
                  units: propertyFormData.units,
                  description: propertyFormData.description.trim(),
                  price: propertyFormData.price,
                  image: propertyImage || property.image,
                }
              : property,
          )

          console.log(
            "Propriété modifiée:",
            updatedProperties.find((p) => p.id === currentProperty.id),
          )

          updateProperties(updatedProperties)
          setShowEditPropertyDialog(false)
          resetPropertyForm()

          toast({
            title: "Propriété modifiée",
            description: `La propriété "${propertyFormData.name}" a été modifiée avec succès.`,
          })
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error)
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la sauvegarde.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }, 500) // Délai réduit pour une meilleure UX
  }, [
    propertyFormData,
    propertyImage,
    properties,
    showAddPropertyDialog,
    showEditPropertyDialog,
    currentProperty,
    updateProperties,
    resetPropertyForm,
  ])

  const handleDeleteProperty = useCallback(() => {
    if (!currentProperty) return

    setIsLoading(true)
    console.log("Suppression de la propriété:", currentProperty.id)

    setTimeout(() => {
      const updatedProperties = properties.filter((property) => property.id !== currentProperty.id)
      updateProperties(updatedProperties)

      setShowDeletePropertyDialog(false)
      setCurrentProperty(null)
      setIsLoading(false)

      toast({
        title: "Propriété supprimée",
        description: `La propriété "${currentProperty.name}" a été supprimée avec succès.`,
      })
    }, 300)
  }, [currentProperty, properties, updateProperties])

  const handleOpenEditPropertyDialog = useCallback((property: Property) => {
    console.log("Ouverture de l'édition pour la propriété:", property)
    setCurrentProperty(property)
    setPropertyFormData({
      name: property.name,
      type: property.type,
      address: property.address,
      units: property.units,
      price: property.price || 0,
      description: property.description || "",
    })
    setPropertyImage(property.image || null)
    setShowEditPropertyDialog(true)
  }, [])

  // CORRECTION: Agent handlers complètement refaits
  const handleSaveAgent = useCallback(() => {
    if (!agentFormData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de l'agent est requis.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    console.log("Sauvegarde de l'agent:", agentFormData)

    setTimeout(() => {
      try {
        if (showAddAgentDialog) {
          const newAgent: Agent = {
            id: getNextAgentId(),
            name: agentFormData.name.trim(),
            role: agentFormData.role,
            properties: 0,
            performance: 75,
            revenue: 150000,
            email: agentFormData.email.trim(),
            phone: agentFormData.phone.trim(),
            image:
              agentImage ||
              `/placeholder.svg?height=80&width=80&text=${agentFormData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}`,
          }

          console.log("Nouvel agent créé:", newAgent)

          const updatedAgents = [...agents, newAgent]
          updateAgents(updatedAgents)

          setShowAddAgentDialog(false)
          resetAgentForm()

          toast({
            title: "Agent ajouté",
            description: `L'agent "${newAgent.name}" a été ajouté avec succès.`,
          })
        } else if (showEditAgentDialog && currentAgent) {
          const updatedAgents = agents.map((agent) =>
            agent.id === currentAgent.id
              ? {
                  ...agent,
                  name: agentFormData.name.trim(),
                  role: agentFormData.role,
                  email: agentFormData.email.trim(),
                  phone: agentFormData.phone.trim(),
                  image: agentImage || agent.image,
                }
              : agent,
          )

          console.log(
            "Agent modifié:",
            updatedAgents.find((a) => a.id === currentAgent.id),
          )

          updateAgents(updatedAgents)
          setShowEditAgentDialog(false)
          resetAgentForm()

          toast({
            title: "Agent modifié",
            description: `L'agent "${agentFormData.name}" a été modifié avec succès.`,
          })
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error)
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la sauvegarde.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }, 500)
  }, [
    agentFormData,
    agentImage,
    agents,
    showAddAgentDialog,
    showEditAgentDialog,
    currentAgent,
    updateAgents,
    resetAgentForm,
  ])

  const handleDeleteAgent = useCallback(() => {
    if (!currentAgent) return

    setIsLoading(true)
    console.log("Suppression de l'agent:", currentAgent.id)

    setTimeout(() => {
      const updatedAgents = agents.filter((agent) => agent.id !== currentAgent.id)
      updateAgents(updatedAgents)

      setShowDeleteAgentDialog(false)
      setCurrentAgent(null)
      setIsLoading(false)

      toast({
        title: "Agent supprimé",
        description: `L'agent "${currentAgent.name}" a été supprimé avec succès.`,
      })
    }, 300)
  }, [currentAgent, agents, updateAgents])

  const handleOpenEditAgentDialog = useCallback((agent: Agent) => {
    console.log("Ouverture de l'édition pour l'agent:", agent)
    setCurrentAgent(agent)
    setAgentFormData({
      name: agent.name,
      role: agent.role,
      email: agent.email || "",
      phone: agent.phone || "",
    })
    setAgentImage(agent.image || null)
    setShowEditAgentDialog(true)
  }, [])

  const handleAgentImageUpload = (_file: File | null, preview: string | null) => {
    setAgentImage(preview)
  }

  const handlePropertyImageUpload = (_file: File | null, preview: string | null) => {
    setPropertyImage(preview)
  }

  const handleCloseAddDialog = () => {
    setShowAddDialog(false)
    resetForm()
  }

  const handleCloseEditDialog = () => {
    setShowEditDialog(false)
    resetForm()
    setCurrentAgency(null)
  }

  // CORRECTION: Handlers de fermeture améliorés
  const handleCloseAddPropertyDialog = useCallback(() => {
    setShowAddPropertyDialog(false)
    resetPropertyForm()
  }, [resetPropertyForm])

  const handleCloseEditPropertyDialog = useCallback(() => {
    setShowEditPropertyDialog(false)
    resetPropertyForm()
  }, [resetPropertyForm])

  const handleCloseAddAgentDialog = useCallback(() => {
    setShowAddAgentDialog(false)
    resetAgentForm()
  }, [resetAgentForm])

  const handleCloseEditAgentDialog = useCallback(() => {
    setShowEditAgentDialog(false)
    resetAgentForm()
  }, [resetAgentForm])

  // Debug: Afficher les données actuelles
  useEffect(() => {
    console.log("État actuel - Properties:", properties.length, "Agents:", agents.length, "Version:", dataVersion)
  }, [properties, agents, dataVersion])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header avec statistiques globales */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {t.export}
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.newAgency}
              </Button>
            </div>
          </div>

          {/* Global Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatsCard
              title="Total Agences"
              value={globalStats.total}
              change={globalStats.growth}
              changeLabel="ce mois"
              icon={Building}
              colorScheme="blue"
            />
            <StatsCard title="Agences Actives" value={globalStats.active} icon={CheckCircle2} colorScheme="green" />
            <StatsCard title="Note Moyenne" value={globalStats.avgRating.toFixed(1)} icon={Star} colorScheme="orange" />
            <StatsCard
              title="Revenus Totaux"
              value={`${(globalStats.totalRevenue / 1000000).toFixed(1)}M€`}
              change={8.2}
              changeLabel="vs mois dernier"
              icon={DollarSign}
              colorScheme="green"
            />
            <StatsCard
              title="Taux d'Occupation"
              value={`${globalStats.avgOccupancy.toFixed(0)}%`}
              change={2.4}
              icon={TrendingUp}
              colorScheme="purple"
            />
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModernChart
              data={chartData.revenueData}
              type="area"
              title="Évolution des Revenus (12 mois)"
              height={300}
              gradient={true}
            />
          </div>
          <div>
            <ModernChart
              data={chartData.statusData}
              type="pie"
              title="Répartition par Statut"
              height={300}
              showLegend={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModernChart data={chartData.occupancyData} type="line" title="Taux d'Occupation Mensuel" height={250} />
          <ModernChart data={chartData.performanceData} type="bar" title="Performance par Agence" height={250} />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={t.searchPlaceholder}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 shadow-sm"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="w-48 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {Array.from(new Set(agencies.map((a) => a.city))).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Statut
                  {filterStatus.length > 0 && (
                    <Badge className="ml-2 bg-cyan-600 text-white">{filterStatus.length}</Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["active", "inactive", "pending"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      setFilterStatus((prev) =>
                        prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
                      )
                    }}
                  >
                    <Checkbox checked={filterStatus.includes(status)} className="mr-2" />
                    {status === "active" ? t.active : status === "inactive" ? t.inactive : t.pending}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-600"
                >
                  <ChevronsUpDown className="h-4 w-4 mr-2" />
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("name")
                    setSortOrder(sortBy === "name" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Nom {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("city")
                    setSortOrder(sortBy === "city" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Ville {sortBy === "city" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("rating")
                    setSortOrder(sortBy === "rating" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Note {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("performance")
                    setSortOrder(sortBy === "performance" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Performance {sortBy === "performance" && (sortOrder === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length === 0 ? (
          <EmptyState onAdd={() => setShowAddDialog(true)} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAgencies.map((agency) => (
              <Card
                key={agency.id}
                className="group overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={agency.image || "/placeholder.svg"}
                    alt={agency.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <AgencyStatusBadge status={agency.status} />
                  </div>
                  <div className="absolute top-4 right-4">
                    <RatingDisplay rating={agency.rating} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{agency.name}</h3>
                    <p className="text-white/80 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {agency.city}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        {agency.performance.occupancyRate}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Occupation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {agency.performance.revenueGrowth >= 0 ? "+" : ""}
                        {agency.performance.revenueGrowth}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Croissance</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Agents:</span>
                      <span className="font-medium">{agency.agentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Propriétés:</span>
                      <span className="font-medium">{agency.buildingsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Satisfaction:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={agency.performance.satisfaction} className="w-16 h-2" />
                        <span className="font-medium text-xs">{agency.performance.satisfaction}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenDetailDialog(agency)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(agency)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setCurrentAgency(agency)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Add Agency Dialog */}
        <Dialog open={showAddDialog} onOpenChange={handleCloseAddDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Ajouter une nouvelle agence</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle agence immobilière.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="agency-image" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de l'agence
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={agencyImage || ""}
                      onChange={handleImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />

                    {!agencyImage && (
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Cliquez sur "Parcourir mon ordinateur" pour sélectionner une image
                        </p>
                        <p className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Vous pouvez aussi glisser-déposer une image directement
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'agence</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Agence Immobilière du Centre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Ex: 123 Rue de la République"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Ex: Paris"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      placeholder="Ex: 75001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Ex: +33 1 23 45 67 89"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Ex: contact@agence.fr"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseAddDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveAgency}
                disabled={!formData.name || !formData.email || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Ajouter l'agence
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agency Dialog */}
        <Dialog open={showEditDialog} onOpenChange={handleCloseEditDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Modifier l'agence</DialogTitle>
              <DialogDescription>Modifiez les informations de l'agence {currentAgency?.name}.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="agency-image-edit" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de l'agence
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={agencyImage || ""}
                      onChange={handleImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />

                    {!agencyImage && (
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Cliquez sur "Parcourir mon ordinateur" pour changer l'image
                        </p>
                        <p className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Vous pouvez aussi glisser-déposer une nouvelle image
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-edit">Nom de l'agence</Label>
                    <Input
                      id="name-edit"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Agence Immobilière du Centre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status-edit">Statut</Label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address-edit">Adresse complète</Label>
                  <Input
                    id="address-edit"
                    value={formData.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Ex: 123 Rue de la République"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city-edit">Ville</Label>
                    <Input
                      id="city-edit"
                      value={formData.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Ex: Paris"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode-edit">Code postal</Label>
                    <Input
                      id="zipCode-edit"
                      value={formData.zipCode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      placeholder="Ex: 75001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-edit">Téléphone</Label>
                    <Input
                      id="phone-edit"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Ex: +33 1 23 45 67 89"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-edit">Email</Label>
                    <Input
                      id="email-edit"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Ex: contact@agence.fr"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseEditDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveAgency}
                disabled={!formData.name || !formData.email || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Modification...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-600 dark:text-red-400">Supprimer l'agence</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Êtes-vous sûr de vouloir supprimer l'agence "{currentAgency?.name}" ? Cette action est irréversible et
                supprimera toutes les données associées.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isLoading}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteAgency} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer définitivement
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        {currentAgency && (
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogContent className="sm:max-w-6xl max-h-[90vh] bg-white dark:bg-gray-800">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden">
                      <img
                        src={currentAgency.image || "/placeholder.svg"}
                        alt={currentAgency.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {currentAgency.name}
                      </DialogTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <AgencyStatusBadge status={currentAgency.status} />
                        <RatingDisplay rating={currentAgency.rating} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowDetailDialog(false)
                        setTimeout(() => handleOpenEditDialog(currentAgency), 100)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="h-[70vh] mt-4 pr-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="w-full justify-start bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 px-6 py-2 rounded-md transition-colors"
                    >
                      Vue d'ensemble
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 px-6 py-2 rounded-md transition-colors"
                    >
                      Analyses
                    </TabsTrigger>
                    <TabsTrigger
                      value="properties"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 px-6 py-2 rounded-md transition-colors"
                    >
                      Propriétés ({properties.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="agents"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 px-6 py-2 rounded-md transition-colors"
                    >
                      Équipe ({agents.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard
                        title="Taux d'occupation"
                        value={`${currentAgency.performance.occupancyRate}%`}
                        change={currentAgency.performance.revenueGrowth}
                        icon={TrendingUp}
                        color="blue"
                      />
                      <MetricCard
                        title="Satisfaction client"
                        value={`${currentAgency.performance.satisfaction}%`}
                        icon={Star}
                        color="orange"
                      />
                      <MetricCard
                        title="Efficacité"
                        value={`${currentAgency.performance.efficiency}%`}
                        icon={Target}
                        color="green"
                      />
                      <MetricCard
                        title="Loyer moyen"
                        value={`${currentAgency.performance.avgRent}€`}
                        icon={DollarSign}
                        color="purple"
                      />
                    </div>

                    {/* Contact Information */}
                    <Card className="bg-white dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Informations de contact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">Adresse</div>
                              <div className="text-gray-600 dark:text-gray-400">
                                {currentAgency.address}, {currentAgency.zipCode} {currentAgency.city}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">Téléphone</div>
                              <div className="text-gray-600 dark:text-gray-400">{currentAgency.phone}</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">Email</div>
                              <div className="text-gray-600 dark:text-gray-400">{currentAgency.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">Créé le</div>
                              <div className="text-gray-600 dark:text-gray-400">
                                {new Date(currentAgency.createdAt).toLocaleDateString("fr-FR")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card className="bg-white dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle>Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder="Ajouter des notes sur cette agence..."
                          value={notes}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => {
                            // Handle save notes
                            toast({
                              title: "Notes sauvegardées",
                              description: "Les notes ont été enregistrées avec succès.",
                            })
                          }}
                          className="w-full"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer les notes
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ModernChart
                        data={currentAgency.monthlyData.map((item) => ({
                          name: item.month,
                          value: item.revenue,
                        }))}
                        type="area"
                        title="Revenus mensuels"
                        height={250}
                      />
                      <ModernChart
                        data={currentAgency.monthlyData.map((item) => ({
                          name: item.month,
                          value: item.occupancy,
                        }))}
                        type="line"
                        title="Taux d'occupation"
                        height={250}
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ModernChart
                        data={currentAgency.monthlyData.map((item) => ({
                          name: item.month,
                          value: item.newContracts,
                        }))}
                        type="bar"
                        title="Nouveaux contrats"
                        height={250}
                      />
                      <ModernChart
                        data={currentAgency.monthlyData.map((item) => ({
                          name: item.month,
                          value: item.satisfaction,
                        }))}
                        type="line"
                        title="Satisfaction client"
                        height={250}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="properties" className="space-y-6" key={`properties-${dataVersion}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Propriétés gérées ({properties.length})</h3>
                      <Button variant="outline" size="sm" onClick={() => setShowAddPropertyDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une propriété
                      </Button>
                    </div>
                    {properties.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Aucune propriété ajoutée pour le moment.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setShowAddPropertyDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter votre première propriété
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {properties.map((property) => (
                          <Card key={`property-${property.id}-${dataVersion}`} className="overflow-hidden">
                            <div className="relative h-32">
                              <img
                                src={getImageSrc(
                                  property.image,
                                  `/placeholder.svg?height=150&width=200&text=${encodeURIComponent(property.name) || "/placeholder.svg"}`,
                                )}
                                alt={property.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = `/placeholder.svg?height=150&width=200&text=${encodeURIComponent(property.name)}`
                                }}
                              />
                              <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
                                {property.type === "residential" ? "Résidentiel" : "Commercial"}
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">{property.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{property.address}</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Unités:</span>
                                  <span className="font-medium ml-1">{property.units}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Occupation:</span>
                                  <span className="font-medium ml-1">{property.occupancyRate}%</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <span className="text-gray-500 text-sm">Revenus:</span>
                                <span className="font-bold text-green-600 ml-1">
                                  {property.revenue.toLocaleString()}€/mois
                                </span>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenEditPropertyDialog(property)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setCurrentProperty(property)
                                  setShowDeletePropertyDialog(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="agents" className="space-y-6" key={`agents-${dataVersion}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Équipe de l'agence ({agents.length})</h3>
                      <Button variant="outline" size="sm" onClick={() => setShowAddAgentDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un agent
                      </Button>
                    </div>
                    {agents.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Aucun agent ajouté pour le moment.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setShowAddAgentDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter votre premier agent
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agents.map((agent) => (
                          <Card key={`agent-${agent.id}-${dataVersion}`} className="overflow-hidden">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={getImageSrc(
                                      agent.image,
                                      `/placeholder.svg?height=80&width=80&text=${
                                        agent.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("") || "/placeholder.svg"
                                      }`,
                                    )}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = `/placeholder.svg?height=80&width=80&text=${agent.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}`
                                    }}
                                  />
                                  <AvatarFallback>
                                    {agent.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{agent.name}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-3">
                                    {agent.role === "director"
                                      ? "Directeur"
                                      : agent.role === "senior"
                                        ? "Agent Senior"
                                        : "Agent Junior"}
                                  </p>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Propriétés:</span>
                                      <span className="font-medium">{agent.properties}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Performance:</span>
                                      <span className="font-medium">{agent.performance}%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-500">Revenus:</span>
                                      <span className="font-medium text-green-600">
                                        {agent.revenue.toLocaleString()}€
                                      </span>
                                    </div>
                                  </div>
                                  <Progress value={agent.performance} className="mt-3" />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleOpenEditAgentDialog(agent)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setCurrentAgent(agent)
                                  setShowDeleteAgentDialog(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Property Dialog */}
        <Dialog open={showAddPropertyDialog} onOpenChange={handleCloseAddPropertyDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Ajouter une nouvelle propriété</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour ajouter une propriété à l'agence {currentAgency?.name}.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="property-image" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de la propriété
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={propertyImage || ""}
                      onChange={handlePropertyImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-name">Nom de la propriété *</Label>
                    <Input
                      id="property-name"
                      value={propertyFormData.name}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, name: e.target.value })}
                      placeholder="Ex: Résidence Les Jardins"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Type</Label>
                    <Select
                      value={propertyFormData.type}
                      onValueChange={(value: string) =>
                        setPropertyFormData({ ...propertyFormData, type: value as Property["type"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Résidentiel</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-address">Adresse complète</Label>
                  <Input
                    id="property-address"
                    value={propertyFormData.address}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, address: e.target.value })}
                    placeholder="Ex: 123 Avenue de la République, Paris"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-units">Nombre d'unités</Label>
                    <Input
                      id="property-units"
                      type="number"
                      min="1"
                      value={propertyFormData.units}
                      onChange={(e) =>
                        setPropertyFormData({ ...propertyFormData, units: Number.parseInt(e.target.value) || 1 })
                      }
                      placeholder="Ex: 20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-price">Prix (€)</Label>
                    <Input
                      id="property-price"
                      type="number"
                      min="0"
                      value={propertyFormData.price}
                      onChange={(e) =>
                        setPropertyFormData({ ...propertyFormData, price: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="Ex: 500000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-description">Description</Label>
                  <Textarea
                    id="property-description"
                    value={propertyFormData.description}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                    placeholder="Description de la propriété..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseAddPropertyDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveProperty}
                disabled={!propertyFormData.name.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Ajouter la propriété
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Property Dialog */}
        <Dialog open={showEditPropertyDialog} onOpenChange={handleCloseEditPropertyDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Modifier la propriété</DialogTitle>
              <DialogDescription>Modifiez les informations de la propriété {currentProperty?.name}.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="property-image-edit" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de la propriété
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={propertyImage || ""}
                      onChange={handlePropertyImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-name-edit">Nom de la propriété *</Label>
                    <Input
                      id="property-name-edit"
                      value={propertyFormData.name}
                      onChange={(e) => setPropertyFormData({ ...propertyFormData, name: e.target.value })}
                      placeholder="Ex: Résidence Les Jardins"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-type-edit">Type</Label>
                    <Select
                      value={propertyFormData.type}
                      onValueChange={(value: string) =>
                        setPropertyFormData({ ...propertyFormData, type: value as Property["type"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Résidentiel</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-address-edit">Adresse complète</Label>
                  <Input
                    id="property-address-edit"
                    value={propertyFormData.address}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, address: e.target.value })}
                    placeholder="Ex: 123 Avenue de la République, Paris"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-units-edit">Nombre d'unités</Label>
                    <Input
                      id="property-units-edit"
                      type="number"
                      min="1"
                      value={propertyFormData.units}
                      onChange={(e) =>
                        setPropertyFormData({ ...propertyFormData, units: Number.parseInt(e.target.value) || 1 })
                      }
                      placeholder="Ex: 20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="property-price-edit">Prix (€)</Label>
                    <Input
                      id="property-price-edit"
                      type="number"
                      min="0"
                      value={propertyFormData.price}
                      onChange={(e) =>
                        setPropertyFormData({ ...propertyFormData, price: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="Ex: 500000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property-description-edit">Description</Label>
                  <Textarea
                    id="property-description-edit"
                    value={propertyFormData.description}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                    placeholder="Description de la propriété..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseEditPropertyDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveProperty}
                disabled={!propertyFormData.name.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Modification...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Property Dialog */}
        <Dialog open={showDeletePropertyDialog} onOpenChange={setShowDeletePropertyDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-600 dark:text-red-400">
                Supprimer la propriété
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Êtes-vous sûr de vouloir supprimer la propriété "{currentProperty?.name}" ? Cette action est
                irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDeletePropertyDialog(false)} disabled={isLoading}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteProperty} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer définitivement
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Agent Dialog */}
        <Dialog open={showAddAgentDialog} onOpenChange={handleCloseAddAgentDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Ajouter un nouvel agent</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour ajouter un agent à l'agence {currentAgency?.name}.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-image" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de l'agent
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={agentImage || ""}
                      onChange={handleAgentImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Nom complet *</Label>
                    <Input
                      id="agent-name"
                      value={agentFormData.name}
                      onChange={(e) => setAgentFormData({ ...agentFormData, name: e.target.value })}
                      placeholder="Ex: Marie Dubois"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-role">Rôle</Label>
                    <Select
                      value={agentFormData.role}
                      onValueChange={(value: string) =>
                        setAgentFormData({ ...agentFormData, role: value as Agent["role"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Agent Junior</SelectItem>
                        <SelectItem value="senior">Agent Senior</SelectItem>
                        <SelectItem value="director">Directeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-email">Email</Label>
                    <Input
                      id="agent-email"
                      type="email"
                      value={agentFormData.email}
                      onChange={(e) => setAgentFormData({ ...agentFormData, email: e.target.value })}
                      placeholder="Ex: marie.dubois@agence.fr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-phone">Téléphone</Label>
                    <Input
                      id="agent-phone"
                      value={agentFormData.phone}
                      onChange={(e) => setAgentFormData({ ...agentFormData, phone: e.target.value })}
                      placeholder="Ex: +33 1 23 45 67 89"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseAddAgentDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveAgent}
                disabled={!agentFormData.name.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Ajouter l'agent
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Dialog */}
        <Dialog open={showEditAgentDialog} onOpenChange={handleCloseEditAgentDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Modifier l'agent</DialogTitle>
              <DialogDescription>Modifiez les informations de l'agent {currentAgent?.name}.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-image-edit" className="text-lg font-medium flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Photo de l'agent
                  </Label>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <FileUpload
                      value={agentImage || ""}
                      onChange={handleAgentImageUpload}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name-edit">Nom complet *</Label>
                    <Input
                      id="agent-name-edit"
                      value={agentFormData.name}
                      onChange={(e) => setAgentFormData({ ...agentFormData, name: e.target.value })}
                      placeholder="Ex: Marie Dubois"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-role-edit">Rôle</Label>
                    <Select
                      value={agentFormData.role}
                      onValueChange={(value: string) =>
                        setAgentFormData({ ...agentFormData, role: value as Agent["role"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Agent Junior</SelectItem>
                        <SelectItem value="senior">Agent Senior</SelectItem>
                        <SelectItem value="director">Directeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-email-edit">Email</Label>
                    <Input
                      id="agent-email-edit"
                      type="email"
                      value={agentFormData.email}
                      onChange={(e) => setAgentFormData({ ...agentFormData, email: e.target.value })}
                      placeholder="Ex: marie.dubois@agence.fr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-phone-edit">Téléphone</Label>
                    <Input
                      id="agent-phone-edit"
                      value={agentFormData.phone}
                      onChange={(e) => setAgentFormData({ ...agentFormData, phone: e.target.value })}
                      placeholder="Ex: +33 1 23 45 67 89"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCloseEditAgentDialog} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleSaveAgent}
                disabled={!agentFormData.name.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Modification...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Agent Dialog */}
        <Dialog open={showDeleteAgentDialog} onOpenChange={setShowDeleteAgentDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-600 dark:text-red-400">Supprimer l'agent</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Êtes-vous sûr de vouloir supprimer l'agent "{currentAgent?.name}" ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDeleteAgentDialog(false)} disabled={isLoading}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteAgent} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer définitivement
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

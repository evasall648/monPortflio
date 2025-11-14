"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/AdminCompotenants/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/AdminCompotenants/ui/popover"
import { Calendar } from "@/components/AdminCompotenants/ui/calendar"
import { Progress } from "@/components/AdminCompotenants/ui/progress"
import { ScrollArea } from "@/components/AdminCompotenants/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/AdminCompotenants/ui/dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/AdminCompotenants/ui/chart"
import {
  BarChart3,
  Download,
  FileText,
  PieChart,
  Building,
  Users,
  DollarSign,
  CalendarIcon,
  Filter,
  Building2,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Search,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Share2,
  RefreshCw,
  Bell,
  HelpCircle,
  ExternalLink,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  Area,
  AreaChart,
} from "recharts"

// Types
type ChartDataPoint = {
  month: string
  revenue: number
  expenses: number
  profit: number
}

type AgencyPerformance = {
  id: number
  name: string
  properties: number
  occupancy: number
  revenue: number
  change: number
}

type PropertyType = {
  type: string
  count: number
  percentage: number
  color: string
}

type Alert = {
  id: number
  type: "warning" | "info" | "success" | "error"
  message: string
  date: string
}

// Données simulées avec couleurs cyan/bleu
const generateRevenueData = (): ChartDataPoint[] => {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
  return months.map((month) => {
    const baseRevenue = 300000 + Math.random() * 100000
    const baseExpenses = baseRevenue * (0.4 + Math.random() * 0.2)
    return {
      month,
      revenue: Math.round(baseRevenue),
      expenses: Math.round(baseExpenses),
      profit: Math.round(baseRevenue - baseExpenses),
    }
  })
}

const generateAgencyData = (): AgencyPerformance[] => {
  return [
    { id: 1, name: "Agence Paris Centre", properties: 42, occupancy: 92, revenue: 98500, change: 3.2 },
    { id: 2, name: "Agence Lyon", properties: 38, occupancy: 88, revenue: 85200, change: 2.1 },
    { id: 3, name: "Agence Marseille", properties: 35, occupancy: 90, revenue: 76800, change: 4.5 },
    { id: 4, name: "Agence Bordeaux", properties: 28, occupancy: 85, revenue: 62400, change: -1.2 },
    { id: 5, name: "Agence Lille", properties: 25, occupancy: 82, revenue: 54300, change: 1.8 },
    { id: 6, name: "Agence Strasbourg", properties: 22, occupancy: 87, revenue: 48700, change: 2.7 },
    { id: 7, name: "Agence Nice", properties: 20, occupancy: 95, revenue: 45200, change: 5.3 },
    { id: 8, name: "Agence Toulouse", properties: 18, occupancy: 80, revenue: 39800, change: -0.8 },
  ]
}

const propertyTypes: PropertyType[] = [
  { type: "Appartements", count: 512, percentage: 60, color: "#06b6d4" },
  { type: "Maisons", count: 186, percentage: 22, color: "#0891b2" },
  { type: "Studios", count: 98, percentage: 12, color: "#0e7490" },
  { type: "Commerces", count: 46, percentage: 6, color: "#155e75" },
]

const alerts: Alert[] = [
  { id: 1, type: "warning", message: "Taux d'occupation en baisse à Bordeaux", date: "23/05/2025" },
  { id: 2, type: "info", message: "Nouveau rapport financier disponible", date: "22/05/2025" },
  { id: 3, type: "success", message: "Objectif de revenus atteint pour Mai", date: "21/05/2025" },
  { id: 4, type: "error", message: "Retards de paiement en hausse à Lille", date: "20/05/2025" },
]

const occupancyTrendData = [
  { month: "Jan", rate: 82 },
  { month: "Fév", rate: 84 },
  { month: "Mar", rate: 83 },
  { month: "Avr", rate: 85 },
  { month: "Mai", rate: 87 },
  { month: "Juin", rate: 85 },
]

// Composant principal
const Rapports = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("monthly")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [revenueData, setRevenueData] = useState<ChartDataPoint[]>(generateRevenueData())
  const [agencyData, setAgencyData] = useState<AgencyPerformance[]>(generateAgencyData())

  const [showCompleteReport, setShowCompleteReport] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState<string>("")
  const [completeReportData, setCompleteReportData] = useState<any>(null)

  // Simuler le chargement des données
  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setRevenueData(generateRevenueData())
      setAgencyData(generateAgencyData())
      setIsRefreshing(false)
    }, 800)
  }

  useEffect(() => {
    refreshData()
  }, [period])

  // Fonction d'export
  const handleExport = (format: string) => {
    const data = {
      overview: {
        buildings: 156,
        apartments: 842,
        tenants: 712,
        monthlyRevenue: 356000,
      },
      financial: revenueData,
      agencies: agencyData,
      timestamp: new Date().toISOString(),
    }

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rapport-${format}-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const csvContent = [
        ["Agence", "Propriétés", "Occupation (%)", "Revenus (€)", "Évolution (%)"],
        ...agencyData.map((agency) => [
          agency.name,
          agency.properties.toString(),
          agency.occupancy.toString(),
          agency.revenue.toString(),
          agency.change.toString(),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rapport-agences-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  // Fonction pour voir les rapports complets
  const handleViewCompleteReport = (reportType: string) => {
    const reportData = {
      type: reportType,
      timestamp: new Date().toISOString(),
      data:
        reportType === "agencies"
          ? agencyData
          : reportType === "financial"
            ? revenueData
            : reportType === "occupancy"
              ? occupancyTrendData
              : { overview: "Données complètes de vue d'ensemble" },
      metadata: {
        period: period,
        generatedBy: "Système de rapports immobiliers",
        totalRecords: reportType === "agencies" ? agencyData.length : revenueData.length,
      },
    }

    setSelectedReportType(reportType)
    setCompleteReportData(reportData)
    setShowCompleteReport(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-foreground">
      <div className="container mx-auto px-4 py-8 space-y-6 max-w-7xl">
        {/* En-tête de la page avec notifications */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Rapports
              </h1>
              <Badge variant="outline" className="ml-2 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                {isRefreshing ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> : null}
                Mai 2025
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">Analyses et statistiques globales de votre parc immobilier</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors border-border"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMMM yyyy", { locale: fr }) : "Sélectionner une période"}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                <div className="p-3 border-t">
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="quarterly">Trimestriel</SelectItem>
                      <SelectItem value="yearly">Annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors border-border"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                  <Badge className="ml-2 bg-cyan-500 text-white h-5 px-1.5">3</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtrer les rapports</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Agences</h5>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les agences" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les agences</SelectItem>
                        <SelectItem value="paris">Paris Centre</SelectItem>
                        <SelectItem value="lyon">Lyon</SelectItem>
                        <SelectItem value="marseille">Marseille</SelectItem>
                        <SelectItem value="bordeaux">Bordeaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Type de bien</h5>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="apartment">Appartements</SelectItem>
                        <SelectItem value="house">Maisons</SelectItem>
                        <SelectItem value="studio">Studios</SelectItem>
                        <SelectItem value="commercial">Commerces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      Réinitialiser
                    </Button>
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                      Appliquer
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors border-border"
                >
                  <Bell className="h-4 w-4" />
                  <Badge className="ml-1 bg-destructive text-destructive-foreground h-5 px-1.5">{alerts.length}</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium">Alertes récentes</h4>
                  <ScrollArea className="h-60">
                    <div className="space-y-2 pr-3">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {alert.type === "warning" && (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          )}
                          {alert.type === "info" && <Info className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />}
                          {alert.type === "success" && (
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          )}
                          {alert.type === "error" && (
                            <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button variant="outline" size="sm" className="w-full">
                    Voir toutes les alertes
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                  <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-cyan-50 hover:text-cyan-700"
                    size="sm"
                    onClick={() => handleExport("json")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    JSON
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-cyan-50 hover:text-cyan-700"
                    size="sm"
                    onClick={() => handleExport("csv")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-cyan-50 hover:text-cyan-700"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-cyan-50 hover:text-cyan-700"
                    size="sm"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Barre de recherche et bouton de rafraîchissement */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher dans les rapports..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
            />
          </div>
          <Button
            variant="outline"
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex-shrink-0 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Actualisation..." : "Actualiser les données"}
          </Button>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-muted/50 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Financier
            </TabsTrigger>
            <TabsTrigger
              value="occupancy"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Building className="mr-2 h-4 w-4" />
              Occupation
            </TabsTrigger>
            <TabsTrigger
              value="agencies"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Agences
            </TabsTrigger>
          </TabsList>

          {/* Contenu de l'onglet Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            {/* Cartes de statistiques principales */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Total des bâtiments</span>
                    <Building2 className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">156</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12 ce mois-ci
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +8.3%
                    </Badge>
                  </div>
                  <Progress value={75} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Total des appartements</span>
                    <Building className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">842</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +28 ce mois-ci
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +3.4%
                    </Badge>
                  </div>
                  <Progress value={65} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Total des locataires</span>
                    <Users className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">712</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +15 ce mois-ci
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +2.1%
                    </Badge>
                  </div>
                  <Progress value={85} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Revenus mensuels</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">356 000 €</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +2.5% vs mois dernier
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +8 750 €
                    </Badge>
                  </div>
                  <Progress value={92} className="h-1 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Graphiques principaux */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-border bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">Évolution des revenus</CardTitle>
                    <CardDescription>Comparaison des revenus et dépenses sur la période</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue placeholder="Type de données" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenus</SelectItem>
                        <SelectItem value="expenses">Dépenses</SelectItem>
                        <SelectItem value="profit">Profit</SelectItem>
                        <SelectItem value="all">Tout afficher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenus",
                        color: "#06b6d4",
                      },
                      expenses: {
                        label: "Dépenses",
                        color: "#0891b2",
                      },
                      profit: {
                        label: "Profit",
                        color: "#0e7490",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                        <YAxis
                          className="text-xs fill-muted-foreground"
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                        />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          formatter={(value: number, name: string) => [
                            `${value.toLocaleString()}€`,
                            name === "revenue" ? "Revenus" : name === "expenses" ? "Dépenses" : "Profit",
                          ]}
                        />
                        <Bar dataKey="revenue" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="expenses" fill="#0891b2" radius={[2, 2, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="border-border bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">Répartition des biens</CardTitle>
                    <CardDescription>Par type de propriété</CardDescription>
                  </div>
                  <PieChart className="h-5 w-5 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      apartments: {
                        label: "Appartements",
                        color: "#06b6d4",
                      },
                      houses: {
                        label: "Maisons",
                        color: "#0891b2",
                      },
                      studios: {
                        label: "Studios",
                        color: "#0e7490",
                      },
                      commercial: {
                        label: "Commerces",
                        color: "#155e75",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={propertyTypes.map((type) => ({
                            name: type.type,
                            value: type.count,
                            fill: type.color,
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {propertyTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          formatter={(value: number, name: string) => [`${value}`, name]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="space-y-3 mt-4">
                    {propertyTypes.map((type, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                            <span className="text-sm font-medium text-foreground">{type.type}</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{type.count}</span>
                        </div>
                        <Progress value={type.percentage} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sections détaillées */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      Statistiques des utilisateurs
                    </CardTitle>
                    <CardDescription>Répartition par rôle et activité</CardDescription>
                  </div>
                  <Users className="h-5 w-5 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-foreground">Administrateurs</div>
                          <div className="text-sm font-bold text-foreground">5</div>
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-cyan-500" style={{ width: "5%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Actifs: 5/5</span>
                          <span>Dernière connexion: Aujourd'hui</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-foreground">Agents</div>
                          <div className="text-sm font-bold text-foreground">25</div>
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-blue-500" style={{ width: "25%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Actifs: 22/25</span>
                          <span>Dernière connexion: Aujourd'hui</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-foreground">Locataires</div>
                          <div className="text-sm font-bold text-foreground">712</div>
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted">
                          <div className="h-3 rounded-full bg-green-500" style={{ width: "70%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Actifs: 685/712</span>
                          <span>Dernière connexion: Aujourd'hui</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">Rapports disponibles</CardTitle>
                    <CardDescription>Rapports générés récemment</CardDescription>
                  </div>
                  <FileText className="h-5 w-5 text-cyan-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Rapport financier global",
                        icon: DollarSign,
                        date: "01/05/2025",
                        color: "bg-cyan-500/10 text-cyan-600",
                        size: "2.4 MB",
                        type: "financial",
                      },
                      {
                        title: "Rapport d'occupation global",
                        icon: Building,
                        date: "01/05/2025",
                        color: "bg-blue-500/10 text-blue-600",
                        size: "1.8 MB",
                        type: "occupancy",
                      },
                      {
                        title: "Rapport des agences",
                        icon: Building2,
                        date: "01/05/2025",
                        color: "bg-cyan-600/10 text-cyan-700",
                        size: "3.2 MB",
                        type: "agencies",
                      },
                      {
                        title: "Rapport des utilisateurs",
                        icon: Users,
                        date: "01/05/2025",
                        color: "bg-blue-600/10 text-blue-700",
                        size: "1.5 MB",
                        type: "overview",
                      },
                    ].map((report, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${report.color}`}>
                            <report.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{report.title}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Généré le {report.date}</span>
                              <span>•</span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-100 hover:text-cyan-700"
                            onClick={() => handleViewCompleteReport(report.type)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 border-border"
                            onClick={() => handleExport("json")}
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      onClick={() => handleViewCompleteReport("overview")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Voir le rapport complet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contenu de l'onglet Financier */}
          <TabsContent value="financial" className="space-y-6">
            {/* Cartes de statistiques financières */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Revenus totaux</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">4 272 000 €</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.2% annuel
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +132 000 €
                    </Badge>
                  </div>
                  <Progress value={88} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Dépenses totales</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">1 845 000 €</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-destructive dark:text-destructive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +4.5% annuel
                    </p>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      +78 000 €
                    </Badge>
                  </div>
                  <Progress value={65} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Profit net</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">2 427 000 €</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.3% annuel
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +54 000 €
                    </Badge>
                  </div>
                  <Progress value={72} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Marge bénéficiaire</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">56.8%</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-amber-500 dark:text-amber-400 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -0.7% annuel
                    </p>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                      -0.7 pts
                    </Badge>
                  </div>
                  <Progress value={56.8} className="h-1 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Graphique financier détaillé */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Rapport financier détaillé</CardTitle>
                <CardDescription>Analyse des revenus, dépenses et rentabilité par période</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <ChartContainer
                      config={{
                        revenue: {
                          label: "Revenus",
                          color: "#06b6d4",
                        },
                        expenses: {
                          label: "Dépenses",
                          color: "#0891b2",
                        },
                        profit: {
                          label: "Profit",
                          color: "#0e7490",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                          <YAxis
                            className="text-xs fill-muted-foreground"
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
                          />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(value: number, name: string) => [
                              `${value.toLocaleString()}€`,
                              name === "revenue" ? "Revenus" : name === "expenses" ? "Dépenses" : "Profit",
                            ]}
                          />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stackId="1"
                            stroke="#06b6d4"
                            fill="#06b6d4"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="expenses"
                            stackId="2"
                            stroke="#0891b2"
                            fill="#0891b2"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Loyers</h3>
                        <p className="text-2xl font-bold">3 845 000 €</p>
                        <Badge className="mt-1 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">+4.2%</Badge>
                      </div>
                      <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Charges</h3>
                        <p className="text-2xl font-bold">427 000 €</p>
                        <Badge className="mt-1 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">+1.8%</Badge>
                      </div>
                      <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Maintenance</h3>
                        <p className="text-2xl font-bold">845 000 €</p>
                        <Badge className="mt-1 bg-destructive/10 text-destructive border-destructive/20">+6.5%</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-80">
                    <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800 h-full">
                      <h3 className="text-lg font-semibold mb-4">Répartition des revenus</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Loyers résidentiels</span>
                            <span className="text-sm font-medium">68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Loyers commerciaux</span>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <Progress value={22} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Charges locatives</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    onClick={() => handleViewCompleteReport("financial")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir le rapport complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu de l'onglet Occupation */}
          <TabsContent value="occupancy" className="space-y-6">
            {/* Cartes de statistiques d'occupation */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Taux d'occupation</span>
                    <Building className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">85%</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.5% vs trimestre précédent
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +2.5 pts
                    </Badge>
                  </div>
                  <Progress value={85} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Biens disponibles</span>
                    <Building className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">84</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -12 vs mois dernier
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      -12.5%
                    </Badge>
                  </div>
                  <Progress value={10} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Durée moyenne d'occupation</span>
                    <Clock className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">3.2 ans</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.3 an vs année précédente
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +10.3%
                    </Badge>
                  </div>
                  <Progress value={65} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Taux de rotation</span>
                    <RefreshCw className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">18.5%</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -2.3% vs année précédente
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      -2.3 pts
                    </Badge>
                  </div>
                  <Progress value={18.5} className="h-1 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Graphique d'occupation détaillé */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Rapport d'occupation détaillé</CardTitle>
                <CardDescription>Analyse des taux d'occupation par type de bien et évolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <ChartContainer
                      config={{
                        rate: {
                          label: "Taux d'occupation",
                          color: "#06b6d4",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={occupancyTrendData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                          <YAxis
                            className="text-xs fill-muted-foreground"
                            domain={[70, 90]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                            formatter={(value: number) => [`${value}%`, "Taux d'occupation"]}
                          />
                          <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#06b6d4", strokeWidth: 2 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Meilleur taux</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">95%</p>
                          <Badge className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">Nice</Badge>
                        </div>
                      </div>
                      <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Plus faible taux</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">80%</p>
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Toulouse</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-80">
                    <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800 h-full">
                      <h3 className="text-lg font-semibold mb-4">Taux par type de bien</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Studios</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Appartements 2 pièces</span>
                            <span className="text-sm font-medium">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Appartements 3 pièces</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Appartements 4+ pièces</span>
                            <span className="text-sm font-medium">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Maisons</span>
                            <span className="text-sm font-medium">82%</span>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Commerces</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    onClick={() => handleViewCompleteReport("occupancy")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir le rapport complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu de l'onglet Agences */}
          <TabsContent value="agencies" className="space-y-6">
            {/* Cartes de statistiques des agences */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Nombre d'agences</span>
                    <Building2 className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">8</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +1 cette année
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +14.3%
                    </Badge>
                  </div>
                  <Progress value={80} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Agents immobiliers</span>
                    <Users className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">25</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3 cette année
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +13.6%
                    </Badge>
                  </div>
                  <Progress value={75} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Biens par agence (moy.)</span>
                    <Building className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">28.5</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +1.2 vs année précédente
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +4.4%
                    </Badge>
                  </div>
                  <Progress value={65} className="h-1 mt-3" />
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Revenus par agence (moy.)</span>
                    <DollarSign className="h-4 w-4 text-cyan-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">63 875 €</div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.8% vs année précédente
                    </p>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                      +1 750 €
                    </Badge>
                  </div>
                  <Progress value={82} className="h-1 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Tableau des performances des agences */}
            <Card className="border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground">Performance des agences</CardTitle>
                <CardDescription>Comparaison des résultats et indicateurs clés par agence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-cyan-200 dark:border-cyan-800">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-cyan-50/50 dark:bg-cyan-950/20">
                          <th className="h-12 px-4 text-left font-medium">Agence</th>
                          <th className="h-12 px-4 text-left font-medium">Biens</th>
                          <th className="h-12 px-4 text-left font-medium">Taux d'occupation</th>
                          <th className="h-12 px-4 text-left font-medium">Revenus mensuels</th>
                          <th className="h-12 px-4 text-left font-medium">Évolution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agencyData.map((agency) => (
                          <tr
                            key={agency.id}
                            className="border-b transition-colors hover:bg-cyan-50/30 dark:hover:bg-cyan-950/10"
                          >
                            <td className="p-4 font-medium">{agency.name}</td>
                            <td className="p-4">{agency.properties}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span>{agency.occupancy}%</span>
                                <Progress value={agency.occupancy} className="h-2 w-16" />
                              </div>
                            </td>
                            <td className="p-4">{agency.revenue.toLocaleString()} €</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    agency.change >= 0
                                      ? "bg-cyan-500/10 text-cyan-600 border-cyan-500/20"
                                      : "bg-destructive/10 text-destructive border-destructive/20"
                                  }`}
                                >
                                  {agency.change >= 0 ? "+" : ""}
                                  {agency.change}%
                                </Badge>
                                {agency.change >= 0 ? (
                                  <TrendingUp className="h-4 w-4 text-cyan-500" />
                                ) : (
                                  <TrendingDown className="h-4 w-4 text-destructive" />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    onClick={() => handleViewCompleteReport("agencies")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir le rapport complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal pour afficher le rapport complet */}
        <Dialog open={showCompleteReport} onOpenChange={setShowCompleteReport}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Rapport Complet -{" "}
                {selectedReportType === "agencies"
                  ? "Agences"
                  : selectedReportType === "financial"
                    ? "Financier"
                    : selectedReportType === "occupancy"
                      ? "Occupation"
                      : "Vue d'ensemble"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Informations générales */}
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">Informations du rapport</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold">{selectedReportType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Période</p>
                      <p className="font-semibold">{period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Généré le</p>
                      <p className="font-semibold">{format(new Date(), "dd/MM/yyyy HH:mm", { locale: fr })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Enregistrements</p>
                      <p className="font-semibold">{completeReportData?.metadata?.totalRecords || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contenu spécifique selon le type de rapport */}
              {selectedReportType === "agencies" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-700 dark:text-cyan-300">Détails des Agences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {agencyData.map((agency) => (
                        <div
                          key={agency.id}
                          className="p-4 border rounded-lg hover:bg-cyan-50/50 dark:hover:bg-cyan-950/10"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Agence</p>
                              <p className="font-semibold">{agency.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Propriétés</p>
                              <p className="font-semibold">{agency.properties}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Occupation</p>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{agency.occupancy}%</p>
                                <Progress value={agency.occupancy} className="h-2 w-16" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Revenus</p>
                              <p className="font-semibold">{agency.revenue.toLocaleString()} €</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Évolution</p>
                              <Badge
                                className={
                                  agency.change >= 0
                                    ? "bg-cyan-500/10 text-cyan-600"
                                    : "bg-destructive/10 text-destructive"
                                }
                              >
                                {agency.change >= 0 ? "+" : ""}
                                {agency.change}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedReportType === "financial" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-cyan-700 dark:text-cyan-300">
                        Analyse Financière Détaillée
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Revenus par mois</h4>
                          {revenueData.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-cyan-50/50 dark:bg-cyan-950/10 rounded"
                            >
                              <span>{item.month}</span>
                              <span className="font-semibold text-cyan-600">{item.revenue.toLocaleString()} €</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Dépenses par mois</h4>
                          {revenueData.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-blue-50/50 dark:bg-blue-950/10 rounded"
                            >
                              <span>{item.month}</span>
                              <span className="font-semibold text-blue-600">{item.expenses.toLocaleString()} €</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Profit par mois</h4>
                          {revenueData.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-green-50/50 dark:bg-green-950/10 rounded"
                            >
                              <span>{item.month}</span>
                              <span className="font-semibold text-green-600">{item.profit.toLocaleString()} €</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {selectedReportType === "occupancy" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-700 dark:text-cyan-300">
                      Analyse d'Occupation Détaillée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-4">Évolution mensuelle du taux d'occupation</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {occupancyTrendData.map((item, index) => (
                            <div key={index} className="p-4 bg-cyan-50/50 dark:bg-cyan-950/10 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{item.month}</span>
                                <span className="font-bold text-cyan-600">{item.rate}%</span>
                              </div>
                              <Progress value={item.rate} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-4">Répartition par type de bien</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {propertyTypes.map((type, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{type.type}</span>
                                <span className="font-bold">{type.count} biens</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                                <span className="text-sm text-muted-foreground">{type.percentage}% du total</span>
                              </div>
                              <Progress value={type.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedReportType === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-cyan-50/50 dark:bg-cyan-950/10">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Building2 className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">156</p>
                          <p className="text-sm text-muted-foreground">Bâtiments</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50/50 dark:bg-blue-950/10">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Building className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">842</p>
                          <p className="text-sm text-muted-foreground">Appartements</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50/50 dark:bg-green-950/10">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">712</p>
                          <p className="text-sm text-muted-foreground">Locataires</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50/50 dark:bg-purple-950/10">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">356K €</p>
                          <p className="text-sm text-muted-foreground">Revenus/mois</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé Exécutif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Ce rapport présente une vue d'ensemble complète de votre parc immobilier pour la période
                          sélectionnée. Les indicateurs clés montrent une croissance positive avec un taux d'occupation
                          de 85% et des revenus mensuels de 356 000 €.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold mb-2">Points forts :</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Croissance de 8.3% du nombre de bâtiments</li>
                              <li>• Augmentation de 3.4% des appartements</li>
                              <li>• Taux d'occupation stable à 85%</li>
                              <li>• Revenus en hausse de 2.5%</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2">Axes d'amélioration :</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Optimiser l'occupation à Toulouse (80%)</li>
                              <li>• Réduire les retards de paiement à Lille</li>
                              <li>• Améliorer la maintenance préventive</li>
                              <li>• Développer de nouveaux partenariats</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Actions du rapport */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Rapport généré le {format(new Date(), "dd/MM/yyyy à HH:mm", { locale: fr })}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleExport("json")}
                    className="hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger JSON
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleExport("csv")}
                    className="hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger CSV
                  </Button>
                  <Button
                    onClick={() => window.print()}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Section d'aide en bas de page */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-cyan-200 dark:border-cyan-800">
          <div className="text-sm text-muted-foreground">Dernière mise à jour: 26 mai 2025 à 12:11</div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Aide
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rapports

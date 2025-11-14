"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/AdminCompotenants/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select";
import { Badge } from "@/components/AdminCompotenants/ui/Badge";
import {
  BarChart3,
  Download,
  FileText,
  RefreshCw,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Users,
  Building,
  AlertCircle,
  Home,
  Calendar,
  LineChart,
  Map,
  X,
  ArrowUpRight,
} from "lucide-react"

// Import des composants de l'interface utilisateur
import CircularProgressCard from "@/components/AdminCompotenants/ui/circular-progress"
import StatisticCard from "@/components/AdminCompotenants/ui/statistic-card"

// Import des composants de graphiques
import { RevenueChart } from "@/components/AdminCompotenants/dashbord/revenue-chart"
import { DistributionChart } from "@/components/AdminCompotenants/dashbord/distribution-chart"
import { FinancialFlowChart } from "@/components/AdminCompotenants/dashbord/financial-flow-chart"
import { MonthlyEvolutionChart } from "@/components/AdminCompotenants/dashbord/monthly-evolution-chart"
import { OccupancyRateChart } from "@/components/AdminCompotenants/dashbord/occupancy-rate-chart"
import { AgencyComparisonChart } from "@/components/AdminCompotenants/dashbord/agency-comparison-chart"
import { PredictiveAnalysisChart } from "@/components/AdminCompotenants/dashbord/predictive-analysis-chart"
import { RetentionChart } from "@/components/AdminCompotenants/dashbord/retention-chart"
import { MarketComparisonChart } from "@/components/AdminCompotenants/dashbord/market-comparison-chart"
import { RevenueExpenseChart } from "@/components/AdminCompotenants/dashbord/revenue-expense-chart"

// Import des composants de Recharts
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"

// Types pour les données
interface Invoice {
  id: string
  client: string
  montant: string
  date: string
  delai?: string
  retard?: string
  status?: string
}

interface Owner {
  id: string
  nom: string
  propriétés: number
  revenu: string
  contact: string
  statut: string
}

interface Tenant {
  id: string
  nom: string
  propriété: string
  loyer: string
  contact: string
  statut: string
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: string
  status?: string
}

interface InvoiceCardProps {
  title: string
  value: string
  percentage: number
  color: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
  textColor?: string
}

export default function DashboardPage() {
  // Obtenir la date actuelle pour déterminer le mois en cours
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() // 0-11 (janvier-décembre)
  const currentYear = currentDate.getFullYear()

  // Convertir le mois numérique en code de mois pour notre sélecteur
  const monthCodes = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
  const currentMonthCode = monthCodes[currentMonth]

  const [timeRange, setTimeRange] = useState("month")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showAllStats, setShowAllStats] = useState(false)

  // Initialiser selectedPeriod avec le mois actuel
  const [selectedPeriod, setSelectedPeriod] = useState(currentMonthCode)
  const [showPaidInvoices, setShowPaidInvoices] = useState(false)
  const [showUnpaidInvoices, setShowUnpaidInvoices] = useState(false)
  const [showOwners, setShowOwners] = useState(false)
  const [showTenants, setShowTenants] = useState(false)
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showOwnerDetails, setShowOwnerDetails] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null)
  const [showTenantDetails, setShowTenantDetails] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  // Références pour les modales
  const paidInvoicesModalRef = useRef<HTMLDivElement>(null)
  const unpaidInvoicesModalRef = useRef<HTMLDivElement>(null)
  const ownersModalRef = useRef<HTMLDivElement>(null)
  const tenantsModalRef = useRef<HTMLDivElement>(null)
  const invoiceDetailsModalRef = useRef<HTMLDivElement>(null)
  const ownerDetailsModalRef = useRef<HTMLDivElement>(null)
  const tenantDetailsModalRef = useRef<HTMLDivElement>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simuler un rafraîchissement des données
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Mettre à jour les données en fonction de la période sélectionnée
  useEffect(() => {
    // Simuler un chargement des données
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }, [timeRange])

  // Modifier la fonction qui gère le changement de période pour l'évolution mensuelle
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    // Ici, vous pourriez recharger les données en fonction de la période sélectionnée
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  // Gestionnaire de changement de période pour le sélecteur de mois
  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
    // Ici, vous pourriez recharger les données en fonction du mois sélectionné
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  // Effet pour détecter le changement de mois
  useEffect(
    () => {
      // Vérifier si le mois a changé
      const newDate = new Date()
      const newMonth = newDate.getMonth()

      if (newMonth !== currentMonth) {
        // Mettre à jour avec le nouveau mois
        const newMonthCode = monthCodes[newMonth]
        setSelectedPeriod(newMonthCode)

        // Rafraîchir les données
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 800)
      }
    },
    [
      /* Ce useEffect s'exécute à chaque rendu, mais la condition à l'intérieur limite l'action */
    ],
  )

  // Gestionnaire pour afficher les détails d'une facture
  const handleViewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowInvoiceDetails(true)
  }

  // Gestionnaire pour afficher les détails d'un propriétaire
  const handleViewOwnerDetails = (owner: Owner) => {
    setSelectedOwner(owner)
    setShowOwnerDetails(true)
  }

  // Gestionnaire pour afficher les détails d'un locataire
  const handleViewTenantDetails = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setShowTenantDetails(true)
  }

  // Gestionnaire pour fermer les détails d'un propriétaire
  const handleCloseOwnerDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowOwnerDetails(false)
    return null
  }

  // Gestionnaire pour fermer les détails d'un locataire
  const handleCloseTenantDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowTenantDetails(false)
  }

  // Gestionnaire pour fermer la modale des factures payées
  const handleClosePaidInvoices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowPaidInvoices(false)
  }

  // Gestionnaire pour fermer la modale des factures impayées
  const handleCloseUnpaidInvoices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowUnpaidInvoices(false)
  }

  // Gestionnaire pour afficher les propriétaires
  const handleShowOwners = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowOwners(true)
    return null
  }

  // Gestionnaire pour afficher les locataires
  const handleShowTenants = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowTenants(true)
    return null
  }

  // Gestionnaire pour fermer les détails d'une facture
  const handleCloseInvoiceDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowInvoiceDetails(false)
    return null
  }

  // Gestionnaire de clic en dehors des modales pour les fermer
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node

      // Fermer les modales si on clique en dehors
      if (showPaidInvoices && paidInvoicesModalRef.current && !paidInvoicesModalRef.current.contains(target)) {
        setShowPaidInvoices(false)
      }
      if (showUnpaidInvoices && unpaidInvoicesModalRef.current && !unpaidInvoicesModalRef.current.contains(target)) {
        setShowUnpaidInvoices(false)
      }
      if (showOwners && ownersModalRef.current && !ownersModalRef.current.contains(target)) {
        setShowOwners(false)
      }
      if (showTenants && tenantsModalRef.current && !tenantsModalRef.current.contains(target)) {
        setShowTenants(false)
      }
      if (showInvoiceDetails && invoiceDetailsModalRef.current && !invoiceDetailsModalRef.current.contains(target)) {
        setShowInvoiceDetails(false)
      }
      if (showOwnerDetails && ownerDetailsModalRef.current && !ownerDetailsModalRef.current.contains(target)) {
        setShowOwnerDetails(false)
      }
      if (showTenantDetails && tenantDetailsModalRef.current && !tenantDetailsModalRef.current.contains(target)) {
        setShowTenantDetails(false)
      }
    }

    // Ajouter l'écouteur d'événement
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Nettoyer l'écouteur d'événement
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [
    showPaidInvoices,
    showUnpaidInvoices,
    showOwners,
    showTenants,
    showInvoiceDetails,
    showOwnerDetails,
    showTenantDetails,
  ])

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="h-full overflow-y-auto w-full">
          <div className="container mx-auto px-4 py-6 w-full max-w-[95%] 2xl:max-w-[90%]">
            {/* En-tête du tableau de bord */}
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tableau de bord administrateur</h1>
                <p className="text-muted-foreground">Vue d'ensemble du système de gestion immobilière</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="border-border bg-background shadow-sm"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Actualiser
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 w-full">
              {/* Contenu principal (3 colonnes) */}
              <div className="xl:col-span-3 w-full">
                <div className="space-y-6">
                  {/* KPI Overview */}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <CircularProgressCard
                      title="Factures générées"
                      value="792 000,0"
                      percentage={85}
                      icon={FileText}
                      iconColor="text-primary"
                      iconBg="bg-primary/10"
                      progressColor="stroke-primary"
                      trend="up"
                      trendValue="12%"
                    />
                    <CircularProgressCard
                      title="Factures payées"
                      value="372 000,0"
                      percentage={46.7}
                      icon={CheckCircle}
                      iconColor="text-green-500"
                      iconBg="bg-green-500/10"
                      progressColor="stroke-green-500"
                      trend="up"
                      trendValue="8%"
                    />
                    <CircularProgressCard
                      title="Factures impayées"
                      value="420 000,0"
                      percentage={53.3}
                      icon={XCircle}
                      iconColor="text-destructive"
                      iconBg="bg-destructive/10"
                      progressColor="stroke-destructive"
                      trend="down"
                      trendValue="5%"
                    />
                  </div>

                  {/* Statistiques des contrats */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatisticCard
                      title="Dépenses Août"
                      value="10 000,0"
                      icon={DollarSign}
                      iconColor="text-amber-500"
                      iconBg="bg-amber-500/10"
                      isFloating={true}
                    />
                    <StatisticCard
                      title="Contrats actifs"
                      value="1"
                      icon={FileText}
                      iconColor="text-green-500"
                      iconBg="bg-green-500/10"
                      isFloating={true}
                    />
                    <StatisticCard
                      title="Contrat inactifs"
                      value="1"
                      icon={FileText}
                      iconColor="text-destructive"
                      iconBg="bg-destructive/10"
                      isFloating={true}
                    />
                    <StatisticCard
                      title="Contrats terminés"
                      value="0"
                      icon={FileText}
                      iconColor="text-muted-foreground"
                      iconBg="bg-muted"
                      isFloating={true}
                    />
                  </div>

                  {/* Onglets principaux */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1">
                      <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-colors"
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Vue d'ensemble
                      </TabsTrigger>
                      <TabsTrigger
                        value="financial"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-colors"
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        Financier
                      </TabsTrigger>
                      <TabsTrigger
                        value="occupancy"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-colors"
                      >
                        <Home className="mr-2 h-4 w-4" />
                        Occupation
                      </TabsTrigger>
                      <TabsTrigger
                        value="agencies"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-colors"
                      >
                        <Building className="mr-2 h-4 w-4" />
                        Agences
                      </TabsTrigger>
                      <TabsTrigger
                        value="predictive"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-colors"
                      >
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Prévisions
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {/* Graphiques */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Taux de paiement mensuel
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <RevenueChart />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Répartition des factures
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <DistributionChart />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Bilan & Résumés */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-4">
                          <Card className="border-border shadow-md">
                            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 pb-4">
                              <CardTitle className="text-lg font-bold text-cyan-500">
                                Bilan financier du mois
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="grid grid-cols-1 divide-y divide-border">
                                {/* Revenus */}
                                <div className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="rounded-lg bg-green-500/10 p-2">
                                        <DollarSign className="h-5 w-5 text-green-500" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
                                        <p className="text-lg font-semibold text-foreground">54 600 €</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                                        <ArrowUpRight className="-ml-0.5 mr-1 h-3 w-3" />
                                        12.4%
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Dépenses */}
                                <div className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="rounded-lg bg-destructive/10 p-2">
                                        <DollarSign className="h-5 w-5 text-destructive" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Dépenses totales</p>
                                        <p className="text-lg font-semibold text-foreground">21 800 €</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                                        <ArrowUpRight className="-ml-0.5 mr-1 h-3 w-3" />
                                        5.2%
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Profit net */}
                                <div className="bg-muted/50 p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="rounded-lg bg-primary/10 p-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Profit net</p>
                                        <p className="text-xl font-bold text-foreground">32 800 €</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                        <ArrowUpRight className="-ml-0.5 mr-1 h-3 w-3" />
                                        17.8%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Graphique de tendance */}
                          <Card className="border-border shadow-md">
                            <CardHeader>
                              <CardTitle className="text-lg font-bold text-foreground">Tendance des revenus</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-[200px]">
                                <RevenueExpenseChart />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="space-y-4">
                          <Card className="border-border shadow-md">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Résumés</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="px-4 py-2">
                                <div className="flex items-center justify-between border-b border-border py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <Users className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-foreground">PROPRIÉTAIRES</span>
                                      <p className="text-xs text-muted-foreground">Total: 7</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-muted"
                                    onClick={() => setShowOwners(true)}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <Users className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-medium text-foreground">LOCATAIRES</span>
                                      <p className="text-xs text-muted-foreground">Total: 7</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-muted"
                                    onClick={() => setShowTenants(true)}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-border shadow-md">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Alertes système
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="px-4 py-2">
                                <div className="flex items-center justify-between border-b border-border py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <AlertCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Paiements en retard</span>
                                  </div>
                                  <Badge variant="destructive">27</Badge>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                      <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Contrats expirant</span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  >
                                    15
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="financial" className="space-y-4">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Évolution des revenus et dépenses
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <RevenueExpenseChart />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Comparaison avec le marché
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <MarketComparisonChart />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatisticCard
                          title="Revenu mensuel moyen"
                          value="65 000,0"
                          icon={DollarSign}
                          iconColor="text-green-500"
                          iconBg="bg-green-500/10"
                          trend="up"
                          trendValue="3.2%"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Dépenses mensuelles"
                          value="23 500,0"
                          icon={DollarSign}
                          iconColor="text-destructive"
                          iconBg="bg-destructive/10"
                          trend="down"
                          trendValue="1.5%"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Marge bénéficiaire"
                          value="63.8%"
                          icon={TrendingUp}
                          iconColor="text-primary"
                          iconBg="bg-primary/10"
                          trend="up"
                          trendValue="2.1%"
                          isFloating={true}
                        />
                      </div>

                      <Card className="border-border shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold text-foreground">Flux financiers</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <FinancialFlowChart />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="occupancy" className="space-y-4">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatisticCard
                          title="Taux d'occupation global"
                          value="87.5%"
                          icon={Home}
                          iconColor="text-blue-500"
                          iconBg="bg-blue-500/10"
                          trend="up"
                          trendValue="2.3%"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Durée moyenne d'occupation"
                          value="2.7 ans"
                          icon={Calendar}
                          iconColor="text-primary"
                          iconBg="bg-primary/10"
                          trend="up"
                          trendValue="0.2 ans"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Taux de renouvellement"
                          value="76.2%"
                          icon={RefreshCw}
                          iconColor="text-green-500"
                          iconBg="bg-green-500/10"
                          trend="up"
                          trendValue="4.1%"
                          isFloating={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Évolution du taux d'occupation
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <OccupancyRateChart />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Taux de rétention des locataires
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <RetentionChart />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="border-border shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold text-foreground">
                            Répartition géographique de l'occupation
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-6">
                          <div className="flex h-64 w-full items-center justify-center rounded-lg bg-muted">
                            <div className="flex flex-col items-center text-muted-foreground">
                              <Map className="mb-2 h-12 w-12" />
                              <p className="text-center">Carte interactive des propriétés</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="agencies" className="space-y-4">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatisticCard
                          title="Nombre d'agences"
                          value="5"
                          icon={Building}
                          iconColor="text-primary"
                          iconBg="bg-primary/10"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Agents immobiliers"
                          value="32"
                          icon={Users}
                          iconColor="text-blue-500"
                          iconBg="bg-blue-500/10"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Performance moyenne"
                          value="87.3%"
                          icon={TrendingUp}
                          iconColor="text-green-500"
                          iconBg="bg-green-500/10"
                          trend="up"
                          trendValue="2.1%"
                          isFloating={true}
                        />
                      </div>

                      <Card className="border-border shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold text-foreground">
                            Comparaison des performances par agence
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[350px]">
                            <AgencyComparisonChart />
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Répartition des contrats par agence
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <DistributionChart />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Évolution des performances
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <RevenueChart />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="predictive" className="space-y-4">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatisticCard
                          title="Croissance prévue"
                          value="8.3%"
                          icon={TrendingUp}
                          iconColor="text-green-500"
                          iconBg="bg-green-500/10"
                          trend="up"
                          trendValue="1.2%"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Taux d'occupation prévu"
                          value="92.1%"
                          icon={Home}
                          iconColor="text-blue-500"
                          iconBg="bg-blue-500/10"
                          trend="up"
                          trendValue="3.5%"
                          isFloating={true}
                        />
                        <StatisticCard
                          title="Indice de confiance"
                          value="87%"
                          icon={LineChart}
                          iconColor="text-primary"
                          iconBg="bg-primary/10"
                          isFloating={true}
                        />
                      </div>

                      <Card className="border-border shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold text-foreground">
                            Prévisions de revenus (12 mois)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[350px]">
                            <PredictiveAnalysisChart />
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">
                              Tendances du marché immobilier
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <MarketComparisonChart />
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="border-border shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-foreground">Prévisions d'occupation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-[300px]">
                              <OccupancyRateChart />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Section verticale des factures (à droite) */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  <Card className="border-border bg-card shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 pb-2 text-primary-foreground">
                      <CardTitle className="flex items-center text-lg font-bold">
                        <FileText className="mr-2 h-5 w-5" />
                        Factures
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      <InvoiceCard
                        title="Factures générées"
                        value="792 000,0"
                        percentage={85}
                        color="bg-primary"
                        icon={FileText}
                        iconBg="bg-primary/10"
                        iconColor="text-primary"
                        textColor="text-foreground"
                      />

                      <InvoiceCard
                        title="Factures payées"
                        value="372 000,0"
                        percentage={46.7}
                        color="bg-green-500"
                        icon={CheckCircle}
                        iconBg="bg-green-500/10"
                        iconColor="text-green-500"
                        textColor="text-foreground"
                      />

                      <InvoiceCard
                        title="Factures impayées"
                        value="420 000,0"
                        percentage={53.3}
                        color="bg-destructive"
                        icon={XCircle}
                        iconBg="bg-destructive/10"
                        iconColor="text-destructive"
                        textColor="text-foreground"
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-border shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-lg font-bold text-foreground">
                        <span>Évolution mensuelle</span>
                        <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                          <SelectTrigger className="h-8 w-[130px] border-border text-xs">
                            <SelectValue placeholder="Période" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Mois actuel */}
                            <SelectItem value={currentMonthCode}>
                              {
                                [
                                  "Janvier",
                                  "Février",
                                  "Mars",
                                  "Avril",
                                  "Mai",
                                  "Juin",
                                  "Juillet",
                                  "Août",
                                  "Septembre",
                                  "Octobre",
                                  "Novembre",
                                  "Décembre",
                                ][currentMonth]
                              }{" "}
                              {currentYear} (actuel)
                            </SelectItem>

                            {/* Mois précédents de l'année en cours */}
                            {monthCodes
                              .slice(0, currentMonth)
                              .reverse()
                              .map((code, index) => (
                                <SelectItem key={code} value={code}>
                                  {
                                    [
                                      "Janvier",
                                      "Février",
                                      "Mars",
                                      "Avril",
                                      "Mai",
                                      "Juin",
                                      "Juillet",
                                      "Août",
                                      "Septembre",
                                      "Octobre",
                                      "Novembre",
                                      "Décembre",
                                    ][currentMonth - index - 1]
                                  }{" "}
                                  {currentYear}
                                </SelectItem>
                              ))}

                            {/* Année précédente */}
                            <SelectItem value="last_year">Année {currentYear - 1}</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <MonthlyEvolutionChart period={selectedPeriod} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-cyan-500">Factures passées</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="px-4 py-2">
                        <div className="flex items-center justify-between border-b border-border py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <span className="text-sm font-medium text-foreground">PAYÉES</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">6</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-muted"
                              onClick={() => setShowPaidInvoices(true)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                              <XCircle className="h-4 w-4 text-destructive" />
                            </div>
                            <span className="text-sm font-medium text-foreground">IMPAYÉES</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">4</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-muted"
                              onClick={() => setShowUnpaidInvoices(true)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-border bg-muted/50 p-3">
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
                        Historique paiements
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-border overflow-hidden shadow-md">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
                      <CardTitle className="text-lg font-bold text-cyan-500">Statistiques des factures</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Taux de recouvrement</span>
                          <span className="text-sm font-bold text-foreground">87%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "87%" }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Délai moyen de paiement</span>
                          <span className="text-sm font-bold text-foreground">12 jours</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "65%" }}></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">Factures en retard</span>
                          <span className="text-sm font-bold text-foreground">14%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-destructive" style={{ width: "14%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-border bg-muted/50 p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-primary/20 bg-primary/5 text-xs text-primary hover:bg-primary/10"
                        onClick={() => setShowAllStats(true)}
                      >
                        Voir toutes les statistiques
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Modal pour toutes les statistiques */}
                  {showAllStats && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <Card className="max-h-[80vh] w-[90vw] max-w-3xl overflow-auto border-border shadow-xl">
                        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                          <CardTitle className="text-cyan-500">Statistiques détaillées des factures</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h3 className="mb-4 text-lg font-bold text-foreground">Statistiques générales</h3>
                              <div className="space-y-4">
                                {[
                                  { label: "Taux de recouvrement", value: "87%", color: "bg-primary" },
                                  { label: "Délai moyen de paiement", value: "12 jours", color: "bg-green-500" },
                                  { label: "Factures en retard", value: "14%", color: "bg-destructive" },
                                  { label: "Montant moyen des factures", value: "3 250€", color: "bg-blue-500" },
                                  { label: "Taux de contestation", value: "3.2%", color: "bg-amber-500" },
                                  { label: "Factures annulées", value: "1.8%", color: "bg-muted-foreground" },
                                ].map((stat, index) => (
                                  <div key={index} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                                      <span className="text-sm font-bold text-foreground">{stat.value}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted">
                                      <div
                                        className={`h-2 rounded-full ${stat.color}`}
                                        style={{
                                          width: stat.value.includes("%")
                                            ? stat.value
                                            : stat.value.includes("jours")
                                              ? "65%"
                                              : "75%",
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-4 text-lg font-bold text-foreground">Répartition par type</h3>
                              <div className="h-[300px]">
                                <DistributionChart />
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 className="mb-4 text-lg font-bold text-foreground">Évolution sur 12 mois</h3>
                            <div className="h-[300px]">
                              <MonthlyEvolutionChart period="last_year" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 border-t border-border p-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowAllStats(false)}
                            className="border-primary/20 text-primary hover:bg-primary/5"
                          >
                            Fermer
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Download className="mr-2 h-4 w-4" />
                            Exporter
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour les propriétaires */}
      {showOwners && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={ownersModalRef}
            className="max-h-[80vh] w-[90vw] max-w-3xl overflow-auto border-border shadow-xl"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-amber-600 to-amber-500 text-primary-foreground">
              <CardTitle>Détails des propriétaires</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-amber-700/50"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  setShowOwners(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: "P001",
                    nom: "Dupont Jean",
                    propriétés: 3,
                    revenu: "45 000,00",
                    contact: "jean.dupont@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P002",
                    nom: "Martin Sophie",
                    propriétés: 2,
                    revenu: "32 500,00",
                    contact: "sophie.martin@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P003",
                    nom: "Bernard Philippe",
                    propriétés: 1,
                    revenu: "18 200,00",
                    contact: "philippe.bernard@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P004",
                    nom: "Petit Marie",
                    propriétés: 4,
                    revenu: "52 800,00",
                    contact: "marie.petit@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P005",
                    nom: "Durand Robert",
                    propriétés: 2,
                    revenu: "29 600,00",
                    contact: "robert.durand@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P006",
                    nom: "Leroy Isabelle",
                    propriétés: 1,
                    revenu: "15 900,00",
                    contact: "isabelle.leroy@email.com",
                    statut: "Actif",
                  },
                  {
                    id: "P007",
                    nom: "Moreau Thomas",
                    propriétés: 2,
                    revenu: "27 800,00",
                    contact: "thomas.moreau@email.com",
                    statut: "Actif",
                  },
                ].map((propriétaire, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                            <Users className="h-4 w-4 text-amber-500" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{propriétaire.nom}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">ID: {propriétaire.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{propriétaire.revenu} €</p>
                        <p className="text-sm text-muted-foreground">{propriétaire.propriétés} propriétés</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm text-muted-foreground">Contact: {propriétaire.contact}</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {propriétaire.statut}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-border"
                        onClick={() => {
                          setShowOwners(false)
                          handleViewOwnerDetails(propriétaire)
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowOwners(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les locataires */}
      {showTenants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={tenantsModalRef}
            className="max-h-[80vh] w-[90vw] max-w-3xl overflow-auto border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardTitle>Détails des locataires</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowTenants(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: "L001",
                    nom: "Lambert Paul",
                    propriété: "Appartement 3 pièces - Paris",
                    loyer: "1 250,00",
                    contact: "paul.lambert@email.com",
                    statut: "À jour",
                  },
                  {
                    id: "L002",
                    nom: "Dubois Claire",
                    propriété: "Maison 4 pièces - Lyon",
                    loyer: "1 450,00",
                    contact: "claire.dubois@email.com",
                    statut: "À jour",
                  },
                  {
                    id: "L003",
                    nom: "Roux Antoine",
                    propriété: "Studio - Marseille",
                    loyer: "750,00",
                    contact: "antoine.roux@email.com",
                    statut: "Retard",
                  },
                  {
                    id: "L004",
                    nom: "Fournier Émilie",
                    propriété: "Appartement 2 pièces - Bordeaux",
                    loyer: "950,00",
                    contact: "emilie.fournier@email.com",
                    statut: "À jour",
                  },
                  {
                    id: "L005",
                    nom: "Vincent Lucas",
                    propriété: "Maison 5 pièces - Lille",
                    loyer: "1 650,00",
                    contact: "lucas.vincent@email.com",
                    statut: "À jour",
                  },
                  {
                    id: "L006",
                    nom: "Morel Julie",
                    propriété: "Appartement 3 pièces - Nantes",
                    loyer: "1 150,00",
                    contact: "julie.morel@email.com",
                    statut: "Retard",
                  },
                  {
                    id: "L007",
                    nom: "Lefebvre Maxime",
                    propriété: "Studio - Toulouse",
                    loyer: "680,00",
                    contact: "maxime.lefebvre@email.com",
                    statut: "À jour",
                  },
                ].map((locataire, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{locataire.nom}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">ID: {locataire.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{locataire.loyer} €/mois</p>
                        <p className="text-sm text-muted-foreground">{locataire.propriété}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm text-muted-foreground">Contact: {locataire.contact}</span>
                      <Badge
                        variant="outline"
                        className={
                          locataire.statut === "À jour"
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {locataire.statut}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-border"
                        onClick={() => {
                          setShowTenants(false)
                          handleViewTenantDetails(locataire)
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowTenants(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les factures payées */}
      {showPaidInvoices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={paidInvoicesModalRef}
            className="max-h-[80vh] w-[90vw] max-w-3xl overflow-auto border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-green-600 to-green-500 text-primary-foreground">
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Détails des factures payées
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-green-700/50"
                onClick={() => setShowPaidInvoices(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: "F-2023-001",
                    client: "Dupont SAS",
                    montant: "12 500,00",
                    date: "15/04/2023",
                    delai: "5 jours",
                  },
                  {
                    id: "F-2023-002",
                    client: "Martin & Co",
                    montant: "8 750,00",
                    date: "22/04/2023",
                    delai: "On time",
                  },
                  {
                    id: "F-2023-003",
                    client: "Immobilier Durand",
                    montant: "15 200,00",
                    date: "30/04/2023",
                    delai: "2 jours",
                  },
                  {
                    id: "F-2023-004",
                    client: "Agence Centrale",
                    montant: "9 300,00",
                    date: "05/05/2023",
                    delai: "On time",
                  },
                  {
                    id: "F-2023-005",
                    client: "Habitat Plus",
                    montant: "11 800,00",
                    date: "12/05/2023",
                    delai: "1 jour",
                  },
                  {
                    id: "F-2023-006",
                    client: "Résidences Modernes",
                    montant: "14 500,00",
                    date: "18/05/2023",
                    delai: "On time",
                  },
                ].map((facture, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{facture.id}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{facture.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{facture.montant} €</p>
                        <p className="text-sm text-muted-foreground">Payée le {facture.date}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm text-muted-foreground">Délai de paiement: {facture.delai}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-border"
                        onClick={() => {
                          setShowPaidInvoices(false)
                          handleViewInvoiceDetails(facture)
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowPaidInvoices(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les factures impayées */}
      {showUnpaidInvoices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={unpaidInvoicesModalRef}
            className="max-h-[80vh] w-[90vw] max-w-3xl overflow-auto border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-destructive to-destructive/80 text-primary-foreground">
              <CardTitle className="flex items-center">
                <XCircle className="mr-2 h-5 w-5" />
                Détails des factures impayées
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-destructive/90"
                onClick={() => setShowUnpaidInvoices(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: "F-2023-007",
                    client: "Groupe Immobilier",
                    montant: "18 200,00",
                    date: "25/04/2023",
                    retard: "15 jours",
                    status: "En retard",
                  },
                  {
                    id: "F-2023-008",
                    client: "Résidences Luxe",
                    montant: "22 500,00",
                    date: "02/05/2023",
                    retard: "8 jours",
                    status: "En retard",
                  },
                  {
                    id: "F-2023-009",
                    client: "Habitat Confort",
                    montant: "13 800,00",
                    date: "10/05/2023",
                    retard: "0 jours",
                    status: "À échéance",
                  },
                  {
                    id: "F-2023-010",
                    client: "Agence Moderne",
                    montant: "16 900,00",
                    date: "18/05/2023",
                    retard: "0 jours",
                    status: "À échéance",
                  },
                ].map((facture, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                            <XCircle className="h-4 w-4 text-destructive" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground">{facture.id}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{facture.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{facture.montant} €</p>
                        <p className="text-sm text-muted-foreground">Échéance: {facture.date}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span
                        className={`text-sm ${facture.status === "En retard" ? "text-destructive" : "text-amber-500"}`}
                      >
                        {facture.status}: {facture.retard}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-border">
                          Relancer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-border"
                          onClick={() => {
                            setShowUnpaidInvoices(false)
                            handleViewInvoiceDetails(facture)
                          }}
                        >
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowUnpaidInvoices(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les détails d'une facture */}
      {showInvoiceDetails && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={invoiceDetailsModalRef}
            className="w-[90vw] max-w-2xl border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardTitle>Détails de la facture {selectedInvoice.id}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowInvoiceDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                    <p className="text-lg font-bold text-foreground">{selectedInvoice.client}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Montant</h3>
                    <p className="text-lg font-bold text-foreground">{selectedInvoice.montant} €</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                    <p className="text-lg font-bold text-foreground">{selectedInvoice.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {selectedInvoice.delai ? "Délai de paiement" : "Retard"}
                    </h3>
                    <p className="text-lg font-bold text-foreground">
                      {selectedInvoice.delai || selectedInvoice.retard}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Détails supplémentaires</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type de facture</span>
                      <span className="text-sm font-medium text-foreground">Loyer et charges</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Méthode de paiement</span>
                      <span className="text-sm font-medium text-foreground">Virement bancaire</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Référence</span>
                      <span className="text-sm font-medium text-foreground">REF-{selectedInvoice.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Propriété concernée</span>
                      <span className="text-sm font-medium text-foreground">Appartement 3 pièces - Paris</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Historique</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Facture créée</p>
                        <p className="text-xs text-muted-foreground">01/04/2023 à 10:23</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10">
                        <Clock className="h-3 w-3 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Rappel envoyé</p>
                        <p className="text-xs text-muted-foreground">15/04/2023 à 09:15</p>
                      </div>
                    </div>
                    {selectedInvoice.delai && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Paiement reçu</p>
                          <p className="text-xs text-muted-foreground">{selectedInvoice.date} à 14:30</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowInvoiceDetails(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les détails d'un propriétaire */}
      {showOwnerDetails && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={ownerDetailsModalRef}
            className="w-[90vw] max-w-2xl border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-amber-600 to-amber-500 text-primary-foreground">
              <CardTitle>Détails du propriétaire {selectedOwner.nom}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-amber-700/50"
                onClick={() => setShowOwnerDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                    <Users className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedOwner.nom}</h2>
                    <p className="text-sm text-muted-foreground">ID: {selectedOwner.id}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                    <p className="text-lg font-bold text-foreground">{selectedOwner.contact}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Revenu annuel</h3>
                    <p className="text-lg font-bold text-foreground">{selectedOwner.revenu} €</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nombre de propriétés</h3>
                    <p className="text-lg font-bold text-foreground">{selectedOwner.propriétés}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {selectedOwner.statut}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Propriétés</h3>
                  <div className="space-y-3">
                    {Array.from({ length: selectedOwner.propriétés }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border border-border bg-muted/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                            <Home className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {index === 0
                                ? "Appartement 3 pièces - Paris"
                                : index === 1
                                  ? "Studio - Lyon"
                                  : index === 2
                                    ? "Maison 4 pièces - Bordeaux"
                                    : "Appartement 2 pièces - Marseille"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {index === 0
                                ? "Loué depuis 2021"
                                : index === 1
                                  ? "Loué depuis 2022"
                                  : index === 2
                                    ? "Loué depuis 2020"
                                    : "Loué depuis 2023"}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            index === 0 || index === 2
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : index === 1
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }
                        >
                          {index === 0 || index === 2 ? "Loué" : index === 1 ? "Renouvellement" : "Nouveau"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Historique des paiements</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { mois: "Jan", montant: 3750 },
                          { mois: "Fév", montant: 3750 },
                          { mois: "Mar", montant: 3750 },
                          { mois: "Avr", montant: 3750 },
                          { mois: "Mai", montant: 3750 },
                          { mois: "Juin", montant: 3750 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="mois" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="montant" name="Montant (€)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowOwnerDetails(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal pour les détails d'un locataire */}
      {showTenantDetails && selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-background/80 backdrop-blur-sm">
          <Card
            ref={tenantDetailsModalRef}
            className="w-[90vw] max-w-2xl border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardTitle>Détails du locataire {selectedTenant.nom}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowTenantDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedTenant.nom}</h2>
                    <p className="text-sm text-muted-foreground">ID: {selectedTenant.id}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                    <p className="text-lg font-bold text-foreground">{selectedTenant.contact}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Loyer mensuel</h3>
                    <p className="text-lg font-bold text-foreground">{selectedTenant.loyer} €</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Propriété</h3>
                    <p className="text-lg font-bold text-foreground">{selectedTenant.propriété}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                    <Badge
                      variant="outline"
                      className={
                        selectedTenant.statut === "À jour"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {selectedTenant.statut}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Détails du contrat</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date de début</span>
                      <span className="text-sm font-medium text-foreground">01/06/2022</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date de fin</span>
                      <span className="text-sm font-medium text-foreground">31/05/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dépôt de garantie</span>
                      <span className="text-sm font-medium text-foreground">
                        {Number.parseInt(selectedTenant.loyer) * 2} €
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type de bail</span>
                      <span className="text-sm font-medium text-foreground">Bail d'habitation 3 ans</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-3 text-base font-medium text-foreground">Historique des paiements</h3>
                  <div className="space-y-3">
                    {[
                      { mois: "Mai 2023", statut: "Payé", date: "02/05/2023" },
                      { mois: "Avril 2023", statut: "Payé", date: "03/04/2023" },
                      { mois: "Mars 2023", statut: "Payé", date: "02/03/2023" },
                      { mois: "Février 2023", statut: "Payé", date: "05/02/2023" },
                      { mois: "Janvier 2023", statut: "Payé", date: "04/01/2023" },
                      { mois: "Décembre 2022", statut: "Payé", date: "03/12/2022" },
                    ].map((paiement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border border-border bg-muted/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{paiement.mois}</p>
                            <p className="text-xs text-muted-foreground">Payé le {paiement.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{selectedTenant.loyer} €</p>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            {paiement.statut}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="sticky bottom-0 z-10 flex justify-end gap-2 border-t border-border bg-card p-4">
              <Button variant="outline" onClick={() => setShowTenantDetails(false)} className="border-border">
                Fermer
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

function InvoiceCard({
  title,
  value,
  percentage,
  color,
  icon: Icon,
  iconBg,
  iconColor,
  textColor = "text-foreground",
}: InvoiceCardProps) {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm transition-all hover:shadow-md border border-border">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="relative h-12 w-12">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
            <circle
              className={`stroke-current ${color}`}
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${percentage * 2.51} 251.2`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-foreground">{percentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className={`text-xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  )
}

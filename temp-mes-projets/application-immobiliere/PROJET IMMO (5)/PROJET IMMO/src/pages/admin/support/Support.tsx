"use client"

import { useState, useCallback, useEffect, type ChangeEvent } from "react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/AdminCompotenants/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Textarea } from "@/components/AdminCompotenants/ui/textarea"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/AdminCompotenants/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { ScrollArea } from "@/components/AdminCompotenants/ui/scroll-area"
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Search,
  Plus,
  CheckCircle,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Download,
  Send,
  Eye,
  Star,
  MessageCircle,
  Zap,
  Shield,
  Bell,
  RefreshCw,
  Info,
  Loader2,
  BookOpen,
  PhoneCall,
  MailOpen,
  MessageSquareMore,
  Activity,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

// Types
type TicketStatus = "Ouvert" | "En cours" | "Résolu" | "Fermé" | "En attente"
type TicketPriority = "Basse" | "Moyenne" | "Haute" | "Critique"

interface Ticket {
  id: string
  title: string
  description: string
  date: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  assignedTo?: string
  lastUpdate: string
  messages: TicketMessage[]
}

interface TicketMessage {
  id: string
  author: string
  content: string
  timestamp: string
  isSupport: boolean
}

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  helpful: number
  views: number
  detailedAnswer?: string
}

interface ContactForm {
  subject: string
  message: string
  category: string
  priority: string
}

interface NewTicketForm {
  title: string
  description: string
  category: string
  priority: string
}

const Support = () => {
  const [activeTab, setActiveTab] = useState("tickets")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [showTicketDetails, setShowTicketDetails] = useState(false)
  const [showDocumentation, setShowDocumentation] = useState(false)
  const [showStatusPage, setShowStatusPage] = useState(false)
  const [showFAQDetails, setShowFAQDetails] = useState(false)
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [contactForm, setContactForm] = useState<ContactForm>({
    subject: "",
    message: "",
    category: "",
    priority: "moyenne",
  })
  const [newTicketForm, setNewTicketForm] = useState<NewTicketForm>({
    title: "",
    description: "",
    category: "",
    priority: "moyenne",
  })

  // Données simulées des tickets
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T-2025-001",
      title: "Problème de synchronisation des données de paiement",
      description:
        "Les paiements ne se synchronisent pas correctement avec le système comptable. Certaines transactions apparaissent en double.",
      date: "15/05/2025",
      status: "Résolu",
      priority: "Moyenne",
      category: "Technique",
      assignedTo: "Marie Dubois",
      lastUpdate: "16/05/2025 14:30",
      messages: [
        {
          id: "m1",
          author: "Vous",
          content: "Bonjour, j'ai un problème avec la synchronisation des paiements...",
          timestamp: "15/05/2025 09:15",
          isSupport: false,
        },
        {
          id: "m2",
          author: "Marie Dubois",
          content: "Bonjour, merci pour votre signalement. Nous allons examiner ce problème immédiatement.",
          timestamp: "15/05/2025 10:30",
          isSupport: true,
        },
        {
          id: "m3",
          author: "Marie Dubois",
          content: "Le problème a été identifié et corrigé. Pouvez-vous vérifier que tout fonctionne maintenant ?",
          timestamp: "16/05/2025 14:30",
          isSupport: true,
        },
      ],
    },
    {
      id: "T-2025-002",
      title: "Erreur lors de la génération des rapports mensuels",
      description: "Impossible de générer les rapports pour le mois de mai. Le système affiche une erreur 500.",
      date: "20/05/2025",
      status: "En cours",
      priority: "Haute",
      category: "Fonctionnalité",
      assignedTo: "Thomas Martin",
      lastUpdate: "25/05/2025 16:45",
      messages: [
        {
          id: "m4",
          author: "Vous",
          content: "Je n'arrive pas à générer les rapports mensuels, j'ai une erreur 500.",
          timestamp: "20/05/2025 11:20",
          isSupport: false,
        },
        {
          id: "m5",
          author: "Thomas Martin",
          content: "Nous avons reproduit le problème et travaillons sur une solution. Merci de votre patience.",
          timestamp: "20/05/2025 15:30",
          isSupport: true,
        },
      ],
    },
    {
      id: "T-2025-003",
      title: "Demande d'amélioration de l'interface mobile",
      description:
        "Suggestion d'amélioration pour rendre l'interface mobile plus intuitive, notamment pour la gestion des locataires.",
      date: "25/05/2025",
      status: "En attente",
      priority: "Basse",
      category: "Amélioration",
      assignedTo: "Sophie Leroy",
      lastUpdate: "25/05/2025 09:00",
      messages: [
        {
          id: "m6",
          author: "Vous",
          content: "J'aimerais suggérer quelques améliorations pour l'interface mobile...",
          timestamp: "25/05/2025 09:00",
          isSupport: false,
        },
      ],
    },
    {
      id: "T-2025-004",
      title: "Problème d'affichage des graphiques analytics",
      description: "Les graphiques dans la section analytics ne s'affichent pas correctement sur Chrome.",
      date: "01/06/2025",
      status: "Fermé",
      priority: "Moyenne",
      category: "Bug",
      assignedTo: "Pierre Durand",
      lastUpdate: "02/06/2025 11:15",
      messages: [
        {
          id: "m7",
          author: "Vous",
          content: "Les graphiques ne s'affichent pas sur Chrome, mais fonctionnent sur Firefox.",
          timestamp: "01/06/2025 14:20",
          isSupport: false,
        },
        {
          id: "m8",
          author: "Pierre Durand",
          content: "Problème résolu avec la mise à jour de ce matin. Merci pour le signalement !",
          timestamp: "02/06/2025 11:15",
          isSupport: true,
        },
      ],
    },
  ])

  // Données FAQ avec réponses détaillées
  const faqItems: FAQItem[] = [
    {
      id: "faq1",
      category: "Gestion des locataires",
      question: "Comment ajouter un nouveau locataire dans le système ?",
      answer:
        "Pour ajouter un nouveau locataire, accédez à la section 'Locataires' depuis le menu principal, puis cliquez sur le bouton 'Ajouter un locataire'. Remplissez le formulaire avec les informations personnelles, les détails du contrat, et assignez le logement correspondant.",
      detailedAnswer: `
**Étapes détaillées pour ajouter un locataire :**

1. **Accès au module Locataires**
   - Connectez-vous à votre tableau de bord
   - Cliquez sur "Locataires" dans le menu principal
   - Sélectionnez "Ajouter un nouveau locataire"

2. **Informations personnelles**
   - Nom et prénom (obligatoire)
   - Date de naissance
   - Numéro de téléphone et email
   - Adresse actuelle
   - Profession et revenus

3. **Documents requis**
   - Pièce d'identité (CNI, passeport)
   - Justificatifs de revenus (3 derniers bulletins de salaire)
   - Attestation d'assurance habitation
   - Garant si nécessaire

4. **Détails du contrat**
   - Type de bail (meublé/non meublé)
   - Durée du contrat
   - Montant du loyer et charges
   - Date d'entrée dans les lieux
   - Dépôt de garantie

5. **Validation et archivage**
   - Vérification des informations
   - Signature électronique du contrat
   - Archivage automatique des documents
   - Génération de l'état des lieux d'entrée
      `,
      helpful: 45,
      views: 234,
    },
    {
      id: "faq2",
      category: "Gestion financière",
      question: "Comment générer et personnaliser une quittance de loyer ?",
      answer:
        "Pour générer une quittance, allez dans la section 'Paiements', sélectionnez le paiement concerné, puis cliquez sur 'Générer une quittance'. Vous pouvez personnaliser le modèle dans les paramètres.",
      detailedAnswer: `
**Guide complet pour les quittances de loyer :**

1. **Génération automatique**
   - Les quittances sont générées automatiquement lors de l'enregistrement d'un paiement
   - Accès via "Paiements" > "Historique" > "Générer quittance"
   - Format PDF téléchargeable immédiatement

2. **Personnalisation du modèle**
   - Paramètres > Modèles de documents > Quittances
   - Ajout du logo de votre agence
   - Modification des couleurs et polices
   - Champs personnalisables (mentions légales, coordonnées)

3. **Informations incluses**
   - Identité du bailleur et du locataire
   - Adresse du bien loué
   - Période de location concernée
   - Détail des sommes perçues (loyer, charges)
   - Date et lieu d'émission

4. **Envoi automatique**
   - Configuration d'envoi automatique par email
   - Programmation mensuelle
   - Accusé de réception
   - Archivage dans le dossier locataire

5. **Aspects légaux**
   - Obligation légale de délivrance
   - Délai de conservation : 3 ans minimum
   - Valeur probante en cas de litige
      `,
      helpful: 38,
      views: 189,
    },
    {
      id: "faq3",
      category: "Gestion des biens",
      question: "Comment modifier les informations d'un bien immobilier ?",
      answer:
        "Pour modifier un bien, accédez à la section 'Bâtiments' ou 'Appartements', utilisez les filtres pour trouver le bien concerné, puis cliquez sur l'icône d'édition.",
      detailedAnswer: `
**Modification complète des biens immobiliers :**

1. **Accès aux informations du bien**
   - Menu "Patrimoine" > "Mes biens"
   - Recherche par adresse, référence ou locataire
   - Filtres avancés (type, statut, agence)

2. **Informations modifiables**
   - Caractéristiques techniques (surface, nombre de pièces)
   - Équipements et aménagements
   - Photos et visite virtuelle
   - Documents associés (DPE, diagnostics)
   - Historique des travaux

3. **Gestion des loyers**
   - Montant du loyer et révisions
   - Charges locatives
   - Dépôt de garantie
   - Indexation automatique

4. **Suivi des travaux**
   - Planification des interventions
   - Suivi des coûts
   - Photos avant/après
   - Validation des devis

5. **Historique et traçabilité**
   - Journal des modifications
   - Versions antérieures
   - Notifications automatiques
   - Sauvegarde cloud sécurisée
      `,
      helpful: 52,
      views: 298,
    },
    {
      id: "faq4",
      category: "Sécurité",
      question: "Comment sécuriser mon compte et changer mon mot de passe ?",
      answer:
        "Pour changer votre mot de passe, cliquez sur votre profil en haut à droite, sélectionnez 'Paramètres du compte', puis 'Sécurité'. Nous recommandons d'activer l'authentification à deux facteurs.",
      detailedAnswer: `
**Sécurisation complète de votre compte :**

1. **Modification du mot de passe**
   - Profil utilisateur > Sécurité > Changer le mot de passe
   - Mot de passe actuel requis
   - Nouveau mot de passe : minimum 12 caractères
   - Confirmation obligatoire

2. **Critères de sécurité**
   - Au moins 12 caractères
   - Majuscules et minuscules
   - Chiffres et caractères spéciaux
   - Pas de mots du dictionnaire
   - Différent des 5 derniers mots de passe

3. **Authentification à deux facteurs (2FA)**
   - Activation recommandée
   - Application mobile (Google Authenticator, Authy)
   - Code SMS en alternative
   - Codes de récupération à conserver

4. **Surveillance du compte**
   - Historique des connexions
   - Alertes de connexion suspecte
   - Déconnexion automatique
   - Verrouillage après tentatives échouées

5. **Bonnes pratiques**
   - Déconnexion systématique
   - Pas de partage d'identifiants
   - Mise à jour régulière du navigateur
   - Vérification des emails de sécurité
      `,
      helpful: 67,
      views: 445,
    },
    {
      id: "faq5",
      category: "Rapports et analyses",
      question: "Comment interpréter les données du tableau de bord analytics ?",
      answer:
        "Le tableau de bord analytics présente les KPIs en temps réel : taux d'occupation, revenus mensuels, évolution des impayés, et performance par agence.",
      detailedAnswer: `
**Guide d'interprétation des analytics :**

1. **Indicateurs clés de performance (KPIs)**
   - Taux d'occupation global et par bien
   - Revenus locatifs mensuels/annuels
   - Évolution des impayés
   - Rentabilité par propriété
   - Performance comparative des agences

2. **Graphiques et tendances**
   - Courbes d'évolution temporelle
   - Comparaisons période sur période
   - Prévisions basées sur l'historique
   - Seuils d'alerte personnalisables

3. **Filtres et segmentation**
   - Par période (jour, semaine, mois, année)
   - Par type de bien (appartement, maison, commercial)
   - Par zone géographique
   - Par agence ou gestionnaire

4. **Rapports automatisés**
   - Génération mensuelle automatique
   - Envoi par email programmé
   - Formats disponibles (PDF, Excel, CSV)
   - Personnalisation des destinataires

5. **Alertes et notifications**
   - Seuils de performance
   - Détection d'anomalies
   - Rappels d'échéances
   - Recommandations d'optimisation
      `,
      helpful: 29,
      views: 156,
    },
  ]

  // Fonctions utilitaires
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "Résolu":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
      case "En cours":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800"
      case "En attente":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
      case "Fermé":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 border-gray-200 dark:border-gray-700"
      case "Ouvert":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    }
  }

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "Critique":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "Haute":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Basse":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
    }
  }

  const getPriorityIcon = (priority: TicketPriority) => {
    switch (priority) {
      case "Critique":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Haute":
        return <Zap className="h-4 w-4 text-orange-500" />
      case "Moyenne":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Basse":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  // Filtrer les tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Créer un nouveau ticket
  const handleCreateTicket = async () => {
    if (!newTicketForm.title || !newTicketForm.description || !newTicketForm.category) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsLoading(true)

    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newTicket: Ticket = {
      id: `T-2025-${String(tickets.length + 1).padStart(3, "0")}`,
      title: newTicketForm.title,
      description: newTicketForm.description,
      date: new Date().toLocaleDateString("fr-FR"),
      status: "Ouvert",
      priority: newTicketForm.priority as TicketPriority,
      category: newTicketForm.category,
      lastUpdate: new Date().toLocaleString("fr-FR"),
      messages: [
        {
          id: `m${Date.now()}`,
          author: "Vous",
          content: newTicketForm.description,
          timestamp: new Date().toLocaleString("fr-FR"),
          isSupport: false,
        },
      ],
    }

    setTickets([newTicket, ...tickets])
    setNewTicketForm({ title: "", description: "", category: "", priority: "moyenne" })
    setShowNewTicketModal(false)
    setIsLoading(false)

    // Notification de succès
    setTimeout(() => {
      alert("✅ Votre ticket a été créé avec succès ! Vous recevrez une réponse sous 24h.")
    }, 100)
  }

  // Voir les détails d'un ticket
  const handleViewTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setShowTicketDetails(true)
  }

  // Envoyer un message dans un ticket
  const handleSendMessage = (ticketId: string, message: string) => {
    if (!message.trim()) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        const newMessage: TicketMessage = {
          id: `m${Date.now()}`,
          author: "Vous",
          content: message,
          timestamp: new Date().toLocaleString("fr-FR"),
          isSupport: false,
        }
        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          lastUpdate: new Date().toLocaleString("fr-FR"),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)

    // Mettre à jour le ticket sélectionné si c'est celui qui est affiché
    if (selectedTicket && selectedTicket.id === ticketId) {
      const updatedTicket = updatedTickets.find((t) => t.id === ticketId)
      if (updatedTicket) {
        setSelectedTicket(updatedTicket)
      }
    }
  }

  // Fonctions pour les boutons
  const handleCallNow = () => {
    window.open("tel:+33123456789", "_self")
  }

  const handleSendEmail = () => {
    window.open(
      "mailto:support@immogest.fr?subject=Demande de support&body=Bonjour,%0D%0A%0D%0AJe vous contacte concernant...",
      "_blank",
    )
  }

  const handleStartChat = () => {
    alert("💬 Le chat en direct sera bientôt disponible ! En attendant, vous pouvez créer un ticket de support.")
  }

  const handleShowDocumentation = () => {
    setShowDocumentation(true)
  }

  const handleShowStatusPage = () => {
    setShowStatusPage(true)
  }

  const handleShowFAQDetails = (faq: FAQItem) => {
    setSelectedFAQ(faq)
    setShowFAQDetails(true)
  }

  const handleFAQHelpful = (isHelpful: boolean) => {
    alert(
      isHelpful
        ? "✅ Merci pour votre retour positif !"
        : "📝 Merci pour votre retour, nous allons améliorer cette réponse.",
    )
  }

  const handleSendContactMessage = async () => {
    if (!contactForm.subject || !contactForm.message || !contactForm.category) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsLoading(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setContactForm({ subject: "", message: "", category: "", priority: "moyenne" })
    alert("✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
  }

  const handleContactFormChange = useCallback(
    (field: keyof ContactForm) => (value: string) => {
      setContactForm((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  const handleNewTicketFormChange = useCallback(
    (field: keyof NewTicketForm) => (value: string) => {
      setNewTicketForm((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  useEffect(() => {
    console.log("Active tab changed:", activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-foreground">
      <div className="container mx-auto px-4 py-8 space-y-6 max-w-7xl">
        {/* En-tête de la page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-cyan-200 dark:border-cyan-800">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Centre de Support
            </h1>
            <p className="text-lg text-muted-foreground">
              Centre d'aide et assistance pour votre plateforme immobilière
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Tous les services opérationnels</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Temps de réponse moyen: 2h</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              onClick={() => setShowNewTicketModal(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-cyan-200 dark:border-cyan-800 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{tickets.length}</p>
                  <p className="text-sm text-muted-foreground">Tickets totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 dark:border-cyan-800 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {tickets.filter((t) => t.status === "Résolu").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Tickets résolus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 dark:border-cyan-800 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {tickets.filter((t) => t.status === "En cours" || t.status === "Ouvert").length}
                  </p>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 dark:border-cyan-800 bg-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mes tickets
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            {/* Barre de recherche et filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans vos tickets..."
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-input focus:border-cyan-500 focus:ring-cyan-500 h-12 text-base"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Ouvert">Ouvert</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Résolu">Résolu</SelectItem>
                    <SelectItem value="Fermé">Fermé</SelectItem>
                    <SelectItem value="En attente">En attente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes priorités</SelectItem>
                    <SelectItem value="Critique">Critique</SelectItem>
                    <SelectItem value="Haute">Haute</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Basse">Basse</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterStatus("all")
                    setFilterPriority("all")
                    setSearchQuery("")
                  }}
                  className="hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Liste des tickets */}
            <div className="space-y-4">
              {filteredTickets.length === 0 ? (
                <Card className="border-cyan-200 dark:border-cyan-800 bg-card">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Aucun ticket trouvé</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                        ? "Aucun ticket ne correspond à vos critères de recherche."
                        : "Vous n'avez pas encore créé de ticket de support."}
                    </p>
                    <Button
                      onClick={() => setShowNewTicketModal(true)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Créer votre premier ticket
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border-cyan-200 dark:border-cyan-800 bg-card hover:scale-[1.02]"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 shrink-0">
                            {getPriorityIcon(ticket.priority)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                              {ticket.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {ticket.description}
                            </CardDescription>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Ticket #{ticket.id}
                              </span>
                              <span>•</span>
                              <span>Créé le {ticket.date}</span>
                              <span>•</span>
                              <span>Mis à jour le {ticket.lastUpdate}</span>
                              {ticket.assignedTo && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {ticket.assignedTo}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {ticket.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>
                          {ticket.messages.length} message{ticket.messages.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTicketDetails(ticket)}
                          className="text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:text-cyan-400 dark:hover:bg-cyan-900/30"
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Voir les détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewTicketDetails(ticket)}
                          className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            {/* Barre de recherche FAQ */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans la FAQ..."
                className="pl-10 bg-background border-input focus:border-cyan-500 focus:ring-cyan-500 h-12 text-base"
              />
            </div>

            <Card className="border-cyan-200 dark:border-cyan-800 bg-card shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                <CardTitle className="text-2xl font-semibold text-cyan-700 dark:text-cyan-300">
                  Questions fréquemment posées
                </CardTitle>
                <CardDescription className="text-base">
                  Trouvez rapidement des réponses à vos questions sur l'utilisation de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {faqItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/10 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                      >
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {item.helpful} utiles
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg leading-tight">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{item.answer}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-cyan-200 dark:border-cyan-800">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFAQHelpful(true)}
                          className="text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
                        >
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          Utile
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFAQHelpful(false)}
                          className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          <ThumbsDown className="mr-1 h-4 w-4" />
                          Pas utile
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowFAQDetails(item)}
                        className="hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300"
                      >
                        <BookOpen className="mr-1 h-4 w-4" />
                        Plus de détails
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleShowDocumentation}
                  className="hover:bg-cyan-100 hover:text-cyan-700 hover:border-cyan-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Consulter la documentation complète
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Formulaire de contact */}
              <Card className="border-cyan-200 dark:border-cyan-800 bg-card shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                  <CardTitle className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                    Nous contacter
                  </CardTitle>
                  <CardDescription className="text-base">
                    Envoyez-nous un message détaillé et notre équipe vous répondra rapidement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold leading-none text-foreground" htmlFor="contact-subject">
                      Sujet de votre demande *
                    </label>
                    <Input
                      id="contact-subject"
                      placeholder="Décrivez brièvement votre problème ou question"
                      value={contactForm.subject}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactFormChange("subject")(e.target.value)
                      }
                      className="h-12 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold leading-none text-foreground" htmlFor="contact-category">
                        Catégorie *
                      </label>
                      <Select value={contactForm.category} onValueChange={handleContactFormChange("category")}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technique">Problème technique</SelectItem>
                          <SelectItem value="fonctionnalite">Demande de fonctionnalité</SelectItem>
                          <SelectItem value="bug">Signalement de bug</SelectItem>
                          <SelectItem value="compte">Gestion de compte</SelectItem>
                          <SelectItem value="facturation">Facturation</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold leading-none text-foreground">Priorité</label>
                      <Select value={contactForm.priority} onValueChange={handleContactFormChange("priority")}>
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basse">Basse - Question générale</SelectItem>
                          <SelectItem value="moyenne">Moyenne - Problème non bloquant</SelectItem>
                          <SelectItem value="haute">Haute - Problème bloquant</SelectItem>
                          <SelectItem value="critique">Critique - Service indisponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold leading-none text-foreground">Message détaillé *</label>
                    <Textarea
                      placeholder="Décrivez votre problème en détail :
• Que s'est-il passé ?
• Quelles étapes avez-vous suivies ?
• Quel était le résultat attendu ?
• Avez-vous des messages d'erreur ?
• Sur quel navigateur/appareil cela se produit-il ?"
                      value={contactForm.message}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        handleContactFormChange("message")(e.target.value)
                      }
                      className="min-h-[200px] resize-none focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                          Conseils pour un support efficace
                        </h4>
                        <ul className="text-sm text-cyan-600 dark:text-cyan-400 space-y-1">
                          <li>• Soyez aussi précis que possible dans votre description</li>
                          <li>• Incluez les étapes pour reproduire le problème</li>
                          <li>• Mentionnez votre navigateur et système d'exploitation</li>
                          <li>• Ajoutez des captures d'écran si pertinent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-6 flex justify-end">
                  <Button
                    onClick={handleSendContactMessage}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Informations de contact */}
              <Card className="border-cyan-200 dark:border-cyan-800 bg-card shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                  <CardTitle className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                    Informations de contact
                  </CardTitle>
                  <CardDescription className="text-base">
                    Plusieurs moyens pour nous joindre selon l'urgence de votre demande
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 shrink-0">
                      <Phone className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Support téléphonique</p>
                      <p className="text-cyan-600 dark:text-cyan-400 font-medium">+33 1 23 45 67 89</p>
                      <p className="text-sm text-muted-foreground">Du lundi au vendredi, 9h-18h</p>
                      <p className="text-sm text-muted-foreground">Support technique prioritaire</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCallNow}
                        className="mt-2 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300"
                      >
                        <PhoneCall className="mr-1 h-4 w-4" />
                        Appeler maintenant
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Support par email</p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">support@immogest.fr</p>
                      <p className="text-sm text-muted-foreground">Réponse garantie sous 24h ouvrées</p>
                      <p className="text-sm text-muted-foreground">Idéal pour les demandes détaillées</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSendEmail}
                        className="mt-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                      >
                        <MailOpen className="mr-1 h-4 w-4" />
                        Envoyer un email
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
                      <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Chat en direct</p>
                      <p className="text-green-600 dark:text-green-400 font-medium">Disponible sur notre interface</p>
                      <p className="text-sm text-muted-foreground">Du lundi au vendredi, 9h-17h</p>
                      <p className="text-sm text-muted-foreground">Réponse immédiate pour l'aide</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStartChat}
                        className="mt-2 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                      >
                        <MessageSquareMore className="mr-1 h-4 w-4" />
                        Démarrer le chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statut des services */}
            <Card className="border-cyan-200 dark:border-cyan-800 bg-card shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                <CardTitle className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                  Statut des services en temps réel
                </CardTitle>
                <CardDescription className="text-base">
                  Surveillance continue de nos systèmes et maintenance planifiée
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Application principale",
                      description: "Tous les systèmes fonctionnent parfaitement",
                      status: "operational",
                      uptime: "99.9%",
                    },
                    {
                      name: "API et synchronisation",
                      description: "Tous les endpoints répondent normalement",
                      status: "operational",
                      uptime: "99.8%",
                    },
                    {
                      name: "Génération de rapports",
                      description: "Service de rapports disponible",
                      status: "operational",
                      uptime: "99.7%",
                    },
                    {
                      name: "Maintenance planifiée",
                      description: "Mise à jour prévue le 15/06/2025 de 2h à 4h (UTC+1)",
                      status: "scheduled",
                      uptime: "N/A",
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 p-4 hover:bg-cyan-50/30 dark:hover:bg-cyan-950/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            service.status === "operational"
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-blue-100 dark:bg-blue-900/30"
                          }`}
                        >
                          {service.status === "operational" ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {service.uptime !== "N/A" && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{service.uptime}</p>
                            <p className="text-xs text-muted-foreground">Disponibilité</p>
                          </div>
                        )}
                        <Badge
                          className={
                            service.status === "operational"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          }
                        >
                          {service.status === "operational" ? "Opérationnel" : "Planifié"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleShowStatusPage}
                  className="hover:bg-cyan-100 hover:text-cyan-700 hover:border-cyan-300"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Page de statut complète
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal Nouveau Ticket */}
        <Dialog open={showNewTicketModal} onOpenChange={setShowNewTicketModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Créer un nouveau ticket de support
              </DialogTitle>
              <DialogDescription>
                Décrivez votre problème en détail pour que notre équipe puisse vous aider efficacement
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold leading-none text-foreground">Titre du ticket *</label>
                <Input
                  placeholder="Résumez votre problème en quelques mots"
                  value={newTicketForm.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleNewTicketFormChange("title")(e.target.value)}
                  className="h-12 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold leading-none text-foreground">Catégorie *</label>
                  <Select value={newTicketForm.category} onValueChange={handleNewTicketFormChange("category")}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technique">Problème technique</SelectItem>
                      <SelectItem value="Fonctionnalité">Demande de fonctionnalité</SelectItem>
                      <SelectItem value="Bug">Signalement de bug</SelectItem>
                      <SelectItem value="Compte">Gestion de compte</SelectItem>
                      <SelectItem value="Facturation">Facturation</SelectItem>
                      <SelectItem value="Amélioration">Amélioration</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold leading-none text-foreground">Priorité</label>
                  <Select value={newTicketForm.priority} onValueChange={handleNewTicketFormChange("priority")}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basse">Basse - Question générale</SelectItem>
                      <SelectItem value="Moyenne">Moyenne - Problème non bloquant</SelectItem>
                      <SelectItem value="Haute">Haute - Problème bloquant</SelectItem>
                      <SelectItem value="Critique">Critique - Service indisponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold leading-none text-foreground">Description détaillée *</label>
                <Textarea
                  placeholder="Décrivez votre problème en détail :
• Que s'est-il passé ?
• Quelles étapes avez-vous suivies ?
• Quel était le résultat attendu ?
• Avez-vous des messages d'erreur ?
• Sur quel navigateur/appareil cela se produit-il ?"
                  value={newTicketForm.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleNewTicketFormChange("description")(e.target.value)
                  }
                  className="min-h-[200px] resize-none focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                      Conseils pour un support efficace
                    </h4>
                    <ul className="text-sm text-cyan-600 dark:text-cyan-400 space-y-1">
                      <li>• Soyez aussi précis que possible dans votre description</li>
                      <li>• Incluez les étapes pour reproduire le problème</li>
                      <li>• Mentionnez votre navigateur et système d'exploitation</li>
                      <li>• Ajoutez des captures d'écran si pertinent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowNewTicketModal(false)} disabled={isLoading}>
                Annuler
              </Button>
              <Button
                onClick={handleCreateTicket}
                disabled={isLoading || !newTicketForm.title || !newTicketForm.description || !newTicketForm.category}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer le ticket
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Détails du Ticket */}
        <Dialog open={showTicketDetails} onOpenChange={setShowTicketDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTicket && (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                        {selectedTicket.title}
                      </DialogTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>Ticket #{selectedTicket.id}</span>
                        <span>•</span>
                        <span>Créé le {selectedTicket.date}</span>
                        <span>•</span>
                        <span>Mis à jour le {selectedTicket.lastUpdate}</span>
                        {selectedTicket.assignedTo && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Assigné à {selectedTicket.assignedTo}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                      <Badge variant="outline" className={getPriorityColor(selectedTicket.priority)}>
                        {selectedTicket.priority}
                      </Badge>
                      <Badge variant="secondary">{selectedTicket.category}</Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Description initiale */}
                  <Card className="border-cyan-200 dark:border-cyan-800">
                    <CardHeader className="bg-cyan-50/50 dark:bg-cyan-950/20">
                      <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">
                        Description du problème
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-foreground leading-relaxed">{selectedTicket.description}</p>
                    </CardContent>
                  </Card>

                  {/* Historique des messages */}
                  <Card className="border-cyan-200 dark:border-cyan-800">
                    <CardHeader className="bg-cyan-50/50 dark:bg-cyan-950/20">
                      <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">
                        Historique des échanges
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px] p-4">
                        <div className="space-y-4">
                          {selectedTicket.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${message.isSupport ? "flex-row" : "flex-row-reverse"}`}
                            >
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
                                  message.isSupport
                                    ? "bg-cyan-100 dark:bg-cyan-900/30"
                                    : "bg-blue-100 dark:bg-blue-900/30"
                                }`}
                              >
                                {message.isSupport ? (
                                  <Shield className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                ) : (
                                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              <div className={`flex-1 ${message.isSupport ? "mr-8" : "ml-8"}`}>
                                <div
                                  className={`rounded-lg p-4 ${
                                    message.isSupport
                                      ? "bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800"
                                      : "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span
                                      className={`font-semibold text-sm ${
                                        message.isSupport
                                          ? "text-cyan-700 dark:text-cyan-300"
                                          : "text-blue-700 dark:text-blue-300"
                                      }`}
                                    >
                                      {message.author}
                                      {message.isSupport && (
                                        <Badge className="ml-2 bg-cyan-500 text-white text-xs">Support</Badge>
                                      )}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                  </div>
                                  <p className="text-foreground leading-relaxed">{message.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Répondre au ticket */}
                  {selectedTicket.status !== "Fermé" && (
                    <Card className="border-cyan-200 dark:border-cyan-800">
                      <CardHeader className="bg-cyan-50/50 dark:bg-cyan-950/20">
                        <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">Ajouter une réponse</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Tapez votre message ici..."
                            className="min-h-[120px] resize-none focus:border-cyan-500 focus:ring-cyan-500"
                            id={`reply-${selectedTicket.id}`}
                          />
                          <div className="flex justify-end">
                            <Button
                              onClick={() => {
                                const textarea = document.getElementById(
                                  `reply-${selectedTicket.id}`,
                                ) as HTMLTextAreaElement
                                if (textarea && textarea.value.trim()) {
                                  handleSendMessage(selectedTicket.id, textarea.value)
                                  textarea.value = ""
                                }
                              }}
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Envoyer la réponse
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-cyan-200 dark:border-cyan-800">
                  <div className="text-sm text-muted-foreground">Dernière mise à jour: {selectedTicket.lastUpdate}</div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowTicketDetails(false)}
                      className="hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      Fermer
                    </Button>
                    <Button variant="outline" className="hover:bg-cyan-50 hover:text-cyan-700">
                      <Download className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal Documentation */}
        <Dialog open={showDocumentation} onOpenChange={setShowDocumentation}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Documentation Complète
              </DialogTitle>
              <DialogDescription>Guide complet d'utilisation de la plateforme immobilière</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Guide de démarrage",
                    description: "Premiers pas avec la plateforme",
                    icon: BookOpen,
                    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
                  },
                  {
                    title: "Gestion des locataires",
                    description: "Ajouter, modifier et gérer vos locataires",
                    icon: User,
                    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                  },
                  {
                    title: "Gestion financière",
                    description: "Loyers, charges et comptabilité",
                    icon: Download,
                    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                  },
                  {
                    title: "Rapports et analyses",
                    description: "Générer et interpréter vos rapports",
                    icon: FileText,
                    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                  },
                ].map((doc, index) => (
                  <Card
                    key={index}
                    className="border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${doc.color}`}>
                          <doc.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDocumentation(false)}>
                Fermer
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Page de Statut */}
        <Dialog open={showStatusPage} onOpenChange={setShowStatusPage}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Page de Statut Complète
              </DialogTitle>
              <DialogDescription>Surveillance détaillée de tous nos services et infrastructures</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Statut global */}
              <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
                        Tous les systèmes opérationnels
                      </h3>
                      <p className="text-green-600 dark:text-green-400">
                        Aucun incident en cours • Dernière vérification: il y a 2 minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services détaillés */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Services principaux</h3>
                {[
                  { name: "Application web", status: "operational", uptime: "99.98%", responseTime: "245ms" },
                  { name: "API REST", status: "operational", uptime: "99.95%", responseTime: "156ms" },
                  { name: "Base de données", status: "operational", uptime: "99.99%", responseTime: "12ms" },
                  { name: "Service de fichiers", status: "operational", uptime: "99.92%", responseTime: "89ms" },
                  { name: "Notifications email", status: "operational", uptime: "99.87%", responseTime: "2.3s" },
                  { name: "Génération de rapports", status: "operational", uptime: "99.94%", responseTime: "1.8s" },
                ].map((service, index) => (
                  <Card key={index} className="border-cyan-200 dark:border-cyan-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-foreground">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Disponibilité: {service.uptime}</span>
                          <span>Temps de réponse: {service.responseTime}</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Opérationnel
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Historique des incidents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Historique récent</h3>
                <Card className="border-cyan-200 dark:border-cyan-800">
                  <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <h4 className="font-semibold mb-2">Aucun incident récent</h4>
                      <p>Tous nos services fonctionnent parfaitement depuis les 30 derniers jours.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowStatusPage(false)}>
                Fermer
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Bell className="mr-2 h-4 w-4" />
                S'abonner aux alertes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Détails FAQ */}
        <Dialog open={showFAQDetails} onOpenChange={setShowFAQDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedFAQ && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground mb-2">{selectedFAQ.question}</DialogTitle>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                    >
                      {selectedFAQ.category}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {selectedFAQ.views} vues
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {selectedFAQ.helpful} personnes ont trouvé cela utile
                      </span>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <Card className="border-cyan-200 dark:border-cyan-800">
                    <CardContent className="p-6">
                      <div className="prose prose-cyan dark:prose-invert max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedFAQ.detailedAnswer?.replace(/\n/g, "<br>") || selectedFAQ.answer,
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">Cette réponse vous a-t-elle été utile ?</div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFAQHelpful(true)}
                        className="text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30"
                      >
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Oui
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFAQHelpful(false)}
                        className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        Non
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowFAQDetails(false)}>
                    Fermer
                  </Button>
                  <Button
                    onClick={() => setShowNewTicketModal(true)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Créer un ticket
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Support

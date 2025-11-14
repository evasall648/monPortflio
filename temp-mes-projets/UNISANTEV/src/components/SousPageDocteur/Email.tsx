"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import type React from "react"
import { useState, useEffect, useContext } from "react"
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronDown,
  Download,
  File,
  Filter,
  Inbox,
  Loader2,
  Mail,
  MailPlus,
  Menu,
  Paperclip,
  RefreshCw,
  Reply,
  ReplyAll,
  Search,
  Send,
  Star,
  Trash,
  X,
} from "lucide-react"
import { Button } from "../../components/SousPageDocteur/ui/button"
import Input from "../../components/SousPageDocteur/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord" // Importer le ThemeContext

// Interface pour un email
interface Email {
  id: number
  expéditeur: string
  destinataire: string
  catégorie?: string
  sujet: string
  corps?: string
  heure: string
  date: string
  piecesJointes?: { nom: string; taille: string; url?: string; fichier?: File }[]
  favori: boolean
  isRead: boolean
  isSpam: boolean
  isArchived?: boolean
  labels?: string[]
}

// Données initiales avec contenu pour toutes les sections et étiquettes
const initialEmails: Email[] = [
  {
    id: 1,
    expéditeur: "Badji Fatou",
    destinataire: "Fall Awa",
    catégorie: "Rendez-vous",
    sujet: "Rendez-vous le 20 mars à 10:00 - En attente",
    corps:
      "Bonjour Awa,\n\nJ'espère que vous allez bien. Je vous confirme votre rendez-vous prévu le 20 mars 2025 à 10:00 avec le Dr. Badji Fatou pour un suivi médical. Merci de confirmer votre présence.\n\nCordialement,\nFatou Badji",
    heure: "10:00",
    date: "13 mars 2025",
    piecesJointes: [{ nom: "document1.pdf", taille: "50 Ko", url: "#" }],
    favori: false,
    isRead: false,
    isSpam: false,
    labels: ["Rendez-vous", "Important"],
  },
  {
    id: 2,
    expéditeur: "Sarr Paul",
    destinataire: "Fall Awa",
    catégorie: "Rendez-vous",
    sujet: "Rendez-vous le 26 mars à 00:00 - Approuvé",
    corps:
      "Bonjour Awa,\n\nVotre rendez-vous du 26 mars 2025 à 00:00 avec le Dr. Sarr Paul est approuvé. Veuillez vous présenter à l'heure convenue.\n\nCordialement,\nPaul Sarr",
    heure: "00:00",
    date: "13 mars 2025",
    piecesJointes: [{ nom: "confirmation.pdf", taille: "20 Ko", url: "#" }],
    favori: true,
    isRead: true,
    isSpam: false,
    labels: ["Rendez-vous"],
  },
  {
    id: 3,
    expéditeur: "Fall Awa",
    destinataire: "Keita Hawa Demba",
    catégorie: "Message",
    sujet: "Demande de rapport médical",
    corps:
      "Bonjour Hawa,\n\nPourriez-vous m'envoyer le rapport médical de mon dernier examen ? Merci d'avance.\n\nCordialement,\nAwa Fall",
    heure: "14:30",
    date: "12 mars 2025",
    piecesJointes: [],
    favori: false,
    isRead: true,
    isSpam: false,
    labels: [],
  },
  {
    id: 4,
    expéditeur: "Diallo Abdou",
    destinataire: "Fall Awa",
    catégorie: "Rendez-vous",
    sujet: "Rendez-vous passé le 10 mars",
    corps:
      "Bonjour Awa,\n\nCeci est un rappel de votre rendez-vous passé le 10 mars 2025 à 14:30.\n\nCordialement,\nAbdou Diallo",
    heure: "14:30",
    date: "10 mars 2025",
    piecesJointes: [],
    favori: false,
    isRead: true,
    isSpam: false,
    isArchived: true,
    labels: [],
  },
  {
    id: 5,
    expéditeur: "Inconnu",
    destinataire: "Fall Awa",
    catégorie: "Spam",
    sujet: "Offre spéciale aujourd’hui seulement !",
    corps: "Achetez maintenant et économisez 50% ! Cliquez ici.",
    heure: "09:15",
    date: "13 mars 2025",
    piecesJointes: [],
    favori: false,
    isRead: false,
    isSpam: true,
    labels: [],
  },
  {
    id: 6,
    expéditeur: "Sow Mamadou",
    destinataire: "Fall Awa",
    catégorie: "Message",
    sujet: "Ancien message",
    corps: "Bonjour Awa,\n\nCeci est un ancien message.\n\nCordialement,\nMamadou Sow",
    heure: "11:00",
    date: "01 mars 2025",
    piecesJointes: [],
    favori: false,
    isRead: true,
    isSpam: false,
    labels: [],
  },
  {
    id: 7,
    expéditeur: "Loemba Vitaldine",
    destinataire: "Tous les médecins",
    catégorie: "Admin",
    sujet: "Mise à jour des horaires - Travail",
    corps:
      "Chers médecins,\n\nVoici les nouveaux horaires de garde pour le travail à partir du 15 mars 2025.\n\nCordialement,\nVitaldine Loemba",
    heure: "08:00",
    date: "13 mars 2025",
    piecesJointes: [{ nom: "horaire.pdf", taille: "60 Ko", url: "#" }],
    favori: false,
    isRead: false,
    isSpam: false,
    labels: ["Travail"],
  },
  {
    id: 8,
    expéditeur: "Basse Françoise",
    destinataire: "Fall Awa",
    catégorie: "Magasin",
    sujet: "Commande confirmée - Magasin",
    corps: "Bonjour Awa,\n\nVotre commande au magasin est confirmée.\n\nCordialement,\nFrançoise Basse",
    heure: "12:00",
    date: "13 mars 2025",
    piecesJointes: [],
    favori: false,
    isRead: false,
    isSpam: false,
    labels: ["Magasin"],
  },
  {
    id: 9,
    expéditeur: "Ndiaye Ndeye Marie",
    destinataire: "Fall Awa",
    catégorie: "Famille",
    sujet: "Réunion familiale",
    corps: "Bonjour Awa,\n\nN’oublie pas la réunion familiale ce weekend.\n\nBisous,\nNdeye Marie",
    heure: "15:00",
    date: "13 mars 2025",
    piecesJointes: [],
    favori: true,
    isRead: false,
    isSpam: false,
    labels: ["Famille"],
  },
]

// Composant principal
const MailApp: React.FC = () => {
  // Récupérer le contexte du thème
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error("MailApp doit être utilisé dans un ThemeContext.Provider")
  }
  const { isDarkMode } = themeContext

  // États
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [destinataireRedaction, setDestinataireRedaction] = useState("")
  const [objetRedaction, setObjetRedaction] = useState("")
  const [corpsRedaction, setCorpsRedaction] = useState("")
  const [fichiers, setFichiers] = useState<{ nom: string; taille: string; fichier?: File }[]>([])
  const [notification, setNotification] = useState<string | null>(null)
  const [searchTag, setSearchTag] = useState("")
  const [selectedSection, setSelectedSection] = useState<string>("Boîte de réception")
  const [emailList, setEmailList] = useState<Email[]>(initialEmails)
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterCategory, setFilterCategory] = useState<string>("")
  const [sortBy, setSortBy] = useState<"date" | "expéditeur" | "favori">("date")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeView, setActiveView] = useState<"default" | "compact" | "comfortable">("default")
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [isReplyAllOpen, setIsReplyAllOpen] = useState(false)
  const [isForwardOpen, setIsForwardOpen] = useState(false)
  const emailsPerPage = 10

  // Données statiques
  const etiquettes = ["Famille", "Travail", "Magasin", "ThèmeForest", "Google", "Important", "Rendez-vous"].filter(
    (tag) => tag.toLowerCase().includes(searchTag.toLowerCase()),
  )

  const utilisateurs = [
    "Badji Fatou",
    "Sarr Paul",
    "Keita Hawa Demba",
    "Diallo Abdou",
    "Ndiaye Aminata",
    "Sow Mamadou",
    "Loemba Vitaldine",
    "Basse Françoise",
    "Ndiaye Ndeye Marie",
    "Fall Awa",
  ]

  // Effet pour les notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Effet pour la responsivité
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true)
      } else {
        setIsSidebarCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Effet pour appliquer le mode sombre via le contexte
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Fonctions de gestion des emails
  const handleToggleFavorite = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const updatedEmails = emailList.map((email) => (email.id === emailId ? { ...email, favori: !email.favori } : email))
    setEmailList(updatedEmails)
    const newFavoriteState = updatedEmails.find((email) => email.id === emailId)?.favori
    setIsFavorite(newFavoriteState ?? false)
    setNotification(newFavoriteState ? "Ajouté aux favoris" : "Retiré des favoris")
  }

  const handleDelete = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setEmailList(emailList.filter((email) => email.id !== emailId))
    setSelectedEmails((prev) => {
      const newSelected = new Set(prev)
      newSelected.delete(emailId)
      return newSelected
    })
    setNotification("Email supprimé avec succès")
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const handleArchive = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setEmailList(emailList.map((email) => (email.id === emailId ? { ...email, isArchived: true } : email)))
    setSelectedEmails((prev) => {
      const newSelected = new Set(prev)
      newSelected.delete(emailId)
      return newSelected
    })
    setNotification("Email archivé")
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const handleMarkAsSpam = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setEmailList(emailList.map((email) => (email.id === emailId ? { ...email, isSpam: true } : email)))
    setSelectedEmails((prev) => {
      const newSelected = new Set(prev)
      newSelected.delete(emailId)
      return newSelected
    })
    setNotification("Email marqué comme spam")
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const handleMarkAsRead = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setEmailList(emailList.map((email) => (email.id === emailId ? { ...email, isRead: true } : email)))
    setNotification("Email marqué comme lu")
  }

  const handleMarkAsUnread = (emailId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setEmailList(emailList.map((email) => (email.id === emailId ? { ...email, isRead: false } : email)))
    setNotification("Email marqué comme non lu")
  }

  const toggleSelectEmail = (emailId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSelected = new Set(selectedEmails)
    if (newSelected.has(emailId)) newSelected.delete(emailId)
    else newSelected.add(emailId)
    setSelectedEmails(newSelected)
  }

  const toggleSelectAll = () => {
    const currentEmails = getCurrentEmails()
    if (selectedEmails.size === currentEmails.length && currentEmails.length > 0) {
      setSelectedEmails(new Set())
    } else {
      const allIds = currentEmails.map((email) => email.id)
      setSelectedEmails(new Set(allIds))
    }
  }

  const deleteSelectedEmails = () => {
    setEmailList(emailList.filter((email) => !selectedEmails.has(email.id)))
    setSelectedEmails(new Set())
    setNotification("Emails supprimés avec succès")
  }

  const archiveSelectedEmails = () => {
    setEmailList(emailList.map((email) => (selectedEmails.has(email.id) ? { ...email, isArchived: true } : email)))
    setSelectedEmails(new Set())
    setNotification("Emails archivés avec succès")
  }

  const markSelectedAsRead = () => {
    setEmailList(emailList.map((email) => (selectedEmails.has(email.id) ? { ...email, isRead: true } : email)))
    setNotification("Emails marqués comme lus")
  }

  const markSelectedAsUnread = () => {
    setEmailList(emailList.map((email) => (selectedEmails.has(email.id) ? { ...email, isRead: false } : email)))
    setNotification("Emails marqués comme non lus")
  }

  const openEmail = (email: Email) => {
    const updatedEmails = emailList.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    setEmailList(updatedEmails)
    setSelectedEmail(email)
    setIsFavorite(email.favori)
  }

  const closeEmail = () => setSelectedEmail(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      setNotification("Boîte de réception actualisée")
    }, 1000)
  }

  // Fonctions pour la rédaction
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nouveauxFichiers = Array.from(e.target.files).map((file) => ({
        nom: file.name,
        taille: `${(file.size / 1024).toFixed(2)} Ko`,
        fichier: file,
      }))
      setFichiers([...fichiers, ...nouveauxFichiers])
      setNotification("Fichier(s) ajouté(s) avec succès")
    }
  }

  const handleRemoveFile = (index: number) => {
    setFichiers(fichiers.filter((_, i) => i !== index))
    setNotification("Fichier supprimé")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!destinataireRedaction || !objetRedaction) {
      setNotification('Veuillez remplir les champs "À" et "Objet"')
      return
    }
    const newEmail: Email = {
      id: emailList.length + 1,
      expéditeur: "Fall Awa",
      destinataire: destinataireRedaction,
      sujet: objetRedaction,
      corps: corpsRedaction,
      heure: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }),
      piecesJointes: fichiers,
      favori: false,
      isRead: true,
      isSpam: false,
      labels: [],
    }
    setEmailList([...emailList, newEmail])
    setNotification("Email envoyé avec succès")
    setDestinataireRedaction("")
    setObjetRedaction("")
    setCorpsRedaction("")
    setFichiers([])
    setIsComposeOpen(false)
    setSelectedSection("Envoyés")
  }

  const handleCancel = () => {
    setDestinataireRedaction("")
    setObjetRedaction("")
    setCorpsRedaction("")
    setFichiers([])
    setNotification("Formulaire réinitialisé")
    setIsComposeOpen(false)
  }

  // Fonctions pour Répondre, Répondre à tous, Transférer
  const handleReply = () => {
    if (selectedEmail) {
      setDestinataireRedaction(selectedEmail.expéditeur)
      setObjetRedaction(`Re: ${selectedEmail.sujet}`)
      setCorpsRedaction(
        `\n\nLe ${selectedEmail.date} à ${selectedEmail.heure}, ${selectedEmail.expéditeur} a écrit :\n> ${selectedEmail.corps}`,
      )
      setIsReplyOpen(true)
    }
  }

  const handleReplyAll = () => {
    if (selectedEmail) {
      const allRecipients = [selectedEmail.expéditeur, selectedEmail.destinataire]
        .filter((d) => d !== "Fall Awa")
        .join(", ")
      setDestinataireRedaction(allRecipients)
      setObjetRedaction(`Re: ${selectedEmail.sujet}`)
      setCorpsRedaction(
        `\n\nLe ${selectedEmail.date} à ${selectedEmail.heure}, ${selectedEmail.expéditeur} a écrit :\n> ${selectedEmail.corps}`,
      )
      setIsReplyAllOpen(true)
    }
  }

  const handleForward = () => {
    if (selectedEmail) {
      setDestinataireRedaction("")
      setObjetRedaction(`Fwd: ${selectedEmail.sujet}`)
      setCorpsRedaction(
        `\n\n--- Message transféré ---\nDe : ${selectedEmail.expéditeur}\nDate : ${selectedEmail.date} à ${selectedEmail.heure}\nSujet : ${selectedEmail.sujet}\nÀ : ${selectedEmail.destinataire}\n\n${selectedEmail.corps}`,
      )
      setFichiers(
        selectedEmail.piecesJointes?.map((pj) => ({
          nom: pj.nom,
          taille: pj.taille,
          fichier: pj.fichier,
        })) || [],
      )
      setIsForwardOpen(true)
    }
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmail: Email = {
      id: emailList.length + 1,
      expéditeur: "Fall Awa",
      destinataire: destinataireRedaction,
      sujet: objetRedaction,
      corps: corpsRedaction,
      heure: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }),
      piecesJointes: fichiers,
      favori: false,
      isRead: true,
      isSpam: false,
      labels: [],
    }
    setEmailList([...emailList, newEmail])
    setNotification("Réponse envoyée avec succès")
    setDestinataireRedaction("")
    setObjetRedaction("")
    setCorpsRedaction("")
    setFichiers([])
    setIsReplyOpen(false)
    setIsReplyAllOpen(false)
    setIsForwardOpen(false)
    setSelectedSection("Envoyés")
  }

  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
    setSelectedEmail(null)
    setNotification(`Section "${section}" sélectionnée`)
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false)
    }
  }

  // Filtrage, tri et pagination
  const filteredEmails = emailList.filter((email) => {
    const matchesSearch =
      searchTerm === "" ||
      email.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.expéditeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (email.corps && email.corps.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = filterCategory === "" || email.catégorie === filterCategory

    let matchesSection = false
    switch (selectedSection) {
      case "Boîte de réception":
        matchesSection = !email.isSpam && !email.isArchived && email.expéditeur !== "Fall Awa"
        break
      case "Favoris":
        matchesSection = email.favori
        break
      case "Envoyés":
        matchesSection = email.expéditeur === "Fall Awa"
        break
      case "Archives":
        matchesSection = !!email.isArchived
        break
      case "Spam":
        matchesSection = email.isSpam
        break
      case "Corbeille":
        matchesSection = false // Corbeille vide par défaut
        break
      default:
        matchesSection = email.labels?.includes(selectedSection) || false
    }

    return matchesSearch && matchesCategory && matchesSection
  })

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (sortBy === "date") {
      const datePartsA = a.date.split(" ")
      const datePartsB = b.date.split(" ")
      const dayA = Number.parseInt(datePartsA[0])
      const monthA = datePartsA[1]
      const yearA = Number.parseInt(datePartsA[2])
      const dayB = Number.parseInt(datePartsB[0])
      const monthB = datePartsB[1]
      const yearB = Number.parseInt(datePartsB[2])
      const monthsInFrench = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ]
      const monthIndexA = monthsInFrench.indexOf(monthA)
      const monthIndexB = monthsInFrench.indexOf(monthB)
      const dateA = new Date(yearA, monthIndexA, dayA)
      const dateB = new Date(yearB, monthIndexB, dayB)
      return dateB.getTime() - dateA.getTime()
    }
    if (sortBy === "expéditeur") return a.expéditeur.localeCompare(b.expéditeur)
    if (sortBy === "favori") return (b.favori ? 1 : 0) - (a.favori ? 1 : 0)
    return 0
  })

  const indexOfLastEmail = currentPage * emailsPerPage
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage
  const getCurrentEmails = () => sortedEmails.slice(indexOfFirstEmail, indexOfLastEmail)
  const totalPages = Math.ceil(sortedEmails.length / emailsPerPage)

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  // Rendu du composant de rédaction
  const renderComposeDialog = (isReply = false, isReplyAll = false, isForward = false) => (
    <Dialog
      open={isComposeOpen || isReplyOpen || isReplyAllOpen || isForwardOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsComposeOpen(false)
          setIsReplyOpen(false)
          setIsReplyAllOpen(false)
          setIsForwardOpen(false)
          setDestinataireRedaction("")
          setObjetRedaction("")
          setCorpsRedaction("")
          setFichiers([])
        }
      }}
    >
      <DialogContent
        className={cn(
          "sm:max-w-[600px] p-0 overflow-hidden",
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900",
          "transition-colors duration-300",
        )}
      >
        <DialogHeader
          className={cn(
            "px-4 py-2 border-b flex justify-between items-center",
            isDarkMode ? "border-gray-700" : "border-gray-200",
          )}
        >
          <DialogTitle>{isReply || isReplyAll ? "Répondre" : isForward ? "Transférer" : "Nouveau message"}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsComposeOpen(false)
              setIsReplyOpen(false)
              setIsReplyAllOpen(false)
              setIsForwardOpen(false)
            }}
            aria-label="Fermer la fenêtre de rédaction"
            title="Fermer la fenêtre de rédaction"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form
          className="space-y-4 p-4"
          onSubmit={isReply || isReplyAll || isForward ? handleReplySubmit : handleSubmit}
        >
          <div className="space-y-4">
            <div
              className={cn(
                "flex items-center space-x-2 border-b pb-2",
                isDarkMode ? "border-gray-700" : "border-gray-200",
              )}
            >
              <span className="text-sm font-medium">À:</span>
              <select
                value={destinataireRedaction}
                onChange={(e) => setDestinataireRedaction(e.target.value)}
                className={cn(
                  "flex-1 bg-transparent border-none focus:outline-none focus:ring-0 transition-colors duration-300",
                  isDarkMode ? "text-gray-200" : "text-gray-900",
                )}
                aria-label="Adresse email du destinataire"
                title="Sélectionner un destinataire"
                disabled={isReply || isReplyAll}
              >
                <option value="">Sélectionner un destinataire</option>
                {utilisateurs.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={cn(
                "flex items-center space-x-2 border-b pb-2",
                isDarkMode ? "border-gray-700" : "border-gray-200",
              )}
            >
              <span className="text-sm font-medium">Objet:</span>
              <Input
                type="text"
                value={objetRedaction}
                onChange={(e) => setObjetRedaction(e.target.value)}
                className={cn(
                  "flex-1 border-none focus:outline-none focus:ring-0 transition-colors duration-300",
                  isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900",
                )}
                placeholder="Objet de l'email"
              />
            </div>

            <Textarea
              value={corpsRedaction}
              onChange={(e) => setCorpsRedaction(e.target.value)}
              className={cn(
                "min-h-[200px] resize-none border-none focus:outline-none focus:ring-0 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900",
              )}
              placeholder="Tapez votre message ici..."
            />
          </div>

          {fichiers.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Pièces jointes:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {fichiers.map((fichier, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-2 rounded transition-colors duration-300",
                      isDarkMode ? "bg-gray-700" : "bg-gray-200",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[150px]">{fichier.nom}</p>
                        <p className="text-xs opacity-70">{fichier.taille}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(index)}
                      aria-label={`Supprimer ${fichier.nom}`}
                      title={`Supprimer ${fichier.nom}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={cn(
              "flex items-center justify-between pt-2 border-t",
              isDarkMode ? "border-gray-700" : "border-gray-200",
            )}
          >
            <div className="flex items-center space-x-2">
              <Button
                type="submit"
                variant="default"
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600",
                )}
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>

              <label className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  asChild
                  className={cn("transition-colors duration-300", isDarkMode ? "text-gray-300" : "text-gray-600")}
                >
                  <span>
                    <Paperclip className="h-4 w-4" />
                    <input type="file" className="hidden" onChange={handleFileChange} multiple />
                  </span>
                </Button>
                <span className="sr-only">Ajouter des pièces jointes</span>
              </label>
            </div>

            <Button
              variant="ghost"
              type="button"
              onClick={handleCancel}
              className={cn("transition-colors duration-300", isDarkMode ? "text-gray-300" : "text-gray-600")}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )

  // Rendu de l'interface principale
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col transition-colors duration-300",
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900",
      )}
    >
      {/* Header */}
      <header
        className={cn(
          "flex items-center justify-between p-2 md:p-4 border-b",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        )}
      >
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Menu"
            title="Ouvrir le menu mobile"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex"
            aria-label={isSidebarCollapsed ? "Développer le menu" : "Réduire le menu"}
            title={isSidebarCollapsed ? "Développer le menu" : "Réduire le menu"}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-green-500" />
            <span className="text-lg font-bold hidden md:inline">MailApp</span>
          </div>
        </div>

        <div className={cn("flex-1 max-w-2xl mx-4 relative", isSearchFocused ? "md:max-w-3xl" : "")}>
          <div
            className={cn(
              "flex items-center rounded-full px-4 py-2 transition-all duration-300",
              isDarkMode
                ? "bg-gray-700 focus-within:bg-gray-600"
                : "bg-gray-200 focus-within:bg-white focus-within:shadow-md",
              isSearchFocused ? "md:max-w-3xl" : "",
            )}
          >
            <Search className="h-4 w-4 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher dans les emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                "w-full bg-transparent border-none focus:outline-none focus:ring-0 transition-colors duration-300",
                isDarkMode ? "text-gray-200 placeholder:text-gray-400" : "text-gray-900 placeholder:text-gray-500",
              )}
              aria-label="Rechercher dans les emails"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchTerm("")}
                className="ml-1"
                aria-label="Effacer la recherche"
                title="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="ml-1"
              aria-label="Options de recherche avancées"
              title="Options de recherche avancées"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications" title="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Avatar
            className={cn(
              "h-8 w-8 border transition-colors duration-300",
              isDarkMode ? "border-gray-700" : "border-gray-300",
            )}
          >
            <div className="flex items-center justify-center h-full w-full bg-green-500 text-white font-medium">
              FA
            </div>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar mobile */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "fixed inset-0 z-50 flex md:hidden transition-colors duration-300",
              isDarkMode ? "bg-gray-900/80" : "bg-gray-500/80",
            )}
          >
            <div
              className={cn(
                "w-3/4 max-w-sm p-4 overflow-y-auto transition-colors duration-300",
                isDarkMode ? "bg-gray-800" : "bg-white",
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-green-500" />
                  <span className="text-lg font-bold">MailApp</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  title="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={() => {
                  setIsComposeOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className={cn(
                  "w-full mb-4 transition-colors duration-300",
                  isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600",
                )}
                aria-label="Rédiger un nouvel email"
                title="Rédiger un nouvel email"
              >
                <MailPlus className="h-4 w-4 mr-2" />
                RÉDIGER
              </Button>

              <nav className="space-y-1">
                {[
                  {
                    label: "Boîte de réception",
                    icon: <Inbox className="h-4 w-4" />,
                    count: emailList.filter(
                      (e) => !e.isRead && !e.isSpam && !e.isArchived && e.expéditeur !== "Fall Awa",
                    ).length,
                  },
                  {
                    label: "Favoris",
                    icon: <Star className="h-4 w-4" />,
                    count: emailList.filter((e) => e.favori).length,
                  },
                  {
                    label: "Envoyés",
                    icon: <Send className="h-4 w-4" />,
                    count: emailList.filter((e) => e.expéditeur === "Fall Awa").length,
                  },
                  {
                    label: "Archives",
                    icon: <Archive className="h-4 w-4" />,
                    count: emailList.filter((e) => e.isArchived).length,
                  },
                  { label: "Spam", icon: <X className="h-4 w-4" />, count: emailList.filter((e) => e.isSpam).length },
                  {
                    label: "Corbeille",
                    icon: <Trash className="h-4 w-4" />,
                    count: emailList.filter((e) => !e.isSpam && !e.isArchived && !e.favori && e.isRead).length,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSectionClick(item.label)}
                    className={cn(
                      "w-full flex items-center p-2 rounded-lg transition-colors duration-200",
                      selectedSection === item.label
                        ? isDarkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-800"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100",
                    )}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count > 0 && (
                      <Badge
                        variant={selectedSection === item.label ? "outline" : "default"}
                        className={cn("ml-auto", isDarkMode && selectedSection === item.label && "border-white")}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                <h3
                  className={cn(
                    "text-sm font-semibold mb-2 transition-colors duration-300",
                    isDarkMode ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Étiquettes
                </h3>
                <input
                  type="text"
                  placeholder="Rechercher une étiquette..."
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className={cn(
                    "w-full p-2 mb-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500",
                    isDarkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600 placeholder:text-gray-400"
                      : "bg-gray-200 text-gray-900 border-gray-300 placeholder:text-gray-500",
                  )}
                  aria-label="Rechercher une étiquette"
                  title="Rechercher une étiquette"
                />
                {etiquettes.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleSectionClick(tag)}
                    className={cn(
                      "w-full flex items-center p-2 rounded-lg transition-colors duration-200",
                      selectedSection === tag
                        ? isDarkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-800"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100",
                    )}
                    aria-label={`Étiquette ${tag}`}
                    title={`Étiquette ${tag}`}
                  >
                    <span
                      className={cn(
                        "w-3 h-3 rounded-full mr-2",
                        tag === "Famille"
                          ? "bg-red-500"
                          : tag === "Travail"
                            ? "bg-green-500"
                            : tag === "Magasin"
                              ? "bg-green-500"
                              : tag === "ThèmeForest"
                                ? "bg-teal-500"
                                : tag === "Important"
                                  ? "bg-yellow-500"
                                  : tag === "Rendez-vous"
                                    ? "bg-purple-500"
                                    : "bg-gray-500",
                      )}
                    ></span>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar desktop */}
        <aside
          className={cn(
            "hidden md:block border-r transition-all duration-300 overflow-y-auto",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
            isSidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <div className="p-4">
            <Button
              onClick={() => setIsComposeOpen(true)}
              className={cn(
                "transition-all duration-300",
                isSidebarCollapsed ? "w-8 h-8 p-0" : "w-full",
                isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600",
              )}
              aria-label="Rédiger un nouvel email"
              title="Rédiger un nouvel email"
            >
              {isSidebarCollapsed ? (
                <MailPlus className="h-4 w-4" />
              ) : (
                <>
                  <MailPlus className="h-4 w-4 mr-2" />
                  RÉDIGER
                </>
              )}
            </Button>
          </div>

          <nav className="space-y-1 px-2">
            {[
              {
                label: "Boîte de réception",
                icon: <Inbox className="h-4 w-4" />,
                count: emailList.filter((e) => !e.isRead && !e.isSpam && !e.isArchived && e.expéditeur !== "Fall Awa")
                  .length,
              },
              { label: "Favoris", icon: <Star className="h-4 w-4" />, count: emailList.filter((e) => e.favori).length },
              {
                label: "Envoyés",
                icon: <Send className="h-4 w-4" />,
                count: emailList.filter((e) => e.expéditeur === "Fall Awa").length,
              },
              {
                label: "Archives",
                icon: <Archive className="h-4 w-4" />,
                count: emailList.filter((e) => e.isArchived).length,
              },
              { label: "Spam", icon: <X className="h-4 w-4" />, count: emailList.filter((e) => e.isSpam).length },
              {
                label: "Corbeille",
                icon: <Trash className="h-4 w-4" />,
                count: emailList.filter((e) => !e.isSpam && !e.isArchived && !e.favori && e.isRead).length,
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleSectionClick(item.label)}
                className={cn(
                  "flex items-center p-2 rounded-lg w-full transition-colors duration-200",
                  selectedSection === item.label
                    ? isDarkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-800"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100",
                )}
                aria-label={item.label}
                title={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {!isSidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count > 0 && (
                      <Badge
                        variant={selectedSection === item.label ? "outline" : "default"}
                        className={cn("ml-auto", isDarkMode && selectedSection === item.label && "border-white")}
                      >
                        {item.count}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {!isSidebarCollapsed && (
            <div className="mt-6 px-4">
              <h3
                className={cn(
                  "text-sm font-semibold mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600",
                )}
              >
                Étiquettes
              </h3>
              <input
                type="text"
                placeholder="Rechercher une étiquette..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className={cn(
                  "w-full p-2 mb-2 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500",
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 border-gray-600 placeholder:text-gray-400"
                    : "bg-gray-200 text-gray-900 border-gray-300 placeholder:text-gray-500",
                )}
                aria-label="Rechercher une étiquette"
                title="Rechercher une étiquette"
              />
              {etiquettes.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleSectionClick(tag)}
                  className={cn(
                    "w-full flex items-center p-2 rounded-lg transition-colors duration-200",
                    selectedSection === tag
                      ? isDarkMode
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-800"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100",
                  )}
                  aria-label={`Étiquette ${tag}`}
                  title={`Étiquette ${tag}`}
                >
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full mr-2",
                      tag === "Famille"
                        ? "bg-red-500"
                        : tag === "Travail"
                          ? "bg-green-500"
                          : tag === "Magasin"
                            ? "bg-green-500"
                            : tag === "ThèmeForest"
                              ? "bg-teal-500"
                              : tag === "Important"
                                ? "bg-yellow-500"
                                : tag === "Rendez-vous"
                                  ? "bg-purple-500"
                                  : "bg-gray-500",
                    )}
                  ></span>
                  {tag}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {selectedEmail ? (
            <div
              className={cn(
                "h-full flex flex-col transition-colors duration-300",
                isDarkMode ? "bg-gray-900" : "bg-gray-50",
              )}
            >
              {/* Email detail header */}
              <div
                className={cn(
                  "flex items-center justify-between p-4 border-b",
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                )}
              >
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeEmail}
                    aria-label="Retour à la liste des emails"
                    title="Retour à la liste des emails"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArchive(selectedEmail.id)}
                    aria-label="Archiver l'email"
                    title="Archiver l'email"
                  >
                    <Archive className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(selectedEmail.id)}
                    aria-label="Supprimer l'email"
                    title="Supprimer l'email"
                  >
                    <Trash className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkAsSpam(selectedEmail.id)}
                    aria-label="Marquer comme spam"
                    title="Marquer comme spam"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkAsUnread(selectedEmail.id)}
                    aria-label="Marquer comme non lu"
                    title="Marquer comme non lu"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMarkAsRead(selectedEmail.id)}
                    aria-label="Marquer comme lu"
                    title="Marquer comme lu"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleFavorite(selectedEmail.id)}
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Star className={cn("h-5 w-5", isFavorite ? "text-yellow-500 fill-yellow-500" : "")} />
                  </Button>
                </div>
              </div>

              {/* Email content */}
              <div
                className={cn(
                  "flex-1 p-6 overflow-auto transition-colors duration-300",
                  isDarkMode ? "bg-gray-900" : "bg-white",
                )}
              >
                <h1 className="text-2xl font-bold mb-4">{selectedEmail.sujet}</h1>

                <div className="flex items-start mb-6">
                  <Avatar className="h-10 w-10 mr-4">
                    <div className="flex items-center justify-center h-full w-full bg-green-500 text-white font-medium">
                      {selectedEmail.expéditeur
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{selectedEmail.expéditeur}</p>
                        <p className={cn("text-sm opacity-70", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                          À: {selectedEmail.destinataire}
                        </p>
                      </div>
                      <div className={cn("text-sm opacity-70", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        {selectedEmail.date} {selectedEmail.heure && `à ${selectedEmail.heure}`}
                      </div>
                    </div>

                    {selectedEmail.labels && selectedEmail.labels.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedEmail.labels.map((label, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={cn(
                              label === "Important"
                                ? "border-yellow-500 text-yellow-500"
                                : label === "Rendez-vous"
                                  ? "border-purple-500 text-purple-500"
                                  : "border-green-500 text-green-500",
                            )}
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="prose max-w-none mb-6 whitespace-pre-wrap">{selectedEmail.corps}</div>

                {selectedEmail.piecesJointes && selectedEmail.piecesJointes.length > 0 && (
                  <div
                    className={cn(
                      "mt-6 border-t pt-4",
                      isDarkMode ? "border-gray-700" : "border-gray-200",
                    )}
                  >
                    <h3 className="font-medium mb-3">Pièces jointes ({selectedEmail.piecesJointes.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedEmail.piecesJointes.map((pj, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center p-3 rounded-lg border transition-colors duration-300",
                            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded flex items-center justify-center mr-3",
                              isDarkMode ? "bg-gray-700" : "bg-gray-200",
                            )}
                          >
                            <File className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{pj.nom}</p>
                            <p className={cn("text-xs opacity-70", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                              {pj.taille}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            aria-label={`Télécharger ${pj.nom}`}
                            title={`Télécharger ${pj.nom}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "mt-8 pt-4 border-t",
                    isDarkMode ? "border-gray-700" : "border-gray-200",
                  )}
                >
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center transition-colors duration-300",
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700",
                      )}
                      onClick={handleReply}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Répondre
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center transition-colors duration-300",
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700",
                      )}
                      onClick={handleReplyAll}
                    >
                      <ReplyAll className="h-4 w-4 mr-2" />
                      Répondre à tous
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center transition-colors duration-300",
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700",
                      )}
                      onClick={handleForward}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Transférer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "h-full flex flex-col transition-colors duration-300",
                isDarkMode ? "bg-gray-900" : "bg-gray-50",
              )}
            >
              {/* Email list header */}
              <div
                className={cn(
                  "flex items-center justify-between p-2 border-b",
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                )}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    checked={selectedEmails.size === getCurrentEmails().length && getCurrentEmails().length > 0}
                    onChange={toggleSelectAll}
                    aria-label="Sélectionner tous les emails"
                    title="Sélectionner tous les emails"
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={selectedEmails.size === 0}
                        aria-label="Plus d'actions"
                        title="Plus d'actions"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={markSelectedAsRead}>Marquer comme lu</DropdownMenuItem>
                      <DropdownMenuItem onClick={markSelectedAsUnread}>Marquer comme non lu</DropdownMenuItem>
                      <DropdownMenuItem onClick={archiveSelectedEmails}>Archiver</DropdownMenuItem>
                      <DropdownMenuItem onClick={deleteSelectedEmails} className="text-red-500">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRefresh}
                    aria-label="Actualiser la liste des emails"
                    title="Actualiser la liste des emails"
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={cn(
                      "text-sm rounded border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900",
                    )}
                    aria-label="Filtrer par catégorie"
                    title="Filtrer par catégorie"
                  >
                    <option value="">Toutes les catégories</option>
                    <option value="Rendez-vous">Rendez-vous</option>
                    <option value="Admin">Admin</option>
                    <option value="Message">Message</option>
                  </select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "text-sm transition-colors duration-300",
                          isDarkMode ? "text-gray-300" : "text-gray-700",
                        )}
                      >
                        <span className="mr-1">Tri:</span>
                        {sortBy === "date" ? "Date" : sortBy === "expéditeur" ? "Expéditeur" : "Favori"}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("date")}>Date</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("expéditeur")}>Expéditeur</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("favori")}>Favori</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "text-sm transition-colors duration-300",
                          isDarkMode ? "text-gray-300" : "text-gray-700",
                        )}
                      >
                        <span className="mr-1">Vue:</span>
                        {activeView === "default"
                          ? "Par défaut"
                          : activeView === "compact"
                            ? "Compacte"
                            : "Confortable"}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setActiveView("default")}>Par défaut</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveView("compact")}>Compacte</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setActiveView("comfortable")}>Confortable</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Email list */}
              <div
                className={cn(
                  "flex-1 overflow-auto transition-colors duration-300",
                  isDarkMode ? "bg-gray-900" : "bg-white",
                )}
              >
                {getCurrentEmails().length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <Mail className="h-12 w-12 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium mb-2">Aucun email trouvé</h3>
                    <p
                      className={cn(
                        "text-sm opacity-70 max-w-md",
                        isDarkMode ? "text-gray-400" : "text-gray-600",
                      )}
                    >
                      {searchTerm
                        ? "Aucun email ne correspond à votre recherche."
                        : "Il n’y a pas d’emails dans cette section pour le moment."}
                    </p>
                  </div>
                ) : (
                  <div className={cn("divide-y", isDarkMode ? "divide-gray-800" : "divide-gray-100")}>
                    {getCurrentEmails().map((email) => (
                      <div
                        key={email.id}
                        onClick={() => openEmail(email)}
                        className={cn(
                          "flex items-center p-3 cursor-pointer transition-colors duration-150",
                          activeView === "compact" ? "py-2" : activeView === "comfortable" ? "py-4" : "py-3",
                          email.isRead
                            ? isDarkMode
                              ? "hover:bg-gray-800"
                              : "hover:bg-gray-50"
                            : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-green-50 hover:bg-green-100",
                        )}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ouvrir l'email de ${email.expéditeur}`}
                      >
                        <div className="flex items-center min-w-0">
                          <input
                            type="checkbox"
                            className="h-4 w-4 mr-3 rounded"
                            checked={selectedEmails.has(email.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => toggleSelectEmail(email.id, e as unknown as React.MouseEvent)}
                            aria-label={`Sélectionner l'email de ${email.expéditeur}`}
                            title={`Sélectionner l'email`}
                          />

                          <button
                            onClick={(e) => handleToggleFavorite(email.id, e)}
                            className={cn(
                              "h-5 w-5 mr-3",
                              email.favori ? "text-yellow-500" : isDarkMode ? "text-gray-500" : "text-gray-400",
                            )}
                            aria-label={
                              email.favori
                                ? `Retirer ${email.expéditeur} des favoris`
                                : `Ajouter ${email.expéditeur} aux favoris`
                            }
                            title={
                              email.favori
                                ? `Retirer des favoris`
                                : `Ajouter aux favoris`
                            }
                          >
                            <Star className={email.favori ? "fill-yellow-500" : "fill-none"} />
                          </button>

                          <div className="flex-1 min-w-0 mr-3">
                            <div className="flex items-center mb-1">
                              <p
                                className={cn(
                                  "font-medium truncate mr-2",
                                  !email.isRead && "font-bold",
                                  isDarkMode ? "text-gray-200" : "text-gray-900",
                                )}
                              >
                                {email.expéditeur}
                              </p>

                              {!email.isRead && (
                                <span
                                  className={cn("w-2 h-2 rounded-full", isDarkMode ? "bg-green-400" : "bg-green-500")}
                                ></span>
                              )}
                            </div>

                            <p
                              className={cn(
                                "truncate text-sm",
                                !email.isRead && "font-semibold",
                                isDarkMode ? "text-gray-300" : "text-gray-700",
                              )}
                            >
                              {email.sujet}
                            </p>
                          </div>

                          <div className="flex flex-col items-end ml-auto">
                            <p
                              className={cn(
                                "text-xs opacity-70 whitespace-nowrap",
                                isDarkMode ? "text-gray-400" : "text-gray-600",
                              )}
                            >
                              {email.heure ? `${email.heure}` : email.date.split(" ")[0]}
                            </p>

                            {email.piecesJointes && email.piecesJointes.length > 0 && (
                              <div className="flex items-center mt-1">
                                <Paperclip
                                  className={cn(
                                    "h-3 w-3 opacity-50 mr-1",
                                    isDarkMode ? "text-gray-400" : "text-gray-600",
                                  )}
                                />
                                <span
                                  className={cn(
                                    "text-xs opacity-70",
                                    isDarkMode ? "text-gray-400" : "text-gray-600",
                                  )}
                                >
                                  {email.piecesJointes.length}
                                </span>
                              </div>
                            )}

                            {email.labels && email.labels.length > 0 && (
                              <div className="flex mt-1 space-x-1">
                                {email.labels.map((label, idx) => (
                                  <span
                                    key={idx}
                                    className={cn(
                                      "w-2 h-2 rounded-full",
                                      label === "Important"
                                        ? "bg-yellow-500"
                                        : label === "Rendez-vous"
                                          ? "bg-purple-500"
                                          : "bg-green-500",
                                    )}
                                    title={label}
                                  ></span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div
                className={cn(
                  "flex items-center justify-between p-2 border-t",
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                )}
              >
                <span
                  className={cn(
                    "text-sm opacity-70",
                    isDarkMode ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  {sortedEmails.length > 0
                    ? `${indexOfFirstEmail + 1}–${Math.min(indexOfLastEmail, sortedEmails.length)} sur ${sortedEmails.length}`
                    : "Aucun résultat"}
                </span>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    aria-label="Page précédente"
                    title="Page précédente"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>

                  <span
                    className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-700",
                    )}
                  >
                    Page {currentPage} sur {totalPages || 1}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    aria-label="Page suivante"
                    title="Page suivante"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Compose dialog */}
      {renderComposeDialog()}
      {renderComposeDialog(true)} {/* Reply */}
      {renderComposeDialog(false, true)} {/* Reply All */}
      {renderComposeDialog(false, false, true)} {/* Forward */}

      {/* Notification */}
      {notification && (
        <div
          className={cn(
            "fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300",
            isDarkMode ? "bg-green-600 text-white" : "bg-green-500 text-white",
          )}
          role="alert"
          aria-live="polite"
        >
          {notification}
        </div>
      )}
    </div>
  )
}

export default MailApp
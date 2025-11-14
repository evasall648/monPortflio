"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/AdminCompotenants/ui/Card"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Textarea } from "@/components/AdminCompotenants/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/AdminCompotenants/ui/dialog"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { ScrollArea } from "@/components/AdminCompotenants/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import appartVideo from "@/assets/appart.mp4"
import { QRCodeSVG } from 'qrcode.react'
import { Progress } from "@/components/AdminCompotenants/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import {
  Home,
  MapPin,
  Ruler,
  Euro,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  Building2,
  MessageSquare,
  Download,
  Camera,
  Star,
  AlertTriangle,
  CheckCircle,
  Zap,
  Droplets,
  Eye,
  Plus,
  Send,
  Bell,
  Map,
  QrCode,
  Video,
  BarChart3,
  Activity,
  Leaf,
  Flame,
  StarIcon,
  X,
} from "lucide-react"

const TenantApartmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [newIssue, setNewIssue] = useState("")
  const [issueType, setIssueType] = useState("")
  const [issuePriority, setIssuePriority] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [apartmentRating] = useState(4.5)
  const [agentRating, setAgentRating] = useState(0)
  const [agentComment, setAgentComment] = useState("")
  const [energyData] = useState({
    electricity: 85,
    water: 62,
    gas: 45,
    efficiency: 78,
  })
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [issues, setIssues] = useState([
    {
      id: 1,
      type: "Plomberie",
      title: "Fuite robinet cuisine",
      description: "Le robinet de la cuisine goutte depuis hier",
      priority: "Moyenne",
      status: "En cours",
      date: "2025-01-15",
      agent: "M. Martin",
    },
    {
      id: 2,
      type: "Électricité",
      title: "Prise défectueuse",
      description: "La prise de la chambre ne fonctionne plus",
      priority: "Haute",
      status: "Résolu",
      date: "2025-01-10",
      agent: "Mme. Dubois",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  // Charger les images depuis localStorage au démarrage
  useEffect(() => {
    const savedImages = localStorage.getItem("apartment-images")
    if (savedImages) {
      try {
        setSelectedImages(JSON.parse(savedImages))
      } catch (error) {
        console.error("Erreur lors du chargement des images:", error)
      }
    }
  }, [])

  // Sauvegarder les images dans localStorage à chaque changement
  useEffect(() => {
    if (selectedImages.length > 0) {
      localStorage.setItem("apartment-images", JSON.stringify(selectedImages))
    }
  }, [selectedImages])

  // Données simulées
  const apartmentData = {
    id: "APT-203",
    name: "Studio Premium - Résidence Les Jardins",
    address: "123 Avenue des Fleurs, Apt 203",
    city: "75001 Paris, France",
    surface: "35 m²",
    rent: "600 €",
    deposit: "1200 €",
    entryDate: "01/01/2025",
    contractEnd: "31/12/2025",
    type: "Studio meublé",
    floor: "2ème étage",
    balcony: "5 m²",
    parking: "Place incluse",
    status: "Occupé",
    rating: 4.5,
    coordinates: { lat: 48.8566, lng: 2.3522 },
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Agent Immobilier",
      content: "Bonjour, la réparation du robinet est programmée pour demain matin.",
      timestamp: "Aujourd'hui, 14:30",
      isFromTenant: false,
    },
    {
      id: 2,
      sender: "Vous",
      content: "Parfait, je serai disponible à partir de 9h.",
      timestamp: "Aujourd'hui, 14:35",
      isFromTenant: true,
    },
  ])

  const documents = [
    { name: "Contrat de bail", type: "PDF", size: "2.4 MB", date: "01/01/2025", url: "/documents/contrat-bail.pdf" },
    { name: "Règlement intérieur", type: "PDF", size: "1.2 MB", date: "01/01/2025", url: "/documents/reglement.pdf" },
    { name: "Assurance habitation", type: "PDF", size: "0.8 MB", date: "15/01/2025", url: "/documents/assurance.pdf" },
    {
      name: "État des lieux d'entrée",
      type: "PDF",
      size: "3.1 MB",
      date: "01/01/2025",
      url: "/documents/etat-lieux.pdf",
    },
    {
      name: "Diagnostic énergétique",
      type: "PDF",
      size: "1.5 MB",
      date: "01/01/2025",
      url: "/documents/diagnostic.pdf",
    },
  ]

  const inventory = [
    { category: "Cuisine", items: ["Réfrigérateur", "Four", "Micro-ondes", "Lave-vaisselle", "Cafetière"] },
    { category: "Salon", items: ["Canapé 2 places", "Table basse", 'TV 43"', "Étagères"] },
    { category: "Chambre", items: ["Lit double", "Matelas", "Armoire", "Bureau", "Chaise"] },
    { category: "Salle de bain", items: ["Douche", "Lavabo", "Miroir", "Rangements"] },
  ]

  const maintenanceHistory = [
    { date: "2024-12-15", type: "Révision chauffage", status: "Terminé", technician: "M. Leroy" },
    { date: "2024-11-20", type: "Nettoyage VMC", status: "Terminé", technician: "Mme. Petit" },
    { date: "2024-10-10", type: "Vérification électrique", status: "Terminé", technician: "M. Bernard" },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages: string[] = []
      let processedFiles = 0

      Array.from(files).forEach((file) => {
        // Vérifier le type de fichier
        if (!file.type.startsWith("image/")) {
          toast({
            title: "❌ Erreur",
            description: `Le fichier "${file.name}" n'est pas une image valide.`,
            variant: "destructive",
          })
          return
        }

        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "❌ Erreur",
            description: `Le fichier "${file.name}" est trop volumineux (max 5MB).`,
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = e.target?.result as string
          if (imageData) {
            newImages.push(imageData)
            processedFiles++

            if (processedFiles === files.length) {
              setSelectedImages((prev) => [...prev, ...newImages])
              toast({
                title: "📸 Images ajoutées",
                description: `${newImages.length} image(s) ajoutée(s) à la galerie avec succès.`,
              })
            }
          }
        }
        reader.onerror = () => {
          toast({
            title: "❌ Erreur",
            description: `Impossible de lire le fichier "${file.name}".`,
            variant: "destructive",
          })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove)
      localStorage.setItem("apartment-images", JSON.stringify(newImages))
      return newImages
    })
    toast({
      title: "🗑️ Image supprimée",
      description: "L'image a été supprimée de la galerie.",
    })
  }

  const handleSubmitIssue = () => {
    if (!newIssue.trim() || !issueType || !issuePriority) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    // Simuler l'envoi du signalement
    const newIssueData = {
      id: issues.length + 1,
      type: issueType,
      title: newIssue.split(".")[0] || newIssue.substring(0, 30),
      description: newIssue,
      priority: issuePriority,
      status: "En attente",
      date: new Date().toLocaleDateString("fr-FR"),
      agent: "En cours d'attribution"
    };
    
    // Mettre à jour l'état des issues
    setIssues(prev => [...prev, newIssueData]);

    toast({
      title: "✅ Signalement envoyé",
      description: "Votre signalement a été transmis à l'agence.",
    })

    setNewIssue("")
    setIssueType("")
    setIssuePriority("")
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      sender: "Vous",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isFromTenant: true,
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")

    toast({
      title: "📨 Message envoyé",
      description: "Votre message a été envoyé à l'agence.",
    })

    // Simuler une réponse automatique après 2 secondes
    setTimeout(() => {
      const autoReply = {
        id: messages.length + 2,
        sender: "Agent Immobilier",
        content: "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isFromTenant: false,
      }
      setMessages((prev) => [...prev, autoReply])
    }, 2000)
  }

  const handleDownloadDocument = (doc: any) => {
    // Afficher un toast de démarrage avec une animation
    toast({
      title: "⏳ Téléchargement démarré",
      description: `Le document "${doc.name}" est en cours de téléchargement...`,
    })

    // Simuler un téléchargement avec délai pour montrer l'activité
    setTimeout(() => {
      try {
        // Créer un élément blob pour simuler un vrai fichier PDF
        const blob = new Blob(["Document simulé pour " + doc.name], { type: "application/pdf" })
        const url = window.URL.createObjectURL(blob)

        // Créer un lien de téléchargement visible
        const link = document.createElement("a")
        link.href = url
        link.download = doc.name.replace(/\s+/g, "-").toLowerCase() + ".pdf"

        // Ajouter le lien au DOM, cliquer dessus, puis le supprimer
        document.body.appendChild(link)
        link.click()

        // Nettoyer
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
          document.body.removeChild(link)

          // Afficher un toast de confirmation avec une icône de succès
          toast({
            title: "✅ Téléchargement terminé",
            description: `Le document "${doc.name}" a été téléchargé avec succès.`,
          })

          // Simuler l'ouverture du document dans un nouvel onglet
          const newTab = window.open()
          if (newTab) {
            newTab.document.title = doc.name
            newTab.document.write(`
              <html>
                <head>
                  <title>${doc.name}</title>
                  <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f9f9f9; }
                    .document { max-width: 800px; margin: 0 auto; background: white; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .header { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: bold; color: #0ea5e9; }
                    .title { font-size: 20px; margin: 20px 0; }
                    .content { min-height: 400px; }
                    .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
                  </style>
                </head>
                <body>
                  <div class="document">
                    <div class="header">
                      <div class="logo">KEURGUI IMMO</div>
                      <div>${doc.type} - ${doc.date}</div>
                    </div>
                    <h1 class="title">${doc.name}</h1>
                    <div class="content">
                      <p>Ce document est une simulation pour démonstration.</p>
                      <p>Dans une version réelle, le contenu complet du document ${doc.name} serait affiché ici.</p>
                      <p>Taille du document: ${doc.size}</p>
                    </div>
                    <div class="footer">
                      KEURGUI IMMO - Tous droits réservés © ${new Date().getFullYear()}
                    </div>
                  </div>
                </body>
              </html>
            `)
          }
        }, 100)
      } catch (error) {
        // Gérer les erreurs
        toast({
          title: "❌ Erreur de téléchargement",
          description: `Impossible de télécharger "${doc.name}". Veuillez réessayer.`,
          variant: "destructive",
        })
      }
    }, 1500) // Délai pour simuler le téléchargement
  }

  const handleCallSupport = () => {
    const phoneNumber = "+221331234567"
    window.open(`tel:${phoneNumber}`, "_self")
    toast({
      title: "📞 Appel en cours",
      description: "Ouverture de l'application téléphone...",
    })
  }

  const handleEmailSupport = () => {
    const email = "contact@keurgui-immo.sn"
    const subject = "Demande d'assistance - Appartement APT-203"
    const body = "Bonjour,\n\nJe souhaiterais obtenir de l'aide concernant mon logement.\n\nCordialement"

    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_self")
    toast({
      title: "📧 Email en cours",
      description: "Ouverture du client email...",
    })
  }

  const handleShowQRCode = () => {
    setShowQRCode(true)
    toast({
      title: "📱 QR Code généré",
      description: "QR Code affiché avec les informations de l'appartement.",
    })
  }

  const handleShowLocation = () => {
    const { lat, lng } = apartmentData.coordinates
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
    window.open(mapsUrl, "_blank")
    toast({
      title: "🗺️ Localisation",
      description: "Ouverture de Google Maps...",
    })
  }

  const handleVirtualTour = () => {
    setShowVirtualTour(true)
    toast({
      title: "🏠 Visite virtuelle",
      description: "Chargement de la visite virtuelle...",
    })
  }

  const handleRateAgent = () => {
    if (agentRating === 0) {
      toast({
        title: "⭐ Évaluation requise",
        description: "Veuillez sélectionner une note avant de soumettre.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "⭐ Évaluation envoyée",
      description: `Merci pour votre évaluation de ${agentRating} étoile(s) !`,
    })

    // Réinitialiser le formulaire
    setAgentRating(0)
    setAgentComment("")
  }

  // Générer le QR Code avec les données de l'appartement
  const generateQRCodeData = () => {
    const qrData = {
      id: apartmentData.id,
      name: apartmentData.name,
      address: apartmentData.address,
      city: apartmentData.city,
      surface: apartmentData.surface,
      rent: apartmentData.rent,
      type: apartmentData.type,
      contact: "contact@keurgui-immo.sn",
      phone: "+221331234567"
    };
    return JSON.stringify(qrData);
  };

  // Rendu du composant
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Contenu principal */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Mon logement
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Gérez votre appartement et communiquez avec votre agence
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                <CheckCircle className="h-3 w-3" />
                {apartmentData.status}
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(apartmentRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{apartmentRating}/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte principale de l'appartement */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70 overflow-hidden">
              <div className="aspect-video w-full overflow-hidden relative group">
                <img
                  src={selectedImages[0] || "/placeholder.svg?height=400&width=800"}
                  alt="Appartement"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                    Ajouter des photos
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleVirtualTour}
                    className="gap-2 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                  >
                    <Video className="h-4 w-4" />
                    Visite virtuelle
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl dark:text-white">{apartmentData.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShowQRCode}>
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShowLocation}>
                      <Map className="h-4 w-4 mr-2" />
                      Localisation
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Adresse</div>
                        <div className="font-medium dark:text-white">{apartmentData.address}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{apartmentData.city}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                        <Ruler className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Surface</div>
                        <div className="font-medium dark:text-white">{apartmentData.surface}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30">
                        <Euro className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Loyer mensuel</div>
                        <div className="font-medium dark:text-white">{apartmentData.rent}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Date d'entrée</div>
                        <div className="font-medium dark:text-white">{apartmentData.entryDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30">
                        <Home className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Type</div>
                        <div className="font-medium dark:text-white">{apartmentData.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Étage</div>
                        <div className="font-medium dark:text-white">{apartmentData.floor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Onglets */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="gallery">Galerie</TabsTrigger>
                <TabsTrigger value="inventory">Inventaire</TabsTrigger>
                <TabsTrigger value="issues">Signalements</TabsTrigger>
                <TabsTrigger value="energy">Énergie</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Activity className="h-5 w-5 text-cyan-600" />
                        Historique de maintenance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {maintenanceHistory.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium dark:text-white">{item.type}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.date} - {item.technician}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <BarChart3 className="h-5 w-5 text-cyan-600" />
                        Statistiques du logement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm dark:text-gray-300">Satisfaction globale</span>
                          <div className="flex items-center gap-2">
                            <Progress value={90} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">90%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm dark:text-gray-300">Confort thermique</span>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm dark:text-gray-300">Isolation phonique</span>
                          <div className="flex items-center gap-2">
                            <Progress value={78} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">78%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm dark:text-gray-300">Luminosité</span>
                          <div className="flex items-center gap-2">
                            <Progress value={92} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">92%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Camera className="h-5 w-5 text-cyan-600" />
                        Galerie photos ({selectedImages.length})
                      </CardTitle>
                      <Button onClick={() => fileInputRef.current?.click()} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter des photos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedImages.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-lg group relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Photo ${index + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                  // Ouvrir l'image en plein écran
                                  const newWindow = window.open()
                                  if (newWindow) {
                                    newWindow.document.write(
                                      `<img src="${image}" style="width:100%;height:100%;object-fit:contain;background:#000;" />`,
                                    )
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleRemoveImage(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Aucune photo ajoutée</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          Cliquez sur "Ajouter des photos" pour commencer
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {inventory.map((category, index) => (
                    <Card
                      key={index}
                      className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70"
                    >
                      <CardHeader>
                        <CardTitle className="dark:text-white">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="dark:text-white">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="issues" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Plus className="h-5 w-5 text-cyan-600" />
                        Nouveau signalement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="issue-type" className="dark:text-white">
                          Type de problème
                        </Label>
                        <Select value={issueType} onValueChange={setIssueType}>
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="plomberie">Plomberie</SelectItem>
                            <SelectItem value="electricite">Électricité</SelectItem>
                            <SelectItem value="chauffage">Chauffage</SelectItem>
                            <SelectItem value="serrurerie">Serrurerie</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="issue-priority" className="dark:text-white">
                          Priorité
                        </Label>
                        <Select value={issuePriority} onValueChange={setIssuePriority}>
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue placeholder="Sélectionnez une priorité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basse">Basse</SelectItem>
                            <SelectItem value="moyenne">Moyenne</SelectItem>
                            <SelectItem value="haute">Haute</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="issue-description" className="dark:text-white">
                          Description
                        </Label>
                        <Textarea
                          id="issue-description"
                          placeholder="Décrivez le problème en détail..."
                          value={newIssue}
                          onChange={(e) => setNewIssue(e.target.value)}
                          className="dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <Button onClick={handleSubmitIssue} className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le signalement
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <AlertTriangle className="h-5 w-5 text-cyan-600" />
                        Signalements en cours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {issues.map((issue) => (
                          <div
                            key={issue.id}
                            className="p-4 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium dark:text-white">{issue.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{issue.description}</p>
                              </div>
                              <Badge
                                variant={issue.status === "Résolu" ? "default" : "secondary"}
                                className={
                                  issue.status === "Résolu"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                                }
                              >
                                {issue.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <span>
                                {issue.type} - {issue.priority}
                              </span>
                              <span>{issue.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="energy" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Zap className="h-5 w-5 text-cyan-600" />
                        Consommation énergétique
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm dark:text-gray-300">Électricité</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={energyData.electricity} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">{energyData.electricity}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm dark:text-gray-300">Eau</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={energyData.water} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">{energyData.water}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm dark:text-gray-300">Gaz</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={energyData.gas} className="w-20" />
                            <span className="text-sm font-medium dark:text-white">{energyData.gas}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Leaf className="h-5 w-5 text-cyan-600" />
                        Efficacité énergétique
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                              <span className="text-2xl font-bold text-green-600">{energyData.efficiency}%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Score d'efficacité énergétique</p>
                        <Badge
                          variant="secondary"
                          className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Classe B
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar droite */}
          <div className="space-y-6">
            {/* Contact agence */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Building2 className="h-5 w-5 text-cyan-600" />
                  Contact agence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Agence</div>
                      <div className="font-medium dark:text-white">KEURGUI IMMO</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Agent responsable</div>
                      <div className="font-medium dark:text-white">M. Dupont</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Téléphone</div>
                      <div className="font-medium dark:text-white">+221 33 123 45 67</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium dark:text-white">contact@keurgui-immo.sn</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat en direct
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Chat avec l'agence</DialogTitle>
                        <DialogDescription>Discutez en temps réel avec votre agent</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <ScrollArea className="h-64 border rounded-lg p-4">
                          <div className="space-y-3">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={`p-3 rounded-lg ${
                                  message.isFromTenant
                                    ? "bg-cyan-100 dark:bg-cyan-900/20 ml-4"
                                    : "bg-gray-100 dark:bg-gray-700 mr-4"
                                }`}
                              >
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  {message.sender} - {message.timestamp}
                                </div>
                                <div className="text-sm dark:text-white">{message.content}</div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Tapez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          />
                          <Button onClick={handleSendMessage} size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full" onClick={handleCallSupport}>
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleEmailSupport}>
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Évaluation de l'agent */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <StarIcon className="h-5 w-5 text-cyan-600" />
                  Évaluer votre agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="dark:text-white">Note sur 5 étoiles</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setAgentRating(star)} className="transition-colors">
                        <Star
                          className={`h-6 w-6 ${
                            star <= agentRating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="agent-comment" className="dark:text-white">
                    Commentaire (optionnel)
                  </Label>
                  <Textarea
                    id="agent-comment"
                    placeholder="Partagez votre expérience avec votre agent..."
                    value={agentComment}
                    onChange={(e) => setAgentComment(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <Button onClick={handleRateAgent} className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Envoyer l'évaluation
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <FileText className="h-5 w-5 text-cyan-600" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="rounded-lg border p-3 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-sm dark:text-white">{doc.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {doc.type} - {doc.size} - {doc.date}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                          className="gap-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        >
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Télécharger</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Tous les documents
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Bell className="h-5 w-5 text-cyan-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium dark:text-white">Maintenance programmée</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Révision annuelle du chauffage le 25/01
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium dark:text-white">Réparation terminée</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Le robinet de la cuisine a été réparé
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog pour la visite virtuelle */}
        <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Visite virtuelle 360°</DialogTitle>
              <DialogDescription>Explorez votre appartement en réalité virtuelle</DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={appartVideo}
                controls
                autoPlay
                className="w-full h-full object-cover"
                onError={() => {
                  toast({
                    title: "❌ Erreur de chargement",
                    description: "Impossible de charger la vidéo de visite virtuelle.",
                    variant: "destructive",
                  })
                }}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Utilisez les contrôles pour naviguer dans la visite</p>
              <Button
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.requestFullscreen) {
                      videoRef.current.requestFullscreen()
                    }
                  }
                }}
                variant="outline"
              >
                Plein écran
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog pour le QR Code */}
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-gray-800">QR Code de l'appartement</DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Scannez ce code pour accéder aux informations du logement
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center space-y-6 p-4">
              {/* QR Code */}
              <div className="p-4 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                <QRCodeSVG
                  value={generateQRCodeData()}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-lg"
                />
              </div>
              
              {/* Détails de l'appartement */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Appartement {apartmentData.id}</h3>
                <p className="text-sm text-gray-500">{apartmentData.address}</p>
                <div className="mt-2 flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {apartmentData.surface} m²
                  </span>
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                    {apartmentData.type} pièces
                  </span>
                </div>
              </div>
              
              {/* Boutons d'actions */}
              <div className="w-full flex flex-col space-y-2">
                <Button
                  onClick={() => {
                    navigator.clipboard?.writeText(generateQRCodeData());
                    toast({
                      title: "📋 Données copiées",
                      description: "Les données du QR Code ont été copiées dans le presse-papiers.",
                    });
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Copier les données
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}

export { TenantApartmentPage as default };

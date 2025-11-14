"use client"

import type React from "react"
import {
  useEffect,
  useState,
  useContext,
  type ChangeEvent,
  useRef,
  useMemo,
  type KeyboardEvent,
  type FormEvent,
} from "react"
import { ThemeContext } from "./TableauDeBord"
import {
  Search,
  Send,
  PaperclipIcon,
  Smile,
  MoreVertical,
  Phone,
  Video,
  User,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react"
import { Button } from "../../components/SousPageDocteur/ui/button"
import Input from "../../components/SousPageDocteur/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Interfaces TypeScript pour un typage fort
interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  attachments?: {
    type: "image" | "document" | "audio"
    url: string
    name: string
    size?: string
  }[]
}

interface UserType {
  id: number
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
  lastSeen?: string
  unreadCount?: number
  role?: string
  department?: string
}

// Composant Messages avec typage React.FC
const Messages: React.FC = () => {
  // Vérification du contexte avec fallback UI
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Erreur : Le thème n'est pas disponible.
      </div>
    )
  }
  const { isDarkMode } = themeContext

  // États avec typage explicite
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [userSearchQuery, setUserSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("tous")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Utilisateur connecté (exemple statique)
  const currentUser: UserType = {
    id: 1,
    name: "Dr. Aissatou Diallo",
    status: "online",
    role: "Cardiologue",
    department: "Cardiologie",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Liste statique des utilisateurs avec données enrichies
  const users: UserType[] = [
    {
      id: 5,
      name: "Ndeye Sall",
      status: "online",
      unreadCount: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Patient",
    },
    {
      id: 6,
      name: "Dr. Aliou Diop",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Neurologue",
    },
    {
      id: 8,
      name: "Dr. Mamadou Sy",
      status: "away",
      lastSeen: "Il y a 30 min",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Pédiatre",
    },
    {
      id: 9,
      name: "Awa Fall",
      status: "offline",
      lastSeen: "Il y a 2h",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Patient",
    },
    {
      id: 10,
      name: "Dr. Cheikh Gaye",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Chirurgien",
    },
    {
      id: 11,
      name: "Fatou Ndour",
      status: "offline",
      lastSeen: "Hier",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Infirmière",
    },
    {
      id: 12,
      name: "Dr. Ibrahima Mbaye",
      status: "online",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Dermatologue",
    },
    {
      id: 13,
      name: "Moussa Sene",
      status: "online",
      unreadCount: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Patient",
    },
  ]

  // Chargement initial des messages avec simulation de délai et persistance
  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true)
      const storedMessages = localStorage.getItem(`messages_${selectedUser.id}`)

      // Génération de messages plus riches pour la démo
      const generateInitialMessages = (): Message[] => {
        const baseMessages: Message[] = [
          {
            id: "msg1",
            content: "Bonjour Dr. Diallo ! Comment allez-vous aujourd'hui ?",
            sender: selectedUser.name,
            timestamp: "10:12 AM, Aujourd'hui",
            status: "read",
          },
          {
            id: "msg2",
            content: "Bonjour ! Je vais bien, merci. Comment puis-je vous aider ?",
            sender: currentUser.name,
            timestamp: "10:14 AM, Aujourd'hui",
            status: "read",
          },
          {
            id: "msg3",
            content: "J'ai quelques questions concernant mon traitement actuel.",
            sender: selectedUser.name,
            timestamp: "10:15 AM, Aujourd'hui",
            status: "read",
          },
          {
            id: "msg4",
            content: "Bien sûr, je suis là pour ça. Quelles sont vos questions ?",
            sender: currentUser.name,
            timestamp: "10:16 AM, Aujourd'hui",
            status: "read",
          },
        ]

        // Ajout d'un message avec pièce jointe pour certains utilisateurs
        if (selectedUser.id === 5) {
          baseMessages.push({
            id: "msg5",
            content: "Voici les résultats de mes dernières analyses comme demandé.",
            sender: selectedUser.name,
            timestamp: "10:18 AM, Aujourd'hui",
            status: "read",
            attachments: [
              {
                type: "document",
                url: "#",
                name: "resultats_analyses.pdf",
                size: "2.4 MB",
              },
            ],
          })
        }

        return baseMessages
      }

      const initialMessages: Message[] = storedMessages ? JSON.parse(storedMessages) : generateInitialMessages()

      setTimeout(() => {
        setMessages(initialMessages)
        setIsLoading(false)

        // Simulation de l'utilisateur qui tape
        if (selectedUser.status === "online") {
          setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
              setIsTyping(false)
            }, 3000)
          }, 2000)
        }
      }, 800) // Simulation de chargement
    }
  }, [selectedUser])

  // Persistance des messages dans localStorage
  useEffect(() => {
    if (selectedUser && messages.length > 0) {
      localStorage.setItem(`messages_${selectedUser.id}`, JSON.stringify(messages))
    }
  }, [messages, selectedUser])

  // Scroll automatique vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus sur l'input quand on change d'utilisateur
  useEffect(() => {
    if (selectedUser && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedUser])

  // Gestion de l'envoi de message avec validation
  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!newMessage.trim() || !selectedUser) return

    const messageData: Message = {
      id: `msg_${Date.now()}`,
      content: newMessage,
      sender: currentUser.name,
      timestamp:
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) + ", Aujourd'hui",
      status: "sent",
    }

    setMessages((prev) => [...prev, messageData])
    setNewMessage("")

    // Simulation de la réception du message
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === messageData.id ? { ...msg, status: "delivered" } : msg)))

      // Simulation de la lecture du message
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === messageData.id ? { ...msg, status: "read" } : msg)))

        // Simulation de réponse pour certains utilisateurs
        if (selectedUser.status === "online" && Math.random() > 0.5) {
          setIsTyping(true)

          setTimeout(() => {
            setIsTyping(false)

            const responses = [
              "D'accord, merci pour l'information.",
              "Je comprends, pouvez-vous m'en dire plus ?",
              "Parfait, je vais prendre cela en compte.",
              "Merci Dr. Diallo, c'est très clair.",
            ]

            const responseMsg: Message = {
              id: `msg_${Date.now()}`,
              content: responses[Math.floor(Math.random() * responses.length)],
              sender: selectedUser.name,
              timestamp:
                new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) + ", Aujourd'hui",
              status: "read",
            }

            setMessages((prev) => [...prev, responseMsg])
          }, 2000)
        }
      }, 1000)
    }, 500)
  }

  // Filtrage optimisé des messages avec useMemo
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [messages, searchQuery])

  // Filtrage des utilisateurs avec useMemo
  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => user.name.toLowerCase().includes(userSearchQuery.toLowerCase()))

    // Filtrage par onglet
    if (activeTab === "medecins") {
      filtered = filtered.filter((user) => user.role && user.role !== "Patient")
    } else if (activeTab === "patients") {
      filtered = filtered.filter((user) => user.role === "Patient")
    }

    // Tri: d'abord les utilisateurs avec des messages non lus, puis par statut (online, away, offline)
    return filtered.sort((a, b) => {
      // D'abord par messages non lus
      if ((a.unreadCount || 0) > 0 && !(b.unreadCount || 0)) return -1
      if (!(a.unreadCount || 0) && (b.unreadCount || 0) > 0) return 1

      // Ensuite par statut
      const statusOrder = { online: 0, away: 1, offline: 2 }
      return statusOrder[a.status] - statusOrder[b.status]
    })
  }, [userSearchQuery, activeTab, users])

  // Rendu du statut de message
  const renderMessageStatus = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-3.5 w-3.5 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3.5 w-3.5 text-green-500" />
      default:
        return null
    }
  }

  // Rendu du statut utilisateur
  const renderUserStatus = (status: UserType["status"]) => {
    switch (status) {
      case "online":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        )
      case "away":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 border-2 border-white dark:border-gray-800"></span>
        )
      case "offline":
        return (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 border-2 border-white dark:border-gray-800"></span>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("flex h-screen", isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900")}>
      {/* Sidebar des contacts avec design amélioré */}
      <aside
        className={cn(
          "w-80 border-r flex flex-col",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        )}
      >
        {/* En-tête du sidebar */}
        <div
          className={cn(
            "p-4 border-b flex items-center justify-between",
            isDarkMode ? "border-gray-700" : "border-gray-200",
          )}
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 relative">
              <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} className="rounded-full" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentUser.name}</h2>
              <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>{currentUser.role}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Barre de recherche */}
        <div className="p-4">
          <div className={cn("relative", isDarkMode ? "text-gray-300" : "text-gray-700")}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un contact..."
              value={userSearchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 w-full rounded-full",
                isDarkMode
                  ? "bg-gray-700 border-gray-600 placeholder:text-gray-400 focus:border-green-500"
                  : "bg-gray-100 border-gray-200 placeholder:text-gray-500 focus:border-green-500",
              )}
            />
          </div>
        </div>

        {/* Onglets de filtrage simplifiés */}
        <div className="px-4 mb-2">
          <div className="flex w-full rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("tous")}
              className={cn(
                "flex-1 py-2 text-center text-sm font-medium transition-colors",
                activeTab === "tous"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                  : isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:text-gray-300"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900",
              )}
            >
              Tous
            </button>
            <button
              onClick={() => setActiveTab("medecins")}
              className={cn(
                "flex-1 py-2 text-center text-sm font-medium transition-colors",
                activeTab === "medecins"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                  : isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:text-gray-300"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900",
              )}
            >
              Médecins
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={cn(
                "flex-1 py-2 text-center text-sm font-medium transition-colors",
                activeTab === "patients"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                  : isDarkMode
                    ? "bg-gray-800 text-gray-400 hover:text-gray-300"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900",
              )}
            >
              Patients
            </button>
          </div>
        </div>

        {/* Liste des contacts */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                  selectedUser?.id === user.id
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                    : isDarkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100",
                )}
                onClick={() => setSelectedUser(user)}
                role="button"
                aria-label={`Sélectionner ${user.name}`}
              >
                <div className="relative mr-3">
                  <Avatar className="h-10 w-10">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="rounded-full" />
                  </Avatar>
                  {renderUserStatus(user.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{user.name}</h3>
                    <span className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                      {user.lastSeen || "Maintenant"}
                    </span>
                  </div>
                  <p className={cn("text-sm truncate", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {user.role || "Utilisateur"}
                  </p>
                </div>
                {user.unreadCount && user.unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 rounded-full">
                    {user.unreadCount}
                  </Badge>
                )}
              </div>
            ))
          ) : (
            <p className={cn("text-center p-4", isDarkMode ? "text-gray-400" : "text-gray-500")}>
              Aucun contact trouvé.
            </p>
          )}
        </div>
      </aside>

      {/* Section principale de la messagerie */}
      <main className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header du chat */}
            <header
              className={cn(
                "px-6 py-4 border-b flex items-center justify-between",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
              )}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 relative">
                  <img
                    src={selectedUser.avatar || "/placeholder.svg"}
                    alt={selectedUser.name}
                    className="rounded-full"
                  />
                  {renderUserStatus(selectedUser.status)}
                </Avatar>
                <div>
                  <h2 className="font-semibold flex items-center">
                    {selectedUser.name}
                    {selectedUser.status === "online" && (
                      <span
                        className={cn(
                          "text-xs ml-2 px-2 py-0.5 rounded",
                          isDarkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800",
                        )}
                      >
                        En ligne
                      </span>
                    )}
                  </h2>
                  <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {selectedUser.role || "Utilisateur"} •{" "}
                    {selectedUser.status === "online" ? "Disponible" : selectedUser.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Appel audio</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Video className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Appel vidéo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voir le profil</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Plus d'options</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </header>

            {/* Barre de recherche des messages */}
            <div
              className={cn(
                "px-6 py-3 border-b",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
              )}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher dans la conversation..."
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className={cn(
                    "pl-10 pr-4 py-2 w-full",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 placeholder:text-gray-400 focus:border-green-500"
                      : "bg-gray-100 border-gray-200 placeholder:text-gray-500 focus:border-green-500",
                  )}
                />
              </div>
            </div>

            {/* Liste des messages avec scroll */}
            <div className={cn("flex-1 overflow-y-auto p-6 space-y-4", isDarkMode ? "bg-gray-900" : "bg-gray-50")}>
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div
                    className={cn(
                      "animate-spin rounded-full h-8 w-8 border-b-2",
                      isDarkMode ? "border-green-500" : "border-green-600",
                    )}
                  ></div>
                </div>
              ) : filteredMessages.length > 0 ? (
                <>
                  {/* Date séparateur */}
                  <div className="flex justify-center">
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs",
                        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700",
                      )}
                    >
                      Aujourd'hui
                    </div>
                  </div>

                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn("flex", msg.sender === currentUser.name ? "justify-end" : "justify-start")}
                    >
                      {/* Avatar pour les messages reçus */}
                      {msg.sender !== currentUser.name && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <img
                            src={selectedUser.avatar || "/placeholder.svg"}
                            alt={selectedUser.name}
                            className="rounded-full"
                          />
                        </Avatar>
                      )}

                      <div className={cn("max-w-md", msg.sender === currentUser.name ? "items-end" : "items-start")}>
                        <div
                          className={cn(
                            "px-4 py-3 rounded-2xl",
                            msg.sender === currentUser.name
                              ? isDarkMode
                                ? "bg-green-600 text-white rounded-tr-none"
                                : "bg-green-500 text-white rounded-tr-none"
                              : isDarkMode
                                ? "bg-gray-800 text-gray-100 rounded-tl-none"
                                : "bg-white text-gray-800 rounded-tl-none shadow-sm",
                          )}
                        >
                          <p className="whitespace-pre-wrap break-words">{msg.content}</p>

                          {/* Affichage des pièces jointes */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {msg.attachments.map((attachment, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "flex items-center p-2 rounded",
                                    isDarkMode
                                      ? "bg-gray-700"
                                      : msg.sender === currentUser.name
                                        ? "bg-green-400"
                                        : "bg-gray-100",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "p-2 rounded mr-2",
                                      isDarkMode
                                        ? "bg-gray-600"
                                        : msg.sender === currentUser.name
                                          ? "bg-green-300"
                                          : "bg-gray-200",
                                    )}
                                  >
                                    {attachment.type === "document" && (
                                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                    )}
                                    {attachment.type === "image" && (
                                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={cn(
                                        "text-sm font-medium truncate",
                                        isDarkMode
                                          ? "text-gray-200"
                                          : msg.sender === currentUser.name
                                            ? "text-white"
                                            : "text-gray-800",
                                      )}
                                    >
                                      {attachment.name}
                                    </p>
                                    {attachment.size && (
                                      <p
                                        className={cn(
                                          "text-xs",
                                          isDarkMode
                                            ? "text-gray-400"
                                            : msg.sender === currentUser.name
                                              ? "text-green-100"
                                              : "text-gray-500",
                                        )}
                                      >
                                        {attachment.size}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                      "ml-2 rounded-full",
                                      isDarkMode
                                        ? "hover:bg-gray-600 text-gray-300"
                                        : msg.sender === currentUser.name
                                          ? "hover:bg-green-400 text-white"
                                          : "hover:bg-gray-200 text-gray-700",
                                    )}
                                  >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div
                          className={cn(
                            "flex items-center mt-1 text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                            msg.sender === currentUser.name ? "justify-end" : "justify-start",
                          )}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{msg.timestamp}</span>
                          {msg.sender === currentUser.name && (
                            <span className="ml-1">{renderMessageStatus(msg.status)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Indicateur de frappe */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <img
                          src={selectedUser.avatar || "/placeholder.svg"}
                          alt={selectedUser.name}
                          className="rounded-full"
                        />
                      </Avatar>
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl rounded-tl-none",
                          isDarkMode ? "bg-gray-800" : "bg-white shadow-sm",
                        )}
                      >
                        <div className="flex space-x-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full animate-bounce",
                              isDarkMode ? "bg-gray-400" : "bg-gray-500",
                            )}
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full animate-bounce",
                              isDarkMode ? "bg-gray-400" : "bg-gray-500",
                            )}
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full animate-bounce",
                              isDarkMode ? "bg-gray-400" : "bg-gray-500",
                            )}
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={cn("p-6 rounded-full mb-4", isDarkMode ? "bg-gray-800" : "bg-gray-200")}>
                    <Search className={cn("h-12 w-12", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                  </div>
                  <p className="text-lg font-medium mb-1">Aucun message trouvé</p>
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    Essayez avec d'autres termes de recherche
                  </p>
                </div>
              )}
            </div>

            {/* Formulaire d'envoi */}
            <form
              onSubmit={handleSendMessage}
              className={cn(
                "p-4 border-t flex items-end gap-2",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
              )}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full",
                        isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      <PaperclipIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Joindre un fichier</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex-1 relative">
                <Input
                  id="message-input"
                  type="text"
                  value={newMessage}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                  onKeyPress={(e: KeyboardEvent<HTMLInputElement>) =>
                    e.key === "Enter" && !e.shiftKey && handleSendMessage()
                  }
                  placeholder="Tapez votre message..."
                  className={cn(
                    "pr-10 py-3 rounded-full",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 placeholder:text-gray-400 focus:border-green-500"
                      : "bg-gray-100 border-gray-200 placeholder:text-gray-500 focus:border-green-500",
                  )}
                  disabled={!selectedUser}
                  aria-label="Tapez votre message"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                >
                  <Smile className="h-5 w-5 text-gray-400" />
                </Button>
              </div>

              <Button
                type="submit"
                disabled={!newMessage.trim() || !selectedUser}
                className={cn(
                  "rounded-full",
                  !newMessage.trim() || !selectedUser ? "opacity-50 cursor-not-allowed" : "",
                )}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className={cn("p-6 rounded-full mb-6", isDarkMode ? "bg-gray-800" : "bg-gray-200")}>
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke={isDarkMode ? "#9ca3af" : "#6b7280"}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Vos messages</h2>
            <p className={cn("text-center max-w-md mb-6", isDarkMode ? "text-gray-400" : "text-gray-500")}>
              Sélectionnez un contact dans la liste pour commencer une conversation ou reprendre une discussion
              existante.
            </p>
            <Button onClick={() => setSelectedUser(users[0])} className="rounded-full">
              Démarrer une conversation
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Messages


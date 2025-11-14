"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface Email {
  id: number
  folder: "inbox" | "sent" | "drafts" | "trash"
  sender: string
  senderType: "doctor" | "patient" | "system" | "admin"
  recipient?: string
  subject: string
  preview: string
  timestamp: string
  read: boolean
  content: string
  attachments?: Array<{ name: string; size: string; type?: string }>
}

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  role: "medecin" | "patient" | "admin"
}

interface Attachment {
  name: string
  size: string
  type: string
}

const LireMail: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<"inbox" | "sent" | "drafts" | "trash">("inbox")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showNewMessageForm, setShowNewMessageForm] = useState(false)
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    content: "",
  })
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showContacts, setShowContacts] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Palette de couleurs plus discrète
  const colors = {
    primary: "bg-[#6B8DB2]",
    secondary: "bg-[#8EAAC7]",
    accent: "bg-[#A0BEDA]",
    dark: "bg-[#4A6FA5]",
    light: "bg-[#F8F9FA]",
    doctorBadge: "bg-[#6B8DB2] text-white",
    patientBadge: "bg-[#8EAAC7] text-white",
    adminBadge: "bg-[#A0BEDA] text-white",
    systemBadge: "bg-[#C5D7E8] text-[#4A6FA5]",
    unread: "bg-[#E3EAF3] bg-opacity-80",
    sidebarGradient: "bg-gradient-to-b from-[#8EAAC7] to-[#A0BEDA]",
    attachmentGreen: "bg-[#E3EAF3]",
    attachmentGray: "bg-[#EDF2F7]",
    attachmentLight: "bg-[#F8F9FA]",
    contactsBackground: "bg-[#F0F4F8]",
  }

  // Liste des utilisateurs de la base de données
  const users: User[] = [
    { id: 1, nom: "Badji", prenom: "Fatou", email: "Fatoubadji2@gmail.com", role: "medecin" },
    { id: 2, nom: "Loemba", prenom: "Vitaldine", email: "Vitaldineloemba1@gmail.com", role: "admin" },
    { id: 3, nom: "Basse", prenom: "Françoise", email: "bassefrancoise1@gmail.com", role: "admin" },
    { id: 4, nom: "Ndiaye", prenom: "Ndeye Marie", email: "mamarychic@gmail.com", role: "admin" },
    { id: 5, nom: "Sall", prenom: "Ndeye", email: "Sallndeye1@gmail.com", role: "patient" },
    { id: 6, nom: "Diop", prenom: "Thiané", email: "Thiane2diop@gmail.com", role: "patient" },
    { id: 7, nom: "Ba", prenom: "Aissatou", email: "aissatouBa@gmail.com", role: "patient" },
    { id: 8, nom: "Sy", prenom: "Rokhaya", email: "RokhayaSy3@gmail.com", role: "patient" },
    { id: 9, nom: "Fall", prenom: "Awa", email: "Awafall21@gmail.com", role: "patient" },
    { id: 10, nom: "Gaye", prenom: "Khady", email: "Khady1gaye@gmail.com", role: "patient" },
    { id: 11, nom: "Ndour", prenom: "Fatou", email: "fatouNdour5@gmail.com", role: "patient" },
    { id: 12, nom: "Mbaye", prenom: "Joséphine", email: "Sossombaye1@gmail.com", role: "patient" },
    { id: 13, nom: "Sene", prenom: "Moussa", email: "Moussasene@gmail.com", role: "patient" },
    { id: 14, nom: "Faye", prenom: "Cheickou", email: "astoufaye@gmail.com", role: "patient" },
    { id: 15, nom: "Diallo", prenom: "Khadidiatou", email: "Diallokhadia@gmail.com", role: "medecin" },
    { id: 16, nom: "Kane", prenom: "Mariama", email: "Mariamakane@gmail.com", role: "medecin" },
    { id: 17, nom: "Basséne", prenom: "Linda", email: "Lindabassene@gmail.com", role: "medecin" },
    { id: 18, nom: "Gueye", prenom: "Fatima", email: "Fatimagueye@gmail.com", role: "medecin" },
    { id: 19, nom: "Dieng", prenom: "Ndeye Awa", email: "evadieng75@gmail.com", role: "medecin" },
    { id: 20, nom: "Sall", prenom: "Awa", email: "evasall648@gmail.com", role: "medecin" },
    { id: 21, nom: "Keita", prenom: "Hawa Demba", email: "77249373760aliciakeita@gmail.com", role: "medecin" },
    { id: 22, nom: "Correa", prenom: "Adéline", email: "Adelinecorreae@gmail.com", role: "medecin" },
    { id: 23, nom: "Sarr", prenom: "Mariata", email: "Mariatasarr@gmail.com", role: "medecin" },
    { id: 24, nom: "Barry", prenom: "Khadija", email: "khadijabarry@gmail.com", role: "medecin" },
    { id: 25, nom: "Memiague", prenom: "kris", email: "kris.memeiaghe@gmail.com", role: "medecin" },
    { id: 26, nom: "Bakana", prenom: "Danicha", email: "bakanadanicha@gmail.com", role: "medecin" },
    { id: 27, nom: "Ndiaye", prenom: "Mody Yero", email: "Modyyero@gmail.com", role: "medecin" },
    { id: 28, nom: "Badji", prenom: "Nafi", email: "Badjinafi@gmail.com", role: "medecin" },
    { id: 29, nom: "Coulibaly", prenom: "Khadija", email: "Coulibaly12khadija@gmail.com", role: "medecin" },
    { id: 30, nom: "Smith", prenom: "Petter", email: "petterSmith1@gmail.com", role: "medecin" },
    { id: 31, nom: "Thilbaut", prenom: "Kristine", email: "ThilbautKristine@gmail.com", role: "medecin" },
    { id: 32, nom: "Ndecki", prenom: "Maman", email: "MamanNdecki@gmail.com", role: "medecin" },
    { id: 33, nom: "Welé", prenom: "Sophie", email: "Welesophie2@gmail.com", role: "medecin" },
    { id: 34, nom: "Gaye", prenom: "Moussa", email: "moussa.gaye@gmail.com", role: "medecin" },
    { id: 35, nom: "Samaké", prenom: "Mariama", email: "mariamasamake38@gmail.com", role: "medecin" },
    { id: 36, nom: "Camara", prenom: "Mocktar", email: "Mocktarecamara8@gmail.com", role: "medecin" },
    { id: 37, nom: "Mendy", prenom: "Helene", email: "Mendyhelenita2@gmail.com", role: "medecin" },
    { id: 38, nom: "Diop", prenom: "Ndeye Ami", email: "Ndeyediop2@gmail.com", role: "medecin" },
    { id: 39, nom: "Mané", prenom: "Ndeye Fatou", email: "fatouMane3@gmail.com", role: "medecin" },
    { id: 40, nom: "Bah", prenom: "Binta", email: "BintaBah4@gmail.com", role: "medecin" },
    { id: 41, nom: "Baldé", prenom: "Djeynabou", email: "DjeynabouBalde@gmail.com", role: "medecin" },
    { id: 42, nom: "Cissokho", prenom: "Aminata", email: "Cissokho2@gmail.com", role: "medecin" },
    { id: 43, nom: "Sow", prenom: "Fatoumata", email: "FatoumataSow1@gmail.com", role: "medecin" },
    { id: 44, nom: "Soumare", prenom: "Adama", email: "Adama1soumare@gmail.com", role: "medecin" },
    { id: 45, nom: "Ndoye", prenom: "Astou", email: "AstouNdoye1@gmail.com", role: "medecin" },
    { id: 46, nom: "Sidibe", prenom: "Samba", email: "SidibeSamba0@gmail.com", role: "medecin" },
    { id: 47, nom: "Dioum", prenom: "Mamadou Aliou", email: "MAmadouAliou@gmail.com", role: "medecin" },
    { id: 48, nom: "Diedhiou", prenom: "Maman", email: "MamanDiedhiou3@gmail.com", role: "medecin" },
    { id: 49, nom: "Tall", prenom: "Abibatou", email: "Abytall@gmail.com", role: "medecin" },
    { id: 50, nom: "Kane", prenom: "Mame Siga", email: "Sigakane@gmail.com", role: "medecin" },
    { id: 51, nom: "Ndiang", prenom: "Amadou", email: "amadou.ndiang@gmail.com", role: "medecin" },
    { id: 52, nom: "Seye", prenom: "Rama", email: "Ramaseye@gmail.com", role: "medecin" },
    { id: 53, nom: "Sall", prenom: "Akawa", email: "akawasall@gmail.com", role: "medecin" },
    { id: 54, nom: "Seck", prenom: "Ouleye", email: "Ouleye2@gmail.com.com", role: "medecin" },
    { id: 55, nom: "Diaby", prenom: "Bintou", email: "Bintou@gmail.com", role: "medecin" },
    { id: 56, nom: "Sidibé", prenom: "Samba", email: "SidibeSamba@gmail.com.com", role: "medecin" },
    { id: 57, nom: "Ndione", prenom: "Adji", email: "Adjindione1@gmail.com.com", role: "medecin" },
    { id: 58, nom: "Mendy", prenom: "Marie Claire", email: "MarieClaire@gmail.com", role: "medecin" },
    { id: 59, nom: "Thiam", prenom: "Babacar", email: "Babacarthiam@gmail.com", role: "medecin" },
    { id: 60, nom: "Sakho", prenom: "Mame Astou", email: "Mame123@gmail.com.com", role: "patient" },
    { id: 61, nom: "Sagnane", prenom: "Modou", email: "Modou123@gmail.com", role: "patient" },
    { id: 62, nom: "Sembéne", prenom: "Fatou", email: "Fatousembene@gmail.com", role: "patient" },
    { id: 63, nom: "Senghor", prenom: "Léopold", email: "Leopold@gmail.com", role: "patient" },
    { id: 64, nom: "Faye", prenom: "Malick", email: "Malick2@gmail.com.com", role: "patient" },
    { id: 65, nom: "Makaya", prenom: "Ramatoulaye", email: "Ramamakaya2@gmail.com", role: "patient" },
    { id: 66, nom: "Tall", prenom: "Khalilou", email: "khaliloutall@gmail.com", role: "patient" },
  ]

  // Sélectionner 5 médecins et 5 patients pour la liste de contacts
  const [contacts, setContacts] = useState<User[]>([])

  useEffect(() => {
    const doctors = users.filter((user) => user.role === "medecin").slice(0, 5)
    const patients = users.filter((user) => user.role === "patient").slice(0, 5)
    setContacts([...doctors, ...patients])
  }, [])

  const [emails, setEmails] = useState<Email[]>(generateInitialEmails())
  const messageIdCounter = useRef(100)

  // Fonction pour générer des emails initiaux avec des noms réels de la base de données
  function generateInitialEmails(): Email[] {
    const getRandomUser = (role: "medecin" | "patient" | "admin") => {
      const filteredUsers = users.filter((user) => user.role === role)
      return filteredUsers[Math.floor(Math.random() * filteredUsers.length)]
    }
    const formatUserName = (user: User) => `${user.prenom} ${user.nom}`

    return [
      // Boîte de réception
      {
        id: 1,
        folder: "inbox",
        sender: formatUserName(getRandomUser("medecin")),
        senderType: "doctor",
        subject: "🩺 Résultats d'analyses urgents",
        preview: "Vos résultats nécessitent une attention immédiate...",
        timestamp: "08:45",
        read: false,
        content: "Bonjour Mme. Diallo,\n\nVos résultats montrent des anomalies nécessitant une consultation rapide...",
        attachments: [{ name: "analyses.pdf", size: "1.8 MB", type: "application/pdf" }],
      },
      {
        id: 2,
        folder: "inbox",
        sender: formatUserName(getRandomUser("patient")),
        senderType: "patient",
        subject: "🚑 Douleurs thoraciques",
        preview: "Symptômes persistants depuis 3 jours...",
        timestamp: "14:20",
        read: false,
        content: "Cher docteur,\n\nJe ressens des douleurs aiguës au niveau...",
      },

      // Envoyés
      {
        id: 3,
        folder: "sent",
        sender: formatUserName(getRandomUser("medecin")),
        recipient: formatUserName(getRandomUser("patient")),
        senderType: "doctor",
        subject: "💉 Prescription médicale",
        preview: "Nouvelle ordonnance générée...",
        timestamp: "11:15",
        read: true,
        content: "Madame Ndiaye,\n\nVeuillez trouver ci-joint votre nouvelle ordonnance...",
        attachments: [{ name: "ordonnance.pdf", size: "0.9 MB", type: "application/pdf" }],
      },

      // Brouillons
      {
        id: 4,
        folder: "drafts",
        sender: formatUserName(getRandomUser("medecin")),
        senderType: "doctor",
        subject: "📝 Rapport opératoire",
        preview: "Draft - Compte-rendu chirurgie cardiaque...",
        timestamp: "16:30",
        read: true,
        content: "Patient : Ousmane Diop\n\nIntervention : Pontage aorto-coronarien...",
      },

      // Corbeille
      {
        id: 5,
        folder: "trash",
        sender: "Système",
        senderType: "system",
        subject: "🗑️ Archive automatique",
        preview: "Messages de plus de 2 ans supprimés...",
        timestamp: "08:00",
        read: true,
        content: "Nettoyage automatique effectué le...",
      },
    ]
  }

  const getFolderEmails = () => emails.filter((email) => email.folder === selectedFolder)

  const handleNewMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Créer un nouvel email
    const currentUser = users.find((user) => user.email === "evadieng75@gmail.com")
    const senderName = currentUser ? `${currentUser.prenom} ${currentUser.nom}` : "Dr. Ndeye Awa Dieng"

    const newEmailId = messageIdCounter.current++
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")

    const newEmailObj: Email = {
      id: newEmailId,
      folder: "sent",
      sender: senderName,
      recipient: newMessage.to,
      senderType: "doctor",
      subject: newMessage.subject,
      preview: newMessage.content.substring(0, 50) + (newMessage.content.length > 50 ? "..." : ""),
      timestamp: `${hours}:${minutes}`,
      read: true,
      content: newMessage.content,
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    // Ajouter le nouvel email à la liste
    setEmails([newEmailObj, ...emails])

    // Réinitialiser le formulaire
    setNewMessage({
      to: "",
      subject: "",
      content: "",
    })
    setAttachments([])

    // Fermer le formulaire
    setShowNewMessageForm(false)

    // Afficher le dossier "Envoyés"
    setSelectedFolder("sent")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments: Attachment[] = []

      Array.from(e.target.files).forEach((file) => {
        // Convertir la taille en format lisible
        const size =
          file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`

        newAttachments.push({
          name: file.name,
          size: size,
          type: file.type,
        })
      })

      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  const handleContactClick = (contact: User) => {
    setNewMessage({
      ...newMessage,
      to: `${contact.prenom} ${contact.nom} <${contact.email}>`,
    })
    setShowNewMessageForm(true)
  }

  const renderEmailList = () => (
    <div className="space-y-2">
      {getFolderEmails().map((email) => (
        <div
          key={email.id}
          className={`p-4 rounded-xl cursor-pointer transform transition-all hover:scale-[101%] ${
            !email.read ? `${colors.unread} border-l-4 border-[#4A6FA5] shadow-lg` : "hover:bg-[#F8F9FA]"
          }`}
          onClick={() => setSelectedEmail(email)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${!email.read ? "text-[#2C3E50]" : "text-[#6B7C93]"}`}>
                  {selectedFolder === "sent" && email.recipient ? `À: ${email.recipient}` : email.sender}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    email.senderType === "doctor"
                      ? colors.doctorBadge
                      : email.senderType === "patient"
                        ? colors.patientBadge
                        : email.senderType === "admin"
                          ? colors.adminBadge
                          : colors.systemBadge
                  }`}
                >
                  {email.senderType === "doctor"
                    ? "MÉDECIN"
                    : email.senderType === "patient"
                      ? "PATIENT"
                      : email.senderType === "admin"
                        ? "ADMIN"
                        : "SYSTÈME"}
                </span>
              </div>
              <p className={`${!email.read ? "font-black" : "font-semibold"} text-[#2C3E50]`}>{email.subject}</p>
              <p className="text-sm text-[#6B7C93] truncate">{email.preview}</p>

              {email.attachments && email.attachments.length > 0 && (
                <div className="flex items-center mt-2 text-xs text-[#6B7C93]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  {email.attachments.length} pièce{email.attachments.length > 1 ? "s" : ""} jointe
                  {email.attachments.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
            <span className={`text-sm font-medium ${!email.read ? "text-[#4A6FA5]" : "text-[#6B7C93]"}`}>
              {email.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderFolderHeader = () => {
    const titles = {
      inbox: "📥 Boîte de Réception",
      sent: "📤 Messages Envoyés",
      drafts: "📑 Brouillons",
      trash: "🗑️ Corbeille",
    }

    return (
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#2C3E50]">{titles[selectedFolder]}</h1>
        <p
          className={`text-sm font-semibold mt-1 ${
            {
              inbox: "text-[#4A6FA5]",
              sent: "text-[#6B8DB2]",
              drafts: "text-[#7E9CBF]",
              trash: "text-[#6B7C93]",
            }[selectedFolder]
          }`}
        >
          {getFolderEmails().length} messages
        </p>
      </div>
    )
  }

  const renderEmailContent = (email: Email) => (
    <div>
      <button
        className={`mb-6 ${colors.primary} text-white px-6 py-3 rounded-xl font-bold hover:bg-[#3A5A8C] transition-colors`}
        onClick={() => setSelectedEmail(null)}
      >
        ← Retour à la liste
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-black text-[#2C3E50] mb-6">{email.subject}</h1>

        <div className="flex items-center mb-8 gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              email.senderType === "doctor"
                ? "bg-[#4A6FA5]"
                : email.senderType === "patient"
                  ? "bg-[#6B8DB2]"
                  : email.senderType === "admin"
                    ? "bg-[#7E9CBF]"
                    : "bg-[#B0C4DE]"
            }`}
          >
            <span className="text-2xl">
              {email.senderType === "doctor"
                ? "👨⚕️"
                : email.senderType === "patient"
                  ? "👤"
                  : email.senderType === "admin"
                    ? "👩‍💼"
                    : "🔔"}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-[#2C3E50]">
                {selectedFolder === "sent" && email.recipient ? `À: ${email.recipient}` : email.sender}
              </p>
              <p className="text-sm font-medium text-[#6B7C93]">{email.timestamp}</p>
            </div>
            {email.recipient && selectedFolder !== "sent" && (
              <p className="text-sm text-[#6B7C93]">À: {email.recipient}</p>
            )}
          </div>
        </div>

        <div className="prose max-w-none mb-8 text-[#2C3E50] text-lg">
          {email.content.split("\n").map((line, i) => (
            <p key={i} className="mb-4">
              {line}
            </p>
          ))}
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-[#2C3E50] mb-6">Pièces jointes ({email.attachments.length})</h3>
            <div className="grid gap-4 grid-cols-2">
              {email.attachments.map((file, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl ${
                    [colors.attachmentGreen, colors.attachmentGray, colors.attachmentLight][i % 3]
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-8 h-8 mr-3 text-[#2C3E50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div>
                      <p className="font-bold text-[#2C3E50]">{file.name}</p>
                      <p className="text-sm text-[#6B7C93]">{file.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderNewMessageForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#2C3E50]">Nouveau Message</h2>
          <button onClick={() => setShowNewMessageForm(false)} className="text-[#6B7C93] hover:text-[#2C3E50]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleNewMessageSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-4 flex-1 overflow-y-auto pb-4">
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-[#2C3E50] mb-1">
                Destinataire
              </label>
              <input
                type="text"
                id="to"
                className="w-full p-3 border border-[#E3EAF3] rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                placeholder="Entrez l'adresse email du destinataire"
                value={newMessage.to}
                onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#2C3E50] mb-1">
                Objet
              </label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 border border-[#E3EAF3] rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                placeholder="Objet du message"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[#2C3E50] mb-1">
                Message
              </label>
              <textarea
                id="content"
                rows={6}
                className="w-full p-3 border border-[#E3EAF3] rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent"
                placeholder="Contenu de votre message"
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                required
              />
            </div>

            {/* Section pièces jointes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#2C3E50]">Pièces jointes</label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-[#4A6FA5] hover:text-[#3A5A8C] flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Ajouter un fichier
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
              </div>

              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#F0F4F8] rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-[#4A6FA5]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-[#2C3E50]">{file.name}</p>
                          <p className="text-xs text-[#6B7C93]">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-[#6B7C93] hover:text-[#2C3E50]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t mt-2 sticky bottom-0 bg-white">
            <button
              type="button"
              className="px-6 py-2 mr-3 rounded-xl font-bold text-[#4A6FA5] border border-[#4A6FA5] hover:bg-[#E3EAF3] transition-colors"
              onClick={() => setShowNewMessageForm(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-xl font-bold text-white ${colors.primary} hover:bg-[#3A5A8C] transition-colors`}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderContacts = () => (
    <div className={`w-64 ${colors.contactsBackground} p-4 rounded-xl shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#2C3E50]">Contacts</h2>
        <button onClick={() => setShowContacts(!showContacts)} className="text-[#6B7C93] hover:text-[#2C3E50]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showContacts ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>
      </div>

      {showContacts && (
        <div className="space-y-1">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-[#4A6FA5] mb-1">Médecins</h3>
            {contacts
              .filter((c) => c.role === "medecin")
              .map((contact) => (
                <div
                  key={contact.id}
                  className="p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#4A6FA5] flex items-center justify-center text-white mr-2">
                      <span className="text-xs">
                        {contact.prenom[0]}
                        {contact.nom[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C3E50]">
                        {contact.prenom} {contact.nom}
                      </p>
                      <p className="text-xs text-[#6B7C93] truncate">{contact.email}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#6B8DB2] mb-1">Patients</h3>
            {contacts
              .filter((c) => c.role === "patient")
              .map((contact) => (
                <div
                  key={contact.id}
                  className="p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#6B8DB2] flex items-center justify-center text-white mr-2">
                      <span className="text-xs">
                        {contact.prenom[0]}
                        {contact.nom[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C3E50]">
                        {contact.prenom} {contact.nom}
                      </p>
                      <p className="text-xs text-[#6B7C93] truncate">{contact.email}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Barre latérale */}
      <div className={`w-72 ${colors.sidebarGradient} p-6 min-h-screen shadow-xl`}>
        <button
          className={`w-full ${colors.secondary} text-white px-6 py-4 rounded-xl mb-8 font-bold 
            hover:bg-[#5A7A9A] transition-colors shadow-lg`}
          onClick={() => setShowNewMessageForm(true)}
        >
          ✉️ Nouveau message
        </button>

        <nav className="space-y-2">
          {[
            {
              folder: "inbox",
              label: "Boîte de réception",
              count: emails.filter((e) => e.folder === "inbox" && !e.read).length,
            },
            { folder: "sent", label: "Envoyés", count: emails.filter((e) => e.folder === "sent").length },
            { folder: "drafts", label: "Brouillons", count: emails.filter((e) => e.folder === "drafts").length },
            { folder: "trash", label: "Corbeille", count: emails.filter((e) => e.folder === "trash").length },
          ].map((item) => (
            <button
              key={item.folder}
              onClick={() => {
                setSelectedFolder(item.folder as any)
                setSelectedEmail(null)
              }}
              className={`w-full text-left px-4 py-3 rounded-xl flex justify-between items-center
                transition-all duration-300 ${
                  selectedFolder === item.folder
                    ? "bg-white text-[#4A6FA5] font-bold"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                }`}
            >
              <span>{item.label}</span>
              {item.count > 0 && (
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedFolder === item.folder ? "bg-[#4A6FA5] text-white" : "bg-white bg-opacity-30 text-white"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 p-8 flex">
        <div className="flex-1 max-w-4xl">
          {selectedEmail ? (
            renderEmailContent(selectedEmail)
          ) : (
            <>
              {renderFolderHeader()}
              {renderEmailList()}
            </>
          )}
        </div>

        {/* Section contacts */}
        <div className="ml-6 mt-8">{renderContacts()}</div>
      </main>

      {/* Formulaire de nouveau message */}
      {showNewMessageForm && renderNewMessageForm()}
    </div>
  )
}

export default LireMail;
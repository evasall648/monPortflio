"use client"

import type React from "react"
import { useState, useEffect, useContext } from "react"
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  X,
} from "lucide-react"
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord" // Importer le ThemeContext
import { cn } from "@/lib/utils"

// Types
interface Contact {
  nom: string
  email: string
  dateNaissance: string
  mobile: string
  adresse: string
  imageProfil: string
}

// Données initiales
const initialContacts: Contact[] = [
  {
    nom: "Mamadou Diop",
    email: "mamadou.diop@email.com",
    dateNaissance: "25/02/1990",
    mobile: "77 123 45 67",
    adresse: "Rue 10, Dakar Plateau",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Fatou Ndiaye",
    email: "fatou.ndiaye@email.com",
    dateNaissance: "14/04/1985",
    mobile: "78 234 56 78",
    adresse: "Cité Keur Gorgui, Dakar",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Cheikh Fall",
    email: "cheikh.fall@email.com",
    dateNaissance: "08/11/1983",
    mobile: "76 345 67 89",
    adresse: "Parcelles Assainies, Unité 15",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Aminata Sow",
    email: "aminata.sow@email.com",
    dateNaissance: "20/05/1988",
    mobile: "70 456 78 90",
    adresse: "Grand Yoff, Dakar",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Ousmane Ba",
    email: "ousmane.ba@email.com",
    dateNaissance: "18/04/1987",
    mobile: "77 567 89 01",
    adresse: "Médina, Rue 12",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Mariama Sarr",
    email: "mariama.sarr@email.com",
    dateNaissance: "08/11/1983",
    mobile: "78 678 90 12",
    adresse: "Pikine, Quartier Tally Bou Mak",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Ibrahima Diallo",
    email: "ibrahima.diallo@email.com",
    dateNaissance: "18/04/1987",
    mobile: "76 789 01 23",
    adresse: "Fann Résidence, Dakar",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Aïssatou Faye",
    email: "aissatou.faye@email.com",
    dateNaissance: "20/05/1988",
    mobile: "70 890 12 34",
    adresse: "Rufisque, Quartier Keury Kaw",
    imageProfil: "https://via.placeholder.com/150",
  },
  {
    nom: "Moustapha Thiam",
    email: "moustapha.thiam@email.com",
    dateNaissance: "14/04/1985",
    mobile: "77 901 23 45",
    adresse: "Thiès, Cité Lamy",
    imageProfil: "https://via.placeholder.com/150",
  },
]

// Composant principal
export default function ContactsApp() {
  // Récupérer le contexte du thème
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error("ContactsApp doit être utilisé dans un ThemeContext.Provider")
  }
  const { isDarkMode } = themeContext

  // États
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(initialContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<string | null>(null)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  // Filtrer les contacts en fonction de la recherche
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.mobile.includes(searchQuery) ||
        contact.adresse.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredContacts(filtered)
    setCurrentPage(1)
  }, [searchQuery, contacts])

  // Appliquer le mode sombre via le contexte
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Logique de pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredContacts.length)
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  // Gestion des actions sur les contacts
  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact])
    setIsAddDialogOpen(false)
  }

  const handleEditContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.email === updatedContact.email ? updatedContact : contact)))
    setSelectedContact(null)
    setIsDetailDialogOpen(false)
    setIsEditing(false)
  }

  const handleDeleteContact = (emailToDelete: string) => {
    setContacts(contacts.filter((contact) => contact.email !== emailToDelete))
    setSelectedContact(null)
    setIsDetailDialogOpen(false)
    setIsDeleteDialogOpen(false)
  }

  const handleDeleteSelected = () => {
    setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.email)))
    setSelectedContacts([])
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentEmails = currentContacts.map((contact) => contact.email)
      setSelectedContacts([...selectedContacts, ...currentEmails])
    } else {
      const currentEmails = currentContacts.map((contact) => contact.email)
      setSelectedContacts(selectedContacts.filter((email) => !currentEmails.includes(email)))
    }
  }

  const handleSelectContact = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, email])
    } else {
      setSelectedContacts(selectedContacts.filter((e) => e !== email))
    }
  }

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDetailDialogOpen(true)
    setIsEditing(false)
  }

  // Composant de formulaire de contact
  const ContactForm = ({ contact, onSubmit }: { contact?: Contact; onSubmit: (contact: Contact) => void }) => {
    const [formData, setFormData] = useState<Contact>(
      contact || {
        nom: "",
        email: "",
        dateNaissance: "",
        mobile: "",
        adresse: "",
        imageProfil: "https://via.placeholder.com/150",
      },
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="nom" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
              Nom complet
            </label>
            <input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Prénom Nom"
              required
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              required
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mobile" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
              Téléphone mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="77 123 45 67"
              required
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dateNaissance" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
              Date de naissance
            </label>
            <input
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              placeholder="JJ/MM/AAAA"
              className={cn(
                "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
                isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="adresse" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
            Adresse
          </label>
          <input
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse complète"
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
              isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
            )}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="imageProfil" className={cn("block text-sm font-medium", isDarkMode ? "text-gray-200" : "text-gray-700")}>
            URL de l'image de profil
          </label>
          <input
            id="imageProfil"
            name="imageProfil"
            value={formData.imageProfil}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
              isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
            )}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => (contact ? setIsEditing(false) : setIsAddDialogOpen(false))}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300",
              isDarkMode
                ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600"
                : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
            )}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={cn(
              "px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300",
              isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700",
            )}
          >
            {contact ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </form>
    )
  }

  // Composant de détail de contact
  const ContactDetail = ({ contact }: { contact: Contact }) => {
    if (isEditing) {
      return <ContactForm contact={contact} onSubmit={handleEditContact} />
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className={cn(
            "relative w-24 h-24 rounded-full overflow-hidden transition-colors duration-300",
            isDarkMode ? "bg-gray-700" : "bg-gray-200",
          )}>
            <img
              src={contact.imageProfil || "/placeholder.svg"}
              alt={contact.nom}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/150"
              }}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className={cn("text-2xl font-bold", isDarkMode ? "text-gray-200" : "text-gray-900")}>
              {contact.nom}
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <a
                  href={`mailto:${contact.email}`}
                  className={cn(
                    "hover:underline",
                    isDarkMode ? "text-green-400" : "text-green-600",
                  )}
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <a
                  href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                  className={cn("hover:underline", isDarkMode ? "text-gray-300" : "text-gray-900")}
                >
                  {contact.mobile}
                </a>
              </div>
              <div className="flex items-start justify-center sm:justify-start gap-2">
                <MapPin className={cn("h-4 w-4 mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>{contact.adresse}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>{contact.dateNaissance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setIsEditing(true)}
            className={cn(
              "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300",
              isDarkMode
                ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600"
                : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
            )}
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </button>
          <button
            onClick={() => {
              setContactToDelete(contact.email)
              setIsDeleteDialogOpen(true)
            }}
            className={cn(
              "inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300",
              isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700",
            )}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    )
  }

  // Composant de liste de contacts
  const ContactList = () => {
    const allSelected =
      currentContacts.length > 0 && currentContacts.every((contact) => selectedContacts.includes(contact.email))

    return (
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className={cn(
              "border-b",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
            )}>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className={cn(
                    "h-4 w-4 rounded focus:ring-green-500 transition-colors duration-300",
                    isDarkMode ? "border-gray-600 text-green-400" : "border-gray-300 text-green-600",
                  )}
                  aria-label="Sélectionner tous les contacts"
                />
              </th>
              <th className={cn(
                "p-3 text-left font-medium",
                isDarkMode ? "text-gray-200" : "text-gray-700",
              )}>
                Nom
              </th>
              <th className={cn(
                "p-3 text-left font-medium hidden md:table-cell",
                isDarkMode ? "text-gray-200" : "text-gray-700",
              )}>
                Email
              </th>
              <th className={cn(
                "p-3 text-left font-medium hidden md:table-cell",
                isDarkMode ? "text-gray-200" : "text-gray-700",
              )}>
                Téléphone
              </th>
              <th className={cn(
                "p-3 text-left font-medium hidden lg:table-cell",
                isDarkMode ? "text-gray-200" : "text-gray-700",
              )}>
                Adresse
              </th>
              <th className={cn(
                "p-3 text-left font-medium hidden lg:table-cell",
                isDarkMode ? "text-gray-200" : "text-gray-700",
              )}>
                Date de naissance
              </th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length === 0 ? (
              <tr>
                <td colSpan={7} className={cn(
                  "p-8 text-center",
                  isDarkMode ? "text-gray-400" : "text-gray-500",
                )}>
                  Aucun contact trouvé
                </td>
              </tr>
            ) : (
              currentContacts.map((contact) => (
                <tr
                  key={contact.email}
                  className={cn(
                    "border-b cursor-pointer transition-colors duration-200",
                    isDarkMode ? "hover:bg-gray-800 border-gray-700" : "hover:bg-gray-50 border-gray-200",
                  )}
                  onClick={() => handleViewContact(contact)}
                >
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.email)}
                      onChange={(e) => handleSelectContact(contact.email, e.target.checked)}
                      className={cn(
                        "h-4 w-4 rounded focus:ring-green-500 transition-colors duration-300",
                        isDarkMode ? "border-gray-600 text-green-400" : "border-gray-300 text-green-600",
                      )}
                      aria-label={`Sélectionner ${contact.nom}`}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "relative w-10 h-10 rounded-full overflow-hidden transition-colors duration-300",
                        isDarkMode ? "bg-gray-700" : "bg-gray-200",
                      )}>
                        <img
                          src={contact.imageProfil || "/placeholder.svg"}
                          alt={contact.nom}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/40"
                          }}
                        />
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium",
                          isDarkMode ? "text-gray-200" : "text-gray-900",
                        )}>
                          {contact.nom}
                        </div>
                        <div className={cn(
                          "text-sm md:hidden",
                          isDarkMode ? "text-gray-400" : "text-gray-500",
                        )}>
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <a
                      href={`mailto:${contact.email}`}
                      className={cn(
                        "hover:underline",
                        isDarkMode ? "text-green-400" : "text-green-600",
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <a
                      href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                      className={cn(
                        "hover:underline",
                        isDarkMode ? "text-gray-300" : "text-gray-900",
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.mobile}
                    </a>
                  </td>
                  <td className={cn(
                    "p-3 hidden lg:table-cell",
                    isDarkMode ? "text-gray-300" : "text-gray-900",
                  )}>
                    {contact.adresse}
                  </td>
                  <td className={cn(
                    "p-3 hidden lg:table-cell",
                    isDarkMode ? "text-gray-300" : "text-gray-900",
                  )}>
                    {contact.dateNaissance}
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className={cn(
                          "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300",
                          isDarkMode ? "text-gray-500 hover:text-gray-400" : "text-gray-400 hover:text-gray-500",
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          const dropdown = document.getElementById(`dropdown-${contact.email}`)
                          if (dropdown) {
                            dropdown.classList.toggle("hidden")
                          }
                        }}
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      <div
                        id={`dropdown-${contact.email}`}
                        className={cn(
                          "hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-colors duration-300",
                          isDarkMode ? "bg-gray-800" : "bg-white",
                        )}
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className={cn(
                              "w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewContact(contact)
                              document.getElementById(`dropdown-${contact.email}`)?.classList.add("hidden")
                            }}
                          >
                            Voir les détails
                          </button>
                          <a
                            href={`mailto:${contact.email}`}
                            className={cn(
                              "block px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center">
                              <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                            </div>
                          </a>
                          <a
                            href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                            className={cn(
                              "block px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                              isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center">
                              <Phone className="mr-2 h-4 w-4" /> Appeler
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  }

  // Composant de grille de contacts
  const ContactGrid = () => {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentContacts.length === 0 ? (
          <div className={cn(
            "col-span-full p-8 text-center",
            isDarkMode ? "text-gray-400" : "text-gray-500",
          )}>
            Aucun contact trouvé
          </div>
        ) : (
          currentContacts.map((contact) => (
            <div
              key={contact.email}
              className={cn(
                "overflow-hidden hover:shadow-md transition-shadow cursor-pointer border rounded-lg",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
              )}
              onClick={() => handleViewContact(contact)}
            >
              <div className={cn(
                "relative h-24",
                isDarkMode ? "bg-gradient-to-r from-gray-700 to-gray-600" : "bg-gradient-to-r from-green-100 to-green-50",
              )}>
                <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.email)}
                    onChange={(e) => handleSelectContact(contact.email, e.target.checked)}
                    className={cn(
                      "h-4 w-4 rounded focus:ring-green-500 transition-colors duration-300",
                      isDarkMode ? "border-gray-600 text-green-400" : "border-gray-300 text-green-600",
                    )}
                    aria-label={`Sélectionner ${contact.nom}`}
                  />
                </div>
              </div>
              <div className="p-4 pt-0 -mt-12">
                <div className="flex flex-col items-center mb-4">
                  <div className={cn(
                    "h-24 w-24 border-4 rounded-full overflow-hidden transition-colors duration-300",
                    isDarkMode ? "bg-gray-700 border-gray-800" : "bg-gray-200 border-white",
                  )}>
                    <img
                      src={contact.imageProfil || "/placeholder.svg"}
                      alt={contact.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/150"
                      }}
                    />
                  </div>
                  <h3 className={cn(
                    "mt-2 font-semibold text-lg",
                    isDarkMode ? "text-gray-200" : "text-gray-900",
                  )}>
                    {contact.nom}
                  </h3>
                </div>

                <div className={cn("space-y-2 text-sm", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Mail className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                    <a
                      href={`mailto:${contact.email}`}
                      className={cn(
                        "truncate hover:underline",
                        isDarkMode ? "text-green-400" : "text-green-600",
                      )}
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Phone className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                    <a
                      href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                      className="hover:underline"
                    >
                      {contact.mobile}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className={cn("h-4 w-4 mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                    <span className="truncate">{contact.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                    <span>{contact.dateNaissance}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )
  }

  // Fermer tous les dropdowns quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      setIsFilterMenuOpen(false)
      currentContacts.forEach((contact) => {
        const dropdown = document.getElementById(`dropdown-${contact.email}`)
        if (dropdown) {
          dropdown.classList.add("hidden")
        }
      })
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [currentContacts])

  // Rendu principal
  return (
    <div className={cn(
      "min-h-screen container mx-auto py-6 px-4 sm:px-6 transition-colors duration-300",
      isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900",
    )}>
      <div className="flex flex-col space-y-4">
        {/* Header avec titre et actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className={cn(
                "inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300",
                isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700",
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ajouter un contact</span>
            </button>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className={cn(
          "border rounded-lg shadow-sm transition-colors duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        )}>
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className={cn(
                  "absolute left-2.5 top-2.5 h-4 w-4",
                  isDarkMode ? "text-gray-400" : "text-gray-500",
                )} />
                <input
                  type="search"
                  placeholder="Rechercher un contact..."
                  className={cn(
                    "w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300",
                    isDarkMode ? "bg-gray-800 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300",
                      isDarkMode
                        ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600"
                        : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsFilterMenuOpen(!isFilterMenuOpen)
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Filtrer</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  {isFilterMenuOpen && (
                    <div className={cn(
                      "absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 transition-colors duration-300",
                      isDarkMode ? "bg-gray-800" : "bg-white",
                    )}>
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                            isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                          )}
                          onClick={() => {
                            setSearchQuery("")
                            setIsFilterMenuOpen(false)
                          }}
                        >
                          Tous les contacts
                        </button>
                        <button
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                            isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                          )}
                          onClick={() => {
                            setSearchQuery("Dakar")
                            setIsFilterMenuOpen(false)
                          }}
                        >
                          Contacts à Dakar
                        </button>
                        <button
                          className={cn(
                            "w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors duration-200",
                            isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100",
                          )}
                          onClick={() => {
                            setSearchQuery("77")
                            setIsFilterMenuOpen(false)
                          }}
                        >
                          Numéros commençant par 77
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className={cn(
                  "hidden sm:flex border rounded-md overflow-hidden transition-colors duration-300",
                  isDarkMode ? "border-gray-600" : "border-gray-300",
                )}>
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium",
                      viewMode === "list"
                        ? isDarkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-50 text-green-600"
                        : isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-gray-700",
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    Liste
                  </button>
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium",
                      viewMode === "grid"
                        ? isDarkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-50 text-green-600"
                        : isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-white text-gray-700",
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    Grille
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions sur les contacts sélectionnés */}
        {selectedContacts.length > 0 && (
          <div className={cn(
            "flex items-center justify-between p-2 rounded-md transition-colors duration-300",
            isDarkMode ? "bg-gray-800" : "bg-gray-100",
          )}>
            <div className="flex items-center gap-2">
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300",
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800",
              )}>
                {selectedContacts.length} sélectionné(s)
              </span>
            </div>
            <button
              onClick={handleDeleteSelected}
              className={cn(
                "inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300",
                isDarkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700",
              )}
            >
              Supprimer la sélection
            </button>
          </div>
        )}

        {/* Affichage des contacts */}
        <div className={cn(
          "border rounded-lg shadow-sm transition-colors duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        )}>
          <div className="p-0">
            {viewMode === "list" ? <ContactList /> : <ContactGrid />}

            {/* Pagination */}
            <div className={cn(
              "flex flex-col sm:flex-row justify-between items-center p-4 border-t text-sm transition-colors duration-300",
              isDarkMode ? "border-gray-700" : "border-gray-200",
            )}>
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <span className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Éléments par page:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number.parseInt(e.target.value))
                    setCurrentPage(1)
                  }}
                  className={cn(
                    "h-8 w-16 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 transition-colors duration-300",
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900",
                  )}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>

              <div className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>
                {startIndex + 1} - {endIndex} sur {filteredContacts.length}
              </div>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md transition-colors duration-300",
                    currentPage === 1
                      ? isDarkMode
                        ? "text-gray-500 border-gray-600 bg-gray-700 cursor-not-allowed"
                        : "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                      : isDarkMode
                        ? "text-gray-300 border-gray-600 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50",
                  )}
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md transition-colors duration-300",
                    currentPage === totalPages
                      ? isDarkMode
                        ? "text-gray-500 border-gray-600 bg-gray-700 cursor-not-allowed"
                        : "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                      : isDarkMode
                        ? "text-gray-300 border-gray-600 bg-gray-700 hover:bg-gray-600"
                        : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50",
                  )}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog d'ajout de contact */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className={cn(
              "fixed inset-0 transition-opacity",
              isDarkMode ? "bg-gray-900/75" : "bg-gray-500/75",
            )} aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              ​
            </span>
            <div className={cn(
              "inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
              isDarkMode ? "bg-gray-800" : "bg-white",
            )}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className={cn(
                      "text-lg leading-6 font-medium mb-4",
                      isDarkMode ? "text-gray-200" : "text-gray-900",
                    )}>
                      Ajouter un nouveau contact
                    </h3>
                    <ContactForm onSubmit={handleAddContact} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog de détail du contact */}
      {isDetailDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className={cn(
              "fixed inset-0 transition-opacity",
              isDarkMode ? "bg-gray-900/75" : "bg-gray-500/75",
            )} aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              ​
            </span>
            <div className={cn(
              "inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
              isDarkMode ? "bg-gray-800" : "bg-white",
            )}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className={cn(
                      "rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300",
                      isDarkMode ? "text-gray-400 hover:text-gray-300 bg-gray-800" : "text-gray-400 hover:text-gray-500 bg-white",
                    )}
                    onClick={() => {
                      setIsDetailDialogOpen(false)
                      setIsEditing(false)
                    }}
                  >
                    <span className="sr-only">Fermer</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className={cn(
                      "text-lg leading-6 font-medium mb-4",
                      isDarkMode ? "text-gray-200" : "text-gray-900",
                    )}>
                      Détails du contact
                    </h3>
                    {selectedContact && <ContactDetail contact={selectedContact} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog de confirmation de suppression */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className={cn(
              "fixed inset-0 transition-opacity",
              isDarkMode ? "bg-gray-900/75" : "bg-gray-500/75",
            )} aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              ​
            </span>
            <div className={cn(
              "inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
              isDarkMode ? "bg-gray-800" : "bg-white",
            )}>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={cn(
                    "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10",
                    isDarkMode ? "bg-red-900" : "bg-red-100",
                  )}>
                    <Trash2 className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-red-400" : "text-red-600",
                    )} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className={cn(
                      "text-lg leading-6 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900",
                    )}>
                      Êtes-vous sûr?
                    </h3>
                    <div className="mt-2">
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500",
                      )}>
                        Cette action ne peut pas être annulée. Ce contact sera définitivement supprimé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn(
                "px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse transition-colors duration-300",
                isDarkMode ? "bg-gray-900" : "bg-gray-50",
              )}>
                <button
                  type="button"
                  className={cn(
                    "w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300",
                    isDarkMode ? "bg-red-600 hover:bg-red-700 border-transparent" : "bg-red-600 hover:bg-red-700 border-transparent",
                  )}
                  onClick={() => {
                    if (contactToDelete) {
                      handleDeleteContact(contactToDelete)
                    }
                  }}
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  className={cn(
                    "mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50",
                  )}
                  onClick={() => {
                    setIsDeleteDialogOpen(false)
                    setContactToDelete(null)
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
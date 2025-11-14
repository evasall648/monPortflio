"use client"

import type React from "react"
import { useState, useEffect } from "react"
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

export default function ContactsApp() {
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

  // Filter contacts based on search query
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

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredContacts.length)
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  // Handle adding a new contact
  const handleAddContact = (newContact: Contact) => {
    setContacts([...contacts, newContact])
    setIsAddDialogOpen(false)
  }

  // Handle editing a contact
  const handleEditContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.email === updatedContact.email ? updatedContact : contact)))
    setSelectedContact(null)
    setIsDetailDialogOpen(false)
    setIsEditing(false)
  }

  // Handle deleting a contact
  const handleDeleteContact = (emailToDelete: string) => {
    setContacts(contacts.filter((contact) => contact.email !== emailToDelete))
    setSelectedContact(null)
    setIsDetailDialogOpen(false)
    setIsDeleteDialogOpen(false)
  }

  // Handle deleting multiple contacts
  const handleDeleteSelected = () => {
    setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.email)))
    setSelectedContacts([])
  }

  // Handle selecting all contacts on current page
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentEmails = currentContacts.map((contact) => contact.email)
      setSelectedContacts([...selectedContacts, ...currentEmails])
    } else {
      const currentEmails = currentContacts.map((contact) => contact.email)
      setSelectedContacts(selectedContacts.filter((email) => !currentEmails.includes(email)))
    }
  }

  // Handle selecting a single contact
  const handleSelectContact = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, email])
    } else {
      setSelectedContacts(selectedContacts.filter((e) => e !== email))
    }
  }

  // Handle viewing contact details
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
            <label htmlFor="nom" className="block text-sm font-medium">
              Nom complet
            </label>
            <input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Prénom Nom"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="mobile" className="block text-sm font-medium">
              Téléphone mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="77 123 45 67"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="dateNaissance" className="block text-sm font-medium">
              Date de naissance
            </label>
            <input
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              placeholder="JJ/MM/AAAA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="adresse" className="block text-sm font-medium">
            Adresse
          </label>
          <input
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse complète"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="imageProfil" className="block text-sm font-medium">
            URL de l'image de profil
          </label>
          <input
            id="imageProfil"
            name="imageProfil"
            value={formData.imageProfil}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => (contact ? setIsEditing(false) : setIsAddDialogOpen(false))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
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
            <h2 className="text-2xl font-bold">{contact.nom}</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href={`mailto:${contact.email}`} className="text-green-600 hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href={`tel:${contact.mobile.replace(/\s/g, "")}`} className="hover:underline">
                  {contact.mobile}
                </a>
              </div>
              <div className="flex items-start justify-center sm:justify-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span>{contact.adresse}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{contact.dateNaissance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </button>
          <button
            onClick={() => {
              setContactToDelete(contact.email)
              setIsDeleteDialogOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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

    const someSelected = currentContacts.some((contact) => selectedContacts.includes(contact.email)) && !allSelected

    return (
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  aria-label="Sélectionner tous les contacts"
                />
              </th>
              <th className="p-3 text-left font-medium">Nom</th>
              <th className="p-3 text-left font-medium hidden md:table-cell">Email</th>
              <th className="p-3 text-left font-medium hidden md:table-cell">Téléphone</th>
              <th className="p-3 text-left font-medium hidden lg:table-cell">Adresse</th>
              <th className="p-3 text-left font-medium hidden lg:table-cell">Date de naissance</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  Aucun contact trouvé
                </td>
              </tr>
            ) : (
              currentContacts.map((contact) => (
                <tr
                  key={contact.email}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewContact(contact)}
                >
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.email)}
                      onChange={(e) => handleSelectContact(contact.email, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      aria-label={`Sélectionner ${contact.nom}`}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
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
                        <div className="font-medium">{contact.nom}</div>
                        <div className="text-sm text-gray-500 md:hidden">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-green-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <a
                      href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.mobile}
                    </a>
                  </td>
                  <td className="p-3 hidden lg:table-cell">{contact.adresse}</td>
                  <td className="p-3 hidden lg:table-cell">{contact.dateNaissance}</td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center">
                              <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                            </div>
                          </a>
                          <a
                            href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
          <div className="col-span-full p-8 text-center text-gray-500">Aucun contact trouvé</div>
        ) : (
          currentContacts.map((contact) => (
            <div
              key={contact.email}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border rounded-lg bg-white"
              onClick={() => handleViewContact(contact)}
            >
              <div className="relative h-24 bg-gradient-to-r from-green-100 to-green-50">
                <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.email)}
                    onChange={(e) => handleSelectContact(contact.email, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    aria-label={`Sélectionner ${contact.nom}`}
                  />
                </div>
              </div>
              <div className="p-4 pt-0 -mt-12">
                <div className="flex flex-col items-center mb-4">
                  <div className="h-24 w-24 border-4 border-white rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={contact.imageProfil || "/placeholder.svg"}
                      alt={contact.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/150"
                      }}
                    />
                  </div>
                  <h3 className="mt-2 font-semibold text-lg">{contact.nom}</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${contact.email}`} className="text-green-600 hover:underline truncate">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${contact.mobile.replace(/\s/g, "")}`} className="hover:underline">
                      {contact.mobile}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="truncate">{contact.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
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
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="flex flex-col space-y-4">
        {/* Header with title and actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ajouter un contact</span>
            </button>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="border rounded-lg shadow-sm bg-white">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Rechercher un contact..."
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSearchQuery("")
                            setIsFilterMenuOpen(false)
                          }}
                        >
                          Tous les contacts
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSearchQuery("Dakar")
                            setIsFilterMenuOpen(false)
                          }}
                        >
                          Contacts à Dakar
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                <div className="hidden sm:flex border rounded-md overflow-hidden">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${viewMode === "list" ? "bg-green-50 text-green-600" : "bg-white text-gray-700"}`}
                    onClick={() => setViewMode("list")}
                  >
                    Liste
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${viewMode === "grid" ? "bg-green-50 text-green-600" : "bg-white text-gray-700"}`}
                    onClick={() => setViewMode("grid")}
                  >
                    Grille
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected contacts actions */}
        {selectedContacts.length > 0 && (
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                {selectedContacts.length} sélectionné(s)
              </span>
            </div>
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Supprimer la sélection
            </button>
          </div>
        )}

        {/* Contacts display */}
        <div className="border rounded-lg shadow-sm bg-white">
          <div className="p-0">
            {viewMode === "list" ? <ContactList /> : <ContactGrid />}

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t text-sm">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <span>Éléments par page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number.parseInt(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="h-8 w-16 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>

              <div className="text-sm text-gray-500">
                {startIndex + 1} - {endIndex} sur {filteredContacts.length}
              </div>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Ajouter un nouveau contact</h3>
                    <ContactForm onSubmit={handleAddContact} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Detail Dialog */}
      {isDetailDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Détails du contact</h3>
                    {selectedContact && <ContactDetail contact={selectedContact} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Êtes-vous sûr?</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Cette action ne peut pas être annulée. Ce contact sera définitivement supprimé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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


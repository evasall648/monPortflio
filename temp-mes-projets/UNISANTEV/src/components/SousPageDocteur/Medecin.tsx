import type React from "react"
import { useState, useEffect, useRef, useContext } from "react"
import {
  Search,
  Star,
  StarHalf,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  Heart,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Phone,
  Mail,
  ArrowLeft,
  Home,
  User,
  Globe,
} from "lucide-react"

// Importer le ThemeContext (assurez-vous que ce fichier existe dans votre projet)
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord"

// Types
interface Medecin {
  id: number
  nom: string
  specialite: string
  evaluations: number
  nombreEvaluations: number
  description: string
  adresse: string
  avis: number
  tarif: string
  tarifNumeric: number
  horaires: string
  telephone: string
  email: string
  langues: string[]
  disponibilite: {
    jour: string
    creneaux: string[]
  }[]
  image: string
}

// Données des médecins (identique à votre code original)
const medecinsData: Medecin[] = [
  {
    id: 1,
    nom: "Dr Fatou Diop",
    specialite: "Médecin Généraliste",
    evaluations: 4.5,
    nombreEvaluations: 245,
    description:
      "Dr Fatou Diop est une médecin généraliste expérimentée, spécialisée dans le suivi des patients pour des soins primaires, la gestion des maladies chroniques comme le diabète et l'hypertension, et les consultations de routine au Sénégal.",
    adresse: "Hôpital Principal, Avenue Cheikh Anta Diop, Dakar, Sénégal",
    avis: 156,
    tarif: "10 000 FCFA",
    tarifNumeric: 10000,
    horaires: "LUN - VEN 08:00 - 18:00",
    telephone: "+221 77 123 45 67",
    email: "fatou.diop@example.com",
    langues: ["Français", "Wolof", "Anglais"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mardi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mercredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Jeudi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Vendredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
    ],
    image: "/medecin1.jpg",
  },
  {
    id: 2,
    nom: "Dr Mamadou Ndiaye",
    specialite: "Chirurgien Orthopédiste",
    evaluations: 5,
    nombreEvaluations: 678,
    description:
      "Dr Mamadou Ndiaye est un chirurgien orthopédiste renommé, expert en traitement des fractures, des problèmes de dos et des articulations. Il exerce principalement à Dakar et traite les blessures sportives courantes au Sénégal.",
    adresse: "Clinique Saint-Jean, Route des Almadies, Dakar, Sénégal",
    avis: 320,
    tarif: "25 000 FCFA",
    tarifNumeric: 25000,
    horaires: "LUN - SAM 09:00 - 17:00",
    telephone: "+221 77 234 56 78",
    email: "mamadou.ndiaye@example.com",
    langues: ["Français", "Wolof", "Anglais", "Espagnol"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mardi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mercredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Jeudi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Vendredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { jour: "Samedi", creneaux: ["09:00", "10:00", "11:00"] },
    ],
    image: "/medecin2.jpg",
  },
  {
    id: 3,
    nom: "Dr Awa Fall",
    specialite: "Pédiatre",
    evaluations: 4.3,
    nombreEvaluations: 189,
    description:
      "Dr Awa Fall est une pédiatre dévouée, spécialisée dans la santé des enfants de 0 à 16 ans, incluant les vaccins, les infections courantes et le développement infantile. Elle reçoit ses patients à Dakar.",
    adresse: "Centre Médical de Fann, Rue 1, Fann, Dakar, Sénégal",
    avis: 98,
    tarif: "8 000 FCFA",
    tarifNumeric: 8000,
    horaires: "LUN - VEN 08:30 - 16:30",
    telephone: "+221 77 345 67 89",
    email: "awa.fall@example.com",
    langues: ["Français", "Wolof"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["08:30", "09:30", "10:30", "14:00", "15:00"] },
      { jour: "Mardi", creneaux: ["08:30", "09:30", "10:30", "14:00", "15:00"] },
      { jour: "Mercredi", creneaux: ["08:30", "09:30", "10:30", "14:00", "15:00"] },
      { jour: "Jeudi", creneaux: ["08:30", "09:30", "10:30", "14:00", "15:00"] },
      { jour: "Vendredi", creneaux: ["08:30", "09:30", "10:30", "14:00", "15:00"] },
    ],
    image: "/medecin3.jpg",
  },
  {
    id: 4,
    nom: "Dr Ibrahima Sarr",
    specialite: "Cardiologue",
    evaluations: 4.8,
    nombreEvaluations: 412,
    description:
      "Dr Ibrahima Sarr est un cardiologue expérimenté, spécialisé dans le diagnostic et le traitement des maladies cardiovasculaires, comme l'hypertension et les troubles du rythme cardiaque. Il pratique à Dakar.",
    adresse: "Polyclinique de Grand-Yoff, Boulevard du Centenaire, Dakar, Sénégal",
    avis: 245,
    tarif: "20 000 FCFA",
    tarifNumeric: 20000,
    horaires: "LUN - VEN 09:00 - 18:00",
    telephone: "+221 77 456 78 90",
    email: "ibrahima.sarr@example.com",
    langues: ["Français", "Wolof", "Anglais", "Arabe"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] },
      { jour: "Mardi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] },
      { jour: "Mercredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] },
      { jour: "Jeudi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] },
      { jour: "Vendredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"] },
    ],
    image: "/medecin4.jpg",
  },
  {
    id: 5,
    nom: "Dr Aminata Ba",
    specialite: "Gynécologue-Obstétricienne",
    evaluations: 4.6,
    nombreEvaluations: 134,
    description:
      "Dr Aminata Ba est une gynécologue-obstétricienne qui se consacre aux soins prénatals, aux accouchements et aux problèmes gynécologiques. Elle exerce à Dakar et est connue pour son approche empathique.",
    adresse: "Clinique des Mamans, Rue 13, Point E, Dakar, Sénégal",
    avis: 75,
    tarif: "15 000 FCFA",
    tarifNumeric: 15000,
    horaires: "LUN - SAM 08:00 - 17:00",
    telephone: "+221 77 567 89 01",
    email: "aminata.ba@example.com",
    langues: ["Français", "Wolof", "Anglais"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mardi", creneaux: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Mercredi", creneaux: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Jeudi", creneaux: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Vendredi", creneaux: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { jour: "Samedi", creneaux: ["09:00", "10:00", "11:00", "12:00"] },
    ],
    image: "/medecin5.jpg",
  },
  {
    id: 6,
    nom: "Dr Ousmane Gueye",
    specialite: "Dermatologue",
    evaluations: 3.7,
    nombreEvaluations: 67,
    description:
      "Dr Ousmane Gueye est un dermatologue spécialisé dans le traitement des maladies de la peau, comme l'acné, l'eczéma et les infections cutanées. Il reçoit ses patients à Dakar avec une approche moderne.",
    adresse: "Cabinet Médical Liberté 6, Avenue Cheikh Ahmadou Bamba, Dakar, Sénégal",
    avis: 45,
    tarif: "12 000 FCFA",
    tarifNumeric: 12000,
    horaires: "LUN - VEN 09:00 - 16:00",
    telephone: "+221 77 678 90 12",
    email: "ousmane.gueye@example.com",
    langues: ["Français", "Wolof"],
    disponibilite: [
      { jour: "Lundi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { jour: "Mardi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { jour: "Mercredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { jour: "Jeudi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
      { jour: "Vendredi", creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
    ],
    image: "/medecin6.jpg",
  },
]

// Liste des spécialités pour le filtre
const specialites = [
  "Toutes les spécialités",
  "Médecin Généraliste",
  "Chirurgien Orthopédiste",
  "Pédiatre",
  "Cardiologue",
  "Gynécologue-Obstétricienne",
  "Dermatologue",
]

const MedecinApp: React.FC = () => {
  // Récupérer le contexte du thème
  const themeContext = useContext(ThemeContext)
  if (!themeContext) {
    throw new Error("MedecinApp doit être utilisé dans un ThemeContext.Provider")
  }
  const { isDarkMode } = themeContext

  // États
  const [medecins, setMedecins] = useState<Medecin[]>(medecinsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialite, setSelectedSpecialite] = useState("Toutes les spécialités")
  const [sortBy, setSortBy] = useState<"evaluations" | "tarif" | "avis">("evaluations")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedMedecin, setSelectedMedecin] = useState<Medecin | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // Filtrer et trier les médecins
  useEffect(() => {
    let filtered = [...medecinsData]

    if (searchQuery) {
      filtered = filtered.filter(
        (medecin) =>
          medecin.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medecin.specialite.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medecin.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedSpecialite !== "Toutes les spécialités") {
      filtered = filtered.filter((medecin) => medecin.specialite === selectedSpecialite)
    }

    filtered.sort((a, b) => {
      if (sortBy === "evaluations") {
        return sortOrder === "desc" ? b.evaluations - a.evaluations : a.evaluations - b.evaluations
      } else if (sortBy === "tarif") {
        return sortOrder === "desc" ? b.tarifNumeric - a.tarifNumeric : a.tarifNumeric - b.tarifNumeric
      } else {
        return sortOrder === "desc" ? b.avis - a.avis : a.avis - b.avis
      }
    })

    setMedecins(filtered)
  }, [searchQuery, selectedSpecialite, sortBy, sortOrder])

  // Fermer les modales en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsDetailOpen(false)
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Gérer les favoris
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Ouvrir les détails d'un médecin
  const openMedecinDetail = (medecin: Medecin) => {
    setSelectedMedecin(medecin)
    setIsDetailOpen(true)
  }

  // Générer les étoiles d'évaluation
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />)
    }

    return stars
  }

  return (
    // Conteneur principal avec thème dynamique
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* En-tête et barre de recherche */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Liste des médecins</h1>
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un médecin, une spécialité..."
                className={`w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600"
                    : "bg-white text-gray-800 placeholder-gray-500 border-gray-300"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Rechercher un médecin ou une spécialité"
              />
            </div>
          </div>

          {/* Filtres et tri */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 text-green-300 hover:bg-gray-600"
                    : "bg-white text-green-600 hover:bg-green-50"
                }`}
                aria-label="Ouvrir le menu de filtrage"
              >
                <Filter className="w-4 h-4" />
                <span>Filtrer</span>
                {isFilterMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isFilterMenuOpen && (
                <div
                  className={`absolute top-full left-0 mt-2 rounded-lg shadow-lg z-10 w-64 p-4 transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
                  }`}
                >
                  <h3 className="font-medium mb-2">Spécialité</h3>
                  <select
                    className={`w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    value={selectedSpecialite}
                    onChange={(e) => setSelectedSpecialite(e.target.value)}
                    aria-label="Sélectionner une spécialité médicale"
                  >
                    {specialites.map((specialite) => (
                      <option key={specialite} value={specialite}>
                        {specialite}
                      </option>
                    ))}
                  </select>

                  <h3 className="font-medium mb-2">Trier par</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="tri-evaluations"
                        name="tri"
                        checked={sortBy === "evaluations"}
                        onChange={() => setSortBy("evaluations")}
                        className="mr-2"
                      />
                      <label htmlFor="tri-evaluations">Évaluations</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="tri-tarif"
                        name="tri"
                        checked={sortBy === "tarif"}
                        onChange={() => setSortBy("tarif")}
                        className="mr-2"
                      />
                      <label htmlFor="tri-tarif">Tarif</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="tri-avis"
                        name="tri"
                        checked={sortBy === "avis"}
                        onChange={() => setSortBy("avis")}
                        className="mr-2"
                      />
                      <label htmlFor="tri-avis">Nombre d'avis</label>
                    </div>
                  </div>

                  <h3 className="font-medium mt-4 mb-2">Ordre</h3>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded transition-colors duration-300 ${
                        sortOrder === "desc"
                          ? isDarkMode
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-600"
                          : isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSortOrder("desc")}
                      aria-label="Trier par ordre décroissant"
                    >
                      Décroissant
                    </button>
                    <button
                      className={`px-3 py-1 rounded transition-colors duration-300 ${
                        sortOrder === "asc"
                          ? isDarkMode
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-600"
                          : isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSortOrder("asc")}
                      aria-label="Trier par ordre croissant"
                    >
                      Croissant
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-sm">
              {medecins.length} médecin{medecins.length > 1 ? "s" : ""} trouvé{medecins.length > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Liste des médecins */}
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {medecins.length === 0 ? (
            <div
              className={`p-8 rounded-lg shadow text-center transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
              }`}
            >
              <p>Aucun médecin ne correspond à votre recherche.</p>
            </div>
          ) : (
            medecins.map((medecin) => (
              <div
                key={medecin.id}
                className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image et infos principales */}
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={medecin.image || "/placeholder.svg"}
                          alt={medecin.nom}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-green-100"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/150"
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(medecin.id)
                          }}
                          className={`absolute -top-1 -right-1 rounded-full p-1 shadow-sm transition-colors duration-300 ${
                            isDarkMode ? "bg-gray-700" : "bg-white"
                          }`}
                          aria-label={favorites.includes(medecin.id) ? `Retirer ${medecin.nom} des favoris` : `Ajouter ${medecin.nom} aux favoris`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(medecin.id)
                                ? "fill-red-500 text-red-500"
                                : isDarkMode
                                ? "text-gray-300"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
                          {medecin.nom}
                        </h3>
                        <p className="text-green-600 font-medium">{medecin.specialite}</p>
                        <div className="flex items-center mt-2 mb-1">
                          <div className="flex mr-1">{renderStars(medecin.evaluations)}</div>
                          <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            ({medecin.evaluations.toFixed(1)}) • {medecin.nombreEvaluations} évaluations
                          </span>
                        </div>
                        <p className={`text-sm line-clamp-2 mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {medecin.description}
                        </p>
                      </div>
                    </div>

                    {/* Informations complémentaires */}
                    <div
                      className={`flex flex-col md:border-l md:pl-4 space-y-2 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      } mt-4 md:mt-0`}
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        <span>{medecin.adresse}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        <span>{medecin.avis} avis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        <span>Tarif: {medecin.tarif}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                        <span>{medecin.horaires}</span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-end">
                    <button
                      onClick={() => openMedecinDetail(medecin)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      aria-label={`Voir le profil de ${medecin.nom}`}
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modale de détail du médecin */}
      {isDetailOpen && selectedMedecin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div
            ref={modalRef}
            className={`rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
            }`}
          >
            <div className="relative">
              <button
                onClick={() => setIsDetailOpen(false)}
                className={`absolute top-4 right-4 rounded-full p-1 shadow-sm transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
                aria-label="Fermer la fenêtre de détails"
              >
                <X className={`w-5 h-5 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`} />
              </button>

              <div className="bg-green-600 text-white p-6 pb-24">
                <h2 className="text-2xl font-bold">{selectedMedecin.nom}</h2>
                <p className="text-green-100">{selectedMedecin.specialite}</p>
              </div>

              <div className="px-6 -mt-20 pb-6">
                <div
                  className={`rounded-lg shadow-md p-4 mb-6 transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <img
                      src={selectedMedecin.image || "/placeholder.svg"}
                      alt={selectedMedecin.nom}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/150"
                      }}
                    />
                    <div>
                      <div className="flex items-center mt-2 mb-1">
                        <div className="flex mr-1">{renderStars(selectedMedecin.evaluations)}</div>
                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          ({selectedMedecin.evaluations.toFixed(1)}) • {selectedMedecin.nombreEvaluations} évaluations
                        </span>
                      </div>
                      <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {selectedMedecin.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedMedecin.langues.map((langue) => (
                          <span
                            key={langue}
                            className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                              isDarkMode ? "bg-green-700 text-green-200" : "bg-green-50 text-green-600"
                            }`}
                          >
                            {langue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`rounded-lg shadow-md p-4 transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Adresse
                    </h3>
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{selectedMedecin.adresse}</p>
                    <div className="mt-4 h-40 bg-gray-200 rounded-md">
                      <div className="https://www.google.com/maps/place/Stade+L%C3%A9opold+S%C3%A9dar-Senghor/@14.7328963,-17.4898654,13z/data=!4m15!1m8!3m7!1s0xec112ae6b54c397:0x56b82d37d6396c3c!2sAlmadies,+Dakar!3b1!8m2!3d14.7434582!4d-17.5116542!16s%2Fm%2F05pcdc1!3m5!1s0xec10d3ecf407c39:0x9bdb67630ade5f0c!8m2!3d14.7467034!4d-17.4519086!16zL20vMDhsczh2!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D">
                        Carte non disponible
                      </div>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg shadow-md p-4 transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-green-600" />
                      Horaires
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>
                      {selectedMedecin.horaires}
                    </p>

                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-green-600" />
                      Contact
                    </h3>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
                      Téléphone:{" "}
                      <a href={`tel:${selectedMedecin.telephone}`} className="text-green-600">
                        {selectedMedecin.telephone}
                      </a>
                    </p>
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                      Email:{" "}
                      <a href={`mailto:${selectedMedecin.email}`} className="text-green-600">
                        {selectedMedecin.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-lg shadow-md p-4 mt-6 transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Tarifs
                  </h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    Consultation: {selectedMedecin.tarif}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center p-6">
              <a
                href={`mailto:${selectedMedecin.email}`}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                aria-label={`Contacter ${selectedMedecin.nom} par email`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contacter par email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Barre de navigation en bas */}
      <div
        className={`fixed bottom-0 left-0 right-0 border-t p-3 flex justify-between items-center z-30 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-600"
        }`}
      >
        <button className="flex items-center text-green-600" aria-label="Retour à la page précédente">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Retour</span>
        </button>
        <div className="flex items-center gap-4">
          <button className={isDarkMode ? "text-gray-300" : "text-gray-600"} aria-label="Retour à l'accueil">
            <Home className="w-5 h-5" />
          </button>
          <button className={isDarkMode ? "text-gray-300" : "text-gray-600"} aria-label="Profil utilisateur">
            <User className="w-5 h-5" />
          </button>
          <button className={isDarkMode ? "text-gray-300" : "text-gray-600"} aria-label="Changer de langue">
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MedecinApp
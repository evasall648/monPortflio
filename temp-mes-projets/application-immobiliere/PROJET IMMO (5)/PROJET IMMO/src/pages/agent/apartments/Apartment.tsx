"use client"

import type React from "react"
import { useState, useEffect, ChangeEvent } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Trash2, Eye, Home, MapPin, Euro, Building2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MdEdit, MdDelete, MdViewList, MdViewModule } from "react-icons/md"

// Import des images
import appt1 from "@/assets/app1.jpg"
import appt2 from "@/assets/app2.jpg"
import appt3 from "@/assets/appt3.jpg"
import appt4 from "@/assets/appt4.jpg"
import appt5 from "@/assets/appt5.jpg"
import appt6 from "@/assets/appt6.jpg"
import appt7 from "@/assets/appt7.jpg"
import appt8 from "@/assets/appt8.png"
import appt9 from "@/assets/appt9.jpg"
import appt10 from "@/assets/nappt10.jpg"
import appt11 from "@/assets/appt11.jpeg"
import cuisine1 from "@/assets/cuisine1.jpg"
import salon from "@/assets/salon.png"
import chambre from "@/assets/chambre.png"
import toilette from "@/assets/toilette.jpg"
import toilette2 from "@/assets/toilette2.jpg"

interface Building {
  id: number
  nom: string
  adresse: string
}

interface Apartment {
  id: number
  numero: string
  superficie: number
  loyer_mensuel: number
  etat: "disponible" | "occupé"
  type: string
  nombre_pieces: number
  id_batiment: number
  batiment: Building
  images: string[]
}

interface ApartmentFormData {
  numero: string
  superficie: string
  loyer_mensuel: string
  nombre_pieces: string
  type: string
  id_batiment: string
  etat?: "disponible" | "occupé"
}

const mockApartments: Apartment[] = [
  {
    id: 1,
    numero: "T2",
    superficie: 80,
    loyer_mensuel: 524800,
    etat: "disponible",
    type: "T2",
    nombre_pieces: 2,
    id_batiment: 1,
    batiment: { id: 1, nom: "Résidence Les Alizés", adresse: "123 Rue des Alizés" },
    images: [appt1, appt2, appt3, appt4]
  },
  {
    id: 2,
    numero: "Studio",
    superficie: 60,
    loyer_mensuel: 393600,
    etat: "occupé",
    type: "Studio",
    nombre_pieces: 1,
    id_batiment: 1,
    batiment: { id: 1, nom: "Résidence Les Alizés", adresse: "123 Rue des Alizés" },
    images: [appt5, appt6, appt7, appt8]
  },
  {
    id: 3,
    numero: "T3",
    superficie: 90,
    loyer_mensuel: 590400,
    etat: "disponible",
    type: "T3",
    nombre_pieces: 3,
    id_batiment: 2,
    batiment: { id: 2, nom: "Résidence Les Palmiers", adresse: "456 Rue des Palmiers" },
    images: [appt9, appt10, appt11, cuisine1]
  },
  {
    id: 4,
    numero: "T4",
    superficie: 120,
    loyer_mensuel: 787200,
    etat: "disponible",
    type: "T4",
    nombre_pieces: 4,
    id_batiment: 2,
    batiment: { id: 2, nom: "Résidence Les Palmiers", adresse: "456 Rue des Palmiers" },
    images: [salon, chambre, toilette, toilette2]
  }
]

const mockBuildings: Building[] = [
  { id: 1, nom: "Résidence Les Alizés", adresse: "123 Rue des Alizés" },
  { id: 2, nom: "Résidence Les Palmiers", adresse: "456 Rue des Palmiers" }
]

const Apartments: React.FC = () => {
  const { toast } = useToast()
  const [apartments, setApartments] = useState<Apartment[]>(mockApartments)
  const [buildings, setBuildings] = useState<Building[]>(mockBuildings)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterBuilding, setFilterBuilding] = useState<string>("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formData, setFormData] = useState<ApartmentFormData>({
    numero: "",
    superficie: "",
    loyer_mensuel: "",
    nombre_pieces: "",
    type: "",
    id_batiment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "cards">("cards")
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [detailApartment, setDetailApartment] = useState<Apartment | null>(null)
  const [formImages, setFormImages] = useState<string[]>([])

  // Charger les immeubles au montage du composant
  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch('/api/buildings')
        const data = await response.json()
        setBuildings(data)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les immeubles",
          variant: "destructive",
        })
      }
    }
    fetchBuildings()
  }, [])

  // Filtrer les appartements
  const filteredApartments = apartments.filter((apartment) => {
    const matchesSearch = apartment.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apartment.batiment.nom.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || apartment.etat === filterStatus
    const matchesBuilding = filterBuilding === "all" || apartment.id_batiment.toString() === filterBuilding
    return matchesSearch && matchesStatus && matchesBuilding
  })

  // Gérer les changements dans le formulaire
  const handleFormChange = (field: keyof ApartmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Valider le formulaire
  const validateForm = (): boolean => {
    if (!formData.id_batiment) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un immeuble",
        variant: "destructive",
      })
      return false
    }
    if (!formData.numero) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro d'appartement",
        variant: "destructive",
      })
      return false
    }
    if (!formData.superficie || isNaN(Number(formData.superficie))) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une superficie valide",
        variant: "destructive",
      })
      return false
    }
    if (!formData.loyer_mensuel || isNaN(Number(formData.loyer_mensuel))) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un loyer valide",
        variant: "destructive",
      })
      return false
    }
    if (!formData.nombre_pieces || isNaN(Number(formData.nombre_pieces))) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un nombre de pièces valide",
        variant: "destructive",
      })
      return false
    }
    if (!formData.type) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type d'appartement",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArray = Array.from(files)
    Promise.all(fileArray.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })).then(images => setFormImages(images))
  }

  // Créer un nouvel appartement
  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      if (selectedApartment) {
        setApartments(prev =>
          prev.map(apt =>
            apt.id === selectedApartment.id
              ? {
                  ...apt,
                  ...formData,
                  superficie: Number(formData.superficie),
                  loyer_mensuel: Number(formData.loyer_mensuel),
                  nombre_pieces: Number(formData.nombre_pieces),
                  id_batiment: Number(formData.id_batiment),
                  type: formData.type,
                  etat: formData.etat as "disponible" | "occupé",
                  images: formImages.length > 0 ? formImages : apt.images,
                }
              : apt
          )
        )
        toast({
          title: "Succès",
          description: "Appartement modifié avec succès",
        })
      } else {
        setApartments(prev => [
          ...prev,
          {
            id: Date.now(),
            numero: formData.numero,
            superficie: Number(formData.superficie),
            loyer_mensuel: Number(formData.loyer_mensuel),
            etat: formData.etat as "disponible" | "occupé",
            type: formData.type,
            nombre_pieces: Number(formData.nombre_pieces),
            id_batiment: Number(formData.id_batiment),
            batiment: buildings.find(b => b.id === Number(formData.id_batiment))!,
            images: formImages,
          },
        ])
        toast({
          title: "Succès",
          description: "Appartement créé avec succès",
        })
      }
      setIsAddModalOpen(false)
      setSelectedApartment(null)
      setFormData({
        numero: "",
        superficie: "",
        loyer_mensuel: "",
        nombre_pieces: "",
        type: "",
        id_batiment: "",
      })
      setFormImages([])
    } catch (error) {
      toast({
        title: "Erreur",
        description: selectedApartment ? "Impossible de modifier l'appartement" : "Impossible de créer l'appartement",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (apartment: Apartment) => {
    setSelectedApartment(apartment)
    setFormData({
      numero: apartment.numero,
      superficie: apartment.superficie.toString(),
      loyer_mensuel: apartment.loyer_mensuel.toString(),
      nombre_pieces: apartment.nombre_pieces.toString(),
      type: apartment.type,
      id_batiment: apartment.id_batiment.toString(),
      etat: apartment.etat,
    })
    setFormImages(apartment.images || [])
    setIsAddModalOpen(true)
  }

  const handleOpenDelete = (id: number) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }
  const handleDelete = () => {
    setApartments(apartments.filter(apt => apt.id !== deleteId))
    setIsDeleteModalOpen(false)
    setDeleteId(null)
  }

  const handleOpenDetail = (apartment: Apartment) => {
    setDetailApartment(apartment)
    setIsDetailModalOpen(true)
  }

  const resetForm = () => {
    setSelectedApartment(null)
    setFormData({
      numero: "",
      superficie: "",
      loyer_mensuel: "",
      nombre_pieces: "",
      type: "",
      id_batiment: "",
    })
    setFormImages([])
  }

  // Fonction pour mettre à jour l'index de l'image courante
  const updateImageIndex = (apartmentId: number, newIndex: number, imagesLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [apartmentId]: (newIndex + imagesLength) % imagesLength
    }))
  }

  return (
    <>
      <div className="p-4 sm:p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Appartements</h1>
              <p className="text-blue-600">Gérez vos appartements et locations</p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={(open) => {
              if (!open) {
                resetForm()
              }
              setIsAddModalOpen(open)
            }}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  {selectedApartment ? "Modifier l'appartement" : "Ajouter un appartement"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedApartment ? "Modifier l'appartement" : "Ajouter un nouvel appartement"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="batiment">Immeuble *</Label>
                      <Select 
                        value={formData.id_batiment} 
                        onValueChange={(value: string) => handleFormChange('id_batiment', value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un immeuble" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildings.map((building) => (
                            <SelectItem key={building.id} value={building.id.toString()}>
                              {building.nom} - {building.adresse}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="numero">Numéro *</Label>
                      <Input 
                        id="numero" 
                        placeholder="Ex: A101" 
                        value={formData.numero}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('numero', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="superficie">Superficie (m²) *</Label>
                      <Input 
                        id="superficie" 
                        type="number" 
                        value={formData.superficie}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('superficie', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loyer">Loyer mensuel (FCFA) *</Label>
                      <Input 
                        id="loyer" 
                        type="number" 
                        value={formData.loyer_mensuel}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('loyer_mensuel', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pieces">Nombre de pièces *</Label>
                      <Input 
                        id="pieces" 
                        type="number" 
                        value={formData.nombre_pieces}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange('nombre_pieces', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type d'appartement *</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value: string) => handleFormChange('type', value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="t1">T1</SelectItem>
                          <SelectItem value="t2">T2</SelectItem>
                          <SelectItem value="t3">T3</SelectItem>
                          <SelectItem value="t4">T4</SelectItem>
                          <SelectItem value="t5">T5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="etat">Statut *</Label>
                      <Select
                        value={formData.etat || "disponible"}
                        onValueChange={value => handleFormChange('etat', value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disponible">Disponible</SelectItem>
                          <SelectItem value="occupé">Occupé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="images">Photos de l'appartement</Label>
                      <Input id="images" type="file" multiple accept="image/*" onChange={handleImageChange} className="h-12" />
                      <div className="flex gap-2 mt-2">
                        {formImages.map((img, idx) => (
                          <img key={idx} src={img} alt="" className="h-16 w-24 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="h-12">
                    Annuler
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="h-12 bg-blue-600 hover:bg-blue-700 text-white">
                    {isSubmitting ? "Création..." : "Enregistrer"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-0 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Rechercher un appartement..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterBuilding} onValueChange={setFilterBuilding}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par immeuble" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les immeubles</SelectItem>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id.toString()}>
                    {building.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par état" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="disponible">Disponibles</SelectItem>
                <SelectItem value="occupe">Occupés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 mb-0">
            <Button
              className={viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}
              onClick={() => setViewMode("list")}
            >
              <MdViewList className="h-5 w-5" />
            </Button>
            <Button
              className={viewMode === "cards" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}
              onClick={() => setViewMode("cards")}
            >
              <MdViewModule className="h-5 w-5" />
            </Button>
          </div>

          {viewMode === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                      src={apartment.images[currentImageIndices[apartment.id] || 0]}
                      alt={`Appartement ${apartment.numero}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => updateImageIndex(apartment.id, (currentImageIndices[apartment.id] || 0) - 1, apartment.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => updateImageIndex(apartment.id, (currentImageIndices[apartment.id] || 0) + 1, apartment.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                    >
                      &gt;
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {apartment.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => updateImageIndex(apartment.id, index, apartment.images.length)}
                          className={`w-2 h-2 rounded-full ${
                            (currentImageIndices[apartment.id] || 0) === index ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold">Appartement {apartment.numero}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleOpenDetail(apartment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleEdit(apartment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleOpenDelete(apartment.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span>{apartment.batiment.nom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-gray-500" />
                        <span>{apartment.type} - {apartment.nombre_pieces} pièces</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{apartment.superficie} m²</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4 text-gray-500" />
                        <span>{apartment.loyer_mensuel.toLocaleString()} FCFA / mois</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 p-4">
                    <div className="w-full">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">État:</span>
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          apartment.etat === "disponible" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {apartment.etat === "disponible" ? "Disponible" : "Occupé"}
                        </span>
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => handleEdit(apartment)}>
                        Voir les détails
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Immeuble</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApartments.map((apartment) => (
                    <tr key={apartment.id} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={apartment.images[0]}
                          alt={`Appartement ${apartment.numero}`}
                          className="h-12 w-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{apartment.numero}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apartment.batiment.nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apartment.loyer_mensuel.toLocaleString()} FCFA / mois
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          apartment.etat === "disponible" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {apartment.etat === "disponible" ? "Disponible" : "Occupé"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-blue-600 text-white" onClick={() => handleOpenDetail(apartment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-blue-600 text-white" onClick={() => handleEdit(apartment)}>
                            <MdEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-red-600 text-white" onClick={() => handleOpenDelete(apartment.id)}>
                            <MdDelete className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal de détails */}
          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Détails de l'appartement</DialogTitle>
              </DialogHeader>
              {detailApartment && (
                <div className="space-y-2">
                  <img src={detailApartment.images[0]} alt="" className="w-full h-48 object-cover rounded mb-4" />
                  <div><b>Numéro :</b> {detailApartment.numero}</div>
                  <div><b>Superficie :</b> {detailApartment.superficie} m²</div>
                  <div><b>Loyer :</b> {detailApartment.loyer_mensuel.toLocaleString()} FCFA</div>
                  <div><b>État :</b> {detailApartment.etat}</div>
                  <div><b>Type :</b> {detailApartment.type}</div>
                  <div><b>Nombre de pièces :</b> {detailApartment.nombre_pieces}</div>
                  <div><b>Immeuble :</b> {detailApartment.batiment.nom}</div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Modal de confirmation suppression */}
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
              </DialogHeader>
              <div className="mb-4">Voulez-vous vraiment supprimer cet appartement ?</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                  Annuler
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleDelete}>
                  Supprimer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </>
  )
}

export default Apartments 
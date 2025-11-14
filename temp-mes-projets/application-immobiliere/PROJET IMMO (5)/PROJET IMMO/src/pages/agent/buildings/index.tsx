import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Building2, Plus, Search, Edit, Trash2, Home, MapPin, User, Filter, Eye } from "lucide-react"
import { useState } from "react"
import appt1 from "@/assets/app1.jpg"
import appt2 from "@/assets/app2.jpg"
import appt3 from "@/assets/appt3.jpg"
import appt4 from "@/assets/appt4.jpg"
import immeubleImg from "@/assets/immeuble.jpg"
import immImg from "@/assets/imm.jpg"

// Mock data
const initialBuildings = [
  {
    id: 1,
    nom: "Résidence Les Jardins",
    adresse: "10 Rue de la Paix, 75000 Paris",
    nb_appartements: 20,
    nb_occupes: 12,
    proprietaire: "SCI Invest",
    image: immeubleImg,
  },
  {
    id: 2,
    nom: "Résidence Le Parc",
    adresse: "20 Avenue des Fleurs, 75000 Paris",
    nb_appartements: 15,
    nb_occupes: 7,
    proprietaire: "M. Dupont",
    image: immImg,
  }
]

const mockApartmentsByBuilding: { [key: string]: { id: number; numero: string; images: string[] }[] } = {
  1: [
    { id: 1, numero: "A101", images: [appt1, appt2] },
    { id: 2, numero: "A102", images: [appt3] },
  ],
  2: [
    { id: 3, numero: "B201", images: [appt4] },
  ],
}

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState(initialBuildings)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null)
  const [form, setForm] = useState({ nom: "", adresse: "", proprietaire: "" })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [formImage, setFormImage] = useState<string>("")
  const [formOccupes, setFormOccupes] = useState<number>(0)
  const [formLibres, setFormLibres] = useState<number>(0)
  const [isAptsModalOpen, setIsAptsModalOpen] = useState(false)
  const [selectedApts, setSelectedApts] = useState<any[]>([])

  const handleOpenAdd = () => {
    setForm({ nom: "", adresse: "", proprietaire: "" })
    setSelectedBuilding(null)
    setFormImage("")
    setFormOccupes(0)
    setFormLibres(0)
    setIsModalOpen(true)
  }
  const handleOpenEdit = (building: any) => {
    setForm({
      nom: building.nom,
      adresse: building.adresse,
      proprietaire: building.proprietaire
    })
    setSelectedBuilding(building)
    setFormImage(building.image || "")
    setFormOccupes(building.nb_occupes || 0)
    setFormLibres((building.nb_appartements || 0) - (building.nb_occupes || 0))
    setIsModalOpen(true)
  }
  const handleOpenDetail = (building: any) => {
    setSelectedBuilding(building)
    setIsDetailModalOpen(true)
  }
  const handleOpenDelete = (id: number) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }
  const handleDelete = () => {
    setBuildings(buildings.filter(b => b.id !== deleteId))
    setIsDeleteModalOpen(false)
    setDeleteId(null)
  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFormImage(reader.result as string)
    reader.readAsDataURL(file)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedBuilding) {
      setBuildings(buildings.map(b => b.id === selectedBuilding.id ? {
        ...b,
        ...form,
        image: formImage,
        nb_occupes: Number(formOccupes),
        nb_appartements: Number(formOccupes) + Number(formLibres),
      } : b))
    } else {
      setBuildings([...buildings, {
        ...form,
        id: Date.now(),
        image: formImage,
        nb_occupes: Number(formOccupes),
        nb_appartements: Number(formOccupes) + Number(formLibres),
        proprietaire: form.proprietaire,
      }])
    }
    setIsModalOpen(false)
    setFormImage("")
    setFormOccupes(0)
    setFormLibres(0)
  }
  const handleOpenApts = (buildingId: number) => {
    setSelectedApts(mockApartmentsByBuilding[String(buildingId)] || [])
    setIsAptsModalOpen(true)
  }
  const filteredBuildings = buildings.filter(b => b.nom.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Bâtiments</h1>
              <p className="text-blue-600">Gérez vos immeubles et propriétés</p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un bâtiment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedBuilding ? "Modifier le bâtiment" : "Ajouter un bâtiment"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Nom</label>
                    <Input name="nom" value={form.nom} onChange={handleFormChange} required className="h-12 text-lg" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Adresse</label>
                    <Input name="adresse" value={form.adresse} onChange={handleFormChange} required className="h-12 text-lg" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                    {formImage && <img src={formImage} alt="" className="h-20 w-32 object-cover mt-2 rounded" />}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nombre occupés</label>
                    <Input type="number" value={formOccupes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormOccupes(Number(e.target.value))} required className="h-12 text-lg" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Nombre libres</label>
                    <Input type="number" value={formLibres} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormLibres(Number(e.target.value))} required className="h-12 text-lg" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Propriétaire</label>
                    <Input name="proprietaire" value={form.proprietaire} onChange={handleFormChange} required className="h-12 text-lg" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                      Annuler
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                      {selectedBuilding ? "Enregistrer" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <Input 
                placeholder="Rechercher un bâtiment..." 
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400" 
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBuildings.map((b) => (
              <Card key={b.id} className="overflow-hidden border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-blue-50">
                  <img
                    src={b.image || immeubleImg}
                    alt={b.nom}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-blue-900">{b.nom}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleOpenDetail(b)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleOpenEdit(b)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" onClick={() => handleOpenDelete(b.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-700">{b.adresse}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-700">{b.nb_appartements} appartements ({b.nb_occupes} occupés, {b.nb_appartements - b.nb_occupes} libres)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-700">Propriétaire: {b.proprietaire}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-blue-100 bg-blue-50 p-4">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-100" onClick={() => handleOpenApts(b.id)}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Voir les appartements
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Modal de détails */}
          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Détails du bâtiment</DialogTitle>
              </DialogHeader>
              {selectedBuilding && (
                <div className="space-y-2">
                  <img src={selectedBuilding.image || immeubleImg} alt="" className="w-full h-48 object-cover rounded mb-4" />
                  <div><b>Nom :</b> {selectedBuilding.nom}</div>
                  <div><b>Adresse :</b> {selectedBuilding.adresse}</div>
                  <div><b>Nombre d'appartements :</b> {selectedBuilding.nb_appartements}</div>
                  <div><b>Propriétaire :</b> {selectedBuilding.proprietaire}</div>
                  <div><b>Occupés :</b> {selectedBuilding.nb_occupes}</div>
                  <div><b>Libres :</b> {selectedBuilding.nb_appartements - selectedBuilding.nb_occupes}</div>
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
              <div className="mb-4">Voulez-vous vraiment supprimer ce bâtiment ?</div>
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

          {/* Modal d'appartements */}
          <Dialog open={isAptsModalOpen} onOpenChange={setIsAptsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Appartements du bâtiment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {selectedApts.map(apt => (
                  <div key={apt.id} className="border rounded p-2">
                    <div className="font-bold mb-2">{apt.numero}</div>
                    {apt.images.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt="" className="h-16 w-24 object-cover rounded mb-1" />
                    ))}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </>
  )
}

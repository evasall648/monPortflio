import React, { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

// Import des images locales
import user1 from "@/assets/users4.png";
import user2 from "@/assets/user.jpg";
import user3 from "@/assets/users.jpg";
import user4 from "@/assets/users.jpg";
import user5 from "@/assets/users4.png";

interface Locataire {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  indicatif: string;
  email: string;
  piece_identite: string;
  photo: string;
}

interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
  indicatif: string;
  email: string;
  piece_identite: string;
  photo: string;
}

const paysIndicatifs = [
  { code: "FR", indicatif: "+33", nom: "France" },
  { code: "SN", indicatif: "+221", nom: "Sénégal" },
  { code: "CI", indicatif: "+225", nom: "Côte d'Ivoire" },
  { code: "CM", indicatif: "+237", nom: "Cameroun" },
  { code: "ML", indicatif: "+223", nom: "Mali" },
  { code: "BF", indicatif: "+226", nom: "Burkina Faso" },
  { code: "BJ", indicatif: "+229", nom: "Bénin" },
  { code: "TG", indicatif: "+228", nom: "Togo" },
  { code: "NE", indicatif: "+227", nom: "Niger" },
  { code: "GA", indicatif: "+241", nom: "Gabon" },
];

const initialLocataires: Locataire[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    telephone: "601020304",
    indicatif: "+33",
    email: "jean.dupont@email.com",
    piece_identite: "AB123456",
    photo: user1,
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Claire",
    telephone: "605060708",
    indicatif: "+221",
    email: "claire.martin@email.com",
    piece_identite: "CD789012",
    photo: user2,
  },
  {
    id: 3,
    nom: "Nguyen",
    prenom: "Thierry",
    telephone: "609080706",
    indicatif: "+225",
    email: "thierry.nguyen@email.com",
    piece_identite: "EF345678",
    photo: user3,
  },
  {
    id: 4,
    nom: "Diallo",
    prenom: "Aminata",
    telephone: "611121314",
    indicatif: "+237",
    email: "aminata.diallo@email.com",
    piece_identite: "GH901234",
    photo: user4,
  },
  {
    id: 5,
    nom: "Rossi",
    prenom: "Marco",
    telephone: "615161718",
    indicatif: "+223",
    email: "marco.rossi@email.com",
    piece_identite: "IJ567890",
    photo: user5,
  },
];

export default function TenantsPage() {
  const [locataires, setLocataires] = useState<Locataire[]>(initialLocataires);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    telephone: "",
    indicatif: "+33",
    email: "",
    piece_identite: "",
    photo: "",
  });
  const [selectedLocataire, setSelectedLocataire] = useState<Locataire | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDetail, setShowDetail] = useState<Locataire | null>(null);
  const [showDelete, setShowDelete] = useState<Locataire | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setFormData((prev) => ({ ...prev, photo: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    setFormData({
      nom: "",
      prenom: "",
      telephone: "",
      indicatif: "+33",
      email: "",
      piece_identite: "",
      photo: "",
    });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (loc: Locataire) => {
    setFormData({
      nom: loc.nom,
      prenom: loc.prenom,
      telephone: loc.telephone,
      indicatif: loc.indicatif,
      email: loc.email,
      piece_identite: loc.piece_identite,
      photo: loc.photo,
    });
    setSelectedLocataire(loc);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && selectedLocataire) {
      setLocataires((prev) =>
        prev.map((l) =>
          l.id === selectedLocataire.id ? { ...l, ...formData } : l
        )
      );
    } else {
      setLocataires((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setShowForm(false);
    setSelectedLocataire(null);
  };

  const handleDelete = () => {
    if (showDelete) {
      setLocataires((prev) => prev.filter((l) => l.id !== showDelete.id));
      setShowDelete(null);
    }
  };

  return (
    <>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Locataires</h1>
              <p className="text-blue-600">Gérez vos locataires</p>
            </div>
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter locataire
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{isEdit ? "Modifier le locataire" : "Ajouter un locataire"}</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-1 font-medium">Nom</label>
                    <Input name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Prénom</label>
                    <Input name="prenom" value={formData.prenom} onChange={handleChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-medium">Indicatif téléphonique</label>
                      <Select
                        value={formData.indicatif}
                        onValueChange={(value) => setFormData({ ...formData, indicatif: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {paysIndicatifs.map((pays) => (
                            <SelectItem key={pays.code} value={pays.indicatif}>
                              {pays.nom} ({pays.indicatif})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Téléphone</label>
                      <Input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="6XXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Pièce d'identité</label>
                    <Input name="piece_identite" value={formData.piece_identite} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Photo</label>
                    <Input type="file" accept="image/*" onChange={handlePhotoChange} />
                    {formData.photo && (
                      <img src={formData.photo} alt="locataire" className="h-16 w-16 object-cover rounded mt-2" />
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                      {isEdit ? "Enregistrer" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pièce d'identité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locataires.map((loc) => (
                  <tr key={loc.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={loc.photo} alt="locataire" className="h-10 w-10 object-cover rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{loc.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loc.prenom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loc.indicatif} {loc.telephone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loc.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{loc.piece_identite}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-600 text-white" onClick={() => setShowDetail(loc)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-blue-600 text-white" onClick={() => handleEdit(loc)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-red-600 text-white" onClick={() => setShowDelete(loc)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modale de détail */}
          <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Détail du locataire</DialogTitle>
              </DialogHeader>
              {showDetail && (
                <div className="space-y-2">
                  <img src={showDetail.photo} alt="locataire" className="h-20 w-20 object-cover rounded-full mx-auto mb-2" />
                  <div><b>Nom :</b> {showDetail.nom}</div>
                  <div><b>Prénom :</b> {showDetail.prenom}</div>
                  <div><b>Téléphone :</b> {showDetail.indicatif} {showDetail.telephone}</div>
                  <div><b>Email :</b> {showDetail.email}</div>
                  <div><b>Pièce d'identité :</b> {showDetail.piece_identite}</div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Modale de confirmation suppression */}
          <Dialog open={!!showDelete} onOpenChange={() => setShowDelete(null)}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
              </DialogHeader>
              <div className="mb-4">Voulez-vous vraiment supprimer ce locataire ?</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDelete(null)}>
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
  );
}

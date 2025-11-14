import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import PaiementFormModal from "./PaiementFormModal";
import PaiementsTable from "./PaiementsTable";

interface Paiement {
  id: string;
  locataire: string;
  typePaiement: string;
  date: string;
  montant: number;
  statut: "Reçu" | "En cours" | "En retard";
  appartement?: string;
  periode?: string;
}

// Données de test
const paiementsMock: Paiement[] = [
  {
    id: "1",
    locataire: "John Doe",
    typePaiement: "Loyer",
    date: "2024-03-15",
    montant: 150000,
    statut: "Reçu",
    appartement: "A101",
    periode: "Mars 2024"
  },
  {
    id: "2",
    locataire: "Jane Smith",
    typePaiement: "Charges",
    date: "2024-03-14",
    montant: 25000,
    statut: "En cours",
    appartement: "B203",
    periode: "Mars 2024"
  },
  {
    id: "3",
    locataire: "Bob Johnson",
    typePaiement: "Loyer",
    date: "2024-03-10",
    montant: 120000,
    statut: "En retard",
    appartement: "C305",
    periode: "Mars 2024"
  }
];

export default function PaiementsDashboard() {
  const { toast } = useToast()
  const [paiements, setPaiements] = useState<Paiement[]>(paiementsMock);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddPaiement = (newPaiement: Omit<Paiement, "id">) => {
    const paiement: Paiement = {
      ...newPaiement,
      id: Math.random().toString(36).substr(2, 9)
    };
    setPaiements([...paiements, paiement]);
    toast({
      title: "Paiement ajouté",
      description: "Le paiement a été ajouté avec succès",
    });
  };

  const handleEditPaiement = (id: string, updatedPaiement: Omit<Paiement, "id">) => {
    setPaiements(paiements.map(p => 
      p.id === id ? { ...updatedPaiement, id } : p
    ));
    toast({
      title: "Paiement modifié",
      description: "Le paiement a été modifié avec succès",
    });
  };

  const handleDeletePaiement = (id: string) => {
    setPaiements(paiements.filter(p => p.id !== id));
  };

  const filteredPaiements = paiements.filter(paiement => 
    paiement.locataire.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paiement.typePaiement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paiement.appartement?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paiement.periode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPaiements = paiements.reduce((sum, p) => sum + p.montant, 0);
  const paiementsRecus = paiements.filter(p => p.statut === "Reçu").length;
  const paiementsEnRetard = paiements.filter(p => p.statut === "En retard").length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Gestion des Paiements</h1>
        <p className="text-gray-600">Gérez les paiements des locataires et suivez leur statut</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total des Paiements</h3>
          <p className="text-2xl font-bold text-blue-600">
            {totalPaiements.toLocaleString("fr-FR", { style: "currency", currency: "XOF" })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Paiements Reçus</h3>
          <p className="text-2xl font-bold text-green-600">{paiementsRecus}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Paiements en Retard</h3>
          <p className="text-2xl font-bold text-red-600">{paiementsEnRetard}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Liste des Paiements</h2>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un paiement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Paiement
            </Button>
          </div>
        </div>

        <PaiementsTable
          paiements={filteredPaiements}
          onEdit={handleEditPaiement}
          onDelete={handleDeletePaiement}
        />
      </div>

      {showModal && (
        <PaiementFormModal
          onClose={() => setShowModal(false)}
          onSave={handleAddPaiement}
        />
      )}
    </div>
  );
} 
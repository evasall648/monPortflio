import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Trash2, Download, RotateCcw } from "lucide-react"
import PaiementFormModal from "./PaiementFormModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

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

interface Props {
  paiements: Paiement[];
  onEdit: (id: string, updatedPaiement: Omit<Paiement, "id">) => void;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
}

function formatMontant(montant: number) {
  return montant.toLocaleString("fr-FR", { style: "currency", currency: "XOF" });
}

export default function PaiementsTable({ paiements, onEdit, onDelete, onRestore }: Props) {
  const { toast } = useToast()
  const [editingPaiement, setEditingPaiement] = useState<Paiement | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null);

  const handleEdit = (paiement: Paiement) => {
    setEditingPaiement(paiement);
  };

  const handleDelete = (paiement: Paiement) => {
    setSelectedPaiement(paiement);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedPaiement) {
      onDelete(selectedPaiement.id);
      toast({
        title: "Suppression réussie",
        description: "Le paiement a été supprimé",
      });
      setShowDeleteDialog(false);
      setSelectedPaiement(null);
    }
  };

  const handleSaveEdit = (updatedPaiement: Omit<Paiement, "id">) => {
    if (editingPaiement) {
      onEdit(editingPaiement.id, updatedPaiement);
      setEditingPaiement(null);
    }
  };

  const handleDownload = (paiement: Paiement) => {
    try {
      const content = `
        Reçu de paiement
        ===============
        
        Locataire: ${paiement.locataire}
        Type: ${paiement.typePaiement}
        Montant: ${formatMontant(paiement.montant)}
        Date: ${new Date(paiement.date).toLocaleDateString()}
        Appartement: ${paiement.appartement || 'Non spécifié'}
        Période: ${paiement.periode || 'Non spécifiée'}
        
        Statut: ${paiement.statut}
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recu_paiement_${paiement.id}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Téléchargement réussi",
        description: "Le reçu a été téléchargé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le reçu",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="rounded-md border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
              <th className="px-4 py-3">Locataire</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paiements.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-4 py-3">{p.locataire}</td>
                <td className="px-4 py-3">{p.typePaiement}</td>
                <td className="px-4 py-3">{new Date(p.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{formatMontant(p.montant)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.statut === "Reçu"
                        ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                        : p.statut === "En retard"
                        ? "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
                        : "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                    }
                  >
                    {p.statut}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    {!onRestore && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleEdit(p)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleDownload(p)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleDelete(p)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {onRestore && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleDelete(p)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => onRestore(p.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPaiement && (
        <PaiementFormModal
          onClose={() => setEditingPaiement(null)}
          onSave={handleSaveEdit}
          initialValues={editingPaiement}
        />
      )}

      {/* Dialog de confirmation de suppression */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le paiement de {selectedPaiement?.locataire} ? 
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedPaiement(null);
              }}
            >
              Annuler
            </Button>
            <Button 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={confirmDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 
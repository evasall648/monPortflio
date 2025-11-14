import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

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
  onClose: () => void;
  onSave: (p: Omit<Paiement, "id">) => void;
  initialValues?: Paiement;
}

export default function PaiementFormModal({ onClose, onSave, initialValues }: Props) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    locataire: "",
    typePaiement: "Loyer",
    date: "",
    montant: "",
    statut: "Reçu" as Paiement["statut"],
    appartement: "",
    periode: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        locataire: initialValues.locataire,
        typePaiement: initialValues.typePaiement,
        date: initialValues.date,
        montant: initialValues.montant.toString(),
        statut: initialValues.statut,
        appartement: initialValues.appartement || "",
        periode: initialValues.periode || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave({ ...form, montant: Number(form.montant) });
      toast({
        title: "Succès",
        description: initialValues ? "Paiement modifié avec succès" : "Paiement enregistré avec succès",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Modifier le paiement" : "Nouveau paiement"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Locataire</label>
            <Input
              name="locataire"
              placeholder="Nom du locataire"
              value={form.locataire}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type de paiement</label>
            <select
              name="typePaiement"
              className="w-full border rounded-md p-2"
              value={form.typePaiement}
              onChange={handleChange}
            >
              <option value="Loyer">Loyer</option>
              <option value="Charges">Charges</option>
              <option value="Caution">Caution</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Montant (FCFA)</label>
            <Input
              name="montant"
              type="number"
              placeholder="Montant"
              value={form.montant}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Appartement</label>
            <Input
              name="appartement"
              placeholder="Référence de l'appartement"
              value={form.appartement}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Période</label>
            <Input
              name="periode"
              placeholder="Période concernée"
              value={form.periode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              name="statut"
              className="w-full border rounded-md p-2"
              value={form.statut}
              onChange={handleChange}
            >
              <option value="Reçu">Reçu</option>
              <option value="En cours">En cours</option>
              <option value="En retard">En retard</option>
            </select>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {initialValues ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
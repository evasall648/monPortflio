import React, { useState, useEffect } from 'react';

interface NewContractFormProps {
  onClose: () => void;
  onSubmit: (contractData: ContractData) => void;
  editData?: ContractData;
  isEditing?: boolean;
}

export interface ContractData {
  nom: string;
  prenom: string;
  appartement: string;
  caution: number;
  avance: number;
  montantTotal: number;
  fraisTotal: number;
  pourcentageRetard: number;
  joursAjoutes: number;
  prochaineDatePaiement: string;
  dateDebut: string;
  dateFin: string;
  etat: 'actif' | 'en cours' | 'résilié';
}

const NewContractForm: React.FC<NewContractFormProps> = ({ onClose, onSubmit, editData, isEditing = false }) => {
  const [formData, setFormData] = useState<ContractData>({
    nom: '',
    prenom: '',
    appartement: '',
    caution: 3,
    avance: 3,
    montantTotal: 240000,
    fraisTotal: 0,
    pourcentageRetard: 0,
    joursAjoutes: 0,
    prochaineDatePaiement: '',
    dateDebut: '',
    dateFin: '',
    etat: 'actif'
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'montantTotal' || name === 'caution' || name === 'avance' || 
              name === 'pourcentageRetard' || name === 'joursAjoutes' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifier le Contrat' : 'Nouveau Contrat'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Appartement</label>
              <input
                type="text"
                name="appartement"
                value={formData.appartement}
                onChange={handleChange}
                required
                placeholder="Ex: Résidence 5, Appartement 10"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Caution (en mois)</label>
              <input
                type="number"
                name="caution"
                value={formData.caution}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Avance (en mois)</label>
              <input
                type="number"
                name="avance"
                value={formData.avance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Montant total locatif (FCFA)</label>
              <input
                type="number"
                name="montantTotal"
                value={formData.montantTotal}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pourcentage en cas de retard (%)</label>
              <input
                type="number"
                name="pourcentageRetard"
                value={formData.pourcentageRetard}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jours ajoutés à la date de paiement</label>
              <input
                type="number"
                name="joursAjoutes"
                value={formData.joursAjoutes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prochaine date de paiement</label>
              <input
                type="date"
                name="prochaineDatePaiement"
                value={formData.prochaineDatePaiement}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date début contrat</label>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date fin contrat</label>
              <input
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">État</label>
              <select
                name="etat"
                value={formData.etat}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="actif">Actif</option>
                <option value="en cours">En cours</option>
                <option value="résilié">Résilié</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Modifier le contrat' : 'Créer le contrat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewContractForm; 
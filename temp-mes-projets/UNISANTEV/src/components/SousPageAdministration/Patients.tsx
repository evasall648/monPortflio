import React, { useState } from "react";

interface Patient {
  id: number;
  date_naissance: string;
  telephone: string;
  utilisateur_id: number;
  genre: string;
  nom: string;
  prenom: string;
}

const dbPatients = [
  { id: 1, date_naissance: "2000-01-01", telephone: "770000000", utilisateur_id: 5, genre: "F" },
  { id: 2, date_naissance: "1999-10-22", telephone: "770000000", utilisateur_id: 6, genre: "F" },
  { id: 3, date_naissance: "1998-05-10", telephone: "771000000", utilisateur_id: 7, genre: "F" },
  { id: 4, date_naissance: "1995-02-01", telephone: "771000002", utilisateur_id: 8, genre: "F" },
  { id: 5, date_naissance: "1990-06-08", telephone: "771000005", utilisateur_id: 9, genre: "F" },
  { id: 6, date_naissance: "1991-07-25", telephone: "771000002", utilisateur_id: 10, genre: "F" },
  { id: 7, date_naissance: "2003-09-02", telephone: "771000045", utilisateur_id: 11, genre: "F" },
  { id: 8, date_naissance: "2005-10-01", telephone: "771000047", utilisateur_id: 12, genre: "F" },
  { id: 9, date_naissance: "1997-11-12", telephone: "773020000", utilisateur_id: 13, genre: "M" },
  { id: 10, date_naissance: "1998-01-01", telephone: "772000000", utilisateur_id: 14, genre: "M" },
  { id: 11, date_naissance: "1980-03-24", telephone: "771000008", utilisateur_id: 61, genre: "M" },
  { id: 12, date_naissance: "1995-09-13", telephone: "771009087", utilisateur_id: 62, genre: "F" },
  { id: 13, date_naissance: "1990-01-01", telephone: "771000456", utilisateur_id: 63, genre: "M" },
  { id: 14, date_naissance: "2001-08-04", telephone: "771110000", utilisateur_id: 64, genre: "M" },
  { id: 15, date_naissance: "2000-12-14", telephone: "771070000", utilisateur_id: 65, genre: "F" },
  { id: 16, date_naissance: "1989-02-01", telephone: "771000605", utilisateur_id: 66, genre: "M" },
  { id: 17, date_naissance: "1985-06-03", telephone: "770023000", utilisateur_id: 60, genre: "F" },
];

const utilisateurs = [
  { id: 5, nom: "Sall", prenom: "Ndeye" },
  { id: 6, nom: "Diop", prenom: "Thiané" },
  { id: 7, nom: "Ba", prenom: "Aissatou" },
  { id: 8, nom: "Sy", prenom: "Rokhaya" },
  { id: 9, nom: "Fall", prenom: "Awa" },
  { id: 10, nom: "Gaye", prenom: "Khady" },
  { id: 11, nom: "Ndour", prenom: "Fatou" },
  { id: 12, nom: "Mbaye", prenom: "Joséphine" },
  { id: 13, nom: "Sene", prenom: "Moussa" },
  { id: 14, nom: "Faye", prenom: "Cheickou" },
  { id: 60, nom: "Sakho", prenom: "Mame Astou" },
  { id: 61, nom: "Sagnane", prenom: "Modou" },
  { id: 62, nom: "Sembéne", prenom: "Fatou" },
  { id: 63, nom: "Senghor", prenom: "Léopold" },
  { id: 64, nom: "Faye", prenom: "Malick" },
  { id: 65, nom: "Makaya", prenom: "Ramatoulaye" },
  { id: 66, nom: "Tall", prenom: "Khalilou" },
];

const initialPatients: Patient[] = dbPatients.map((dbPatient) => {
  const utilisateur = utilisateurs.find((u) => u.id === dbPatient.utilisateur_id);
  return {
    ...dbPatient,
    nom: utilisateur ? utilisateur.nom : "Inconnu",
    prenom: utilisateur ? utilisateur.prenom : "Inconnu",
  };
});

const diseases = [
  "Paludisme",
  "Dengue",
  "Grippe",
  "Appendicite",
  "Pneumonie",
  "Toux chronique",
  "Fracture",
  "Cholestérol",
  "Mal de tête",
  "Anémie",
  "Diabète",
  "Hypertension",
  "Asthme",
  "Bronchite",
  "Gastro-entérite",
  "Rhume",
  "Allergie",
];

const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

const Patients: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsList, setPatientsList] = useState<Patient[]>(initialPatients);
  const [deletedPatients, setDeletedPatients] = useState<number[]>([]);
  const [newPatient, setNewPatient] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    telephone: "",
    genre: "M",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  const filteredPatients = patientsList.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    const isIdSearch = /^\d+$/.test(searchTerm); // Vérifie si le terme est un ID (nombre)
    if (isIdSearch) {
      return patient.id.toString() === searchTerm; // Affiche uniquement le patient avec cet ID
    }
    return (
      patient.id.toString().includes(searchLower) ||
      patient.nom.toLowerCase().includes(searchLower) ||
      patient.prenom.toLowerCase().includes(searchLower) ||
      patient.telephone.includes(searchTerm) ||
      patient.date_naissance.includes(searchTerm)
    );
  });

  const handleDelete = (id: number) => {
    setDeletedPatients([...deletedPatients, id]);
    setPatientsList(patientsList.filter((patient) => patient.id !== id));
    setShowDeleteConfirm(null); // Ferme la boîte de dialogue après suppression
  };

  const handleRestore = (id: number) => {
    setDeletedPatients(deletedPatients.filter((pId) => pId !== id));
    const restoredPatient = initialPatients.find((p) => p.id === id);
    if (restoredPatient) {
      setPatientsList([...patientsList, restoredPatient]);
    }
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      patientsList.length > 0 ? Math.max(...patientsList.map((p) => p.id)) + 1 : 1;

    const patientToAdd: Patient = {
      id: newId,
      ...newPatient,
      utilisateur_id: newId + 100, // Génération simplifiée d'ID utilisateur
      genre: newPatient.genre as "M" | "F",
    };

    setPatientsList([...patientsList, patientToAdd]);
    setNewPatient({ nom: "", prenom: "", date_naissance: "", telephone: "", genre: "M" });
    setShowForm(false);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditPatient(patient);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editPatient) {
      setPatientsList(patientsList.map(patient => patient.id === editPatient.id ? editPatient : patient));
      setEditPatient(null);
    }
  };

  const bloodGroupStyle = (bg: string) => {
    const base = "px-3 py-1 rounded-full text-sm font-semibold ";
    switch (bg) {
      case "A+":
        return base + "bg-red-100 text-red-800";
      case "B+":
        return base + "bg-green-100 text-green-800";
      case "AB+":
        return base + "bg-green-100 text-green-800";
      case "O+":
        return base + "bg-yellow-100 text-yellow-800";
      default:
        return base + "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Rechercher par ID, nom, téléphone..."
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            {showForm ? "Annuler" : "➕ Nouveau Patient"}
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <form onSubmit={handleAddPatient} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Nouveau Patient</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                required
                title="Nom du patient"
                placeholder="Entrez le nom"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={newPatient.nom}
                onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                required
                title="Prénom du patient"
                placeholder="Entrez le prénom"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={newPatient.prenom}
                onChange={(e) => setNewPatient({ ...newPatient, prenom: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de Naissance</label>
              <input
                type="date"
                required
                title="Date de naissance du patient"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={newPatient.date_naissance}
                onChange={(e) => setNewPatient({ ...newPatient, date_naissance: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                required
                title="Numéro de téléphone du patient"
                placeholder="Entrez le téléphone"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={newPatient.telephone}
                onChange={(e) => setNewPatient({ ...newPatient, telephone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <select
                title="Sélectionnez le genre"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={newPatient.genre}
                onChange={(e) => setNewPatient({ ...newPatient, genre: e.target.value })}
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}

      {/* Formulaire d'édition */}
      {editPatient && (
        <form onSubmit={handleSaveEdit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Modifier Patient</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                required
                title="Nom du patient"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={editPatient.nom}
                onChange={(e) => setEditPatient({ ...editPatient, nom: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                required
                title="Prénom du patient"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={editPatient.prenom}
                onChange={(e) => setEditPatient({ ...editPatient, prenom: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de Naissance</label>
              <input
                type="date"
                required
                title="Date de naissance du patient"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={editPatient.date_naissance}
                onChange={(e) => setEditPatient({ ...editPatient, date_naissance: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                required
                title="Numéro de téléphone du patient"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={editPatient.telephone}
                onChange={(e) => setEditPatient({ ...editPatient, telephone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <select
                title="Sélectionnez le genre"
                className="mt-1 block w-full border rounded-md px-3 py-2"
                value={editPatient.genre}
                onChange={(e) => setEditPatient({ ...editPatient, genre: e.target.value })}
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Enregistrer
            </button>
            <button
              onClick={() => setEditPatient(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Premier tableau avec titre intégré */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                colSpan={7}
                className="px-6 py-3 text-left text-xl font-bold text-gray-800"
              >
                Gestion des Patients
              </th>
            </tr>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date de Naissance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{patient.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.date_naissance}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      patient.genre === "M"
                        ? "bg-green-100 text-green-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {patient.genre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  {deletedPatients.includes(patient.id) ? (
                    <button
                      onClick={() => handleRestore(patient.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Annuler suppression
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowDeleteConfirm(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-green-600 hover:text-green-900"
                      >
                        ✏️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boîte de dialogue de confirmation */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Es-tu sûr ?</h3>
            {(() => {
              const patient = patientsList.find((p) => p.id === showDeleteConfirm);
              return patient ? (
                <div className="mb-4">
                  <p>
                    Nom: {patient.nom} {patient.prenom}
                  </p>
                  <p>Téléphone: {patient.telephone}</p>
                  <p>Date de Naissance: {patient.date_naissance}</p>
                </div>
              ) : null;
            })()}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deuxième tableau */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom Complet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Maladie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Groupe Sanguin
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patientsList.map((patient) => {
              const treatment = diseases[patient.id % diseases.length];
              const bloodGroup = bloodGroups[patient.id % bloodGroups.length];
              return (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.prenom} {patient.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{treatment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={bloodGroupStyle(bloodGroup)}>{bloodGroup}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
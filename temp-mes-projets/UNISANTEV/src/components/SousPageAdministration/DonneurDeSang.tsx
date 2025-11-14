import React, { useState } from "react";


interface BloodDonor {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  status: string;
  lastDonationDate: string;
  nextDonationDate: string;
  location: string;
}

const initialDonors: BloodDonor[] = [
  {
    id: "D001",
    name: "Aminata Diop",
    dateOfBirth: "05/08/1990",
    gender: "Féminin",
    bloodGroup: "O+",
    phone: "+221 77 123 45 67",
    email: "aminata.diop@example.com",
    status: "Actif",
    lastDonationDate: "01/03/2024",
    nextDonationDate: "07/03/2024",
    location: "Dakar",
  },
  {
    id: "D002",
    name: "Moussa Fall",
    dateOfBirth: "12/11/1985",
    gender: "Masculin",
    bloodGroup: "A+",
    phone: "+221 76 234 56 78",
    email: "moussa.fall@example.com",
    status: "Actif",
    lastDonationDate: "15/02/2024",
    nextDonationDate: "15/08/2024",
    location: "Thiès",
  },
  {
    id: "D003",
    name: "Fatou Ndiaye",
    dateOfBirth: "23/04/1995",
    gender: "Féminin",
    bloodGroup: "B+",
    phone: "+221 70 345 67 89",
    email: "fatou.ndiaye@example.com",
    status: "Inactif",
    lastDonationDate: "10/12/2023",
    nextDonationDate: "10/06/2024",
    location: "Saint-Louis",
  },
  {
    id: "D004",
    name: "Ibrahima Gueye",
    dateOfBirth: "14/07/1988",
    gender: "Masculin",
    bloodGroup: "AB+",
    phone: "+221 77 456 78 90",
    email: "ibrahima.gueye@example.com",
    status: "Actif",
    lastDonationDate: "20/01/2024",
    nextDonationDate: "20/07/2024",
    location: "Kaolack",
  },
  {
    id: "D005",
    name: "Khadija Mbaye",
    dateOfBirth: "30/09/1992",
    gender: "Féminin",
    bloodGroup: "O-",
    phone: "+221 76 567 89 01",
    email: "khadija.mbaye@example.com",
    status: "Actif",
    lastDonationDate: "05/03/2024",
    nextDonationDate: "05/09/2024",
    location: "Ziguinchor",
  },
  {
    id: "D006",
    name: "Cheikh Diouf",
    dateOfBirth: "18/02/1980",
    gender: "Masculin",
    bloodGroup: "A-",
    phone: "+221 70 678 90 12",
    email: "cheikh.diouf@example.com",
    status: "Inactif",
    lastDonationDate: "15/11/2023",
    nextDonationDate: "15/05/2024",
    location: "Mbour",
  },
  {
    id: "D007",
    name: "Aïssatou Diallo",
    dateOfBirth: "09/06/1998",
    gender: "Féminin",
    bloodGroup: "B-",
    phone: "+221 77 789 01 23",
    email: "aissatou.diallo@example.com",
    status: "Actif",
    lastDonationDate: "28/02/2024",
    nextDonationDate: "28/08/2024",
    location: "Rufisque",
  },
  {
    id: "D008",
    name: "Oumar Sow",
    dateOfBirth: "22/12/1975",
    gender: "Masculin",
    bloodGroup: "AB-",
    phone: "+221 76 890 12 34",
    email: "oumar.sow@example.com",
    status: "Actif",
    lastDonationDate: "10/01/2024",
    nextDonationDate: "10/07/2024",
    location: "Tambacounda",
  },
  {
    id: "D009",
    name: "Mariama Camara",
    dateOfBirth: "17/05/2000",
    gender: "Féminin",
    bloodGroup: "O+",
    phone: "+221 70 901 23 45",
    email: "mariama.camara@example.com",
    status: "Inactif",
    lastDonationDate: "01/01/2024",
    nextDonationDate: "01/07/2024",
    location: "Kolda",
  },
  {
    id: "D010",
    name: "Papa Ndiaye",
    dateOfBirth: "04/10/1993",
    gender: "Masculin",
    bloodGroup: "A+",
    phone: "+221 77 012 34 56",
    email: "papa.ndiaye@example.com",
    status: "Actif",
    lastDonationDate: "14/03/2024",
    nextDonationDate: "14/09/2024",
    location: "Diourbel",
  
  },

];

const DonneurDeSang: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [donors, setDonors] = useState<BloodDonor[]>(initialDonors);
  const [newDonor, setNewDonor] = useState<BloodDonor>({
    id: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    status: "Actif",
    lastDonationDate: "",
    nextDonationDate: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewDonor({
      id: "",
      name: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      email: "",
      status: "Actif",
      lastDonationDate: "",
      nextDonationDate: "",
      location: "",
    });
  };

  const handleEdit = (donor: BloodDonor) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setNewDonor(donor);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce donneur ?")) {
      setDonors(donors.filter((donor) => donor.id !== id));
    }
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        [
          "ID",
          "Nom",
          "Date de naissance",
          "Genre",
          "Groupe sanguin",
          "Téléphone",
          "Email",
          "Statut",
          "Dernier don",
          "Prochain don",
          "Emplacement",
        ].join(","),
        ...donors.map((donor) =>
          [
            donor.id,
            donor.name,
            donor.dateOfBirth,
            donor.gender,
            donor.bloodGroup,
            donor.phone,
            donor.email,
            donor.status,
            donor.lastDonationDate,
            donor.nextDonationDate,
            donor.location,
          ].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donneurs_de_sang.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveDonor = () => {
    if (newDonor.name && newDonor.bloodGroup) {
      if (isEditing) {
        setDonors(donors.map((donor) => (donor.id === newDonor.id ? newDonor : donor)));
      } else {
        setDonors([...donors, { ...newDonor, id: `D${donors.length + 1}` }]);
      }
      setIsModalOpen(false);
      alert(isEditing ? "Donneur modifié avec succès !" : "Donneur ajouté avec succès !");
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
     
        <div className="flex items-center space-x-2">
          <input
            type="search"
            placeholder="Rechercher un donneur"
            className="border rounded px-2 py-1 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ➕ Ajouter
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ⬇️ CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Date de naissance</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Groupe</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Dernier don</th>
              <th className="p-3 text-left">Prochain don</th>
              <th className="p-3 text-left">Localisation</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor.id} className="hover:bg-gray-50">
                <td className="p-3">{donor.id}</td>
                <td className="p-3">{donor.name}</td>
                <td className="p-3">{donor.dateOfBirth}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      donor.gender === "Masculin" ? "bg-green-100 text-green-800" : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {donor.gender}
                  </span>
                </td>
                <td className="p-3 font-bold">{donor.bloodGroup}</td>
                <td className="p-3">{donor.phone}</td>
                <td className="p-3">{donor.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      donor.status === "Actif"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donor.status}
                  </span>
                </td>
                <td className="p-3">{donor.lastDonationDate}</td>
                <td className="p-3">{donor.nextDonationDate}</td>
                <td className="p-3">{donor.location}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleEdit(donor)}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(donor.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Modifier le donneur" : "Ajouter un nouveau donneur"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block mb-2">Nom complet</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date de naissance</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={newDonor.dateOfBirth}
                  onChange={(e) => setNewDonor({ ...newDonor, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Genre</label>
                <select
                  className="w-full p-2 border rounded"
                  value={newDonor.gender}
                  onChange={(e) => setNewDonor({ ...newDonor, gender: e.target.value })}
                >
                  <option value="">Sélectionner</option>
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Groupe sanguin</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDonor.bloodGroup}
                  onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  value={newDonor.phone}
                  onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={newDonor.email}
                  onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block mb-2">Adresse</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDonor.location}
                  onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveDonor}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {isEditing ? "Modifier" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonneurDeSang;
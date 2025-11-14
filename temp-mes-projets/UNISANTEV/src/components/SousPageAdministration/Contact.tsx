import React, { useState } from 'react';

// Interface for Medecin
interface Medecin {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  imageProfil?: string;
}

// Interface for Patient
interface Patient {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
}

// Type for a generic contact
type Contact = Medecin | Patient;

const initialMedecins: Medecin[] = [
  { nom: 'Badji', prenom: 'Fatou', email: 'Fatoubadji2@gmail.com', telephone: '771000001', adresse: 'Avenue Cheikh Anta Diop, Dakar' },
  { nom: 'Diallo', prenom: 'Khadidiatou', email: 'Diallokhadia@gmail.com', telephone: '771000002', adresse: 'Rue Carnot, Dakar-Plateau' },
  { nom: 'Kane', prenom: 'Mariama', email: 'Mariamakane@gmail.com', telephone: '771000003', adresse: 'Boulevard de la République, Dakar' },
  { nom: 'Basséne', prenom: 'Linda', email: 'Lindabassene@gmail.com', telephone: '771000004', adresse: 'Rue de Thiong, Dakar' },
  { nom: 'Gueye', prenom: 'Fatima', email: 'Fatimagueye@gmail.com', telephone: '771000005', adresse: 'Avenue Blaise Diagne, Dakar' },
  { nom: 'Dieng', prenom: 'Ndeye Awa', email: 'evadieng75@gmail.com', telephone: '771000006', adresse: 'Rue de la Poste, Dakar' },
  { nom: 'Sall', prenom: 'Awa', email: 'evasall648@gmail.com', telephone: '771000007', adresse: 'Rue Jean de la Fontaine, Dakar' },
  { nom: 'Keita', prenom: 'Hawa Demba', email: '77249373760aliciakeita@gmail.com', telephone: '771000008', adresse: 'Boulangerie Jaune, Sacré-Cœur 3' },
  { nom: 'Correa', prenom: 'Adéline', email: 'Adelinecorreae@gmail.com', telephone: '771000009', adresse: 'Rue 10, Grand-Dakar' },
  { nom: 'Sarr', prenom: 'Mariata', email: 'Mariatasarr@gmail.com', telephone: '771000010', adresse: 'Rue Lac Rose, Niarry Tally' },
  { nom: 'Barry', prenom: 'Khadija', email: 'khadijabarry@gmail.com', telephone: '771000011', adresse: 'Liberté 6, Dakar' },
  { nom: 'Memiague', prenom: 'Kris', email: 'kris.memeiaghe@gmail.com', telephone: '771000012', adresse: 'Rue 25, Niarry Tally' },
  { nom: 'Bakana', prenom: 'Danicha', email: 'bakanadanicha@gmail.com', telephone: '771000013', adresse: 'Rue 10, Liberté 3' },
  { nom: 'Ndiaye', prenom: 'Mody Yero', email: 'Modyyero@gmail.com', telephone: '771000014', adresse: 'Pikine, Dakar' },
  { nom: 'Badji', prenom: 'Nafi', email: 'Badjinafi@gmail.com', telephone: '771000015', adresse: 'Rue 22 Angle Moussé, Médina' },
  { nom: 'Coulibaly', prenom: 'Khadija', email: 'Coulibaly12khadija@gmail.com', telephone: '771000016', adresse: 'Boulevard du Centenaire, Dakar' },
  { nom: 'Smith', prenom: 'Petter', email: 'petterSmith1@gmail.com', telephone: '771000017', adresse: 'Boulevard de la Liberté, Dakar' },
  { nom: 'Thilbaut', prenom: 'Kristine', email: 'ThilbautKristine@gmail.com', telephone: '771000018', adresse: 'Avenue Cheikh Anta Diop, Dakar' },
  { nom: 'Ndecki', prenom: 'Maman', email: 'MamanNdecki@gmail.com', telephone: '771000019', adresse: 'Rue Félix Faure, Dakar-Plateau' },
  { nom: 'Welé', prenom: 'Sophie', email: 'Welesophie2@gmail.com', telephone: '771000020', adresse: 'Grand-Dakar, Dakar' },
  { nom: 'Gaye', prenom: 'Moussa', email: 'moussa.gaye@gmail.com', telephone: '771000021', adresse: 'Rue MZ-7, Mermoz' },
  { nom: 'Samaké', prenom: 'Mariama', email: 'mariamasamake38@gmail.com', telephone: '771000022', adresse: 'Rue MZ-6, Mermoz' },
  { nom: 'Camara', prenom: 'Mocktar', email: 'Mocktarecamara8@gmail.com', telephone: '771000023', adresse: 'Rue de la Renaissance, Ouakam' },
  { nom: 'Mendy', prenom: 'Helene', email: 'Mendyhelenita2@gmail.com', telephone: '771000024', adresse: 'Rue de Rebeuss, Dakar' },
  { nom: 'Diop', prenom: 'Ndeye Ami', email: 'Ndeyediop2@gmail.com', telephone: '771000025', adresse: 'Route de Ouakam, Dakar' },
  { nom: 'Mané', prenom: 'Ndeye Fatou', email: 'fatouMane3@gmail.com', telephone: '771000026', adresse: 'Avenue Peytavin, Dakar' },
  { nom: 'Bah', prenom: 'Binta', email: 'BintaBah4@gmail.com', telephone: '771000027', adresse: 'Rue du Marché Kermel, Dakar' },
  { nom: 'Baldé', prenom: 'Djeynabou', email: 'DjeynabouBalde@gmail.com', telephone: '771000028', adresse: 'Boulevard de l’Indépendance, Dakar' },
  { nom: 'Cissokho', prenom: 'Aminata', email: 'Cissokho2@gmail.com', telephone: '771000029', adresse: 'Avenue Pasteur, Dakar' },
  { nom: 'Sow', prenom: 'Fatoumata', email: 'FatoumataSow1@gmail.com', telephone: '771000030', adresse: 'Rue de Hann, Dakar' },
  { nom: 'Soumare', prenom: 'Adama', email: 'Adama1soumare@gmail.com', telephone: '771000031', adresse: 'Route de l’Aéroport, Dakar' },
  { nom: 'Ndoye', prenom: 'Astou', email: 'AstouNdoye1@gmail.com', telephone: '771000032', adresse: 'Avenue du Président Lamine Guèye, Dakar' },
  { nom: 'Sidibe', prenom: 'Samba', email: 'SidibeSamba0@gmail.com', telephone: '771000033', adresse: 'Rue de Fass, Dakar' },
  { nom: 'Dioum', prenom: 'Mamadou Aliou', email: 'MAmadouAliou@gmail.com', telephone: '771000034', adresse: 'Avenue Pompidou, Dakar' },
  { nom: 'Diedhiou', prenom: 'Maman', email: 'MamanDiedhiou3@gmail.com', telephone: '771000035', adresse: 'Rue Mohamed V, Dakar' },
  { nom: 'Tall', prenom: 'Abibatou', email: 'Abytall@gmail.com', telephone: '771000036', adresse: 'Route des Mamelles, Dakar' },
  { nom: 'Kane', prenom: 'Mame Siga', email: 'Sigakane@gmail.com', telephone: '771000037', adresse: 'Boulevard du Général de Gaulle, Dakar' },
  { nom: 'Ndiang', prenom: 'Amadou', email: 'amadou.ndiang@gmail.com', telephone: '771000038', adresse: 'Rue Dial Mbaye, Rufisque' },
  { nom: 'Seye', prenom: 'Rama', email: 'Ramaseye@gmail.com', telephone: '771000039', adresse: 'Rue Blaise Diagne, Dakar' },
  { nom: 'Sall', prenom: 'Akawa', email: 'akawasall@gmail.com', telephone: '771000040', adresse: 'Cité Keur Gorgui, Dakar' },
  { nom: 'Seck', prenom: 'Ouleye', email: 'Ouleye2@gmail.com', telephone: '771000041', adresse: 'Route des Almadies, Dakar' },
  { nom: 'Diaby', prenom: 'Bintou', email: 'Bintou@gmail.com', telephone: '771000042', adresse: 'Rue de la Mosquée, Médina' },
  { nom: 'Sidibé', prenom: 'Samba', email: 'SidibeSamba@gmail.com', telephone: '771000043', adresse: 'Avenue des Ambassades, Dakar' },
  { nom: 'Ndione', prenom: 'Adji', email: 'Adjindione1@gmail.com', telephone: '771000044', adresse: 'Route de Fann, Dakar' },
  { nom: 'Mendy', prenom: 'Marie Claire', email: 'MarieClaire@gmail.com', telephone: '771000045', adresse: 'Rue du Port, Dakar' },
  { nom: 'Thiam', prenom: 'Babacar', email: 'Babacarthiam@gmail.com', telephone: '771000559', adresse: 'Rue 14 Dieuppeul, Dakar' },
];

const initialPatients: Patient[] = [
  { nom: 'Faye', prenom: 'Aminata', email: 'aminatafaye@gmail.com', telephone: '771000046', adresse: 'Rue de l’Université, Dakar' },
  { nom: 'Thiam', prenom: 'Ousmane', email: 'ousmanethiam@gmail.com', telephone: '771000047', adresse: 'Avenue Nelson Mandela, Dakar' },
  { nom: 'Seck', prenom: 'Fatou', email: 'fatouseck@gmail.com', telephone: '771000048', adresse: 'Rue de la Paix, Dakar-Plateau' },
  { nom: 'Diouf', prenom: 'Abdoulaye', email: 'abdoulayediuof@gmail.com', telephone: '771000049', adresse: 'Boulevard de la Mer, Dakar' },
  { nom: 'Fall', prenom: 'Khady', email: 'khadyfall@gmail.com', telephone: '771000050', adresse: 'Rue 12, Grand-Yoff' },
  { nom: 'Niang', prenom: 'Moussa', email: 'moussaniang@gmail.com', telephone: '771000051', adresse: 'Avenue Malick Sy, Dakar' },
  { nom: 'Diop', prenom: 'Aissatou', email: 'aissatoudiop@gmail.com', telephone: '771000052', adresse: 'Rue de la Gare, Dakar' },
  { nom: 'Mbaye', prenom: 'Cheikh', email: 'cheikhmbaye@gmail.com', telephone: '771000053', adresse: 'Route de Rufisque, Dakar' },
  { nom: 'Sene', prenom: 'Marieme', email: 'mariemesene@gmail.com', telephone: '771000054', adresse: 'Avenue Cheikh Ahmadou Bamba, Dakar' },
  { nom: 'Toure', prenom: 'Ibrahima', email: 'ibrahimatoure@gmail.com', telephone: '771000055', adresse: 'Rue de la Solidarité, Pikine' },
];

const Contact: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([...initialMedecins, ...initialPatients]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Patient>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
  });

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.prenom} ${contact.nom}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.telephone.includes(searchTerm) ||
      contact.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelect = (globalIndex: number) => {
    setSelectedIndices((prev) =>
      prev.includes(globalIndex) ? prev.filter((i) => i !== globalIndex) : [...prev, globalIndex]
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewContact({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation to ensure fields are not empty
    if (!newContact.nom || !newContact.prenom || !newContact.email || !newContact.telephone || !newContact.adresse) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setContacts((prev) => [...prev, newContact]);
    setCurrentPage(1); // Reset to first page
    setSelectedIndices([]); // Clear selection
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteSelected = () => {
    if (selectedIndices.length === 0) return;

    // Map the selected indices (from filtered list) to their original indices in the contacts array
    const originalIndicesToDelete = selectedIndices.map((filteredIndex) => {
      const contactAtFilteredIndex = filteredContacts[filteredIndex - indexOfFirstItem];
      return contacts.indexOf(contactAtFilteredIndex);
    });

    // Filter out the contacts at the original indices
    const updatedContacts = contacts.filter((_, index) => !originalIndicesToDelete.includes(index));
    setContacts(updatedContacts);
    setSelectedIndices([]);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Liste des Contacts</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Rechercher un contact..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="px-4 py-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Add and Delete Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Ajouter Contact
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedIndices.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Supprimer Sélectionnés
        </button>
      </div>

      {/* Modal for Adding Contact */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter un Nouveau Contact</h2>
            <form onSubmit={handleAddContact}>
              <div className="mb-4">
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  value={newContact.prenom}
                  onChange={(e) => setNewContact({ ...newContact, prenom: e.target.value })}
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  value={newContact.nom}
                  onChange={(e) => setNewContact({ ...newContact, nom: e.target.value })}
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  value={newContact.telephone}
                  onChange={(e) => setNewContact({ ...newContact, telephone: e.target.value })}
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <input
                  type="text"
                  id="adresse"
                  value={newContact.adresse}
                  onChange={(e) => setNewContact({ ...newContact, adresse: e.target.value })}
                  className="mt-1 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                  checked={selectedIndices.length === currentContacts.length && currentContacts.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIndices(currentContacts.map((_, index) => indexOfFirstItem + index));
                    } else {
                      setSelectedIndices([]);
                    }
                  }}
                  aria-label="Sélectionner tous"
                />
              </th>
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">Nom</th>
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">Email</th>
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">Téléphone</th>
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">Adresse</th>
              <th className="py-3 px-4 border-b font-semibold text-left text-gray-700">Type</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact, index) => {
                const globalIndex = indexOfFirstItem + index;
                const isMedecin = contacts.indexOf(contact) < initialMedecins.length;
                return (
                  <tr key={globalIndex} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 border-b">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-600"
                        checked={selectedIndices.includes(globalIndex)}
                        onChange={() => handleSelect(globalIndex)}
                        aria-label={`Sélectionner ${contact.prenom} ${contact.nom}`}
                      />
                    </td>
                    <td className="py-3 px-4 border-b">
                      <span className="text-gray-800">{contact.prenom} {contact.nom}</span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href={`mailto:${contact.email}`} className="text-green-600 hover:underline">
                        {contact.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href={`tel:${contact.telephone}`} className="text-green-600 hover:underline flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.6-.2-1.2-.7-1.5-1.3-.3-.6-.2-1.4.2-1.9l2.3-2.3c.1-.1.2-.2.3-.3.6-.6 1.5-.7 2.2-.4 1.1.5 2.1 1.3 2.8 2.2.8 1.1 1.3 2.5 1.3 4 0 3.3-2.7 6-6 6zm-3.5-2.8c-.2.1-.5.2-.7.3-.8.3-1.7.4-2.6.4-3.9 0-7-3.1-7-7 0-.9.1-1.8.4-2.6.1-.2.2-.5.3-.7-.5-.5-1-1-1.4-1.7-.6-.9-.9-2-.9-3.1C5 1.7 6.7 0 8.9 0c1.4 0 2.7.6 3.6 1.5.9.9 1.4 2.2 1.4 3.6 0 1.1-.3 2.2-.9 3.1-.4.7-.9 1.2-1.4 1.7z"/>
                        </svg>
                        {contact.telephone}
                      </a>
                    </td>
                    <td className="py-3 px-4 border-b text-gray-600">{contact.adresse}</td>
                    <td className="py-3 px-4 border-b text-gray-600">{isMedecin ? 'Médecin' : 'Patient'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                  Aucun contact trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination improved */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Éléments par page :</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded p-1.5"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          Page {currentPage} sur {totalPages}
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded border enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded border enabled:hover:bg-gray-100 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
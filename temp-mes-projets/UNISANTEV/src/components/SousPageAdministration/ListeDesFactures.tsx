import React, { useState } from "react";
import { saveAs } from "file-saver";


interface Invoice {
  id: number;
  patientName: string;
  doctorName: string;
  Birthday: string;
  tax: string;
  totalAmount: string;
}

const initialInvoices: Invoice[] = [
  { id: 1, patientName: "Ndeye Sall", doctorName: "Fatou Badji", Birthday: "2000-01-01", tax: "8%", totalAmount: "142 200 XOF" },
  { id: 2, patientName: "Thiané Diop", doctorName: "Vitaldine Loemba", Birthday: "1999-10-22", tax: "10%", totalAmount: "126 300 XOF" },
  { id: 3, patientName: "Aissatou Ba", doctorName: "Khadidiatou Diallo", Birthday: "1998-05-10", tax: "9%", totalAmount: "230 000 XOF" },
  { id: 4, patientName: "Rokhaya Sy", doctorName: "Mariama Kane", Birthday: "1995-02-01", tax: "9%", totalAmount: "142 630 XOF" },
  { id: 5, patientName: "Awa Fall", doctorName: "Linda Basséne", Birthday: "1990-06-08", tax: "10%", totalAmount: "50 400 XOF" },
  { id: 6, patientName: "Khady Gaye", doctorName: "Fatima Gueye", Birthday: "1991-07-25", tax: "8%", totalAmount: "115 650 XOF" },
  { id: 7, patientName: "Fatou Ndour", doctorName: "Ndeye Awa Dieng", Birthday: "2003-09-02", tax: "10%", totalAmount: "240 500 XOF" },
  { id: 8, patientName: "Joséphine Mbaye", doctorName: "Awa Sall", Birthday: "2005-10-01", tax: "9%", totalAmount: "142 700 XOF" },
  { id: 9, patientName: "Moussa Sene", doctorName: "Hawa Demba Keita", Birthday: "1997-11-12", tax: "9%", totalAmount: "58 000 XOF" },
  { id: 10, patientName: "Cheickou Faye", doctorName: "Adéline Correa", Birthday: "1998-01-01", tax: "10%", totalAmount: "126 500 XOF" },
  { id: 11, patientName: "Modou Sagnane", doctorName: "Mariata Sarr", Birthday: "1980-03-24", tax: "8%", totalAmount: "150 000 XOF" },
  { id: 12, patientName: "Fatou Sembéne", doctorName: "Khadija Barry", Birthday: "1995-09-13", tax: "10%", totalAmount: "200 000 XOF" },
  { id: 13, patientName: "Léopold Senghor", doctorName: "Kris Memiague", Birthday: "1990-01-01", tax: "9%", totalAmount: "175 000 XOF" },
  { id: 14, patientName: "Malick Faye", doctorName: "Danicha Bakana", Birthday: "2001-08-04", tax: "9%", totalAmount: "180 000 XOF" },
  { id: 15, patientName: "Ramatoulaye Makaya", doctorName: "Mody Yero Ndiaye", Birthday: "2000-12-14", tax: "10%", totalAmount: "145 000 XOF" },
  { id: 16, patientName: "Khalilou Tall", doctorName: "Nafi Badji", Birthday: "1989-02-01", tax: "8%", totalAmount: "160 000 XOF" },
  { id: 17, patientName: "Mame Astou Sakho", doctorName: "Khadija Coulibaly", Birthday: "1985-06-03", tax: "9%", totalAmount: "190 000 XOF" },
];

// Fonction pour générer les initiales à partir du nom
const getInitials = (name: string) => {
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[1][0]}`
    : nameParts[0].slice(0, 2).toUpperCase();
};

const ListeDesFactures: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Invoice>({
    id: 0,
    patientName: "",
    doctorName: "",
    Birthday: "",
    tax: "",
    totalAmount: "",
  });
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);

  const handleExport = () => {
    const csvContent = [
      "Nom patient,Nom du médecin,Date de naissance,Taxe,Montant total",
      ...invoices.map(inv =>
        `${inv.patientName},${inv.doctorName},${inv.Birthday},${inv.tax},${inv.totalAmount}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `factures_${new Date().toISOString().split("T")[0]}.csv`);
  };

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    setInvoices([...invoices, { ...newInvoice, id: newId }]);
    setNewInvoice({ id: 0, patientName: "", doctorName: "", Birthday: "", tax: "", totalAmount: "" });
    setShowAddForm(false);
  };

  const handleEditInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (editInvoice) {
      setInvoices(invoices.map(inv => (inv.id === editInvoice.id ? editInvoice : inv)));
      setEditInvoice(null);
      setShowEditForm(false);
    }
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-wider text-gray-700 drop-shadow-md">
          LISTE DES FACTURES
        </h2>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="🔍 Rechercher..."
            className="border-2 border-gray-400 rounded-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-md text-white"
          >
            ➕ Ajouter
          </button>
          <button
            onClick={handleExport}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-md text-white"
          >
            ⬇️ Exporter
          </button>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddInvoice}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700">Nouvelle Facture</h3>
            <input
              placeholder="Nom du patient"
              value={newInvoice.patientName}
              onChange={e => setNewInvoice({ ...newInvoice, patientName: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Nom du médecin"
              value={newInvoice.doctorName}
              onChange={e => setNewInvoice({ ...newInvoice, doctorName: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              type="date"
              value={newInvoice.Birthday}
              onChange={e => setNewInvoice({ ...newInvoice, Birthday: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Taxe (ex: 8%)"
              value={newInvoice.tax}
              onChange={e => setNewInvoice({ ...newInvoice, tax: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Montant total (ex: 142 200 XOF)"
              value={newInvoice.totalAmount}
              onChange={e => setNewInvoice({ ...newInvoice, totalAmount: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-bold flex-1 text-white"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-bold flex-1 text-white"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulaire de modification */}
      {showEditForm && editInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditInvoice}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700">Modifier la Facture</h3>
            <input
              placeholder="Nom du patient"
              value={editInvoice.patientName}
              onChange={e => setEditInvoice({ ...editInvoice, patientName: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Nom du médecin"
              value={editInvoice.doctorName}
              onChange={e => setEditInvoice({ ...editInvoice, doctorName: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              type="date"
              value={editInvoice.Birthday}
              onChange={e => setEditInvoice({ ...editInvoice, Birthday: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Taxe (ex: 8%)"
              value={editInvoice.tax}
              onChange={e => setEditInvoice({ ...editInvoice, tax: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Montant total (ex: 142 200 XOF)"
              value={editInvoice.totalAmount}
              onChange={e => setEditInvoice({ ...editInvoice, totalAmount: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-bold flex-1 text-white"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full font-bold flex-1 text-white"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto border-2 border-gray-300">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">
                <input type="checkbox" className="rounded border-gray-400" />
              </th>
              <th className="p-3 text-left font-bold">Avatar</th>
              <th className="p-3 text-left font-bold">Nom patient</th>
              <th className="p-3 text-left font-bold">Nom du médecin</th>
              <th className="p-3 text-left font-bold">Date de naissance</th>
              <th className="p-3 text-left font-bold">Taxe</th>
              <th className="p-3 text-left font-bold">Montant total</th>
              <th className="p-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
              >
                <td className="p-3">
                  <input type="checkbox" className="rounded border-gray-400" />
                </td>
                <td className="p-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(invoice.patientName)}
                  </div>
                </td>
                <td className="p-3">{invoice.patientName}</td>
                <td className="p-3">{invoice.doctorName}</td>
                <td className="p-3">{invoice.Birthday}</td>
                <td className="p-3">{invoice.tax}</td>
                <td className="p-3">{invoice.totalAmount}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => {
                      setEditInvoice(invoice);
                      setShowEditForm(true);
                    }}
                    aria-label={`Modifier la facture de ${invoice.patientName}`}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteInvoice(invoice.id)}
                    aria-label={`Supprimer la facture de ${invoice.patientName}`}
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
    
    </div>
  );
};

export default ListeDesFactures;
import React, { useState } from "react";
import { saveAs } from "file-saver";


interface Expense {
  date: string;
  category: string;
  description: string;
  quantity: number;
  vendor: string;
  invoiceNumber: string;
  paymentMode: string;
  department: string;
}

const Depenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      date: "11/01/2024",
      category: "Fournitures",
      description: "Bandages, g...",
      quantity: 500,
      vendor: "MedSupplyCo",
      invoiceNumber: "INV12345",
      paymentMode: "Virement",
      department: "Unité de so...",
    },
    {
      date: "11/03/2024",
      category: "Salaires du ...",
      description: "Salaire du m...",
      quantity: 5000,
      vendor: "N/A",
      invoiceNumber: "N/A",
      paymentMode: "Virement",
      department: "Médecine ...",
    },
    {
      date: "11/05/2024",
      category: "Utilitaires",
      description: "Facture d'ea...",
      quantity: 150,
      vendor: "CityWater Co...",
      invoiceNumber: "WTR23456",
      paymentMode: "Chèque",
      department: "Équipement",
    },
    {
      date: "11/07/2024",
      category: "Produits ph...",
      description: "Stock de mé...",
      quantity: 1200,
      vendor: "PharmaPlus",
      invoiceNumber: "INV78901",
      paymentMode: "Virement",
      department: "Pharmacie",
    },
    {
      date: "11/09/2024",
      category: "Équipement",
      description: "Réparation ...",
      quantity: 2500,
      vendor: "Réparations...",
      invoiceNumber: "ULTR5678",
      paymentMode: "Carte de cré...",
      department: "Radiologie",
    },
    {
      date: "11/10/2024",
      category: "Administratf",
      description: "Achat de fo...",
      quantity: 250,
      vendor: "OfficeMart",
      invoiceNumber: "OFF12345",
      paymentMode: "Virement",
      department: "Administrat...",
    },
    {
      date: "11/12/2024",
      category: "Fournitures",
      description: "Gants et ma...",
      quantity: 450,
      vendor: "SantéEquip",
      invoiceNumber: "SUR678901",
      paymentMode: "Virement",
      department: "Chirurgie",
    },
    {
      date: "11/14/2024",
      category: "Services-co...",
      description: "Frais de con...",
      quantity: 3500,
      vendor: "TechConsult",
      invoiceNumber: "ITCONS123",
      paymentMode: "Virement",
      department: "IL",
    },
    {
      date: "11/15/2024",
      category: "Entretien",
      description: "Réparation ...",
      quantity: 2000,
      vendor: "Réparations...",
      invoiceNumber: "HVAC67890",
      paymentMode: "Virement",
      department: "Équipement",
    },
    {
      date: "11/17/2024",
      category: "Salaires du ...",
      description: "Salaire d'inf...",
      quantity: 3000,
      vendor: "N/A",
      invoiceNumber: "N/A",
      paymentMode: "Virement",
      department: "Allaitement",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState<Expense>({
    date: "",
    category: "",
    description: "",
    quantity: 0,
    vendor: "",
    invoiceNumber: "",
    paymentMode: "",
    department: "",
  });

  const handleExport = () => {
    const csvContent = [
      "Date,Catégorie,Description,Quantité,Vendeur,Numéro de facture,Mode de paiement,Département",
      ...expenses.map(exp => 
        `${exp.date},${exp.category},${exp.description},${exp.quantity},${exp.vendor},${exp.invoiceNumber},${exp.paymentMode},${exp.department}`
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `depenses_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenses([...expenses, newExpense]);
    setNewExpense({
      date: "",
      category: "",
      description: "",
      quantity: 0,
      vendor: "",
      invoiceNumber: "",
      paymentMode: "",
      department: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-wider text-gray-700 drop-shadow-md">
          GESTION DES DÉPENSES
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
            onSubmit={handleAddExpense}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-700">Nouvelle Dépense</h3>
            <input
              type="date"
              value={newExpense.date}
              onChange={e => setNewExpense({...newExpense, date: e.target.value})}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Catégorie"
              value={newExpense.category}
              onChange={e => setNewExpense({...newExpense, category: e.target.value})}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Description"
              value={newExpense.description}
              onChange={e => setNewExpense({...newExpense, description: e.target.value})}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              type="number"
              placeholder="Quantité"
              value={newExpense.quantity}
              onChange={e => setNewExpense({...newExpense, quantity: parseInt(e.target.value)})}
              className="w-full mb-3 p-2 rounded bg-gray-100 border border-gray-300 text-gray-800"
              required
            />
            <input
              placeholder="Vendeur"
              value={newExpense.vendor}
              onChange={e => setNewExpense({...newExpense, vendor: e.target.value})}
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

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto border-2 border-gray-300">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">
                <input type="checkbox" className="rounded border-gray-400" />
              </th>
              <th className="p-3 text-left font-bold">Date</th>
              <th className="p-3 text-left font-bold">Catégorie</th>
              <th className="p-3 text-left font-bold">Description</th>
              <th className="p-3 text-left font-bold">Quantité</th>
              <th className="p-3 text-left font-bold">Vendeur</th>
              <th className="p-3 text-left font-bold">Facture</th>
              <th className="p-3 text-left font-bold">Paiement</th>
              <th className="p-3 text-left font-bold">Département</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
              >
                <td className="p-3">
                  <input type="checkbox" className="rounded border-gray-400" />
                </td>
                <td className="p-3">{expense.date}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">{expense.description}</td>
                <td className="p-3">{expense.quantity}</td>
                <td className="p-3">{expense.vendor}</td>
                <td className="p-3">{expense.invoiceNumber}</td>
                <td className="p-3">{expense.paymentMode}</td>
                <td className="p-3">{expense.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
      </div>
    </div>
  );
};

export default Depenses;
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter, FileText } from "lucide-react"
// Ajout des imports Recharts
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from "recharts";
// Suppression de l'import non utilisé

// Dépenses mock
const categories = ["Entretien", "Frais fixes", "Autre"];
const initialDepenses = [
  { id: "1", categorie: "Entretien", montant: 120000, date: "2024-06-01", },
  { id: "2", categorie: "Frais fixes", montant: 130000, date: "2024-06-10", },
];

// Couleurs pour les graphes
const COLORS = ["#2563eb", "#10b981", "#f59e42", "#e11d48"];

export default function ExpensesPage() {
  const [depenses, setDepenses] = useState(initialDepenses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    categorie: categories[0],
    montant: '',
    date: '',
  });

  // Données pour le camembert (par catégorie)
  const pieData = categories.map(cat => ({
    name: cat,
    value: depenses.filter(d => d.categorie === cat).reduce((sum, d) => sum + d.montant, 0)
  }));

  // Données pour le bar chart (par mois)
  const months = Array.from(new Set(depenses.map(d => d.date.slice(0, 7)))); // ex: ["2024-06"]
  const monthlyData = months.map(mois => ({
    mois,
    montant: depenses.filter(d => d.date.startsWith(mois)).reduce((sum, d) => sum + d.montant, 0)
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDepense = (e: React.FormEvent) => {
    e.preventDefault();
    setDepenses(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        categorie: form.categorie,
        montant: Number(form.montant),
        date: form.date,
      }
    ]);
    setShowModal(false);
    setForm({ categorie: categories[0], montant: '', date: '' });
  };

  const handleDownload = async (depense: any) => {
    const response = await fetch('/pdf/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(depense),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `depense_${depense.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
              <p className="text-gray-500">Gestion des dépenses et charges</p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une dépense
            </button>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Rechercher une dépense..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          {/* Bloc des deux graphes */}
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            {/* Camembert */}
            <Card>
              <CardHeader>
                <CardTitle>Dépenses par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Barres */}
            <Card>
              <CardHeader>
                <CardTitle>Dépenses par Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="montant" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {depenses.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="px-4 py-3">{d.categorie}</td>
                    <td className="px-4 py-3">{d.montant.toLocaleString()} F CFA</td>
                    <td className="px-4 py-3">{d.date}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        title="Télécharger"
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleDownload(d)}
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      {/* Modale d'ajout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter une dépense</h2>
            <form onSubmit={handleAddDepense} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Catégorie</label>
                <select
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Montant</label>
                <input
                  type="number"
                  name="montant"
                  value={form.montant}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
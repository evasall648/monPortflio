import React, { useState, useMemo, useCallback } from "react";
import { saveAs } from "file-saver"; // Nécessite npm install file-saver @types/file-saver

// Interface pour un médicament
interface Medicine {
  number: number;
  name: string;
  category: string;
  company: string;
  purchaseDate: string;
  price: number;
  expirationDate: string;
  stock: number;
}

// Données statiques initiales
const initialMedicines: Medicine[] = [
  { number: 1, name: "Paracétamol", category: "Tablette", company: "Pharma SN", purchaseDate: "01/03/2025", price: 50, expirationDate: "01/03/2026", stock: 234 },
  { number: 2, name: "Amoxicilline", category: "Injectable", company: "Sénégal Médic", purchaseDate: "02/03/2025", price: 23, expirationDate: "02/03/2026", stock: 29 },
  { number: 3, name: "Azithromycine", category: "Tablette", company: "Dakar Pharma", purchaseDate: "03/03/2025", price: 43, expirationDate: "03/03/2026", stock: 26 },
  { number: 4, name: "Amlodipine", category: "Sirop", company: "MedCare SN", purchaseDate: "04/03/2025", price: 152, expirationDate: "04/03/2026", stock: 387 },
  { number: 5, name: "Cyclobenzaprine", category: "Injectable", company: "PHL Pharma", purchaseDate: "05/03/2025", price: 87, expirationDate: "05/03/2026", stock: 183 },
  { number: 6, name: "Céphalexine", category: "Tablette", company: "Thiès Médic", purchaseDate: "06/03/2025", price: 38, expirationDate: "06/03/2026", stock: 72 },
  { number: 7, name: "Hydrochlorothiazide", category: "Tablette", company: "Saint-Louis Pharma", purchaseDate: "07/03/2025", price: 10, expirationDate: "07/03/2026", stock: 82 },
  { number: 8, name: "Vitamine D", category: "Sirop", company: "MedCare SN", purchaseDate: "08/03/2025", price: 57, expirationDate: "08/03/2026", stock: 293 },
];

// Composant principal
const Medicaments: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof Medicine | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("Toutes");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editMedicine, setEditMedicine] = useState<Medicine | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // Filtrage et tri des données
  const filteredMedicines = useMemo(() => {
    let result = [...medicines];

    if (searchTerm) {
      result = result.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "Toutes") {
      result = result.filter((med) => med.category === categoryFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [medicines, searchTerm, sortField, sortDirection, categoryFilter]);

  // Pagination
  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMedicines, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  // Gestion du tri
  const handleSort = useCallback((field: keyof Medicine) => {
    setSortField(field);
    setSortDirection((prev) => (sortField === field && prev === "asc" ? "desc" : "asc"));
  }, [sortField]);

  // Gestion de la sélection
  const toggleSelect = useCallback((number: number) => {
    setSelectedIds((prev) =>
      prev.includes(number) ? prev.filter((id) => id !== number) : [...prev, number]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === paginatedMedicines.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedMedicines.map((med) => med.number));
    }
  }, [paginatedMedicines, selectedIds.length]);

  // Exportation en CSV
  const exportToCSV = useCallback(() => {
    const headers = ["Numéro", "Nom", "Catégorie", "Compagnie", "Date d'achat", "Prix", "Échéance", "Stock"];
    const csv = [
      headers.join(","),
      ...filteredMedicines.map((med) =>
        [med.number, med.name, med.category, med.company, med.purchaseDate, med.price, med.expirationDate, med.stock].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "medicaments.csv");
  }, [filteredMedicines]);

  // Ajout d’un nouveau médicament
  const handleAddMedicine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMedicine: Medicine = {
      number: medicines.length + 1,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      company: formData.get("company") as string,
      purchaseDate: formData.get("purchaseDate") as string,
      price: Number(formData.get("price")),
      expirationDate: formData.get("expirationDate") as string,
      stock: Number(formData.get("stock")),
    };
    setMedicines((prev) => [...prev, newMedicine]);
    setShowAddModal(false);
  };

  // Modification d’un médicament
  const handleEditMedicine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMedicine) return;
    const formData = new FormData(e.currentTarget);
    const updatedMedicine: Medicine = {
      ...editMedicine,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      company: formData.get("company") as string,
      purchaseDate: formData.get("purchaseDate") as string,
      price: Number(formData.get("price")),
      expirationDate: formData.get("expirationDate") as string,
      stock: Number(formData.get("stock")),
    };
    setMedicines((prev) =>
      prev.map((med) => (med.number === editMedicine.number ? updatedMedicine : med))
    );
    setEditMedicine(null);
  };

  // Suppression avec confirmation
  const handleDelete = () => {
    setMedicines((prev) => prev.filter((med) => !selectedIds.includes(med.number)));
    setSelectedIds([]);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white min-h-screen">
      {/* Entête */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Liste des Médicaments</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Rechercher un médicament..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-label="Rechercher un médicament"
          />
          <select
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-label="Filtrer par catégorie"
          >
            <option value="Toutes">Toutes les catégories</option>
            <option value="Tablette">Tablette</option>
            <option value="Injectable">Injectable</option>
            <option value="Sirop">Sirop</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
            aria-label="Ajouter un médicament"
          >
            ➕
          </button>
          <button
            onClick={exportToCSV}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
            disabled={filteredMedicines.length === 0}
            aria-label="Exporter la liste des médicaments en CSV"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredMedicines.length === 0 ? (
          <div className="p-6 text-center text-gray-500 animate-fade-in">
            <p className="text-lg">Aucun médicament trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      className="rounded text-green-600"
                      checked={selectedIds.length === paginatedMedicines.length && paginatedMedicines.length > 0}
                      onChange={toggleSelectAll}
                      aria-label="Sélectionner tous les médicaments"
                    />
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("number")}>
                    Numéro
                    {sortField === "number" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("name")}>
                    Nom
                    {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("category")}>
                    Catégorie
                    {sortField === "category" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("company")}>
                    Compagnie
                    {sortField === "company" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("purchaseDate")}>
                    Date d'achat
                    {sortField === "purchaseDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("price")}>
                    Prix
                    {sortField === "price" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("expirationDate")}>
                    Échéance
                    {sortField === "expirationDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("stock")}>
                    Stock
                    {sortField === "stock" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMedicines.map((medicine) => {
                  const expirationDate = new Date(medicine.expirationDate);
                  const isExpiredSoon = expirationDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 jours
                  const isLowStock = medicine.stock < 50;

                  return (
                    <tr key={medicine.number} className="border-t hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="rounded text-green-600"
                          checked={selectedIds.includes(medicine.number)}
                          onChange={() => toggleSelect(medicine.number)}
                          aria-label={`Sélectionner ${medicine.name}`}
                        />
                      </td>
                      <td className="p-4">{medicine.number}</td>
                      <td className="p-4 font-medium">{medicine.name}</td>
                      <td className="p-4">{medicine.category}</td>
                      <td className="p-4">{medicine.company}</td>
                      <td className="p-4">{medicine.purchaseDate}</td>
                      <td className="p-4">{medicine.price} FCFA</td>
                      <td className={`p-4 ${isExpiredSoon ? "text-red-600 font-semibold" : ""}`}>{medicine.expirationDate}</td>
                      <td className={`p-4 ${isLowStock ? "text-red-600 font-semibold" : ""}`}>{medicine.stock}</td>
                      <td className="p-4 flex space-x-2">
                        <button
                          onClick={() => setEditMedicine(medicine)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          aria-label={`Modifier ${medicine.name}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIds([medicine.number]);
                            setShowDeleteConfirm(true);
                          }}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          aria-label={`Supprimer ${medicine.name}`}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Actions en masse */}
      {selectedIds.length > 0 && (
        <div className="mt-4 flex gap-4 animate-slide-up">
          <button
            onClick={() => setEditMedicine(medicines.find((m) => m.number === selectedIds[0]) || null)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            disabled={selectedIds.length > 1}
            aria-label="Modifier les médicaments sélectionnés"
          >
            Modifier ({selectedIds.length})
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            aria-label="Supprimer les médicaments sélectionnés"
          >
            Supprimer ({selectedIds.length})
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredMedicines.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-gray-600">
              Par page :
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setItemsPerPage(Number(e.target.value))}
              className="border rounded-lg px-2 py-1 focus:ring-2 focus:ring-green-500 transition-all duration-200"
              aria-label="Nombre de médicaments par page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-green-300 disabled:opacity-50 transition-colors"
              aria-label="Page précédente"
            >
              {"<"}
            </button>
            <span className="text-gray-600">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-green-300 disabled:opacity-50 transition-colors"
              aria-label="Page suivante"
            >
              {">"}
            </button>
          </div>
        </div>
      )}

      {/* Modale d’ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Ajouter un médicament</h3>
            <form onSubmit={handleAddMedicine}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nom du médicament"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Tablette">Tablette</option>
                  <option value="Injectable">Injectable</option>
                  <option value="Sirop">Sirop</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Compagnie
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Nom de la compagnie"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                  Date d'achat
                </label>
                <input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix (FCFA)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Prix"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Date d'expiration
                </label>
                <input
                  id="expirationDate"
                  name="expirationDate"
                  type="date"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Quantité en stock"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de modification */}
      {editMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Modifier un médicament</h3>
            <form onSubmit={handleEditMedicine}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={editMedicine.name}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={editMedicine.category}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Tablette">Tablette</option>
                  <option value="Injectable">Injectable</option>
                  <option value="Sirop">Sirop</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Compagnie
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  defaultValue={editMedicine.company}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                  Date d'achat
                </label>
                <input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  defaultValue={editMedicine.purchaseDate}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix (FCFA)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={editMedicine.price}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Date d'expiration
                </label>
                <input
                  id="expirationDate"
                  name="expirationDate"
                  type="date"
                  defaultValue={editMedicine.expirationDate}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  defaultValue={editMedicine.stock}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setEditMedicine(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Voulez-vous vraiment supprimer {selectedIds.length} médicament(s) ?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicaments;
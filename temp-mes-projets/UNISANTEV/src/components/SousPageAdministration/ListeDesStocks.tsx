import React, { useState, useMemo, useCallback } from "react";
import { saveAs } from "file-saver"; // Nécessite npm install file-saver @types/file-saver

// Interface pour un article en stock
interface StockItem {
  name: string;
  category: string;
  quantity: number;
  date: string;
  price: number;
  details: string;
}

// Données statiques initiales mises à jour pour 2025
const initialStockItems: StockItem[] = [
  { name: "Équipement médical", category: "Équipements", quantity: 44, date: "02/03/2025", price: 20, details: "Matériel pour diagnostic" },
  { name: "Habillage Coton", category: "Sacs en coton", quantity: 234, date: "04/03/2025", price: 11, details: "Sacs pour pansements" },
  { name: "Seringue", category: "Seringues lit", quantity: 476, date: "03/03/2025", price: 3, details: "Seringues stériles 5ml" },
  { name: "Drap", category: "Articles de lit", quantity: 29, date: "02/03/2025", price: 45, details: "Draps pour lits d’hôpital" },
  { name: "Gants de main", category: "Équipements", quantity: 163, date: "06/03/2025", price: 10, details: "Gants jetables taille M" },
  { name: "Uniforme", category: "Articles du personnel", quantity: 14, date: "02/03/2025", price: 33, details: "Uniformes infirmiers" },
  { name: "Ciseaux", category: "Équipements", quantity: 17, date: "03/03/2025", price: 29, details: "Ciseaux chirurgicaux" },
  { name: "Thermomètre", category: "Équipements", quantity: 5, date: "02/03/2025", price: 6, details: "Thermomètres numériques" },
];

// Composant principal
const ListeDesStocks: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof StockItem | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("Toutes");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editStockItem, setEditStockItem] = useState<StockItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // Filtrage et tri des données
  const filteredStockItems = useMemo(() => {
    let result = [...stockItems];

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "Toutes") {
      result = result.filter((item) => item.category === categoryFilter);
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
  }, [stockItems, searchTerm, sortField, sortDirection, categoryFilter]);

  // Pagination
  const paginatedStockItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStockItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStockItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStockItems.length / itemsPerPage);

  // Gestion du tri
  const handleSort = useCallback((field: keyof StockItem) => {
    setSortField(field);
    setSortDirection((prev) => (sortField === field && prev === "asc" ? "desc" : "asc"));
  }, [sortField]);

  // Gestion de la sélection
  const toggleSelect = useCallback((name: string) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedNames.length === paginatedStockItems.length) {
      setSelectedNames([]);
    } else {
      setSelectedNames(paginatedStockItems.map((item) => item.name));
    }
  }, [paginatedStockItems, selectedNames.length]);

  // Exportation en CSV
  const exportToCSV = useCallback(() => {
    const headers = ["Nom", "Catégorie", "Quantité", "Date", "Prix", "Détails"];
    const csv = [
      headers.join(","),
      ...filteredStockItems.map((item) =>
        [item.name, item.category, item.quantity, item.date, item.price, item.details].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "liste_des_stocks.csv");
  }, [filteredStockItems]);

  // Ajout d’un nouvel article
  const handleAddStockItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStockItem: StockItem = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      quantity: Number(formData.get("quantity")),
      date: formData.get("date") as string,
      price: Number(formData.get("price")),
      details: formData.get("details") as string,
    };
    setStockItems((prev) => [...prev, newStockItem]);
    setShowAddModal(false);
  };

  // Modification d’un article
  const handleEditStockItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editStockItem) return;
    const formData = new FormData(e.currentTarget);
    const updatedStockItem: StockItem = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      quantity: Number(formData.get("quantity")),
      date: formData.get("date") as string,
      price: Number(formData.get("price")),
      details: formData.get("details") as string,
    };
    setStockItems((prev) =>
      prev.map((item) => (item.name === editStockItem.name ? updatedStockItem : item))
    );
    setEditStockItem(null);
  };

  // Suppression avec confirmation
  const handleDelete = () => {
    setStockItems((prev) => prev.filter((item) => !selectedNames.includes(item.name)));
    setSelectedNames([]);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white min-h-screen">
      {/* Entête */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Liste des Stocks</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-label="Rechercher un article en stock"
          />
          <select
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-label="Filtrer par catégorie"
          >
            <option value="Toutes">Toutes les catégories</option>
            <option value="Équipements">Équipements</option>
            <option value="Sacs en coton">Sacs en coton</option>
            <option value="Seringues lit">Seringues lit</option>
            <option value="Articles de lit">Articles de lit</option>
            <option value="Articles du personnel">Articles du personnel</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
            aria-label="Ajouter un article au stock"
          >
            ➕
          </button>
          <button
            onClick={exportToCSV}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
            disabled={filteredStockItems.length === 0}
            aria-label="Exporter la liste des stocks en CSV"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredStockItems.length === 0 ? (
          <div className="p-6 text-center text-gray-500 animate-fade-in">
            <p className="text-lg">Aucun article en stock trouvé.</p>
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
                      checked={selectedNames.length === paginatedStockItems.length && paginatedStockItems.length > 0}
                      onChange={toggleSelectAll}
                      aria-label="Sélectionner tous les articles en stock"
                    />
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("name")}>
                    Nom
                    {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("category")}>
                    Catégorie
                    {sortField === "category" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("quantity")}>
                    Quantité
                    {sortField === "quantity" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("date")}>
                    Date
                    {sortField === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("price")}>
                    Prix
                    {sortField === "price" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-green-700 transition-colors" onClick={() => handleSort("details")}>
                    Détails
                    {sortField === "details" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStockItems.map((item) => {
                  const isLowStock = item.quantity < 20; // Seuil de stock faible

                  return (
                    <tr key={item.name} className="border-t hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="rounded text-green-600"
                          checked={selectedNames.includes(item.name)}
                          onChange={() => toggleSelect(item.name)}
                          aria-label={`Sélectionner ${item.name}`}
                        />
                      </td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">{item.category}</td>
                      <td className={`p-4 ${isLowStock ? "text-red-600 font-semibold" : ""}`}>{item.quantity}</td>
                      <td className="p-4">{item.date}</td>
                      <td className="p-4">{item.price} FCFA</td>
                      <td className="p-4">{item.details}</td>
                      <td className="p-4 flex space-x-2">
                        <button
                          onClick={() => setEditStockItem(item)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          aria-label={`Modifier ${item.name}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNames([item.name]);
                            setShowDeleteConfirm(true);
                          }}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          aria-label={`Supprimer ${item.name}`}
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
      {selectedNames.length > 0 && (
        <div className="mt-4 flex gap-4 animate-slide-up">
          <button
            onClick={() => setEditStockItem(stockItems.find((i) => i.name === selectedNames[0]) || null)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            disabled={selectedNames.length > 1}
            aria-label="Modifier les articles sélectionnés"
          >
            Modifier ({selectedNames.length})
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            aria-label="Supprimer les articles sélectionnés"
          >
            Supprimer ({selectedNames.length})
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredStockItems.length > 0 && (
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
              aria-label="Nombre d'articles par page"
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
            <h3 className="text-xl font-bold mb-4">Ajouter un article au stock</h3>
            <form onSubmit={handleAddStockItem}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nom de l'article"
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
                  <option value="Équipements">Équipements</option>
                  <option value="Sacs en coton">Sacs en coton</option>
                  <option value="Seringues lit">Seringues lit</option>
                  <option value="Articles de lit">Articles de lit</option>
                  <option value="Articles du personnel">Articles du personnel</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantité
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantité"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
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
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Détails
                </label>
                <input
                  id="details"
                  name="details"
                  type="text"
                  placeholder="Détails de l'article"
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
      {editStockItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Modifier un article</h3>
            <form onSubmit={handleEditStockItem}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={editStockItem.name}
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
                  defaultValue={editStockItem.category}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Équipements">Équipements</option>
                  <option value="Sacs en coton">Sacs en coton</option>
                  <option value="Seringues lit">Seringues lit</option>
                  <option value="Articles de lit">Articles de lit</option>
                  <option value="Articles du personnel">Articles du personnel</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantité
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  defaultValue={editStockItem.quantity}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={editStockItem.date}
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
                  defaultValue={editStockItem.price}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Détails
                </label>
                <input
                  id="details"
                  name="details"
                  type="text"
                  defaultValue={editStockItem.details}
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
                  onClick={() => setEditStockItem(null)}
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
            <p className="text-lg mb-4">Voulez-vous vraiment supprimer {selectedNames.length} article(s) ?</p>
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

export default ListeDesStocks;
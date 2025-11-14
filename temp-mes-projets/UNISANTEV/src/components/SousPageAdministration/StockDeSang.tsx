"use client"

import type React from "react"
import { useState, useRef } from "react"

interface BloodStock {
  productId: string
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-"
  componentType: "Globules rouges" | "Plasma" | "Plaquettes" | "Sang total"
  quantityInStock: number
  expirationDate: string
  collectionDate: string
  storageLocation:
    | "Dakar - Hôpital Fann"
    | "Thiès - Centre Régional"
    | "Saint-Louis - Banque de Sang"
    | "Réfrigérateur"
    | "Congélateur"
  donationStatus: "Frais" | "En cours d'utilisation" | "Périmé"
  batchNumber: string
  qualityStatus: "Bon" | "Hémolysés" | "Coagulé"
  temperatureRange: string
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const
const componentTypes = ["Globules rouges", "Plasma", "Plaquettes", "Sang total"] as const
const storageLocations = [
  "Dakar - Hôpital Fann",
  "Thiès - Centre Régional",
  "Saint-Louis - Banque de Sang",
  "Réfrigérateur",
  "Congélateur",
] as const
const donationStatuses = ["Frais", "En cours d'utilisation", "Périmé"] as const
const qualityStatuses = ["Bon", "Hémolysés", "Coagulé"] as const

const StockDeSang: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [bloodStocks, setBloodStocks] = useState<BloodStock[]>([
    {
      productId: "BP001",
      bloodGroup: "O+",
      componentType: "Globules rouges",
      quantityInStock: 25,
      expirationDate: "15/12/2024",
      collectionDate: "01/11/2024",
      storageLocation: "Dakar - Hôpital Fann",
      donationStatus: "Frais",
      batchNumber: "SN-B123",
      qualityStatus: "Bon",
      temperatureRange: "2-6°C",
    },
    {
      productId: "BP002",
      bloodGroup: "A-",
      componentType: "Plasma",
      quantityInStock: 15,
      expirationDate: "10/01/2025",
      collectionDate: "05/10/2024",
      storageLocation: "Thiès - Centre Régional",
      donationStatus: "Frais",
      batchNumber: "SN-B124",
      qualityStatus: "Bon",
      temperatureRange: "-18°C",
    },
    {
      productId: "BP003",
      bloodGroup: "B+",
      componentType: "Plaquettes",
      quantityInStock: 10,
      expirationDate: "20/02/2025",
      collectionDate: "15/01/2025",
      storageLocation: "Saint-Louis - Banque de Sang",
      donationStatus: "En cours d'utilisation",
      batchNumber: "SN-B125",
      qualityStatus: "Bon",
      temperatureRange: "20-24°C",
    },
    {
      productId: "BP004",
      bloodGroup: "AB+",
      componentType: "Sang total",
      quantityInStock: 30,
      expirationDate: "22/03/2025",
      collectionDate: "01/02/2025",
      storageLocation: "Réfrigérateur",
      donationStatus: "Frais",
      batchNumber: "SN-B126",
      qualityStatus: "Bon",
      temperatureRange: "2-6°C",
    },
    {
      productId: "BP005",
      bloodGroup: "O-",
      componentType: "Globules rouges",
      quantityInStock: 5,
      expirationDate: "05/05/2025",
      collectionDate: "10/04/2025",
      storageLocation: "Congélateur",
      donationStatus: "Frais",
      batchNumber: "SN-B127",
      qualityStatus: "Bon",
      temperatureRange: "-18°C",
    },
    {
      productId: "BP006",
      bloodGroup: "A+",
      componentType: "Plasma",
      quantityInStock: 20,
      expirationDate: "12/06/2025",
      collectionDate: "15/05/2025",
      storageLocation: "Dakar - Hôpital Fann",
      donationStatus: "Périmé",
      batchNumber: "SN-B128",
      qualityStatus: "Hémolysés",
      temperatureRange: "-18°C",
    },
    {
      productId: "BP007",
      bloodGroup: "B-",
      componentType: "Plaquettes",
      quantityInStock: 12,
      expirationDate: "30/07/2025",
      collectionDate: "20/06/2025",
      storageLocation: "Thiès - Centre Régional",
      donationStatus: "Frais",
      batchNumber: "SN-B129",
      qualityStatus: "Bon",
      temperatureRange: "20-24°C",
    },
    {
      productId: "BP008",
      bloodGroup: "AB-",
      componentType: "Sang total",
      quantityInStock: 8,
      expirationDate: "01/08/2025",
      collectionDate: "25/06/2025",
      storageLocation: "Saint-Louis - Banque de Sang",
      donationStatus: "En cours d'utilisation",
      batchNumber: "SN-B130",
      qualityStatus: "Coagulé",
      temperatureRange: "2-6°C",
    },
    {
      productId: "BP009",
      bloodGroup: "O+",
      componentType: "Globules rouges",
      quantityInStock: 18,
      expirationDate: "15/09/2025",
      collectionDate: "01/08/2025",
      storageLocation: "Réfrigérateur",
      donationStatus: "Frais",
      batchNumber: "SN-B131",
      qualityStatus: "Bon",
      temperatureRange: "2-6°C",
    },
    {
      productId: "BP010",
      bloodGroup: "A-",
      componentType: "Plasma",
      quantityInStock: 22,
      expirationDate: "20/10/2025",
      collectionDate: "10/09/2025",
      storageLocation: "Congélateur",
      donationStatus: "Frais",
      batchNumber: "SN-B132",
      qualityStatus: "Bon",
      temperatureRange: "-18°C",
    },
  ])

  const [newStock, setNewStock] = useState<Partial<BloodStock>>({
    productId: "",
    bloodGroup: "A+",
    componentType: "Globules rouges",
    quantityInStock: 0,
    expirationDate: "",
    collectionDate: "",
    storageLocation: "Dakar - Hôpital Fann",
    donationStatus: "Frais",
    batchNumber: "",
    qualityStatus: "Bon",
    temperatureRange: "",
  })

  const tableRef = useRef<HTMLTableElement>(null)

  const filteredStocks = bloodStocks.filter(
    (stock) =>
      stock.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage)
  const paginatedStocks = filteredStocks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleEdit = (productId: string) => {
    alert(`Édition de ${productId}`)
  }

  const handleDelete = (productId: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${productId}?`)) {
      setBloodStocks(bloodStocks.filter((stock) => stock.productId !== productId))
      alert(`Produit ${productId} supprimé.`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewStock({
      ...newStock,
      [name]: name === "quantityInStock" ? Number.parseInt(value) : value,
    })
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation basique
    if (!newStock.productId || !newStock.batchNumber || !newStock.expirationDate || !newStock.collectionDate) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Vérifier si l'ID existe déjà
    if (bloodStocks.some((stock) => stock.productId === newStock.productId)) {
      alert("Cet ID de produit existe déjà")
      return
    }

    // Ajouter le nouveau stock
    const stockToAdd = newStock as BloodStock
    setBloodStocks([...bloodStocks, stockToAdd])

    // Réinitialiser le formulaire
    setNewStock({
      productId: "",
      bloodGroup: "A+",
      componentType: "Globules rouges",
      quantityInStock: 0,
      expirationDate: "",
      collectionDate: "",
      storageLocation: "Dakar - Hôpital Fann",
      donationStatus: "Frais",
      batchNumber: "",
      qualityStatus: "Bon",
      temperatureRange: "",
    })

    setShowAddForm(false)
    alert("Produit ajouté avec succès!")
  }

  const exportToCSV = () => {
    // Créer les en-têtes CSV
    const headers = [
      "ID Produit",
      "Groupe",
      "Composant",
      "Quantité",
      "Échéance",
      "Collecte",
      "Lieu",
      "Statut",
      "Lot",
      "Qualité",
      "Température",
    ].join(",")

    // Créer les lignes de données
    const rows = bloodStocks.map((stock) =>
      [
        stock.productId,
        stock.bloodGroup,
        stock.componentType,
        stock.quantityInStock,
        stock.expirationDate,
        stock.collectionDate,
        stock.storageLocation,
        stock.donationStatus,
        stock.batchNumber,
        stock.qualityStatus,
        stock.temperatureRange,
      ].join(","),
    )

    // Combiner les en-têtes et les lignes
    const csvContent = [headers, ...rows].join("\n")

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "stock_de_sang.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion du Stock de Sang</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Rechercher un produit
            </label>
            <input
              id="search"
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              ➕ Ajouter
            </button>
            <button
              onClick={exportToCSV}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              ⬇️ Exporter
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Ajouter un nouveau produit sanguin</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Produit*
                  </label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    value={newStock.productId}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                    Groupe Sanguin
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={newStock.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="componentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de Composant
                  </label>
                  <select
                    id="componentType"
                    name="componentType"
                    value={newStock.componentType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {componentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité en Stock
                  </label>
                  <input
                    type="number"
                    id="quantityInStock"
                    name="quantityInStock"
                    value={newStock.quantityInStock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'Expiration*
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={newStock.expirationDate}
                    onChange={handleInputChange}
                    placeholder="JJ/MM/AAAA"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de Collecte*
                  </label>
                  <input
                    type="text"
                    id="collectionDate"
                    name="collectionDate"
                    value={newStock.collectionDate}
                    onChange={handleInputChange}
                    placeholder="JJ/MM/AAAA"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="storageLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Lieu de Stockage
                  </label>
                  <select
                    id="storageLocation"
                    name="storageLocation"
                    value={newStock.storageLocation}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {storageLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="donationStatus" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    id="donationStatus"
                    name="donationStatus"
                    value={newStock.donationStatus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {donationStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de Lot*
                  </label>
                  <input
                    type="text"
                    id="batchNumber"
                    name="batchNumber"
                    value={newStock.batchNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="qualityStatus" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut de Qualité
                  </label>
                  <select
                    id="qualityStatus"
                    name="qualityStatus"
                    value={newStock.qualityStatus}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {qualityStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="temperatureRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Plage de Température
                  </label>
                  <input
                    type="text"
                    id="temperatureRange"
                    name="temperatureRange"
                    value={newStock.temperatureRange}
                    onChange={handleInputChange}
                    placeholder="ex: 2-6°C"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table ref={tableRef} className="w-full text-sm text-left text-gray-700">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4">
                <label htmlFor="select-all" className="sr-only">
                  Sélectionner tous les éléments
                </label>
                <input
                  id="select-all"
                  type="checkbox"
                  className="rounded text-green-600"
                  aria-label="Sélectionner tous les éléments"
                />
              </th>
              {[
                "ID Produit",
                "Groupe",
                "Composant",
                "Quantité",
                "Échéance",
                "Collecte",
                "Lieu",
                "Statut",
                "Lot",
                "Qualité",
                "Température",
                "Actions",
              ].map((header) => (
                <th key={header} className="p-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedStocks.map((stock) => (
              <tr key={stock.productId} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <label htmlFor={`checkbox-${stock.productId}`} className="sr-only">
                    Sélectionner {stock.productId}
                  </label>
                  <input
                    id={`checkbox-${stock.productId}`}
                    type="checkbox"
                    className="rounded text-green-600"
                    aria-label={`Sélectionner ${stock.productId}`}
                  />
                </td>
                <td className="p-4">{stock.productId}</td>
                <td className="p-4">{stock.bloodGroup}</td>
                <td className="p-4">{stock.componentType}</td>
                <td className="p-4">{stock.quantityInStock}</td>
                <td className="p-4">
                  <span className="flex items-center gap-1">📅 {stock.expirationDate}</span>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-1">📅 {stock.collectionDate}</span>
                </td>
                <td className="p-4">{stock.storageLocation}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      stock.donationStatus === "Frais"
                        ? "bg-green-100 text-green-800"
                        : stock.donationStatus === "En cours d'utilisation"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stock.donationStatus}
                  </span>
                </td>
                <td className="p-4">{stock.batchNumber}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      stock.qualityStatus === "Bon"
                        ? "bg-green-100 text-green-800"
                        : stock.qualityStatus === "Hémolysés"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {stock.qualityStatus}
                  </span>
                </td>
                <td className="p-4">{stock.temperatureRange}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(stock.productId)}
                    className="hover:underline"
                    aria-label={`Éditer ${stock.productId}`}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(stock.productId)}
                    className="hover:underline"
                    aria-label={`Supprimer ${stock.productId}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <label htmlFor="items-per-page" className="text-gray-600">
            Éléments par page :
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500"
            aria-label="Sélectionner le nombre d'éléments par page"
          >
            {[10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredStocks.length)} sur ${filteredStocks.length}`}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg disabled:bg-gray-400"
            aria-label="Page précédente"
          >
            {"<"}
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg disabled:bg-gray-400"
            aria-label="Page suivante"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StockDeSang


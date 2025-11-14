"use client";

import React, { useState, useContext, useMemo } from "react";
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord";
import EvaImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/Mh.png";

interface Medecin {
  nom: string;
  specialite: string;
  telephone: string;
  adresse: string;
  evaluations: string;
  description: string;
  avis: string;
  tarif: string;
  horaires: string;
  detailsSupplementaires?: string;
  image: string;
}

interface MedecinProps {
  titre?: string;
}

const initialMedecins: Medecin[] = [
  {
    nom: "Dr Fatou Badji",
    specialite: "Médecine générale",
    telephone: "771000001",
    adresse: "Avenue Cheikh Anta Diop, Dakar",
    evaluations: "★★★★☆ (245 évaluations)",
    description: "Dr Fatou Badji est une médecin généraliste expérimentée, spécialisée dans le suivi des patients pour des soins primaires et la gestion des maladies chroniques à Dakar.",
    avis: "156 Avis",
    tarif: "10 000 FCFA",
    horaires: "LUN - VEN 08:00 - 18:00",
    detailsSupplementaires: "Consultations à domicile disponibles sur rendez-vous.",
    image: EvaImage,
  },
  {
    nom: "Dr Abdou Diallo",
    specialite: "Médecine générale",
    telephone: "771000002",
    adresse: "Rue Carnot, Dakar-Plateau",
    evaluations: "★★★★★ (678 évaluations)",
    description: "Dr Abdou Diallo est un médecin généraliste renommé, expert dans les consultations de routine et le traitement des maladies courantes à Dakar.",
    avis: "320 Avis",
    tarif: "12 000 FCFA",
    horaires: "LUN - SAM 09:00 - 17:00",
    detailsSupplementaires: "Spécialisé dans les bilans de santé annuels.",
    image: EvaImage,
  },
  {
    nom: "Dr Mariama Kane",
    specialite: "Médecine générale",
    telephone: "771000003",
    adresse: "Boulevard de la République, Dakar",
    evaluations: "★★★★☆ (300 évaluations)",
    description: "Dr Mariama Kane offre des soins de médecine générale avec une approche centrée sur le patient à Dakar.",
    avis: "180 Avis",
    tarif: "11 000 FCFA",
    horaires: "LUN - VEN 08:30 - 17:30",
    detailsSupplementaires: "Accepte les urgences sans rendez-vous.",
    image: EvaImage,
  },
  {
    nom: "Dr Linda Basséne",
    specialite: "Médecine générale",
    telephone: "771000004",
    adresse: "Rue de Thiong, Dakar",
    evaluations: "★★★☆☆ (150 évaluations)",
    description: "Dr Linda Basséne est spécialisée dans les soins primaires et les consultations générales à Dakar.",
    avis: "90 Avis",
    tarif: "10 000 FCFA",
    horaires: "LUN - VEN 09:00 - 16:00",
    detailsSupplementaires: "Formée en médecine préventive.",
    image: EvaImage,
  },
  {
    nom: "Dr Fatima Gueye",
    specialite: "Médecine générale",
    telephone: "771000005",
    adresse: "Avenue Blaise Diagne, Dakar",
    evaluations: "★★★★☆ (200 évaluations)",
    description: "Dr Fatima Gueye propose des consultations de médecine générale avec une expertise dans les maladies courantes.",
    avis: "120 Avis",
    tarif: "12 000 FCFA",
    horaires: "LUN - SAM 08:00 - 17:00",
    detailsSupplementaires: "Consultations en ligne disponibles.",
    image: EvaImage,
  },
  {
    nom: "Dr Ndeye Awa Dieng",
    specialite: "Cardiologie",
    telephone: "771000006",
    adresse: "Rue de la Poste, Dakar",
    evaluations: "★★★★☆ (412 évaluations)",
    description: "Dr Ndeye Awa Dieng est une cardiologue expérimentée, spécialisée dans le diagnostic et le traitement des maladies cardiovasculaires à Dakar.",
    avis: "245 Avis",
    tarif: "20 000 FCFA",
    horaires: "LUN - VEN 09:00 - 18:00",
    detailsSupplementaires: "Expertise en échocardiographie.",
    image: EvaImage,
  },
  {
    nom: "Dr Awa Sall",
    specialite: "Cardiologie",
    telephone: "771000007",
    adresse: "Rue Jean de la Fontaine, Dakar",
    evaluations: "★★★★☆ (350 évaluations)",
    description: "Dr Awa Sall est une cardiologue reconnue pour son expertise dans les pathologies cardiaques à Dakar.",
    avis: "210 Avis",
    tarif: "22 000 FCFA",
    horaires: "LUN - VEN 08:30 - 17:30",
    detailsSupplementaires: "Spécialisée dans la gestion de l’hypertension.",
    image: EvaImage,
  },
  {
    nom: "Dr Hawa Demba Keita",
    specialite: "Cardiologie",
    telephone: "771000008",
    adresse: "Boulangerie Jaune, Sacré-Cœur 3",
    evaluations: "★★★★★ (500 évaluations)",
    description: "Dr Hawa Demba Keita excelle dans le suivi des patients atteints de troubles cardiovasculaires à Dakar.",
    avis: "300 Avis",
    tarif: "25 000 FCFA",
    horaires: "LUN - SAM 09:00 - 18:00",
    detailsSupplementaires: "Consultations en cardiologie pédiatrique disponibles.",
    image: EvaImage,
  },
  {
    nom: "Dr Adéline Correa",
    specialite: "Chirurgie",
    telephone: "771000009",
    adresse: "Rue 10, Grand-Dakar",
    evaluations: "★★★★☆ (189 évaluations)",
    description: "Dr Adéline Correa est une chirurgienne dévouée, spécialisée dans les interventions orthopédiques et générales à Dakar.",
    avis: "98 Avis",
    tarif: "25 000 FCFA",
    horaires: "LUN - VEN 08:30 - 16:30",
    detailsSupplementaires: "Expérience en chirurgie mini-invasive.",
    image: EvaImage,
  },
  {
    nom: "Dr Paul Sarr",
    specialite: "Chirurgie",
    telephone: "771000010",
    adresse: "Rue Lac Rose, Niarry Tally",
    evaluations: "★★★★☆ (250 évaluations)",
    description: "Dr Paul Sarr est un chirurgien expérimenté dans les opérations complexes à Dakar.",
    avis: "150 Avis",
    tarif: "28 000 FCFA",
    horaires: "LUN - VEN 09:00 - 17:00",
    detailsSupplementaires: "Spécialisé en chirurgie abdominale.",
    image: EvaImage,
  },
  {
    nom: "Dr Khadija Barry",
    specialite: "Chirurgie",
    telephone: "771000011",
    adresse: "Liberté 6, Dakar",
    evaluations: "★★★★☆ (300 évaluations)",
    description: "Dr Khadija Barry est spécialisée dans la chirurgie générale et les soins post-opératoires à Dakar.",
    avis: "180 Avis",
    tarif: "27 000 FCFA",
    horaires: "LUN - SAM 08:00 - 16:00",
    detailsSupplementaires: "Consultations post-opératoires gratuites.",
    image: EvaImage,
  },
  {
    nom: "Dr Mariama Samaké",
    specialite: "Radiologie",
    telephone: "771000022",
    adresse: "Rue MZ-6, Mermoz",
    evaluations: "★★★☆☆ (67 évaluations)",
    description: "Dr Mariama Samaké est une radiologue spécialisée dans l’imagerie médicale pour diagnostiquer diverses pathologies à Dakar.",
    avis: "45 Avis",
    tarif: "15 000 FCFA",
    horaires: "LUN - VEN 09:00 - 16:00",
    detailsSupplementaires: "Expertise en radiologie interventionnelle.",
    image: EvaImage,
  },
  {
    nom: "Dr Mocktar Camara",
    specialite: "Radiologie",
    telephone: "771000023",
    adresse: "Rue de la Renaissance, Ouakam",
    evaluations: "★★★★☆ (200 évaluations)",
    description: "Dr Mocktar Camara excelle dans les diagnostics par imagerie médicale à Dakar.",
    avis: "130 Avis",
    tarif: "18 000 FCFA",
    horaires: "LUN - VEN 08:30 - 17:00",
    detailsSupplementaires: "Formé en IRM et scanner.",
    image: EvaImage,
  },
  {
    nom: "Dr Kris Memiague",
    specialite: "Dermatologie",
    telephone: "771000012",
    adresse: "Rue 25, Niarry Tally",
    evaluations: "★★★★☆ (180 évaluations)",
    description: "Dr Kris Memiague est un dermatologue spécialisé dans les affections cutanées à Dakar.",
    avis: "110 Avis",
    tarif: "15 000 FCFA",
    horaires: "LUN - VEN 09:00 - 17:00",
    detailsSupplementaires: "Traitements esthétiques disponibles.",
    image: EvaImage,
  },
];

const MedecinComponent: React.FC<MedecinProps> = ({ titre = "Gestion des Médecins" }) => {
  const [medecins, setMedecins] = useState<Medecin[]>(initialMedecins);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialite, setSelectedSpecialite] = useState("Toutes");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState<Medecin | null>(null);
  const [newMedecin, setNewMedecin] = useState<Partial<Medecin>>({});
  
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("Medecin must be used within a ThemeContext.Provider");
  const { isDarkMode } = themeContext;

  // Ajouter un médecin
  const handleAdd = () => {
    if (newMedecin.nom && newMedecin.specialite) {
      setMedecins([...medecins, {
        ...newMedecin,
        telephone: newMedecin.telephone || "Non renseigné",
        adresse: newMedecin.adresse || "Non renseignée",
        evaluations: "★★★★☆ (0 évaluation)",
        avis: "0 Avis",
        tarif: newMedecin.tarif || "Non renseigné",
        horaires: newMedecin.horaires || "Non renseignés",
        image: EvaImage,
      } as Medecin]);
      setShowAddModal(false);
      setNewMedecin({});
    }
  };

  // Modifier un médecin
  const handleEdit = () => {
    if (selectedMedecin) {
      setMedecins(medecins.map(m => 
        m.nom === selectedMedecin.nom ? { ...selectedMedecin, ...newMedecin } : m
      ));
      setShowEditModal(false);
    }
  };

  // Supprimer un médecin
  const handleDelete = () => {
    if (selectedMedecin) {
      setMedecins(medecins.filter(m => m.nom !== selectedMedecin.nom));
      setShowDeleteModal(false);
    }
  };

  // Filtrage des médecins
  const filteredMedecins = useMemo(() => {
    return medecins.filter(medecin => {
      const matchesSearch = medecin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medecin.specialite.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialite = selectedSpecialite === "Toutes" || 
        medecin.specialite === selectedSpecialite;
      return matchesSearch && matchesSpecialite;
    });
  }, [medecins, searchTerm, selectedSpecialite]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedecins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"}`}>
      {/* Barre de contrôle */}
      <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white shadow"}`}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-1 w-full">
            <input
              type="text"
              placeholder="Rechercher un médecin..."
              className={`p-2 rounded-lg flex-1 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-50"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-50"}`}
              value={selectedSpecialite}
              onChange={(e) => setSelectedSpecialite(e.target.value)}
            >
              <option value="Toutes">Toutes spécialités</option>
              {[...new Set(medecins.map(m => m.specialite))].map(specialite => (
                <option key={specialite} value={specialite}>{specialite}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            + Ajouter un médecin
          </button>
        </div>
      </div>

      {/* Liste des médecins */}
      <div className="space-y-4">
        {currentItems.map((medecin, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md transition-colors duration-200 ${
              isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={medecin.image}
                alt={`Photo de ${medecin.nom}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                      {medecin.nom}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {medecin.specialite}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMedecin(medecin);
                        setNewMedecin(medecin);
                        setShowEditModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMedecin(medecin);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      📞 {medecin.telephone}
                    </p>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      📍 {medecin.adresse}
                    </p>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      🕒 {medecin.horaires}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      💵 {medecin.tarif}
                    </p>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      ⭐ {medecin.evaluations}
                    </p>
                    <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      📝 {medecin.avis}
                    </p>
                  </div>
                </div>
                
                {medecin.detailsSupplementaires && (
                  <div className={`mt-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    ℹ️ {medecin.detailsSupplementaires}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={`mt-4 flex justify-between items-center p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white shadow"}`}>
        <div className="text-sm text-gray-600">
          {filteredMedecins.length} médecins trouvés
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              isDarkMode 
                ? "bg-gray-700 text-white hover:bg-gray-600" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredMedecins.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(filteredMedecins.length / itemsPerPage)}
            className={`px-3 py-1 rounded ${
              isDarkMode 
                ? "bg-gray-700 text-white hover:bg-gray-600" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modale d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg w-full max-w-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">Nouveau médecin</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, nom: e.target.value})}
              />
              <input
                type="text"
                placeholder="Spécialité"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, specialite: e.target.value})}
              />
              <input
                type="text"
                placeholder="Téléphone"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, telephone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Tarif"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, tarif: e.target.value})}
              />
              <input
                type="text"
                placeholder="Adresse"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, adresse: e.target.value})}
              />
              <input
                type="text"
                placeholder="Horaires"
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, horaires: e.target.value})}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded bg-green-500 text-white"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de modification */}
      {showEditModal && selectedMedecin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg w-full max-w-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">Modifier {selectedMedecin.nom}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                defaultValue={selectedMedecin.nom}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, nom: e.target.value})}
              />
              <input
                type="text"
                placeholder="Spécialité"
                defaultValue={selectedMedecin.specialite}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, specialite: e.target.value})}
              />
              <input
                type="text"
                placeholder="Téléphone"
                defaultValue={selectedMedecin.telephone}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, telephone: e.target.value})}
              />
              <input
                type="text"
                placeholder="Tarif"
                defaultValue={selectedMedecin.tarif}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, tarif: e.target.value})}
              />
              <input
                type="text"
                placeholder="Adresse"
                defaultValue={selectedMedecin.adresse}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, adresse: e.target.value})}
              />
              <input
                type="text"
                placeholder="Horaires"
                defaultValue={selectedMedecin.horaires}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700"
                onChange={(e) => setNewMedecin({...newMedecin, horaires: e.target.value})}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de suppression */}
      {showDeleteModal && selectedMedecin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer {selectedMedecin.nom} ?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedecinComponent;
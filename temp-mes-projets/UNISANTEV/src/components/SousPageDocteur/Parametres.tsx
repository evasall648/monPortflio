import React, { useState, useContext, FormEvent } from 'react';
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord"; // Importer le ThemeContext

// Interface pour les données du médecin
interface DoctorProfile {
  prenom: string;
  nom: string;
  ville: string;
  email: string;
  motDePasseActuel: string;
  nouveauMotDePasse: string;
}

// Composant principal Parametres
const Parametres: React.FC = () => {
  // Récupérer le contexte du thème
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("Parametres doit être utilisé dans un ThemeContext.Provider");
  }
  const { isDarkMode } = themeContext;

  // État initial pour les données du médecin
  const [profile, setProfile] = useState<DoctorProfile>({
    prenom: '',
    nom: '',
    ville: '',
    email: '',
    motDePasseActuel: '',
    nouveauMotDePasse: '',
  });

  // Gestion des changements dans les champs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestion de la soumission du mot de passe
  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile.motDePasseActuel || !profile.nouveauMotDePasse) {
      alert('Veuillez remplir tous les champs pour le mot de passe.');
      return;
    }
    // Logique pour envoyer les données à une API ou un backend (exemple)
    console.log('Mot de passe actuel:', profile.motDePasseActuel);
    console.log('Nouveau mot de passe:', profile.nouveauMotDePasse);
    alert('Mot de passe mis à jour avec succès !');
    setProfile((prev) => ({
      ...prev,
      motDePasseActuel: '',
      nouveauMotDePasse: '',
    }));
  };

  // Gestion de la soumission des paramètres du compte
  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile.prenom || !profile.nom || !profile.email) {
      alert('Veuillez remplir les champs obligatoires (Prénom, Nom, Email).');
      return;
    }
    // Logique pour envoyer les données à une API ou un backend (exemple)
    console.log('Profil mis à jour:', profile);
    alert('Paramètres du compte mis à jour avec succès !');
  };

  // Rendu du composant
  return (
    // Conteneur principal avec styles dynamiques selon le mode
    <div className={`max-w-4xl mx-auto p-4 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Section Mot de passe */}
      <form onSubmit={handlePasswordSubmit} className="mb-6">
        <div className={`border rounded-lg p-4 mb-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="mb-4">
            <label htmlFor="motDePasseActuel" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Mot de passe actuel
            </label>
            <input
              type="password"
              id="motDePasseActuel"
              name="motDePasseActuel"
              value={profile.motDePasseActuel}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Mot de passe actuel"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nouveauMotDePasse" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="nouveauMotDePasse"
              name="nouveauMotDePasse"
              value={profile.nouveauMotDePasse}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Nouveau mot de passe"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          Sauvegarder
        </button>
      </form>

      {/* Section Paramètres du compte */}
      <form onSubmit={handleProfileSubmit}>
        <h2 className="text-lg font-semibold mb-4">Paramètres du compte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="prenom" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={profile.prenom}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Prénom"
            />
          </div>
          <div>
            <label htmlFor="nom" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={profile.nom}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Nom"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ville" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              value={profile.ville}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Ville"
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
              placeholder="Email"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default Parametres;
"use client";

import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Importation de useNavigate pour la navigation et Link pour les liens
import heartImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/FG.jpg"; // Importation de l'image (vérifiez que ce chemin est correct)

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate(); // Hook pour gérer la navigation programmatique

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission du formulaire
    // Logique de réinitialisation du mot de passe (à implémenter, par exemple : appel API)
    console.log("Soumission du formulaire de réinitialisation avec l'email saisi");
    // Pour cet exemple, on redirige directement vers la page de connexion après soumission
    navigate("/PageDOCTEUR_Et_PRINCIPAL/LoginPage", { replace: true }); // Redirection vers LoginPage avec remplacement dans l'historique
  };

  return (
    <div className="flex min-h-screen"> {/* Conteneur principal avec hauteur minimale de l'écran */}
      {/* Section de gauche : Image occupant tout l'espace, visible uniquement sur grand écran */}
      <div className="hidden lg:flex w-1/2 bg-green-50"> {/* Caché sur petit écran, affiché sur grand écran (lg), largeur 50% */}
        <img
          src={heartImage} // Source de l'image importée
          alt="Heart Illustration" // Texte alternatif pour l'accessibilité
          className="w-full h-full object-cover" // L'image occupe toute la largeur et hauteur, avec recadrage si nécessaire
          onError={() => console.error("Erreur de chargement de l'image heartImage")} // Log en cas d'erreur de chargement
        />
        {/* Pas de titre ici pour laisser l'image occuper tout l'espace */}
      </div>

      {/* Section de droite : Formulaire de réinitialisation */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-gray-800 text-white"> {/* Pleine largeur sur petit écran, 50% sur grand écran */}
        <h2 className="text-2xl font-bold">Mot de passe oublié</h2> {/* Titre principal */}
        <p className="text-gray-300 text-sm mt-1"> {/* Paragraphe explicatif avec marge supérieure */}
          Nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        {/* Formulaire de réinitialisation */}
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm"> {/* Formulaire avec gestionnaire de soumission, marge supérieure et largeur max */}
          {/* Champ Email */}
          <label htmlFor="email" className="block text-gray-300"> {/* Étiquette associée au champ email */}
            Email*
          </label>
          <input
            id="email" // Identifiant pour lier au label
            type="email" // Type email pour validation native du navigateur
            placeholder="Entrez votre email" // Texte indicatif dans le champ
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400" // Styles : pleine largeur, padding, bordure, fond gris, texte blanc, anneau bleu au focus
            required // Champ requis pour la soumission
          />

          {/* Bouton de soumission */}
          <button
            type="submit" // Type soumission pour déclencher handleSubmit
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition duration-300" // Styles : pleine largeur, fond bleu, texte blanc, padding, coins arrondis, marge supérieure, survol plus foncé, transition fluide
          >
            Réinitialiser mon Mot de Passe {/* Texte du bouton */}
          </button>
        </form>

        {/* Lien vers la page de connexion */}
        <p className="mt-6 text-gray-300 text-sm"> {/* Paragraphe avec lien, marge supérieure */}
          Vous avez déjà un compte ?{" "}
          <Link
            to="/PageDOCTEUR_Et_PRINCIPAL/LoginPage" // Chemin vers LoginPage, cohérent avec App.tsx
            className="text-green-400 hover:underline" // Styles : texte bleu, soulignement au survol
          >
            Se connecter {/* Texte cliquable */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword; // Exportation du composant pour utilisation dans les routes
"use client";

import React, { useState } from "react";
import docImage from "../../assets/Image_Patient/phar.png"; // Import de l'image de fond

const Localisation: React.FC = () => {
  // État pour stocker les coordonnées (non affiché, juste pour la logique interne)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  // État pour indiquer si la localisation est en cours
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour récupérer la localisation et ouvrir la carte
  const handleGetLocation = () => {
    // Vérifie si l'API de géolocalisation est disponible dans le navigateur
    if (navigator.geolocation) {
      setIsLoading(true); // Active l'état de chargement
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Récupère latitude et longitude depuis la position
          const { latitude, longitude } = position.coords;
          // Met à jour l'état location (même si non affiché)
          setLocation({ latitude, longitude });
          // Ouvre Bing Maps dans un nouvel onglet avec la recherche de pharmacies
          window.open(
            `https://www.bing.com/maps?&ty=17&q=pharmacies&mb=${latitude}~${longitude}&usebfpr=true`,
            "_blank"
          );
          setIsLoading(false); // Désactive l'état de chargement
        },
        (error) => {
          // Gestion des erreurs
          setIsLoading(false); // Désactive l'état de chargement même en cas d'erreur
          alert("Erreur : " + error.message); // Affiche une alerte en cas d'erreur
        },
        {
          enableHighAccuracy: true, // Demande une localisation précise
          timeout: 10000, // Temps maximum d'attente (10 secondes)
          maximumAge: 0, // Force une nouvelle localisation (pas de cache)
        }
      );
    } else {
      // Si la géolocalisation n'est pas supportée
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen w-full overflow-hidden bg-cover bg-center"
      style={{
        // Utilisation de l'image importée comme fond
        backgroundImage: `url(${docImage})`,
        backgroundSize: "cover", // Assure que l'image couvre tout sans déborder
        backgroundPosition: "center", // Centre l'image
        maxHeight: "100vh", // Limite la hauteur à l'écran
        maxWidth: "100vw", // Limite la largeur à l'écran
      }}
    >
      {/* Overlay sombre pour améliorer la lisibilité du bouton */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Conteneur du bouton */}
      <div className="relative z-10 flex flex-col items-center">
        <button
          onClick={handleGetLocation} // Appel de la fonction au clic
          disabled={isLoading} // Désactive le bouton pendant le chargement
          className={`px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg transition-transform transform ${
            isLoading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-green-700 hover:scale-105 active:scale-95"
          }`}
        >
          {/* Texte dynamique selon l'état de chargement */}
          {isLoading ? "Localisation en cours..." : "Localiser les Pharmacies"}
        </button>
      </div>
    </div>
  );
};

export default Localisation;
import React from "react";

const Deconnexion: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const handleLogout = () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (isConfirmed) {
      localStorage.removeItem("authToken"); // Supprime le token d'authentification
      onLogout(); // Appelle la fonction de déconnexion passée en prop pour rediriger
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
      title="Déconnexion"
    >
      <span className="mr-2">🚪</span> Déconnexion
    </button>
  );
};

export default Deconnexion;
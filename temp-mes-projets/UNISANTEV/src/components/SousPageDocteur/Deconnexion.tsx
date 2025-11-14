import React from 'react';
import { useNavigate } from 'react-router-dom';

// Interface pour les props (optionnelle, mais bonne pratique)
interface DeconnexionProps {
  onLogout?: () => void; // Callback optionnel après déconnexion
}

// Composant de déconnexion
const Deconnexion: React.FC<DeconnexionProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Suppression du token
    if (onLogout) onLogout(); // Appel du callback si fourni
    navigate('/PageDOCTEUR_Et_PRINCIPAL/LoginPage', { replace: true }); // Redirection corrigée
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      Déconnexion
    </button>
  );
};

export default Deconnexion;
"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heartImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/ins2.png"; // Vérifiez que ce chemin est correct

const Inscription: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>(""); // État pour stocker le rôle sélectionné

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si un rôle a été sélectionné
    if (!role) {
      alert("Veuillez sélectionner un rôle (Admin, Docteur ou Patient) avant de vous inscrire.");
      return;
    }

    // Log pour déboguer la valeur du rôle
    console.log("Rôle sélectionné avant redirection :", role);

    // Redirection basée sur le rôle sélectionné
    switch (role.toLowerCase()) { // Conversion en minuscules pour éviter les problèmes de casse
      case "admin":
        console.log("Redirection vers /admin");
        navigate("/admin", { replace: true });
        break;
      case "docteur":
        console.log("Redirection vers /doctor");
        navigate("/doctor", { replace: true });
        break;
      case "patient":
        console.log("Redirection vers /patient");
        navigate("/patient", { replace: true });
        break;
      default:
        console.log("Rôle non valide, redirection vers /PageDOCTEUR_Et_PRINCIPAL/LoginPage");
        alert("Rôle non valide. Redirection vers la page de connexion.");
        navigate("/PageDOCTEUR_Et_PRINCIPAL/LoginPage", { replace: true });
    }
  };

  // Redirection vers la page de connexion
  const redirectToLogin = () => {
    console.log("Redirection manuelle vers /PageDOCTEUR_Et_PRINCIPAL/LoginPage");
    navigate("/PageDOCTEUR_Et_PRINCIPAL/LoginPage", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Section image à gauche (visible sur grand écran) */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-green-50 p-6">
        <img
          src={heartImage}
          alt="Heart Illustration"
          className="w-full h-full object-cover"
          onError={() => console.error("Erreur de chargement de l'image heartImage")}
        />
        <h1 className="text-3xl font-bold text-green-900 mt-4">Clinique des Miracles</h1>
      </div>

      {/* Section formulaire à droite */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">S'inscrire</h2>
        <p className="text-gray-300 text-sm mt-1">Entrez les détails pour créer votre compte</p>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
          {/* Champ Nom d'utilisateur */}
          <label htmlFor="username" className="block text-gray-300">
            Nom d'utilisateur*
          </label>
          <input
            id="username"
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Champ Email */}
          <label htmlFor="email" className="block mt-4 text-gray-300">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Champ Mot de passe */}
          <label htmlFor="password" className="block mt-4 text-gray-300">
            Mot de passe*
          </label>
          <input
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Champ Confirmation du mot de passe */}
          <label htmlFor="confirm-password" className="block mt-4 text-gray-300">
            Confirmer le mot de passe*
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirmez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Sélection du rôle */}
          <label htmlFor="role" className="block mt-4 text-gray-300">
            S'inscrire en tant que*
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              console.log("Rôle sélectionné dans le select :", e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
            aria-label="Sélectionnez votre rôle"
          >
            
            <option value="admin">Admin</option>
            <option value="docteur">Docteur</option>
            <option value="patient">Patient</option>
          </select>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition-colors duration-200"
          >
            S'inscrire
          </button>
        </form>

        {/* Lien vers la page de connexion */}
        <div className="mt-6 text-gray-300 text-sm">
          Déjà inscrit ?{" "}
          <button
            onClick={redirectToLogin}
            className="text-green-400 hover:underline focus:outline-none ml-1"
          >
            Connexion
          </button>
        </div>

        {/* Séparateur "OU" */}
        <div className="mt-6 text-gray-300 text-sm">OU</div>

        {/* Boutons de connexion sociale */}
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Se connecter avec Google"
          >
            <i className="fab fa-google"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Se connecter avec Facebook"
          >
            <i className="fab fa-facebook"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Se connecter avec Twitter"
          >
            <i className="fab fa-twitter"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Se connecter avec LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
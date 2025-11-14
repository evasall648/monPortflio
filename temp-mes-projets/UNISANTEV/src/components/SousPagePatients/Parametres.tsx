"use client";

import React, { useState } from "react";

const Parametres: React.FC = () => {
  const [securityForm, setSecurityForm] = useState({
    patientName: "",
    currentPassword: "",
    newPassword: "",
  });
  const [accountForm, setAccountForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    country: "",
    birthDate: "",
    mobile: "",
    bloodGroup: "",
    address: "",
  });
  const [isSecuritySaved, setIsSecuritySaved] = useState(false);
  const [isAccountSaved, setIsAccountSaved] = useState(false);

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({ ...prev, [name]: value }));
    setIsSecuritySaved(false);
  };

  const handleAccountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
    setIsAccountSaved(false);
  };

  const handleSaveSecurity = () => {
    if (
      securityForm.patientName &&
      securityForm.currentPassword &&
      securityForm.newPassword
    ) {
      console.log("Paramètres de sécurité sauvegardés :", securityForm);
      setIsSecuritySaved(true);
    } else {
      alert("Veuillez remplir tous les champs de sécurité.");
    }
  };

  const handleSaveAccount = () => {
    if (
      accountForm.firstName &&
      accountForm.lastName &&
      accountForm.email &&
      accountForm.mobile
    ) {
      console.log("Paramètres du compte sauvegardés :", accountForm);
      setIsAccountSaved(true);
    } else {
      alert("Veuillez remplir tous les champs obligatoires du compte.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Paramètres <span className="text-green-500"></span>
      </h2>

      {/* Paramètres de sécurité */}
      <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Paramètres de sécurité</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom du patient
            </label>
            <input
              type="text"
              name="patientName"
              value={securityForm.patientName}
              onChange={handleSecurityChange}
              className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nom du patient"
              aria-label="Nom du patient"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe actuel
            </label>
            <input
              type="password"
              name="currentPassword"
              value={securityForm.currentPassword}
              onChange={handleSecurityChange}
              className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Mot de passe actuel"
              aria-label="Mot de passe actuel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="newPassword"
              value={securityForm.newPassword}
              onChange={handleSecurityChange}
              className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nouveau mot de passe"
              aria-label="Nouveau mot de passe"
            />
          </div>
          <button
            onClick={handleSaveSecurity}
            className={`mt-4 px-6 py-2 rounded-lg text-white transition-colors ${
              isSecuritySaved
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isSecuritySaved ? "Sauvegardé ✓" : "Sauvegarder"}
          </button>
        </div>
      </div>

      {/* Paramètres du compte */}
      <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Paramètres du compte</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={accountForm.firstName}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Prénom"
                aria-label="Prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom de famille
              </label>
              <input
                type="text"
                name="lastName"
                value={accountForm.lastName}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nom de famille"
                aria-label="Nom de famille"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={accountForm.city}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ville"
                aria-label="Ville"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={accountForm.email}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Email"
                aria-label="Email"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de naissance
              </label>
              <input
                type="date"
                name="birthDate"
                value={accountForm.birthDate}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Date de naissance"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="mobile"
                value={accountForm.mobile}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Téléphone"
                aria-label="Téléphone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Groupe sanguin
              </label>
              <select
                name="bloodGroup"
                value={accountForm.bloodGroup}
                onChange={handleAccountChange}
                className="mt-1 p-3 w-full border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Groupe sanguin"
              >
                <option value="">Sélectionner</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSaveAccount}
            className={`mt-4 px-6 py-2 rounded-lg text-white transition-colors ${
              isAccountSaved
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isAccountSaved ? "Enregistré ✓" : "Enregistrer les modifications"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parametres;
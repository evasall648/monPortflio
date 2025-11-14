"use client";

import React, { useState } from "react";
import { useAppointments, Appointment } from "../appointmentsStore";

// Extension locale de l'interface Appointment pour inclure 'fichier'
interface ExtendedAppointment extends Appointment {
  fichier: File | null;
}

interface FormData {
  prenom: string;
  nom: string;
  genre: string;
  telephone: string;
  messagerieElectronique: string;
  dateNaissance: string;
  medecinConsultant: string;
  dateNomination: string;
  heureRendezvous: string;
  motif: string;
  description: string;
  fichier: File | null;
}

const PrendreRendezvous: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    prenom: "",
    nom: "",
    genre: "",
    telephone: "",
    messagerieElectronique: "",
    dateNaissance: "",
    medecinConsultant: "",
    dateNomination: "",
    heureRendezvous: "",
    motif: "",
    description: "",
    fichier: null,
  });
  const [nomFichier, setNomFichier] = useState<string | null>(null);

  const { addAppointment } = useAppointments();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "telephone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, fichier: e.target.files[0] });
      setNomFichier(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^(7[0-8]|3[0-3])[0-9]{7}$/;
    if (!phoneRegex.test(formData.telephone)) {
      alert("Le numéro de téléphone doit être un numéro sénégalais valide (9 chiffres commençant par 7 ou 3).");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const startTime = formData.heureRendezvous.split("-")[0];
    const newAppointment: ExtendedAppointment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      doctorName: medecins.find((m) => m.value === formData.medecinConsultant)?.label || "Médecin non spécifié",
      dateTime: `${formData.dateNomination} ${startTime}:00`,
      reason: formData.motif || "Non spécifié",
      contact: formData.telephone,
      status: "En attente",
      location: "Clinique Dakar",
      patientName: `${formData.prenom} ${formData.nom}`.trim(),
      patientEmail: formData.messagerieElectronique,
      patientGender: formData.genre,
      patientBirthDate: formData.dateNaissance,
      description: formData.description || "",
      fichier: formData.fichier, // Maintenant valide grâce à ExtendedAppointment
    };

    addAppointment(newAppointment);
    console.log("Rendez-vous soumis :", newAppointment);
    alert(
      `Rendez-vous soumis avec succès ! Il sera affiché dans ${
        formData.dateNomination === today ? "Rendez-vous Aujourd’hui" : "Rendez-vous à venir"
      }.`
    );
    setFormData({
      prenom: "",
      nom: "",
      genre: "",
      telephone: "",
      messagerieElectronique: "",
      dateNaissance: "",
      medecinConsultant: "",
      dateNomination: "",
      heureRendezvous: "",
      motif: "",
      description: "",
      fichier: null,
    });
    setNomFichier(null);
  };

  const handleCancel = () => {
    if (window.confirm("Voulez-vous vraiment annuler le formulaire ?")) {
      setFormData({
        prenom: "",
        nom: "",
        genre: "",
        telephone: "",
        messagerieElectronique: "",
        dateNaissance: "",
        medecinConsultant: "",
        dateNomination: "",
        heureRendezvous: "",
        motif: "",
        description: "",
        fichier: null,
      });
      setNomFichier(null);
    }
  };

  const timeSlots = [
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
    "12:00-12:30",
    "12:30-13:00",
    "15:00-16:00",
    "16:00-16:30",
    "16:30-17:00",
    "17:00-17:30",
    "17:30-18:00",
  ];

  const medecins = [
    { value: "hawa-demba-keita", label: "Hawa Demba Keita", specialty: "Médecine générale" },
    { value: "awa-sall", label: "Awa Sall", specialty: "Radiologie" },
    { value: "ndeye-awa-dieng", label: "Ndeye Awa Dieng", specialty: "Cardiologie" },
    { value: "kris-memiague", label: "Kris Memiague", specialty: "Pédiatrie" },
    { value: "danicha-bakana", label: "Danicha Bakana", specialty: "Dermatologie" },
    { value: "nafi-badji", label: "Nafi Badji", specialty: "Gynécologie" },
    { value: "mody-yero-ndiaye", label: "Mody Yero Ndiaye", specialty: "Neurologie" },
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Prendre un rendez-vous</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="prenom"
            placeholder="Prénom*"
            value={formData.prenom}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            aria-label="Prénom"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            aria-label="Nom"
          />
        </div>

        <div className="flex space-x-4">
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            aria-label="Genre"
          >
            <option value="" disabled>
              Genre
            </option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            maxLength={9}
            aria-label="Téléphone"
          />
        </div>

        <div className="flex space-x-4">
          <input
            type="email"
            name="messagerieElectronique"
            placeholder="E-mail"
            value={formData.messagerieElectronique}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            aria-label="Messagerie électronique"
          />
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date de naissance*
            </label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
              aria-label="Date de naissance"
              max={today}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 my-6"></div>

        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Détails du rendez-vous</h3>
        <div className="flex space-x-4">
          <select
            name="medecinConsultant"
            value={formData.medecinConsultant}
            onChange={handleChange}
            className="w-1/2 p-3 border bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
            aria-label="Médecin consultant"
          >
            <option value="" disabled>
              Médecin consultant*
            </option>
            {medecins.map((medecin) => (
              <option key={medecin.value} value={medecin.value} className="text-black dark:text-white">
                {medecin.label} - {medecin.specialty}
              </option>
            ))}
          </select>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date du rendez-vous*
            </label>
            <input
              type="date"
              name="dateNomination"
              value={formData.dateNomination}
              onChange={handleChange}
              className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
              aria-label="Date de nomination"
              min={today}
            />
          </div>
        </div>

        <div>
          <span className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Heure du rendez-vous* :</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {timeSlots.map((time) => (
              <label key={time} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="heureRendezvous"
                  value={time}
                  onChange={handleChange}
                  checked={formData.heureRendezvous === time}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                  required
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{time}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="motif"
          placeholder="Motif*"
          value={formData.motif}
          onChange={handleChange}
          className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
          aria-label="Motif"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-label="Description"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Télécharger des rapports</label>
          <div className="mt-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 dark:text-gray-300"
              aria-label="Télécharger des rapports"
            />
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
              {nomFichier || "Choisissez un fichier ou glisser-déposer le fichier ici"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6 gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Envoyer
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-green-300 dark:border-green-500 text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrendreRendezvous;
"use client";

import React from "react";

// Importation des images
import defaultImage from "../../assets/Image_Patient/moi.png";
import hawaImage from "../../assets/Image_Patient/hawa.jpg";
import evaImage from "../../assets/Image_Patient/eva.jpg";
import ndeyeImage from "../../assets/Image_Patient/ndeye.jpg";
import krisImage from "../../assets/Image_Patient/kris.jpg";
import joImage from "../../assets/Image_Patient/jo.jpg";
import docImage from "../../assets/Image_Patient/doc.jpg";
import modyImage from "../../assets/Image_Patient/mody.jpg";

// Interface pour le mapping des avatars avec signature d'index
interface DoctorImages {
  [key: string]: string;
  "Hawa Demba Keita": string;
  "Awa Sall": string;
  "Ndeye Awa Dieng": string;
  "Kris Memiague": string;
  "Danicha Bakana": string;
  "Nafi Badji": string;
  "Mody Yero Ndiaye": string;
}

const doctorImages: DoctorImages = {
  "Hawa Demba Keita": hawaImage,
  "Awa Sall": evaImage,
  "Ndeye Awa Dieng": ndeyeImage,
  "Kris Memiague": krisImage,
  "Danicha Bakana": joImage,
  "Nafi Badji": docImage,
  "Mody Yero Ndiaye": modyImage,
};

const getDoctorImage = (doctorName: string): string => {
  return doctorImages[doctorName] || defaultImage;
};

const ConsultationsPassées: React.FC = () => {
  const doctorName = "Hawa Demba Keita"; // Remplacement de "Fatou Badji"
  const doctorAvatar = getDoctorImage(doctorName);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Bienvenue !</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Voici l’historique de vos consultations passées. Consultez les détails de vos consultations
          précédentes avec nos professionnels de santé.
        </p>
      </div>

      <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg mb-6 flex items-center">
        <div className="flex-1">
          <h3 className="text-lg font-medium">Détails des Consultations passées</h3>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Date :</span> 10 Février 2025
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Médecin :</span> {doctorName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Spécialité :</span> Médecine générale
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Raison :</span> Consultation générale
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Lieu :</span> Dakar, Sénégal
            </p>
            <a href="#" className="text-green-600 dark:text-green-400 hover:underline mt-4 inline-block">
              Voir toutes les consultations
            </a>
          </div>
        </div>
        <div className="w-32 flex justify-center items-center">
          <img
            src={doctorAvatar}
            alt={doctorName}
            className="h-20 w-20 rounded-full object-cover"
            onError={(e) => (e.currentTarget.src = defaultImage)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationsPassées;
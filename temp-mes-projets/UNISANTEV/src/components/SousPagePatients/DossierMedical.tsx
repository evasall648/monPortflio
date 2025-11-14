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

// Interface pour un enregistrement médical
interface MedicalRecord {
  date: string;
  time?: string;
  type: string;
  description: string;
  doctorName: string;
  doctorAvatar?: string;
  attachments?: {
    count: number;
    downloadLink: string;
    viewLink: string;
  };
}

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

// Composant pour les pièces jointes
const AttachmentActions: React.FC<{
  attachments: MedicalRecord["attachments"];
  onDownload: (link: string) => void;
  onView: (link: string) => void;
}> = ({ attachments, onDownload, onView }) => (
  <div className="mt-3 flex items-center space-x-2">
    <svg
      className="h-5 w-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z" />
      <path d="M9 12h6v2H9v-2zm0 4h6v2H9v-2z" />
    </svg>
    <span className="text-sm text-gray-600 dark:text-gray-400">{attachments?.count} pièces jointes</span>
    <button
      onClick={() => onDownload(attachments!.downloadLink)}
      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm underline transition-colors"
    >
      Télécharger
    </button>
    <span className="text-gray-400 dark:text-gray-500">|</span>
    <button
      onClick={() => onView(attachments!.viewLink)}
      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm underline transition-colors"
    >
      Voir
    </button>
  </div>
);

// Composant principal
const DossierMedical: React.FC = () => {
  const medicalRecords: MedicalRecord[] = [
    {
      date: "15/01/2021",
      time: "",
      type: "Consultation",
      description:
        "Consultation avec Hawa Demba Keita pour des douleurs abdominales persistantes. Diagnostic de gastrite chronique.",
      doctorName: "Hawa Demba Keita",
      doctorAvatar: getDoctorImage("Hawa Demba Keita"),
    },
    {
      date: "20/03/2021",
      time: "10:30",
      type: "Radiographie",
      description:
        "Radiographie thoracique effectuée par Awa Sall pour évaluer une toux persistante. Pas de signes de pneumonie.",
      doctorName: "Awa Sall",
      doctorAvatar: getDoctorImage("Awa Sall"),
    },
    {
      date: "05/05/2021",
      time: "15:00",
      type: "Ordonnance",
      description:
        "Ordonnance de médicaments par Ndeye Awa Dieng pour traiter l'hypertension artérielle. Suivi recommandé dans un mois.",
      doctorName: "Ndeye Awa Dieng",
      doctorAvatar: getDoctorImage("Ndeye Awa Dieng"),
      attachments: {
        count: 3,
        downloadLink: "/api/download/ordonnance-05-05-2021",
        viewLink: "/api/view/ordonnance-05-05-2021",
      },
    },
  ];

  const handleDownload = (link: string) => {
    window.open(link, "_blank");
  };

  const handleView = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-5xl">
      {/* En-tête */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dossier Médical</h2>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">Archives médicales</div>

      {/* Contenu principal */}
      <div className="space-y-8">
        {medicalRecords.map((record, index) => (
          <div key={index} className="flex items-start gap-6 relative">
            {/* Timeline */}
            <div className="flex-shrink-0 w-28 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-600 mr-2" />
                <div>
                  <div className="font-semibold text-sm">{record.date}</div>
                  {record.time && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{record.time}</div>
                  )}
                </div>
              </div>
              {index < medicalRecords.length - 1 && (
                <div className="absolute left-1.5 top-6 w-0.5 h-[calc(100%-1rem)] bg-green-600" />
              )}
            </div>

            {/* Détails */}
            <div className="flex-1 p-5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-lg dark:hover:shadow-gray-800 transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={record.doctorAvatar}
                    alt={record.doctorName}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{record.type}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{record.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Dr. {record.doctorName}
                </span>
              </div>
              {record.attachments && (
                <AttachmentActions
                  attachments={record.attachments}
                  onDownload={handleDownload}
                  onView={handleView}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DossierMedical;
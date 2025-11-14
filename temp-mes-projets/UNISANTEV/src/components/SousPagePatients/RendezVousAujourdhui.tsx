"use client";

import React, { useState, useEffect } from "react";
import { useAppointments, Appointment } from "../appointmentsStore";
import defaultImage from "../../assets/Image_Patient/moi.png";
import hawaImage from "../../assets/Image_Patient/hawa.jpg";
import evaImage from "../../assets/Image_Patient/eva.jpg";
import ndeyeImage from "../../assets/Image_Patient/ndeye.jpg";
import krisImage from "../../assets/Image_Patient/kris.jpg";
import joImage from "../../assets/Image_Patient/jo.jpg";
import docImage from "../../assets/Image_Patient/doc.jpg";
import modyImage from "../../assets/Image_Patient/mody.jpg";

// Define type for doctorImages with index signature
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

const RendezVousAujourdhui: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const { appointments, cancelAppointment, deleteAppointments } = useAppointments();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((appt) => appt.dateTime.startsWith(today));

  const handleCancel = (id: string) => {
    if (window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
      cancelAppointment(id);
      console.log(`Rendez-vous ${id} annulé`);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) {
      deleteAppointments([id]);
      console.log(`Rendez-vous ${id} supprimé`);
    }
  };

  const handleDownload = (appointment: Appointment) => {
    const blob = new Blob([JSON.stringify(appointment, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rendez-vous-${appointment.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rendez-vous d'Aujourd'hui</h2>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Médecin</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Patient</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date et heure</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Motif</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Téléphone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Statut</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 ease-in-out">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={getDoctorImage(appointment.doctorName)}
                        alt={`${appointment.doctorName} profil`}
                        className="h-10 w-10 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultImage;
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appointment.doctorName}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appointment.patientName}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appointment.dateTime}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appointment.reason}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{appointment.contact}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "Confirmé"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : appointment.status === "Annulé"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                    {appointment.status !== "Annulé" && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Annuler le rendez-vous"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                      title="Supprimer le rendez-vous"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDownload(appointment)}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      title="Télécharger le rendez-vous"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  Aucun rendez-vous aujourd’hui.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(RendezVousAujourdhui);
"use client";

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Import des images en haut
import hawaPhoto from "../../assets/Image_Patient/hawa.jpg"; // Photo de Hawa Demba Keita
import ndeyePhoto from "../../assets/Image_Patient/ndeye.jpg"; // Photo de Ndeye Awa Dieng

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VitalSign {
  label: string;
  value: string | number;
  trend: string;
  icon?: string;
}

interface Appointment {
  doctorName: string;
  specialty: string;
  dateTime: string;
  reason: string;
  telephone: string; // Remplacement de "contact" par "telephone"
  photo: string;
}

interface Medication {
  name: string;
  dosage: string;
  instruction: string;
}

interface MedicalHistory {
  date: string;
  details: string;
}

interface HealthRecord {
  date: string;
  weight: number;
  activity: string;
}

const Dashboard: React.FC = () => {
  const history: MedicalHistory[] = [
    { date: "12 février 2023", details: "Consultation avec le médecin généraliste" },
    { date: "15 mars 2023", details: "Analyse de sang" },
  ];

  const healthRecords: HealthRecord[] = [
    { date: "01 mars 2023", weight: 70, activity: "Marche de 30 min" },
  ];

  const vitalSigns: VitalSign[] = [
    { label: "Tension Artérielle", value: "110/70", trend: "10% plus que le mois dernier", icon: "💉" },
    { label: "Fréquence Cardiaque", value: 72, trend: "07% moins que le mois dernier", icon: "❤" },
    { label: "Niveau de Glucose", value: "88-75", trend: "12% plus que le mois dernier", icon: "🍬" },
    { label: "Numération Globulaire", value: "9,456/mL", trend: "22% moins que le mois dernier", icon: "🩸" },
  ];

  const medications: Medication[] = [
    { name: "Econochloroquine-chloral", dosage: "1-0-1", instruction: "par jour" },
    { name: "Suppléments de Desmopressine", dosage: "1-1-1", instruction: "par jour" },
    { name: "Injection d'Abciximab", dosage: "1-0-0", instruction: "par jour" },
    { name: "Kevzara sarilumab", dosage: "0-0-1", instruction: "par jour" },
    { name: "Gentamicine-topique", dosage: "1-0-1", instruction: "par jour" },
    { name: "Palipéridone palmitate", dosage: "1-1-1", instruction: "par jour" },
    { name: "Sermoréline injectable", dosage: "1-0-0", instruction: "par jour" },
  ];

  const appointments: Appointment[] = [
    {
      doctorName: "Ndeye Awa Dieng",
      specialty: "Cardiologie",
      dateTime: "2025-03-26 00:00:00",
      reason: "Bilan cardiaque",
      telephone: "771000006", // Remplacement de "contact" par "telephone"
      photo: ndeyePhoto,
    },
    {
      doctorName: "Hawa Demba Keita",
      specialty: "Médecin Général", // Changement de "Chirurgie" à "Médecin Général"
      dateTime: "2025-03-20 10:00:00",
      reason: "Consultation pré-opératoire",
      telephone: "772493760", // Remplacement de "contact" par "telephone"
      photo: hawaPhoto,
    },
  ];

  const documents = [
    "Rapport de Sang",
    "Documents Médicaux",
    "Prescription Médicale",
    "Fichiers Radiographiques",
    "Rapport d'Urine",
    "Documents Scannés",
  ];

  const restingHeartRateData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"],
    datasets: [
      {
        label: "Fréquence Cardiaque (bpm)",
        data: [70, 72, 68, 74, 72, 71],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const restingHeartRateOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Fréquence Cardiaque au Repos" },
    },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: "bpm" } },
    },
  };

  const performanceHeartRateData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    datasets: [
      {
        label: "Performance (bpm)",
        data: [80, 85, 78, 90, 82],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const performanceHeartRateOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Fréquence Cardiaque de Performance" },
    },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: "bpm" } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
      </header>

      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bienvenue à la Clinique des miracles!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Nous saisissons cette occasion pour vous accueillir dans notre pratique et vous rappeler que vous avez
            choisi nos médecins pour personnaliser vos soins de santé. Nous avons hâte de vous offrir
            des soins de santé personnalisés et complets axés sur le bien-être et la prévention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {vitalSigns.map((sign, index) => (
            <div key={index} className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-2xl">{sign.icon}</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{sign.label}</h3>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{sign.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{sign.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fréquence Cardiaque au Repos</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{vitalSigns[1].value} bpm (moyenne)</p>
            <div className="h-64">
              <Line data={restingHeartRateData} options={restingHeartRateOptions} />
            </div>
          </div>
          <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fréquence Cardiaque de Performance</h3>
            <div className="h-64">
              <Bar data={performanceHeartRateData} options={performanceHeartRateOptions} />
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Médicaments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>💊</span>
                <p className="text-gray-900 dark:text-gray-300">
                  {med.name} - Dosage: <span className="font-bold">{med.dosage}</span> ({med.instruction})
                </p>
              </div>
            ))}
          </div>
          <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
            Voir tout
          </a>
        </div>

        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Rendez-vous à venir</h3>
          {appointments.map((appt, index) => (
            <div key={index} className="flex items-center gap-4 p-2 border-b last:border-b-0 border-gray-200 dark:border-gray-600">
              <img
                src={appt.photo}
                alt={appt.doctorName}
                className="h-10 w-10 rounded-full"
                onError={(e) => (e.currentTarget.src = "/default-avatar.jpg")}
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{appt.doctorName}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  {appt.specialty} - {appt.dateTime}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {appt.reason} - Téléphone: {appt.telephone} <span className="text-red-500">❌</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Rapports/Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>📄</span>
                <p className="text-gray-900 dark:text-gray-300">{doc}</p>
                <span className="text-gray-500 dark:text-gray-400">🛠</span>
              </div>
            ))}
          </div>
          <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
            Voir tout
          </a>
        </div>

        <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Suivi de santé</h3>
          {healthRecords.map((record, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-300">
                {record.date}: Poids {record.weight} kg - {record.activity}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Antécédents Médicaux</h3>
          {history.map((entry, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-gray-700 dark:text-gray-300">
                {entry.date}: {entry.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
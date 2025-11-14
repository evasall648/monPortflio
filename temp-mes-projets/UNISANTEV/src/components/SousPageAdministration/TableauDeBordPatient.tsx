import React, { useState } from "react";
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
  contact: string;
}

interface Medication {
  name: string;
  dosage: string;
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
  const [messages, setMessages] = useState<string[]>([]);
  const history: MedicalHistory[] = [
    { date: "12 February 2023", details: "Consultation with general practitioner" },
    { date: "15 March 2023", details: "Blood test" },
  ];

  const healthRecords: HealthRecord[] = [
    { date: "01 March 2023", weight: 70, activity: "30 min walk" },
  ];

  const vitalSigns: VitalSign[] = [
    { label: "Blood Pressure", value: "110/70", trend: "10% more than last month", icon: "💉" },
    { label: "Heart Rate", value: 72, trend: "07% less than last month", icon: "❤" },
    { label: "Glucose Level", value: "88-75", trend: "12% more than last month", icon: "🍬" },
    { label: "Blood Count", value: "9,456/mL", trend: "22% less than last month", icon: "🩸" },
  ];

  const medications: Medication[] = [
    { name: "Econochloroquine-chloral", dosage: "1 - 0 - 1" },
    { name: "Desmopressin supplements", dosage: "1 - 1 - 1 per day" },
    { name: "Abciximab-injection", dosage: "1 per day" },
    { name: "Kevzara sarilumab", dosage: "0 - 0 - 1" },
    { name: "Gentamicin-topical", dosage: "1 - 0 - 1" },
    { name: "Paliperidone palmitate", dosage: "1 - 1 - 1" },
    { name: "Sermorelin injectable", dosage: "1 per day" },
  ];

  const appointments: Appointment[] = [
    { doctorName: "Ndeye Awa Dieng", specialty: "Cardiologie", dateTime: "2025-03-26 00:00:00", reason: "Bilan cardiaque", contact: "771000006" },
    { doctorName: "Paul Sarr", specialty: "Chirurgie", dateTime: "2025-03-20 10:00:00", reason: "Consultation pré-opératoire", contact: "771000010" },
  ];

  const documents = [
    "Blood Report",
    "Medication Documents",
    "Medical Prescription",
    "Radiographic Files",
    "Urine Report",
    "Scanned Documents",
  ];

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  const restingHeartRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Heart Rate (bpm)",
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
      title: { display: true, text: "Resting Heart Rate" },
    },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: "bpm" } },
    },
  };

  const performanceHeartRateData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
      title: { display: true, text: "Performance Heart Rate" },
    },
    scales: {
      y: { beginAtZero: false, title: { display: true, text: "bpm" } },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img src="/cli.png" alt="Clinique des miracles" className="h-8" />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <span>Ndeye Sall</span>
          <img src="/user-avatar.png" alt="User Avatar" className="h-8 w-8 rounded-full" />
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Welcome to Clinique des miracles!</h2>
          <p className="text-gray-600">
            We take this opportunity to welcome you to our practice and remind you that you have
            chosen our doctors to personalize your healthcare. We look forward to providing you
            with personalized and comprehensive healthcare focused on wellness and prevention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {vitalSigns.map((sign, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl">{sign.icon}</div>
              <h3 className="text-lg font-medium">{sign.label}</h3>
              <p className="text-xl font-bold">{sign.value}</p>
              <p className="text-sm text-gray-500">{sign.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Resting Heart Rate</h3>
            <p className="text-2xl font-bold">{vitalSigns[1].value} bpm (average)</p>
            <div className="h-64">
              <Line data={restingHeartRateData} options={restingHeartRateOptions} />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Performance Heart Rate</h3>
            <div className="h-64">
              <Bar data={performanceHeartRateData} options={performanceHeartRateOptions} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Medications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>💊</span>
                <p>
                  {med.name} - {med.dosage}
                </p>
              </div>
            ))}
          </div>
          <a href="#" className="text-blue-600 hover:underline">
            View all
          </a>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Upcoming Appointments</h3>
          {appointments.map((appt, index) => (
            <div key={index} className="flex items-center gap-4 p-2 border-b last:border-b-0">
              <img
                src={`/doctor-${index}.png`}
                alt={appt.doctorName}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium">{appt.doctorName}</p>
                <p>
                  {appt.specialty} - {appt.dateTime}
                </p>
                <p>
                  {appt.reason} - {appt.contact} <span className="text-red-500">❌</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Reports/Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>📄</span>
                <p>{doc}</p>
                <span className="text-gray-500">🛠</span>
              </div>
            ))}
          </div>
          <a href="#" className="text-blue-600 hover:underline">
            View all
          </a>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Notifications</h3>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="text-sm">
                {msg}
              </div>
            ))
          ) : (
            <p>No notifications.</p>
          )}
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Health Tracking</h3>
          {healthRecords.map((record, index) => (
            <div key={index} className="flex justify-between">
              <p>
                {record.date}: Weight {record.weight} kg - {record.activity}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium">Medical History</h3>
          {history.map((entry, index) => (
            <div key={index} className="flex justify-between">
              <p>
                {entry.date}: {entry.details}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium">Envoyer un message</h3>
          <button
            onClick={() => handleSendMessage("New message sent to your doctor.")}
            className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Envoyer un message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
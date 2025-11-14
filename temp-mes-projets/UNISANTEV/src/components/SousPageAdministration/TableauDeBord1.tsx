import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const rendezVousData = [
  { medecin: 'Fatou Badji', date: '2025-03-20', maladie: 'Chronique', patient: 'Moussa Sene ' },
  { medecin: 'Awa Sall', date: '2025-03-26', maladie: 'Aiguë', patient: 'Cheickou Faye' },
  { medecin: 'Hwa Demba Keita', date: '2025-03-26', maladie: 'Chronique', patient: 'Khady Gaye' },
  { medecin: 'Ndeye Awa Dieng', date: '2025-03-26', maladie: 'Aiguë', patient: 'Rokhaya Sy' },
];

const statusMedecinData = [
  { medecin: 'Dr. Sarah Jones', status: 'Disponible' },
  { medecin: 'Dr. Michael Brown', status: 'Indisponible' },
  { medecin: 'Dr. Angela Smith', status: 'Disponible' },
  { medecin: 'Dr. Jay Jacob', status: 'Indisponible' },
];

const operationsData = [
  { date: '13-12-2026', duration: '2 heures', type: 'Générale', rapport: 'Opération réussie avec complications mineures' },
  { date: '14-12-2026', duration: '1.5 heures', type: 'Locale', rapport: 'Patient stable, suivi nécessaire' },
  { date: '15-12-2026', duration: '2 heures', type: 'Générale', rapport: 'Succès total, pas de complications' },
  { date: '15-12-2026', duration: '1 heure', type: 'Locale', rapport: 'Intervention rapide et efficace' },
];

const mergedDoctorData = rendezVousData.map((rendezVous) => {
  const status = statusMedecinData.find((status) => status.medecin === rendezVous.medecin)?.status || 'Inconnu';
  return { ...rendezVous, status };
});

const TableauDeBord: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Configuration dynamique des couleurs
  const textColor = darkMode ? 'white' : 'black';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const surveyData = {
    labels: ['Jan \'24', 'Feb \'24', 'Mar \'24', 'Apr \'24', 'May \'24', 'Jun \'24'],
    datasets: [
      {
        label: 'nouveaux Patients',
        data: [20, 15, 30, 50, 90, 80],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'anciens Patients',
        data: [30, 40, 35, 50, 40, 45],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const surveyOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: textColor,
          stepSize: 20,
        },
        grid: { color: gridColor },
      },
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
    plugins: {
      legend: {
        labels: { color: textColor },
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Enquêtes hospitalières',
        font: { size: 18, weight: 'bold' as const },
        color: textColor,
      },
    },
  };

  const donationsData = {
    labels: ['Revenus', 'Actifs'],
    datasets: [
      {
        label: 'Donations',
        data: [73, 55],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 159, 64)'],
      },
    ],
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tableau de Bord 1</h1>
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
        >
          {darkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Rendez-vous', value: 650, bg: 'purple' },
          { label: 'Opérations', value: 54, bg: 'orange' },
          { label: 'Nouveaux patients', value: 120, bg: 'green' },
          { label: 'Congés', value: 20, bg: 'green' },
        ].map((item, index) => (
          <div key={index} className={`p-4 rounded-lg ${darkMode ? `bg-${item.bg}-900` : `bg-${item.bg}-500`} text-white`}>
            <p className="text-sm">{item.label}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={`col-span-2 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="h-[300px]">
            <Line data={surveyData} options={surveyOptions} />
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Nombre total de donations
          </h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-500">128</p>
            <div className="flex justify-around mt-4">
              <div>
                <p className="text-2xl font-bold text-green-500">73</p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Revenus</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">55</p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actifs</p>
              </div>
            </div>
            <div className="mt-4 h-[200px]">
              <Pie 
                data={donationsData} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: textColor } }
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tableaux */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            title: 'Rendez-vous et Statut maladies',
            columns: ['Médecin', 'Date', 'Maladie', 'Nom Patient'],
            data: mergedDoctorData,
            colorMapping: (type: string) => 
              type === 'Chronique' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
          },
          {
            title: 'Opérations',
            columns: ['Date de l’opération', 'Durée', 'Type d’anesthésie', 'Rapport'],
            data: operationsData,
            colorMapping: (type: string) => 
              type === 'Générale' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
          }
        ].map((table, tableIndex) => (
          <div 
            key={tableIndex} 
            className={`col-span-2 p-4 rounded-lg shadow overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              {table.title}
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  {table.columns.map((col, colIndex) => (
                    <th 
                      key={colIndex} 
                      className={`px-6 py-2 truncate ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.data.map((item, rowIndex) => (
                  <tr key={rowIndex} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {Object.values(item).map((val: any, cellIndex) => (
                      <td 
                        key={cellIndex} 
                        className={`px-6 py-2 truncate ${cellIndex === 2 ? '' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {cellIndex === 2 ? (
                          <span className={`px-2 py-1 rounded ${table.colorMapping(val)}`}>
                            {val}
                          </span>
                        ) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableauDeBord;
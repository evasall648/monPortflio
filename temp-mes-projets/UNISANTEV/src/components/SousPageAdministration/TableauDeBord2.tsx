import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const diseasesData = [
  { name: 'Fièvre', value: 23, change: '+32%' },
  { name: 'Choléra', value: 82, change: '+12%' },
  { name: 'Typhoïde', value: 12, change: '-12%' },
];

const patientsByRegionsData = [
  { country: 'Dakar', value: '18 359 267 XOF', color: 'bg-green-500' },
  { country: 'Thiès', value: '15 719 472 XOF', color: 'bg-orange-500' },
  { country: 'Kaolack', value: '27 419 013 XOF', color: 'bg-purple-500' },
];

const patientGroupsData = [
  { name: 'Cholestérol', color: 'bg-orange-500', count: 5 },
  { name: 'Diabète', color: 'bg-purple-500', count: 14 },
  { name: 'Pression artérielle basse', color: 'bg-green-500', count: 10 },
  { name: 'Hypertension', color: 'bg-green-500', count: 21 },
  { name: 'Paludisme', color: 'bg-teal-500', count: 11 },
  { name: 'Hypotension', color: 'bg-violet-500', count: 30 },
  { name: 'Cancer du sein', color: 'bg-pink-500', count: 54 },
  { name: 'Asthme', color: 'bg-red-500', count: 20 },
  { name: 'Fièvre', color: 'bg-yellow-500', count: 72 },
  { name: 'Grippe', color: 'bg-pink-500', count: 64 },
  { name: 'Anémie', color: 'bg-violet-500', count: 50 },
  { name: 'Rhume', color: 'bg-indigo-500', count: 35 },
  { name: 'Hémoroide', color: 'bg-gray-500', count: 45 },
  { name: 'Insuffisance rénale', color: 'bg-green-500', count: 35 },
];

const commentsData = [
  { name: 'Dr.Awa Sall', comment: 'Le patient montre une amélioration notable après le traitement.', time: 'il y a 7 heures' },
  { name: 'Dr Hawa Demba Keita', comment: 'Besoin de plus de détails sur le dossier du patient admis hier.', time: 'il y a 1 heure' },
  { name: 'Dr Ndeye Awa Dieng', comment: 'Les résultats des tests sont prêts pour le patient de la chambre 12.', time: 'il y a 1 heure' },
  { name: 'Dr. Marie Claire Mendy', comment: 'Le traitement pour le patient diabétique a été ajusté.', time: 'hier' },
  { name: 'Dr. Mody Yero Ndiaye', comment: 'La salle d’opération est prête pour la prochaine intervention.', time: 'hier' },
];

const recentActivityData = [
  { time: 'il y a 5 minutes', description: 'Admission d’un nouveau patient dans la chambre 15.' },
  { time: 'il y a 8 minutes', description: 'Opération réussie pour le patient de la chambre 7.' },
  { time: 'il y a 10 minutes', description: 'Mise à jour du dossier médical du patient admis hier.' },
  { time: 'il y a 20 minutes', description: 'Consultation terminée pour le patient avec hypertension.' },
  { time: 'il y a 5 minutes', description: 'Admission d’un nouveau patient dans la chambre 15.' },
  { time: 'il y a 15 minutes', description: 'Transfert d’un patient en soins intensifs.' },
  { time: 'il y a 20 minutes', description: 'Sortie d’un patient après une opération réussie.' },
];

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Performance',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
    },
  ],
};

const dossierPatientData = {
  labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
  datasets: [
    {
      label: 'Patient Count',
      data: [10, 20, 15, 25, 30],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
};

const diseasesChartData = {
  labels: diseasesData.map((d) => d.name),
  datasets: [
    {
      data: diseasesData.map((d) => d.value),
      backgroundColor: ['#3B82F6', '#A855F7', '#F59E0B'],
    },
  ],
};

const patientsByRegionsChartData = {
  labels: patientsByRegionsData.map((p) => p.country),
  datasets: [
    {
      data: [18359267, 15719472, 27419013],
      backgroundColor: ['#22C55E', '#F97316', '#A855F7'],
    },
  ],
};

const TableauDeBord2: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tableau de bord 2</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Performance du médecin</h2>
          <div className="h-48">
            <Line data={performanceData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Statistiques clés</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Consultations cette semaine</p>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patients admis aujourd’hui</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taux de satisfaction</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Admettre un patient</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Aujourd'hui</p>
              <p className="text-2xl font-bold">105</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cette semaine</p>
              <p className="text-2xl font-bold">825</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ce mois-ci</p>
              <p className="text-2xl font-bold">22067</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Congé du patient</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Aujourd'hui</p>
              <p className="text-2xl font-bold">1247</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cette semaine</p>
              <p className="text-2xl font-bold">22568</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ce mois-ci</p>
              <p className="text-2xl font-bold">65147</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">État de la salle</h2>
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center">
              <p className="text-2xl font-bold">70%</p>
            </div>
            <div className="absolute w-36 h-36 bg-gradient-to-r from-gray-500 to-black-200 rounded-full -z-10"></div>
          </div>
          <div className="flex justify-around mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <p>Occupé</p>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-200 rounded-full mr-2"></div>
              <p>Disponible</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Dossier patient</h2>
          <div className="h-48">
            <Bar data={dossierPatientData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Tableau des maladies</h2>
          <div className="w-32 h-32 bg-transparent mx-auto flex items-center justify-center">
            <Pie data={diseasesChartData} />
          </div>
          <div className="mt-4">
            {diseasesData.map((disease, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-2 ${
                      disease.name === 'Fièvre'
                        ? 'bg-green-500'
                        : disease.name === 'Choléra'
                        ? 'bg-purple-500'
                        : 'bg-orange-500'
                    }`}
                  ></div>
                  <p>{disease.name}</p>
                </div>
                <div className="flex items-center">
                  <p className="mr-2">{disease.value}</p>
                  <p
                    className={`${
                      disease.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {disease.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Rapport récent</h2>
          <p className="text-3xl font-bold text-green-500">71 007 502 XOF</p>
          <p className="text-sm text-gray-500">Revenu total</p>
          <p className="text-sm text-gray-500 mt-2">
            Le rapport financier de ce mois montre une augmentation des revenus grâce à l’admission de nouveaux patients.
          </p>
        </div>
      </div>

      <div className="flex mb-4">
        <div className="bg-white p-4 rounded-lg shadow mr-4 w-1/2">
          <h2 className="text-lg font-semibold mb-2">Patients par régions</h2>
          <div className="flex items-center">
            <div className="w-32 h-32 bg-transparent flex items-center justify-center mr-4">
              <Pie data={patientsByRegionsChartData} />
            </div>
            <div className="flex-1">
              {patientsByRegionsData.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className={`w-4 h-4 ${item.color} rounded-full mr-2`}></div>
                  <p className="flex-1">{item.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tableau des revenus des patients par région, à droite du graphique */}
        <div className="bg-white p-4 rounded-lg shadow w-1/2">
          <h2 className="text-lg font-semibold mb-2">Revenus par régions</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Région</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Revenu</th>
              </tr>
            </thead>
            <tbody>
              {patientsByRegionsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{item.country}</td>
                  <td className="px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Groupe de patients</h2>
          {patientGroupsData.map((group, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className={`w-4 h-4 ${group.color} rounded-full mr-2`}></div>
              <p className="flex-1">{group.name}</p>
              <p>{group.count} Patients</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Commentaires récents</h2>
          {commentsData.map((comment, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-sm text-gray-500">{comment.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{comment.comment}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Activité récente</h2>
          {recentActivityData.map((activity, index) => (
            <div key={index} className="flex items-start mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 mt-1"></div>
              <div>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-sm">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableauDeBord2;
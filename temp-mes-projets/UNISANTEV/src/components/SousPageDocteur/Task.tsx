import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord"; // Importer le ThemeContext

// Définition des types pour les tâches
interface Tâche {
  id: number;
  titre: string;
  détails: string;
  priorité: 'Haute' | 'Normale' | 'Basse';
  date: string;
  complété: boolean;
  assignéÀ: string;
  fichiers?: File[];
  historique: { date: string; action: string; par: string }[];
}

// Données initiales des tâches médicales
const tâchesInitiales: Tâche[] = [
  {
    id: 1,
    titre: 'Examiner les résultats sanguins de M. Sow',
    détails: 'Vérifier les taux de glucose et cholestérol',
    priorité: 'Haute',
    date: '2025-03-10',
    complété: true,
    assignéÀ: 'Mamadou Diop',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Mamadou Diop' }],
  },
  {
    id: 2,
    titre: 'Préparer le planning des vaccins pour les enfants',
    détails: 'Planifier les vaccins BCG et rougeole pour 15 enfants',
    priorité: 'Haute',
    date: '2025-03-11',
    complété: false,
    assignéÀ: 'Fatou Ndiaye',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Fatou Ndiaye' }],
  },
  {
    id: 3,
    titre: 'Visite de suivi pour hypertension de Mme Faye',
    détails: 'Mesurer la tension et ajuster le traitement si nécessaire',
    priorité: 'Normale',
    date: '2025-03-12',
    complété: false,
    assignéÀ: 'Cheikh Fall',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Cheikh Fall' }],
  },
  {
    id: 4,
    titre: 'Rédiger un rapport médical pour l’assurance',
    détails: 'Rapport pour une patiente opérée le mois dernier',
    priorité: 'Basse',
    date: '2025-03-13',
    complété: true,
    assignéÀ: 'Aminata Sow',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Aminata Sow' }],
  },
  {
    id: 5,
    titre: 'Consulter un patient avec fièvre persistante',
    détails: 'Suspecter paludisme, prescrire test rapide',
    priorité: 'Haute',
    date: '2025-03-14',
    complété: false,
    assignéÀ: 'Ousmane Ba',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Ousmane Ba' }],
  },
  {
    id: 6,
    titre: 'Mettre à jour les dossiers médicaux électroniques',
    détails: 'Saisir les données des consultations de la semaine',
    priorité: 'Normale',
    date: '2025-03-15',
    complété: false,
    assignéÀ: 'Mariama Sarr',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Mariama Sarr' }],
  },
  {
    id: 7,
    titre: 'Planifier une intervention chirurgicale mineure',
    détails: 'Retirer un kyste bénin pour un patient',
    priorité: 'Haute',
    date: '2025-03-16',
    complété: true,
    assignéÀ: 'Ibrahima Diallo',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Ibrahima Diallo' }],
  },
  {
    id: 8,
    titre: 'Réviser le protocole de soins pour diabétiques',
    détails: 'Mettre à jour les recommandations nutritionnelles',
    priorité: 'Normale',
    date: '2025-03-17',
    complété: false,
    assignéÀ: 'Aïssatou Faye',
    fichiers: [],
    historique: [{ date: '2025-03-09', action: 'Créée', par: 'Aïssatou Faye' }],
  },
  {
    id: 9,
    titre: 'Effectuer un dépistage prénatal pour Mme Diagne',
    détails: 'Réaliser une échographie et un suivi de la grossesse',
    priorité: 'Haute',
    date: '2025-03-18',
    complété: false,
    assignéÀ: 'Ndeye Diop',
    fichiers: [],
    historique: [{ date: '2025-03-12', action: 'Créée', par: 'Ndeye Diop' }],
  },
  {
    id: 10,
    titre: 'Commander des fournitures médicales',
    détails: 'Seringues, bandages et médicaments pour le stock',
    priorité: 'Normale',
    date: '2025-03-19',
    complété: false,
    assignéÀ: 'Samba Niang',
    fichiers: [],
    historique: [{ date: '2025-03-12', action: 'Créée', par: 'Samba Niang' }],
  },
  {
    id: 11,
    titre: 'Former le personnel sur les nouvelles procédures',
    détails: 'Session sur la gestion des urgences pédiatriques',
    priorité: 'Basse',
    date: '2025-03-20',
    complété: false,
    assignéÀ: 'Khady Sy',
    fichiers: [],
    historique: [{ date: '2025-03-12', action: 'Créée', par: 'Khady Sy' }],
  },
];

// Composant principal GestionnaireDeTâches
const GestionnaireDeTâches: React.FC = () => {
  // Récupérer le contexte du thème
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("GestionnaireDeTâches doit être utilisé dans un ThemeContext.Provider");
  }
  const { isDarkMode } = themeContext;

  // États du composant
  const [tâchesState, setTâchesState] = useState<Tâche[]>(() => {
    const savedTâches = localStorage.getItem('taches');
    return savedTâches ? JSON.parse(savedTâches) : tâchesInitiales;
  });
  const [tâcheÀÉditer, setTâcheÀÉditer] = useState<Tâche | null>(null);
  const [filtre, setFiltre] = useState<'Toutes' | 'Complétées' | 'En cours'>('Toutes');
  const [filtreAssigné, setFiltreAssigné] = useState<string>('Tous');
  const [tri, setTri] = useState<'Priorité' | 'Date' | 'Titre'>('Priorité');
  const [nouvelleTâche, setNouvelleTâche] = useState<Partial<Tâche> | null>(null);

  // Sauvegarde dans localStorage
  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(tâchesState));
  }, [tâchesState]);

  // Alerte après le rendu initial
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().split('T')[0];

    const tâchesUrgentes = tâchesState.filter(
      (t) => !t.complété && t.priorité === 'Haute' && t.date <= tomorrowISO
    );

    // Utilisation de setTimeout pour s'assurer que l'alerte apparaît après le rendu
    setTimeout(() => {
      if (tâchesUrgentes.length > 0) {
        alert(`${tâchesUrgentes.length} tâche(s) urgente(s) à traiter dans les prochaines 24h !`);
      } else {
        alert('Aucune tâche urgente dans les prochaines 24h.');
      }
    }, 0); // Délai de 0ms pour placer l'alerte dans la file d'attente après le rendu
  }, []); // Dépendance vide pour ne s'exécuter qu'une fois au montage

  // Gestion des clics sur une tâche pour l'édition
  const gérerClicTâche = (tâche: Tâche) => {
    setTâcheÀÉditer({ ...tâche });
  };

  // Gestion des changements dans le panneau d'édition
  const gérerChangementÉdition = (champ: keyof Tâche, valeur: string | File[]) => {
    if (tâcheÀÉditer) {
      setTâcheÀÉditer({ ...tâcheÀÉditer, [champ]: valeur });
    }
  };

  // Gestion des changements pour la nouvelle tâche
  const gérerChangementNouvelleTâche = (champ: keyof Tâche, valeur: string) => {
    if (nouvelleTâche !== null) {
      setNouvelleTâche((prev) => ({ ...prev, [champ]: valeur }));
    }
  };

  // Ajouter une nouvelle tâche
  const ajouterTâche = () => {
    if (!nouvelleTâche?.titre || !nouvelleTâche?.date || !nouvelleTâche?.assignéÀ) {
      alert('Veuillez remplir le titre, la date et l’assignation.');
      return;
    }

    const nouvelle: Tâche = {
      id: tâchesState.length > 0 ? Math.max(...tâchesState.map(t => t.id)) + 1 : 1,
      titre: nouvelleTâche.titre,
      détails: nouvelleTâche.détails || '',
      priorité: (nouvelleTâche.priorité as 'Haute' | 'Normale' | 'Basse') || 'Normale',
      date: nouvelleTâche.date,
      complété: false,
      assignéÀ: nouvelleTâche.assignéÀ,
      fichiers: [],
      historique: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Créée',
          par: nouvelleTâche.assignéÀ,
        },
      ],
    };

    setTâchesState((prev) => [...prev, nouvelle]);
    setNouvelleTâche(null); // Fermer le formulaire après ajout
  };

  // Gestion du clic sur "Ajouter une tâche" avec bascule
  const toggleFormulaireNouvelleTâche = () => {
    if (nouvelleTâche === null) {
      // Premier clic : ouvrir le formulaire
      setNouvelleTâche({ priorité: 'Normale' });
    } else {
      // Deuxième clic : fermer le formulaire
      setNouvelleTâche(null);
    }
  };

  // Sauvegarde des modifications d'une tâche avec historique
  const sauvegarderTâche = () => {
    if (!tâcheÀÉditer) return;

    if (!tâcheÀÉditer.titre || !tâcheÀÉditer.date) {
      alert('Le titre et la date sont obligatoires.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const updatedTâche = {
      ...tâcheÀÉditer,
      historique: [
        ...tâcheÀÉditer.historique,
        { date: today, action: 'Modifiée', par: tâcheÀÉditer.assignéÀ },
      ],
    };

    setTâchesState((prev) =>
      prev.map((t) => (t.id === updatedTâche.id ? updatedTâche : t))
    );
    setTâcheÀÉditer(null);
  };

  // Suppression d'une tâche
  const supprimerTâche = (id: number) => {
    setTâchesState((prev) => prev.filter((t) => t.id !== id));
    if (tâcheÀÉditer?.id === id) setTâcheÀÉditer(null);
  };

  // Basculer l'état complété d'une tâche
  const toggleComplété = (id: number) => {
    setTâchesState((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              complété: !t.complété,
              historique: [
                ...t.historique,
                {
                  date: new Date().toISOString().split('T')[0],
                  action: t.complété ? 'Marquée non complétée' : 'Marquée complétée',
                  par: t.assignéÀ,
                },
              ],
            }
          : t
      )
    );
  };

  // Gestion des fichiers joints
  const gérerFichiers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tâcheÀÉditer && e.target.files) {
      const nouveauxFichiers = Array.from(e.target.files);
      gérerChangementÉdition('fichiers', [...(tâcheÀÉditer.fichiers || []), ...nouveauxFichiers]);
    }
  };

  // Filtrage et tri des tâches
  const tâchesFiltrées = tâchesState
    .filter((t) => {
      if (filtre === 'Complétées') return t.complété;
      if (filtre === 'En cours') return !t.complété;
      return true;
    })
    .filter((t) => (filtreAssigné === 'Tous' ? true : t.assignéÀ === filtreAssigné))
    .sort((a, b) => {
      if (tri === 'Priorité') {
        const priorités = { Haute: 3, Normale: 2, Basse: 1 };
        return priorités[b.priorité] - priorités[a.priorité];
      }
      if (tri === 'Date') return b.date.localeCompare(a.date);
      return a.titre.localeCompare(b.titre);
    });

  // Rendu du composant
  return (
    <div className={`flex flex-col md:flex-row h-screen p-4 gap-4 transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className="w-full md:w-1/2 overflow-y-auto">
        <div className={`rounded-lg shadow p-4 transition-colors duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-bold">Tâches Médicales</h2>
            <button
              onClick={toggleFormulaireNouvelleTâche}
              className={`px-4 py-2 rounded transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
              aria-label="Ajouter une nouvelle tâche médicale"
            >
              Ajouter une tâche
            </button>
          </div>

          {nouvelleTâche !== null && (
            <div className={`mb-4 p-4 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
              <div className="mb-2">
                <label htmlFor="nouvelleTacheTitre" className="block mb-1">Titre</label>
                <input
                  id="nouvelleTacheTitre"
                  type="text"
                  placeholder="Titre"
                  value={nouvelleTâche.titre || ''}
                  onChange={(e) => gérerChangementNouvelleTâche('titre', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="nouvelleTacheDetails" className="block mb-1">Détails</label>
                <textarea
                  id="nouvelleTacheDetails"
                  placeholder="Détails"
                  value={nouvelleTâche.détails || ''}
                  onChange={(e) => gérerChangementNouvelleTâche('détails', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="nouvelleTachePriorite" className="block mb-1">Priorité</label>
                <select
                  id="nouvelleTachePriorite"
                  value={nouvelleTâche.priorité || 'Normale'}
                  onChange={(e) => gérerChangementNouvelleTâche('priorité', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                >
                  <option value="Haute">Haute</option>
                  <option value="Normale">Normale</option>
                  <option value="Basse">Basse</option>
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="nouvelleTacheDate" className="block mb-1">Date</label>
                <input
                  id="nouvelleTacheDate"
                  type="date"
                  value={nouvelleTâche.date || ''}
                  onChange={(e) => gérerChangementNouvelleTâche('date', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="nouvelleTacheAssigne" className="block mb-1">Assigné à</label>
                <select
                  id="nouvelleTacheAssigne"
                  value={nouvelleTâche.assignéÀ || ''}
                  onChange={(e) => gérerChangementNouvelleTâche('assignéÀ', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                >
                  <option value="">Sélectionner</option>
                  {[
                    'Dr Fatou Badji',
                    'Dr Abdou Diallo',
                    'Dr Mariama Kane',
                    'Dr Linda Basséne',
                    'Dr Fatima Gueye',
                    'Dr Ndeye Awa Dieng',
                    'Dr Awa Sall',
                    'Dr Hawa Demba Keita',
                  ].map((nom) => (
                    <option key={nom} value={nom}>
                      {nom}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={ajouterTâche}
                className={`px-4 py-2 rounded transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
                aria-label="Ajouter la nouvelle tâche"
              >
                Ajouter
              </button>
            </div>
          )}

          {/* Contrôles de filtre et tri */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div>
              <label htmlFor="filtreSelect" className="block mb-1">Filtrer par statut</label>
              <select
                id="filtreSelect"
                value={filtre}
                onChange={(e) => setFiltre(e.target.value as typeof filtre)}
                className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                aria-label="Filtrer les tâches médicales par statut"
              >
                <option value="Toutes">Toutes</option>
                <option value="Complétées">Complétées</option>
                <option value="En cours">En cours</option>
              </select>
            </div>
            <div>
              <label htmlFor="assignéFilter" className="block mb-1">Filtrer par assigné</label>
              <select
                id="assignéFilter"
                value={filtreAssigné}
                onChange={(e) => setFiltreAssigné(e.target.value)}
                className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                aria-label="Filtrer les tâches par personne assignée"
              >
                <option value="Tous">Tous</option>
                {[
                  'Dr Fatou Badji',
                  'Dr Abdou Diallo',
                  'Dr Mariama Kane',
                  'Dr Linda Basséne',
                  'Dr Fatima Gueye',
                  'Dr Ndeye Awa Dieng',
                  'Dr Awa Sall',
                  'Dr Hawa Demba Keita',
                ].map((nom) => (
                  <option key={nom} value={nom}>
                    {nom}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="triSelect" className="block mb-1">Trier par</label>
              <select
                id="triSelect"
                value={tri}
                onChange={(e) => setTri(e.target.value as typeof tri)}
                className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                aria-label="Trier les tâches médicales"
              >
                <option value="Priorité">Priorité</option>
                <option value="Date">Date</option>
                <option value="Titre">Titre</option>
              </select>
            </div>
          </div>

          {/* Nombre total de tâches */}
          <p className={`mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{tâchesFiltrées.length} Tâches</p>

          {/* Liste des tâches */}
          <div className="space-y-2">
            {tâchesFiltrées.map((tâche) => (
              <div
                key={tâche.id}
                className={`flex items-center p-2 border rounded cursor-pointer transition-colors duration-300 ${
                  tâche.complété
                    ? isDarkMode
                      ? "bg-green-900"
                      : "bg-green-100"
                    : isDarkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                } ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <input
                  type="checkbox"
                  checked={tâche.complété}
                  onChange={() => toggleComplété(tâche.id)}
                  className="mr-2"
                  aria-label={`Marquer la tâche ${tâche.titre} comme complétée`}
                />
                <span
                  className="flex-1"
                  onClick={() => gérerClicTâche(tâche)}
                  aria-label={`Éditer la tâche ${tâche.titre}`}
                >
                  {tâche.titre}
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    tâche.priorité === 'Haute'
                      ? 'bg-red-600'
                      : tâche.priorité === 'Normale'
                      ? 'bg-yellow-600'
                      : 'bg-green-600'
                  }`}
                >
                  {tâche.priorité}
                </span>
                <span className={`ml-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{tâche.date}</span>
                <button
                  onClick={() => supprimerTâche(tâche.id)}
                  className={`ml-2 px-2 py-1 rounded transition-colors duration-300 ${isDarkMode ? "bg-red-700 text-white hover:bg-red-800" : "bg-red-600 text-white hover:bg-red-700"}`}
                  aria-label={`Supprimer la tâche ${tâche.titre}`}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau d'édition */}
      <div className="w-full md:w-1/2 p-4">
        <div className={`rounded-lg shadow p-4 h-full overflow-y-auto transition-colors duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"}`}>
          <h2 className="text-lg font-bold mb-4">Éditer la tâche médicale</h2>
          {tâcheÀÉditer ? (
            <div className="space-y-4">
              {/* Champ Titre */}
              <div>
                <label htmlFor="titreInput" className="block mb-2">Titre</label>
                <input
                  id="titreInput"
                  type="text"
                  value={tâcheÀÉditer.titre}
                  onChange={(e) => gérerChangementÉdition('titre', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Entrez le titre de la tâche"
                  aria-label="Titre de la tâche médicale"
                />
              </div>

              {/* Champ Détails */}
              <div>
                <label htmlFor="detailsTextarea" className="block mb-2">Détails</label>
                <textarea
                  id="detailsTextarea"
                  value={tâcheÀÉditer.détails}
                  onChange={(e) => gérerChangementÉdition('détails', e.target.value)}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Détails de la tâche médicale"
                  aria-label="Détails de la tâche médicale"
                />
              </div>

              {/* Bouton complété, Priorité et Assigné */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => toggleComplété(tâcheÀÉditer.id)}
                  className={`px-4 py-2 rounded transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
                  aria-label="Marquer la tâche comme complétée ou non complétée"
                >
                  Marquer comme {tâcheÀÉditer.complété ? 'non complétée' : 'complétée'}
                </button>
                <div>
                  <label htmlFor="prioritéSelect" className="block mb-2">Priorité</label>
                  <select
                    id="prioritéSelect"
                    value={tâcheÀÉditer.priorité}
                    onChange={(e) => gérerChangementÉdition('priorité', e.target.value as Tâche['priorité'])}
                    className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                    aria-label="Priorité de la tâche médicale"
                  >
                    <option value="Haute">Haute</option>
                    <option value="Normale">Normale</option>
                    <option value="Basse">Basse</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="assignéSelect" className="block mb-2">Assigné à</label>
                  <select
                    id="assignéSelect"
                    value={tâcheÀÉditer.assignéÀ}
                    onChange={(e) => gérerChangementÉdition('assignéÀ', e.target.value)}
                    className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                    aria-label="Médecin assigné"
                  >
                    {[
                      'Dr Fatou Badji',
                      'Dr Abdou Diallo',
                      'Dr Mariama Kane',
                      'Dr Linda Basséne',
                      'Dr Fatima Gueye',
                      'Dr Ndeye Awa Dieng',
                      'Dr Awa Sall',
                      'Dr Hawa Demba Keita',
                    ].map((nom) => (
                      <option key={nom} value={nom}>
                        {nom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Champ Date */}
              <div>
                <label htmlFor="dateInput" className="block mb-2">Date d'échéance</label>
                <input
                  id="dateInput"
                  type="date"
                  value={tâcheÀÉditer.date}
                  onChange={(e) => gérerChangementÉdition('date', e.target.value)}
                  className={`p-2 border rounded w-full transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                  aria-label="Date d'échéance de la tâche"
                />
              </div>

              {/* Fichiers joints */}
              <div>
                <label htmlFor="fichiersInput" className="block mb-2">Fichiers joints</label>
                <input
                  id="fichiersInput"
                  type="file"
                  multiple
                  onChange={gérerFichiers}
                  className={`w-full p-2 border rounded transition-colors duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                  aria-label="Joindre des fichiers à la tâche"
                />
                {tâcheÀÉditer.fichiers && tâcheÀÉditer.fichiers.length > 0 && (
                  <ul className="mt-2">
                    {tâcheÀÉditer.fichiers.map((fichier, index) => (
                      <li key={index} className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {fichier.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Historique */}
              <div>
                <label className="block mb-2">Historique des modifications</label>
                <ul className={`border rounded p-2 max-h-32 overflow-y-auto transition-colors duration-300 ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                  {tâcheÀÉditer.historique.map((entry, index) => (
                    <li key={index} className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {entry.date} - {entry.action} par {entry.par}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={sauvegarderTâche}
                  className={`px-4 py-2 rounded transition-colors duration-300 ${isDarkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}
                  aria-label="Sauvegarder les modifications de la tâche"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setTâcheÀÉditer(null)}
                  className={`px-4 py-2 rounded transition-colors duration-300 ${isDarkMode ? "bg-red-700 text-white hover:bg-red-800" : "bg-red-600 text-white hover:bg-red-700"}`}
                  aria-label="Fermer le panneau d'édition"
                >
                  <span className="mr-2">❌</span> Fermer
                </button>
              </div>
            </div>
          ) : (
            <p>Sélectionnez une tâche médicale à éditer.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionnaireDeTâches;
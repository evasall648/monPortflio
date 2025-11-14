"use client";

import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, parseISO, startOfDay, startOfWeek as startOfWeekFn, endOfWeek as endOfWeekFn, subDays, addMonths, subMonths, eachMonthOfInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { ThemeContext } from "../../components/SousPageDocteur/TableauDeBord";

// Configuration pour Modal
Modal.setAppElement("#root");

// Interface pour définir la structure d'un événement
interface Event {
  id: number;
  titre: string;
  date: Date;
  categorie: string;
}

// Interface pour les filtres
interface Filtres {
  [key: string]: boolean;
  Personnel: boolean;
  Important: boolean;
  Voyage: boolean;
  Amis: boolean;
}

const Calendrier: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode ?? false;

  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-01-01"));
  const [view, setView] = useState<"month" | "week" | "day" | "list" | "year">("month");
  const [events, setEvents] = useState<Event[]>([
    { id: 1, titre: "Réunion équipe", date: parseISO("2025-01-15"), categorie: "Important" },
    { id: 2, titre: "Anniversaire Mamadou", date: parseISO("2025-02-10"), categorie: "Amis" },
    { id: 3, titre: "Dentiste 14h", date: parseISO("2025-03-05"), categorie: "Personnel" },
    { id: 4, titre: "Voyage à Dakar", date: parseISO("2025-04-20"), categorie: "Voyage" },
    { id: 5, titre: "Paiement loyer", date: parseISO("2025-05-01"), categorie: "Important" },
    { id: 6, titre: "Sortie plage", date: parseISO("2025-06-15"), categorie: "Amis" },
    { id: 7, titre: "Examen final", date: parseISO("2025-07-10"), categorie: "Important" },
    { id: 8, titre: "Visite médicale", date: parseISO("2025-08-25"), categorie: "Personnel" },
    { id: 9, titre: "Voyage à Saly", date: parseISO("2025-09-12"), categorie: "Voyage" },
    { id: 10, titre: "Réunion famille", date: parseISO("2025-10-30"), categorie: "Amis" },
    { id: 11, titre: "Facture électricité", date: parseISO("2025-11-05"), categorie: "Important" },
    { id: 12, titre: "Cours yoga", date: parseISO("2025-12-15"), categorie: "Personnel" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState({
    titre: "",
    date: "",
    categorie: "Personnel",
  });
  const [errors, setErrors] = useState({
    titre: "",
    date: "",
  });
  const [filtres, setFiltres] = useState<Filtres>({
    Personnel: true,
    Important: true,
    Voyage: true,
    Amis: true,
  });

  // Générer les jours pour la vue Mois
  const generateMonthDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: fr });
    const endDate = endOfWeek(monthEnd, { locale: fr });

    const days: Date[] = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  // Générer les jours pour la vue Semaine
  const generateWeekDays = () => {
    const weekStart = startOfWeekFn(currentDate, { locale: fr });
    const weekEnd = endOfWeekFn(currentDate, { locale: fr });

    const days: Date[] = [];
    let day = weekStart;
    while (day <= weekEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  // Générer le jour pour la vue Jour
  const generateDay = () => {
    return [startOfDay(currentDate)];
  };

  // Générer les mois pour la vue Année
  const generateYearMonths = () => {
    const start = new Date(currentDate.getFullYear(), 0, 1);
    const end = new Date(currentDate.getFullYear(), 11, 31);
    return eachMonthOfInterval({ start, end });
  };

  // Navigation
  const prevPeriod = () => {
    if (view === "month" || view === "year") {
      setCurrentDate((prev) => subMonths(prev, 1));
    } else if (view === "week") {
      setCurrentDate((prev) => subDays(prev, 7));
    } else if (view === "day") {
      setCurrentDate((prev) => subDays(prev, 1));
    }
  };

  const nextPeriod = () => {
    if (view === "month" || view === "year") {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else if (view === "week") {
      setCurrentDate((prev) => addDays(prev, 7));
    } else if (view === "day") {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const goToToday = () => setCurrentDate(new Date());

  // Gestion Modal
  const openModal = (date: Date | null = null) => {
    setNewEvent({
      titre: "",
      date: date ? format(date, "yyyy-MM-dd") : format(currentDate, "yyyy-MM-dd"),
      categorie: "Personnel",
    });
    setErrors({ titre: "", date: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));

    let error = "";
    if (name === "titre" && !value.trim()) error = "Le titre est requis";
    if (name === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) error = "Format de date invalide (AAAA-MM-JJ)";
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.titre.trim() || !newEvent.date) {
      setErrors({
        titre: !newEvent.titre.trim() ? "Le titre est requis" : "",
        date: !newEvent.date ? "La date est requise" : "",
      });
      return;
    }

    const eventDate = parseISO(newEvent.date);
    const newEventObj: Event = {
      id: Date.now(),
      titre: newEvent.titre,
      date: eventDate,
      categorie: newEvent.categorie,
    };
    setEvents([...events, newEventObj]);
    closeModal();
  };

  // Filtrer les événements
  const filteredEvents = events.filter((event: Event) => filtres[event.categorie as keyof Filtres]);

  const handleFilterChange = (categorie: keyof Filtres) => {
    setFiltres((prev) => ({ ...prev, [categorie]: !prev[categorie] }));
  };

  // Rendu des vues
  const renderMonthView = () => {
    const days = generateMonthDays();
    return (
      <div className="grid grid-cols-7 gap-1 mt-2">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((jour) => (
          <div key={jour} className={`p-2 text-center font-semibold ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}>
            {jour}
          </div>
        ))}
        {days.map((day: Date, index: number) => (
          <div
            key={index}
            className={`p-2 text-center cursor-pointer hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"} ${
              !format(day, "MMMM yyyy", { locale: fr }).startsWith(format(startOfMonth(currentDate), "MMMM yyyy", { locale: fr }))
                ? isDarkMode ? "text-gray-500" : "text-gray-400"
                : isDarkMode ? "text-gray-200" : "text-gray-800"
            } ${isSameDay(day, new Date()) ? "bg-green-500 text-white" : isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
            onClick={() => openModal(day)}
          >
            {format(day, "d")}
            {filteredEvents.some((event: Event) => isSameDay(event.date, day)) && (
              <div className="mt-1">
                {filteredEvents
                  .filter((event: Event) => isSameDay(event.date, day))
                  .map((event: Event) => (
                    <div
                      key={event.id}
                      className={`text-xs ${
                        event.categorie === "Personnel"
                          ? "bg-green-500"
                          : event.categorie === "Important"
                          ? "bg-red-500"
                          : event.categorie === "Voyage"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } text-white p-1 rounded`}
                    >
                      {event.titre}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = generateWeekDays();
    return (
      <div className="grid grid-cols-7 gap-1 mt-2">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((jour) => (
          <div key={jour} className={`p-2 text-center font-semibold ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}>
            {jour}
          </div>
        ))}
        {days.map((day: Date, index: number) => (
          <div
            key={index}
            className={`p-2 text-center cursor-pointer hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"} ${
              isSameDay(day, new Date()) ? "bg-green-500 text-white" : isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => openModal(day)}
          >
            {format(day, "d", { locale: fr })}
            {filteredEvents.some((event: Event) => isSameDay(event.date, day)) && (
              <div className="mt-1">
                {filteredEvents
                  .filter((event: Event) => isSameDay(event.date, day))
                  .map((event: Event) => (
                    <div
                      key={event.id}
                      className={`text-xs ${
                        event.categorie === "Personnel"
                          ? "bg-green-500"
                          : event.categorie === "Important"
                          ? "bg-red-500"
                          : event.categorie === "Voyage"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } text-white p-1 rounded`}
                    >
                      {event.titre}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const day = generateDay()[0];
    return (
      <div className="mt-2">
        <div className={`p-2 text-center font-semibold ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}>
          {format(day, "EEEE d MMMM yyyy", { locale: fr })}
        </div>
        <div
          className={`p-4 cursor-pointer hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"} ${
            isSameDay(day, new Date()) ? "bg-green-500 text-white" : isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => openModal(day)}
        >
          {filteredEvents.some((event: Event) => isSameDay(event.date, day)) ? (
            filteredEvents
              .filter((event: Event) => isSameDay(event.date, day))
              .map((event: Event) => (
                <div
                  key={event.id}
                  className={`text-sm ${
                    event.categorie === "Personnel"
                      ? "bg-green-500"
                      : event.categorie === "Important"
                      ? "bg-red-500"
                      : event.categorie === "Voyage"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-white p-2 rounded mb-2`}
                >
                  {event.titre}
                </div>
              ))
          ) : (
            <div className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Aucun événement</div>
          )}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="mt-2">
        <div className={`p-2 text-center font-semibold ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}>
          Liste des événements
        </div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event: Event) => (
            <div
              key={event.id}
              className={`p-2 mb-1 cursor-pointer hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"} ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"} ${
                event.categorie === "Personnel"
                  ? "border-l-4 border-green-500"
                  : event.categorie === "Important"
                  ? "border-l-4 border-red-500"
                  : event.categorie === "Voyage"
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-yellow-500"
              }`}
              onClick={() => openModal(event.date)}
            >
              <div className="text-sm">{event.titre}</div>
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {format(event.date, "EEEE d MMMM yyyy", { locale: fr })}
              </div>
            </div>
          ))
        ) : (
          <div className={`p-2 ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
            Aucun événement
          </div>
        )}
      </div>
    );
  };

  const renderYearView = () => {
    const months = generateYearMonths();
    return (
      <div className="grid grid-cols-3 gap-4 mt-2">
        {months.map((month: Date, index: number) => (
          <div key={index} className={`p-2 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className={`text-center font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {format(month, "MMMM", { locale: fr })}
            </div>
            <div className="mt-2">
              {filteredEvents
                .filter((event: Event) => format(event.date, "MMMM yyyy", { locale: fr }) === format(month, "MMMM yyyy", { locale: fr }))
                .map((event: Event) => (
                  <div
                    key={event.id}
                    className={`text-xs ${
                      event.categorie === "Personnel"
                        ? "bg-green-500"
                        : event.categorie === "Important"
                        ? "bg-red-500"
                        : event.categorie === "Voyage"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } text-white p-1 rounded mt-1`}
                  >
                    {format(event.date, "d")} : {event.titre}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* En-tête */}
      <div className={`p-2 rounded-t-lg flex justify-between items-center ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600"
          onClick={() => openModal()}
        >
          Ajouter un événement
        </button>
        <div className="flex items-center gap-2">
          <button className={isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} onClick={prevPeriod}>
            ⟨
          </button>
          <button className={isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} onClick={nextPeriod}>
            ⟩
          </button>
          <button className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600" onClick={goToToday}>
            aujourd'hui
          </button>
          <h2 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
            {format(currentDate, "MMMM yyyy", { locale: fr })}
          </h2>
          <div className="flex items-center gap-1">
            <button
              className={`${view === "month" ? "bg-green-500" : "bg-green-400"} text-white px-2 py-1 rounded text-sm hover:bg-green-600`}
              onClick={() => setView("month")}
            >
              mois
            </button>
            <button
              className={`${view === "week" ? "bg-green-500" : "bg-green-400"} text-white px-2 py-1 rounded text-sm hover:bg-green-600`}
              onClick={() => setView("week")}
            >
              semaine
            </button>
            <button
              className={`${view === "day" ? "bg-green-500" : "bg-green-400"} text-white px-2 py-1 rounded text-sm hover:bg-green-600`}
              onClick={() => setView("day")}
            >
              jour
            </button>
            <button
              className={`${view === "list" ? "bg-green-500" : "bg-green-400"} text-white px-2 py-1 rounded text-sm hover:bg-green-600`}
              onClick={() => setView("list")}
            >
              liste
            </button>
            <button
              className={`${view === "year" ? "bg-green-500" : "bg-green-400"} text-white px-2 py-1 rounded text-sm hover:bg-green-600`}
              onClick={() => setView("year")}
            >
              année
            </button>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-green-500 p-2 flex justify-between items-center text-white text-sm mt-2">
        <div className="flex items-center gap-2">
          {["Personnel", "Important", "Voyage", "Amis"].map((categorie) => (
            <label key={categorie} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={filtres[categorie as keyof Filtres]}
                onChange={() => handleFilterChange(categorie as keyof Filtres)}
                className="accent-green-600"
              />
              <span>{categorie}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span>⨂</span>
          <span>🔔</span>
          <span>🇸🇳</span>
          <span>é Awa Sall</span>
        </div>
      </div>

      {/* Affichage selon la vue */}
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
      {view === "list" && renderListView()}
      {view === "year" && renderYearView()}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: isDarkMode ? "#1f2937" : "#ffffff",
            border: isDarkMode ? "1px solid #374151" : "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "20px",
            width: "400px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
          Ajouter un événement
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="eventTitre" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Titre
            </label>
            <input
              type="text"
              id="eventTitre"
              name="titre"
              value={newEvent.titre}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 rounded border focus:outline-none focus:border-green-500 ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
              placeholder="Entrez le titre de l'événement"
              aria-label="Titre de l'événement"
            />
            {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 rounded border focus:outline-none focus:border-green-500 ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
              aria-label="Date de l'événement"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="eventCategorie" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Catégorie
            </label>
            <select
              id="eventCategorie"
              name="categorie"
              value={newEvent.categorie}
              onChange={handleInputChange}
              className={`mt-1 block w-full p-2 rounded border focus:outline-none focus:border-green-500 ${isDarkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
              aria-label="Catégorie de l'événement"
            >
              <option value="Personnel">Personnel</option>
              <option value="Important">Important</option>
              <option value="Voyage">Voyage</option>
              <option value="Amis">Amis</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-600 text-white hover:bg-gray-700" : "bg-gray-500 text-white hover:bg-gray-600"}`}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Calendrier;
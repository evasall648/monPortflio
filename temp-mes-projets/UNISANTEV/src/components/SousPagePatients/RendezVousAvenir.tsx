"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Download, Columns, Trash2 } from "lucide-react";
import { useAppointments, Appointment } from "../appointmentsStore";

const RendezVousAvenir: React.FC = () => {
  const { appointments, deleteAppointments } = useAppointments();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    doctor: true,
    date: true,
    time: true,
    issue: true,
    // Removed 'location' from visibleColumns
    status: true,
  });
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedAppointments, setSelectedAppointments] = useState<Set<number>>(new Set());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const today = new Date().toISOString().split("T")[0];
  const futureAppointments = appointments.filter((appt) => appt.dateTime > today);
  const filteredAppointments = futureAppointments.filter((appt) =>
    [appt.doctorName, appt.dateTime, appt.reason].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = (appointment: Appointment) => {
    const blob = new Blob([JSON.stringify(appointment, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rendez-vous-${appointment.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleColumnChange = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedAppointments((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const handleDelete = () => {
    if (!selectedAppointments.size) return alert("Sélectionnez au moins un rendez-vous.");
    if (window.confirm("Confirmer la suppression ?")) {
      const idsToDelete = Array.from(selectedAppointments).map((i) => futureAppointments[i].id);
      deleteAppointments(idsToDelete);
      setSelectedAppointments(new Set());
      alert(`${idsToDelete.length} rendez-vous supprimés.`);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50 p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white text-green-600">Rendez-vous</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Changer de thème"
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-white" /> : <Moon className="h-6 w-6 text-green-600" />}
        </button>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 p-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white text-green-600 focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
          <div className="flex items-center gap-3">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white text-green-600 focus:ring-2 focus:ring-green-500"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button
              onClick={() => handleDownload(currentAppointments[0] || futureAppointments[0])}
              disabled={!currentAppointments.length}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            >
              <Download className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Columns className="h-5 w-5" />
              </button>
              {showColumnSelector && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg z-10">
                  {Object.entries(visibleColumns).map(([key, value]) => (
                    <label key={key} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white text-green-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleColumnChange(key as keyof typeof visibleColumns)}
                        className="mr-2"
                      />
                      {key === "doctor" && "Médecin"}
                      {key === "date" && "Date"}
                      {key === "time" && "Heure"}
                      {key === "issue" && "Motif"}
                      {key === "status" && "Statut"}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleDelete}
              disabled={!selectedAppointments.size}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-100 dark:bg-gray-700 text-green-600 dark:text-white">
              <tr>
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={(e) => setSelectedAppointments(e.target.checked ? new Set(currentAppointments.map((_, i) => i)) : new Set())}
                  />
                </th>
                {visibleColumns.doctor && <th className="p-3">Médecin</th>}
                {visibleColumns.date && <th className="p-3">Date</th>}
                {visibleColumns.time && <th className="p-3">Heure</th>}
                {visibleColumns.issue && <th className="p-3">Motif</th>}
                {visibleColumns.status && <th className="p-3">Statut</th>}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appt, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-green-600 dark:text-white transition-colors"
                  onClick={() => setSelectedAppointment(appt)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedAppointments.has(index)}
                      onChange={() => handleCheckboxChange(index)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  {visibleColumns.doctor && <td className="p-3">{appt.doctorName}</td>}
                  {visibleColumns.date && <td className="p-3">{appt.dateTime.split(" ")[0]}</td>}
                  {visibleColumns.time && <td className="p-3">⏰ {appt.dateTime.split(" ")[1]}</td>}
                  {visibleColumns.issue && <td className="p-3">{appt.reason}</td>}
                  {visibleColumns.status && (
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          appt.status === "Confirmé" ? "bg-green-500" :
                          appt.status === "Annulé" ? "bg-red-500" : "bg-yellow-500"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  )}
                  <td className="p-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownload(appt); }}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-green-600 dark:text-white animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Détails</h3>
            <div className="space-y-2">
              <p><strong>Médecin :</strong> {selectedAppointment.doctorName}</p>
              <p><strong>Date :</strong> {selectedAppointment.dateTime.split(" ")[0]}</p>
              <p><strong>Heure :</strong> {selectedAppointment.dateTime.split(" ")[1]}</p>
              <p><strong>Motif :</strong> {selectedAppointment.reason}</p>
              <p><strong>Statut :</strong> {selectedAppointment.status}</p>
            </div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RendezVousAvenir;
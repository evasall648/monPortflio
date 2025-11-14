import { useState, useEffect } from "react";

export interface Appointment {
  id: string;
  doctorName: string;
  dateTime: string;
  reason: string;
  contact: string;
  status: "En attente" | "Confirmé" | "Annulé" | "Prochain";
  location: string;
  patientName: string;
  patientEmail: string;
  patientGender: string;
  patientBirthDate: string;
  description: string;
  file?: File | null;
}

const STORAGE_KEY = "appointments";

const loadAppointments = (): Appointment[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: "1",
          doctorName: "Fatou Badji",
          dateTime: "2025-03-11 09:00:00",
          reason: "Consultation générale",
          contact: "771000001",
          status: "Confirmé",
          location: "Clinique Dakar",
          patientName: "Aliou Diop",
          patientEmail: "aliou.diop@example.com",
          patientGender: "male",
          patientBirthDate: "1990-01-15",
          description: "Consultation de routine",
          file: null,
        },
        {
          id: "2",
          doctorName: "Abdou Diallo",
          dateTime: "2025-03-11 11:00:00",
          reason: "Bilan de santé",
          contact: "771000002",
          status: "Annulé",
          location: "Hôpital Dakar",
          patientName: "Ndeye Sall",
          patientEmail: "ndeye.sall@example.com",
          patientGender: "female",
          patientBirthDate: "1985-05-20",
          description: "Bilan annuel",
          file: null,
        },
      ];
};

const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(loadAppointments());

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: "Annulé" as const } : appt))
    );
  };

  const confirmAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: "Confirmé" as const } : appt))
    );
  };

  const deleteAppointments = (ids: string[]) => {
    setAppointments((prev) => prev.filter((appt) => !ids.includes(appt.id)));
  };

  return {
    appointments,
    addAppointment,
    cancelAppointment,
    confirmAppointment,
    deleteAppointments,
  };
};
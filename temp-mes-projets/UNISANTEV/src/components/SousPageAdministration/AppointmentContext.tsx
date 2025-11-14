import type React from "react"
import { createContext, useState, type ReactNode } from "react"
import type { RendezVous } from "../../types"

interface ContexteRendezVousType {
  rendezVous: RendezVous[]
  rendezVousSelectionne: RendezVous | null
  definirRendezVousSelectionne: (rendezVous: RendezVous | null) => void
  changerStatutRendezVous: (id: string, statut: string) => void
  ajouterRendezVous: (nouveauRendezVous: RendezVous) => void
  supprimerRendezVous: (id: string) => void
  verifierConflits: (nouveauRendezVous: RendezVous) => boolean
  notifierPatient: (patientNom: string, message: string) => void
}

export const ContexteRendezVous = createContext<ContexteRendezVousType | undefined>(undefined)

interface FournisseurRendezVousProps {
  children: ReactNode
}

export const FournisseurRendezVous: React.FC<FournisseurRendezVousProps> = ({ children }) => {
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([
    {
      id: "1",
      patient: { nom: "John Doe", genre: "Male", maladie: "Fever" },
      date: "12/05/2016",
      heure: "09:00",
      statut: "En attente",
      symptomes: "Fièvre, maux de tête",
    },
    {
      id: "2",
      patient: { nom: "Sarah S.", genre: "Female", maladie: "Cholera" },
      date: "12/05/2016",
      heure: "10:30",
      statut: "Confirmé",
      symptomes: "Diarrhée, vomissements",
    },
    {
      id: "3",
      patient: { nom: "Ari Satou", genre: "Male", maladie: "Jaundice" },
      date: "12/05/2016",
      heure: "11:45",
      statut: "En attente",
      symptomes: "Jaunisse, fatigue",
    },
    {
      id: "4",
      patient: { nom: "Angelica Ramos", genre: "Female", maladie: "Typhoid" },
      date: "12/05/2016",
      heure: "14:00",
      statut: "Annulé",
      symptomes: "Fièvre, maux de tête",
    },
    {
      id: "5",
      patient: { nom: "Ashton Cox", genre: "Female", maladie: "Malaria" },
      date: "12/05/2016",
      heure: "15:30",
      statut: "Confirmé",
      symptomes: "Fièvre, frissons",
    },
    {
      id: "6",
      patient: { nom: "Cara Stevens", genre: "Male", maladie: "Infection" },
      date: "12/05/2016",
      heure: "16:45",
      statut: "En attente",
      symptomes: "Fièvre, douleur",
    },
    {
      id: "7",
      patient: { nom: "Michael Silva", genre: "Male", maladie: "Flu" },
      date: "12/06/2016",
      heure: "09:15",
      statut: "Confirmé",
      symptomes: "Toux, congestion nasale",
    },
  ])

  const [rendezVousSelectionne, definirRendezVousSelectionne] = useState<RendezVous | null>(null)

  const changerStatutRendezVous = (id: string, statut: string) => {
    setRendezVous((prev) =>
      prev.map((rv) => {
        if (rv.id === id) {
          notifierPatient(rv.patient.nom, `Votre rendez-vous a été ${statut.toLowerCase()}.`)
          return { ...rv, statut }
        }
        return rv
      }),
    )
  }

  const notifierPatient = (patientNom: string, message: string) => {
    alert(`Notification à ${patientNom}: ${message}`)
  }

  const ajouterRendezVous = (nouveauRendezVous: RendezVous) => {
    if (!verifierConflits(nouveauRendezVous)) {
      setRendezVous((prev) => [...prev, nouveauRendezVous])
    } else {
      alert("Conflit de rendez-vous détecté.")
    }
  }

  const supprimerRendezVous = (id: string) => {
    setRendezVous((prev) => prev.filter((rv) => rv.id !== id))
    alert("Rendez-vous supprimé.")
  }

  const verifierConflits = (nouveauRendezVous: RendezVous) => {
    return rendezVous.some((rv) => rv.date === nouveauRendezVous.date && rv.heure === nouveauRendezVous.heure)
  }

  return (
    <ContexteRendezVous.Provider
      value={{
        rendezVous,
        rendezVousSelectionne,
        definirRendezVousSelectionne,
        changerStatutRendezVous,
        ajouterRendezVous,
        supprimerRendezVous,
        verifierConflits,
        notifierPatient,
      }}
    >
      {children}
    </ContexteRendezVous.Provider>
  )
}


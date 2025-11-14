import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    dashboard: 'Tableau de bord',
    buildings: 'Bâtiments',
    receipts: 'Quittances',
    profile: 'Profil',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    monthlyEvolution: 'Évolution mensuelle',
    amount: 'Montant',
    search: 'Rechercher',
    filters: 'Filtres',
    addBuilding: 'Ajouter un bâtiment',
    viewApartments: 'Voir les appartements',
    owner: 'Propriétaire',
    apartments: 'appartements',
    occupied: 'occupés',
    free: 'libres',
    generateReceipts: 'Générer les quittances',
    sendByEmail: 'Envoyer par email',
    print: 'Imprimer',
    reference: 'Référence',
    tenant: 'Locataire',
    period: 'Période',
    generationDate: 'Date de génération',
    status: 'Statut',
    actions: 'Actions',
  },
  en: {
    dashboard: 'Dashboard',
    buildings: 'Buildings',
    receipts: 'Receipts',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    monthlyEvolution: 'Monthly Evolution',
    amount: 'Amount',
    search: 'Search',
    filters: 'Filters',
    addBuilding: 'Add Building',
    viewApartments: 'View Apartments',
    owner: 'Owner',
    apartments: 'apartments',
    occupied: 'occupied',
    free: 'free',
    generateReceipts: 'Generate Receipts',
    sendByEmail: 'Send by Email',
    print: 'Print',
    reference: 'Reference',
    tenant: 'Tenant',
    period: 'Period',
    generationDate: 'Generation Date',
    status: 'Status',
    actions: 'Actions',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 
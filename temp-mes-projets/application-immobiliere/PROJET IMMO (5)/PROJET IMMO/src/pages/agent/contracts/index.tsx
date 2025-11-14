"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/AdminCompotenants/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  FileText,
  User,
  Home,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  X,
  Save,
  Download,
  Filter,
  AlertCircle,
  MoreVertical,
  Building,
  Phone,
  MapPin,
  TrendingUp,
  Users,
  Banknote,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/AdminCompotenants/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Interface complète basée sur le contenu exact du PDF
interface ContractData {
  // Informations du locataire (du PDF)
  nom: string
  prenom: string
  adresseActuelle: string
  telephone: string
  email: string

  // Description du bien (du PDF)
  typeLogement: string
  surfaceHabitable: string
  etage: string
  balcon: string
  adresseComplete: string
  equipements: string

  // Conditions financières (du PDF)
  loyerMensuelHorsCharges: number
  chargesLocatives: number
  depotGarantie: number
  fraisAgence: number
  totalMensuel: number

  // Durée et conditions (du PDF)
  dateDebut: string
  dateFin: string
  dureeInitiale: string
  previsDepart: string
  revisionLoyer: string
  usageAutorise: string
  etat: string

  // Informations générées automatiquement
  numeroContrat?: string
  dateCreation?: string
}

// Contrat de base conforme au PDF
const initialContracts: ContractData[] = [
  {
    // Informations du locataire
    nom: "NDIAYE",
    prenom: "MODY YERO",
    adresseActuelle: "Résidence Les Jardins, Apt 203",
    telephone: "+221 77 123 45 67",
    email: "mody.ndiaye@email.com",

    // Description du bien
    typeLogement: "Studio meublé",
    surfaceHabitable: "35 m²",
    etage: "2ème étage avec ascenseur",
    balcon: "5 m² avec vue dégagée",
    adresseComplete: "Résidence Les Jardins, Apt 203",
    equipements: "Cuisine équipée, climatisation",

    // Conditions financières
    loyerMensuelHorsCharges: 550,
    chargesLocatives: 50,
    depotGarantie: 1100,
    fraisAgence: 550,
    totalMensuel: 600,

    // Durée et conditions
    dateDebut: "2025-01-01",
    dateFin: "2025-12-31",
    dureeInitiale: "12 mois",
    previsDepart: "1 mois",
    revisionLoyer: "Annuelle selon IRL",
    usageAutorise: "Habitation principale uniquement",
    etat: "en cours",

    // Informations générées
    numeroContrat: "2001",
    dateCreation: "2025-01-01",
  },
]

// Clé pour le stockage local
const STORAGE_KEY = "keurgui_immo_contracts"

const loadContracts = (): ContractData[] => {
  if (typeof window === "undefined") return initialContracts
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : initialContracts
}

const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<ContractData[]>(() => loadContracts())
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<ContractData | undefined>(undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")

  // État pour le formulaire - exactement conforme au PDF
  const [formData, setFormData] = useState<ContractData>({
    // Informations du locataire
    nom: "",
    prenom: "",
    adresseActuelle: "",
    telephone: "",
    email: "",

    // Description du bien
    typeLogement: "Studio meublé",
    surfaceHabitable: "35 m²",
    etage: "2ème étage avec ascenseur",
    balcon: "5 m² avec vue dégagée",
    adresseComplete: "",
    equipements: "Cuisine équipée, climatisation",

    // Conditions financières
    loyerMensuelHorsCharges: 550,
    chargesLocatives: 50,
    depotGarantie: 1100,
    fraisAgence: 550,
    totalMensuel: 600,

    // Durée et conditions
    dateDebut: "",
    dateFin: "",
    dureeInitiale: "12 mois",
    previsDepart: "1 mois",
    revisionLoyer: "Annuelle selon IRL",
    usageAutorise: "Habitation principale uniquement",
    etat: "en cours",
  })

  // Filtrage des contrats
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.numeroContrat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.adresseComplete.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "tous" || contract.etat === statusFilter

    return matchesSearch && matchesStatus
  })

  const generateContractNumber = () => {
    const nextNumber = contracts.length + 2001
    return nextNumber.toString()
  }

  const handleAdd = () => {
    setFormData({
      nom: "",
      prenom: "",
      adresseActuelle: "",
      telephone: "",
      email: "",
      typeLogement: "Studio meublé",
      surfaceHabitable: "35 m²",
      etage: "2ème étage avec ascenseur",
      balcon: "5 m² avec vue dégagée",
      adresseComplete: "",
      equipements: "Cuisine équipée, climatisation",
      loyerMensuelHorsCharges: 550,
      chargesLocatives: 50,
      depotGarantie: 1100,
      fraisAgence: 550,
      totalMensuel: 600,
      dateDebut: "",
      dateFin: "",
      dureeInitiale: "12 mois",
      previsDepart: "1 mois",
      revisionLoyer: "Annuelle selon IRL",
      usageAutorise: "Habitation principale uniquement",
      etat: "en cours",
    })
    setEditData(undefined)
    setIsEditing(false)
    setShowForm(true)
  }

  const handleEdit = (contract: ContractData) => {
    setFormData(contract)
    setEditData(contract)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (contract: ContractData) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le contrat de ${contract.prenom} ${contract.nom} ?`)) {
      const updatedContracts = contracts.filter((c) => c !== contract)
      setContracts(updatedContracts)
      saveContracts(updatedContracts)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation des champs obligatoires
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.telephone ||
      !formData.email ||
      !formData.adresseComplete ||
      !formData.dateDebut ||
      !formData.dateFin
    ) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Calculer automatiquement les valeurs dérivées
    const totalMensuel = formData.loyerMensuelHorsCharges + formData.chargesLocatives
    const depotGarantie = formData.loyerMensuelHorsCharges * 2
    const fraisAgence = formData.loyerMensuelHorsCharges

    const updatedFormData = {
      ...formData,
      totalMensuel,
      depotGarantie,
      fraisAgence,
      numeroContrat: isEditing ? formData.numeroContrat : generateContractNumber(),
      dateCreation: isEditing ? formData.dateCreation : new Date().toISOString().split("T")[0],
    }

    saveContract(updatedFormData)
  }

  // Sauvegarder les contrats dans le localStorage
  const saveContracts = (updatedContracts: ContractData[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContracts))
    }
  }

  const saveContract = (contract: ContractData) => {
    let updatedContracts: ContractData[] = []

    if (isEditing && editData) {
      updatedContracts = contracts.map((c) => (c === editData ? { ...contract } : c))
      setContracts(updatedContracts)
    } else {
      // Générer un numéro de contrat unique
      const contractNumber = generateContractNumber()
      const newContract = {
        ...contract,
        numeroContrat: contractNumber,
        dateCreation: new Date().toISOString().split("T")[0],
      }
      updatedContracts = [newContract, ...contracts]
      setContracts(updatedContracts)
    }

    saveContracts(updatedContracts)
    setShowForm(false)
  }

  const handleInputChange = <K extends keyof ContractData>(field: K, value: ContractData[K] | string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  // Gestionnaire pour les champs de sélection
  const handleSelectChange = (field: keyof ContractData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Génération du PDF optimisé avec le style moderne du tableau de bord
  const generateCleanPDF = (contract: ContractData) => {
    const contractHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrat de Bail #${contract.numeroContrat} - KEURGUI IMMO</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        body { 
            line-height: 1.6; 
            color: #1e293b;
            background: #f8fafc;
            padding: 40px 20px;
            font-size: 14px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            position: relative;
        }
        
        .logo {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 10px;
            display: inline-flex;
            width: 60px;
            height: 60px;
            background: white;
            color: #0891b2;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin: 0 auto 15px;
        }
        
        .company-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }
        
        .document-title {
            font-size: 20px;
            font-weight: 500;
            opacity: 0.95;
            margin-top: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .contract-number {
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: 600;
            color: #0891b2;
            font-size: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 30px;
            padding: 25px;
            border-radius: 10px;
            background: #ffffff;
            border-left: 4px solid #0891b2;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            page-break-inside: avoid;
        }
        
        .section:last-child {
            margin-bottom: 0;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #0891b2;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .info-item:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 500;
            color: #475569;
            font-size: 13px;
        }
        
        .info-value {
            font-weight: 600;
            color: #1e293b;
            text-align: right;
            max-width: 60%;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .highlight-box h3 {
            font-size: 20px;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .highlight-box p {
            margin: 10px 0 0;
            color: #4b5563;
            font-size: 13px;
        }
        
        .highlight-box h3 {
            color: #075985;
            margin: 0 0 10px 0;
            font-size: 16px;
            font-weight: 600;
        }
        
        .total-amount {
            font-size: 22px;
            font-weight: 700;
            color: #0369a1;
            margin: 15px 0 5px;
            letter-spacing: 0.5px;
        }
        
        .signature-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 50px 0 30px;
            padding: 30px;
            background: #f8fafc;
            border-radius: 10px;
            page-break-inside: avoid;
        }
        
        .signature-box {
            text-align: center;
            padding: 30px 20px;
            border: 2px dashed #0891b2;
            border-radius: 12px;
            background: white;
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transition: all 0.3s ease;
        }
        
        .signature-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .signature-line {
            border-top: 1px solid #94a3b8;
            margin: 40px 0 10px;
            position: relative;
        }
        
        .signature-title {
            font-size: 12px;
            color: #64748b;
            margin-top: 5px;
        }
        
        .terms {
            background: #fffbeb;
            border: 1px solid #f59e0b;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            font-size: 13px;
            line-height: 1.6;
            color: #92400e;
        }
        
        .terms h4 {
            margin-bottom: 10px;
            font-size: 15px;
            color: #b45309;
        }
        
        .terms ul {
            padding-left: 20px;
            margin-top: 10px;
        }
        
        .terms li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 25px;
            background: #1e293b;
            color: #e2e8f0;
            font-size: 12px;
            border-radius: 0 0 8px 8px;
        }
        
        .footer p {
            margin-bottom: 8px;
        }
        
        /* Styles d'impression optimisés */
        @media print {
            @page {
                size: A4;
                margin: 1.5cm;
            }
            
            body { 
                padding: 0 !important;
                background: white !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                font-size: 13px !important;
                line-height: 1.5 !important;
            }
            
            .container {
                max-width: 100% !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                margin: 0 !important;
            }
            
            .header {
                padding: 3rem 2rem !important;
                margin-bottom: 2rem !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background: linear-gradient(135deg, #0891b2, #0e7490) !important;
                color: white !important;
            }
            
            .content {
                padding: 0 2rem 2rem !important;
            }
            
            .section {
                page-break-inside: avoid !important;
                margin-bottom: 2rem !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
                border-left: 4px solid #0891b2 !important;
                border: 1px solid #e5e7eb !important;
            }
            
            .signature-section {
                page-break-inside: avoid !important;
                margin-top: 2rem !important;
            }
            
            .highlight-box {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .footer {
                display: none;
            }
            
            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">KI</div>
            <div class="company-name">KEURGUI IMMO</div>
            <div class="document-title">CONTRAT DE BAIL D'HABITATION</div>
            <div class="contract-number">Contrat #${contract.numeroContrat || "N/A"}</div>
        </div>
        
        <div class="content">
            <!-- Section Informations du locataire -->
            <div class="section">
                <div class="section-title">👤 Informations du locataire</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Nom complet</span>
                        <span class="info-value">${contract.prenom} ${contract.nom}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email</span>
                        <span class="info-value">${contract.email || "Non renseigné"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Téléphone</span>
                        <span class="info-value">${contract.telephone || "Non renseigné"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Adresse actuelle</span>
                        <span class="info-value">${contract.adresseActuelle || "Non renseignée"}</span>
                    </div>
                </div>
            </div>
            
            <!-- Section Détails du logement -->
            <div class="section">
                <div class="section-title">🏠 Détails du logement</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Type de logement</span>
                        <span class="info-value">${contract.typeLogement || "Non spécifié"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Surface habitable</span>
                        <span class="info-value">${contract.surfaceHabitable || "Non spécifiée"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Étage</span>
                        <span class="info-value">${contract.etage || "Non spécifié"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Balcon</span>
                        <span class="info-value">${contract.balcon || "Non spécifié"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Adresse complète</span>
                        <span class="info-value">${contract.adresseComplete || "Non spécifiée"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Équipements</span>
                        <span class="info-value">${contract.equipements || "Aucun équipement spécifié"}</span>
                    </div>
                </div>
            </div>
        
            <div class="section">
                <div class="section-title">💰 Conditions financières</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Loyer mensuel hors charges</span>
                        <span class="info-value">${contract.loyerMensuelHorsCharges ? `${contract.loyerMensuelHorsCharges} €` : "Non spécifié"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Charges locatives</span>
                        <span class="info-value">${contract.chargesLocatives ? `${contract.chargesLocatives} €` : "Aucune"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dépôt de garantie</span>
                        <span class="info-value">${contract.depotGarantie ? `${contract.depotGarantie} €` : "Non spécifié"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Frais d'agence</span>
                        <span class="info-value">${contract.fraisAgence ? `${contract.fraisAgence} €` : "Non spécifiés"}</span>
                    </div>
                </div>
                
                <div class="highlight-box">
                    <h3>Total mensuel</h3>
                    <div class="total-amount">
                        ${contract.totalMensuel ? `${contract.totalMensuel} €` : "Non spécifié"}
                    </div>
                    <p>Payable le 1er de chaque mois</p>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">DURÉE ET CONDITIONS DU BAIL</div>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <div class="info-label">Date de début</div>
                            <div class="info-value">${new Date(contract.dateDebut).toLocaleDateString("fr-FR")}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Date de fin</div>
                            <div class="info-value">${new Date(contract.dateFin).toLocaleDateString("fr-FR")}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Durée initiale</div>
                            <div class="info-value">${contract.dureeInitiale} renouvelables</div>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <div class="info-label">Préavis de départ</div>
                            <div class="info-value">${contract.previsDepart} minimum</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Révision du loyer</div>
                            <div class="info-value">${contract.revisionLoyer}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Usage autorisé</div>
                            <div class="info-value">${contract.usageAutorise}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="terms">
                <h4>Conditions générales</h4>
                <ul>
                    <li>Le présent contrat est soumis aux dispositions légales en vigueur en matière de location.</li>
                    <li>Le locataire s'engage à payer le loyer dans les délais impartis.</li>
                    <li>Toute modification du présent contrat doit faire l'objet d'un avenant signé par les deux parties.</li>
                    <li>Le dépôt de garantie sera restitué dans un délai maximum de 2 mois après l'état des lieux de sortie.</li>
                    <li>Assurance habitation obligatoire à fournir avant remise des clés.</li>
                    <li>Interdiction de sous-louer sans accord écrit du bailleur.</li>
                    <li>Entretien courant et réparations locatives à la charge du locataire.</li>
                    <li>Restitution des lieux en bon état en fin de bail.</li>
                </ul>
            </div>
            
            <div class="signature-section">
                <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-title">Signature du bailleur</div>
                    <div style="margin-top: 10px; font-size: 13px; color: #64748b;">KEURGUI IMMO SARL</div>
                    <div style="margin-top: 30px; font-size: 12px; color: #94a3b8;">Fait à Dakar, le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
                </div>
                <div class="signature-box">
                    <div class="signature-line"></div>
                    <div class="signature-title">Signature du locataire</div>
                    <div style="margin-top: 10px; font-size: 13px; color: #64748b;">${contract.prenom} ${contract.nom}</div>
                    <div style="margin-top: 30px; font-size: 12px; color: #94a3b8;">Fait à ________________, le _______________</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>KEURGUI IMMO - 123 Avenue Léopold Sédar Senghor, Dakar, Sénégal</p>
            <p>Tél: +221 33 123 45 67 - Email: contact@keurgui-immo.sn</p>
            <p>Contrat généré le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
    </div>
</body>
</html>`

    // Créer et télécharger le fichier HTML
    const blob = new Blob([contractHTML], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    // Créer un lien de téléchargement
    const link = document.createElement("a")
    link.href = url
    link.download = `Contrat_${contract.numeroContrat}_${contract.nom}_${contract.prenom}.html`

    // Ajouter le lien au document, cliquer dessus, puis le supprimer
    document.body.appendChild(link)
    link.click()

    // Nettoyer
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header moderne avec gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Gestion des Contrats</h1>
                <p className="text-blue-100 mt-1">Gérez vos contrats de location en toute simplicité</p>
              </div>
            </div>
            <Button
              onClick={handleAdd}
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau contrat
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Barre de recherche et filtres modernisée */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, contrat, ou adresse..."
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger className="w-full md:w-48 border-gray-200">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="en cours">En cours</SelectItem>
                  <SelectItem value="en attente">En attente</SelectItem>
                  <SelectItem value="résilié">Résilié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques modernisées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total contrats</p>
                  <p className="text-3xl font-bold mt-1">{contracts.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">En cours</p>
                  <p className="text-3xl font-bold mt-1">{contracts.filter((c) => c.etat === "en cours").length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">En attente</p>
                  <p className="text-3xl font-bold mt-1">{contracts.filter((c) => c.etat === "en attente").length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Revenus mensuels</p>
                  <p className="text-3xl font-bold mt-1">
                    {contracts.filter((c) => c.etat === "en cours").reduce((sum, c) => sum + c.totalMensuel, 0)} €
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerte si aucun contrat trouvé */}
        {filteredContracts.length === 0 && (searchTerm || statusFilter !== "tous") && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Aucun contrat ne correspond à vos critères de recherche. Essayez de modifier les filtres.
            </AlertDescription>
          </Alert>
        )}

        {/* Tableau des contrats modernisé */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-xl font-semibold text-gray-800">Liste des contrats</CardTitle>
            <CardDescription>
              Affichage de {filteredContracts.length} contrat(s) sur {contracts.length} au total
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/50 text-left text-sm font-medium text-gray-600">
                    <th className="px-6 py-4">Contrat</th>
                    <th className="px-6 py-4">Locataire</th>
                    <th className="px-6 py-4">Appartement</th>
                    <th className="px-6 py-4">Période</th>
                    <th className="px-6 py-4">Loyer</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((c, idx) => (
                    <tr key={idx} className="border-b hover:bg-blue-50/50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              Contrat #{c.numeroContrat || `${2000 + idx + 1}`}
                            </div>
                            <div className="text-xs text-gray-500">
                              Créé le{" "}
                              {c.dateCreation
                                ? new Date(c.dateCreation).toLocaleDateString("fr-FR")
                                : new Date(c.dateDebut).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {c.prenom.charAt(0)}
                            {c.nom.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{`${c.prenom} ${c.nom}`}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {c.telephone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{c.typeLogement}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {c.adresseComplete}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(c.dateDebut).toLocaleDateString("fr-FR")} -{" "}
                              {new Date(c.dateFin).toLocaleDateString("fr-FR")}
                            </div>
                            <div className="text-xs text-gray-500">{c.dureeInitiale}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-semibold text-gray-900">{`${c.totalMensuel} €`}</div>
                            <div className="text-xs text-gray-500">
                              {(c.totalMensuel * 655.957).toLocaleString()} FCFA
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {c.etat === "en cours" ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            En cours
                          </Badge>
                        ) : c.etat === "résilié" ? (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Résilié
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                            <Clock className="h-3 w-3 mr-1" />
                            En attente
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Ouvrir le menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir les détails
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                      KI
                                    </div>
                                    Contrat de bail KEURGUI IMMO
                                  </DialogTitle>
                                  <DialogDescription>Détails complets du contrat de location</DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-[70vh]">
                                  <div className="space-y-6 p-4">
                                    <div className="text-center">
                                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                        KI
                                      </div>
                                      <h3 className="text-xl font-bold text-blue-600">CONTRAT DE BAIL</h3>
                                      <p className="text-gray-600">KEURGUI IMMO</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                                          <Building className="h-4 w-4" />
                                          Bailleur
                                        </h4>
                                        <p className="text-sm font-medium">KEURGUI IMMO SARL</p>
                                        <p className="text-sm text-gray-600">123 Avenue Léopold Sédar Senghor</p>
                                        <p className="text-sm text-gray-600">Dakar, Sénégal</p>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                                          <Users className="h-4 w-4" />
                                          Locataire
                                        </h4>
                                        <p className="text-sm font-medium">
                                          {c.nom} {c.prenom}
                                        </p>
                                        <p className="text-sm text-gray-600">{c.adresseActuelle}</p>
                                        <p className="text-sm text-gray-600">
                                          {c.telephone} - {c.email}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Description du bien
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        {[
                                          { label: "Type", value: c.typeLogement },
                                          { label: "Surface", value: c.surfaceHabitable },
                                          { label: "Étage", value: c.etage },
                                          { label: "Balcon", value: c.balcon },
                                          { label: "Adresse", value: c.adresseComplete },
                                          { label: "Équipements", value: c.equipements },
                                        ].map((item, index) => (
                                          <div key={index} className="flex justify-between">
                                            <span className="text-gray-600">{item.label}:</span>
                                            <span className="font-medium">{item.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                      <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                                        <Banknote className="h-4 w-4" />
                                        Conditions financières
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        {[
                                          {
                                            label: "Loyer mensuel",
                                            value: `${c.loyerMensuelHorsCharges.toFixed(2)} €`,
                                          },
                                          { label: "Charges", value: `${c.chargesLocatives.toFixed(2)} €` },
                                          {
                                            label: "Total mensuel",
                                            value: `${c.totalMensuel.toFixed(2)} €`,
                                            highlight: true,
                                          },
                                          { label: "Dépôt de garantie", value: `${c.depotGarantie.toFixed(2)} €` },
                                        ].map((item, index) => (
                                          <div key={index} className="flex justify-between">
                                            <span className="text-gray-600">{item.label}:</span>
                                            <span
                                              className={`font-medium ${item.highlight ? "text-blue-600 font-bold" : ""}`}
                                            >
                                              {item.value}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Durée du bail
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        {[
                                          {
                                            label: "Date de début",
                                            value: new Date(c.dateDebut).toLocaleDateString("fr-FR"),
                                          },
                                          {
                                            label: "Date de fin",
                                            value: new Date(c.dateFin).toLocaleDateString("fr-FR"),
                                          },
                                          { label: "Durée", value: c.dureeInitiale },
                                          { label: "Préavis", value: c.previsDepart },
                                        ].map((item, index) => (
                                          <div key={index} className="flex justify-between">
                                            <span className="text-gray-600">{item.label}:</span>
                                            <span className="font-medium">{item.value}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>

                            <DropdownMenuItem onClick={() => handleEdit(c)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => generateCleanPDF(c)}>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger PDF
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleDelete(c)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire modernisé */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? `Modifier le contrat #${formData.numeroContrat}` : "Nouveau contrat de bail"}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="hover:bg-gray-100">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="h-[calc(90vh-180px)] w-full">
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-8">
                    {/* Section 1: Informations du locataire */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2">
                        <User className="h-5 w-5" />
                        Informations du locataire
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nom" className="text-sm font-medium">
                            Nom *
                          </Label>
                          <Input
                            id="nom"
                            value={formData.nom}
                            onChange={handleTextInputChange}
                            name="nom"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prenom" className="text-sm font-medium">
                            Prénom *
                          </Label>
                          <Input
                            id="prenom"
                            value={formData.prenom}
                            onChange={handleTextInputChange}
                            name="prenom"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telephone" className="text-sm font-medium">
                            Téléphone *
                          </Label>
                          <Input
                            id="telephone"
                            value={formData.telephone}
                            onChange={handleTextInputChange}
                            name="telephone"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleTextInputChange}
                            name="email"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="adresseActuelle" className="text-sm font-medium">
                            Adresse actuelle *
                          </Label>
                          <Input
                            id="adresseActuelle"
                            value={formData.adresseActuelle}
                            onChange={handleTextInputChange}
                            name="adresseActuelle"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Description du bien */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2">
                        <Home className="h-5 w-5" />
                        Description du bien loué
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="typeLogement" className="text-sm font-medium">
                            Type de logement *
                          </Label>
                          <Select value={formData.typeLogement} onValueChange={handleSelectChange("typeLogement")}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Studio meublé">Studio meublé</SelectItem>
                              <SelectItem value="Studio non meublé">Studio non meublé</SelectItem>
                              <SelectItem value="T1 meublé">T1 meublé</SelectItem>
                              <SelectItem value="T1 non meublé">T1 non meublé</SelectItem>
                              <SelectItem value="T2 meublé">T2 meublé</SelectItem>
                              <SelectItem value="T2 non meublé">T2 non meublé</SelectItem>
                              <SelectItem value="T3 meublé">T3 meublé</SelectItem>
                              <SelectItem value="T3 non meublé">T3 non meublé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="surfaceHabitable" className="text-sm font-medium">
                            Surface habitable *
                          </Label>
                          <Input
                            id="surfaceHabitable"
                            value={formData.surfaceHabitable}
                            onChange={handleTextInputChange}
                            name="surfaceHabitable"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="etage" className="text-sm font-medium">
                            Étage *
                          </Label>
                          <Input
                            id="etage"
                            value={formData.etage}
                            onChange={handleTextInputChange}
                            name="etage"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="balcon" className="text-sm font-medium">
                            Balcon *
                          </Label>
                          <Input
                            id="balcon"
                            value={formData.balcon}
                            onChange={handleTextInputChange}
                            name="balcon"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="adresseComplete" className="text-sm font-medium">
                            Adresse complète du bien *
                          </Label>
                          <Input
                            id="adresseComplete"
                            value={formData.adresseComplete}
                            onChange={handleTextInputChange}
                            name="adresseComplete"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="equipements" className="text-sm font-medium">
                            Équipements *
                          </Label>
                          <Textarea
                            id="equipements"
                            value={formData.equipements}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                              handleInputChange("equipements", e.target.value)
                            }
                            placeholder="Cuisine équipée, climatisation, balcon..."
                            required
                            rows={2}
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Conditions financières */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2">
                        <DollarSign className="h-5 w-5" />
                        Conditions financières
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="loyerMensuelHorsCharges" className="text-sm font-medium">
                            Loyer mensuel hors charges (€) *
                          </Label>
                          <Input
                            id="loyerMensuelHorsCharges"
                            type="number"
                            value={formData.loyerMensuelHorsCharges}
                            onChange={(e) => {
                              const value = Number(e.target.value)
                              handleInputChange("loyerMensuelHorsCharges", value)
                              handleInputChange("depotGarantie", value * 2)
                              handleInputChange("fraisAgence", value)
                              handleInputChange("totalMensuel", value + formData.chargesLocatives)
                            }}
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="chargesLocatives" className="text-sm font-medium">
                            Charges locatives (€) *
                          </Label>
                          <Input
                            id="chargesLocatives"
                            type="number"
                            value={formData.chargesLocatives}
                            onChange={(e) => {
                              const value = Number(e.target.value)
                              handleInputChange("chargesLocatives", value)
                              handleInputChange("totalMensuel", formData.loyerMensuelHorsCharges + value)
                            }}
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Dépôt de garantie (auto-calculé)</Label>
                          <Input
                            value={`${formData.loyerMensuelHorsCharges * 2} €`}
                            disabled
                            className="mt-1 bg-gray-100"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Frais d'agence (auto-calculé)</Label>
                          <Input
                            value={`${formData.loyerMensuelHorsCharges} €`}
                            disabled
                            className="mt-1 bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-3">Aperçu des montants calculés</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="p-3 bg-white rounded border">
                            <span className="text-gray-600 block">Total mensuel:</span>
                            <span className="font-bold text-blue-600 text-lg">
                              {formData.loyerMensuelHorsCharges + formData.chargesLocatives} €
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded border">
                            <span className="text-gray-600 block">Dépôt de garantie:</span>
                            <span className="font-bold text-blue-600 text-lg">
                              {formData.loyerMensuelHorsCharges * 2} €
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded border">
                            <span className="text-gray-600 block">En FCFA (mensuel):</span>
                            <span className="font-bold text-blue-600 text-lg">
                              {(
                                (formData.loyerMensuelHorsCharges + formData.chargesLocatives) *
                                655.957
                              ).toLocaleString()}{" "}
                              FCFA
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Durée et conditions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2">
                        <Calendar className="h-5 w-5" />
                        Durée et conditions du bail
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dateDebut" className="text-sm font-medium">
                            Date de début *
                          </Label>
                          <Input
                            id="dateDebut"
                            type="date"
                            value={formData.dateDebut}
                            onChange={handleTextInputChange}
                            name="dateDebut"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateFin" className="text-sm font-medium">
                            Date de fin *
                          </Label>
                          <Input
                            id="dateFin"
                            type="date"
                            value={formData.dateFin}
                            onChange={handleTextInputChange}
                            name="dateFin"
                            required
                            className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dureeInitiale" className="text-sm font-medium">
                            Durée initiale *
                          </Label>
                          <Select value={formData.dureeInitiale} onValueChange={handleSelectChange("dureeInitiale")}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6 mois">6 mois</SelectItem>
                              <SelectItem value="12 mois">12 mois</SelectItem>
                              <SelectItem value="24 mois">24 mois</SelectItem>
                              <SelectItem value="36 mois">36 mois</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="previsDepart" className="text-sm font-medium">
                            Préavis de départ *
                          </Label>
                          <Select value={formData.previsDepart} onValueChange={handleSelectChange("previsDepart")}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1 mois">1 mois</SelectItem>
                              <SelectItem value="2 mois">2 mois</SelectItem>
                              <SelectItem value="3 mois">3 mois</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="revisionLoyer" className="text-sm font-medium">
                            Révision du loyer *
                          </Label>
                          <Select value={formData.revisionLoyer} onValueChange={handleSelectChange("revisionLoyer")}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Annuelle selon IRL">Annuelle selon IRL</SelectItem>
                              <SelectItem value="Annuelle libre">Annuelle libre</SelectItem>
                              <SelectItem value="Pas de révision">Pas de révision</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="usageAutorise" className="text-sm font-medium">
                            Usage autorisé *
                          </Label>
                          <Select value={formData.usageAutorise} onValueChange={handleSelectChange("usageAutorise")}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Habitation principale uniquement">
                                Habitation principale uniquement
                              </SelectItem>
                              <SelectItem value="Habitation principale et professionnelle">
                                Habitation principale et professionnelle
                              </SelectItem>
                              <SelectItem value="Usage mixte autorisé">Usage mixte autorisé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="etat" className="text-sm font-medium">
                            Statut du contrat *
                          </Label>
                          <Select value={formData.etat} onValueChange={(value) => handleInputChange("etat", value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en cours">En cours</SelectItem>
                              <SelectItem value="en attente">En attente</SelectItem>
                              <SelectItem value="résilié">Résilié</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="h-20"></div>
                  </div>
                </form>
              </ScrollArea>
            </div>

            <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-b-2xl">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {isEditing
                    ? "Modification des informations du contrat"
                    : "Tous les champs marqués * sont obligatoires"}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="px-6 border-gray-300 hover:bg-gray-50"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-6 shadow-lg"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Modifier" : "Enregistrer"} le contrat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContractsPage

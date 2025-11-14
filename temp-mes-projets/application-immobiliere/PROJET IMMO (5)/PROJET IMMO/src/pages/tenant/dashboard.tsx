"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/AdminCompotenants/ui/Card"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/AdminCompotenants/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { ScrollArea } from "@/components/AdminCompotenants/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/AdminCompotenants/ui/progress"
import {
  Home,
  CreditCard,
  Receipt,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  ArrowRight,
  FileText,
  Send,
  Camera,
  Euro,
  Eye,
  MapPin,
  User,
  Phone,
  Mail,
  Loader2,
  Star,
  TrendingUp,
  Calendar,
  Building,
} from "lucide-react"

export default function TenantDashboard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentProgress, setPaymentProgress] = useState(0)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Agent Immobilier",
      content: "Bonjour, nous passerons pour la visite annuelle le 20/05. Merci de confirmer votre disponibilité.",
      timestamp: "Hier, 14:30",
      isFromTenant: false,
    },
    {
      id: 2,
      sender: "Vous",
      content: "Bonjour, je confirme ma disponibilité pour le 20/05 à partir de 14h.",
      timestamp: "Aujourd'hui, 09:15",
      isFromTenant: true,
    },
    {
      id: 3,
      sender: "Agent Immobilier",
      content: "Parfait, nous serons là à 14h précises. Merci de votre collaboration.",
      timestamp: "Aujourd'hui, 10:30",
      isFromTenant: false,
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Charger l'image depuis localStorage au démarrage
  useEffect(() => {
    const savedImage = localStorage.getItem("apartmentImage")
    if (savedImage) {
      setSelectedImage(savedImage)
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setSelectedImage(imageData)
        localStorage.setItem("apartmentImage", imageData)
        toast({
          title: "✨ Image téléversée",
          description: "L'image de votre appartement a été mise à jour avec succès.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Vous",
        content: newMessage,
        timestamp: new Date().toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        isFromTenant: true,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
      toast({
        title: "📨 Message envoyé",
        description: "Votre message a été envoyé à l'agence.",
      })
    }
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez sélectionner un mode de paiement.",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "orange" || paymentMethod === "wave") {
      if (!phoneNumber) {
        toast({
          title: "❌ Erreur",
          description: "Veuillez saisir votre numéro de téléphone.",
          variant: "destructive",
        })
        return
      }
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv) {
        toast({
          title: "❌ Erreur",
          description: "Veuillez remplir tous les champs de la carte.",
          variant: "destructive",
        })
        return
      }
    }

    setIsProcessingPayment(true)
    setPaymentProgress(0)

    // Simulation du processus de paiement avec progression
    const progressInterval = setInterval(() => {
      setPaymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Redirection simulée vers les services de paiement
    setTimeout(() => {
      if (paymentMethod === "orange") {
        toast({
          title: "🔄 Redirection Orange Money",
          description: "Redirection vers Orange Money en cours...",
        })
        // Simulation d'ouverture d'une nouvelle fenêtre
        window.open("about:blank", "_blank")?.document.write(`
          <html>
            <head><title>Orange Money - Paiement</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #ff6b35, #f7931e);">
              <h1 style="color: white;">Orange Money</h1>
              <p style="color: white; font-size: 18px;">Paiement de 600€ à KEURGUI IMMO</p>
              <p style="color: white;">Numéro: ${phoneNumber}</p>
              <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 300px;">
                <p>Confirmez le paiement sur votre téléphone</p>
              </div>
            </body>
          </html>
        `)
      } else if (paymentMethod === "wave") {
        toast({
          title: "🔄 Redirection Wave",
          description: "Redirection vers Wave en cours...",
        })
        window.open("about:blank", "_blank")?.document.write(`
          <html>
            <head><title>Wave - Paiement</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
              <h1 style="color: white;">Wave</h1>
              <p style="color: white; font-size: 18px;">Paiement de 600€ à KEURGUI IMMO</p>
              <p style="color: white;">Numéro: ${phoneNumber}</p>
              <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 300px;">
                <p>Confirmez le paiement sur votre téléphone</p>
              </div>
            </body>
          </html>
        `)
      }
    }, 1000)

    // Simulation de succès du paiement
    setTimeout(() => {
      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      toast({
        title: "🎉 Paiement réussi !",
        description: "Votre loyer a été payé avec succès. Une quittance sera générée.",
      })

      // Reset après 3 secondes
      setTimeout(() => {
        setPaymentSuccess(false)
        setPaymentMethod("")
        setPhoneNumber("")
        setCardNumber("")
        setExpiryDate("")
        setCvv("")
      }, 3000)
    }, 3000)
  }

  const generateReceiptPDF = (month: string) => {
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quittance de Loyer - ${month} 2025</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: #0891b2;
        }
        .company-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .document-title {
            font-size: 20px;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            border-radius: 10px;
            background: #f8fafc;
            border-left: 4px solid #0891b2;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #0891b2;
            margin-bottom: 15px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
        }
        .info-value {
            font-weight: bold;
            color: #1e293b;
        }
        .amount-section {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
        }
        .total-amount {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .footer {
            background: #f1f5f9;
            padding: 30px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
        }
        .stamp {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="stamp">
                PAYÉ<br>
                ${new Date().toLocaleDateString("fr-FR")}
            </div>
            <div class="logo">KI</div>
            <div class="company-name">KEURGUI IMMO</div>
            <div class="document-title">QUITTANCE DE LOYER</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">📍 Informations du locataire</div>
                <div class="info-item">
                    <span class="info-label">Nom complet:</span>
                    <span class="info-value">Locataire</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Adresse du bien:</span>
                    <span class="info-value">Résidence Les Jardins, Apt 203</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Code postal:</span>
                    <span class="info-value">75001 Paris</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">📅 Détails de la période</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Période:</span>
                        <span class="info-value">${month} 2025</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Date de paiement:</span>
                        <span class="info-value">${new Date().toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Mode de paiement:</span>
                        <span class="info-value">Paiement en ligne</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Référence:</span>
                        <span class="info-value">QUI-${month.toUpperCase()}-2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">💰 Détail des montants</div>
                <div class="info-item">
                    <span class="info-label">Loyer mensuel:</span>
                    <span class="info-value">550,00 €</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Charges locatives:</span>
                    <span class="info-value">50,00 €</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Assurance habitation:</span>
                    <span class="info-value">0,00 €</span>
                </div>
            </div>
            
            <div class="amount-section">
                <div class="total-amount">600,00 €</div>
                <div>MONTANT TOTAL PAYÉ</div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>KEURGUI IMMO</strong> - Agence immobilière professionnelle</p>
            <p>📧 contact@keurgui-immo.sn | 📞 +221 33 123 45 67</p>
            <p>🏢 123 Avenue Léopold Sédar Senghor, Dakar, Sénégal</p>
            <br>
            <p>Cette quittance certifie le paiement intégral du loyer pour la période mentionnée.</p>
            <p><em>Document généré automatiquement le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}</em></p>
        </div>
    </div>
</body>
</html>`

    const blob = new Blob([receiptHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `quittance-${month.toLowerCase()}-2025-keurgui-immo.html`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "📄 Quittance téléchargée",
      description: `La quittance moderne pour ${month} a été téléchargée.`,
    })
  }

  const downloadContract = () => {
    const contractHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contrat de Bail - KEURGUI IMMO</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .logo {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: #0891b2;
        }
        .company-name {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .document-title {
            font-size: 24px;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .section {
            margin-bottom: 40px;
            padding: 25px;
            border-radius: 10px;
            background: #f8fafc;
            border-left: 5px solid #0891b2;
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #0891b2;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
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
            border-bottom: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
        }
        .info-value {
            font-weight: bold;
            color: #1e293b;
        }
        .highlight-box {
            background: linear-gradient(135deg, #0891b2, #0e7490);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        .signature-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 60px;
            padding: 30px;
            background: #f1f5f9;
            border-radius: 10px;
        }
        .signature-box {
            text-align: center;
            padding: 20px;
            border: 2px dashed #0891b2;
            border-radius: 10px;
            background: white;
        }
        .footer {
            background: #1e293b;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .terms {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">KI</div>
            <div class="company-name">KEURGUI IMMO</div>
            <div class="document-title">CONTRAT DE BAIL D'HABITATION</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">👥 Parties contractantes</div>
                <div class="info-grid">
                    <div>
                        <h4 style="color: #0891b2; margin-bottom: 10px;">🏢 LE BAILLEUR</h4>
                        <div class="info-item">
                            <span class="info-label">Société:</span>
                            <span class="info-value">KEURGUI IMMO SARL</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Adresse:</span>
                            <span class="info-value">123 Avenue Léopold Sédar Senghor</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Ville:</span>
                            <span class="info-value">Dakar, Sénégal</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">NINEA:</span>
                            <span class="info-value">123456789</span>
                        </div>
                    </div>
                    <div>
                        <h4 style="color: #0891b2; margin-bottom: 10px;">👤 LE LOCATAIRE</h4>
                        <div class="info-item">
                            <span class="info-label">Nom:</span>
                            <span class="info-value">Locataire</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Adresse actuelle:</span>
                            <span class="info-value">Résidence Les Jardins</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Téléphone:</span>
                            <span class="info-value">+221 XX XXX XX XX</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span class="info-value">locataire@email.com</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">🏠 Description du bien loué</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Type de logement:</span>
                        <span class="info-value">Studio meublé</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Surface habitable:</span>
                        <span class="info-value">35 m²</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Étage:</span>
                        <span class="info-value">2ème étage avec ascenseur</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Balcon:</span>
                        <span class="info-value">5 m² avec vue dégagée</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Adresse complète:</span>
                        <span class="info-value">Résidence Les Jardins, Apt 203</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Équipements:</span>
                        <span class="info-value">Cuisine équipée, climatisation</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">💰 Conditions financières</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Loyer mensuel hors charges:</span>
                        <span class="info-value">550,00 € (CFA 360 750)</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Charges locatives:</span>
                        <span class="info-value">50,00 € (CFA 32 795)</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Dépôt de garantie:</span>
                        <span class="info-value">1 100,00 € (CFA 721 500)</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Frais d'agence:</span>
                        <span class="info-value">550,00 € (CFA 360 750)</span>
                    </div>
                </div>
                
                <div class="highlight-box">
                    <h3>TOTAL MENSUEL: 600,00 € (CFA 393 545)</h3>
                    <p>Payable le 1er de chaque mois</p>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">📅 Durée et conditions du bail</div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Date de début:</span>
                        <span class="info-value">01 janvier 2025</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Date de fin:</span>
                        <span class="info-value">31 décembre 2025</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Durée initiale:</span>
                        <span class="info-value">12 mois renouvelables</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Préavis de départ:</span>
                        <span class="info-value">1 mois minimum</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Révision du loyer:</span>
                        <span class="info-value">Annuelle selon IRL</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Usage autorisé:</span>
                        <span class="info-value">Habitation principale uniquement</span>
                    </div>
                </div>
            </div>
            
            <div class="terms">
                <h4 style="color: #f59e0b; margin-bottom: 10px;">⚠️ Clauses importantes</h4>
                <ul style="padding-left: 20px;">
                    <li>Le locataire s'engage à occuper personnellement les lieux</li>
                    <li>Assurance habitation obligatoire à fournir avant remise des clés</li>
                    <li>Interdiction de sous-louer sans accord écrit du bailleur</li>
                    <li>Entretien courant et réparations locatives à la charge du locataire</li>
                    <li>Restitution des lieux en bon état en fin de bail</li>
                </ul>
            </div>
            
            <div class="signature-section">
                <div class="signature-box">
                    <h4 style="color: #0891b2;">LE BAILLEUR</h4>
                    <p style="margin: 20px 0;">KEURGUI IMMO SARL</p>
                    <p>Date: _______________</p>
                    <br><br>
                    <p>Signature et cachet:</p>
                    <br><br><br>
                </div>
                <div class="signature-box">
                    <h4 style="color: #0891b2;">LE LOCATAIRE</h4>
                    <p style="margin: 20px 0;">Locataire</p>
                    <p>Date: _______________</p>
                    <br><br>
                    <p>Signature:</p>
                    <br><br><br>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>KEURGUI IMMO</strong> - Votre partenaire immobilier de confiance</p>
            <p>📧 contact@keurgui-immo.sn | 📞 +221 33 123 45 67 | 🌐 www.keurgui-immo.sn</p>
            <p><em>Document généré le ${new Date().toLocaleDateString("fr-FR")} - Tous droits réservés</em></p>
        </div>
    </div>
</body>
</html>`

    const blob = new Blob([contractHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contrat-bail-2025-keurgui-immo.html"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "📋 Contrat téléchargé",
      description: "Votre contrat de bail moderne a été téléchargé.",
    })
  }

  const paymentHistory = [
    {
      month: "Avril",
      date: "02/04/2025",
      amount: "600,00 €",
      status: "Payé",
      method: "Carte bancaire",
      reference: "PAY-2025-04-001",
    },
    {
      month: "Mars",
      date: "01/03/2025",
      amount: "600,00 €",
      status: "Payé",
      method: "Orange Money",
      reference: "PAY-2025-03-001",
    },
    {
      month: "Février",
      date: "02/02/2025",
      amount: "600,00 €",
      status: "Payé",
      method: "Wave",
      reference: "PAY-2025-02-001",
    },
    {
      month: "Janvier",
      date: "02/01/2025",
      amount: "600,00 €",
      status: "Payé",
      method: "Carte bancaire",
      reference: "PAY-2025-01-001",
    },
    {
      month: "Décembre",
      date: "01/12/2024",
      amount: "600,00 €",
      status: "Payé",
      method: "Orange Money",
      reference: "PAY-2024-12-001",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900">
      <div className="p-6">
        {/* Header modernisé */}
        {/* Header simplifié */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Tableau de bord locataire
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Service premium</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Paiements à jour</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Contrat actif</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Carte Appartement modernisée */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-cyan-600" />
                <CardTitle className="text-lg dark:text-white">Mon appartement</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">Résidence Les Jardins, Apt 203</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative group shadow-inner">
                <img
                  src={selectedImage || "/placeholder.svg?height=200&width=400"}
                  alt="Appartement"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2 bg-white/90 hover:bg-white text-gray-900 shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                    Changer l'image
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="font-medium dark:text-white">Studio</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <span className="text-gray-500 dark:text-gray-400">Surface:</span>
                  <span className="font-medium dark:text-white">35 m²</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <span className="text-gray-500 dark:text-gray-400">Loyer mensuel:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">600 €</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="sm">
                    <Home className="mr-2 h-4 w-4" />
                    Voir les détails
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white flex items-center gap-2">
                      <Building className="h-5 w-5 text-cyan-600" />
                      Détails de l'appartement
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Informations complètes sur votre logement
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-cyan-600" />
                          <span className="font-medium dark:text-white">Adresse complète</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Résidence Les Jardins
                            <br />
                            Appartement 203, 2ème étage
                            <br />
                            123 Avenue des Fleurs
                            <br />
                            75001 Paris, France
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-cyan-600" />
                          <span className="font-medium dark:text-white">Caractéristiques</span>
                        </div>
                        <div className="text-sm space-y-2">
                          {[
                            { label: "Type", value: "Studio" },
                            { label: "Surface", value: "35 m²" },
                            { label: "Pièces", value: "1 pièce principale" },
                            { label: "Salle de bain", value: "1 avec douche" },
                            { label: "Cuisine", value: "Kitchenette équipée" },
                            { label: "Balcon", value: "Oui, 5 m²" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between p-2 rounded bg-gray-50 dark:bg-gray-700">
                              <span className="text-gray-600 dark:text-gray-300">{item.label}:</span>
                              <span className="dark:text-white font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-cyan-600" />
                        <span className="font-medium dark:text-white">Contact KEURGUI IMMO</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="dark:text-white">+221 33 123 45 67</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="dark:text-white">contact@keurgui-immo.sn</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Carte Paiement modernisée */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-cyan-600" />
                <CardTitle className="text-lg dark:text-white">Prochain paiement</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">Échéance du loyer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  600 €
                </div>
                <Badge
                  variant="secondary"
                  className="gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                >
                  <Clock className="h-3 w-3" />
                  Échéance: 05/06/2025
                </Badge>
              </div>

              {paymentSuccess ? (
                <div className="mt-4 rounded-xl border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-800 dark:text-green-400">Paiement réussi !</div>
                  <div className="text-sm text-green-600 dark:text-green-300">Votre loyer a été payé avec succès</div>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="mt-4 rounded-xl border bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 cursor-pointer hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-cyan-600" />
                          <span className="font-medium dark:text-white">Paiement en ligne</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                        >
                          Payer maintenant
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-gray-800">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white flex items-center gap-2">
                        <Euro className="h-5 w-5 text-cyan-600" />
                        Paiement du loyer
                      </DialogTitle>
                      <DialogDescription className="dark:text-gray-400">
                        Choisissez votre mode de paiement pour régler votre loyer de 600 € (550 € + 50 € de charges)
                      </DialogDescription>
                    </DialogHeader>

                    {isProcessingPayment ? (
                      <div className="space-y-4 py-8">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-cyan-600 mb-4" />
                          <p className="dark:text-white">Traitement du paiement en cours...</p>
                        </div>
                        <Progress value={paymentProgress} className="w-full" />
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          {paymentProgress < 50
                            ? "Connexion sécurisée..."
                            : paymentProgress < 80
                              ? "Vérification des données..."
                              : "Finalisation du paiement..."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="payment-method" className="dark:text-white">
                            Mode de paiement
                          </Label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                              <SelectValue placeholder="Sélectionnez un mode de paiement" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-700">
                              <SelectItem value="orange">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                                  Orange Money
                                </div>
                              </SelectItem>
                              <SelectItem value="wave">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                  Wave
                                </div>
                              </SelectItem>
                              <SelectItem value="card">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4" />
                                  Carte bancaire
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(paymentMethod === "orange" || paymentMethod === "wave") && (
                          <div>
                            <Label htmlFor="phone" className="dark:text-white">
                              Numéro de téléphone
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+221 XX XXX XX XX"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="dark:bg-gray-700 dark:border-gray-600"
                            />
                          </div>
                        )}

                        {paymentMethod === "card" && (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="card-number" className="dark:text-white">
                                Numéro de carte
                              </Label>
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="expiry" className="dark:text-white">
                                  Date d'expiration
                                </Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/AA"
                                  value={expiryDate}
                                  onChange={(e) => setExpiryDate(e.target.value)}
                                  className="dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv" className="dark:text-white">
                                  CVV
                                </Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                  className="dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={handlePayment}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                          disabled={isProcessingPayment}
                        >
                          <Euro className="mr-2 h-4 w-4" />
                          Payer 600 €
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Receipt className="mr-2 h-4 w-4" />
                    Voir les quittances
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-cyan-600" />
                      Mes quittances KEURGUI IMMO
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Consultez et téléchargez vos quittances de loyer
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {paymentHistory.map((payment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-xl dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                              <Receipt className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">Quittance {payment.month} 2025</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {payment.amount} - Payé le {payment.date}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">Réf: {payment.reference}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Voir
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="dark:bg-gray-800 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="dark:text-white">Quittance {payment.month} 2025</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 p-4 border rounded-lg dark:border-gray-600">
                                  <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                                      KI
                                    </div>
                                    <h3 className="text-lg font-bold text-cyan-600">QUITTANCE DE LOYER</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">KEURGUI IMMO</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium dark:text-white">Locataire</h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">Locataire</p>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Résidence Les Jardins, Apt 203
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium dark:text-white">Période</h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">{payment.month} 2025</p>
                                      <p className="text-sm text-gray-600 dark:text-gray-300">Payé le {payment.date}</p>
                                    </div>
                                  </div>
                                  <div className="border-t pt-4 dark:border-gray-600">
                                    <div className="flex justify-between mb-2">
                                      <span className="dark:text-white">Loyer:</span>
                                      <span className="dark:text-white">550,00 €</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="dark:text-white">Charges:</span>
                                      <span className="dark:text-white">50,00 €</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2 dark:border-gray-600">
                                      <span className="dark:text-white">Total payé:</span>
                                      <span className="text-cyan-600">{payment.amount}</span>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateReceiptPDF(payment.month)}
                              className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Historique
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white">Historique des paiements</DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Détails complets de tous vos paiements
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {paymentHistory.map((payment, index) => (
                        <div key={index} className="p-4 border rounded-lg dark:border-gray-600">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-cyan-600" />
                              <div>
                                <div className="font-medium dark:text-white">Loyer {payment.month} 2025</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Payé le {payment.date} via {payment.method}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-cyan-600">{payment.amount}</div>
                              <Badge variant="secondary" className="text-xs">
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">Référence: {payment.reference}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Carte Messagerie modernisée */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cyan-600" />
                <CardTitle className="text-lg dark:text-white">Messagerie</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">Communication avec KEURGUI IMMO</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32 mb-4">
                <div className="space-y-3">
                  {messages.slice(-2).map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-xl border p-3 ${
                        message.isFromTenant
                          ? "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800"
                          : "bg-gray-50 dark:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{message.sender}</span>
                        <span>•</span>
                        <span>{message.timestamp}</span>
                      </div>
                      <p className="mt-1 text-sm dark:text-white">{message.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Écrire un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 dark:bg-gray-700 dark:border-gray-600 rounded-xl"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Voir tous les messages
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white">Tous les messages</DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Historique complet de vos échanges avec KEURGUI IMMO
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`rounded-xl border p-3 ${
                            message.isFromTenant
                              ? "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-cyan-200 dark:border-cyan-800"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{message.sender}</span>
                            <span>•</span>
                            <span>{message.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm dark:text-white">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 mt-4">
                    <Input
                      type="text"
                      placeholder="Écrire un message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Historique des paiements modernisé */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                <CardTitle className="dark:text-white">Derniers paiements</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">Historique de vos transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.slice(0, 3).map((payment, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border p-4 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 p-3">
                        <CheckCircle className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <div className="font-medium dark:text-white">Loyer {payment.month} 2025</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Payé le {payment.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium dark:text-white">{payment.amount}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-xs hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                        onClick={() => generateReceiptPDF(payment.month)}
                      >
                        <Download className="h-3 w-3" />
                        Quittance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="sm">
                    Voir tout l'historique
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white">Historique complet des paiements</DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Tous vos paiements depuis le début du contrat
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {paymentHistory.map((payment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-xl dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 p-2">
                              <CheckCircle className="h-5 w-5 text-cyan-600" />
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">Loyer {payment.month} 2025</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Payé le {payment.date} via {payment.method}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">Réf: {payment.reference}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium dark:text-white">{payment.amount}</div>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {payment.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 gap-1 text-xs"
                                onClick={() => generateReceiptPDF(payment.month)}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Informations du contrat modernisées */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-600" />
                <CardTitle className="dark:text-white">Informations du contrat</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">Détails de votre bail KEURGUI IMMO</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Date de début", value: "01/01/2025" },
                    { label: "Date de fin", value: "31/12/2025" },
                    { label: "Durée", value: "12 mois" },
                    { label: "Préavis", value: "1 mois" },
                    { label: "Dépôt de garantie", value: "1100 €" },
                    { label: "Agence", value: "KEURGUI IMMO" },
                  ].map((item, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                      <div className="font-medium dark:text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">Renouvellement à venir</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Votre contrat expire dans 230 jours. Contactez KEURGUI IMMO pour discuter du renouvellement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Voir le contrat
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        KI
                      </div>
                      Contrat de bail KEURGUI IMMO
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Détails complets de votre contrat de location
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-96">
                    <div className="space-y-6 p-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                          KI
                        </div>
                        <h3 className="text-xl font-bold text-cyan-600">CONTRAT DE BAIL</h3>
                        <p className="text-gray-600 dark:text-gray-400">KEURGUI IMMO</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="font-medium text-cyan-600 mb-2">🏢 Bailleur</h4>
                          <p className="text-sm dark:text-white">KEURGUI IMMO SARL</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">123 Avenue Léopold Sédar Senghor</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Dakar, Sénégal</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <h4 className="font-medium text-cyan-600 mb-2">👤 Locataire</h4>
                          <p className="text-sm dark:text-white">Locataire</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Résidence Les Jardins</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Apt 203</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-cyan-600 mb-2">🏠 Description du bien</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {[
                            { label: "Type", value: "Studio" },
                            { label: "Surface", value: "35 m²" },
                            { label: "Étage", value: "2ème" },
                            { label: "Balcon", value: "5 m²" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">{item.label}:</span>
                              <span className="dark:text-white font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-cyan-600 mb-2">💰 Conditions financières</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {[
                            { label: "Loyer mensuel", value: "550,00 €" },
                            { label: "Charges", value: "50,00 €" },
                            { label: "Total mensuel", value: "600,00 €", highlight: true },
                            { label: "Dépôt de garantie", value: "1 100,00 €" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">{item.label}:</span>
                              <span
                                className={`font-medium ${item.highlight ? "text-cyan-600 font-bold" : "dark:text-white"}`}
                              >
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-cyan-600 mb-2">📅 Durée du bail</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {[
                            { label: "Date de début", value: "01/01/2025" },
                            { label: "Date de fin", value: "31/12/2025" },
                            { label: "Durée", value: "12 mois" },
                            { label: "Préavis", value: "1 mois" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">{item.label}:</span>
                              <span className="dark:text-white font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={downloadContract}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le contrat
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

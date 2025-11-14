"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/AdminCompotenants/ui/Card"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/AdminCompotenants/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/AdminCompotenants/ui/dialog"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/AdminCompotenants/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Switch } from "@/components/AdminCompotenants/ui/switch"
import { Separator } from "@/components/AdminCompotenants/ui/separator"
import {
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Euro,
  Filter,
  Download,
  Plus,
  Star,
  Gift,
  Shield,
  Bell,
  TrendingUp,
  PieChart,
  BarChart3,
  Wallet,
  Settings,
  Calculator,
  MessageSquare,
  Phone,
  Mail,
  Loader2,
  Target,
  Award,
  Coins,
  Send,
} from "lucide-react"

export default function TenantPaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentProgress, setPaymentProgress] = useState(0)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [autoPayEnabled, setAutoPayEnabled] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [splitPaymentEnabled, setSplitPaymentEnabled] = useState(false)
  const [selectedPayments, setSelectedPayments] = useState<number[]>([])
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [calculatorAmount, setCalculatorAmount] = useState("600")
  const [calculatorInstallments, setCalculatorInstallments] = useState("1")
  const [calculatorResult, setCalculatorResult] = useState({ amount: 600, installments: 1, fees: 0, cashback: 6 })
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("card")
  const [showSecurityDialog, setShowSecurityDialog] = useState(false)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [showAddMethodDialog, setShowAddMethodDialog] = useState(false)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Support", message: "Bonjour ! Comment puis-je vous aider avec vos paiements ?", time: "14:30" },
  ])

  const { toast } = useToast()

  // Données simulées
  const nextPayment = {
    amount: 600,
    dueDate: "05/06/2025",
    daysLeft: 12,
    type: "Loyer mensuel",
    reference: "PAY-2025-06-001",
  }

  const paymentHistory = [
    {
      id: 1,
      reference: "PAY-2025-05-001",
      period: "Mai 2025",
      amount: 600,
      dueDate: "05/05/2025",
      paidDate: "03/05/2025",
      status: "Payé",
      method: "Orange Money",
      late: false,
      cashback: 6,
    },
    {
      id: 2,
      reference: "PAY-2025-04-001",
      period: "Avril 2025",
      amount: 600,
      dueDate: "05/04/2025",
      paidDate: "02/04/2025",
      status: "Payé",
      method: "Carte bancaire",
      late: false,
      cashback: 6,
    },
    {
      id: 3,
      reference: "PAY-2025-03-001",
      period: "Mars 2025",
      amount: 600,
      dueDate: "05/03/2025",
      paidDate: "07/03/2025",
      status: "Payé",
      method: "Wave",
      late: true,
      cashback: 3,
    },
    {
      id: 4,
      reference: "PAY-2025-02-001",
      period: "Février 2025",
      amount: 600,
      dueDate: "05/02/2025",
      paidDate: "01/02/2025",
      status: "Payé",
      method: "Virement",
      late: false,
      cashback: 6,
    },
    {
      id: 5,
      reference: "PAY-2025-01-001",
      period: "Janvier 2025",
      amount: 600,
      dueDate: "05/01/2025",
      paidDate: "05/01/2025",
      status: "Payé",
      method: "Orange Money",
      late: false,
      cashback: 6,
    },
    {
      id: 6,
      reference: "PAY-2025-06-001",
      period: "Juin 2025",
      amount: 600,
      dueDate: "05/06/2025",
      paidDate: null,
      status: "À venir",
      method: null,
      late: false,
      cashback: 0,
    },
  ]

  const paymentMethods = [
    {
      id: "orange",
      name: "Orange Money",
      icon: "📱",
      color: "orange",
      cashback: 1,
      fees: 0,
      isDefault: false,
    },
    {
      id: "wave",
      name: "Wave",
      icon: "🌊",
      color: "blue",
      cashback: 1,
      fees: 0,
      isDefault: false,
    },
    {
      id: "card",
      name: "Carte bancaire",
      icon: "💳",
      color: "gray",
      cashback: 1,
      fees: 2,
      isDefault: true,
    },
    {
      id: "bank",
      name: "Virement bancaire",
      icon: "🏦",
      color: "green",
      cashback: 1,
      fees: 0,
      isDefault: false,
    },
  ]

  const statistics = {
    totalPaid: 3000,
    onTimePayments: 4,
    latePayments: 1,
    totalCashback: 27,
    averagePaymentTime: 2,
    nextDueAmount: 600,
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
        description: "Votre loyer a été payé avec succès. Cashback de 6€ ajouté !",
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

  const generateReceiptPDF = (payment: any) => {
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quittance de Loyer - ${payment.period}</title>
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
                ${payment.paidDate || new Date().toLocaleDateString("fr-FR")}
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
                        <span class="info-value">${payment.period}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Date de paiement:</span>
                        <span class="info-value">${payment.paidDate || new Date().toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Mode de paiement:</span>
                        <span class="info-value">${payment.method || "Paiement en ligne"}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Référence:</span>
                        <span class="info-value">${payment.reference}</span>
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
                    <span class="info-label">Cashback reçu:</span>
                    <span class="info-value">${payment.cashback},00 €</span>
                </div>
            </div>
            
            <div class="amount-section">
                <div class="total-amount">${payment.amount},00 €</div>
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
    a.download = `quittance-${payment.period.toLowerCase().replace(" ", "-")}-keurgui-immo.html`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "📄 Quittance téléchargée",
      description: `La quittance pour ${payment.period} a été téléchargée.`,
    })
  }

  const toggleAutoPayment = () => {
    setAutoPayEnabled(!autoPayEnabled)
    toast({
      title: autoPayEnabled ? "🔄 Paiement automatique désactivé" : "✅ Paiement automatique activé",
      description: autoPayEnabled
        ? "Vous devrez payer manuellement vos loyers."
        : "Vos loyers seront prélevés automatiquement.",
    })
  }

  const filteredPayments = paymentHistory.filter((payment) => {
    if (filterStatus !== "all" && payment.status.toLowerCase() !== filterStatus) return false
    if (filterPeriod !== "all") {
      const year = filterPeriod
      if (!payment.period.includes(year)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Mes paiements
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Gérez vos paiements de loyer et consultez votre historique
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="gap-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              >
                <Coins className="h-3 w-3" />
                {statistics.totalCashback}€ de cashback
              </Badge>
              <Badge
                variant="secondary"
                className="gap-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
              >
                <Target className="h-3 w-3" />
                {statistics.onTimePayments}/5 à temps
              </Badge>
            </div>
          </div>
        </div>

        {/* Cartes de résumé */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          {/* Prochain paiement */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70 col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg dark:text-white">Prochain paiement</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Échéance dans {nextPayment.daysLeft} jours
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                  <Clock className="h-3 w-3" />
                  <span>{nextPayment.dueDate}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {nextPayment.amount} €
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{nextPayment.type}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">Réf: {nextPayment.reference}</div>
                </div>
              </div>

              {paymentSuccess ? (
                <div className="rounded-xl border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-800 dark:text-green-400">Paiement réussi !</div>
                  <div className="text-sm text-green-600 dark:text-green-300">Cashback de 6€ ajouté</div>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="rounded-xl border bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 cursor-pointer hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900/30 dark:hover:to-blue-900/30 transition-all duration-300">
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
                  <DialogContent className="dark:bg-gray-800 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white flex items-center gap-2">
                        <Euro className="h-5 w-5 text-cyan-600" />
                        Paiement du loyer - {nextPayment.amount}€
                      </DialogTitle>
                      <DialogDescription className="dark:text-gray-400">
                        Choisissez votre mode de paiement pour régler votre loyer
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
                      <div className="space-y-6">
                        {/* Méthodes de paiement */}
                        <div className="grid grid-cols-2 gap-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                paymentMethod === method.id
                                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20"
                                  : "border-gray-200 dark:border-gray-600 hover:border-cyan-300"
                              }`}
                              onClick={() => setPaymentMethod(method.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{method.icon}</div>
                                <div>
                                  <div className="font-medium dark:text-white">{method.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {method.cashback}% cashback •{" "}
                                    {method.fees === 0 ? "Sans frais" : `${method.fees}€ de frais`}
                                  </div>
                                </div>
                              </div>
                              {method.isDefault && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                  Par défaut
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Champs spécifiques selon la méthode */}
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

                        {/* Options avancées */}
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium dark:text-white">Paiement fractionné</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Diviser en 2 paiements de 300€
                              </div>
                            </div>
                            <Switch checked={splitPaymentEnabled} onCheckedChange={setSplitPaymentEnabled} />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium dark:text-white">Paiement automatique</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Prélèvement automatique chaque mois
                              </div>
                            </div>
                            <Switch checked={autoPayEnabled} onCheckedChange={toggleAutoPayment} />
                          </div>
                        </div>

                        <Button
                          onClick={handlePayment}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                          disabled={isProcessingPayment}
                        >
                          <Euro className="mr-2 h-4 w-4" />
                          Payer {splitPaymentEnabled ? "300" : nextPayment.amount} €
                          {splitPaymentEnabled && " (1ère partie)"}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statistics.totalPaid}€</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total payé</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">Paiements à temps</span>
                  <span className="font-medium dark:text-white">{statistics.onTimePayments}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">Cashback total</span>
                  <span className="font-medium text-green-600">{statistics.totalCashback}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">Délai moyen</span>
                  <span className="font-medium dark:text-white">{statistics.averagePaymentTime} jours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Récompenses */}
          <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                <Gift className="h-5 w-5 text-cyan-600" />
                Récompenses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{statistics.totalCashback}€</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Cashback disponible</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="dark:text-gray-300">Niveau Gold</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span className="dark:text-gray-300">Locataire exemplaire</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Gift className="h-4 w-4 mr-2" />
                Utiliser le cashback
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="methods">Méthodes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="dark:text-white">Paiements récents</CardTitle>
                      <div className="flex gap-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="payé">Payés</SelectItem>
                            <SelectItem value="à venir">À venir</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPayments.slice(0, 5).map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-4 rounded-xl border dark:border-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`rounded-full p-3 ${
                                payment.status === "Payé"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/20"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/20"
                              }`}
                            >
                              {payment.status === "Payé" ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <Clock className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium dark:text-white">{payment.period}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {payment.paidDate ? `Payé le ${payment.paidDate}` : `Échéance: ${payment.dueDate}`}
                                {payment.method && ` • ${payment.method}`}
                              </div>
                              {payment.late && (
                                <Badge variant="destructive" className="text-xs mt-1">
                                  Paiement tardif
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium dark:text-white">{payment.amount}€</div>
                            {payment.cashback > 0 && (
                              <div className="text-xs text-green-600">+{payment.cashback}€ cashback</div>
                            )}
                            <div className="flex gap-1 mt-2">
                              {payment.status === "Payé" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1 text-xs"
                                  onClick={() => generateReceiptPDF(payment)}
                                >
                                  <Download className="h-3 w-3" />
                                  Quittance
                                </Button>
                              )}
                              {payment.status === "À venir" && (
                                <Button size="sm" className="h-8 text-xs">
                                  Payer
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Rappels et notifications */}
                <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Bell className="h-5 w-5 text-cyan-600" />
                      Rappels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium dark:text-white">Rappels automatiques</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">3 jours avant échéance</div>
                      </div>
                      <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium dark:text-white">Échéance proche</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Loyer de juin dans 12 jours</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <MessageSquare className="h-5 w-5 text-cyan-600" />
                      Support paiements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat en direct
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Chat avec le support</DialogTitle>
                          <DialogDescription>Assistance pour vos paiements</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700/50">
                            <div className="space-y-3">
                              {chatMessages.map((msg) => (
                                <div
                                  key={msg.id}
                                  className={`p-3 rounded-lg ${msg.sender === "Support" ? "bg-blue-100 dark:bg-blue-900/20" : "bg-cyan-100 dark:bg-cyan-900/20 ml-4"}`}
                                >
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {msg.sender} - {msg.time}
                                  </div>
                                  <div className="text-sm dark:text-white">{msg.message}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Tapez votre message..."
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && chatMessage.trim()) {
                                  const newMessage = {
                                    id: chatMessages.length + 1,
                                    sender: "Vous",
                                    message: chatMessage,
                                    time: new Date().toLocaleTimeString("fr-FR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }),
                                  }
                                  setChatMessages([...chatMessages, newMessage])
                                  setChatMessage("")
                                  toast({
                                    title: "📨 Message envoyé",
                                    description: "Le support vous répondra dans quelques instants.",
                                  })
                                }
                              }}
                            />
                            <Button
                              onClick={() => {
                                if (chatMessage.trim()) {
                                  const newMessage = {
                                    id: chatMessages.length + 1,
                                    sender: "Vous",
                                    message: chatMessage,
                                    time: new Date().toLocaleTimeString("fr-FR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }),
                                  }
                                  setChatMessages([...chatMessages, newMessage])
                                  setChatMessage("")
                                  toast({
                                    title: "📨 Message envoyé",
                                    description: "Le support vous répondra dans quelques instants.",
                                  })
                                }
                              }}
                              size="sm"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        window.open("tel:+221331234567")
                        toast({
                          title: "📞 Appel en cours",
                          description: "Connexion avec le support paiements...",
                        })
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler le support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        window.open(
                          "mailto:support-paiements@keurgui-immo.sn?subject=Assistance paiement&body=Bonjour, j'ai besoin d'aide concernant mes paiements.",
                        )
                        toast({
                          title: "📧 Email ouvert",
                          description: "Votre client email s'ouvre pour contacter le support.",
                        })
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer un email
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-white">Historique complet des paiements</CardTitle>
                  <div className="flex gap-2">
                    <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les années</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800/50">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                          <th className="px-4 py-3">Référence</th>
                          <th className="px-4 py-3">Période</th>
                          <th className="px-4 py-3">Montant</th>
                          <th className="px-4 py-3">Échéance</th>
                          <th className="px-4 py-3">Payé le</th>
                          <th className="px-4 py-3">Méthode</th>
                          <th className="px-4 py-3">Statut</th>
                          <th className="px-4 py-3">Cashback</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id} className="border-b dark:border-gray-600">
                            <td className="px-4 py-3">
                              <div className="font-medium dark:text-white">{payment.reference}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="dark:text-white">{payment.period}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium dark:text-white">{payment.amount}€</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="dark:text-white">{payment.dueDate}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="dark:text-white">
                                {payment.paidDate || "-"}
                                {payment.late && (
                                  <Badge variant="destructive" className="ml-2 text-xs">
                                    Retard
                                  </Badge>
                                )}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="dark:text-white">{payment.method || "-"}</span>
                            </td>
                            <td className="px-4 py-3">
                              {payment.status === "Payé" ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Payé
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                                  <Clock className="h-3 w-3 mr-1" />À venir
                                </Badge>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {payment.cashback > 0 && (
                                <span className="text-green-600 font-medium">+{payment.cashback}€</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                {payment.status === "Payé" ? (
                                  <Button variant="outline" size="sm" onClick={() => generateReceiptPDF(payment)}>
                                    <FileText className="mr-2 h-3 w-3" />
                                    Quittance
                                  </Button>
                                ) : (
                                  <Button size="sm">Payer</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Wallet className="h-5 w-5 text-cyan-600" />
                    Méthodes de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div>
                          <div className="font-medium dark:text-white">{method.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {method.cashback}% cashback •{" "}
                            {method.fees === 0 ? "Sans frais" : `${method.fees}€ de frais`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Par défaut
                          </Badge>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Paramètres - {method.name}</DialogTitle>
                              <DialogDescription>Gérer cette méthode de paiement</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="dark:text-white">Méthode par défaut</span>
                                <Switch checked={method.isDefault} />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="dark:text-white">Paiement automatique</span>
                                <Switch />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="dark:text-white">Notifications</span>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  Modifier
                                </Button>
                                <Button variant="destructive" className="flex-1">
                                  Supprimer
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                  <Dialog open={showAddMethodDialog} onOpenChange={setShowAddMethodDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une méthode
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
                        <DialogDescription>Configurez une nouvelle méthode de paiement</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Type de méthode</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Carte bancaire</SelectItem>
                              <SelectItem value="mobile">Portefeuille mobile</SelectItem>
                              <SelectItem value="bank">Compte bancaire</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Nom de la méthode</Label>
                          <Input placeholder="Ex: Ma carte Visa" />
                        </div>
                        <div>
                          <Label>Informations</Label>
                          <Input placeholder="Numéro ou identifiant" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => setShowAddMethodDialog(false)}>
                            Annuler
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={() => {
                              setShowAddMethodDialog(false)
                              toast({
                                title: "✅ Méthode ajoutée",
                                description: "Votre nouvelle méthode de paiement a été configurée.",
                              })
                            }}
                          >
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Calculator className="h-5 w-5 text-cyan-600" />
                    Calculateur de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="dark:text-white">Montant à payer</Label>
                    <Input
                      type="number"
                      placeholder="600"
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Nombre de versements</Label>
                    <Select value={calculatorInstallments} onValueChange={setCalculatorInstallments}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 versement</SelectItem>
                        <SelectItem value="2">2 versements</SelectItem>
                        <SelectItem value="3">3 versements</SelectItem>
                        <SelectItem value="4">4 versements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Résultat</div>
                    <div className="text-lg font-bold dark:text-white">
                      {calculatorResult.amount / calculatorResult.installments}€ × {calculatorResult.installments}{" "}
                      versement{calculatorResult.installments > 1 ? "s" : ""}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Frais: {calculatorResult.fees}€ • Cashback: {calculatorResult.cashback}€
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      const amount = Number.parseFloat(calculatorAmount) || 600
                      const installments = Number.parseInt(calculatorInstallments) || 1
                      const fees = installments > 1 ? installments * 2 : 0
                      const cashback = Math.floor(amount * 0.01)

                      setCalculatorResult({ amount, installments, fees, cashback })

                      toast({
                        title: "🧮 Calcul effectué",
                        description: `${amount / installments}€ par versement calculé avec succès.`,
                      })
                    }}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <BarChart3 className="h-5 w-5 text-cyan-600" />
                    Analyse des paiements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-2 h-32">
                      {[65, 80, 45, 90, 75, 85].map((height, index) => (
                        <div key={index} className="flex flex-col justify-end">
                          <div
                            className="bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t transition-all duration-1000 ease-out"
                            style={{ height: `${height}%` }}
                          />
                          <div className="text-xs text-center mt-1 dark:text-gray-400">
                            {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Évolution des paiements sur 6 mois</p>
                      <p className="text-lg font-medium dark:text-white">Tendance: +15% 📈</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <PieChart className="h-5 w-5 text-cyan-600" />
                    Répartition par méthode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-blue-500 to-green-500"></div>
                      <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold dark:text-white">5</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">paiements</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm dark:text-white">Orange Money</span>
                        </div>
                        <span className="text-sm font-medium dark:text-white">40%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm dark:text-white">Carte bancaire</span>
                        </div>
                        <span className="text-sm font-medium dark:text-white">40%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm dark:text-white">Wave</span>
                        </div>
                        <span className="text-sm font-medium dark:text-white">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Settings className="h-5 w-5 text-cyan-600" />
                    Préférences de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-white">Paiement automatique</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Prélèvement automatique chaque mois
                      </div>
                    </div>
                    <Switch checked={autoPayEnabled} onCheckedChange={toggleAutoPayment} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-white">Rappels par email</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Recevoir des rappels 3 jours avant</div>
                    </div>
                    <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-white">Notifications push</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Notifications sur mobile</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div>
                    <Label className="dark:text-white">Méthode de paiement par défaut</Label>
                    <Select value={defaultPaymentMethod} onValueChange={setDefaultPaymentMethod}>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Choisir une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.id} value={method.id}>
                            {method.icon} {method.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl bg-white/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Shield className="h-5 w-5 text-cyan-600" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-white">Authentification 2FA</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Sécurité renforcée pour les paiements
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium dark:text-white">Limite de paiement</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Montant maximum par transaction</div>
                    </div>
                    <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Configurer les limites</DialogTitle>
                          <DialogDescription>Définir les limites de paiement</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Limite par transaction</Label>
                            <Input type="number" placeholder="1000" />
                          </div>
                          <div>
                            <Label>Limite mensuelle</Label>
                            <Input type="number" placeholder="5000" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => setShowLimitDialog(false)}>
                              Annuler
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={() => {
                                setShowLimitDialog(false)
                                toast({
                                  title: "✅ Limites configurées",
                                  description: "Vos limites de paiement ont été mises à jour.",
                                })
                              }}
                            >
                              Sauvegarder
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Separator />
                  <div>
                    <Label className="dark:text-white">Historique des connexions</Label>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <div className="flex justify-between">
                          <span className="dark:text-white">Dernière connexion</span>
                          <span className="text-gray-500 dark:text-gray-400">Aujourd'hui, 14:30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Shield className="h-4 w-4 mr-2" />
                        Gérer la sécurité
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Paramètres de sécurité</DialogTitle>
                        <DialogDescription>Gérer la sécurité de vos paiements</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white">Authentification 2FA</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white">Notifications de sécurité</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white">Vérification par email</span>
                          <Switch />
                        </div>
                        <div>
                          <Label>Code PIN pour paiements</Label>
                          <Input type="password" placeholder="••••" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => setShowSecurityDialog(false)}>
                            Annuler
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={() => {
                              setShowSecurityDialog(false)
                              toast({
                                title: "🔒 Sécurité mise à jour",
                                description: "Vos paramètres de sécurité ont été sauvegardés.",
                              })
                            }}
                          >
                            Sauvegarder
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

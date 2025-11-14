import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Mail, Printer, Filter, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Quittance {
  id: string
  reference: string
  locataire: string
  periode: string
  montant: number
  dateGeneration: string
  statut: "Générée" | "En attente"
}

export default function ReceiptsPage() {
  const { toast } = useToast()
  const [quittances, setQuittances] = useState<Quittance[]>([
    {
      id: "1",
      reference: "QUIT-2024",
      locataire: "Locataire 1",
      periode: "01/01/2024 - 31/01/2024",
      montant: 81000,
      dateGeneration: "01/01/2024",
      statut: "Générée"
    },
    // ... autres quittances
  ])

  const handleDownload = async (quittance: Quittance) => {
    try {
      // Simuler le téléchargement de la quittance
      const blob = new Blob([`
        Quittance de loyer
        =================
        
        Référence: ${quittance.reference}
        Locataire: ${quittance.locataire}
        Période: ${quittance.periode}
        Montant: ${quittance.montant.toLocaleString()} FCFA
        Date de génération: ${quittance.dateGeneration}
        
        Statut: ${quittance.statut}
      `], { type: 'text/plain' });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quittance_${quittance.reference}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Téléchargement réussi",
        description: `La quittance ${quittance.reference} a été téléchargée`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la quittance",
        variant: "destructive",
      });
    }
  };

  const handlePrint = (quittance: Quittance) => {
    try {
      // Simuler l'impression
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Quittance ${quittance.reference}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .content { margin-bottom: 20px; }
                .footer { margin-top: 50px; text-align: center; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Quittance de loyer</h1>
                <h2>${quittance.reference}</h2>
              </div>
              <div class="content">
                <p><strong>Locataire:</strong> ${quittance.locataire}</p>
                <p><strong>Période:</strong> ${quittance.periode}</p>
                <p><strong>Montant:</strong> ${quittance.montant.toLocaleString()} FCFA</p>
              </div>
              <div class="footer">
                <p>Signature du propriétaire</p>
                <p>Date: ${quittance.dateGeneration}</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }

      toast({
        title: "Impression lancée",
        description: `La quittance ${quittance.reference} est en cours d'impression`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'imprimer la quittance",
        variant: "destructive",
      })
    }
  }

  const handleEmail = (quittance: Quittance) => {
    try {
      // Simuler l'envoi par email
      const emailSubject = `Quittance de loyer ${quittance.reference}`
      const emailBody = `
        Bonjour,
        
        Veuillez trouver ci-joint votre quittance de loyer pour la période ${quittance.periode}.
        
        Montant: ${quittance.montant.toLocaleString()} FCFA
        
        Cordialement,
        Votre agence immobilière
      `
      
      // Ouvrir le client mail par défaut
      window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

      toast({
        title: "Email préparé",
        description: `La quittance ${quittance.reference} est prête à être envoyée`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email",
        variant: "destructive",
      })
    }
  }

  const handleGenerateQuittances = () => {
    try {
      // Simuler la génération de quittances
      const newQuittance: Quittance = {
        id: (quittances.length + 1).toString(),
        reference: `QUIT-${2024 + quittances.length}`,
        locataire: `Locataire ${quittances.length + 1}`,
        periode: `01/${quittances.length + 1}/2024 - 31/${quittances.length + 1}/2024`,
        montant: 80000 + (quittances.length + 1) * 1000,
        dateGeneration: new Date().toLocaleDateString(),
        statut: "Générée"
      }

      setQuittances(prev => [...prev, newQuittance])

      toast({
        title: "Génération réussie",
        description: "Les quittances ont été générées avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les quittances",
        variant: "destructive",
      })
    }
  }

  return (
    <>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Quittances</h1>
              <p className="text-blue-600">Gestion des quittances de loyer</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => handleEmail(quittances[0])}
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer par email
              </Button>
              <Button 
                variant="outline" 
                className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => handlePrint(quittances[0])}
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button 
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleGenerateQuittances}
              >
                <Download className="mr-2 h-4 w-4" />
                Générer les quittances
              </Button>
            </div>
          </div>

          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <Input placeholder="Rechercher une quittance..." className="pl-10 h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <Button variant="outline" className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="rounded-md border border-blue-100 bg-blue-50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-100 text-left text-sm font-medium text-blue-700">
                  <th className="px-4 py-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2 h-4 w-4 rounded border-blue-300" />
                      Référence
                    </div>
                  </th>
                  <th className="px-4 py-3">Locataire</th>
                  <th className="px-4 py-3">Période</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Date de génération</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quittances.map((quittance) => (
                  <tr key={quittance.id} className="border-b border-blue-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2 h-4 w-4 rounded border-blue-300" />
                        <span>{quittance.reference}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{quittance.locataire}</td>
                    <td className="px-4 py-3">{quittance.periode}</td>
                    <td className="px-4 py-3">{quittance.montant.toLocaleString()} FCFA</td>
                    <td className="px-4 py-3">{quittance.dateGeneration}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        <span>{quittance.statut}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleDownload(quittance)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handlePrint(quittance)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleEmail(quittance)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

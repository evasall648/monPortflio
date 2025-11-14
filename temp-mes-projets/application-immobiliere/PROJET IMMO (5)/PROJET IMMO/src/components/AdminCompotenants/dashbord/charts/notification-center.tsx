import { Button } from "@/components/ui/button"
import { AlertCircle, CreditCard, FileText, Users } from "lucide-react"

export function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      title: "Paiements en attente",
      description: "12 paiements nécessitent une validation",
      time: "Il y a 2 heures",
      icon: CreditCard,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      id: 2,
      title: "Contrats à renouveler",
      description: "5 contrats expirent cette semaine",
      time: "Il y a 5 heures",
      icon: FileText,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      id: 3,
      title: "Maintenance urgente",
      description: "3 demandes de maintenance urgentes",
      time: "Il y a 1 jour",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      id: 4,
      title: "Nouveau locataire",
      description: "Un nouveau locataire a été ajouté",
      time: "Il y a 2 jours",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-100",
    },
  ]

  return (
    <div className="divide-y divide-slate-100">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-start gap-4 px-6 py-4">
          <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${notification.bg}`}>
            <notification.icon className={`h-5 w-5 ${notification.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-900">{notification.title}</h4>
              <span className="text-xs text-slate-500">{notification.time}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{notification.description}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700 text-xs">
                Voir détails
              </Button>
              <Button size="sm" variant="outline" className="h-8 border-slate-200 text-xs">
                Marquer comme lu
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

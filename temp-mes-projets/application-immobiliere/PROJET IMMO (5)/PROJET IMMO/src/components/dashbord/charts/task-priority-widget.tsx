import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, CreditCard, FileText, CheckCircle, ArrowRight } from "lucide-react"

export function TaskPriorityWidget() {
  const tasks = [
    {
      id: 1,
      title: "Valider les paiements en attente",
      description: "12 paiements nécessitent une validation manuelle",
      deadline: "Aujourd'hui",
      icon: CreditCard,
      priority: "high",
    },
    {
      id: 2,
      title: "Renouveler les contrats",
      description: "5 contrats expirent cette semaine",
      deadline: "Dans 2 jours",
      icon: FileText,
      priority: "high",
    },
    {
      id: 3,
      title: "Approuver les demandes de maintenance",
      description: "8 demandes en attente d'approbation",
      deadline: "Dans 3 jours",
      icon: AlertCircle,
      priority: "medium",
    },
  ]

  return (
    <div className="divide-y divide-slate-100">
      {tasks.map((task) => (
        <div key={task.id} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-900">{task.title}</h4>
            <Badge
              className={`${task.priority === "high" ? "bg-red-100 text-red-800 border-0" : "bg-amber-100 text-amber-800 border-0"}`}
            >
              {task.priority === "high" ? "Urgent" : "Important"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">{task.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>Échéance: {task.deadline}</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs border-slate-200">
              <CheckCircle className="h-3 w-3" />
              Marquer comme terminé
            </Button>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center p-4">
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-indigo-600">
          Voir toutes les tâches
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

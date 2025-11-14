import React from 'react';
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { AlertCircle, CreditCard, FileText, Shield, Building2, Users, Calendar, CheckCircle, Bell } from "lucide-react"

export function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      title: "Paiements en retard",
      description: "27 locataires ont des paiements en retard de plus de 5 jours",
      time: "Il y a 2 heures",
      icon: CreditCard,
      priority: "high",
      read: false,
    },
    {
      id: 2,
      title: "Contrats expirant",
      description: "15 contrats expirent dans les 30 prochains jours",
      time: "Il y a 4 heures",
      icon: FileText,
      priority: "medium",
      read: false,
    },
    {
      id: 3,
      title: "Maintenance urgente",
      description: "8 demandes de maintenance urgentes en attente",
      time: "Il y a 6 heures",
      icon: AlertCircle,
      priority: "high",
      read: false,
    },
    {
      id: 4,
      title: "Alerte de sécurité",
      description: "3 tentatives d'accès non autorisées détectées",
      time: "Il y a 12 heures",
      icon: Shield,
      priority: "high",
      read: true,
    },
    {
      id: 5,
      title: "Nouvelle agence",
      description: "L'agence de Nantes a été ajoutée au système",
      time: "Hier",
      icon: Building2,
      priority: "low",
      read: true,
    },
    {
      id: 6,
      title: "Nouveaux utilisateurs",
      description: "5 nouveaux agents ont été créés",
      time: "Hier",
      icon: Users,
      priority: "low",
      read: true,
    },
    {
      id: 7,
      title: "Rapport mensuel",
      description: "Le rapport de performance d'avril est disponible",
      time: "Il y a 2 jours",
      icon: Calendar,
      priority: "medium",
      read: true,
    },
  ]

  return (
    <div className="divide-y">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 px-6 py-4 ${notification.read ? "" : "bg-sky-50"}`}
        >
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
              notification.priority === "high"
                ? "bg-red-100 text-red-700"
                : notification.priority === "medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-sky-100 text-sky-700"
            }`}
          >
            <notification.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{notification.title}</h4>
              {!notification.read && (
                <Badge variant="outline" className="gap-1 border-sky-200 bg-sky-50 text-sky-700">
                  <Bell className="h-3 w-3" />
                  Nouveau
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">{notification.time}</span>
              <div className="flex gap-2">
                {!notification.read && (
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                    <CheckCircle className="h-3 w-3" />
                    Marquer comme lu
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Voir
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

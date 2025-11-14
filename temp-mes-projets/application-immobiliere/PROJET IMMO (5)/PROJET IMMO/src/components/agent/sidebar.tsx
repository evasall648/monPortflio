"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Building2,
  Home,
  Users,
  FileText,
  CreditCard,
  Receipt,
  DollarSign,
  FolderOpen,
  MessageSquare,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  userRole?: string;
}

const Sidebar = ({ userRole = 'agent' }: SidebarProps) => {
  const location = useLocation()
  const pathname = location.pathname

  const agentLinks = [
    { name: "Tableau de bord", href: "/agent", icon: BarChart3 },
    { name: "Bâtiments", href: "/agent/buildings", icon: Building2 },
    { name: "Appartements", href: "/agent/apartments", icon: Home },
    { name: "Locataires", href: "/agent/tenants", icon: Users },
    { name: "Contrats", href: "/agent/contracts", icon: FileText },
    { name: "Paiements", href: "/agent/payments", icon: CreditCard },
    { name: "Quittances", href: "/agent/receipts", icon: Receipt },
    { name: "Dépenses", href: "/agent/expenses", icon: DollarSign },
    { name: "Documents", href: "/agent/documents", icon: FolderOpen },
    { name: "Messagerie", href: "/agent/messages", icon: MessageSquare },
  ]

  const links = userRole === 'admin' ? [...agentLinks, { name: 'Administration', href: '/admin', icon: Building2 }] : agentLinks

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">GIMMO</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-blue-50",
                  pathname === link.href ? "bg-blue-50 text-blue-700" : "text-gray-500",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition-all hover:bg-blue-50"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Link>
      </div>
    </div>
  )
}

export { Sidebar }
export default Sidebar

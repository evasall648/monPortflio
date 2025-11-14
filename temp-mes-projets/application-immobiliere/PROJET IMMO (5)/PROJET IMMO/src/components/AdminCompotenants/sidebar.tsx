"use client"

import type React from "react"

import { Link, useLocation } from "react-router-dom"
import {
  Building2,
  Home,
  Users,
  FileText,
  CreditCard,
  Receipt,
  LogOut,
  DollarSign,
  PieChart,
  Building,
  FolderOpen,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type UserRole = 'admin' | 'agent' | 'tenant'

interface NavLink {
  name: string
  href: string
  icon: React.ElementType
  group?: string | null
}

interface SidebarProps {
  userRole: UserRole
  mobileMenuOpen?: boolean
  onNavigate?: () => void
}

export function Sidebar({ userRole, mobileMenuOpen = false, onNavigate }: SidebarProps) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    gestion: true,
    finance: true,
    documents: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const adminLinks: NavLink[] = [
    { name: "Tableau de bord", href: "/admin", icon: BarChart3 },
    { name: "Utilisateurs", href: "/admin/users", icon: Users },
    { name: "Agences", href: "/admin/agencies", icon: Building },
    { name: "Rapports", href: "/admin/rapports", icon: PieChart },
    { name: "Support", href: "/admin/support", icon: HelpCircle },
  ]

  const agentLinks: NavLink[] = [
    { name: "Tableau de bord", href: "/agent", icon: BarChart3, group: null },
    { name: "Bâtiments", href: "/agent/buildings", icon: Building2, group: "gestion" },
    { name: "Locataires", href: "/agent/tenants", icon: Users, group: "gestion" },
    { name: "Contrats", href: "/agent/contracts", icon: FileText, group: "gestion" },
    { name: "Paiements", href: "/agent/payments", icon: CreditCard, group: "finance" },
    { name: "Quittances", href: "/agent/receipts", icon: Receipt, group: "finance" },
    { name: "Dépenses", href: "/agent/expenses", icon: DollarSign, group: "finance" },
    { name: "Documents", href: "/agent/documents", icon: FolderOpen, group: "documents" },
  ]

  const tenantLinks: NavLink[] = [
    { name: "Tableau de bord", href: "/tenant", icon: BarChart3 },
    { name: "Mon logement", href: "/tenant/apartment", icon: Home },
    { name: "Mes paiements", href: "/tenant/payments", icon: CreditCard },
  ]

  const links = userRole === "admin" ? adminLinks : userRole === "agent" ? agentLinks : tenantLinks

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  // Grouper les liens pour l'interface agent
  const groupedLinks = {
    main: links.filter((link) => !link.group || link.group === null),
    gestion: userRole === "agent" ? links.filter((link) => link.group === "gestion") : [],
    finance: userRole === "agent" ? links.filter((link) => link.group === "finance") : [],
    documents: userRole === "agent" ? links.filter((link) => link.group === "documents") : []
  }

  return (
    <>
      {/* Sidebar pour mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent
          userRole={userRole}
          links={links}
          groupedLinks={groupedLinks}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          isActive={isActive}
          handleNavigation={handleNavigation}
        />
      </div>

      {/* Sidebar pour desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:border-r lg:bg-background">
        <SidebarContent
          userRole={userRole}
          links={links}
          groupedLinks={groupedLinks}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
          isActive={isActive}
          handleNavigation={handleNavigation}
        />
      </div>
    </>
  )
}

interface SidebarContentProps {
  userRole: UserRole
  links: NavLink[]
  groupedLinks: Record<string, NavLink[]>
  openGroups: Record<string, boolean>
  toggleGroup: (group: string) => void
  isActive: (path: string) => boolean
  handleNavigation: () => void
}

function SidebarContent({
  userRole,
  links,
  groupedLinks,
  openGroups,
  toggleGroup,
  isActive,
  handleNavigation,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link to={`/${userRole}`} className="flex items-center gap-2" onClick={handleNavigation}>
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary-foreground/20 flex items-center justify-center text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Keurgui Immo
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {userRole === "agent" ? (
            <>
              {/* Liens principaux */}
              {groupedLinks.main.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  name={link.name}
                  active={isActive(link.href)}
                  onClick={handleNavigation}
                />
              ))}

              {/* Groupe Gestion */}
              <div className="mt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => toggleGroup("gestion")}
                >
                  <span>Gestion</span>
                  {openGroups.gestion ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {openGroups.gestion && (
                  <div className="mt-1 space-y-1 pl-3">
                    {groupedLinks.gestion.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                        name={link.name}
                        active={isActive(link.href)}
                        onClick={handleNavigation}
                        nested
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Groupe Finance */}
              <div className="mt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => toggleGroup("finance")}
                >
                  <span>Finance</span>
                  {openGroups.finance ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {openGroups.finance && (
                  <div className="mt-1 space-y-1 pl-3">
                    {groupedLinks.finance.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                        name={link.name}
                        active={isActive(link.href)}
                        onClick={handleNavigation}
                        nested
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Groupe Documents */}
              <div className="mt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => toggleGroup("documents")}
                >
                  <span>Documents</span>
                  {openGroups.documents ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {openGroups.documents && (
                  <div className="mt-1 space-y-1 pl-3">
                    {groupedLinks.documents.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        icon={link.icon}
                        name={link.name}
                        active={isActive(link.href)}
                        onClick={handleNavigation}
                        nested
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            // Liens pour admin et tenant (sans groupes)
            links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                name={link.name}
                active={isActive(link.href)}
                onClick={handleNavigation}
              />
            ))
          )}
        </nav>
      </div>

      {/* Déconnexion */}
      <div className="border-t p-4">
        <Link
          to="/login"
          onClick={handleNavigation}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </Link>
      </div>
    </div>
  )
}

interface NavLinkProps {
  href: string
  icon: React.ElementType
  name: string
  active: boolean
  onClick: () => void
  nested?: boolean
}

function NavLink({ href, icon: Icon, name, active, onClick, nested = false }: NavLinkProps) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        nested && "pl-9",
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
      <span>{name}</span>
      {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></div>}
    </Link>
  )
}

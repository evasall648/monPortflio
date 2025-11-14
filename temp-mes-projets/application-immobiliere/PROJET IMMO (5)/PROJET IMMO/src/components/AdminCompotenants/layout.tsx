"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { useTheme } from "./theme-provider"
import { useLocation } from "react-router-dom"
import { Building2 } from "lucide-react"

type LayoutProps = {
  children: ReactNode
  userRole: "admin" | "agent" | "tenant"
  showSidebar?: boolean
}

export function Layout({ children, userRole, showSidebar = true }: LayoutProps) {
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  // Désactiver le défilement quand le menu mobile est ouvert
  useEffect(() => {
    if (typeof window === "undefined") return

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  // Appliquer le thème
  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.add("light")
    }
  }, [theme])

  if (!showSidebar) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 text-white transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${theme === 'dark' ? 'bg-gray-800 border-r border-gray-700' : 'bg-gradient-to-b from-blue-600 to-blue-700'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 flex items-center justify-center border-b border-blue-500/20 h-16 flex-shrink-0">
            <Building2 className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Keurgui Immo</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar userRole={userRole} onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64 transition-spacing duration-300">
        {/* En-tête */}
        <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10 h-16 flex-shrink-0 w-full">
          <div className="h-full px-6 w-full">
            <div className="h-full flex items-center justify-between w-full">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden text-muted-foreground hover:text-primary p-2 rounded-full hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">Ouvrir le menu</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex justify-end">
                <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-auto bg-muted/50">
          <div className="h-full p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <div className="min-h-full bg-card rounded-lg shadow-sm border border-border overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

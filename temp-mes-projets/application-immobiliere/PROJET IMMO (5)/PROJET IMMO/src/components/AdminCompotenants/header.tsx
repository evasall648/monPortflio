"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import { Moon, Sun, User, LogOut, ChevronDown, Menu, Bell, Settings } from "lucide-react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/AdminCompotenants/ui/dropdown-menu"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type HeaderProps = {
  onMenuToggle?: () => void
  className?: string
}

export function Header({ onMenuToggle, className = "" }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [scrolled, setScrolled] = useState(false)

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-background"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Bouton menu mobile */}
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Titre de la page - visible uniquement sur desktop */}
          <h1 className="hidden text-xl font-semibold text-foreground md:block">Tableau de bord</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium">Notifications</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  Marquer comme lu
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Nouveau locataire</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Un nouveau locataire a été ajouté à l'appartement A102
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Il y a 30 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Paiement reçu</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Le paiement du loyer de mai a été reçu pour l'appartement B205
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Il y a 2 heures</p>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Voir toutes les notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bouton thème */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground"
            aria-label="Changer de thème"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Menu utilisateur */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-full pl-1 pr-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photo_url ? `http://localhost/PROJET%20IMMO/backend/${user.photo_url}` : "/avatar.png"} alt="Avatar" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user ? `${user.prenom[0]}${user.nom[0]}` : "AD"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{user ? `${user.prenom} ${user.nom}` : "Admin"}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.photo_url ? `http://localhost/PROJET%20IMMO/backend/${user.photo_url}` : "/avatar.png"} alt="Avatar" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user ? `${user.prenom[0]}${user.nom[0]}` : "AD"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user ? `${user.prenom} ${user.nom}` : "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user ? user.email : "admin@keurgui-immo.com"}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setProfileOpen(true)}>
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modale profil utilisateur */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mon profil</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user?.photo_url ? `http://localhost/PROJET%20IMMO/backend/${user.photo_url}` : "/avatar.png"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user ? `${user.prenom[0]}${user.nom[0]}` : "AD"}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center mt-2">{user ? `${user.prenom} ${user.nom}` : "Admin"}</h2>
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Téléphone</span>
                <span className="text-sm font-medium">{user?.telephone || '-'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rôle</span>
                <span className="text-sm font-medium capitalize">{user?.role?.toLowerCase() || '-'}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

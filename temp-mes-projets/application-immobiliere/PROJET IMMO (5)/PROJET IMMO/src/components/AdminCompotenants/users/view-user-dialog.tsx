import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/AdminCompotenants/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"
import { Mail, Phone, Calendar, User as UserIcon } from "lucide-react"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Badge } from "@/components/AdminCompotenants/ui/Badge"
import { Separator } from "@/components/AdminCompotenants/ui/separator"

type UserRole = "ADMIN" | "AGENT" | "LOCATAIRE"
type UserGender = "HOMME" | "FEMME"
type UserStatus = "ACTIF" | "INACTIF" | "SUSPENDU"

interface User {
  id: number
  nom: string
  prenom: string
  email: string
  role: UserRole
  telephone: string
  genre: UserGender
  statut: UserStatus
  photo?: string
  dateCreation?: string
}

interface ViewUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Utilitaire pour couleurs selon le rôle
function getRoleColor(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return {
        badge: "bg-red-500 text-white border-red-500",
        avatar: "bg-red-500 text-white",
        light: "bg-red-100 text-red-700",
      }
    case "AGENT":
      return {
        badge: "bg-blue-500 text-white border-blue-500",
        avatar: "bg-blue-500 text-white",
        light: "bg-blue-100 text-blue-700",
      }
    case "LOCATAIRE":
      return {
        badge: "bg-green-500 text-white border-green-500",
        avatar: "bg-green-500 text-white",
        light: "bg-green-100 text-green-700",
      }
    default:
      return {
        badge: "bg-gray-500 text-white border-gray-500",
        avatar: "bg-gray-500 text-white",
        light: "bg-gray-100 text-gray-700",
      }
  }
}

// Fonction pour formater le nom humain des rôles
function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "Administrateur";
    case "AGENT":
      return "Agent";
    case "LOCATAIRE":
      return "Locataire";
    default:
      return role;
  }
}

// Fonction pour formater le genre
function getGenderLabel(genre: UserGender): string {
  return genre === "HOMME" ? "Homme" : "Femme";
}

// Fonction pour formater le statut avec couleurs
function getStatusData(status: UserStatus) {
  switch (status) {
    case "ACTIF":
      return {
        label: "Actif",
        className: "bg-green-100 text-green-800 border-green-300",
      };
    case "INACTIF":
      return {
        label: "Inactif",
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
    case "SUSPENDU":
      return {
        label: "Suspendu",
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
  }
}

export function ViewUserDialog({ user, open, onOpenChange }: ViewUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <div className={`w-full h-24 rounded-t-lg mb-14 relative ${getRoleColor(user.role).light}`}>
            <Avatar className="h-24 w-24 absolute -bottom-12 left-1/2 transform -translate-x-1/2 ring-4 ring-background">
              <AvatarImage src={user.photo || undefined} />
              <AvatarFallback className={`text-2xl ${getRoleColor(user.role).avatar}`}>
                {user.prenom[0]}
                {user.nom[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <h2 className="text-2xl font-bold text-center mt-2">
            {user.prenom} {user.nom}
          </h2>
          
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={getRoleColor(user.role).badge}>
              {getRoleLabel(user.role)}
            </Badge>
            <Badge variant="outline" className={getStatusData(user.statut).className}>
              {getStatusData(user.statut).label}
            </Badge>
          </div>

          <div className="w-full mt-6 space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{user.email}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Téléphone</div>
                <div>{user.telephone}</div>
              </div>
            </div>

            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Genre</div>
                <div>{getGenderLabel(user.genre)}</div>
              </div>
            </div>

            {user.dateCreation && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Date de création</div>
                  <div>{user.dateCreation}</div>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center">
              <div className="text-sm text-muted-foreground">ID Utilisateur</div>
              <Badge variant="outline" className="ml-2">
                USR-{user.id.toString().padStart(4, "0")}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

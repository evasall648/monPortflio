"use client"
import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/AdminCompotenants/ui/dialog"
import {
  DialogTitle,
  DialogDescription
} from "@/components/AdminCompotenants/ui/dialog";
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"
import { AlertTriangle } from "lucide-react"

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
}

interface DeleteUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmDelete: () => void
}

// Utilitaire pour couleurs selon le rôle
function getRoleColor(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return {
        avatar: "bg-red-500 text-white"
      }
    case "AGENT":
      return {
        avatar: "bg-gray-200 text-gray-800"
      }
    case "LOCATAIRE":
      return {
        avatar: "bg-black text-white"
      }
    default:
      return {
        badge: "bg-gray-500 text-white border-gray-500",
        avatar: "bg-gray-300 text-gray-800"
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

export function DeleteUserDialog({ user, open, onOpenChange, onConfirmDelete }: DeleteUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-2" />
          <DialogTitle className="text-xl text-destructive">Supprimer l'utilisateur</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action ne peut pas être annulée.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src={user.photo || undefined} alt={`${user.prenom} ${user.nom}`} />
            <AvatarFallback className={`text-xl ${getRoleColor(user.role).avatar}`}>
              {user.prenom[0]}
              {user.nom[0]}
            </AvatarFallback>
          </Avatar>
          <div className="font-semibold text-lg mb-1">
            {user.prenom} {user.nom}
          </div>
          <div className="text-muted-foreground text-sm mb-1">{user.email}</div>
          <div className="text-xs text-muted-foreground">
            ID: USR-{user.id.toString().padStart(4, "0")}
          </div>
          <p className="mt-4 text-center text-sm text-amber-600 font-medium">
            Toutes les données associées à cet utilisateur seront définitivement supprimées.
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onConfirmDelete}
          >
            Supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/AdminCompotenants/ui/dialog"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"

type UserRole = "ADMIN" | "AGENT" | "LOCATAIRE"
type UserGender = "HOMME" | "FEMME"

interface User {
  nom: string
  prenom: string
  email: string
  role: UserRole
  telephone: string
  genre: UserGender
  statut: string
  photo?: string
}

interface AddUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddUser: (user: User) => void
}

// Fonction utilitaire pour les couleurs selon le rôle
function getRoleColor(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return {
        badge: "bg-red-500 text-white border-red-500",
        avatar: "bg-red-500 text-white"
      }
    case "AGENT":
      return {
        badge: "bg-blue-500 text-white border-blue-500",
        avatar: "bg-blue-500 text-white"
      }
    case "LOCATAIRE":
      return {
        badge: "bg-green-500 text-white border-green-500",
        avatar: "bg-green-500 text-white"
      }
    default:
      return {
        badge: "bg-gray-500 text-white border-gray-500",
        avatar: "bg-gray-500 text-white"
      }
  }
}

export function AddUserDialog({ open, onOpenChange, onAddUser }: AddUserDialogProps) {
  const [formData, setFormData] = useState<User>({
    nom: "",
    prenom: "",
    email: "",
    role: "AGENT",
    telephone: "",
    genre: "HOMME",
    statut: "ACTIF",
    photo: "",
  })

  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPhotoPreview(result)
      setFormData({ ...formData, photo: result })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddUser(formData)
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      role: "AGENT",
      telephone: "",
      genre: "HOMME",
      statut: "ACTIF",
      photo: "",
    })
    setPhotoPreview(null)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Ajouter un utilisateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center col-span-1">
                <Avatar className={`h-32 w-32 mb-4 ${photoPreview ? "" : getRoleColor(formData.role).avatar}`}>
                  <AvatarImage src={photoPreview || undefined} />
                  <AvatarFallback className={`text-2xl ${getRoleColor(formData.role).avatar}`}>
                    {formData.prenom && formData.nom ? formData.prenom[0] + formData.nom[0] : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center w-full">
                  <Label htmlFor="photo" className="mb-2">
                    Photo de profil
                  </Label>
                  <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Formats acceptés: JPG, PNG. Max 2MB.
                  </p>
                </div>
              </div>
              <div className="space-y-4 col-span-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, telephone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Administrateur</SelectItem>
                        <SelectItem value="AGENT">Agent</SelectItem>
                        <SelectItem value="LOCATAIRE">Locataire</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(formData.role).badge}`}>
                      {getRoleLabel(formData.role)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value: UserGender) => setFormData({ ...formData, genre: value })}
                    >
                      <SelectTrigger id="genre">
                        <SelectValue placeholder="Sélectionner un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOMME">Homme</SelectItem>
                        <SelectItem value="FEMME">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 p-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
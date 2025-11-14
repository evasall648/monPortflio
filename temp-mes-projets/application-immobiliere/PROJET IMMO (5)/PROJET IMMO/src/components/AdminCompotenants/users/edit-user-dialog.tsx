import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/AdminCompotenants/ui/dialog"
import { Button } from "@/components/AdminCompotenants/ui/button"
import { Input } from "@/components/AdminCompotenants/ui/input"
import { Label } from "@/components/AdminCompotenants/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/AdminCompotenants/ui/Select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar"

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

interface EditUserDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateUser: (user: User) => void
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

export function EditUserDialog({ user, open, onOpenChange, onUpdateUser }: EditUserDialogProps) {
  const [formData, setFormData] = useState<User>(user)
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(user.photo)

  // Mettre à jour les données du formulaire lorsque l'utilisateur change
  useEffect(() => {
    setFormData(user)
    setPhotoPreview(user.photo)
  }, [user])

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
    onUpdateUser(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Modifier l'utilisateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center col-span-1">
                <Avatar className={`h-32 w-32 mb-4 ${photoPreview ? "" : getRoleColor(formData.role).avatar}`}>
                  <AvatarImage src={photoPreview || undefined} />
                  <AvatarFallback className={`text-2xl ${getRoleColor(formData.role).avatar}`}>
                    {formData.prenom[0]}
                    {formData.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center w-full">
                  <Label htmlFor="photo-edit" className="mb-2">
                    Modifier la photo de profil
                  </Label>
                  <Input id="photo-edit" type="file" accept="image/*" onChange={handlePhotoChange} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Formats acceptés: JPG, PNG. Max 2MB.
                  </p>
                </div>
              </div>
              <div className="space-y-4 col-span-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom-edit">Prénom</Label>
                    <Input
                      id="prenom-edit"
                      value={formData.prenom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom-edit">Nom</Label>
                    <Input
                      id="nom-edit"
                      value={formData.nom}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-edit">Email</Label>
                  <Input
                    id="email-edit"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone-edit">Téléphone</Label>
                  <Input
                    id="telephone-edit"
                    value={formData.telephone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, telephone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-edit">Rôle</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger id="role-edit">
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
                    <Label htmlFor="genre-edit">Genre</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value: UserGender) => setFormData({ ...formData, genre: value })}
                    >
                      <SelectTrigger id="genre-edit">
                        <SelectValue placeholder="Sélectionner un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOMME">Homme</SelectItem>
                        <SelectItem value="FEMME">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select
                    value={formData.statut}
                    onValueChange={(value) => setFormData({ ...formData, statut: value as UserStatus })}
                  >
                    <SelectTrigger id="statut">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIF">Actif</SelectItem>
                      <SelectItem value="INACTIF">Inactif</SelectItem>
                      <SelectItem value="SUSPENDU">Suspendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="px-6 py-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer les modifications</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

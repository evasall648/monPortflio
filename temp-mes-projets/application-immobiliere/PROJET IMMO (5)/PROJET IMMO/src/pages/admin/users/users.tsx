import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, Pencil, Trash2, Plus, FileText, Search, 
  Grid, List, User as UserIcon, Building  
} from "lucide-react";
import { Button } from "@/components/AdminCompotenants/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/AdminCompotenants/ui/avatar";
import { Badge } from "@/components/AdminCompotenants/ui/Badge"; 
import { Input } from "@/components/AdminCompotenants/ui/input";
import { Card, CardContent } from "@/components/AdminCompotenants/ui/Card";
import { toast } from "sonner";
import { AddUserDialog } from "@/components/AdminCompotenants/users/add-user-dialog";
import { ViewUserDialog } from "@/components/AdminCompotenants/users/view-user-dialog";
import { EditUserDialog } from "@/components/AdminCompotenants/users/edit-user-dialog";
import { DeleteUserDialog } from "@/components/AdminCompotenants/users/delete-user-dialog";

// Types basés sur le schéma de base de données
type UserRole = "ADMIN" | "AGENT" | "LOCATAIRE";
type UserGender = "HOMME" | "FEMME";
type UserStatus = "ACTIF" | "INACTIF" | "SUSPENDU";

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  telephone: string;
  genre: UserGender;
  statut: UserStatus;
  photo?: string;
  dateCreation?: string;
}

// Fonction utilitaire pour les couleurs selon le rôle
function getRoleColor(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return {
        badge: "bg-red-500 text-white border-red-500",
        avatar: "bg-red-500 text-white",
        light: "bg-red-100 text-red-700",
      };
    case "AGENT":
      return {
        badge: "bg-blue-500 text-white border-blue-500",
        avatar: "bg-blue-500 text-white",
        light: "bg-blue-100 text-blue-700",
      };
    case "LOCATAIRE":
      return {
        badge: "bg-green-500 text-white border-green-500",
        avatar: "bg-green-500 text-white",
        light: "bg-green-100 text-green-700",
      };
    default:
      return {
        badge: "bg-gray-500 text-white border-gray-500",
        avatar: "bg-gray-500 text-white",
        light: "bg-gray-100 text-gray-700",
      };
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

const Users = () => {
  const navigate = useNavigate();
  
  // État pour les utilisateurs (données fictives basées sur le schéma)
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nom: "Doe",
      prenom: "John",
      email: "john.doe@email.com",
      role: "ADMIN",
      telephone: "0600000000",
      genre: "HOMME",
      statut: "ACTIF",
      photo: "",
      dateCreation: "2023-01-15",
    },
    {
      id: 2,
      nom: "Smith",
      prenom: "Anna",
      email: "anna.smith@email.com",
      role: "AGENT",
      telephone: "0700000000",
      genre: "FEMME",
      statut: "ACTIF",
      photo: "",
      dateCreation: "2023-02-10",
    },
    {
      id: 3,
      nom: "Dubois",
      prenom: "Marie",
      email: "marie.dubois@email.com",
      role: "LOCATAIRE",
      telephone: "0611111111",
      genre: "FEMME",
      statut: "ACTIF",
      photo: "",
      dateCreation: "2023-03-05",
    },
    {
      id: 4,
      nom: "Martin",
      prenom: "Pierre",
      email: "pierre.martin@email.com",
      role: "AGENT",
      telephone: "0622222222",
      genre: "HOMME",
      statut: "INACTIF",
      photo: "",
      dateCreation: "2023-04-20",
    },
    {
      id: 5,
      nom: "Bernard",
      prenom: "Sophie",
      email: "sophie.bernard@email.com",
      role: "LOCATAIRE",
      telephone: "0633333333",
      genre: "FEMME",
      statut: "SUSPENDU",
      photo: "",
      dateCreation: "2023-05-15",
    },
  ]);

  // États pour les dialogues
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    return (
      user.nom.toLowerCase().includes(q) ||
      user.prenom.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.telephone.toLowerCase().includes(q)
    );
  });

  // Gestionnaire pour afficher les détails d'un utilisateur
  const handleViewUser = (user: User) => {
    if (user) {
      setSelectedUser(user);
      setViewDialogOpen(true);
    }
  };

  // Gestionnaire pour modifier un utilisateur
  const handleEditUser = (user: User) => {
    if (user) {
      setSelectedUser(user);
      setEditDialogOpen(true);
    }
  };

  // Gestionnaire pour supprimer un utilisateur
  const handleDeleteUser = (user: User) => {
    if (user) {
      setSelectedUser(user);
      setDeleteDialogOpen(true);
    }
  };

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    const user: User = {
      ...newUser,
      id: newId,
      dateCreation: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, user]);
    setAddDialogOpen(false);
    toast.success("Utilisateur ajouté avec succès", {
      description: `${user.prenom} ${user.nom} (${getRoleLabel(user.role)})`,
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditDialogOpen(false);
    toast.success("Utilisateur mis à jour avec succès", {
      description: `${updatedUser.prenom} ${updatedUser.nom} (${getRoleLabel(updatedUser.role)})`,
    });
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      toast.success("Utilisateur supprimé avec succès", {
        description: `${selectedUser.prenom} ${selectedUser.nom} a été supprimé`,
      });
    }
  };

  // Fonction pour générer des statistiques sur les utilisateurs
  const getUserStats = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.statut === "ACTIF").length;
    const roleDistribution = {
      ADMIN: users.filter((user) => user.role === "ADMIN").length,
      AGENT: users.filter((user) => user.role === "AGENT").length,
      LOCATAIRE: users.filter((user) => user.role === "LOCATAIRE").length,
    };

    return { totalUsers, activeUsers, roleDistribution };
  };

  const stats = getUserStats();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* En-tête */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
              <p className="text-muted-foreground mt-1">Gérez les utilisateurs et leurs rôles dans le système</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter un utilisateur
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Exporter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Total utilisateurs
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeUsers} actifs ({Math.round((stats.activeUsers / stats.totalUsers) * 100)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.roleDistribution.ADMIN}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Administrateurs
              </p>
              <div className="flex items-center">
                <Badge variant="outline" className={`${getRoleColor("ADMIN").badge} mt-1`}>
                  {getRoleLabel("ADMIN")}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.roleDistribution.AGENT}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Agents
              </p>
              <div className="flex items-center">
                <Badge variant="outline" className={`${getRoleColor("AGENT").badge} mt-1`}>
                  {getRoleLabel("AGENT")}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.roleDistribution.LOCATAIRE}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Locataires
              </p>
              <div className="flex items-center">
                <Badge variant="outline" className={`${getRoleColor("LOCATAIRE").badge} mt-1`}>
                  {getRoleLabel("LOCATAIRE")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/users")}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Utilisateurs</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-muted-foreground"
                  onClick={() => navigate("/properties")}
                >
                  <Building className="h-4 w-4" />
                  <span>Biens immobiliers</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et contrôles */}
      <div className="container mx-auto px-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>

              <div className="flex">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-l-none border-l-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affichage des utilisateurs */}
      <div className="container mx-auto px-4 mt-4 pb-10">
        {viewMode === "list" ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-3 text-left font-medium">Photo</th>
                    <th className="px-4 py-3 text-left font-medium">Nom</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Téléphone</th>
                    <th className="px-4 py-3 text-left font-medium">Rôle</th>
                    <th className="px-4 py-3 text-left font-medium">Genre</th>
                    <th className="px-4 py-3 text-left font-medium">Statut</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.photo || undefined} alt={`${user.prenom} ${user.nom}`} />
                          <AvatarFallback className={`text-xl ${getRoleColor(user.role).avatar}`}>
                            {user.prenom[0]}
                            {user.nom[0]}
                          </AvatarFallback>
                        </Avatar>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {user.prenom} {user.nom}
                      </td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.telephone}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={getRoleColor(user.role).badge}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{getGenderLabel(user.genre)}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={getStatusData(user.statut).className}>
                          {getStatusData(user.statut).label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewUser(user)}
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditUser(user)}
                            className="h-8 w-8 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                            title="Modifier"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user)}
                            className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun utilisateur trouvé.
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <div className={`h-2 ${getRoleColor(user.role).avatar}`}></div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4 ring-2">
                      <AvatarImage src={user.photo || undefined} alt={`${user.prenom} ${user.nom}`} />
                      <AvatarFallback className={`text-xl ${getRoleColor(user.role).avatar}`}>
                        {user.prenom[0]}
                        {user.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold mb-1">
                      {user.prenom} {user.nom}
                    </h3>
                    <Badge variant="outline" className={`mb-3 ${getRoleColor(user.role).badge}`}>
                      {getRoleLabel(user.role)}
                    </Badge>
                    <div className="text-sm text-muted-foreground mb-1">{user.email}</div>
                    <div className="text-sm text-muted-foreground mb-3">{user.telephone}</div>
                    <Badge variant="outline" className={getStatusData(user.statut).className}>
                      {getStatusData(user.statut).label}
                    </Badge>
                    <div className="flex mt-4 gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewUser(user)}
                        className={`h-8 w-8 ${getRoleColor(user.role).light}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        className="h-8 w-8 bg-yellow-100 text-yellow-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user)}
                        className="h-8 w-8 bg-red-100 text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredUsers.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Aucun utilisateur trouvé.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dialogues */}
      <AddUserDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onAddUser={handleAddUser} />
      {selectedUser && (
        <>
          <ViewUserDialog
            user={selectedUser}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />
          <EditUserDialog
            user={selectedUser}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onUpdateUser={handleUpdateUser}
          />
          <DeleteUserDialog
            user={selectedUser}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirmDelete={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};

export default Users;

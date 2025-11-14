import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Download,
  Filter,
  Upload,
  FolderPlus,
  Eye,
  Trash2,
  FileImage,
  FileArchive,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface DocumentItem {
  id: string;
  nom: string;
  type: string;
  taille: string;
  dateAjout: string;
  categorie: string;
}

const DocumentsPage: React.FC = () => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "1",
      nom: "Contrat de location",
      type: "PDF",
      taille: "2.5 MB",
      dateAjout: "2024-03-15",
      categorie: "Contrats"
    },
    {
      id: "2",
      nom: "Photo appartement",
      type: "JPG",
      taille: "1.8 MB",
      dateAjout: "2024-03-14",
      categorie: "Photos"
    },
    {
      id: "3",
      nom: "Facture électricité",
      type: "PDF",
      taille: "0.5 MB",
      dateAjout: "2024-03-13",
      categorie: "Factures"
    }
  ])
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newDocuments: DocumentItem[] = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      nom: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      taille: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      dateAjout: new Date().toISOString().split('T')[0],
      categorie: getCategoryFromType(file.name.split('.').pop() || '')
    }));

    setDocuments(prev => [...prev, ...newDocuments])
    toast({
      title: "Import réussi",
      description: `${files.length} document(s) importé(s) avec succès`,
    })
  }



  const getCategoryFromType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'pdf': 'Documents',
      'doc': 'Documents',
      'docx': 'Documents',
      'jpg': 'Photos',
      'jpeg': 'Photos',
      'png': 'Photos',
      'zip': 'Archives',
      'rar': 'Archives'
    }
    return typeMap[type.toLowerCase()] || 'Autres'
  }

  const handleDownload = (doc: DocumentItem) => {
    try {
      // Vérifier si on est dans un environnement navigateur
      if (typeof window === 'undefined') return;
      
      // Créer un contenu plus détaillé pour le document
      const content = `
        Document: ${doc.nom}
        Type: ${doc.type}
        Taille: ${doc.taille}
        Date d'ajout: ${doc.dateAjout}
        Catégorie: ${doc.categorie}
        
        Contenu du document:
        -------------------
        Ceci est le contenu du document ${doc.nom}.
        Il s'agit d'un document de type ${doc.type} dans la catégorie ${doc.categorie}.
        Le document a été ajouté le ${doc.dateAjout}.
      `

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.nom;
      
      // Vérifier si document.body existe avant d'utiliser appendChild
      if (document.body) {
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      toast({
        title: "Téléchargement réussi",
        description: `Le document ${doc.nom} a été téléchargé`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le document",
        variant: "destructive",
      })
    }
  }

  const handleView = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setShowViewDialog(true);
  }

  const handleDeleteClick = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setShowDeleteDialog(true);
  }

  const confirmDelete = () => {
    if (selectedDocument) {
      setDocuments(prev => prev.filter(doc => doc.id !== selectedDocument.id))
      toast({
        title: "Suppression réussie",
        description: `Le document ${selectedDocument.nom} a été supprimé`,
      })
      setShowDeleteDialog(false)
      setSelectedDocument(null)
    }
  }

  const handleCreateFolder = () => {
    const folderName = prompt("Nom du nouveau dossier:")
    if (folderName) {
      toast({
        title: "Dossier créé",
        description: `Le dossier "${folderName}" a été créé`,
      })
    }
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4" />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="h-4 w-4" />
      case 'zip':
      case 'rar':
        return <FileArchive className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Documents</h1>
            <p className="text-blue-600">Gérez vos documents et fichiers</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={handleCreateFolder}
            >
                <FolderPlus className="mr-2 h-4 w-4" />
                Nouveau dossier
              </Button>
              <Button 
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleImport}
              >
                <Upload className="mr-2 h-4 w-4" />
                Importer
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
          </div>
        </div>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <Input placeholder="Rechercher un document..." className="pl-10 h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
            <Button variant="outline" className="h-12 border-blue-200 text-blue-600 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="rounded-md border border-blue-100 bg-blue-50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100 bg-blue-100 text-left text-sm font-medium text-blue-700">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Taille</th>
                  <th className="px-4 py-3">Date d'ajout</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id} className="border-b border-blue-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getFileIcon(document.type)}
                        <span>{document.nom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{document.type}</td>
                    <td className="px-4 py-3">{document.taille}</td>
                    <td className="px-4 py-3">{document.dateAjout}</td>
                    <td className="px-4 py-3">{document.categorie}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleView(document)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleDownload(document)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-600 text-white hover:bg-red-700"
                          onClick={() => handleDeleteClick(document)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dialog de visualisation */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedDocument && getFileIcon(selectedDocument.type)}
                  <span>Détails du document</span>
                </DialogTitle>
              </DialogHeader>
              {selectedDocument && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-500">Nom</h3>
                      <p>{selectedDocument.nom}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Type</h3>
                      <p>{selectedDocument.type}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Taille</h3>
                      <p>{selectedDocument.taille}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Date d'ajout</h3>
                      <p>{selectedDocument.dateAjout}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Catégorie</h3>
                      <p>{selectedDocument.categorie}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-500 mb-2">Aperçu</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>Contenu du document {selectedDocument.nom}</p>
                      <p>Type: {selectedDocument.type}</p>
                      <p>Catégorie: {selectedDocument.categorie}</p>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowViewDialog(false)}
                >
                  Fermer
                </Button>
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    if (selectedDocument) {
                      handleDownload(selectedDocument)
                    }
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog de confirmation de suppression */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer le document "{selectedDocument?.nom}" ? 
                  Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDeleteDialog(false)
                    setSelectedDocument(null)
                  }}
                >
                  Annuler
                </Button>
                <Button 
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DocumentsPage
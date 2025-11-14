import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "@/config/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: number
  expediteur_id: number
  destinataire_id: number
  sujet: string
  contenu: string
  date_envoi: string
  lu: boolean
  expediteur_nom: string
  expediteur_prenom: string
  destinataire_nom: string
  destinataire_prenom: string
}

export default function Messagerie() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    destinataire_id: "",
    sujet: "",
    contenu: ""
  })
  const { toast } = useToast()

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.messages)
      if (!response.ok) throw new Error("Erreur lors de la récupération des messages")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 30000) // Rafraîchir toutes les 30 secondes
    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(API_ENDPOINTS.auth.messages, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })

      if (!response.ok) throw new Error("Erreur lors de l'envoi du message")

      setNewMessage({ destinataire_id: "", sujet: "", contenu: "" })
      setDialogOpen(false)
      fetchMessages()
      toast({
        title: "Succès",
        description: "Message envoyé avec succès"
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      })
    }
  }

  const markAsRead = async (messageId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.auth.messages}?id=${messageId}`, {
        method: "PUT",
      })

      if (!response.ok) throw new Error("Erreur lors du marquage du message")

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, lu: true } : msg
      ))
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de marquer le message comme lu",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Nouveau message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau message</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Destinataire ID</label>
                <Input
                  type="number"
                  value={newMessage.destinataire_id}
                  onChange={(e) => setNewMessage({ ...newMessage, destinataire_id: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sujet</label>
                <Input
                  value={newMessage.sujet}
                  onChange={(e) => setNewMessage({ ...newMessage, sujet: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  value={newMessage.contenu}
                  onChange={(e) => setNewMessage({ ...newMessage, contenu: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Envoyer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`${!message.lu ? 'border-blue-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{message.sujet}</span>
                  {!message.lu && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Non lu
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    De: {message.expediteur_prenom} {message.expediteur_nom}
                  </p>
                  <p className="text-sm text-gray-500">
                    À: {message.destinataire_prenom} {message.destinataire_nom}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(message.date_envoi).toLocaleString('fr-FR')}
                  </p>
                  <p className="mt-2">{message.contenu}</p>
                </div>
                {!message.lu && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => markAsRead(message.id)}
                  >
                    Marquer comme lu
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 
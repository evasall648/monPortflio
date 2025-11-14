import { useAuth } from "@/hooks/useAuth"
import Messagerie from '@/components/messaging/Messagerie'

export default function AgentMessagesPage() {
  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
        <p className="text-gray-500">Communiquez avec les administrateurs et les locataires</p>
      </div>
      <Messagerie />
    </div>
  )
} 
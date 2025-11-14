import { Outlet } from "react-router-dom"
import AgentSidebar from "./sidebar"

export function AgentLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AgentSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AgentLayout

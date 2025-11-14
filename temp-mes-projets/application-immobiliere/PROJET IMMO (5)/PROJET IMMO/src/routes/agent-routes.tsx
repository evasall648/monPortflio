import { RouteObject } from "react-router-dom"
import AgentLayout from "@/components/agent/layout"
import DashboardPage from "@/pages/agent/dashboard"
import BuildingsPage from "@/pages/agent/buildings"
import ApartmentsPage from "@/pages/agent/apartments/Apartment"
import ContractsPage from "@/pages/agent/contracts"
import TenantsPage from "@/pages/agent/tenants"
import PaymentsPage from "@/pages/agent/payments"
import ReceiptsPage from "@/pages/agent/receipts"
import DocumentsPage from "@/pages/agent/documents"
import ReportsPage from "@/pages/agent/reports"
import ExpensesPage from "@/pages/agent/expenses"
import MessagesPage from "@/pages/agent/messages"

export const agentRoutes: RouteObject[] = [
  {
    path: "/agent",
    element: <AgentLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "buildings", element: <BuildingsPage /> },
      { path: "buildings/:id", element: <BuildingsPage /> },
      { path: "apartments", element: <ApartmentsPage /> },
      { path: "apartments/:id", element: <ApartmentsPage /> },
      { path: "contracts", element: <ContractsPage /> },
      { path: "contracts/new", element: <ContractsPage /> },
      { path: "contracts/:id", element: <ContractsPage /> },
      { path: "tenants", element: <TenantsPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "receipts", element: <ReceiptsPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "messages", element: <MessagesPage /> },
    ],
  },
]
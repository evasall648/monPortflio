import type React from "react"
import { Navigate, useRoutes, RouteObject } from "react-router-dom"
import { Toaster } from "./components/AdminCompotenants/ui/toaster"
import { Layout } from "./components/AdminCompotenants/layout"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

// Admin routes
import AdminDashboard from "./pages/admin/dashbord/dashboard"
import AdminUsers from "./pages/admin/users/users"
import AdminAgencies from "./pages/admin/agencies/agencies"
import AdminRapports from "./pages/admin/rapports/Rapports"
import Support from "./pages/admin/support/Support"

// Agent routes
import { agentRoutes } from "./routes/agent-routes"

// Tenant routes
import TenantDashboard from "./pages/tenant/dashboard"
import TenantApartment from "./pages/tenant/apartment"
import TenantPayments from "./pages/tenant/payments"

// Auth routes
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import ForgotPassword from "./pages/auth/ForgotPassword"

// Layout wrapper components
const AdminLayout = ({ children }: { children: React.ReactNode }) => <Layout userRole="admin">{children}</Layout>

const TenantLayout = ({ children }: { children: React.ReactNode }) => <Layout userRole="tenant">{children}</Layout>

function App() {
  // Configuration des routes
  const routesConfig: RouteObject[] = [
    // Routes d'authentification (publiques)
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },

    // Routes admin (protégées)
    {
      path: "/admin",
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/agencies",
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout>
            <AdminAgencies />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/rapports",
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout>
            <AdminRapports />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/support",
      element: (
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout>
            <Support />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    
    // Routes agent (protégées)
    ...agentRoutes.map(route => ({
      ...route,
      element: (
        <ProtectedRoute allowedRoles={['AGENT']}>
          {route.element}
        </ProtectedRoute>
      ),
    })),
    
    // Routes locataire (protégées)
    {
      path: "/tenant",
      element: (
        <ProtectedRoute allowedRoles={['LOCATAIRE']}>
          <TenantLayout>
            <TenantDashboard />
          </TenantLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/tenant/apartment",
      element: (
        <ProtectedRoute allowedRoles={['LOCATAIRE']}>
          <TenantLayout>
            <TenantApartment />
          </TenantLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/tenant/payments",
      element: (
        <ProtectedRoute allowedRoles={['LOCATAIRE']}>
          <TenantLayout>
            <TenantPayments />
          </TenantLayout>
        </ProtectedRoute>
      ),
    },
    
    // Redirection par défaut
    { path: "/", element: <Navigate to="/login" replace /> },
    // Redirection pour compatibilité
    { path: "*", element: <Navigate to="/login" replace /> },
  ]
  
  const routes = useRoutes(routesConfig)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      {routes}
    </div>
  )
}

export default App

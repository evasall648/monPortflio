"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Building2, User, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Link } from "react-router-dom"
import loginGif from "@/assets/Apartment_transparent_clean.gif"
import backgroundImage from "@/assets/immeuble.jpg"
// Supprimez l'import de useTheme
// import { useTheme } from "@/contexts/ThemeContext"
import { useAuth } from "@/hooks/useAuth"
import { API_ENDPOINTS } from "@/config/api"

const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'AGENT' | 'LOCATAIRE' | null>(null)
  // Supprimez la variable darkMode
  // const { darkMode } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      alert("Veuillez sélectionner un rôle")
      return
    }
    setIsLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Stocker les informations de l'utilisateur et le token
        login(data.user, data.token)
        
        // Attendre un court instant pour s'assurer que le state est mis à jour
        setTimeout(() => {
          // Redirection selon le rôle
          switch (data.user.role) {
            case 'ADMIN':
              window.location.href = "/admin"
              break
            case 'AGENT':
              window.location.href = "/agent"
              break
            case 'LOCATAIRE':
              window.location.href = "/tenant"
              break
            default:
              throw new Error("Rôle non reconnu")
          }
        }, 100)
      } else {
        throw new Error(data.message || "Erreur de connexion")
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      alert(error instanceof Error ? error.message : "Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Redirection vers le dashboard de l'agent après connexion Google
    window.location.href = "/agent/dashboard"
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative p-2 sm:p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay avec effet de flou */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Conteneur principal */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl min-h-[500px] lg:min-h-[660px]">
        {/* Colonne de gauche - Illustration */}
        <div className="flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-600 to-blue-700">
          {/* Éléments décoratifs */}
          <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white/30 rounded-lg rotate-12 animate-pulse"></div>
          <div className="absolute top-12 right-8 w-6 h-6 border-2 border-white/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-8 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-700"></div>

          {/* Illustration */}
          <div className="relative z-10 w-full max-w-[200px] lg:max-w-none">
            <div className="relative">
              <img
                src={loginGif}
                alt="Gestion Immobilière"
                className="w-full h-auto drop-shadow-xl rounded-xl"
              />
              {/* Overlay pour effet */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  mixBlendMode: "screen",
                  opacity: 0.2,
                }}
              ></div>
            </div>

            {/* Texte compact */}
            <div className="mt-4 text-center text-white">
              <h2 className="text-lg lg:text-xl font-bold mb-2 drop-shadow-lg">Gestion Immobilière</h2>
              <p className="text-blue-100 text-sm lg:text-base drop-shadow-md">Simplifiez votre gestion locative</p>
            </div>
          </div>

          {/* Icônes flottantes réduites */}
          <div className="absolute top-1/4 left-8 animate-bounce delay-300">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Lock className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
          </div>
          <div className="absolute bottom-1/4 right-8 animate-bounce delay-700">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Building2 className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="w-full flex items-center justify-center p-4 sm:p-6 bg-gray-50">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-7 h-9 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h1>
              <p className="text-gray-600 text-sm">Accédez à votre espace de gestion</p>
            </div>

            {/* Ajouter les boutons de rôle avant le formulaire */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={selectedRole === 'ADMIN' ? "default" : "outline"}
                  onClick={() => setSelectedRole('ADMIN')}
                  className={`w-full h-10 ${selectedRole === 'ADMIN' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Admin
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === 'AGENT' ? "default" : "outline"}
                  onClick={() => setSelectedRole('AGENT')}
                  className={`w-full h-10 ${selectedRole === 'AGENT' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Agent
                </Button>
                <Button
                  type="button"
                  variant={selectedRole === 'LOCATAIRE' ? "default" : "outline"}
                  onClick={() => setSelectedRole('LOCATAIRE')}
                  className={`w-full h-10 ${selectedRole === 'LOCATAIRE' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Locataire
                </Button>
              </div>
            </div>

            {/* Connexion Google */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-10 mb-4 border-2 border-gray-200 hover:border-gray-300 rounded-lg text-sm"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </Button>

            {/* Séparateur */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-gray-50 text-gray-500">ou</span>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@gmail.com"
                    className="pl-9 h-10 border border-gray-200 focus:border-blue-500 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-xs font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 pr-9 h-10 border border-gray-200 focus:border-blue-500 rounded-lg text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-left">
                <Link
                  to="/forgotpassword"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                Vous n'avez pas de compte ?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

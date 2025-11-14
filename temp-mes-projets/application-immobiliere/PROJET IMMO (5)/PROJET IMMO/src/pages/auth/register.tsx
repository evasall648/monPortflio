"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Building2, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import backgroundImage from "@/assets/immeuble.jpg"
import registerGif from "@/assets/Sign up (1).gif"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    genre: "HOMME",
    password: "",
    confirmPassword: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    if (!acceptTerms) {
      alert("Veuillez accepter les conditions")
      return
    }
    if (!formData.role) {
      alert("Veuillez sélectionner un rôle")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/auth/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          telephone: formData.telephone,
          genre: formData.genre
        })
      })

      const data = await response.json()

      if (data.success) {
        alert("Compte créé avec succès !")
        window.location.href = "/login"
      } else {
        throw new Error(data.message || "Erreur lors de l'inscription")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay avec effet de flou */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl min-h-[660px]">
        {/* Section gauche - Illustration */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="relative z-10 w-full max-w-xs text-center">
            <div className="relative mb-4">
              <img
                src={registerGif}
                alt="Inscription"
                className="w-full h-auto drop-shadow-xl rounded-xl"
              />
            </div>
            <h2 className="text-lg font-bold mb-2 text-white drop-shadow-lg">Rejoignez-nous</h2>
            <p className="text-blue-100 text-sm drop-shadow-md">Créez votre compte en quelques clics</p>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="flex items-center justify-center p-6 bg-gray-50">
          <div className="w-full max-w-sm">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">Créer un compte</h1>
              <p className="text-gray-600 text-xs">Rejoignez ImmoGest</p>
            </div>

            {/* Google */}
            <Button
              type="button"
              onClick={() => (window.location.href = "/dashboard")}
              variant="outline"
              className="w-full h-8 mb-3 border border-gray-200 rounded-lg text-xs"
            >
              <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24">
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
              Google
            </Button>

            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gray-50 text-gray-500">ou</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    placeholder="Nom"
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    placeholder="Prénom"
                    className="h-8 text-xs"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email"
                  className="pl-7 h-8 text-xs"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange("telephone", e.target.value)}
                  placeholder="Téléphone"
                  className="pl-7 h-8 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="AGENT">Agent</SelectItem>
                      <SelectItem value="LOCATAIRE">Locataire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) => handleInputChange("genre", value)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HOMME">Homme</SelectItem>
                      <SelectItem value="FEMME">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative">
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Mot de passe"
                  className="pl-7 pr-7 h-8 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  className="pl-7 pr-7 h-8 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked: boolean | "indeterminate") => setAcceptTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                    conditions
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full h-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-xs"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                    Création...
                  </div>
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </form>

            <div className="mt-3 text-center space-y-2">
              <p className="text-xs text-gray-600">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Se connecter
                </Link>
              </p>
              <Link
                to="/"
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

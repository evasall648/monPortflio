"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import backgroundImage from "@/assets/immeuble.jpg"
import forgotPasswordGif from "@/assets/forgot.gif"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler l'envoi d'un email
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
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
                src={forgotPasswordGif}
                alt="Mot de passe oublié"
                className="w-full h-auto drop-shadow-xl rounded-xl"
              />
            </div>
            <h2 className="text-lg font-bold mb-2 text-white drop-shadow-lg">Mot de passe oublié ?</h2>
            <p className="text-blue-100 text-sm drop-shadow-md">
              Pas de panique ! Nous vous aiderons à récupérer votre compte
            </p>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="flex items-center justify-center p-6 bg-gray-50">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Réinitialisation</h1>
              <p className="text-gray-600 text-sm">
                Entrez votre email pour recevoir les instructions
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="pl-9 h-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-sm"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Envoi...
                    </div>
                  ) : (
                    "Envoyer les instructions"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Email envoyé !</h3>
                <p className="text-gray-600 text-sm">
                  Vérifiez votre boîte de réception pour les instructions de réinitialisation
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

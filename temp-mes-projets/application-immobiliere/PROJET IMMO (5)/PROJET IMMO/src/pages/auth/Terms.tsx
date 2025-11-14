"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Conditions d'utilisation</CardTitle>
            <Link to="/register">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">1. Acceptation des conditions</h3>
            <p className="text-gray-600 mb-4">
              En accédant et en utilisant ImmoGest, vous acceptez d'être lié par les présentes conditions d'utilisation.
            </p>

            <h3 className="text-lg font-semibold mb-2">2. Utilisation du service</h3>
            <p className="text-gray-600 mb-4">
              ImmoGest est une plateforme de gestion immobilière destinée aux professionnels et particuliers.
              Vous vous engagez à utiliser le service conformément aux lois en vigueur.
            </p>

            <h3 className="text-lg font-semibold mb-2">3. Protection des données</h3>
            <p className="text-gray-600 mb-4">
              Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité
              et au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <h3 className="text-lg font-semibold mb-2">4. Responsabilités</h3>
            <p className="text-gray-600 mb-4">
              Vous êtes responsable de la confidentialité de votre compte et de toutes les actions effectuées
              sous votre identifiant.
            </p>

            <h3 className="text-lg font-semibold mb-2">5. Modifications</h3>
            <p className="text-gray-600">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
              prendront effet dès leur publication sur la plateforme.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
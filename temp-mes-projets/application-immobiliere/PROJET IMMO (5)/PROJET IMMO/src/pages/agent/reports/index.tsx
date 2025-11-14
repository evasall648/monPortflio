import { Sidebar } from "@/components/agent/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Download,
  FileText,
  PieChart,
  TrendingUp,
  Building2,
  Users,
  CreditCard,
  DollarSign,
  Calendar,
  Filter,
} from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole="agent" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
              <p className="text-gray-500">Analyses et statistiques</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Période: Mai 2025
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenus locatifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24 500 €</div>
                <p className="text-xs text-muted-foreground">+2% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de recouvrement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90%</div>
                <p className="text-xs text-muted-foreground">-2% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rentabilité moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.8%</div>
                <p className="text-xs text-muted-foreground">Stable par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Évolution des revenus</CardTitle>
                <BarChart3 className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Graphique des revenus mensuels</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Répartition des appartements</CardTitle>
                <PieChart className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="flex h-60 items-center justify-center">
                  <PieChart className="h-40 w-40 text-gray-300" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Occupés</span>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Disponibles</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">En rénovation</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Performance par bâtiment</CardTitle>
                <TrendingUp className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{`Résidence ${i % 2 === 0 ? "Les Jardins" : "Le Parc"} ${i}`}</div>
                          <div className="text-sm font-medium">{`${80 + i * 5}%`}</div>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                          <div className="h-2 rounded-full bg-sky-500" style={{ width: `${80 + i * 5}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Rapports disponibles</CardTitle>
                <FileText className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Rapport financier mensuel",
                      icon: DollarSign,
                      date: "01/05/2025",
                      color: "bg-green-100 text-green-700",
                    },
                    {
                      title: "Rapport d'occupation",
                      icon: Users,
                      date: "01/05/2025",
                      color: "bg-sky-100 text-sky-700",
                    },
                    {
                      title: "Rapport des paiements",
                      icon: CreditCard,
                      date: "01/05/2025",
                      color: "bg-amber-100 text-amber-700",
                    },
                    {
                      title: "Rapport des dépenses",
                      icon: DollarSign,
                      date: "01/05/2025",
                      color: "bg-red-100 text-red-700",
                    },
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${report.color}`}>
                          <report.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-gray-500">{`Généré le ${report.date}`}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

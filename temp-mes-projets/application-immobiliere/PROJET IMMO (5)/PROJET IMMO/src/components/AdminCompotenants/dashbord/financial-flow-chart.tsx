import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const revenueData = [
  { name: 'Jan', loyers: 35000, charges: 5000, revenusDivers: 3000 },
  { name: 'Fév', loyers: 40000, charges: 5500, revenusDivers: 3200 },
  { name: 'Mar', loyers: 38000, charges: 6000, revenusDivers: 3500 },
  { name: 'Avr', loyers: 42000, charges: 5200, revenusDivers: 4000 },
  { name: 'Mai', loyers: 45000, charges: 5800, revenusDivers: 3800 },
];

const expenseData = [
  { name: 'Catégorie', maintenance: 30, personnel: 25, marketing: 10, administration: 15, taxes: 20 },
];

export function FinancialFlowChart() {
  // Calcul du total des revenus et dépenses
  const totalRevenus = revenueData[revenueData.length - 1].loyers + 
                       revenueData[revenueData.length - 1].charges + 
                       revenueData[revenueData.length - 1].revenusDivers;
  
  const totalDepenses = expenseData[0].maintenance + 
                       expenseData[0].personnel + 
                       expenseData[0].marketing + 
                       expenseData[0].administration + 
                       expenseData[0].taxes;
  
  const profitNet = totalRevenus - totalDepenses * 1000; // Conversion en milliers

  return (
    <div className="h-full w-full space-y-6">
      {/* Section Revenus */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Revenus mensuels (€)</h3>
        <div className="h-64 w-full rounded-lg border border-border bg-card p-4 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                formatter={(value) => [`${value} K€`, '']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Legend 
                wrapperStyle={{
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="loyers" fill="hsl(var(--primary))" name="Loyers" />
              <Bar dataKey="charges" fill="hsl(var(--primary) / 0.8)" name="Charges" />
              <Bar dataKey="revenusDivers" fill="hsl(var(--primary) / 0.6)" name="Revenus divers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section Dépenses */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Répartition des dépenses (en milliers d'€)</h3>
        <div className="h-64 w-full rounded-lg border bg-white p-4 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} K€`, '']} />
              <Legend />
              <Bar dataKey="maintenance" fill="#F59E0B" name="Maintenance" />
              <Bar dataKey="personnel" fill="#F97316" name="Personnel" />
              <Bar dataKey="marketing" fill="#EC4899" name="Marketing" />
              <Bar dataKey="administration" fill="#8B5CF6" name="Administration" />
              <Bar dataKey="taxes" fill="#EF4444" name="Taxes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bilan financier */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-green-800">Total Revenus</h4>
          <p className="text-2xl font-bold text-green-600">{totalRevenus.toLocaleString()} €</p>
          <p className="text-xs text-green-600">+12% vs mois dernier</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-red-800">Total Dépenses</h4>
          <p className="text-2xl font-bold text-red-600">{(totalDepenses * 1000).toLocaleString()} €</p>
          <p className="text-xs text-red-600">+5% vs mois dernier</p>
        </div>
        <div className={`rounded-lg p-4 shadow-sm ${profitNet >= 0 ? 'bg-blue-50' : 'bg-amber-50'}`}>
          <h4 className="text-sm font-medium ${profitNet >= 0 ? 'text-blue-800' : 'text-amber-800'}">Profit Net</h4>
          <p className={`text-2xl font-bold ${profitNet >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
            {profitNet.toLocaleString()} €
          </p>
          <p className={`text-xs ${profitNet >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
            {profitNet >= 0 ? '+7% vs mois dernier' : '-3% vs mois dernier'}
          </p>
        </div>
      </div>
    </div>
  );
}

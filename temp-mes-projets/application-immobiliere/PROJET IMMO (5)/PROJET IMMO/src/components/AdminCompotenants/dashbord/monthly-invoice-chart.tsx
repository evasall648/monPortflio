"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type TooltipProps,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts"
import { useState } from "react"

// Données pour différentes périodes
const dataByPeriod = {
  may: [
    { jour: "1", factures: 42, montant: 12.6, name: "1" },
    { jour: "5", factures: 28, montant: 8.4, name: "5" },
    { jour: "10", factures: 35, montant: 10.5, name: "10" },
    { jour: "15", factures: 49, montant: 14.7, name: "15" },
    { jour: "20", factures: 22, montant: 6.6, name: "20" },
    { jour: "25", factures: 38, montant: 11.4, name: "25" },
    { jour: "30", factures: 43, montant: 12.9, name: "30" },
  ],
  apr: [
    { jour: "1", factures: 39, montant: 11.7, name: "1" },
    { jour: "5", factures: 25, montant: 7.5, name: "5" },
    { jour: "10", factures: 32, montant: 9.6, name: "10" },
    { jour: "15", factures: 45, montant: 13.5, name: "15" },
    { jour: "20", factures: 20, montant: 6.0, name: "20" },
    { jour: "25", factures: 35, montant: 10.5, name: "25" },
    { jour: "30", factures: 40, montant: 12.0, name: "30" },
  ],
  mar: [
    { jour: "1", factures: 40, montant: 12.0, name: "1" },
    { jour: "5", factures: 26, montant: 7.8, name: "5" },
    { jour: "10", factures: 33, montant: 9.9, name: "10" },
    { jour: "15", factures: 46, montant: 13.8, name: "15" },
    { jour: "20", factures: 21, montant: 6.3, name: "20" },
    { jour: "25", factures: 36, montant: 10.8, name: "25" },
    { jour: "30", factures: 41, montant: 12.3, name: "30" },
  ],
  feb: [
    { jour: "1", factures: 36, montant: 10.8, name: "1" },
    { jour: "5", factures: 24, montant: 7.2, name: "5" },
    { jour: "10", factures: 30, montant: 9.0, name: "10" },
    { jour: "15", factures: 42, montant: 12.6, name: "15" },
    { jour: "20", factures: 18, montant: 5.4, name: "20" },
    { jour: "25", factures: 33, montant: 9.9, name: "25" },
    { jour: "28", factures: 38, montant: 11.4, name: "28" },
  ],
  jan: [
    { jour: "1", factures: 38, montant: 11.4, name: "1" },
    { jour: "5", factures: 25, montant: 7.5, name: "5" },
    { jour: "10", factures: 32, montant: 9.6, name: "10" },
    { jour: "15", factures: 45, montant: 13.5, name: "15" },
    { jour: "20", factures: 20, montant: 6.0, name: "20" },
    { jour: "25", factures: 35, montant: 10.5, name: "25" },
    { jour: "30", factures: 40, montant: 12.0, name: "30" },
  ],
  last_year: [
    { jour: "Jan", factures: 35, montant: 10.5, name: "Jan" },
    { jour: "Fév", factures: 32, montant: 9.6, name: "Fév" },
    { jour: "Mar", factures: 38, montant: 11.4, name: "Mar" },
    { jour: "Avr", factures: 40, montant: 12.0, name: "Avr" },
    { jour: "Mai", factures: 42, montant: 12.6, name: "Mai" },
    { jour: "Juin", factures: 45, montant: 13.5, name: "Juin" },
    { jour: "Juil", factures: 48, montant: 14.4, name: "Juil" },
    { jour: "Août", factures: 46, montant: 13.8, name: "Août" },
    { jour: "Sep", factures: 43, montant: 12.9, name: "Sep" },
    { jour: "Oct", factures: 40, montant: 12.0, name: "Oct" },
    { jour: "Nov", factures: 38, montant: 11.4, name: "Nov" },
    { jour: "Déc", factures: 36, montant: 10.8, name: "Déc" },
  ],
  current: [
    { jour: "1", factures: 42, montant: 12.6, name: "1" },
    { jour: "5", factures: 28, montant: 8.4, name: "5" },
    { jour: "10", factures: 35, montant: 10.5, name: "10" },
    { jour: "15", factures: 49, montant: 14.7, name: "15" },
    { jour: "20", factures: 22, montant: 6.6, name: "20" },
    { jour: "25", factures: 38, montant: 11.4, name: "25" },
    { jour: "30", factures: 43, montant: 12.9, name: "30" },
  ],
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
        <p className="mb-2 text-base font-semibold text-gray-800">Jour {label}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <p className="text-sm text-gray-600">
              Factures: <span className="font-semibold text-gray-800">{payload[0].value}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <p className="text-sm text-gray-600">
              Montant: <span className="font-semibold text-gray-800">{payload[1].value} K€</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export function MonthlyInvoiceChart({ period = "current" }) {
  // Sélectionner les données en fonction de la période
  const data = dataByPeriod[period] || dataByPeriod.current

  // Déterminer si nous affichons des données annuelles ou mensuelles
  const isYearlyData = period === "last_year"

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseOver = (data: any, index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
  }

  // Calculer la moyenne des factures pour afficher une ligne de référence
  const avgFactures = data.reduce((sum, item) => sum + item.factures, 0) / data.length
  const maxFactures = Math.max(...data.map((item) => item.factures))

  // Générer des couleurs pour les barres
  const getBarColor = (index: number, isActive: boolean) => {
    if (isActive) {
      return "#8b5cf6"
    }
    // Créer un dégradé de couleurs du violet au bleu
    const intensity = 0.5 + (index / data.length) * 0.5
    return `rgba(139, 92, 246, ${intensity})`
  }

  const getAmountColor = (index: number, isActive: boolean) => {
    if (isActive) {
      return "#3b82f6"
    }
    // Créer un dégradé de couleurs du bleu au cyan
    const intensity = 0.5 + (index / data.length) * 0.5
    return `rgba(59, 130, 246, ${intensity})`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 0,
          bottom: 20,
        }}
        barSize={isYearlyData ? 14 : 18}
        barGap={8}
        onMouseMove={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            handleMouseOver(e, e.activeTooltipIndex)
          }
        }}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="invoiceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
          </linearGradient>
          <filter id="invoiceShadow" height="130%" width="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="amountShadow" height="130%" width="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="0" dy="3" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur">
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dy={10}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dx={-10}
          domain={[0, maxFactures * 1.2]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          dx={10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: 10 }}
          formatter={(value) => <span className="text-sm font-medium text-gray-700">{value}</span>}
        />

        {/* Ligne de référence pour la moyenne */}
        <ReferenceLine
          yAxisId="left"
          y={avgFactures}
          stroke="#a855f7"
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{
            value: `Moy: ${avgFactures.toFixed(1)}`,
            position: "right",
            fill: "#a855f7",
            fontSize: 12,
          }}
        />

        <Bar
          yAxisId="left"
          dataKey="factures"
          name="Nombre de factures"
          radius={[8, 8, 0, 0]}
          animationDuration={1500}
          style={{ filter: "url(#invoiceShadow)" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={activeIndex === index ? "#8b5cf6" : "url(#invoiceGradient)"}
              fillOpacity={activeIndex === index ? 1 : 0.9}
              strokeWidth={activeIndex === index ? 2 : 0}
              stroke="#8b5cf6"
            />
          ))}
          <LabelList
            dataKey="factures"
            position="top"
            fill="#8b5cf6"
            fontSize={10}
            fontWeight="bold"
            formatter={(value) => (activeIndex !== null ? value : "")}
          />
        </Bar>
        <Bar
          yAxisId="right"
          dataKey="montant"
          name="Montant (K€)"
          radius={[8, 8, 0, 0]}
          animationDuration={1500}
          style={{ filter: "url(#amountShadow)" }}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={activeIndex === index ? "#3b82f6" : "url(#amountGradient)"}
              fillOpacity={activeIndex === index ? 1 : 0.9}
              strokeWidth={activeIndex === index ? 2 : 0}
              stroke="#3b82f6"
            />
          ))}
          <LabelList
            dataKey="montant"
            position="top"
            fill="#3b82f6"
            fontSize={10}
            fontWeight="bold"
            formatter={(value) => (activeIndex !== null ? `${value}K€` : "")}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

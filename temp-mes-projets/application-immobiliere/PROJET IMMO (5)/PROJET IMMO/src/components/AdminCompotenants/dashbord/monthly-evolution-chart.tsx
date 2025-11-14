"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend, Tooltip } from "recharts"

// Données pour différentes périodes
const dataByPeriod = {
  may: [
    { name: "Semaine 1", value: 42, montant: 12.6, color: "#8b5cf6" },
    { name: "Semaine 2", value: 35, montant: 10.5, color: "#6366f1" },
    { name: "Semaine 3", value: 49, montant: 14.7, color: "#4f46e5" },
    { name: "Semaine 4", value: 38, montant: 11.4, color: "#7c3aed" },
  ],
  apr: [
    { name: "Semaine 1", value: 39, montant: 11.7, color: "#8b5cf6" },
    { name: "Semaine 2", value: 32, montant: 9.6, color: "#6366f1" },
    { name: "Semaine 3", value: 45, montant: 13.5, color: "#4f46e5" },
    { name: "Semaine 4", value: 35, montant: 10.5, color: "#7c3aed" },
  ],
  mar: [
    { name: "Semaine 1", value: 40, montant: 12.0, color: "#8b5cf6" },
    { name: "Semaine 2", value: 33, montant: 9.9, color: "#6366f1" },
    { name: "Semaine 3", value: 46, montant: 13.8, color: "#4f46e5" },
    { name: "Semaine 4", value: 36, montant: 10.8, color: "#7c3aed" },
  ],
  feb: [
    { name: "Semaine 1", value: 36, montant: 10.8, color: "#8b5cf6" },
    { name: "Semaine 2", value: 30, montant: 9.0, color: "#6366f1" },
    { name: "Semaine 3", value: 42, montant: 12.6, color: "#4f46e5" },
    { name: "Semaine 4", value: 33, montant: 9.9, color: "#7c3aed" },
  ],
  jan: [
    { name: "Semaine 1", value: 38, montant: 11.4, color: "#8b5cf6" },
    { name: "Semaine 2", value: 32, montant: 9.6, color: "#6366f1" },
    { name: "Semaine 3", value: 45, montant: 13.5, color: "#4f46e5" },
    { name: "Semaine 4", value: 35, montant: 10.5, color: "#7c3aed" },
  ],
  last_year: [
    { name: "1er Trimestre", value: 105, montant: 31.5, color: "#8b5cf6" },
    { name: "2ème Trimestre", value: 127, montant: 38.1, color: "#6366f1" },
    { name: "3ème Trimestre", value: 137, montant: 41.1, color: "#4f46e5" },
    { name: "4ème Trimestre", value: 114, montant: 34.2, color: "#7c3aed" },
  ],
  current: [
    { name: "Semaine 1", value: 42, montant: 12.6, color: "#8b5cf6" },
    { name: "Semaine 2", value: 35, montant: 10.5, color: "#6366f1" },
    { name: "Semaine 3", value: 49, montant: 14.7, color: "#4f46e5" },
    { name: "Semaine 4", value: 38, montant: 11.4, color: "#7c3aed" },
  ],
}

// Composant pour le secteur actif (avec animation)
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, montant } =
    props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#fff"
        strokeWidth={2}
        className="drop-shadow-lg"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        opacity={0.3}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" fontSize={12}>
        {`${value} factures (${(percent * 100).toFixed(1)}%)`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999" fontSize={12}>
        {`${montant} K€`}
      </text>
    </g>
  )
}

// Composant pour le tooltip personnalisé
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
        <p className="mb-2 text-base font-semibold text-gray-800">{payload[0].name}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: payload[0].payload.color || payload[0].fill }}
            ></div>
            <p className="text-sm text-gray-600">
              Factures: <span className="font-semibold text-gray-800">{payload[0].value}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full opacity-70"
              style={{ backgroundColor: payload[0].payload.color || payload[0].fill }}
            ></div>
            <p className="text-sm text-gray-600">
              Montant: <span className="font-semibold text-gray-800">{payload[0].payload.montant} K€</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function MonthlyEvolutionChart({ period = "current" }) {
  // Sélectionner les données en fonction de la période
  const data = dataByPeriod[period] || dataByPeriod.current

  // État pour suivre le secteur actif
  const [activeIndex, setActiveIndex] = useState(0)

  // Gestionnaire pour le survol des secteurs
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  // Calculer le total des factures et des montants
  const totalFactures = data.reduce((sum, item) => sum + item.value, 0)
  const totalMontant = data.reduce((sum, item) => sum + item.montant, 0)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          {data.map((entry, index) => (
            <filter key={`shadow-${index}`} id={`shadow-${index}`} height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={entry.color} floodOpacity="0.3" />
            </filter>
          ))}
        </defs>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
          onMouseEnter={onPieEnter}
          animationDuration={800}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              style={{ filter: activeIndex === index ? `url(#shadow-${index})` : "none" }}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ paddingTop: 20 }}
        />

        {/* Texte central */}
        <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-gray-800">
          {totalFactures}
        </text>
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium fill-gray-500"
        >
          factures
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium fill-gray-500"
        >
          {totalMontant.toFixed(1)} K€
        </text>
      </PieChart>
    </ResponsiveContainer>
  )
}

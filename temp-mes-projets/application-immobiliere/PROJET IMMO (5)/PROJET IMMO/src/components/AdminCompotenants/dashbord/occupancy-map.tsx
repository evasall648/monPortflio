"use client"

import { useState } from "react"

export function OccupancyMap() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto">
            <MapIcon className="h-8 w-8 text-slate-400" />
          </div>
          <p className="mb-2 font-medium">Carte interactive des propriétés</p>
          <p className="text-sm max-w-md">
            Cette carte affiche la répartition géographique des biens avec un code couleur selon leur taux d'occupation.
          </p>
        </div>
      </div>

      {/* Zones simulées sur la carte - maintenant avec des styles améliorés */}
      <div
        className="absolute left-[20%] top-[30%] h-16 w-16 cursor-pointer rounded-full bg-green-400 bg-opacity-70 shadow-lg transition-all hover:bg-opacity-90 hover:scale-105"
        onMouseEnter={() => setHoveredArea("Centre-ville")}
        onMouseLeave={() => setHoveredArea(null)}
      ></div>

      <div
        className="absolute left-[40%] top-[20%] h-14 w-14 cursor-pointer rounded-full bg-green-400 bg-opacity-70 shadow-lg transition-all hover:bg-opacity-90 hover:scale-105"
        onMouseEnter={() => setHoveredArea("Quartier des affaires")}
        onMouseLeave={() => setHoveredArea(null)}
      ></div>

      <div
        className="absolute left-[60%] top-[35%] h-20 w-20 cursor-pointer rounded-full bg-amber-400 bg-opacity-70 shadow-lg transition-all hover:bg-opacity-90 hover:scale-105"
        onMouseEnter={() => setHoveredArea("Quartier résidentiel Est")}
        onMouseLeave={() => setHoveredArea(null)}
      ></div>

      <div
        className="absolute left-[30%] top-[60%] h-18 w-18 cursor-pointer rounded-full bg-amber-400 bg-opacity-70 shadow-lg transition-all hover:bg-opacity-90 hover:scale-105"
        onMouseEnter={() => setHoveredArea("Quartier résidentiel Ouest")}
        onMouseLeave={() => setHoveredArea(null)}
      ></div>

      <div
        className="absolute left-[70%] top-[65%] h-24 w-24 cursor-pointer rounded-full bg-red-400 bg-opacity-70 shadow-lg transition-all hover:bg-opacity-90 hover:scale-105"
        onMouseEnter={() => setHoveredArea("Zone périphérique")}
        onMouseLeave={() => setHoveredArea(null)}
      ></div>

      {/* Légende avec style amélioré */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow-md border border-slate-100">
        <div className="mb-2 text-xs font-medium text-slate-700">Taux d'occupation</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-slate-600">Élevé (&gt;90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
            <span className="text-xs text-slate-600">Moyen (70-90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-slate-600">Faible (&lt;70%)</span>
          </div>
        </div>
      </div>

      {/* Info-bulle au survol avec style amélioré */}
      {hoveredArea && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg bg-white p-3 shadow-lg border border-slate-100">
          <div className="font-medium text-slate-900">{hoveredArea}</div>
          <div className="text-sm text-slate-600">
            {hoveredArea === "Centre-ville" && "Taux d'occupation: 95% (120 biens)"}
            {hoveredArea === "Quartier des affaires" && "Taux d'occupation: 88% (95 biens)"}
            {hoveredArea === "Quartier résidentiel Est" && "Taux d'occupation: 82% (210 biens)"}
            {hoveredArea === "Quartier résidentiel Ouest" && "Taux d'occupation: 78% (185 biens)"}
            {hoveredArea === "Zone périphérique" && "Taux d'occupation: 72% (232 biens)"}
          </div>
        </div>
      )}
    </div>
  )
}

interface MapIconProps extends React.SVGProps<SVGSVGElement> {
  // Toutes les props SVG standard sont déjà incluses via l'extension
}

function MapIcon(props: MapIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}

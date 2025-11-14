"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
}

type ThemeProviderState = {
  theme: Theme
  systemTheme: Theme | null
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  systemTheme: null,
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "keurgui-immo-theme",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null)
  const [mounted, setMounted] = useState(false)

  // Set mounted to true once component mounts
  useEffect(() => {
    setMounted(true)

    // Récupérer le thème depuis le localStorage ou utiliser le thème par défaut
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    if (storedTheme) {
      setThemeState(storedTheme)
    } else {
      setThemeState(defaultTheme)
    }
  }, [defaultTheme, storageKey])

  // Gérer les changements de thème système
  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    // Supprimer les classes de thème existantes
    root.classList.remove("light", "dark")

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light"
      setSystemTheme(newSystemTheme)

      // Si le thème actuel est "system", mettre à jour les classes
      if (theme === "system") {
        root.classList.add(newSystemTheme)
      }
    }

    // Définir le thème système initial
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setSystemTheme(systemTheme)

    // Ajouter un écouteur pour les changements de thème système
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleSystemThemeChange)

    // Nettoyer l'écouteur lors du démontage
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [theme])

  // Mettre à jour les classes CSS lorsque le thème change
  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    // Supprimer les classes de thème existantes
    root.classList.remove("light", "dark")

    // Déterminer le thème à appliquer
    let themeToApply = theme
    if (theme === "system") {
      themeToApply = systemTheme || defaultTheme
    }

    // Appliquer le thème
    if (themeToApply) {
      root.classList.add(themeToApply)
      document.documentElement.setAttribute("data-theme", themeToApply)

      // Ajouter une transition fluide
      root.style.colorScheme = themeToApply
    }
  }, [theme, systemTheme, defaultTheme])

  // Mettre à jour le localStorage et l'état du thème
  const setTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") return

    // Mettre à jour le localStorage
    localStorage.setItem(storageKey, newTheme)

    // Mettre à jour l'état
    setThemeState(newTheme)
  }

  // Ne rien rendre tant que le thème n'est pas chargé
  if (!mounted) {
    return <>{children}</>
  }

  const value = {
    theme,
    systemTheme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

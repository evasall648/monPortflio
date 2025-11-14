import React from "react";
import { createContext } from "react";
const TableauDeBord: React.FC = () => {
  return null; // Ne rien afficher
};

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;

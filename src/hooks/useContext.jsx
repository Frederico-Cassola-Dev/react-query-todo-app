import { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  theme: "green",
  toggleTheme: () => { }
});

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return {
    isGreen: theme === "green",
    isYellow: theme === "yellow",
    theme,
    toggleTheme
  }
}

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("green")

  const toggleTheme = () => setTheme(theme === "green" ? "yellow" : "green")
  return <ThemeContext.Provider value={{ theme, toggleTheme }} >
    {children}
  </ ThemeContext.Provider>
}

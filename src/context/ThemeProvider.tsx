import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext, type Theme } from "./ThemeContext";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // Apply theme to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

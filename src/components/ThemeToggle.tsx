import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span className="toggle-track">
        <span className="toggle-thumb">
          {theme === "light" ? (
            <span className="icon">🌙</span>
          ) : (
            <span className="icon">☀️</span>
          )}
        </span>
      </span>
    </label>
  );
}

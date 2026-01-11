import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Load from localStorage on first render
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error loading localStorage key:", key, error);
      return initialValue;
    }
  });
  // Save to localStorage anytime the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Error saving localStorage key:", key, error);
    }
  }, [key, value]);

  const updateValue = useCallback(
    (updater: React.SetStateAction<T>) => {
      setValue((prev) =>
        typeof updater === "function"
          ? (updater as (val: T) => T)(prev)
          : updater
      );
    },
    []
  );

  return [value, updateValue] as const;
}
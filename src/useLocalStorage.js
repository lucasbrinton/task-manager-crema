import { useEffect, useState } from "react";

/**
 * Retrieves a value from localStorage with SSR safety check.
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value from localStorage or default value
 */
function getStorageValue(key, defaultValue) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

/**
 * Custom hook for persisting state to localStorage.
 * Synchronizes component state with localStorage, ensuring data persists across sessions.
 *
 * @param {string} key - The localStorage key to use
 * @param {*} defaultValue - Initial value if no stored value exists
 * @returns {[*, Function]} Tuple of [value, setValue] similar to useState
 *
 * @example
 * const [tasks, setTasks] = useLocalStorage("tasks", []);
 */
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

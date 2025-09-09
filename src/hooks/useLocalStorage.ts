import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialState: T
): readonly [T, (newValue: T | ((val: T) => T)) => void] {
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialState;
    }

    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    } else {
      //   if (key) {
      //     localStorage.setItem(key, JSON.stringify(initialState));
      //   }
      return initialState;
    }
  };

  const [value, setValue] = useState<T>(readValue);
  useEffect(() => {
    setValue(readValue());
  }, [key]); // 👈 re-read from localStorage when key changes

  const setValueFunc = (newValue: T | ((val: T) => T)) => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      );
    }
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  useEffect(() => {
    const handleOtherTabSt = () => setValue(readValue());
    window.addEventListener("storage", handleOtherTabSt);
    return () => {
      window.removeEventListener("storage", handleOtherTabSt);
    };
  }, []);

  return [value, setValueFunc] as const;
}

export default useLocalStorage;

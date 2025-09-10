import { useCallback, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialState: T
): readonly [T, (newValue: T | ((val: T) => T)) => void] {
  const readValue = useCallback((): T => {
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
  }, [key]);

  const [value, setValue] = useState<T>(readValue);
  useEffect(() => {
    setValue(readValue());
  }, [key, readValue]); // 👈 re-read from localStorage when key changes

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
    // Notify same-tab listeners that this key has been updated
    try {
      window.dispatchEvent(
        new CustomEvent("local-storage", { detail: { key } })
      );
    } catch {
      // no-op if CustomEvent not supported
    }
  };

  useEffect(() => {
    const handleOtherTabSt = () => setValue(readValue());
    window.addEventListener("storage", handleOtherTabSt);
    return () => {
      window.removeEventListener("storage", handleOtherTabSt);
    };
  }, [readValue]);

  // Listen for same-tab updates triggered by this hook's setter in any component instance
  useEffect(() => {
    const handleSameTab = (e: Event) => {
      const evt = e as CustomEvent<{ key: string }>;
      if (evt.detail && evt.detail.key === key) {
        setValue(readValue());
      }
    };
    window.addEventListener("local-storage", handleSameTab as EventListener);
    return () => {
      window.removeEventListener(
        "local-storage",
        handleSameTab as EventListener
      );
    };
  }, [key, readValue]);

  return [value, setValueFunc] as const;
}

export default useLocalStorage;

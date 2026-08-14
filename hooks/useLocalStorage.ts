"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_EVENT = "gotovayeda-storage";

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handler = () => onStoreChange();
    window.addEventListener("storage", handler);
    window.addEventListener(STORAGE_EVENT, handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(STORAGE_EVENT, handler);
    };
  }, []);

  const getSnapshot = useCallback(
    () => readValue(key, initialValue),
    [key, initialValue]
  );

  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialValue
  );

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = readValue(key, initialValue);
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      window.dispatchEvent(new Event(STORAGE_EVENT));
    },
    [key, initialValue]
  );

  return [value, setValue, true] as const;
}

export function getLocalStorageItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
}

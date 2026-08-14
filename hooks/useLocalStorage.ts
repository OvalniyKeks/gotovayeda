"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_EVENT = "gotovayeda-storage";

const snapshotCache = new Map<string, { raw: string; value: unknown }>();

function readSnapshot<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;

  try {
    const raw = window.localStorage.getItem(key);
    const rawStr = raw ?? "";
    const cached = snapshotCache.get(key);

    if (cached?.raw === rawStr) {
      return cached.value as T;
    }

    const value = raw ? (JSON.parse(raw) as T) : initialValue;
    snapshotCache.set(key, { raw: rawStr, value });
    return value;
  } catch {
    return initialValue;
  }
}

function writeSnapshot<T>(key: string, value: T): void {
  const rawStr = JSON.stringify(value);
  window.localStorage.setItem(key, rawStr);
  snapshotCache.set(key, { raw: rawStr, value });
  window.dispatchEvent(new Event(STORAGE_EVENT));
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
    () => readSnapshot(key, initialValue),
    [key, initialValue]
  );

  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = readSnapshot(key, initialValue);
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      writeSnapshot(key, resolved);
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

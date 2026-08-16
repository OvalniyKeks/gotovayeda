"use client";

import { useEffect } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getLocalStorageItem } from "@/hooks/useLocalStorage";
import { BudgetData } from "@/data/budget";

async function pushLocalData() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const budget = getLocalStorageItem<BudgetData>("gotovayeda-budget");
  const shopping = getLocalStorageItem<Record<string, boolean>>("gotovayeda-shopping");
  const menu = getLocalStorageItem<Record<number, boolean>>("gotovayeda-menu");

  const requests: Promise<Response>[] = [];

  if (budget) {
    requests.push(
      fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budget),
      })
    );
  }
  if (shopping) {
    requests.push(
      fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopping),
      })
    );
  }
  if (menu) {
    requests.push(
      fetch("/api/menu-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      })
    );
  }

  await Promise.all(requests);
}

export function SyncManager() {
  useEffect(() => {
    if (!isSupabaseConfigured() || !navigator.onLine) return;

    const initialSync = async () => {
      const migrated = localStorage.getItem("gotovayeda-migrated");
      if (migrated) return;

      await pushLocalData();
      localStorage.setItem("gotovayeda-migrated", "1");
    };

    const onOnline = () => {
      pushLocalData().catch(console.error);
    };

    initialSync().catch(console.error);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  return null;
}

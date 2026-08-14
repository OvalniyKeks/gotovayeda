"use client";

import { useEffect } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getLocalStorageItem } from "@/hooks/useLocalStorage";
import { BudgetData } from "@/data/budget";

export function SyncOnLogin() {
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const sync = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const migrated = localStorage.getItem("gotovayeda-migrated");
      if (migrated) return;

      const budget = getLocalStorageItem<BudgetData>("gotovayeda-budget");
      const shopping = getLocalStorageItem<Record<string, boolean>>("gotovayeda-shopping");
      const menu = getLocalStorageItem<Record<number, boolean>>("gotovayeda-menu");

      if (budget) {
        await fetch("/api/budget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(budget),
        });
      }
      if (shopping) {
        await fetch("/api/shopping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shopping),
        });
      }
      if (menu) {
        await fetch("/api/menu-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(menu),
        });
      }

      localStorage.setItem("gotovayeda-migrated", "1");
    };

    sync().catch(console.error);
  }, []);

  return null;
}

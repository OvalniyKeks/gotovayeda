"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const navItems = [
  { href: "#budget", label: "Бюджет" },
  { href: "#shopping", label: "Закупка" },
  { href: "#menu", label: "Меню" },
  { href: "#cooking", label: "Готовка" },
  { href: "/dishes", label: "Блюда" },
];

export function Header() {
  const [email, setEmail] = useState<string | null>(null);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    if (!supabaseReady) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, [supabaseReady]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-xl font-bold text-[var(--accent-dark)]">
          GOTOVAYEDA
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--accent-dark)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {email ? (
            <span className="hidden text-sm text-[var(--muted)] sm:inline">{email}</span>
          ) : null}
          {supabaseReady ? (
            <Link
              href="/login"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]"
            >
              {email ? "Аккаунт" : "Войти"}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { isNavActive, navItems } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    if (!supabaseReady) return;
    createClient()
      .auth.getUser()
      .then(({ data }) => setEmail(data.user?.email ?? null));
  }, [supabaseReady]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-wide text-[var(--accent-dark)]"
          >
            GOTOVAYEDA
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition",
                  isNavActive(pathname, item.href)
                    ? "text-[var(--accent-dark)]"
                    : "text-[var(--muted)] hover:text-[var(--accent-dark)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {email ? (
              <span className="hidden max-w-[140px] truncate text-sm text-[var(--muted)] xl:inline">
                {email}
              </span>
            ) : null}
            {supabaseReady ? (
              <Link
                href="/login"
                className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)] sm:inline-flex"
              >
                {email ? "Аккаунт" : "Войти"}
              </Link>
            ) : null}
            <button
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-xl lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            className="absolute inset-0 bg-black/40"
            onClick={closeMenu}
          />
          <aside className="animate-slide-in-right absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-[var(--background)] shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4">
              <span className="font-display text-lg font-semibold">Меню</span>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={closeMenu}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition",
                        isNavActive(pathname, item.href)
                          ? "bg-[var(--accent)]/10 text-[var(--accent-dark)]"
                          : "text-[var(--foreground)] hover:bg-[var(--cream-dark)]"
                      )}
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {supabaseReady ? (
              <div className="border-t border-[var(--border)] p-4">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white"
                >
                  {email ? "Аккаунт" : "Войти"}
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      )}
    </>
  );
}

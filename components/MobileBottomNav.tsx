"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavItems, isNavActive } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname.startsWith("/dishes/")) {
    return null;
  }

  return (
    <nav
      data-mobile-nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {bottomNavItems.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium transition",
                active
                  ? "text-[var(--accent-dark)]"
                  : "text-[var(--muted)] hover:text-[var(--accent-dark)]"
              )}
            >
              <span className="text-lg leading-none">{item.emoji}</span>
              <span className="truncate">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

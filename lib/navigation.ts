export const navItems = [
  { href: "/", label: "Главная", emoji: "🏠", shortLabel: "Дом" },
  { href: "/budget", label: "Бюджет", emoji: "💰", shortLabel: "Бюджет" },
  { href: "/shopping", label: "Закупка", emoji: "🛒", shortLabel: "Закупка" },
  { href: "/menu", label: "Меню", emoji: "📅", shortLabel: "Меню" },
  { href: "/cooking", label: "Готовка", emoji: "👨‍🍳", shortLabel: "Готовка" },
  { href: "/dishes", label: "Блюда", emoji: "🍽️", shortLabel: "Блюда" },
] as const;

export const bottomNavItems = navItems.filter((item) => item.href !== "/dishes");

export const quickLinks = navItems.filter((item) => item.href !== "/");

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

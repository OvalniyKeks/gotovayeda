import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import "./globals.css";

// Rubik: мягкий округлый sans с кириллицей (Quicksand кириллицу не поддерживает)
const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GOTOVAYEDA — План питания на 30 дней",
  description:
    "Домашний план питания на месяц для двоих: меню, закупки, бюджет 25 000 ₽, календарь готовки и рецепты.",
  openGraph: {
    title: "GOTOVAYEDA — План питания на 30 дней",
    description: "Меню, закупки, бюджет и рецепты на месяц",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${rubik.variable} h-full`}>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <MobileBottomNav />
        <footer className="border-t border-[var(--border)] px-4 py-8 pb-24 text-center text-sm text-[var(--muted)] md:pb-8">
          GOTOVAYEDA · План питания на 30 дней · 2 человека · 25 000 ₽
        </footer>
      </body>
    </html>
  );
}

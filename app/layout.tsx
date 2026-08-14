import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
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
    <html lang="ru" className={`${playfair.variable} ${inter.variable} h-full`}>
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

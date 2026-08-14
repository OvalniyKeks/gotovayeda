import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
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
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        <Header />
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--muted)]">
          GOTOVAYEDA · План питания на 30 дней · 2 человека · 25 000 ₽
        </footer>
      </body>
    </html>
  );
}

import { Hero } from "@/components/Hero";
import { DashboardToday } from "@/components/DashboardToday";
import { QuickLinks } from "@/components/QuickLinks";
import { SyncOnLogin } from "@/components/SyncOnLogin";

export const metadata = {
  title: "GOTOVAYEDA — План питания на 30 дней",
  description: "Дашборд: меню на сегодня, бюджет, закупки и рецепты.",
};

export default function HomePage() {
  return (
    <>
      <SyncOnLogin />
      <Hero />
      <DashboardToday />
      <QuickLinks />
    </>
  );
}

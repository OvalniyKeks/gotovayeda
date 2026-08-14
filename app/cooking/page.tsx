import { CookingCalendar } from "@/components/CookingCalendar";
import { PrepSection } from "@/components/PrepSection";

export const metadata = {
  title: "Готовка — GOTOVAYEDA",
};

export default function CookingPage() {
  return (
    <>
      <CookingCalendar />
      <PrepSection />
    </>
  );
}

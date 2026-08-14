import { Hero } from "@/components/Hero";
import { BudgetSection } from "@/components/BudgetSection";
import { FoodBudgetSection } from "@/components/FoodBudgetSection";
import { ShoppingList } from "@/components/ShoppingList";
import { MenuCalendar } from "@/components/MenuCalendar";
import { CookingCalendar } from "@/components/CookingCalendar";
import { DishesList } from "@/components/DishesList";
import { PrepSection } from "@/components/PrepSection";
import { SyncOnLogin } from "@/components/SyncOnLogin";

export default function HomePage() {
  return (
    <>
      <SyncOnLogin />
      <Hero />
      <BudgetSection />
      <FoodBudgetSection />
      <ShoppingList />
      <MenuCalendar />
      <CookingCalendar />
      <DishesList />
      <PrepSection />
    </>
  );
}

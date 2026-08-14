import { BudgetSection } from "@/components/BudgetSection";
import { FoodBudgetSection } from "@/components/FoodBudgetSection";

export const metadata = {
  title: "Бюджет — GOTOVAYEDA",
};

export default function BudgetPage() {
  return (
    <>
      <BudgetSection />
      <FoodBudgetSection />
    </>
  );
}

import {
  FOOD_BUDGET_TOTAL,
  foodBudgetCategories,
  foodBudgetNotes,
} from "@/data/foodBudget";
import { formatRubles } from "@/lib/format";
import { Card, ProgressBar, SectionTitle } from "@/components/ui";

export function FoodBudgetSection() {
  return (
    <section className="bg-[var(--cream-dark)] px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="🍗"
          title={`Бюджет на еду — ${formatRubles(FOOD_BUDGET_TOTAL)}`}
          subtitle="Ориентировочное распределение на 30 дней для двоих."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {foodBudgetCategories.map((cat) => (
            <Card key={cat.id} className="bg-white">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{cat.name}</span>
                <span className="font-semibold text-[var(--accent-dark)]">
                  {formatRubles(cat.limit)}
                </span>
              </div>
              <ProgressBar value={cat.limit} max={FOOD_BUDGET_TOTAL} />
            </Card>
          ))}
        </div>
        <ul className="mt-6 space-y-2 text-sm text-[var(--muted)]">
          {foodBudgetNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span>•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { dishes, categoryLabels, DishCategory } from "@/data/dishes";
import { Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "Блюда — GOTOVAYEDA",
};

export default function DishesPage() {
  const grouped = dishes.reduce<Record<string, typeof dishes>>((acc, dish) => {
    if (!acc[dish.category]) acc[dish.category] = [];
    acc[dish.category].push(dish);
    return acc;
  }, {});

  const order: DishCategory[] = ["breakfast", "lunch", "dinner", "other"];

  return (
    <div className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-block text-[var(--accent-dark)] underline">
          ← На главную
        </Link>
        <SectionTitle
          emoji="🍽️"
          title="Каталог блюд"
          subtitle="30 блюд месяца с рецептами."
        />
        {order.map((cat) =>
          grouped[cat]?.length ? (
            <div key={cat} className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-semibold">
                {categoryLabels[cat]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[cat].map((dish) => (
                  <Link key={dish.slug} href={`/dishes/${dish.slug}`}>
                    <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{dish.emoji}</span>
                        <span className="font-medium">{dish.name}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

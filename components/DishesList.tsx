"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryLabels, dishes, DishCategory } from "@/data/dishes";
import { Card, SectionTitle } from "@/components/ui";

const categories: Array<DishCategory | "all"> = [
  "all",
  "breakfast",
  "lunch",
  "dinner",
  "other",
];

export function DishesList() {
  const [filter, setFilter] = useState<DishCategory | "all">("all");
  const filtered =
    filter === "all" ? dishes : dishes.filter((d) => d.category === filter);

  return (
    <section id="dishes" className="scroll-mt-24 bg-[var(--cream-dark)] px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="🍽️"
          title="30 блюд месяца"
          subtitle="Нажмите на блюдо, чтобы открыть рецепт или добавить свой."
        />
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === cat
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white text-[var(--muted)] hover:text-[var(--accent-dark)]"
              }`}
            >
              {cat === "all" ? "Все" : categoryLabels[cat]}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dish, index) => (
            <Link key={dish.slug} href={`/dishes/${dish.slug}`}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{dish.emoji}</span>
                  <div>
                    <div className="text-xs text-[var(--muted)]">#{index + 1}</div>
                    <div className="font-medium">{dish.name}</div>
                    <div className="mt-1 text-xs text-[var(--accent)]">
                      {categoryLabels[dish.category]}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

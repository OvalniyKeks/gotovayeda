"use client";

import Link from "next/link";
import { RecipeData } from "@/lib/recipe-types";
import { Card } from "@/components/ui";

export function RecipeView({ recipe }: { recipe: RecipeData }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
        {recipe.prepTime ? <span>⏱ Подготовка: {recipe.prepTime} мин</span> : null}
        {recipe.cookTime ? <span>🔥 Готовка: {recipe.cookTime} мин</span> : null}
        <span>👥 Порций: {recipe.servings}</span>
      </div>
      <Card>
        <h2 className="mb-4 font-display text-2xl font-semibold">Ингредиенты</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((item) => (
            <li key={`${item.name}-${item.amount}`} className="flex gap-2">
              <span className="text-[var(--accent)]">•</span>
              <span>
                {item.name} — {item.amount} {item.unit}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="mb-4 font-display text-2xl font-semibold">Шаги</h2>
        <ol className="space-y-4">
          {recipe.steps
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <li key={step.order} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {step.order}
                </span>
                <p className="pt-1">{step.text}</p>
              </li>
            ))}
        </ol>
      </Card>
      {recipe.tips ? (
        <Card className="border-[var(--amber)] bg-[var(--amber)]/10">
          <h3 className="mb-2 font-semibold">💡 Совет</h3>
          <p>{recipe.tips}</p>
        </Card>
      ) : null}
      <Link href="/dishes" className="inline-block text-[var(--accent-dark)] underline">
        ← Все блюда
      </Link>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { allShoppingItems, shoppingCategories, shoppingTips } from "@/data/shopping";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { EMPTY_SHOPPING_STATE } from "@/lib/storage-defaults";
import { Card, ProgressBar, SectionTitle } from "@/components/ui";

type ShoppingState = Record<string, boolean>;

export function ShoppingList() {
  const [checked, setChecked] = useLocalStorage<ShoppingState>(
    "gotovayeda-shopping",
    EMPTY_SHOPPING_STATE
  );

  const purchasableItems = allShoppingItems.filter((i) => i.note !== "Не покупаем");
  const checkedCount = purchasableItems.filter((i) => checked[i.id]).length;

  const toggle = (id: string) => setChecked({ ...checked, [id]: !checked[id] });

  const reset = () => setChecked({});

  const byCategory = useMemo(() => shoppingCategories, []);

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="🛒"
          title="Список закупки"
          subtitle="Отмечайте купленное — прогресс сохраняется автоматически."
        />
        <Card className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">Прогресс закупки</span>
            <span className="text-sm text-[var(--muted)]">
              {checkedCount} из {purchasableItems.length}
            </span>
          </div>
          <ProgressBar value={checkedCount} max={purchasableItems.length} />
          <button
            type="button"
            onClick={reset}
            className="mt-3 text-sm text-[var(--muted)] underline hover:text-[var(--accent-dark)]"
          >
            Сбросить отметки
          </button>
        </Card>
        <div className="space-y-6">
          {byCategory.map((category) => (
            <Card key={category.id}>
              <h3 className="mb-4 font-display text-xl font-semibold">
                {category.emoji} {category.title}
              </h3>
              <div className="space-y-2">
                {category.items.map((item) => {
                  const isDone = Boolean(checked[item.id]);
                  const skip = item.note === "Не покупаем";
                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                        isDone
                          ? "border-[var(--green)]/30 bg-[var(--green-light)]"
                          : "border-[var(--border)] hover:border-[var(--accent)]/40"
                      } ${skip ? "opacity-60" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        disabled={skip}
                        onChange={() => toggle(item.id)}
                        className="mt-1 h-4 w-4 accent-[var(--accent)]"
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${isDone ? "line-through opacity-70" : ""}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-[var(--muted)]">
                          {item.quantity} · {item.price}
                          {item.note ? ` · ${item.note}` : ""}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
        <ul className="mt-8 space-y-2 text-sm text-[var(--muted)]">
          {shoppingTips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span>💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

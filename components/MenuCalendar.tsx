"use client";

import Link from "next/link";
import { useMemo } from "react";
import { formatMenuDate, getTodayMenuDay, menuDays } from "@/data/menu";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/cn";
import { Card, SectionTitle } from "@/components/ui";

type MenuProgress = Record<number, boolean>;

const mealColors = {
  breakfast: "bg-[var(--amber)]/20 text-[var(--amber-dark)]",
  lunch: "bg-[var(--accent)]/15 text-[var(--accent-dark)]",
  dinner: "bg-[var(--green)]/15 text-[var(--green)]",
};

export function MenuCalendar() {
  const [progress, setProgress] = useLocalStorage<MenuProgress>("gotovayeda-menu", {});
  const today = getTodayMenuDay();

  const toggleDay = (day: number) => {
    setProgress({ ...progress, [day]: !progress[day] });
  };

  const completedCount = useMemo(
    () => menuDays.filter((d) => progress[d.day]).length,
    [progress]
  );

  return (
    <section id="menu" className="scroll-mt-24 bg-[var(--cream-dark)] px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="📅"
          title="Меню на 30 дней"
          subtitle={`15 августа — 13 сентября 2026 · выполнено ${completedCount} из ${menuDays.length} дней`}
        />
        {today && (
          <Card className="mb-8 border-[var(--accent)] bg-[var(--accent)]/5">
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
              Сегодня · день {today.day}
            </p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {[today.breakfast, today.lunch, today.dinner].map((meal) => (
                <MealLink key={meal.label + meal.dishSlug} meal={meal} type={
                  meal.label === "Завтрак" ? "breakfast" : meal.label === "Обед" ? "lunch" : "dinner"
                } />
              ))}
            </div>
          </Card>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuDays.map((day) => {
            const isToday = today?.day === day.day;
            const isDone = Boolean(progress[day.day]);
            return (
              <Card
                key={day.day}
                className={cn(
                  "transition",
                  isToday && "ring-2 ring-[var(--accent)]",
                  isDone && "opacity-75"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold">
                      День {day.day}
                      {isToday && (
                        <span className="ml-2 rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">
                          сегодня
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-[var(--muted)]">{formatMenuDate(day.date)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleDay(day.day)}
                    title="Отметить день"
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm transition",
                      isDone
                        ? "border-[var(--green)] bg-[var(--green-light)] text-[var(--green)]"
                        : "border-[var(--border)] hover:border-[var(--green)]"
                    )}
                  >
                    {isDone ? "✓" : ""}
                  </button>
                </div>
                <div className="space-y-2">
                  <MealLink meal={day.breakfast} type="breakfast" compact />
                  <MealLink meal={day.lunch} type="lunch" compact />
                  <MealLink meal={day.dinner} type="dinner" compact />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MealLink({
  meal,
  type,
  compact,
}: {
  meal: { label: string; dishSlug: string; dishName: string };
  type: keyof typeof mealColors;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/dishes/${meal.dishSlug}`}
      className={cn(
        "block rounded-lg px-3 py-2 transition hover:opacity-80",
        mealColors[type],
        compact ? "text-sm" : ""
      )}
    >
      <span className="font-medium">{meal.label}:</span> {meal.dishName}
    </Link>
  );
}

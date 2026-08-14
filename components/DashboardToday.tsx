import Link from "next/link";
import { formatMenuDate, formatPlanDateRange, getTodayMenuDay } from "@/data/menu";
import { Card } from "@/components/ui";

export function DashboardToday() {
  const today = getTodayMenuDay();

  if (!today) {
    return (
      <section className="px-4 pb-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <Card>
            <p className="text-[var(--muted)]">
              Сегодня вне диапазона плана ({formatPlanDateRange()}).
            </p>
            <Link href="/menu" className="mt-3 inline-block text-[var(--accent-dark)] underline">
              Открыть меню на 30 дней
            </Link>
          </Card>
        </div>
      </section>
    );
  }

  const meals = [today.breakfast, today.lunch, today.dinner];

  return (
    <section className="px-4 pb-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Card className="border-[var(--accent)] bg-[var(--accent)]/5">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            Сегодня · день {today.day} · {formatMenuDate(today.date)}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {meals.map((meal) => (
              <Link
                key={meal.label}
                href={`/dishes/${meal.dishSlug}`}
                className="rounded-xl bg-white/80 px-4 py-3 transition hover:bg-white"
              >
                <div className="text-xs font-medium uppercase text-[var(--muted)]">
                  {meal.label}
                </div>
                <div className="mt-1 font-medium">{meal.dishName}</div>
              </Link>
            ))}
          </div>
          <Link
            href="/menu"
            className="mt-4 inline-block text-sm text-[var(--accent-dark)] underline"
          >
            Всё меню на месяц
          </Link>
        </Card>
      </div>
    </section>
  );
}

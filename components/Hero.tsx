import { dishes } from "@/data/dishes";
import { FOOD_BUDGET_TOTAL } from "@/data/foodBudget";
import { menuDays } from "@/data/menu";
import { planGoal } from "@/data/prep";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[var(--amber)]/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          План питания · 2 человека
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-6xl">
          30 дней домашней еды за {FOOD_BUDGET_TOTAL.toLocaleString("ru-RU")} ₽
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">{planGoal}</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { emoji: "📅", label: "Дней", value: String(menuDays.length) },
            { emoji: "🍽️", label: "Блюд", value: String(dishes.length) },
            { emoji: "💰", label: "Бюджет еды", value: `${FOOD_BUDGET_TOTAL.toLocaleString("ru-RU")} ₽` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-center shadow-sm"
            >
              <div className="text-2xl">{stat.emoji}</div>
              <div className="mt-2 font-display text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

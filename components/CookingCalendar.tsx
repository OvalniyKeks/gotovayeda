"use client";

import { cookingCalendar } from "@/data/cookingCalendar";
import { cn } from "@/lib/cn";
import { Card, SectionTitle } from "@/components/ui";

function isWithinDays(dateStr: string, days: number): boolean {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
}

function isPast(dateStr: string): boolean {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return target < now;
}

function isToday(dateStr: string): boolean {
  return dateStr === new Date().toISOString().slice(0, 10);
}

export function CookingCalendar() {
  return (
    <section id="cooking" className="scroll-mt-24 px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="👨‍🍳"
          title="Календарь готовки"
          subtitle="Ближайшие 3 дня подсвечены — планируйте заготовки заранее."
        />
        <div className="space-y-4">
          {cookingCalendar.map((entry) => {
            const upcoming = isWithinDays(entry.date, 3);
            const today = isToday(entry.date);
            const past = isPast(entry.date) && !today;
            return (
              <Card
                key={entry.id}
                className={cn(
                  today && "ring-2 ring-[var(--accent)] bg-[var(--accent)]/5",
                  upcoming && !today && "border-[var(--amber)] bg-[var(--amber)]/5",
                  past && "opacity-60"
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{entry.label}</h3>
                  {today && (
                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">
                      сегодня
                    </span>
                  )}
                  {upcoming && !today && (
                    <span className="rounded-full bg-[var(--amber)] px-2 py-0.5 text-xs text-[var(--amber-dark)]">
                      скоро
                    </span>
                  )}
                  {entry.isPrep && (
                    <span className="rounded-full bg-[var(--green-light)] px-2 py-0.5 text-xs text-[var(--green)]">
                      подготовка
                    </span>
                  )}
                </div>
                <ul className="space-y-1 text-[var(--muted)]">
                  {entry.tasks.map((task) => (
                    <li key={task} className="flex gap-2">
                      <span>•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

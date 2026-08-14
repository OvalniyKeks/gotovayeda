"use client";

import Link from "next/link";
import { cookingCalendar, type ShoppingBlockType } from "@/data/cookingCalendar";
import {
  freshRunById,
  freshShoppingTemplate,
  shoppingItemById,
} from "@/data/shopping";
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

function TaskList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-[var(--muted)]">
      {items.map((task) => (
        <li key={task} className="flex gap-2">
          <span>•</span>
          <span>{task}</span>
        </li>
      ))}
    </ul>
  );
}

const blockStyles: Record<
  ShoppingBlockType,
  { bg: string; badge: string; badgeText: string }
> = {
  pantry: {
    bg: "bg-[var(--green-light)]/50",
    badge: "bg-[var(--green-light)]",
    badgeText: "text-[var(--green)]",
  },
  freezer: {
    bg: "bg-blue-50",
    badge: "bg-blue-100",
    badgeText: "text-blue-800",
  },
  fresh: {
    bg: "bg-[var(--amber)]/10",
    badge: "bg-[var(--amber)]/20",
    badgeText: "text-[var(--amber-dark)]",
  },
};

function ShoppingBlockCard({
  block,
}: {
  block: { type: ShoppingBlockType; label: string; items: string[] };
}) {
  const style = blockStyles[block.type];
  return (
    <div className={cn("rounded-xl px-4 py-3", style.bg)}>
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", style.badge, style.badgeText)}>
          {block.type === "pantry" ? "разово" : block.type === "freezer" ? "морозилка" : "каждые 3 дня"}
        </span>
        <p className="text-sm font-medium">{block.label}</p>
      </div>
      <TaskList items={block.items} />
    </div>
  );
}

function FreshRunShopping({ freshRunId }: { freshRunId: string }) {
  const run = freshRunById[freshRunId];
  if (!run) return null;

  const templateItems = freshShoppingTemplate.items.map((item) => {
    const product = shoppingItemById[item.itemId];
    return `${product?.name ?? item.itemId}: ${item.quantity}${item.note ? ` (${item.note})` : ""}`;
  });

  const extraItems = run.extraItems.map((item) => {
    const product = shoppingItemById[item.itemId];
    return `${product?.name ?? item.itemId}: ${item.quantity}${item.note ? ` (${item.note})` : ""}`;
  });

  return (
    <div className="mb-4 space-y-3">
      <div className="rounded-xl bg-[var(--amber)]/10 px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-[var(--amber)]/20 px-2 py-0.5 text-xs font-medium text-[var(--amber-dark)]">
            каждые 3 дня
          </span>
          <p className="text-sm font-medium text-[var(--amber-dark)]">Свежее на 3 дня</p>
        </div>
        <TaskList items={templateItems} />
      </div>
      {extraItems.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] px-4 py-3">
          <p className="mb-2 text-sm font-medium">Дополнительно по меню</p>
          {run.menuHint && (
            <p className="mb-2 text-xs text-[var(--muted)]">{run.menuHint}</p>
          )}
          <TaskList items={extraItems} />
        </div>
      )}
      <Link href="/shopping" className="inline-block text-sm text-[var(--accent-dark)] underline">
        Полный список на странице «Закупка»
      </Link>
    </div>
  );
}

export function CookingCalendar() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="👨‍🍳"
          title="Календарь готовки"
          subtitle="Закупки и заготовки по датам — ближайшие 3 дня подсвечены. Свежее — каждые 3 дня."
        />
        <div className="space-y-4">
          {cookingCalendar.map((entry) => {
            const upcoming = isWithinDays(entry.date, 3);
            const today = isToday(entry.date);
            const past = isPast(entry.date) && !today;
            const hasShopping = Boolean(
              entry.shoppingBlocks?.length || entry.freshRunId
            );

            return (
              <Card
                key={entry.id}
                className={cn(
                  today && "ring-2 ring-[var(--accent)] bg-[var(--accent)]/5",
                  upcoming && !today && "border-[var(--amber)] bg-[var(--amber)]/5",
                  past && "opacity-60"
                )}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
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
                  {hasShopping && (
                    <span className="rounded-full bg-[var(--amber)]/20 px-2 py-0.5 text-xs text-[var(--amber-dark)]">
                      закупка
                    </span>
                  )}
                </div>

                {entry.menuHint && !entry.freshRunId && (
                  <p className="mb-3 text-sm text-[var(--muted)]">{entry.menuHint}</p>
                )}

                {entry.shoppingBlocks && entry.shoppingBlocks.length > 0 && (
                  <div className="mb-4 space-y-3">
                    <p className="text-sm font-medium text-[var(--amber-dark)]">Закупка</p>
                    {entry.shoppingBlocks.map((block) => (
                      <ShoppingBlockCard key={block.label} block={block} />
                    ))}
                    <Link href="/shopping" className="inline-block text-sm text-[var(--accent-dark)] underline">
                      Полный список на странице «Закупка»
                    </Link>
                  </div>
                )}

                {entry.freshRunId && !entry.shoppingBlocks?.length && (
                  <FreshRunShopping freshRunId={entry.freshRunId} />
                )}

                {entry.freshRunId && entry.shoppingBlocks?.length ? (
                  <div className="mb-4 border-t border-[var(--border)] pt-4">
                    <FreshRunShopping freshRunId={entry.freshRunId} />
                  </div>
                ) : null}

                {entry.tasks.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-[var(--foreground)]">Готовка</p>
                    <TaskList items={entry.tasks} />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

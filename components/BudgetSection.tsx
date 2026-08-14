"use client";

import { useMemo } from "react";
import {
  BudgetData,
  calcBudgetTotals,
  defaultBudget,
} from "@/data/budget";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatRubles } from "@/lib/format";
import { Card, ProgressBar, SectionTitle } from "@/components/ui";

export function BudgetSection() {
  const [budget, setBudget] = useLocalStorage<BudgetData>("gotovayeda-budget", defaultBudget);
  const { totalExpenses, remainder } = useMemo(() => calcBudgetTotals(budget), [budget]);

  const updateExpense = (id: string, amount: number) => {
    setBudget({
      ...budget,
      expenses: budget.expenses.map((e) =>
        e.id === id ? { ...e, amount: Math.max(0, amount) } : e
      ),
    });
  };

  const updateSalary = (amount: number) => {
    setBudget({ ...budget, salary: Math.max(0, amount) });
  };

  const reset = () => setBudget(defaultBudget);

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          emoji="💰"
          title="Месячный бюджет"
          subtitle="Кликните на сумму, чтобы изменить. Данные сохраняются локально или в аккаунте после входа."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 font-display text-xl font-semibold">Доходы и расходы</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[var(--cream-dark)] px-4 py-3">
                <span className="font-medium">💰 Зарплата</span>
                <EditableAmount value={budget.salary} onChange={updateSalary} highlight />
              </div>
              {budget.expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3"
                >
                  <span>
                    {expense.emoji} {expense.name}
                  </span>
                  <EditableAmount
                    value={expense.amount}
                    onChange={(v) => updateExpense(expense.id, v)}
                  />
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 font-semibold">
                <span>Итого расходов</span>
                <span className="text-[var(--accent-dark)]">{formatRubles(totalExpenses)}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[var(--green-light)] px-4 py-3 font-semibold">
                <span>Остаток</span>
                <span className={remainder >= 0 ? "text-[var(--green)]" : "text-red-600"}>
                  {formatRubles(remainder)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-4 text-sm text-[var(--muted)] underline hover:text-[var(--accent-dark)]"
            >
              Сбросить к начальным значениям
            </button>
          </Card>
          <Card>
            <h3 className="mb-4 font-display text-xl font-semibold">Распределение расходов</h3>
            <div className="space-y-4">
              {budget.expenses.map((expense) => (
                <div key={expense.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>
                      {expense.emoji} {expense.name}
                    </span>
                    <span>{formatRubles(expense.amount)}</span>
                  </div>
                  <ProgressBar value={expense.amount} max={budget.salary} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">
              При текущей структуре {formatRubles(remainder)} в месяц можно направлять на
              досрочное погашение долгов или накопления.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function EditableAmount({
  value,
  onChange,
  highlight,
}: {
  value: number;
  onChange: (v: number) => void;
  highlight?: boolean;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className={`w-28 rounded-lg border px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] ${
        highlight
          ? "border-[var(--accent)] bg-white font-semibold"
          : "border-[var(--border)] bg-[var(--background)]"
      }`}
    />
  );
}

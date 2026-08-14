export interface BudgetExpense {
  id: string;
  emoji: string;
  name: string;
  amount: number;
}

export interface BudgetData {
  salary: number;
  expenses: BudgetExpense[];
}

export const defaultBudget: BudgetData = {
  salary: 161_000,
  expenses: [
    { id: "car", emoji: "🚗", name: "Машина", amount: 30_000 },
    { id: "credit", emoji: "💳", name: "Кредит", amount: 5_000 },
    { id: "girlfriend", emoji: "❤️", name: "Девушке", amount: 7_000 },
    { id: "mortgage", emoji: "🏠", name: "Ипотека", amount: 22_000 },
    { id: "utilities", emoji: "🏠", name: "Коммуналка", amount: 8_000 },
    { id: "food", emoji: "🍗", name: "Еда", amount: 36_000 },
    { id: "gas", emoji: "⛽", name: "Бензин", amount: 14_000 },
  ],
};

export function calcBudgetTotals(budget: BudgetData) {
  const totalExpenses = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainder = budget.salary - totalExpenses;
  return { totalExpenses, remainder };
}

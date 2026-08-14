export interface FoodBudgetCategory {
  id: string;
  name: string;
  limit: number;
  note?: string;
}

export const foodBudgetCategories: FoodBudgetCategory[] = [
  { id: "protein", name: "Мясо, птица, рыба, яйца, молочка", limit: 8_000 },
  { id: "grains", name: "Крупы, мука, хлеб", limit: 3_000 },
  { id: "vegetables", name: "Овощи", limit: 3_000 },
  { id: "fruits", name: "Фрукты (яблоки, бананы)", limit: 2_000 },
  { id: "oils", name: "Масло, соусы, специи, сахар", limit: 2_000 },
  { id: "sweet", name: "Сладкое, чай, какао, выпечка", limit: 1_500 },
  { id: "reserve", name: "Резерв на акции и доп. покупки", limit: 5_500 },
];

export const FOOD_BUDGET_TOTAL = 25_000;

export const foodBudgetNotes = [
  "5 кг макарон уже есть дома — не покупаем.",
  "Резерв 5 500 ₽ лучше не тратить в первую неделю.",
];

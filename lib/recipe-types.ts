export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  order: number;
  text: string;
}

export interface RecipeData {
  id: string;
  title: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  prepTime?: number | null;
  cookTime?: number | null;
  servings: number;
  tips?: string | null;
  imageUrl?: string | null;
  userId?: string | null;
}

export function parseRecipeJson<T>(value: unknown): T {
  return value as T;
}

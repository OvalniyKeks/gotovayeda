import { seedRecipes } from "@/data/seedRecipes";
import { RecipeData } from "@/lib/recipe-types";

export function seedRecipeToData(slug: string): RecipeData | null {
  const seed = seedRecipes[slug];
  if (!seed) return null;

  return {
    id: `seed-${slug}`,
    title: seed.title,
    ingredients: seed.ingredients,
    steps: seed.steps,
    prepTime: seed.prepTime,
    cookTime: seed.cookTime,
    servings: seed.servings,
    tips: seed.tips ?? null,
    imageUrl: null,
    userId: null,
  };
}

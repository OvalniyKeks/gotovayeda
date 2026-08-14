import { notFound } from "next/navigation";
import { dishBySlug } from "@/data/dishes";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { parseRecipeJson, RecipeData } from "@/lib/recipe-types";
import { RecipeView } from "@/components/RecipeView";
import { DishPageClient } from "@/components/DishPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(dishBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const dish = dishBySlug[slug];
  if (!dish) return { title: "Блюдо не найдено" };
  return { title: `${dish.name} — GOTOVAYEDA` };
}

async function getRecipes(slug: string): Promise<RecipeData[]> {
  if (!isDatabaseConfigured()) return [];

  try {
    const dish = await prisma.dish.findUnique({
      where: { slug },
      include: {
        recipes: { orderBy: [{ userId: "asc" }, { createdAt: "desc" }] },
      },
    });
    if (!dish) return [];

    return dish.recipes.map((r) => ({
      id: r.id,
      title: r.title,
      ingredients: parseRecipeJson(r.ingredients),
      steps: parseRecipeJson(r.steps),
      prepTime: r.prepTime,
      cookTime: r.cookTime,
      servings: r.servings,
      tips: r.tips,
      imageUrl: r.imageUrl,
      userId: r.userId,
    }));
  } catch {
    return [];
  }
}

export default async function DishPage({ params }: PageProps) {
  const { slug } = await params;
  const dish = dishBySlug[slug];
  if (!dish) notFound();

  const recipes = await getRecipes(slug);
  const systemRecipe = recipes.find((r) => !r.userId) ?? null;

  return (
    <div className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="text-5xl">{dish.emoji}</span>
          <h1 className="mt-4 font-display text-4xl font-bold">{dish.name}</h1>
        </div>
        {systemRecipe ? (
          <RecipeView recipe={systemRecipe} />
        ) : (
          <p className="mb-8 text-center text-[var(--muted)]">
            Системный рецепт пока не добавлен. Войдите, чтобы создать свой.
          </p>
        )}
        <DishPageClient
          dishSlug={slug}
          dishName={dish.name}
          userRecipes={recipes.filter((r) => r.userId)}
        />
      </div>
    </div>
  );
}

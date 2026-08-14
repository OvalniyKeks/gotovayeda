import { PrismaClient } from "@prisma/client";
import { dishes } from "../data/dishes";
import { seedRecipes } from "../data/seedRecipes";

const prisma = new PrismaClient();

async function main() {
  for (const dish of dishes) {
    await prisma.dish.upsert({
      where: { slug: dish.slug },
      update: {
        name: dish.name,
        category: dish.category,
        emoji: dish.emoji,
      },
      create: {
        slug: dish.slug,
        name: dish.name,
        category: dish.category,
        emoji: dish.emoji,
        isDefault: true,
      },
    });
  }

  for (const [slug, recipe] of Object.entries(seedRecipes)) {
    const dish = await prisma.dish.findUnique({ where: { slug } });
    if (!dish) continue;

    const existing = await prisma.recipe.findFirst({
      where: { dishId: dish.id, userId: null },
    });

    if (existing) {
      await prisma.recipe.update({
        where: { id: existing.id },
        data: {
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          tips: recipe.tips,
        },
      });
    } else {
      await prisma.recipe.create({
        data: {
          dishId: dish.id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          tips: recipe.tips,
        },
      });
    }
  }

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import { dishes } from "../data/dishes";

const prisma = new PrismaClient();

const seedRecipes: Record<
  string,
  {
    title: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients: { name: string; amount: string; unit: string }[];
    steps: { order: number; text: string }[];
    tips?: string;
  }
> = {
  "bliny-s-yablokami": {
    title: "Блины с яблоками и корицей",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: "Мука", amount: "2", unit: "стакана" },
      { name: "Молоко", amount: "500", unit: "мл" },
      { name: "Яйца", amount: "2", unit: "шт." },
      { name: "Сахар", amount: "2", unit: "ст. л." },
      { name: "Яблоки", amount: "3", unit: "шт." },
      { name: "Корица", amount: "1", unit: "ч. л." },
      { name: "Сливочное масло", amount: "30", unit: "г" },
    ],
    steps: [
      { order: 1, text: "Смешать муку, яйца, молоко и сахар до однородного теста." },
      { order: 2, text: "Яблоки нарезать кубиками, потушить с маслом, сахаром и корицей 10–15 минут." },
      { order: 3, text: "Жарить блины на сковороде с двух сторон." },
      { order: 4, text: "Подавать с яблочной начинкой. Часть блинов можно заморозить." },
    ],
    tips: "Сделайте 40–50 блинов за раз — часть заморозьте на неделю.",
  },
  borshch: {
    title: "Борщ",
    prepTime: 20,
    cookTime: 90,
    servings: 6,
    ingredients: [
      { name: "Говядина или курица", amount: "500", unit: "г" },
      { name: "Свёкла", amount: "2", unit: "шт." },
      { name: "Капуста", amount: "300", unit: "г" },
      { name: "Картофель", amount: "3", unit: "шт." },
      { name: "Морковь", amount: "1", unit: "шт." },
      { name: "Лук", amount: "1", unit: "шт." },
      { name: "Томатная паста", amount: "2", unit: "ст. л." },
    ],
    steps: [
      { order: 1, text: "Сварить бульон с мясом 40–50 минут." },
      { order: 2, text: "Обжарить лук, морковь, свёклу с томатной пастой." },
      { order: 3, text: "Добавить картофель и капусту в бульон." },
      { order: 4, text: "Добавить зажарку, варить 15–20 минут. Подавать со сметаной." },
    ],
    tips: "Готовьте 4–5 литров — хватит на 2–3 обеда.",
  },
  plov: {
    title: "Плов",
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    ingredients: [
      { name: "Рис", amount: "400", unit: "г" },
      { name: "Курица или баранина", amount: "700", unit: "г" },
      { name: "Морковь", amount: "3", unit: "шт." },
      { name: "Лук", amount: "2", unit: "шт." },
      { name: "Масло", amount: "100", unit: "мл" },
      { name: "Специи для плова", amount: "1", unit: "уп." },
    ],
    steps: [
      { order: 1, text: "Обжарить мясо до золотистой корочки." },
      { order: 2, text: "Добавить лук и морковь, тушить 10 минут." },
      { order: 3, text: "Залить водой, добавить рис и специи." },
      { order: 4, text: "Тушить под крышкой 30–40 минут на слабом огне." },
    ],
    tips: "Большая кастрюля плова — на 2 дня обеда.",
  },
  syrniki: {
    title: "Сырники",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: "Творог", amount: "400", unit: "г" },
      { name: "Яйцо", amount: "1", unit: "шт." },
      { name: "Мука", amount: "3", unit: "ст. л." },
      { name: "Сахар", amount: "2", unit: "ст. л." },
      { name: "Яблоки", amount: "2", unit: "шт." },
    ],
    steps: [
      { order: 1, text: "Смешать творог, яйцо, сахар и муку." },
      { order: 2, text: "Сформировать сырники, обвалять в муке." },
      { order: 3, text: "Обжарить на сковороде с двух сторон." },
      { order: 4, text: "Подавать с яблочным соусом или сметаной." },
    ],
  },
  "domashnyaya-shaurma": {
    title: "Домашняя шаурма",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    ingredients: [
      { name: "Лепёшки", amount: "2", unit: "шт." },
      { name: "Курица", amount: "300", unit: "г" },
      { name: "Капуста", amount: "150", unit: "г" },
      { name: "Огурец", amount: "1", unit: "шт." },
      { name: "Майонез/соус", amount: "2", unit: "ст. л." },
    ],
    steps: [
      { order: 1, text: "Нарезать капусту, огурец, подогреть курицу." },
      { order: 2, text: "Смазать лепёшку соусом." },
      { order: 3, text: "Выложить начинку и завернуть." },
    ],
    tips: "Используйте остатки запечённой курицы.",
  },
};

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

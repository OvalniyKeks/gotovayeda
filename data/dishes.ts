export type DishCategory = "breakfast" | "lunch" | "dinner" | "snack" | "other";

export interface Dish {
  slug: string;
  name: string;
  category: DishCategory;
  emoji: string;
}

export const dishes: Dish[] = [
  { slug: "bliny-s-yablokami", name: "Блины с яблоками и корицей", category: "breakfast", emoji: "🥞" },
  { slug: "bliny-s-tvorogom", name: "Блины с творогом", category: "breakfast", emoji: "🥞" },
  { slug: "oladi-s-yablokami", name: "Оладьи с яблоками", category: "breakfast", emoji: "🍎" },
  { slug: "syrniki", name: "Сырники", category: "breakfast", emoji: "🧀" },
  { slug: "tvorozhnaya-zapekanka", name: "Творожная запеканка", category: "breakfast", emoji: "🍰" },
  { slug: "ovsyanka-s-yablokom", name: "Овсянка с яблоком и корицей", category: "breakfast", emoji: "🥣" },
  { slug: "goryachie-buterbrody", name: "Горячие бутерброды", category: "breakfast", emoji: "🥪" },
  { slug: "omlety", name: "Омлеты", category: "breakfast", emoji: "🍳" },
  { slug: "yaichnitsa", name: "Яичница", category: "breakfast", emoji: "🍳" },
  { slug: "grenki-s-koritsey", name: "Гренки с корицей", category: "breakfast", emoji: "🍞" },
  { slug: "kurinyy-sup-s-lapshoy", name: "Куриный суп с лапшой", category: "lunch", emoji: "🍲" },
  { slug: "borshch", name: "Борщ", category: "lunch", emoji: "🍲" },
  { slug: "shchi", name: "Щи", category: "lunch", emoji: "🍲" },
  { slug: "plov", name: "Плов", category: "lunch", emoji: "🍚" },
  { slug: "makarony-po-flotski", name: "Макароны по-флотски", category: "lunch", emoji: "🍝" },
  { slug: "makarony-s-kuritsey", name: "Макароны с курицей в томатном соусе", category: "dinner", emoji: "🍝" },
  { slug: "gulyash-s-grechkoy", name: "Гуляш с гречкой", category: "lunch", emoji: "🥘" },
  { slug: "kotlety-s-grechkoy", name: "Котлеты с гречкой", category: "dinner", emoji: "🍖" },
  { slug: "ryba-s-kartofelem", name: "Рыба с картофелем", category: "dinner", emoji: "🐟" },
  { slug: "ryba-s-risom", name: "Рыба с рисом", category: "dinner", emoji: "🐟" },
  { slug: "zapechennaya-kuritsa", name: "Запечённая курица с картофелем", category: "dinner", emoji: "🍗" },
  { slug: "kuritsa-s-risom", name: "Курица с рисом", category: "dinner", emoji: "🍗" },
  { slug: "kartofelnaya-zapekanka", name: "Картофельная запеканка с фаршем", category: "dinner", emoji: "🥔" },
  { slug: "ovoshchnoe-ragu", name: "Овощное рагу с курицей", category: "dinner", emoji: "🥗" },
  { slug: "domashnyaya-shaurma", name: "Домашняя шаурма", category: "dinner", emoji: "🌯" },
  { slug: "domashnyaya-pittsa", name: "Домашняя пицца", category: "dinner", emoji: "🍕" },
  { slug: "makarony-s-syrom", name: "Макароны с сыром и томатным соусом", category: "dinner", emoji: "🍝" },
  { slug: "perlovka-s-myasom", name: "Перловка с мясом", category: "lunch", emoji: "🥘" },
  { slug: "kotlety-s-pyure", name: "Котлеты с пюре", category: "dinner", emoji: "🍖" },
  { slug: "uzhin-iz-ostatkov", name: "Ужин из остатков", category: "other", emoji: "♻️" },
];

export const dishBySlug = Object.fromEntries(dishes.map((d) => [d.slug, d])) as Record<string, Dish>;

export const categoryLabels: Record<DishCategory, string> = {
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус",
  other: "Другое",
};

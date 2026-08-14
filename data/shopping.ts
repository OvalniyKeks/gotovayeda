export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  price: string;
  note?: string;
}

export interface ShoppingCategory {
  id: string;
  title: string;
  emoji: string;
  items: ShoppingItem[];
}

export const shoppingCategories: ShoppingCategory[] = [
  {
    id: "protein",
    title: "Белок и молочные продукты",
    emoji: "🥩",
    items: [
      { id: "chicken", name: "Куриные бёдра/голени или грудка", quantity: "6 кг", price: "≈ 1 700 ₽" },
      { id: "mince", name: "Фарш свиной/домашний", quantity: "3 кг", price: "≈ 1 350 ₽" },
      { id: "liver", name: "Куриная печень", quantity: "2 кг", price: "≈ 500 ₽" },
      { id: "fish", name: "Рыба замороженная", quantity: "2 кг", price: "≈ 800 ₽" },
      { id: "eggs", name: "Яйца", quantity: "90 шт.", price: "≈ 900 ₽" },
      { id: "cottage", name: "Творог", quantity: "8 × 400 г", price: "≈ 1 200 ₽" },
      { id: "milk", name: "Молоко", quantity: "8 л", price: "≈ 720 ₽" },
      { id: "cheese", name: "Сыр", quantity: "0,8–1 кг", price: "≈ 700 ₽" },
    ],
  },
  {
    id: "grains",
    title: "Крупы и основы",
    emoji: "🌾",
    items: [
      { id: "rice", name: "Рис", quantity: "3 кг", price: "≈ 450 ₽" },
      { id: "buckwheat", name: "Гречка", quantity: "2 кг", price: "≈ 300 ₽" },
      { id: "oats", name: "Овсянка", quantity: "2 кг", price: "≈ 250 ₽" },
      { id: "barley", name: "Перловка", quantity: "1 кг", price: "≈ 100 ₽" },
      { id: "flour", name: "Мука", quantity: "2 кг", price: "≈ 130 ₽" },
      { id: "bread", name: "Хлеб/батон", quantity: "≈ 12 шт.", price: "≈ 1 200 ₽" },
      { id: "potato", name: "Картофель", quantity: "8 кг", price: "≈ 500 ₽" },
      { id: "pasta", name: "Макароны", quantity: "5 кг", price: "УЖЕ ЕСТЬ", note: "Не покупаем" },
    ],
  },
  {
    id: "vegetables",
    title: "Овощи",
    emoji: "🥕",
    items: [
      { id: "onion", name: "Лук", quantity: "3 кг", price: "≈ 200 ₽" },
      { id: "carrot", name: "Морковь", quantity: "3 кг", price: "≈ 200 ₽" },
      { id: "cabbage", name: "Капуста", quantity: "3 кг", price: "≈ 250 ₽" },
      { id: "beet", name: "Свёкла", quantity: "2 кг", price: "≈ 150 ₽" },
      { id: "cucumber", name: "Огурцы", quantity: "2 кг", price: "≈ 350 ₽" },
      { id: "tomato", name: "Помидоры", quantity: "2 кг", price: "≈ 400 ₽" },
      { id: "frozen-veg", name: "Замороженные овощи", quantity: "4 кг", price: "≈ 1 000 ₽" },
      { id: "garlic", name: "Чеснок", quantity: "300 г", price: "≈ 150 ₽" },
    ],
  },
  {
    id: "fruits",
    title: "Фрукты",
    emoji: "🍎",
    items: [
      { id: "apples", name: "Яблоки", quantity: "5–6 кг", price: "≈ 800–1 000 ₽" },
      { id: "bananas", name: "Бананы", quantity: "4 кг", price: "≈ 350–450 ₽" },
      { id: "citrus", name: "Апельсины/сезонные фрукты", quantity: "3–4 кг", price: "≈ 500–700 ₽" },
    ],
  },
  {
    id: "baking",
    title: "Для выпечки и вкуса",
    emoji: "🧈",
    items: [
      { id: "sunflower-oil", name: "Подсолнечное масло", quantity: "2 л", price: "≈ 350 ₽" },
      { id: "butter", name: "Сливочное масло", quantity: "400–500 г", price: "≈ 450–550 ₽" },
      { id: "tomato-paste", name: "Томатная паста", quantity: "3 банки", price: "≈ 250 ₽" },
      { id: "sour-cream", name: "Сметана", quantity: "3 × 400 г", price: "≈ 450 ₽" },
      { id: "mayo", name: "Майонез", quantity: "1 уп.", price: "≈ 200 ₽" },
      { id: "sugar", name: "Сахар", quantity: "2 кг", price: "≈ 150 ₽" },
      { id: "spices", name: "Соль и специи", quantity: "комплект", price: "≈ 300 ₽" },
      { id: "cinnamon", name: "Корица", quantity: "1 пачка", price: "≈ 100 ₽" },
      { id: "tea", name: "Чай", quantity: "1 уп.", price: "≈ 300 ₽" },
      { id: "cocoa", name: "Какао", quantity: "1 уп.", price: "≈ 250 ₽" },
    ],
  },
];

export const allShoppingItems = shoppingCategories.flatMap((c) => c.items);

export const shoppingItemById = Object.fromEntries(
  allShoppingItems.map((item) => [item.id, item])
) as Record<string, ShoppingItem>;

export type ShelfLife = "pantry" | "freezer" | "fresh" | "veg";

export interface ShoppingListItem {
  itemId: string;
  quantity: string;
  note?: string;
}

export interface PantrySetup {
  date: string;
  label: string;
  budgetHint: string;
  items: ShoppingListItem[];
  afterShopping: string[];
}

export interface FreezerBatch {
  date: string;
  label: string;
  budgetHint: string;
  items: ShoppingListItem[];
  afterShopping: string[];
}

export const pantrySetup: PantrySetup = {
  date: "2026-08-16",
  label: "Кладовая — один раз 16 августа",
  budgetHint: "≈ 4–5 000 ₽",
  items: [
    { itemId: "rice", quantity: "3 кг" },
    { itemId: "buckwheat", quantity: "2 кг" },
    { itemId: "oats", quantity: "2 кг" },
    { itemId: "barley", quantity: "1 кг" },
    { itemId: "flour", quantity: "2 кг" },
    { itemId: "sunflower-oil", quantity: "2 л" },
    { itemId: "butter", quantity: "400 г" },
    { itemId: "tomato-paste", quantity: "3 банки" },
    { itemId: "sugar", quantity: "2 кг" },
    { itemId: "spices", quantity: "комплект" },
    { itemId: "cinnamon", quantity: "1 пачка" },
    { itemId: "tea", quantity: "1 уп." },
    { itemId: "cocoa", quantity: "1 уп." },
    { itemId: "mayo", quantity: "1 уп." },
    { itemId: "frozen-veg", quantity: "4 кг" },
    { itemId: "garlic", quantity: "300 г" },
  ],
  afterShopping: [
    "Проверить запасы, отложить 5 кг макарон (уже есть дома)",
    "Крупы и бакалею хранить в сухом месте — хватит на весь месяц",
  ],
};

export const freezerBatch: FreezerBatch = {
  date: "2026-08-16",
  label: "Морозилка — один раз 16 августа",
  budgetHint: "≈ 3–4 000 ₽",
  items: [
    { itemId: "chicken", quantity: "6 кг", note: "6 пакетов по 1 кг" },
    { itemId: "mince", quantity: "3 кг", note: "6 пакетов по 0,5 кг" },
    { itemId: "fish", quantity: "2 кг" },
    { itemId: "liver", quantity: "2 кг" },
  ],
  afterShopping: [
    "Сразу разделить мясо и фарш по пакетам и заморозить",
    "Освободить место в морозилке",
    "Доставать порции за день до готовки",
  ],
};

export const freshShoppingTemplate = {
  label: "Свежее — шаблон на 3 дня",
  budgetHint: "≈ 1,5–2,5 тыс. ₽ за поход",
  items: [
    { itemId: "milk", quantity: "1,5–2 л" },
    { itemId: "bread", quantity: "1–2 шт." },
    { itemId: "eggs", quantity: "6–10 шт." },
    { itemId: "cottage", quantity: "1 × 400 г", note: "если сырники/запеканка в меню" },
    { itemId: "cheese", quantity: "150–200 г", note: "по необходимости" },
    { itemId: "bananas", quantity: "0,5–1 кг" },
    { itemId: "apples", quantity: "0,5–1 кг" },
    { itemId: "cucumber", quantity: "0,5 кг", note: "если нужен салат" },
    { itemId: "tomato", quantity: "0,5 кг", note: "если нужен салат" },
    { itemId: "sour-cream", quantity: "1 × 400 г", note: "если суп/борщ на неделе" },
  ],
};

export interface FreshShoppingRun {
  id: string;
  date: string;
  label: string;
  menuHint: string;
  extraItems: ShoppingListItem[];
}

export const freshShoppingRuns: FreshShoppingRun[] = [
  {
    id: "fresh-run-16",
    date: "2026-08-16",
    label: "16 августа — свежее на 3 дня",
    menuHint: "Старт меню 17 авг: блины, суп, курица",
    extraItems: [
      { itemId: "potato", quantity: "2 кг", note: "для супа и гарнира" },
      { itemId: "onion", quantity: "0,5 кг" },
      { itemId: "carrot", quantity: "0,5 кг" },
      { itemId: "apples", quantity: "1,5 кг", note: "для начинки и завтраков" },
      { itemId: "eggs", quantity: "10 шт." },
      { itemId: "milk", quantity: "1,5 л" },
      { itemId: "bread", quantity: "1 шт." },
      { itemId: "cottage", quantity: "1 × 400 г" },
    ],
  },
  {
    id: "fresh-run-19",
    date: "2026-08-19",
    label: "19 августа — свежее на 3 дня",
    menuHint: "Борщ 20–21 авг, сырники, омлеты",
    extraItems: [
      { itemId: "beet", quantity: "1 кг", note: "для борща" },
      { itemId: "cabbage", quantity: "1 кг", note: "для борща" },
      { itemId: "sour-cream", quantity: "1 × 400 г" },
      { itemId: "cottage", quantity: "1 × 400 г" },
    ],
  },
  {
    id: "fresh-run-22",
    date: "2026-08-22",
    label: "22 августа — свежее на 3 дня",
    menuHint: "Плов 22–23 авг, шаурма",
    extraItems: [
      { itemId: "carrot", quantity: "0,5 кг", note: "для плова" },
      { itemId: "onion", quantity: "0,5 кг", note: "для плова" },
      { itemId: "cucumber", quantity: "0,5 кг", note: "для шаурмы" },
    ],
  },
  {
    id: "fresh-run-25",
    date: "2026-08-25",
    label: "25 августа — свежее на 3 дня",
    menuHint: "Запеканка 25–26 авг, сырники",
    extraItems: [
      { itemId: "potato", quantity: "1,5 кг", note: "для запеканки" },
      { itemId: "cottage", quantity: "1 × 400 г" },
    ],
  },
  {
    id: "fresh-run-28",
    date: "2026-08-28",
    label: "28 августа — свежее на 3 дня",
    menuHint: "Щи 28–29 авг",
    extraItems: [
      { itemId: "cabbage", quantity: "1 кг", note: "для щей" },
      { itemId: "sour-cream", quantity: "1 × 400 г" },
    ],
  },
  {
    id: "fresh-run-31",
    date: "2026-08-31",
    label: "31 августа — свежее на 3 дня",
    menuHint: "Плов и пицца из запасов — минимум свежего",
    extraItems: [
      { itemId: "milk", quantity: "1 л" },
      { itemId: "bread", quantity: "1 шт." },
      { itemId: "eggs", quantity: "6 шт." },
    ],
  },
  {
    id: "fresh-run-03",
    date: "2026-09-03",
    label: "3 сентября — свежее на 3 дня",
    menuHint: "Овощное рагу, борщ",
    extraItems: [
      { itemId: "tomato", quantity: "0,5 кг", note: "для рагу" },
      { itemId: "cucumber", quantity: "0,5 кг" },
      { itemId: "cottage", quantity: "1 × 400 г", note: "запеканка 2 сен" },
    ],
  },
  {
    id: "fresh-run-06",
    date: "2026-09-06",
    label: "6 сентября — свежее на 3 дня",
    menuHint: "Суп на 6–8 сен, шаурма",
    extraItems: [
      { itemId: "onion", quantity: "0,3 кг" },
      { itemId: "carrot", quantity: "0,3 кг" },
      { itemId: "potato", quantity: "0,5 кг" },
    ],
  },
  {
    id: "fresh-run-09",
    date: "2026-09-09",
    label: "9 сентября — свежее на 3 дня",
    menuHint: "Щи, курица с картофелем",
    extraItems: [
      { itemId: "potato", quantity: "1 кг" },
      { itemId: "cottage", quantity: "1 × 400 г" },
    ],
  },
  {
    id: "fresh-run-12",
    date: "2026-09-12",
    label: "12 сентября — свежее на 3 дня",
    menuHint: "Финальная неделя — по остаткам, минимум покупок",
    extraItems: [
      { itemId: "milk", quantity: "1 л" },
      { itemId: "bread", quantity: "1 шт." },
      { itemId: "eggs", quantity: "6 шт." },
    ],
  },
];

export const freshRunById = Object.fromEntries(
  freshShoppingRuns.map((run) => [run.id, run])
) as Record<string, FreshShoppingRun>;

export const shoppingTips = [
  "Кладовая и морозилка — один раз 16 августа. Свежее — каждые 3 дня небольшими партиями.",
  "Даты свежих закупок можно сдвинуть на ±1 день — главное не покупать молоко и хлеб «на две недели».",
  "Мясо из морозилки — доставать порцию за день до готовки.",
  "Овощи для супа/борща — только под ближайшую готовку (2–3 дня супа).",
  "Общий чеклист ниже — на весь месяц; отмечайте по мере покупок.",
];

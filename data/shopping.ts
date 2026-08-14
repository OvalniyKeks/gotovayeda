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

export interface ShoppingWaveItem {
  itemId: string;
  quantity: string;
  note?: string;
}

export interface ShoppingWave {
  id: string;
  date: string;
  label: string;
  budgetHint: string;
  items: ShoppingWaveItem[];
  afterShopping?: string[];
}

export const shoppingWaves: ShoppingWave[] = [
  {
    id: "wave-1",
    date: "2026-08-16",
    label: "16 августа — большая стартовая закупка",
    budgetHint: "≈ 12–14 000 ₽",
    items: [
      { itemId: "chicken", quantity: "4 кг", note: "2 кг в морозилку" },
      { itemId: "mince", quantity: "2 кг", note: "1 кг в морозилку" },
      { itemId: "liver", quantity: "1 кг" },
      { itemId: "fish", quantity: "1 кг", note: "в морозилку" },
      { itemId: "eggs", quantity: "40 шт." },
      { itemId: "cottage", quantity: "4 × 400 г" },
      { itemId: "milk", quantity: "4 л" },
      { itemId: "cheese", quantity: "500 г" },
      { itemId: "rice", quantity: "2 кг" },
      { itemId: "buckwheat", quantity: "1,5 кг" },
      { itemId: "oats", quantity: "1 кг" },
      { itemId: "barley", quantity: "0,5 кг" },
      { itemId: "flour", quantity: "2 кг" },
      { itemId: "bread", quantity: "2 шт." },
      { itemId: "potato", quantity: "4 кг" },
      { itemId: "onion", quantity: "2 кг" },
      { itemId: "carrot", quantity: "2 кг" },
      { itemId: "cabbage", quantity: "2 кг" },
      { itemId: "beet", quantity: "1 кг" },
      { itemId: "cucumber", quantity: "0,5 кг" },
      { itemId: "tomato", quantity: "0,5 кг" },
      { itemId: "frozen-veg", quantity: "2 кг" },
      { itemId: "garlic", quantity: "150 г" },
      { itemId: "apples", quantity: "3 кг" },
      { itemId: "bananas", quantity: "2 кг" },
      { itemId: "sunflower-oil", quantity: "2 л" },
      { itemId: "butter", quantity: "400 г" },
      { itemId: "tomato-paste", quantity: "3 банки" },
      { itemId: "sour-cream", quantity: "2 × 400 г" },
      { itemId: "mayo", quantity: "1 уп." },
      { itemId: "sugar", quantity: "2 кг" },
      { itemId: "spices", quantity: "комплект" },
      { itemId: "cinnamon", quantity: "1 пачка" },
      { itemId: "tea", quantity: "1 уп." },
      { itemId: "cocoa", quantity: "1 уп." },
    ],
    afterShopping: [
      "Мясо и фарш разделить по пакетам 0,5–1 кг и заморозить",
      "Освободить место в морозилке",
      "Проверить запасы, отложить 5 кг макарон (уже есть дома)",
    ],
  },
  {
    id: "wave-2",
    date: "2026-08-24",
    label: "24 августа — свежая закупка",
    budgetHint: "≈ 3–4 000 ₽",
    items: [
      { itemId: "chicken", quantity: "1,5 кг", note: "или из морозилки" },
      { itemId: "mince", quantity: "1 кг" },
      { itemId: "eggs", quantity: "20 шт." },
      { itemId: "cottage", quantity: "2 × 400 г" },
      { itemId: "milk", quantity: "2 л" },
      { itemId: "cheese", quantity: "300 г" },
      { itemId: "bread", quantity: "4 шт." },
      { itemId: "cabbage", quantity: "1 кг" },
      { itemId: "cucumber", quantity: "1 кг" },
      { itemId: "tomato", quantity: "1 кг" },
      { itemId: "apples", quantity: "1,5 кг" },
      { itemId: "bananas", quantity: "1,5 кг" },
      { itemId: "sour-cream", quantity: "1 × 400 г" },
    ],
    afterShopping: [
      "Достать мясо и котлеты из морозилки по плану на неделю",
    ],
  },
  {
    id: "wave-3",
    date: "2026-09-04",
    label: "4 сентября — точечная закупка",
    budgetHint: "≈ 1,5–2 000 ₽",
    items: [
      { itemId: "eggs", quantity: "10–15 шт.", note: "если заканчиваются" },
      { itemId: "milk", quantity: "1–2 л", note: "по остаткам" },
      { itemId: "bread", quantity: "2 шт." },
      { itemId: "cottage", quantity: "1 × 400 г", note: "при необходимости" },
      { itemId: "cucumber", quantity: "0,5 кг", note: "1–2 овоща по выбору" },
      { itemId: "tomato", quantity: "0,5 кг", note: "1–2 овоща по выбору" },
      { itemId: "apples", quantity: "1 кг", note: "или бананы" },
    ],
    afterShopping: [
      "Проверить остатки круп, мяса и заморозки перед покупкой",
      "Не тратить резервный бюджет без необходимости",
    ],
  },
  {
    id: "wave-4",
    date: "2026-09-07",
    label: "7 сентября — свежая закупка",
    budgetHint: "≈ 2–3 000 ₽",
    items: [
      { itemId: "bread", quantity: "3 шт." },
      { itemId: "milk", quantity: "2 л" },
      { itemId: "eggs", quantity: "15 шт." },
      { itemId: "cottage", quantity: "2 × 400 г" },
      { itemId: "cucumber", quantity: "1 кг" },
      { itemId: "tomato", quantity: "1 кг" },
      { itemId: "bananas", quantity: "1,5 кг" },
      { itemId: "apples", quantity: "1,5 кг" },
    ],
    afterShopping: [
      "Сразу после закупки — большая готовка: котлеты, курица, гарнир",
    ],
  },
];

export const shoppingTips = [
  "4 волны закупок на месяц — даты и списки см. блок «Когда покупать» ниже или календарь готовки.",
  "16 августа — большая стартовая закупка на 7–10 дней + готовка в тот же день.",
  "24 августа и 7 сентября — свежие овощи, фрукты, хлеб и молочка.",
  "4 сентября — точечная закупка только по остаткам.",
  "Мясо сразу разделить по пакетам на 0,5–1 кг и заморозить.",
];

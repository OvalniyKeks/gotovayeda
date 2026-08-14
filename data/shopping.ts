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

export const shoppingTips = [
  "Первая закупка: мясо, крупы, яйца, молочка на 7–10 дней, заморозка, картофель, лук, морковь, яблоки и продукты для выпечки.",
  "Вторая закупка: свежие овощи, фрукты, хлеб и молочка.",
  "Третья: повтор свежих продуктов.",
  "Мясо сразу разделить по пакетам на 0,5–1 кг и заморозить.",
];

export const allShoppingItems = shoppingCategories.flatMap((c) => c.items);

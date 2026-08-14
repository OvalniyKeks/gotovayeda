export interface MenuMeal {
  label: string;
  dishSlug: string;
  dishName: string;
}

export interface MenuDay {
  day: number;
  date: string;
  breakfast: MenuMeal;
  lunch: MenuMeal;
  dinner: MenuMeal;
}

const meal = (label: string, dishSlug: string, dishName: string): MenuMeal => ({
  label,
  dishSlug,
  dishName,
});

export const PLAN_START_DATE = "2026-08-17";
export const PLAN_END_DATE = "2026-09-15";

export const menuDays: MenuDay[] = [
  { day: 1, date: "2026-08-17", breakfast: meal("Завтрак", "bliny-s-yablokami", "Блины с яблоком и корицей"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп с лапшой"), dinner: meal("Ужин", "zapechennaya-kuritsa", "Запечённая курица + картофель + салат") },
  { day: 2, date: "2026-08-18", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка + банан + корица"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "kotlety-s-grechkoy", "Гречка + котлеты + овощи") },
  { day: 3, date: "2026-08-19", breakfast: meal("Завтрак", "omlety", "Омлет + сыр + хлеб"), lunch: meal("Обед", "makarony-po-flotski", "Макароны по-флотски"), dinner: meal("Ужин", "uzhin-iz-ostatkov", "Остатки макарон + салат") },
  { day: 4, date: "2026-08-20", breakfast: meal("Завтрак", "syrniki", "Сырники + яблочный соус"), lunch: meal("Обед", "borshch", "Борщ"), dinner: meal("Ужин", "kuritsa-s-risom", "Курица + рис + овощи") },
  { day: 5, date: "2026-08-21", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка с яблоком"), lunch: meal("Обед", "borshch", "Борщ"), dinner: meal("Ужин", "ryba-s-kartofelem", "Рыба + картофель") },
  { day: 6, date: "2026-08-22", breakfast: meal("Завтрак", "goryachie-buterbrody", "Горячие бутерброды + яйца"), lunch: meal("Обед", "plov", "Плов"), dinner: meal("Ужин", "plov", "Плов + салат") },
  { day: 7, date: "2026-08-23", breakfast: meal("Завтрак", "bliny-s-tvorogom", "Блинчики с творогом"), lunch: meal("Обед", "plov", "Плов"), dinner: meal("Ужин", "domashnyaya-shaurma", "Домашняя шаурма") },
  { day: 8, date: "2026-08-24", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка + банан"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "makarony-s-kuritsey", "Макароны с курицей в томатном соусе") },
  { day: 9, date: "2026-08-25", breakfast: meal("Завтрак", "omlety", "Омлет с помидорами"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "kartofelnaya-zapekanka", "Картофельная запеканка с фаршем") },
  { day: 10, date: "2026-08-26", breakfast: meal("Завтрак", "syrniki", "Творог + яблоко + корица"), lunch: meal("Обед", "kartofelnaya-zapekanka", "Запеканка"), dinner: meal("Ужин", "gulyash-s-grechkoy", "Гречка + гуляш") },
  { day: 11, date: "2026-08-27", breakfast: meal("Завтрак", "oladi-s-yablokami", "Оладьи с яблоком"), lunch: meal("Обед", "gulyash-s-grechkoy", "Гуляш + гречка"), dinner: meal("Ужин", "ryba-s-risom", "Рыба + рис + овощи") },
  { day: 12, date: "2026-08-28", breakfast: meal("Завтрак", "yaichnitsa", "Яйца + сыр + хлеб"), lunch: meal("Обед", "shchi", "Щи"), dinner: meal("Ужин", "makarony-s-kuritsey", "Макароны с мясным соусом") },
  { day: 13, date: "2026-08-29", breakfast: meal("Завтрак", "syrniki", "Сырники"), lunch: meal("Обед", "shchi", "Щи"), dinner: meal("Ужин", "kotlety-s-pyure", "Куриные бёдра + пюре") },
  { day: 14, date: "2026-08-30", breakfast: meal("Завтрак", "bliny-s-yablokami", "Блины с яблоком и корицей"), lunch: meal("Обед", "plov", "Плов"), dinner: meal("Ужин", "plov", "Плов + салат") },
  { day: 15, date: "2026-08-31", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка + банан"), lunch: meal("Обед", "plov", "Плов"), dinner: meal("Ужин", "domashnyaya-pittsa", "Домашняя пицца") },
  { day: 16, date: "2026-09-01", breakfast: meal("Завтрак", "omlety", "Омлет + овощи"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "kotlety-s-grechkoy", "Котлеты + гречка") },
  { day: 17, date: "2026-09-02", breakfast: meal("Завтрак", "tvorozhnaya-zapekanka", "Творожная запеканка"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "makarony-s-syrom", "Макароны с сыром и томатным соусом") },
  { day: 18, date: "2026-09-03", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка с яблоком"), lunch: meal("Обед", "borshch", "Борщ"), dinner: meal("Ужин", "zapechennaya-kuritsa", "Запечённая курица + рис") },
  { day: 19, date: "2026-09-04", breakfast: meal("Завтрак", "yaichnitsa", "Яичница + бутерброды"), lunch: meal("Обед", "borshch", "Борщ"), dinner: meal("Ужин", "ryba-s-kartofelem", "Рыба + картофель + салат") },
  { day: 20, date: "2026-09-05", breakfast: meal("Завтрак", "syrniki", "Сырники + яблочный соус"), lunch: meal("Обед", "perlovka-s-myasom", "Перловка с мясом"), dinner: meal("Ужин", "ovoshchnoe-ragu", "Овощное рагу + курица") },
  { day: 21, date: "2026-09-06", breakfast: meal("Завтрак", "bliny-s-yablokami", "Блинчики с яблоком"), lunch: meal("Обед", "perlovka-s-myasom", "Перловка с мясом"), dinner: meal("Ужин", "domashnyaya-shaurma", "Домашняя шаурма") },
  { day: 22, date: "2026-09-07", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка + банан"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "makarony-po-flotski", "Макароны по-флотски") },
  { day: 23, date: "2026-09-08", breakfast: meal("Завтрак", "omlety", "Омлет + сыр"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп"), dinner: meal("Ужин", "kartofelnaya-zapekanka", "Картофельная запеканка") },
  { day: 24, date: "2026-09-09", breakfast: meal("Завтрак", "oladi-s-yablokami", "Оладьи с яблоком"), lunch: meal("Обед", "kartofelnaya-zapekanka", "Запеканка"), dinner: meal("Ужин", "kotlety-s-grechkoy", "Гречка + котлеты") },
  { day: 25, date: "2026-09-10", breakfast: meal("Завтрак", "syrniki", "Творог + фрукты"), lunch: meal("Обед", "shchi", "Щи"), dinner: meal("Ужин", "zapechennaya-kuritsa", "Курица + картофель") },
  { day: 26, date: "2026-09-11", breakfast: meal("Завтрак", "grenki-s-koritsey", "Гренки с корицей + яйцо"), lunch: meal("Обед", "shchi", "Щи"), dinner: meal("Ужин", "ryba-s-risom", "Рыба + рис") },
  { day: 27, date: "2026-09-12", breakfast: meal("Завтрак", "bliny-s-yablokami", "Блины с яблоком и корицей"), lunch: meal("Обед", "plov", "Плов"), dinner: meal("Ужин", "plov", "Плов + салат") },
  { day: 28, date: "2026-09-13", breakfast: meal("Завтрак", "syrniki", "Сырники"), lunch: meal("Обед", "uzhin-iz-ostatkov", "Остатки заготовок"), dinner: meal("Ужин", "domashnyaya-pittsa", "Домашняя пицца/лепёшки") },
  { day: 29, date: "2026-09-14", breakfast: meal("Завтрак", "ovsyanka-s-yablokom", "Овсянка + яблоко"), lunch: meal("Обед", "kurinyy-sup-s-lapshoy", "Куриный суп или заморозка"), dinner: meal("Ужин", "kotlety-s-pyure", "Котлеты + пюре") },
  { day: 30, date: "2026-09-15", breakfast: meal("Завтрак", "oladi-s-yablokami", "Блины/оладьи из остатков"), lunch: meal("Обед", "uzhin-iz-ostatkov", "Остатки"), dinner: meal("Ужин", "uzhin-iz-ostatkov", "Свободный ужин из запасов") },
];

export function formatMenuDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(new Date(dateStr));
}

export function formatPlanDateRange(): string {
  const fmt = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${fmt.format(new Date(PLAN_START_DATE))} — ${fmt.format(new Date(PLAN_END_DATE))}`;
}

export function getTodayMenuDay(): MenuDay | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return menuDays.find((d) => d.date === today);
}

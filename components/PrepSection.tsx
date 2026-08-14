import { monthRules, prepItems, quickMeals } from "@/data/prep";
import { Card, SectionTitle } from "@/components/ui";

export function PrepSection() {
  return (
    <>
      <section id="prep" className="scroll-mt-24 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            emoji="❄️"
            title="Заготовки"
            subtitle="Готовьте партиями и замораживайте — так проще держать план."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {prepItems.map((item) => (
              <Card key={item}>
                <p>{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--cream-dark)] px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionTitle emoji="⚡" title="Быстрые блюда" subtitle="Когда готовить совсем не хочется." />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-sm text-[var(--muted)]">
                  <th className="pb-3 pr-4">Блюдо</th>
                  <th className="pb-3 pr-4">Что нужно</th>
                  <th className="pb-3">Время</th>
                </tr>
              </thead>
              <tbody>
                {quickMeals.map((meal) => (
                  <tr key={meal.name} className="border-b border-[var(--border)]">
                    <td className="py-3 pr-4 font-medium">{meal.name}</td>
                    <td className="py-3 pr-4 text-[var(--muted)]">{meal.needs}</td>
                    <td className="py-3 text-[var(--accent-dark)]">{meal.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="rules" className="scroll-mt-24 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionTitle emoji="📋" title="Правила месяца" />
          <div className="grid gap-3 md:grid-cols-2">
            {monthRules.map((rule, i) => (
              <Card key={rule} className="flex gap-3">
                <span className="font-display text-xl text-[var(--accent)]">{i + 1}</span>
                <p>{rule}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

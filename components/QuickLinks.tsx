import Link from "next/link";
import { quickLinks } from "@/lib/navigation";
import { Card } from "@/components/ui";

export function QuickLinks() {
  return (
    <section className="px-4 pb-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 font-display text-2xl font-semibold md:text-3xl">Разделы</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="text-3xl">{item.emoji}</div>
                <div className="mt-2 font-display text-lg font-semibold">{item.label}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Нет сети — GOTOVAYEDA",
};

export default function OfflinePage() {
  return (
    <div className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-lg text-center">
        <span className="text-5xl">📡</span>
        <h1 className="mt-4 font-display text-3xl font-bold">Нет подключения к сети</h1>
        <p className="mt-4 text-[var(--muted)]">
          Меню, закупки и прогресс сохранены на устройстве. Откройте разделы, которые вы уже
          посещали онлайн.
        </p>
        <nav className="mt-8 flex flex-col gap-3">
          <Link
            href="/menu"
            className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:bg-[var(--accent-dark)]"
          >
            Меню
          </Link>
          <Link
            href="/shopping"
            className="rounded-full border border-[var(--border)] px-6 py-3 font-medium hover:bg-[var(--cream-dark)]"
          >
            Закупки
          </Link>
          <Link
            href="/cooking"
            className="rounded-full border border-[var(--border)] px-6 py-3 font-medium hover:bg-[var(--cream-dark)]"
          >
            Календарь готовки
          </Link>
        </nav>
      </div>
    </div>
  );
}

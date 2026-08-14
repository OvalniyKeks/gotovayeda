"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Card, SectionTitle } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-md">
          <Card>
            <SectionTitle title="Авторизация не настроена" />
            <p className="text-[var(--muted)]">
              Добавьте переменные окружения Supabase в <code>.env.local</code> или
              на Vercel, чтобы включить вход и синхронизацию.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Проверьте почту для подтверждения регистрации.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setMessage(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-md">
        <SectionTitle emoji="🔐" title="Вход" subtitle="Синхронизация бюджета, закупок и рецептов." />
        <Card>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input"
            />
            {message && <p className="text-sm text-[var(--muted)]">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[var(--accent)] py-3 font-medium text-white hover:bg-[var(--accent-dark)] disabled:opacity-50"
            >
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-3 w-full rounded-full border border-[var(--border)] py-3 font-medium hover:bg-[var(--cream-dark)]"
          >
            Войти через Google
          </button>
          <div className="mt-4 flex justify-between text-sm">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[var(--accent-dark)] underline"
            >
              {mode === "login" ? "Создать аккаунт" : "Уже есть аккаунт"}
            </button>
            <button type="button" onClick={handleLogout} className="text-[var(--muted)] underline">
              Выйти
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

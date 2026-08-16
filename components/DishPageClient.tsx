"use client";

import { useEffect, useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { RecipeData } from "@/lib/recipe-types";
import { RecipeEditor } from "@/components/RecipeEditor";
import { RecipeView } from "@/components/RecipeView";

interface DishPageClientProps {
  dishSlug: string;
  dishName: string;
  userRecipes: RecipeData[];
}

export function DishPageClient({
  dishSlug,
  dishName,
  userRecipes,
}: DishPageClientProps) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [offline, setOffline] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    const updateOnline = () => setOffline(!navigator.onLine);
    updateOnline();
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  useEffect(() => {
    if (!supabaseReady) return;
    createClient()
      .auth.getUser()
      .then(({ data }) => setIsAuthed(Boolean(data.user)));
  }, [supabaseReady]);

  return (
    <div className="mt-12 space-y-8">
      {userRecipes.map((recipe) => (
        <div key={recipe.id}>
          <p className="mb-2 text-sm text-[var(--muted)]">Ваш рецепт</p>
          <RecipeView recipe={recipe} />
        </div>
      ))}

      {offline && supabaseReady ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          Редактирование рецептов доступно только при подключении к сети.
        </p>
      ) : supabaseReady && isAuthed ? (
        <>
          {!showEditor && (
            <button
              type="button"
              onClick={() => setShowEditor(true)}
              className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:bg-[var(--accent-dark)]"
            >
              {userRecipes.length ? "Добавить ещё рецепт" : "Добавить свой рецепт"}
            </button>
          )}
          {showEditor && (
            <RecipeEditor
              dishSlug={dishSlug}
              dishName={dishName}
              initial={userRecipes[0]}
            />
          )}
        </>
      ) : supabaseReady ? (
        <p className="text-center text-[var(--muted)]">
          <a href="/login" className="text-[var(--accent-dark)] underline">
            Войдите
          </a>
          , чтобы добавить свой рецепт.
        </p>
      ) : null}
    </div>
  );
}

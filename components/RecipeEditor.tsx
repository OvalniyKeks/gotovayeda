"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RecipeData, RecipeIngredient, RecipeStep } from "@/lib/recipe-types";
import { Card } from "@/components/ui";

interface RecipeEditorProps {
  dishSlug: string;
  dishName: string;
  initial?: RecipeData;
}

export function RecipeEditor({ dishSlug, dishName, initial }: RecipeEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? dishName);
  const [prepTime, setPrepTime] = useState(String(initial?.prepTime ?? ""));
  const [cookTime, setCookTime] = useState(String(initial?.cookTime ?? ""));
  const [servings, setServings] = useState(String(initial?.servings ?? 2));
  const [tips, setTips] = useState(initial?.tips ?? "");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    initial?.ingredients?.length
      ? initial.ingredients
      : [{ name: "", amount: "", unit: "" }]
  );
  const [steps, setSteps] = useState<RecipeStep[]>(
    initial?.steps?.length ? initial.steps : [{ order: 1, text: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/recipes", {
        method: initial?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initial?.id,
          dishSlug,
          title,
          prepTime: prepTime ? Number(prepTime) : null,
          cookTime: cookTime ? Number(cookTime) : null,
          servings: Number(servings) || 2,
          tips: tips || null,
          ingredients: ingredients.filter((i) => i.name.trim()),
          steps: steps.filter((s) => s.text.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Не удалось сохранить");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="space-y-6">
      <h2 className="font-display text-2xl font-semibold">
        {initial ? "Редактировать рецепт" : "Добавить рецепт"}
      </h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Название">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Порций">
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Подготовка (мин)">
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Готовка (мин)">
          <input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            className="input"
          />
        </Field>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Ингредиенты</h3>
          <button
            type="button"
            className="text-sm text-[var(--accent-dark)]"
            onClick={() =>
              setIngredients([...ingredients, { name: "", amount: "", unit: "" }])
            }
          >
            + Добавить
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((item, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <input
                placeholder="Продукт"
                value={item.name}
                onChange={(e) => {
                  const next = [...ingredients];
                  next[i] = { ...item, name: e.target.value };
                  setIngredients(next);
                }}
                className="input"
              />
              <input
                placeholder="Кол-во"
                value={item.amount}
                onChange={(e) => {
                  const next = [...ingredients];
                  next[i] = { ...item, amount: e.target.value };
                  setIngredients(next);
                }}
                className="input"
              />
              <input
                placeholder="Ед."
                value={item.unit}
                onChange={(e) => {
                  const next = [...ingredients];
                  next[i] = { ...item, unit: e.target.value };
                  setIngredients(next);
                }}
                className="input"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Шаги</h3>
          <button
            type="button"
            className="text-sm text-[var(--accent-dark)]"
            onClick={() =>
              setSteps([...steps, { order: steps.length + 1, text: "" }])
            }
          >
            + Добавить шаг
          </button>
        </div>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <textarea
              key={i}
              placeholder={`Шаг ${step.order}`}
              value={step.text}
              onChange={(e) => {
                const next = [...steps];
                next[i] = { ...step, text: e.target.value };
                setSteps(next);
              }}
              className="input min-h-[80px] w-full"
            />
          ))}
        </div>
      </div>
      <Field label="Совет">
        <textarea
          value={tips}
          onChange={(e) => setTips(e.target.value)}
          className="input min-h-[80px] w-full"
        />
      </Field>
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:bg-[var(--accent-dark)] disabled:opacity-50"
      >
        {saving ? "Сохранение..." : "Сохранить рецепт"}
      </button>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-[var(--muted)]">{label}</span>
      {children}
    </label>
  );
}

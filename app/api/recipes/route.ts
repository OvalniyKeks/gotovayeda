import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

async function getUser() {
  if (!isDatabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function ensureUser(userId: string, email: string) {
  return prisma.user.upsert({
    where: { id: userId },
    update: { email },
    create: { id: userId, email },
  });
}

export async function POST(request: Request) {
  const authUser = await getUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const dish = await prisma.dish.findUnique({ where: { slug: body.dishSlug } });
  if (!dish) {
    return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  }

  await ensureUser(authUser.id, authUser.email ?? "");

  const recipe = await prisma.recipe.create({
    data: {
      dishId: dish.id,
      userId: authUser.id,
      title: body.title,
      ingredients: body.ingredients,
      steps: body.steps,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      servings: body.servings ?? 2,
      tips: body.tips,
    },
  });

  return NextResponse.json({ id: recipe.id });
}

export async function PUT(request: Request) {
  const authUser = await getUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const existing = await prisma.recipe.findFirst({
    where: { id: body.id, userId: authUser.id },
  });

  if (!existing) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const recipe = await prisma.recipe.update({
    where: { id: body.id },
    data: {
      title: body.title,
      ingredients: body.ingredients,
      steps: body.steps,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      servings: body.servings ?? 2,
      tips: body.tips,
    },
  });

  return NextResponse.json({ id: recipe.id });
}

export async function DELETE(request: Request) {
  const authUser = await getUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.recipe.deleteMany({
    where: { id, userId: authUser.id },
  });

  return NextResponse.json({ ok: true });
}

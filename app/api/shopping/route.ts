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

export async function GET() {
  const authUser = await getUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: authUser.id } });
  return NextResponse.json({ shoppingState: user?.shoppingState ?? {} });
}

export async function POST(request: Request) {
  const authUser = await getUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shoppingState = await request.json();
  await ensureUser(authUser.id, authUser.email ?? "");
  await prisma.user.update({
    where: { id: authUser.id },
    data: { shoppingState },
  });

  return NextResponse.json({ ok: true });
}

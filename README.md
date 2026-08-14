# GOTOVAYEDA

План питания на 30 дней для двоих: меню, закупки, бюджет, календарь готовки и рецепты.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Деплой на Vercel + Supabase

### 1. Vercel
1. Импортируйте репозиторий на [vercel.com](https://vercel.com)
2. Deploy — сайт сразу работает через localStorage

### 2. Supabase (через интеграцию Vercel)
1. Vercel → Project → **Storage** → **Connect Supabase**
2. Vercel автоматически добавит переменные (`NEXT_PUBLIC_SUPABASE_URL`, `POSTGRES_PRISMA_URL` и др.) — это нормально

### 3. Создать таблицы (один раз, локально)
Создайте `.env.local` с ключами из Supabase (Settings → Database → Connection string):

```bash
cp .env.example .env.local
npm install
npx prisma migrate deploy
npm run db:seed
```

Затем `git push` — Vercel пересоберёт проект.

### 4. Auth redirect
Supabase → Authentication → URL Configuration:
- **Site URL:** `https://ваш-проект.vercel.app`
- **Redirect URLs:** `https://ваш-проект.vercel.app/auth/callback`

## Без Supabase

Сайт работает полностью offline-first через localStorage:
- бюджет, закупки, прогресс меню сохраняются локально
- рецепты доступны только после настройки БД

## Стек

- Next.js 16 + TypeScript + Tailwind CSS
- Supabase Auth + PostgreSQL + Prisma
- Vercel для деплоя

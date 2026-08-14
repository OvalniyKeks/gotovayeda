# GOTOVAYEDA

План питания на 30 дней для двоих: меню, закупки, бюджет, календарь готовки и рецепты.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Деплой на Vercel

1. Загрузите репозиторий на GitHub
2. Импортируйте проект в [Vercel](https://vercel.com)
3. Добавьте переменные окружения из `.env.example`
4. Deploy

## Supabase (авторизация + рецепты)

1. Создайте проект на [supabase.com](https://supabase.com)
2. Скопируйте URL и anon key в `.env.local`
3. Скопируйте connection strings в `DATABASE_URL` и `DIRECT_URL`
4. Выполните миграции:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

5. В Supabase Dashboard включите Email и Google OAuth
6. Добавьте redirect URL: `https://your-domain.com/auth/callback`

## Без Supabase

Сайт работает полностью offline-first через localStorage:
- бюджет, закупки, прогресс меню сохраняются локально
- рецепты доступны только после настройки БД

## Стек

- Next.js 16 + TypeScript + Tailwind CSS
- Supabase Auth + PostgreSQL + Prisma
- Vercel для деплоя

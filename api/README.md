# Tactyqal Blog API

Express 5 + TypeScript + Prisma + PostgreSQL.

## Run

```bash
cp .env.example .env      # fill in DATABASE_URL + JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run db:seed           # creates the admin user
npm run dev
```

## Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/auth/login | – | `{email, password}` → `{token}` |
| GET | /api/auth/me | ✔ | |
| GET | /api/posts | – | `?page&limit&q&category&tag`; admins may add `status=DRAFT\|PUBLISHED\|ALL` |
| GET | /api/posts/:slug | – | drafts visible to admins only |
| POST | /api/posts | ✔ | title, excerpt, content (markdown), status, category, tags[] |
| PATCH | /api/posts/:id | ✔ | partial update; slug follows title |
| DELETE | /api/posts/:id | ✔ | |
| GET | /api/categories, /api/tags | – | with published post counts |

# Fullstack F1 World Champions Project

## 🚀 Project Overview

This project is a fullstack web application that allows users to browse Formula 1 World Champions and their race data.

The application is built using a monorepo structure and consists of:

- **Backend API**: Node.js, Express, TypeScript, Prisma, PostgreSQL, Redis
- **Frontend UI**: React, Vite, Zustand, TailwindCSS
- **Infrastructure**: Docker Compose (Postgres & Redis)
---
## 🔧 Tech Stack

### Backend

- Node.js 20
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL 15
- Redis 7 (ioredis)
- Dockerized backend

### Frontend

- React 19
- Vite
- Zustand (state management)
- TailwindCSS
- Vitest + Testing Library (for testing)

### Infrastructure

- Docker Compose (for local development)
- PostgreSQL 15
- Redis 7
- pnpm as package manager

---

```bash
fullstack-assignment/
  backend/
    Dockerfile            -> Dockerfile
    package.json
    pnpm-lock.yaml
    prisma/               -> Prisma schema & migrations
    src/                  -> Express backend source code
    docker-entrypoint.sh
  frontend/               -> React frontend codebase
  infrastructure/         -> Docker Compose files for Postgres/Redis
  docker-compose.yml      -> Infra compose file
  start-all.sh            -> Unified local startup script
```
## 🐳 Local Development

### 1️⃣ Spin up infrastructure (Postgres & Redis)

```bash
cd infrastructure
docker-compose up -ds
```

## 2️⃣ Run fullstack application

From project root:

```bash
./start-all.sh
```

## 🎥 Demo Video

[Watch demo on Monosnap](https://monosnap.com/file/k1rTTf0dzm7bR6QIn4PvxdWZO8YoES)

## Access URLs

- **Frontend UI:** [http://localhost:5173](http://localhost:5173)
- **Backend API Docs (Swagger):** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Environment variables required (.env in backend directory)

| Key          | Value (Example)                 |
|--------------|----------------------------------|
| DATABASE_URL | postgresql://postgres:postgres@localhost:5432/f1 |
| REDIS_URL    | redis://localhost:6379    |
| PORT         | 3000    |

## 🧪 Testing

- **Backend tests:** `pnpm test` (Vitest)
- **Frontend tests:** `pnpm test` (Vitest + Testing Library)

## 🎨 UI & Visuals

- Custom **car loader animation** while data is being fetched.
- Swagger API Docs styled with a **pink theme** for extra visual flair.

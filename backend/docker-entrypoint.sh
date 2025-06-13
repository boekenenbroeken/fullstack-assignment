#!/bin/sh

set -e

echo "🔧 Generating Prisma client..."
pnpm prisma generate

echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running seed script..."
pnpm run seed

echo "🚀 Starting the server..."
exec "$@"

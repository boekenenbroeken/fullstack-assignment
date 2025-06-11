#!/bin/sh

set -e

echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running seed script..."
pnpm run seed

echo "🚀 Starting the server..."
exec "$@"

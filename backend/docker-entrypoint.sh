#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "📦 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running seed script..."
npm run seed

echo "🚀 Starting the server..."
exec "$@"

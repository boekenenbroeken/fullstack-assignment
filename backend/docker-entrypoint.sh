#!/usr/bin/env sh
set -e

# run prisma migrations (in production mode)
npx prisma migrate deploy

# then start the server
npm run start

FROM node:20

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g pnpm

COPY backend/package.json .
COPY backend/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY backend/. .

RUN pnpm prisma generate

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["pnpm", "start"]

ENV PORT=3000

FROM node:20

WORKDIR /app

# Merge apt-get + npm + pnpm into single RUN
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g pnpm

# Copy package files first for caching
COPY backend/package.json ./package.json
COPY backend/pnpm-lock.yaml ./pnpm-lock.yaml

# Install Node dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY backend/. .

# Generate prisma client
RUN pnpm prisma generate

# Make entrypoint executable
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["pnpm", "start"]

ENV PORT=3000

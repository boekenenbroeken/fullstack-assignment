FROM node:20

WORKDIR /app

# Copy package.json and lockfile first for better caching
COPY backend/package.json ./package.json
COPY backend/pnpm-lock.yaml ./pnpm-lock.yaml

# Install pnpm and backend dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile && \
    apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Copy the rest of backend source code
COPY backend/. .

# Generate prisma client
RUN pnpm prisma generate

# Set entrypoint
COPY backend/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["pnpm", "start"]

# Optional but safe to include:
ENV PORT=3000

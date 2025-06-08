FROM node:20

WORKDIR /app

# copy package.json + lockfile
COPY package*.json ./

# install deps first
RUN npm install

# copy your Prisma schema and source
COPY prisma ./prisma
COPY . .

# generate Prisma client (build both engines)
RUN npx prisma generate

# copy entrypoint script and set it
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

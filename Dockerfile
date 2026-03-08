FROM node:18

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm install

COPY backend .

RUN npx prisma generate --schema=prisma/schema.prisma

RUN npm run build

EXPOSE 10000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
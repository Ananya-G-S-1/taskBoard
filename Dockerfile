FROM node:18

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm install

COPY backend .

# generate prisma client
RUN npx prisma generate

# build typescript
RUN npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]
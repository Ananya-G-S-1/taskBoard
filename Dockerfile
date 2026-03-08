FROM node:18

WORKDIR /app

# copy backend package files
COPY backend/package*.json ./backend/

WORKDIR /app/backend

# install dependencies
RUN npm install

# copy backend source
COPY backend .

# generate prisma client using local prisma
RUN npx prisma generate --schema=prisma/schema.prisma

RUN npx prisma migrate deploy

# build typescript
RUN npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]
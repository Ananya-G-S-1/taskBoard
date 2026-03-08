FROM node:18

WORKDIR /app

# copy backend files
COPY backend/package*.json ./backend/

# install dependencies
WORKDIR /app/backend
RUN npm install

# copy backend source
COPY backend .

# build typescript
RUN npm run build

EXPOSE 10000

CMD ["node", "dist/server.js"]


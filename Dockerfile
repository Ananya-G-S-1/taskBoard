FROM node:18

WORKDIR /app

# copy backend package files
COPY backend/package*.json ./backend/

# install dependencies
WORKDIR /app/backend
RUN npm install

# copy rest of project
COPY backend ./ 

EXPOSE 10000

CMD ["npm","start"]
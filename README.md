# Real Time Collaborative Task Board

## Tech Stack

Frontend
- React
- TypeScript
- CSS

Backend
- Node.js
- Express
- Prisma
- Socket.IO

Database
- PostgreSQL (Render)

## Features

- Create tasks
- Delete tasks
- Move tasks between columns
- Real-time updates
- Persistent storage
- Clean Kanban UI

## Deployment

Frontend: Render Static Site  
Backend: Render Web Service  
Database: Render PostgreSQL

## API

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id

## Setup

Backend

npm install  
npx prisma generate  
npx prisma migrate deploy  

Frontend

npm install  
npm run dev
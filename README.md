# Real-Time Collaborative Task Board

## Overview

This project is a **Real-Time Collaborative Task Board** built as part of the technical assignment.
It allows multiple users to create, update, move, and delete tasks on a Kanban-style board.

The application supports **real-time updates, persistent storage, and a clean dashboard interface**.

---

# Live Demo

Frontend
https://taskboard-vyre.onrender.com

Backend API
https://taskboard-vyre.onrender.com/api/tasks

---

# Features

### Task Management

* Create new tasks
* Update task status
* Delete tasks
* Move tasks between columns

### Kanban Board

Tasks are organized into three columns:

* **TODO**
* **DOING**
* **DONE**

Users can move tasks between columns using:

* Drag and drop
* Status selector

---

### Real-Time Collaboration

The system uses **WebSockets (Socket.IO)** to broadcast updates across connected clients.

Events handled:

* task:created
* task:updated
* task:moved

---

### Offline Handling

If the backend is temporarily unavailable:

* Tasks are stored locally
* UI updates continue without crashing

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* CSS

## Backend

* Node.js
* Express
* Socket.IO

## Database

* PostgreSQL
* Prisma ORM

## Deployment

* Render (Frontend + Backend + Database)

---

# Project Structure

```
taskBoard
│
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── routes
│   │   ├── services
│   │   ├── socket
│   │   └── server.ts
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   │   └── board
│   │   ├── socket
│   │   └── styles
│
└── README.md
```

---

# API Endpoints

### Get Tasks

```
GET /api/tasks
```

Returns all tasks.

---

### Create Task

```
POST /api/tasks
```

Body

```
{
  "title": "Task title",
  "description": "Task description",
  "column": "todo"
}
```

---

### Update Task

```
PUT /api/tasks/:id
```

---

### Delete Task

```
DELETE /api/tasks/:id
```

---

# Database Schema

Prisma Model

```
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  column      String
  position    Float
  createdAt   DateTime @default(now())
}
```

---

# Installation

## Clone the repository

```
git clone https://github.com/Ananya-G-S-1/taskBoard.git
cd taskBoard
```

---

## Backend Setup

```
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm start
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# Deployment

The project is deployed using **Render**:

* Backend Web Service
* PostgreSQL Database
* Frontend Static Site

---

# Key Design Decisions

### Fractional Indexing

Tasks use a **position field** to maintain ordering within columns without expensive reordering operations.

### WebSocket Events

Updates are broadcast via Socket.IO to ensure all connected clients receive changes instantly.

### Modular Structure

Frontend components are separated by responsibility:

* Board
* Column
* TaskCard

---

# Future Improvements

* Authentication
* Task comments
* Task priority
* User presence indicators
* Activity history

---

# Author

Ananya GS

GitHub
https://github.com/Ananya-G-S-1

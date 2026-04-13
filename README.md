# Habit Tracker

This is my Habit Tracker project.

I started it as a frontend challenge, then added a local MongoDB + Express backend so I could learn how data moves from a form, through an API, into a database, and back to the UI.

The app lets me create tasks with deadlines, priorities, and notes, then mark them complete when I finish them.

## What it does

- Create a task with title, deadline, priority, and optional notes
- Timestamp tasks automatically
- Mark tasks as complete or incomplete
- Delete tasks
- Show dashboard and analytics views in the frontend

## Tech stack

Frontend
- React
- Vite
- React Router

Backend
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

## Project structure

~~~
habit_tracker/
  client/      # React app
  server/      # Express + MongoDB API
~~~

## Local setup

### 1) Install dependencies

From the project root:

~~~bash
npm install
~~~

Then install backend dependencies:

~~~bash
cd server
npm install
~~~

### 2) Create environment variables

In server/.env:

~~~env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/habit_tracker
~~~

### 3) Make sure MongoDB is running locally

If MongoDB is not running, the backend will fail to start.

### 4) Run the frontend

From the project root:

~~~bash
npm run dev
~~~

Frontend default URL:
http://localhost:5173

### 5) Run the backend

In a second terminal:

~~~bash
cd server
npm run dev
~~~

Backend default URL:
http://localhost:5000

## API routes

Base URL:
http://localhost:5000/api/tasks

- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

## Why I built it this way

I split the app into a client folder and a server folder to keep frontend and backend concerns separate while still working in one repo.

I also kept MongoDB local on purpose so I could learn the fundamentals first before moving to cloud hosting.

## Next improvements

- Connect frontend state fully to backend API (if any local-only pieces remain)
- Add request validation and cleaner error responses
- Add authentication so tasks are user-specific
- Add automated tests for controllers and routes

## Notes

This project is focused on learning and iteration, so structure and features will continue to evolve as I improve it.

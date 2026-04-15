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

## Postman testing guide

Before testing in Postman, make sure:

- MongoDB is running locally
- The backend server is running from the server folder with `npm run dev`
- The API is available at `http://localhost:5000`

### 1) Health check

Request:

~~~http
GET http://localhost:5000/
~~~

Expected response:

~~~json
{
  "message": "Habit Tracker API is running"
}
~~~

### 2) Get all tasks

Request:

~~~http
GET http://localhost:5000/api/tasks
~~~

If the database is empty, an empty array is the correct response:

~~~json
[]
~~~

### 3) Create a task

Request:

~~~http
POST http://localhost:5000/api/tasks
~~~

Headers:

~~~http
Content-Type: application/json
~~~

Body:

~~~json
{
  "title": "Finish MongoDB lesson",
  "notes": "Review schema and controllers",
  "priority": "high",
  "deadline": "2026-04-20T18:00:00.000Z"
}
~~~

Expected result:

- Status `201 Created`
- A JSON object for the new task
- A MongoDB `_id` value you can reuse in update and delete tests

### 4) Update a task

Use the `_id` returned from the create request.

Request:

~~~http
PATCH http://localhost:5000/api/tasks/<taskId>
~~~

Example body to mark the task complete:

~~~json
{
  "completedAt": "2026-04-15T20:30:00.000Z"
}
~~~

Example body to change priority:

~~~json
{
  "priority": "medium"
}
~~~

### 5) Delete a task

Request:

~~~http
DELETE http://localhost:5000/api/tasks/<taskId>
~~~

Expected response:

~~~json
{
  "message": "Task deleted successfully"
}
~~~

### Recommended test order

1. `GET /`
2. `GET /api/tasks`
3. `POST /api/tasks`
4. `GET /api/tasks`
5. `PATCH /api/tasks/:id`
6. `DELETE /api/tasks/:id`

### Validation notes

- `title` is required
- `deadline` must be a valid date
- `priority` must be one of `low`, `medium`, or `high`
- If you send an invalid body, the backend should return an error response

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

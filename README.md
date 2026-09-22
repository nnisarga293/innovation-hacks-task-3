# Innovation Hacks — Task 3: Database Integration

## Persistent Data Layer

This project integrates MongoDB into the Task 2 REST API for persistent storage of **Users, Projects and Tasks**.

### Architecture

Frontend → REST API → Node.js/Express Backend → MongoDB

## Features

- User data storage
- Project data storage
- Task data storage
- Full CRUD for all three entities
- Mongoose schema-level validation
- User → Project relationship
- Project → Task relationship
- Task → User assignment relationship
- Task status: `todo`, `in-progress`, `done`
- Task priority: `low`, `medium`, `high`
- Centralized error handling
- HTTP status codes
- Environment-variable based database configuration
- Task filtering by status, priority, project and assigned user
- Automatic cleanup of a project's tasks when the project is deleted

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
- Thunder Client / Postman for API testing

## Project Structure

```text
innovation-hacks-task-3/
├── src/
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── config.js
│   ├── db.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MongoDB

Create a MongoDB database using either:
- MongoDB Atlas, or
- Local MongoDB

Copy `.env.example` to `.env`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/innovation_hacks_task3
NODE_ENV=development
```

For MongoDB Atlas, put your connection string in `MONGODB_URI`.

**Never commit `.env` to GitHub.**

### 3. Start the API

```bash
npm start
```

For development:

```bash
npm run dev
```

Server:
`http://localhost:5000`

## API Endpoints

### Users

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/users` | Create user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get one user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

Example:

```json
{
  "name": "Nisarga",
  "email": "nisarga@example.com"
}
```

### Projects

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get one project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project and its tasks |

Example:

```json
{
  "name": "Student Learning Assistant",
  "description": "AI-based student productivity platform",
  "owner": "USER_OBJECT_ID"
}
```

### Tasks

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

Example:

```json
{
  "title": "Study DBMS",
  "description": "Complete DBMS revision",
  "status": "todo",
  "priority": "high",
  "project": "PROJECT_OBJECT_ID",
  "assignedTo": "USER_OBJECT_ID",
  "dueDate": "2026-09-30"
}
```

### Task Filters

Examples:

```text
GET /api/tasks?status=done
GET /api/tasks?priority=high
GET /api/tasks?project=PROJECT_OBJECT_ID
GET /api/tasks?assignedTo=USER_OBJECT_ID
```

## Database Relationships

```text
User
 ├── owns → Projects
 └── assigned to → Tasks

Project
 ├── belongs to → User (owner)
 └── contains → Tasks

Task
 ├── belongs to → Project
 └── assigned to → User
```

MongoDB ObjectId references are used to model these relationships.

## Validation

Mongoose validates:
- Required fields
- String length
- Email format
- Unique user email
- Allowed task status values
- Allowed task priority values
- Required project and owner references

Write operations use `runValidators: true` for updates.

## HTTP Status Codes

- `200` — successful GET/UPDATE/DELETE
- `201` — successful CREATE
- `400` — validation or invalid ID
- `404` — resource not found
- `409` — duplicate unique value
- `500` — server error

## Testing / Demo Video

For the Task 3 demo, show live CRUD operations in Thunder Client or Postman:

1. Start the server.
2. Create a user.
3. Create a project using the user's ObjectId.
4. Create a task using the project and user ObjectIds.
5. GET the records and show the populated relationships.
6. Update the task status to `done`.
7. Update the project.
8. Delete the task.
9. Delete the project and show that its tasks are cleaned up.
10. Open MongoDB Compass/Atlas and show that the records persist in the database.

## GitHub Safety

Do not upload:
- `.env`
- MongoDB passwords
- API keys
- private credentials

Only `.env.example` should be committed.

## Task 3 Deliverables

According to the internship guide, Task 3 requires:
- GitHub repository with database schema/models
- Demo video showing live CRUD operations
- LinkedIn post showcasing the completed task

The internship guide also requires a GitHub README, complete source code, installation instructions, technology stack, feature list, screenshots, environment-variable instructions, and demo link for submitted repositories.

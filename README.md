# Task API

A small REST API for managing tasks, built with Express.

## Requirements

- Node.js
- npm

## Run locally

From this directory, install dependencies and start the server:

```sh
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Set the `PORT` environment variable to use a different port.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the API is running |
| `GET` | `/api/tasks` | List all tasks |
| `GET` | `/api/task` | List all tasks (singular-path alias) |
| `GET` | `/api/tasks/:id` | Get one task |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

Task objects have this shape:

```json
{
  "id": 1,
  "title": "Learn Express",
  "description": "Finish the lab",
  "done": false
}
```

### Create a task

Send JSON to `POST /api/tasks`:

```json
{
  "title": "Write documentation",
  "description": "Document the API",
  "done": false
}
```

`title` must be a non-empty string and `description` must be a string. `done` is optional and defaults to `false`.

### Update a task

Send any fields to update as JSON to `PUT /api/tasks/:id`. For example:

```json
{
  "done": true
}
```

## Notes

Tasks are kept in memory, so changes are lost when the server restarts.

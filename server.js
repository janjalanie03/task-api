const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory storage (resets when the server restarts)
let tasks = [
  { id: 1, title: "Learn Express", description: "Finish the lab", done: false },
];
let nextId = 2;

// Root route: makes deployment easy to verify
app.get("/", (req, res) => {
  res.json({ message: "Task API is running" });
});

// READ ALL
app.get(["/api/tasks", "/api/task"], (req, res) => {
  res.status(200).json(tasks);
});

// READ ONE
app.get("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
});

// CREATE
app.post("/api/tasks", (req, res) => {
  const { title, description, done } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }
  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Description is required and must be a string" });
  }
  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be true or false" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description,
    done: done ?? false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE
app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, done } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string" });
  }
  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be true or false" });
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (done !== undefined) task.done = done;

  res.status(200).json(task);
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({ message: "Task deleted", task: deleted });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
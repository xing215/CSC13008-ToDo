import { Router } from "express";

import taskRoute from "./routes/tasks.js";

const api = Router();

// Task routes
api.use('/tasks', taskRoute);

export default api;
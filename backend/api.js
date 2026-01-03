import { Router } from "express";

import taskRoute from "./routes/tasks.js";
import categoryRoute from './routes/categories.js'

const api = Router();

// Task routes
api.use('/tasks', taskRoute);
// Category routes
api.use('/categories', categoryRoute);

export default api;
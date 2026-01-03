import { Router } from "express";
import validationMiddleware from '../middlewares/validation.js';
import taskSchema from '../schemas/task.js'
import taskController from '../controllers/tasks.js'

const route = new Router();

// GET: Get taskes with filter and pagination
route.get('/', taskController.listTasks);

// GET: Get specific task
route.get('/:id', taskController.getTask);

// POST: Create a new task
route.post('/', validationMiddleware(taskSchema), taskController.createTask);

export default route;
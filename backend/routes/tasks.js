import { Router } from "express";
import taskController from '../controllers/tasks.js'

const route = new Router();

// GET: Get taskes with filter and pagination
route.get('/', taskController.listTasks);

export default route;
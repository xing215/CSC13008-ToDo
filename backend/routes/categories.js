import { Router } from "express";
import categoryController from '../controllers/categories.js'

const route = new Router();

// GET: Get all categories
route.get('/', categoryController.listCategories);

export default route;
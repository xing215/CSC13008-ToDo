import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"

import restResponse from './middlewares/restResponse.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import auth from "./middlewares/auth.js";
import apiRouter from "./api.js"

const app = express();

// CORS, open for all
app.use(cors());

// Log
app.use(morgan('dev'));

// Parse JSON body
app.use(bodyParser.json());

// Add rest response helpers
app.use(restResponse);

// Authentication middleware
app.use(auth);

// API endpoints
app.use('/api', apiRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
import db from "../db/index.js";
import { tasks } from "../db/schema.js"

const service = {
    findAll: async function() {
        return await db.select().from(tasks);
    },
};

export default service;
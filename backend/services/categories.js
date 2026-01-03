import db from "../db/index.js";
import { categories } from "../db/schema.js"

const service = {
    findAll: async function() {
        return await db.select().from(categories);
    },
};

export default service;
import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { tasks } from "../db/schema.js"

const service = {
    findAll: async function() {
        return await db.select().from(tasks);
    },
    findById: async function (id) {
        const result = await db.select().from(tasks).where(eq(tasks.id, id));
        return result[0];
    },
    create: async function(task) {
        const result = await db.insert(tasks).values(task).returning();
        return result[0];
    },
};

export default service;
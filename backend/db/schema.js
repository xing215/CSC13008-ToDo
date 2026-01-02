import { pgTable, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable('categories', {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
});

export const tasks = pgTable('tasks', {
    id: integer('id').primaryKey(),
    title: varchar('title', { length: 50 }).notNull(),
    completed: boolean('completed').notNull().default(false),
    priority: varchar('priority', { length: 10 }).notNull(),
    categoryId: integer('category_id').references(() => categories.id).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
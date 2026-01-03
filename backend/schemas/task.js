import z from "zod";
import categoryService from '../services/categories.js'

export default z.object({
    title: z.string("title is required").min(3, "title must be 3-50 characters").max(50, "title must be 3-50 characters"),
    completed: z.boolean("completed must be a boolean").optional().default(false),
    priority: z.enum(["low", "medium", "high"], "priority must be one of: low, medium, high"),
    categoryId: z.preprocess(
        (val) => Number(val),
        z.int("categoryId is required").refine(
            async (id) => {
                const categories = await categoryService.findAll();
                return categories.some(category => category.id === id);
            },
            { message: "Category does not exist" }
        )
    ),
})
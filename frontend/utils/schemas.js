import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string("Tiêu đề là bắt buộc").min(3, "Tiêu đề phải có từ 3 đến 50 ký tự").max(50, "Tiêu đề phải có từ 3 đến 50 ký tự"),
    priority: z.enum(["low", "medium", "high"], "Ưu tiên là bắt buộc"),
    categoryId: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number({ required_error: "Danh mục là bắt buộc" }).int().positive()
    ),
});
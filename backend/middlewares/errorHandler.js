import { ZodError } from "zod";

export default function (error, req, res, next) {
    console.error(error);
    
    if (error instanceof ZodError) {
        return res.badRequest({
            errors: error.issues.map((e) => ({
                field: e.path.join(', '),
                message: e.message,
            })),
        });
    }

    return res.status(500).json({
        errors: error.message,
    });
};
export default function(schema) {
    return async function (req, res, next) {
        try {
            await schema.parseAsync(req.body);
        } catch (err) {
            next(err);
            return;
        }
        next();
    }
};
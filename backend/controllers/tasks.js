import taskServices from '../services/tasks.js'

const controllers = {
    listTasks: function (req, res, next) {
        taskServices.findAll().then((tasks) => {
            // Filtering
            const categoryId = Number(req.query.categoryId);
            if (categoryId) {
                tasks = tasks.filter((t) => t.categoryId == categoryId);
            }

            // Metadata
            const totalItems = Number(tasks.length);
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || totalItems;
            const totalPages = Math.ceil(totalItems / limit);
            const meta = {
                page,
                limit,
                totalItems,
                totalPages,
            };

            // Pagination
            const offset = (page - 1) * limit;
            tasks = tasks.slice(offset, offset + limit);

            // Response
            res.ok({
                data: tasks,
                meta,
            });
        }).catch(next);
    },
    getTasks: function (req, res, next) {
        const id = Number(req.params.id);
        taskServices.findById(id).then((tasks) => {
            if (tasks) {
                res.ok(tasks);
            } else {
                res.notFound({
                    message: `Task with id ${id} is not found`,
                });
            }
        }).catch(next);
    },
}

export default controllers;
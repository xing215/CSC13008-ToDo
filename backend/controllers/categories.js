import categoryServices from '../services/categories.js'

const controllers = {
    listCategories: function (req, res, next) {
        categoryServices.findAll().then((categories) => {
            res.ok(categories);
        }).catch(next);
    },
}

export default controllers;
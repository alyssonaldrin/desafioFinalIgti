const express = require('express');
const controller = require("../services/transactionService.js")

const routes = express();

routes.post('/', controller.create);
routes.get('/', controller.findAll);
routes.put('/', controller.update);
routes.delete('/:id', controller.remove);
routes.get('/summary', controller.summary);

module.exports = routes;
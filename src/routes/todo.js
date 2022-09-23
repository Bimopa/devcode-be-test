import {Router} from 'express';
import {index, view, store, update, del} from '../controllers/TodoController';

const routes = Router();

routes.get('/todo-items', index);
routes.get('/todo-items/:id', view);
routes.post('/todo-items', store);
routes.patch('/todo-items/:id', update);
routes.delete('/todo-items/:id', del);

module.exports = routes;

import {Router} from 'express';
import {index, view, store, update, del} from '../controllers/ActivityController';

const routes = Router();

routes.get('/activity-groups', index);
routes.get('/activity-groups/:id', view);
routes.post('/activity-groups', store);
routes.patch('/activity-groups/:id', update);
routes.delete('/activity-groups/:id', del);

module.exports = routes;

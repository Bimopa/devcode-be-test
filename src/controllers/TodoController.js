import Joi from 'joi';
import { where } from 'sequelize';
import Paging from '../helpers/Paging'
import Response from '../helpers/Response'
import {Activity, Todo} from '../models'

class TodoController {
    static async index(req, res, next) {
      try {
        let query = {}

        if(req.query.activity_group_id) {
          query.where = {
            ...query.where,
            activity_group_id: req.query.activity_group_id,
          };
        }

        const todo = await Todo.findAll(query);
        
        if(!todo) {
          return res.send(Response.error("Not Found", "Todo with ID "+ req.query.activity_group_id +" Not Found"))
        }

        return res.send(Response.success(todo));
      } catch (error) { 
        next({error, fun: 'Customer:index'});
      }
    }

    static async view(req, res, next) {
      try {
        const id = req.params.id
        const todo = await Todo.findOne({
          where: {
            id: id,
            deleted_at: null
          }
        })

        if(!todo) {
          return res.status(404).json(Response.error("Not Found", "Todo with ID "+ id +" Not Found"))
        }
 
        return res.send(Response.success(todo));
      } catch (error) {
        next({error, fun: 'Customer:index'});
      }
    }

    static async store(req, res, next) {
      try {
        const schema = Joi.object().keys({
          activity_group_id: Joi.number().required().messages({"string.empty":"activity_group_id cannot be null", "any.required":"activity_group_id cannot be null"}),
          title: Joi.string().required().messages({"string.empty":"title cannot be null", "any.required":"title cannot be null"}),
        });
  
        const validate = schema.validate(req.body);
  
        if (validate.error) {
            return res.status(400).json(Response.error("Bad Request", validate.error.message));
        }

        let activ = await Activity.findOne({
          where: {
            id: parseInt(req.body.activity_group_id)
          }
        })

        if(!activ) {
          return res.status(400).json(Response.error("Not Found", "Todo with ID "+ parseInt(req.body.activity_group_id) +" Not Found"))
        }

        const todo = await Todo.create({
          ...req.body,
          is_active: true,
          priority: "very-high"
        });

        return res.status(201).json(Response.success(todo));
      } catch (error) {
          next({error, fun: 'Todo:store'});
      }
    }
  
    static async update(req, res, next) {
      try {
        const id = parseInt(req.params.id)
        const schema = Joi.object().keys({
          activity_group_id: Joi.number().optional().messages({"string.empty":"activity_group_id cannot be null", "any.required":"activity_group_id cannot be null"}),
          title: Joi.string().optional().messages({"string.empty":"title cannot be null", "any.required":"title cannot be null"}),
          is_active: Joi.boolean().optional()
        });
  
        const validate = schema.validate(req.body);
  
        if (validate.error) {
            return res.status(404).json(Response.error("Bad Request", validate.error.message));
        }

        let todo = await Todo.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (!todo) {
          return res.status(404).json(Response.error("Not Found", "Todo with ID "+ id +" Not Found"))
        }
  
        let result = await todo.update(req.body);

        return res.json(Response.success(result));
      } catch (error) {
          next({error, fun: 'Teting:update'});
      }
    }
  
    static async del(req, res, next) {
      try {
        const id = req.params.id
        const todo = await Todo.findOne({
          where: {
            id: id
          },
        });
  
        if (!todo) {
          return res.status(404).json(Response.error("Not Found", "Todo with ID "+ id +" Not Found"))
        }
  
        await todo.destroy();
        return res.json(Response.success({}));
      } catch (error) {
        next({error, fun: 'Todo:del'});
      }
    }
  }
  
  module.exports = TodoController;
  
import Joi from 'joi';
import Paging from '../helpers/Paging'
import Response from '../helpers/Response'
import {Activity} from '../models'

class ActivityController {
    static async index(req, res, next) {
      try {
        const activity = await Activity.findAll()
        
        return res.status(200).json(Response.success(activity));
      } catch (error) {
        next({error, fun: 'Activity:index'});
      }
    }

    static async view(req, res, next) {
      try {
        const id = req.params.id
        const activity = await Activity.findOne({
          where: {
            id: id,
            deleted_at: null
          }
        })

        if(!activity) {
          return res.status(404).json(Response.error("Not Found", "Activity with ID "+ id +" Not Found"))
        }
 
        return res.send(Response.success(activity));
      } catch (error) {
        next({error, fun: 'Activity:index'});
      }
    }
  
    static async store(req, res, next) {
      try {
        const schema = Joi.object().keys({
          email: Joi.string().required().messages({"string.empty":"email cannot be null", "any.required":"email cannot be null"}),
          title: Joi.string().required().messages({"string.empty":"title cannot be null", "any.required":"title cannot be null"}),
        });
  
        const validate = schema.validate(req.body);
  
        if (validate.error) {
            return res.status(400).json(Response.error("Bad Request", validate.error.message));
        }

        const activity = await Activity.create(req.body);

        return res.status(201).json(Response.success(activity));
      } catch (error) {
          next({error, fun: 'Activity:store'});
      }
    }
  
    static async update(req, res, next) {
      try {
        const id = req.params.id
        const schema = Joi.object().keys({
          email: Joi.string().optional().messages({"string.empty":"email cannot be null", "any.required":"email cannot be null"}),
          title: Joi.string().optional().messages({"string.empty":"title cannot be null", "any.required":"title cannot be null"}),
        });
  
        const validate = schema.validate(req.body);
  
        if (validate.error) {
            return res.status(404).json(Response.error("Bad Request", validate.error.message));
        }

        let activity = await Activity.findOne({
            where: {
                id: id,
                deleted_at: null
            }
        })

        if (!activity) {
          return res.status(404).json(Response.error("Not Found", "Activity with ID "+ id +" Not Found"))
        }
  
        let result = await activity.update(req.body);

        return res.json(Response.success(result));
      } catch (error) {
          next({error, fun: 'Activity:update'});
      }
    }
  
    static async del(req, res, next) {
      try {
        const id = req.params.id
        const activity = await Activity.findOne({
          where: {
            id: id
          },
        });
  
        if (!activity) {
          return res.status(404).json(Response.error("Not Found", "Activity with ID "+ id +" Not Found"))
        }
  
        await activity.destroy();
        return res.json(Response.success({}));
      } catch (error) {
        next({error, fun: 'Activity:del'});
      }
    }
  }
  
  module.exports = ActivityController;
  
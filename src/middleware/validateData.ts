import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { ObjectSchema } from 'joi';

const validateData = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      res.status(400).json({
        status: 'fail',
        message: errorMessage,
      });
      return;  
    }

    next(); 
  };
};

export default validateData;



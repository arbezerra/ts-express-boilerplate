import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export enum ValidateMethod {
  CREATE,
  UPDATE,
  ID,
  SLUG,
  LOGIN,
  PAGINATE,
}

const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        req.body = result.body;
        req.query = result.query;
        req.params = result.params;
        return next();
    } catch (error){
        console.error(error);
        return res.status(400).json(error);
    }
  };
};

export default validate;

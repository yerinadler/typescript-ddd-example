import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { err } from "../utilities/responses";

export const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(err('400', 'Validation failed', error));
  next();
}
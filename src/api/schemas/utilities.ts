import Joi from "joi"

export const UUIDField = (isRequired = true) => {
  const validator =  Joi.string().uuid();
  return isRequired ? validator.required() : validator;
}
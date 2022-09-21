import Joi, { ObjectSchema } from "joi";
import { UUIDField } from "./utilities";

export const createOrderValidationSchema: ObjectSchema = Joi.object({
  customerId: UUIDField(),
});

export const addOrderItemValidationSchema: ObjectSchema = Joi.object({
  productId: UUIDField(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
})
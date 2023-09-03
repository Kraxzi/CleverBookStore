import Joi from "joi";
import ValidationSource from "../enums/validation-source.enum";
import {Request, Response, NextFunction} from "express";
import BadRequestError from "../core/error/bad-request.error";

export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const {error} = schema.validate(req[source]);

      if (!error) return next();

      const {details} = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      next(new BadRequestError(message));
    } catch (error) {
      next(error);
    }
  };

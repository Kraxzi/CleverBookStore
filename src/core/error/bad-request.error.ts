import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

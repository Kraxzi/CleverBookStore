import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(ErrorType.BAD_TOKEN, message);
  }
}

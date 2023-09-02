import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN, message);
  }
}

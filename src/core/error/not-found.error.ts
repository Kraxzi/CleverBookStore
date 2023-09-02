import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}

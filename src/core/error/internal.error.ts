import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message);
  }
}

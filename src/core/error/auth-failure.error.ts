import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

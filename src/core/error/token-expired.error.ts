import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}

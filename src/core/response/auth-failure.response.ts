import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class AuthFailureResponse extends ApiResponse {
  constructor(message = "Authentication Failure") {
    super(StatusCode.UNAUTHORIZED, message);
  }
}

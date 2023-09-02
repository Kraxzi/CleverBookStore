import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class ForbiddenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(StatusCode.FORBIDDEN, message);
  }
}

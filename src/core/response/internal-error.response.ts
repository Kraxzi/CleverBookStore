import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.INTERNAL_ERROR, message);
  }
}

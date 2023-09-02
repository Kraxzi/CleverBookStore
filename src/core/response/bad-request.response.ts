import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.BAD_REQUEST, message);
  }
}

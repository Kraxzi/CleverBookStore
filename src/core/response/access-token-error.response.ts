import {Response} from "express";
import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";

  constructor(message = "Access token invalid") {
    super(StatusCode.UNAUTHORIZED, message);
  }

  send(res: Response, headers: {[key: string]: string} = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

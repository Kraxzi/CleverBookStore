import {Response} from "express";
import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export default class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found") {
    super(StatusCode.NOT_FOUND, message);
  }

  send(res: Response, headers: {[key: string]: string} = {}): Response {
    return super.prepare<NotFoundResponse>(res, this, headers);
  }
}

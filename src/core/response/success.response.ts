import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";
import {Response} from "express";

export default class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, message);
  }

  send(res: Response, headers: {[key: string]: string} = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

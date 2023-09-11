import {Response} from "express";
import StatusCode from "../../enums/status-code.enum";
import ApiResponse from "./api.response";

export class RefreshTokenResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string
  ) {
    super(StatusCode.SUCCESS, message);
  }

  send(res: Response, headers: {[key: string]: string} = {}): Response {
    return super.prepare<RefreshTokenResponse>(res, this, headers);
  }
}

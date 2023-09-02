import {Response} from "express";
import StatusCode from "../../enums/status-code.enum";

export default abstract class ApiResponse {
  constructor(protected status: StatusCode, protected message: string) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: {[key: string]: string}
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response, headers: {[key: string]: string} = {}): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

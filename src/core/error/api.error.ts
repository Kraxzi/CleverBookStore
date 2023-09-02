import ErrorType from "../../enums/error-type.enum";
import {Response} from "express";
import AuthFailureResponse from "../response/auth-failure.response";
import BadRequestResponse from "../response/bad-request.response";
import ForbiddenResponse from "../response/forbidden.response";
import InternalErrorResponse from "../response/internal-error.response";
import NotFoundResponse from "../response/not-found.response";

export default abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = "error") {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        return new InternalErrorResponse(err.message).send(res);
      }
    }
  }
}

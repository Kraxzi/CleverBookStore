enum ErrorType {
  TOKEN_EXPIRED = "TokenExpiredError",
  UNAUTHORIZED = "AuthFailureError",
  ACCESS_TOKEN = "AccessTokenError",
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  NO_ENTRY = "NoEntryError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
  BAD_TOKEN = "BadTokenError",
}

export default ErrorType;

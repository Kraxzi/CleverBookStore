import ErrorType from "../../enums/error-type.enum";
import ApiError from "./api.error";

export default class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

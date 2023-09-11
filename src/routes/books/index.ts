import express from "express";
import asyncHandlerHelper from "../../helpers/async-handler.helper";
import addBook from "./routes/add-book";
import validationMiddleware from "../../middlewares/validation.middleware";
import schema from "./schema";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

const booksRouter = express.Router();

booksRouter.post(
  "/addBook",
  authenticationMiddleware,
  validationMiddleware(schema.addBook),
  asyncHandlerHelper(addBook)
);

export default booksRouter;

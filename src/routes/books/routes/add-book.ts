import {Request, Response} from "express";
import BadRequestError from "../../../core/error/bad-request.error";
import BookRepository from "../../../database/repositories/Book.repository";
import {createBookPath} from "./utils";
import Book from "../../../database/models/Book";
import SuccessResponse from "../../../core/response/success.response";

const addBook = async (req: Request, res: Response): Promise<void> => {
  const book = await BookRepository.findByName(req.body.name);
  if (book) throw new BadRequestError("This book already exists");

  const path = createBookPath(); //hardcoded
  const createdBook = await BookRepository.create({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    path,
  } as Book);

  new SuccessResponse("Book successfully added", {
    book: createdBook,
  }).send(res);
};

export default addBook;

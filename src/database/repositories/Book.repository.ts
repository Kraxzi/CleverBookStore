import Book, {BookModel} from "../models/Book";

async function create(book: Book): Promise<Book> {
  const createdBook = await BookModel.create(book);
  return createdBook;
}

async function findByName(name: string): Promise<Book | null> {
  const book = await BookModel.findOne({name});
  return book;
}

export default {create, findByName};

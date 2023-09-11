import {model, Schema, Types} from "mongoose";

export default interface Book {
  _id: Types.ObjectId;
  name: string;
  author: string;
  price: number;
  description: string;
  path: string;
}

const schema = new Schema<Book>({
  name: {
    type: Schema.Types.String,
    unique: true,
  },
  author: {
    type: Schema.Types.String,
  },
  price: {
    type: Schema.Types.Number,
  },
  description: {
    type: Schema.Types.String,
    maxlength: 2000,
    trim: true,
  },
  path: {
    type: Schema.Types.String, //add unique
  },
});

export const BookModel = model<Book>("Book", schema, "books");

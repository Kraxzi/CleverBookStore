import {model, Schema, Types} from "mongoose";

export default interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<User>({
  username: {
    type: Schema.Types.String,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    unique: true,
  },
});

export const UserModel = model<User>("User", schema, "users");

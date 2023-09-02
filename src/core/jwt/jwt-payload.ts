import {Types} from "mongoose";

export default class JwtPayload {
  _id: Types.ObjectId;
  _username: string;
  _email: string;

  constructor(id: Types.ObjectId, username: string, email: string) {
    this._id = id;
    this._username = username;
    this._email = email;
  }
}

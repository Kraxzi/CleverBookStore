import {Schema, model, Types} from "mongoose";
import User from "./User";

export default interface Keystore {
  _id: Types.ObjectId;
  user: User;
  primaryKey: string;
  secondaryKey: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Keystore>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  primaryKey: {
    type: Schema.Types.String,
    required: true,
  },
  secondaryKey: {
    type: Schema.Types.String,
    required: true,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: true,
    select: false,
  },
});

export const KeystoreModel = model<Keystore>("Keystore", schema, "keystores");

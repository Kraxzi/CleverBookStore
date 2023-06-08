import {Schema, model} from "mongoose";

const RoleSchema = new Schema({
  name: {type: String, unique: true},
});

export const Role = model("Role", RoleSchema);

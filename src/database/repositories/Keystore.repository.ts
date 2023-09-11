import Keystore, {KeystoreModel} from "../models/Keystore";
import User from "../models/User";
import {Types} from "mongoose";

async function create(
  user: User,
  primaryKey: string,
  secondaryKey: string
): Promise<Keystore> {
  const now = new Date();
  const keystore = await KeystoreModel.create({
    user,
    primaryKey,
    secondaryKey,
    createdAt: now,
    updatedAt: now,
  });
  return keystore.toObject();
}

async function findByPrimary(
  user: User,
  key: string
): Promise<Keystore | null> {
  const keystore = await KeystoreModel.findOne({
    user,
    primaryKey: key,
    status: true,
  });
  return keystore;
}

async function find(
  user: User,
  primaryKey: string,
  secondaryKey: string
): Promise<Keystore | null> {
  const keystore = await KeystoreModel.findOne({
    user,
    primaryKey,
    secondaryKey,
  });
  return keystore;
}

async function remove(id: Types.ObjectId): Promise<void> {
  await KeystoreModel.findByIdAndRemove(id);
}

export default {
  create,
  findByPrimary,
  find,
  remove,
};

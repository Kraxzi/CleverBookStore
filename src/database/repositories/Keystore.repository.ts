import Keystore, {KeystoreModel} from "../models/Keystore";
import User from "../models/User";

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

export default {
  create,
  findByPrimary,
};

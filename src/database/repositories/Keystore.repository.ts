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

export default {
  create,
};

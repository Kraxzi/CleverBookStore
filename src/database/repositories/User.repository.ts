import Keystore from "../models/Keystore";
import User, {UserModel} from "../models/User";
import KeystoreRepository from "./Keystore.repository";

async function create(
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string
): Promise<{user: User; keystore: Keystore}> {
  const createdUser = await UserModel.create(user);
  const keystore = await KeystoreRepository.create(
    createdUser,
    accessTokenKey,
    refreshTokenKey
  );
  return {user: createdUser, keystore};
}

async function findByEmail(email: string): Promise<User | null> {
  const user = await UserModel.findOne({email});
  return user;
}

async function findByEmailOrUsername(
  email: string,
  username: string
): Promise<User | null> {
  const user = await UserModel.findOne({$or: [{email}, {username}]});
  return user;
}

export default {
  create,
  findByEmail,
  findByEmailOrUsername,
};

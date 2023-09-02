import User, {UserModel} from "../models/User";

async function create(user: User): Promise<User> {
  const createdUser = await UserModel.create(user);
  return createdUser;
}

async function findByEmail(email: string): Promise<User | null> {
  const user = await UserModel.findOne({email});
  return user;
}

export default {
  create,
  findByEmail,
};

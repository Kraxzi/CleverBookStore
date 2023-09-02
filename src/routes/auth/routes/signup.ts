import {Request, Response} from "express";
import BadRequestError from "../../../core/error/bad-request.error";
import UserRepository from "../../../database/repositories/User.repository";
import bcrypt from "bcrypt";
import User from "../../../database/models/User";
import JWT from "../../../core/jwt/jwt.utils";
import SuccessResponse from "../../../core/response/success.response";

const signup = async (req: Request, res: Response): Promise<void> => {
  const user = await UserRepository.findByEmail(req.body.email);
  if (user) throw new BadRequestError("User already registered");

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const createdUser = await UserRepository.create({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  } as User);

  const tokens = await JWT.createTokens(createdUser);

  new SuccessResponse("Signup Successful", {
    user: createdUser,
    tokens,
  }).send(res);
};

export default signup;

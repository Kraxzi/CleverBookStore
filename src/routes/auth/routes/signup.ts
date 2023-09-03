import {Request, Response} from "express";
import BadRequestError from "../../../core/error/bad-request.error";
import UserRepository from "../../../database/repositories/User.repository";
import bcrypt from "bcrypt";
import User from "../../../database/models/User";
import JWT from "../../../core/jwt/jwt.utils";
import SuccessResponse from "../../../core/response/success.response";
import crypto from "crypto";

const signup = async (req: Request, res: Response): Promise<void> => {
  const user = await UserRepository.findByEmailOrUsername(
    req.body.email,
    req.body.username
  );
  if (user) {
    if (user.email === req.body.email) {
      throw new BadRequestError("This email is already in use");
    }
    if (user.username === req.body.username) {
      throw new BadRequestError("This username is already in use");
    }
  }
  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const {user: createdUser, keystore} = await UserRepository.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    } as User,
    accessTokenKey,
    refreshTokenKey
  );

  const tokens = await JWT.createTokens(
    createdUser,
    keystore.primaryKey,
    keystore.secondaryKey
  );

  new SuccessResponse("Signup Successful", {
    user: createdUser,
    tokens,
  }).send(res);
};

export default signup;

import {Request, Response} from "express";
import BadRequestError from "../../../core/error/bad-request.error";
import UserRepository from "../../../database/repositories/User.repository";
import bcrypt from "bcrypt";
import AuthFailureError from "../../../core/error/auth-failure.error";
import JWT from "../../../core/jwt/jwt.utils";
import SuccessResponse from "../../../core/response/success.response";
import crypto from "crypto";
import KeystoreRepository from "../../../database/repositories/Keystore.repository";

const login = async (req: Request, res: Response): Promise<void> => {
  const user = await UserRepository.findByEmail(req.body.email);
  if (!user) throw new BadRequestError("User not registered");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) throw new AuthFailureError("Authentication failure");

  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");

  await KeystoreRepository.create(user, accessTokenKey, refreshTokenKey);
  const tokens = await JWT.createTokens(user, accessTokenKey, refreshTokenKey);
  new SuccessResponse("Login Success", {
    user,
    tokens,
  }).send(res);
};

export default login;

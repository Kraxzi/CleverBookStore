import {Request, Response} from "express";
import AuthFailureError from "../../../core/error/auth-failure.error";
import JWT from "../../../core/jwt/jwt.utils";
import KeystoreRepository from "../../../database/repositories/Keystore.repository";
import UserRepository from "../../../database/repositories/User.repository";
import crypto from "crypto";
import {RefreshTokenResponse} from "../../../core/response/refresh-token.response";

const refresh = async (req: Request, res: Response): Promise<void> => {
  const accessTokenPayload = await JWT.decode(
    JWT.getAccessToken(req.headers.authorization)
  );
  JWT.validateTokenData(accessTokenPayload);

  const user = await UserRepository.findByEmail(accessTokenPayload._email);
  if (!user) throw new AuthFailureError("User is not registered");

  const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
  JWT.validateTokenData(refreshTokenPayload);

  if (accessTokenPayload._email !== refreshTokenPayload._email)
    throw new AuthFailureError("Invalid access token");

  const keystore = await KeystoreRepository.find(
    user,
    accessTokenPayload._key,
    refreshTokenPayload._key
  );
  if (!keystore) throw new AuthFailureError("Invalid access token");
  await KeystoreRepository.remove(keystore._id);

  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");

  await KeystoreRepository.create(user, accessTokenKey, refreshTokenKey);

  const tokens = await JWT.createTokens(user, accessTokenKey, refreshTokenKey);

  new RefreshTokenResponse(
    "Token issued",
    tokens.accessToken,
    tokens.refreshToken
  ).send(res);
};

export default refresh;

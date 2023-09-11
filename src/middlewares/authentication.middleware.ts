import JWT from "../core/jwt/jwt.utils";
import asyncHandlerHelper from "../helpers/async-handler.helper";
import {Request, Response, NextFunction} from "express";
import UserRepository from "../database/repositories/User.repository";
import AuthFailureError from "../core/error/auth-failure.error";
import KeystoreRepository from "../database/repositories/Keystore.repository";
import TokenExpiredError from "../core/error/token-expired.error";
import {AccessTokenError} from "../core/error/access-token.error";

export default asyncHandlerHelper(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await JWT.validate(
        JWT.getAccessToken(req.headers.authorization)
      );
      JWT.validateTokenData(payload);

      const user = await UserRepository.findByEmail(payload._email);
      if (!user) throw new AuthFailureError("User not registered");

      const keystore = await KeystoreRepository.findByPrimary(
        user,
        payload._key
      );
      if (!keystore) throw new AuthFailureError("Invalid access token");

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError();
      throw e;
    }
  }
);

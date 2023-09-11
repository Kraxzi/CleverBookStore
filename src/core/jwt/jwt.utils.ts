import {sign, verify} from "jsonwebtoken";
import JwtPayload from "./jwt-payload";
import User from "../../database/models/User";
import {tokenInfo} from "../../config";
import InternalError from "../error/internal.error";
import AuthFailureError from "../error/auth-failure.error";
import logger from "../logger";
import TokenExpiredError from "../error/token-expired.error";
import {Types} from "mongoose";
import BadTokenError from "../error/bad-token.error";

export default class JWT {
  public static async createTokens(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string
  ): Promise<{accessToken: string; refreshToken: string}> {
    const accessPayload = new JwtPayload(
      user._id,
      user.username,
      user.email,
      accessTokenKey
    );

    const accessToken = await sign({...accessPayload}, tokenInfo.secret, {
      expiresIn: tokenInfo.accessTokenValidity,
    });

    if (!accessToken) throw new InternalError();

    const refreshPayload = new JwtPayload(
      user._id,
      user.username,
      user.email,
      refreshTokenKey
    );

    const refreshToken = await sign({...refreshPayload}, tokenInfo.secret, {
      expiresIn: tokenInfo.refreshTokenValidity,
    });

    if (!refreshToken) throw new InternalError();

    return {
      accessToken,
      refreshToken,
    };
  }

  public static getAccessToken(authorization?: string): string {
    if (!authorization || !authorization.startsWith("Bearer "))
      throw new AuthFailureError("Invalid authorization");
    return authorization.split(" ")[1];
  }

  public static async validate(token: string): Promise<JwtPayload> {
    try {
      const verified = (await verify(token, tokenInfo.secret)) as JwtPayload;
      return verified;
    } catch (e) {
      logger.debug(e);
      throw new TokenExpiredError();
    }
  }

  public static validateTokenData(payload: JwtPayload): boolean {
    if (
      !Types.ObjectId.isValid(payload._id) ||
      !payload._username ||
      !payload._email ||
      !payload._key
    )
      throw new AuthFailureError("Invalid access token");
    return true;
  }

  public static async decode(token: string): Promise<JwtPayload> {
    try {
      const decoded = (await verify(token, tokenInfo.secret)) as JwtPayload;
      return decoded;
    } catch (e) {
      logger.debug(e);
      throw new BadTokenError();
    }
  }
}

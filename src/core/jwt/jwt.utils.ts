import {sign} from "jsonwebtoken";
import JwtPayload from "./jwt-payload";
import User from "../../database/models/User";
import {tokenInfo} from "../..//config";
import InternalError from "../error/internal.error";

export default class JWT {
  public static async createTokens(
    user: User
  ): Promise<{accessToken: string; refreshToken: string}> {
    const payload = new JwtPayload(user._id, user.username, user.email);

    const accessToken = await sign({...payload}, tokenInfo.secret, {
      expiresIn: tokenInfo.accessTokenValidity,
    });

    if (!accessToken) throw new InternalError();

    const refreshToken = await sign({...payload}, tokenInfo.secret, {
      expiresIn: tokenInfo.refreshTokenValidity,
    });

    if (!refreshToken) throw new InternalError();

    return {
      accessToken,
      refreshToken,
    };
  }
}

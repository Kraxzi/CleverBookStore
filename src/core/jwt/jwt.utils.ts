import {sign} from "jsonwebtoken";
import JwtPayload from "./jwt-payload";
import User from "../../database/models/User";
import {tokenInfo} from "../..//config";
import InternalError from "../error/internal.error";

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
}

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const dbUri = process.env.DB_URI + "";

export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  secret: process.env.JWT_SECRET + "",
};

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), "/backend/.env"),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_access_token_serect: process.env.ACCESS_TOKEN_SERECT_KEY,
    jwt_access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    jwt_refresh_token_serect: process.env.REFRESH_TOKEN_SERECT_KEY,
    jwt_refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_password_token: process.env.RESET_PASSWORD_TOKEN,
    reset_password_token_expires_in:
      process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
  },
};

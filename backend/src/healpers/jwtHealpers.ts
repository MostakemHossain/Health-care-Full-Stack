import jwt, { JwtPayload, Secret } from "jsonwebtoken";
const generateToken = (payload: any, serect: string, expiresIn: string) => {
  const token = jwt.sign(payload, serect, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, serect: Secret) => {
  return jwt.verify(token, serect) as JwtPayload;
};

export const jwtHealpers = {
  generateToken,
  verifyToken
};

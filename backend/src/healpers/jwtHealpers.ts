import jwt from "jsonwebtoken";
const generateToken = (payload: any, serect: string, expiresIn: string) => {
  const token = jwt.sign(payload, serect, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

export const jwtHealpers = {
  generateToken,
};

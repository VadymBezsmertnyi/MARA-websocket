import jwt from "jsonwebtoken";

export const setToken = (
  userId: number,
  password: string,
  time_token: number | string,
  secretKeyToken: string
) => {
  const token = jwt.sign({ userId, password, time_token }, secretKeyToken);
  return token;
};

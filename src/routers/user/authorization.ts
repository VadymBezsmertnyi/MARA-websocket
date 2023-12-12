import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// models
import PostPhone from "../../models/user";

// types
import { UserPostT, TokenVerifyT } from "../../types/user.types";

// schemas
import { userPostSZ } from "../../schemas/user.schemas";

// constants
import { FALSE_RESULT_USER } from "../../constants/user.const";

// helpers
import { checkIfTimePassed } from "../../hooks/time";
import { setToken } from "../../hooks/token";

// magic numbers
const ERROR_SERVER_FIVE_HUNDRED = 500;

dotenv.config();
const router = Router();
const { SECRET_KEY_TOKEN } = process.env;

router.get("/me", async (req: Request, res: Response) => {
  try {
    const { verifyToken } = req.query;

    if (!SECRET_KEY_TOKEN)
      return res.send({ ...FALSE_RESULT_USER, code: 1007 });

    if (verifyToken) {
      const token = Array.isArray(verifyToken)
        ? verifyToken[0].toString()
        : verifyToken.toString();
      const { userId, password, iat } = jwt.verify(
        token,
        SECRET_KEY_TOKEN
      ) as TokenVerifyT;
      const userData = await PostPhone.findOne({ id: userId, password });

      if (userData) {
        const isTimeOver = checkIfTimePassed(iat, userData.time_token);

        if (isTimeOver) res.send({ result: true, userData, code: 1000 });
        else res.send({ ...FALSE_RESULT_USER, code: 1001 });
      } else res.send({ ...FALSE_RESULT_USER, code: 1002 });
    } else res.send({ ...FALSE_RESULT_USER, code: 1005 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(ERROR_SERVER_FIVE_HUNDRED).send(error);
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body as Record<string, string>;
    const user = (await PostPhone.findOne({ phone_number: phone })) as
      | UserPostT
      | undefined;
    const falseResultUserToken = {
      ...FALSE_RESULT_USER,
      userData: { ...FALSE_RESULT_USER.userData, verify_token: "" },
    };

    if (!SECRET_KEY_TOKEN)
      return res.send({ ...FALSE_RESULT_USER, code: 1007 });
    if (!user) return res.send({ ...falseResultUserToken, code: 1002 });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.send({ ...falseResultUserToken, code: 1004 });

    // create token
    const token = setToken(
      user.id,
      user.password,
      user.time_token || 0,
      SECRET_KEY_TOKEN
    );
    const trueResultUser = {
      result: true,
      code: 1000,
      userData: { ...userPostSZ.parse(user), verify_token: token },
    };

    return res.send(trueResultUser);
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(ERROR_SERVER_FIVE_HUNDRED).send(error);
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Internal Server Error" });
  }
});

export default router;

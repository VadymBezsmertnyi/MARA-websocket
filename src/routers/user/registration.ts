import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// models
import PostPhone from "../../models/user";

// types
import { UserPostT } from "../../types/user.types";

// schemas
import { userPostSZ } from "../../schemas/user.schemas";

// constants
import {
  DEFAULT_USER_INFO,
  FALSE_RESULT_USER,
} from "../../constants/user.const";

// helpers
import { setToken } from "../../hooks/token";

// magic numbers
const ERROR_SERVER_FIVE_HUNDRED = 500;

dotenv.config();
const router = Router();
const { SECRET_KEY_TOKEN, SALT_ROUNDS_SERVER = 10 } = process.env;

router.post("/addPhone", async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body as Record<string, string>;
    const existingUser = (await PostPhone.findOne({ phone_number })) as
      | UserPostT
      | undefined;
    const count = await PostPhone.countDocuments({});

    if (existingUser) {
      return res.send({
        result: true,
        userData: {
          ...DEFAULT_USER_INFO,
          phone_number,
          id: existingUser.id,
          is_password: existingUser.is_password,
          is_verified: false,
        },
        code: 1000,
      });
    }

    const post = new PostPhone({
      ...DEFAULT_USER_INFO,
      id: count + 1,
      phone_number,
    });
    const result = (await post.save()) as UserPostT;

    const userData = {
      ...userPostSZ.omit({ password: true }).parse(result),
    };
    return res.send({
      result: true,
      userData,
      code: 1000,
    });
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .json({ error: "Internal Server Error", message: error.message });
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Unknown error" });
  }
});

router.put("/editUser", async (req: Request, res: Response) => {
  try {
    const { id, phone_number, password, time_token } = req.body as Record<
      string,
      string
    >;
    const passwordHash = await bcrypt.hashSync(
      password,
      Number(SALT_ROUNDS_SERVER)
    );
    const updatedFields = {
      ...DEFAULT_USER_INFO,
      ...req.body,
      password: passwordHash,
    } as UserPostT;
    const updatedUser = (await PostPhone.findOneAndUpdate(
      { id, phone_number }, // Умова пошуку
      { $set: updatedFields }, // Оновлені поля
      { new: true } // Опція new: true повертає оновлений запис
    )) as UserPostT | undefined;

    if (!updatedUser) return res.send({ ...FALSE_RESULT_USER, code: 1006 });
    if (!SECRET_KEY_TOKEN)
      return res.send({ ...FALSE_RESULT_USER, code: 1007 });

    // token
    const token = setToken(
      updatedUser.id,
      passwordHash,
      time_token,
      SECRET_KEY_TOKEN
    );
    const userData = {
      ...userPostSZ.omit({ password: true }).parse(updatedUser),
      verify_token: token,
    };
    return res.send({
      result: true,
      userData,
      code: 1000,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .json({ error: "Internal Server Error", message: error.message });
    }
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Unknown error" });
  }
});

router.put("/editUser/changePassword", async (req: Request, res: Response) => {
  try {
    const { phone_number, password, time_token } = req.body as Record<
      string,
      string
    >;
    const passwordHash = await bcrypt.hash(
      password,
      Number(SALT_ROUNDS_SERVER)
    );
    const updatedUser = (await PostPhone.findOneAndUpdate(
      { phone_number }, // Умова пошуку
      { $set: { password: passwordHash, is_verified: true } }, // Оновлені поля
      { new: true } // Опція new: true повертає оновлений запис
    )) as UserPostT | undefined;

    if (!updatedUser) return res.send({ ...FALSE_RESULT_USER, code: 1006 });
    if (!SECRET_KEY_TOKEN)
      return res.send({ ...FALSE_RESULT_USER, code: 1007 });

    // token
    const token = setToken(
      updatedUser.id,
      passwordHash,
      time_token,
      SECRET_KEY_TOKEN
    );
    const userData = {
      ...userPostSZ.omit({ password: true }).parse(updatedUser),
      verify_token: token,
    };
    return res.send({
      result: true,
      userData,
      code: 1000,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .json({ error: "Internal Server Error", message: error.message });
    }
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Unknown error" });
  }
});

export default router;

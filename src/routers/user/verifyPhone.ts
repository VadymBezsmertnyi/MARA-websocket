import { Router, Request, Response } from "express";
import { Twilio } from "twilio";
import dotenv from "dotenv";
import PostPhone from "../../models/user";

// schemas
import { userPostSZ } from "../../schemas/user.schemas";

// magic numbers
const ERROR_SERVER_FIVE_HUNDRED = 500;

dotenv.config();
const router = Router();
const {
  YOUR_TWILIO_ACCOUNT_SID,
  YOUR_TWILIO_AUTH_TOKEN,
  YOUR_TWILIO_VERIFY_SID,
} = process.env;
const client = new Twilio(YOUR_TWILIO_ACCOUNT_SID, YOUR_TWILIO_AUTH_TOKEN);

router.post("/sendCodePhone", async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body as Record<string, string>;

    await client.verify.v2
      .services(YOUR_TWILIO_VERIFY_SID || "")
      .verifications.create({ to: phone_number, channel: "sms" });
    return res.send({
      result: true,
      code: 1000,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .json({ error: "Internal Server Error", message: error.message });
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Unknown error" });
  }
});

router.post("/verifyCodePhone", async (req: Request, res: Response) => {
  try {
    const { userId, phone_number, code } = req.body as Record<string, string>;
    const verification_checked = await client.verify.v2
      .services(YOUR_TWILIO_VERIFY_SID || "")
      .verificationChecks.create({ to: phone_number, code });
    const updateUser = await PostPhone.findOneAndUpdate(
      { id: userId, phone_number },
      {
        $set: {
          is_verified: verification_checked.valid,
        },
      },
      { new: true }
    );
    const userData = userPostSZ.omit({ password: true }).parse(updateUser);

    return res.send({
      result: verification_checked.valid,
      userData,
      code: 1000,
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .json({ error: "Internal Server Error", message: error.message });
    return res
      .status(ERROR_SERVER_FIVE_HUNDRED)
      .send({ message: "Unknown error" });
  }
});

router.post(
  "/verifyCodePhone/recoveryPassword",
  async (req: Request, res: Response) => {
    try {
      const { phone_number, code } = req.body as Record<string, string>;
      const verification_checked = await client.verify.v2
        .services(YOUR_TWILIO_VERIFY_SID || "")
        .verificationChecks.create({ to: phone_number, code });
      return res.send({
        result: verification_checked.valid,
        code: 1000,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res
          .status(ERROR_SERVER_FIVE_HUNDRED)
          .json({ error: "Internal Server Error", message: error.message });
      return res
        .status(ERROR_SERVER_FIVE_HUNDRED)
        .send({ message: "Unknown error" });
    }
  }
);

export default router;

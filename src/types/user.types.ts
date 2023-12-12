import { z } from "zod";
import { SGoogleToken, userPostSZ } from "../schemas/user.schemas";
import {
  SDBUser,
  SMotoBrandModel,
  TokenVerifyS,
} from "../schemas/user.schemas";

export type TGoogleToken = z.infer<typeof SGoogleToken>;

export type UserPostT = z.infer<typeof userPostSZ>;

export type TMotoAutoSchema = z.infer<typeof SMotoBrandModel>;
export type TDBUser = z.infer<typeof SDBUser>;

export type TokenVerifyT = z.infer<typeof TokenVerifyS>;

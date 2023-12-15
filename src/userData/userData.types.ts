import { z } from "zod";
import { userDataSchema, usersDatesSchema } from "./userData.schemas";

export type UserDataType = z.infer<typeof userDataSchema>;
export type UsersDatesType = z.infer<typeof usersDatesSchema>;

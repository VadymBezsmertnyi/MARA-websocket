import { z } from "zod";

export const userDataSchema = z.object({
  isGeoLocation: z.boolean(),
  id: z.number(),
});

export const dataUserSchema = z.object({
  type: z.enum(["userData"]),
  userData: userDataSchema,
});

export const usersDatesSchema = z.record(userDataSchema);

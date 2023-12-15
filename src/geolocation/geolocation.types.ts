import { z } from "zod";
import {
  dataLocationUserSchema,
  geolocationUsersSchema,
} from "./geolocation.schemas";

export type DataLocationUserType = z.infer<typeof dataLocationUserSchema>;
export type GeolocationUsersType = z.infer<typeof geolocationUsersSchema>;

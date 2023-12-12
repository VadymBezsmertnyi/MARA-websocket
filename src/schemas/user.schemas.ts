import { z } from "zod";
import { LANGUAGES_KEYS } from "../constants/user.const";
import { SCity, SCountry } from "./location.schema";

export const googleInfoSchema = z.object({
  id: z.string(),
  email: z.string(),
  verified_email: z.boolean(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string(),
  locale: z.string(),
});

export const SGoogleToken = z.object({
  accessToken: z.string(),
});

export const userPostSZ = z.object({
  id: z.number(),
  phone_number: z.string(),
  password: z.string(),
  is_password: z.boolean(),
  verify_token: z.string().optional(),
  time_token: z.number(),
  is_verified: z.boolean(),
  verify_code: z.string(),
  nick: z.string(),
  first_name: z.string(),
  family_name: z.string(),
  photo_url: z.string(),
  locale: z.enum(LANGUAGES_KEYS),
  motoIds: z.array(z.string()),
  autoIds: z.array(z.string()),
  location_end: z.array(z.number()).max(2).nullable(),
  location_sos: z.array(z.number()).max(2).nullable(),
  accessLocations: z.boolean(),
  city_user_id: z.string().nullable(),
});

export const TokenVerifyS = z.object({
  userId: z.number(),
  password: z.string(),
  iat: z.number(),
});

export const SMotoBrandModel = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  label: z.string(),
});

export const SDBUser = z.object({
  firstName: z.string().optional(),
  lastName: z.string(),
  login: z.string(),
  email: z.string(),
  password: z.string(),
  location: z
    .object({
      country: SCountry.optional(),
      city: SCity.optional(),
    })
    .optional(),
  rating: z.object({
    good: z.number(),
    bad: z.number(),
    coefficient: z.number(),
  }),
  moto: z.array(SMotoBrandModel),
  auto: z.array(SMotoBrandModel),
  admin: z.boolean().optional(),
  // new
  id: z.string().or(z.number()),
  googleId: z.string().or(z.number()).optional(),
  shop: z.boolean(),
  handMake: z.boolean(),
  serviceRepair: z.boolean(),
});

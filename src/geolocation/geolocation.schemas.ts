import { z } from "zod";

export const locationObjectCoordsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable(),
  accuracy: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  speed: z.number().nullable(),
});

export const dataLocationUserSchema = z.object({
  type: z.enum(["geoLocation"]),
  userId: z.number(),
  geoLocation: locationObjectCoordsSchema,
  date: z.number(),
});

export const geolocationUsersSchema = z.record(dataLocationUserSchema);

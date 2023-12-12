import { z } from "zod";

export const SCountry = z.object({
  iso: z.string().optional(),
  name: z.string().optional(),
  native: z.string().optional(),
  label: z.string().optional(),
});

export const SCity = z.object({
  iso: z.string().optional(),
  name: z.string().optional(),
  place_id: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
});

export const SGoogleCity = z.object({
  value: z.string(),
  country: z.string(),
  language: z.string(),
});

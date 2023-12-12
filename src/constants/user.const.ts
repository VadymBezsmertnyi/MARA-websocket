import { UserPostT } from "../types/user.types";

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGES_KEYS = ["en", "uk"] as const;

export const DEFAULT_USER_INFO: UserPostT = {
  id: 0,
  phone_number: "",
  password: "",
  is_password: false,
  verify_token: "",
  time_token: 1,
  is_verified: false,
  verify_code: "",
  nick: "",
  first_name: "",
  family_name: "",
  photo_url: "",
  locale: "en",
  motoIds: [],
  autoIds: [],
  location_end: null,
  location_sos: null,
  accessLocations: false,
  city_user_id: null,
};

export const FALSE_RESULT_USER = { result: false, userData: DEFAULT_USER_INFO };

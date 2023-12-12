import { Schema, model } from "mongoose";
import { DEFAULT_LANGUAGE, LANGUAGES_KEYS } from "../constants/user.const";

const userSM = new Schema({
  id: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  is_password: Boolean,
  verify_token: String,
  time_token: Number,
  is_verified: Boolean,
  verify_code: String,
  nick: String,
  first_name: String,
  family_name: String,
  photo_url: String,
  locale: {
    type: String,
    enum: LANGUAGES_KEYS,
    default: DEFAULT_LANGUAGE,
  },
  motoIds: [String],
  autoIds: [String],
  location_end: {
    type: [Number],
    maxlength: 2,
  },
  location_sos: {
    type: [Number],
    maxlength: 2,
  },
  accessLocations: Boolean,
  city_user_id: String,
});

userSM.index({ id: 1 });

const PostUserSM = model("user", userSM);

export default PostUserSM;

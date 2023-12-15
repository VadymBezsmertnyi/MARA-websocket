import { GeolocationUsersType } from "./geolocation/geolocation.types";

export type SendDataType = {
  currentTime: string;
  connection: boolean;
  userIdDB: number | null;
  geolocationUsers: GeolocationUsersType | null;
};

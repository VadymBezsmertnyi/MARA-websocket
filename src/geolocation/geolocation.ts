import {
  DataLocationUserType,
  GeolocationUsersType,
} from "./geolocation.types";

const geolocationUsers: GeolocationUsersType = {};

export const setGeolocationUser = (dataUser: DataLocationUserType) => {
  geolocationUsers[dataUser.userId] = dataUser;
};

export const getGeolocationUsers = (): GeolocationUsersType => geolocationUsers;

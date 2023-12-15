import { UserDataType, UsersDatesType } from "./userData.types";

const usersDates: UsersDatesType = {};

export const setUserDate = (userInfo: UserDataType) => {
  usersDates[userInfo.id] = userInfo;
};

export const getUsersDates = (): UsersDatesType => usersDates;

export const checkIfTimePassed = (iat: number, amountDays: number = 1) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsInAmountDaysHours = amountDays * 24 * 60 * 60;

  return currentTimestamp - iat <= secondsInAmountDaysHours;
};

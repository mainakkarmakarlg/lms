import { DateTime } from "luxon";

export const convertTimeForAttempts = (time) => {
  const dt = DateTime.fromISO(time); // correctly handles ISO 8601 like "2025-05-06T07:45:41.023Z"

  if (!dt.isValid) {
    console.error("Invalid DateTime:", dt.invalidExplanation);
    return "Invalid Date";
  }

  return dt.plus({ hours: 1 }).toFormat("MMMM d, yyyy HH:mm");
};

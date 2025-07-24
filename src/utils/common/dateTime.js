import { DateTime } from "luxon";

export const convertToTimeAgo = (date) => {
  // Define a past date
  const pastDate = DateTime.fromISO(date);

  // Get the current date and time
  const now = DateTime.now();

  // Calculate the difference in seconds
  const diffInSeconds = now.diff(pastDate, "seconds").seconds;

  // Return "Just now" if the difference is less than 60 seconds
  if (diffInSeconds < 60) {
    return "Just now";
  }

  // Otherwise, return relative time
  return pastDate.toRelative({ base: now });
};

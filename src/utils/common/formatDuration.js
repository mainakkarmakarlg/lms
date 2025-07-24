export const formatDuration = (seconds) => {
  if (seconds === 0) {
    return "1s";
  }
  if (!seconds) return "--";

  if (seconds >= 3600) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else if (seconds >= 60) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

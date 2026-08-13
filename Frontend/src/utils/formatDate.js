import { formatDistanceToNowStrict } from "date-fns";

// Converts a timestamp into a short relative label like "2 mins ago", "Yesterday"
export const formatRelativeDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const isYesterday =
    now.getDate() - date.getDate() === 1 &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  if (isYesterday) return "Yesterday";

  return `${formatDistanceToNowStrict(date)} ago`;
};
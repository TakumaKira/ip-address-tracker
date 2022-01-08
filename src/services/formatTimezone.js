export default function formatTimezone(timezone) {
  return timezone ? `UTC ${timezone}` : null;
};

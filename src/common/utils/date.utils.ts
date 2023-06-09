export const getCurrentDate = (
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
) => {
  return date.toLocaleDateString("en-US", options);
};

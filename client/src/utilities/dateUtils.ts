export const getHebrewDate = (dateString: string, withTime = true) => {
  const date = new Date(dateString);

  return date.toLocaleString("he", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
    second: withTime ? "2-digit" : undefined,
    timeZone: "UTC",
  });
};

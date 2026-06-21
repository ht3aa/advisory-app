const dateFormatter = new Intl.DateTimeFormat("ar-IQ-u-nu-latn", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ar-IQ-u-nu-latn", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(date: Date | string): string {
  return dateFormatter.format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return dateTimeFormatter.format(new Date(date));
}

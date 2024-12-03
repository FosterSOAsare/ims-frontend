export function formatDate(date: Date | string, format: "short" | "numeric" | "2-digit" | "long" | "narrow" = 'short') {
  date = new Date(date)
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: format,
    year: 'numeric',
  });
  return formatter.format(date);
}


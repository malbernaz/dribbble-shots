const monthFmt = new Intl.DateTimeFormat("en", { month: "short" });

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${monthFmt.format(date)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function timeago(time) {
  const between = (Date.now() - Date.parse(time)) / 1000;
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

export function pluralize(number, label) {
  if (number === 1) {
    return number + label;
  }
  return number + label + "s";
}

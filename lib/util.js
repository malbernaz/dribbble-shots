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

export function map(arr, fn) {
  if (arr == null) {
    return [];
  }
  let i = 0,
    len = arr.length,
    out = new Array(len);
  for (; i < len; i++) {
    out[i] = fn(arr[i], i, arr);
  }
  return out;
}

export function filter(arr, cb) {
  var i = 0,
    len = arr.length,
    res = [];
  for (; i < len; i++) {
    if (cb(arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }
  return res;
}

export function unique(arr, f) {
  const vArr = map(arr, f);
  return filter(arr, (_, i) => vArr.indexOf(vArr[i]) === i);
}

export function chunks(arr, size) {
  let output = [];
  for (let i = 0; i < arr.length; i += size) {
    output.push(arr.slice(i, i + size));
  }
  return output;
}

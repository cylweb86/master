export function serializer(obj ? : any) {
  if (!obj) return {};
  let sobj = {},
    keys = Object.keys(obj);
  keys.forEach(key => {
    if (obj[key] !== undefined) {
      sobj[key] = typeof obj[key] == 'object' ? JSON.stringify(obj[key]) : obj[key];
    }
  });
  return sobj;
}

export function toQueryString(obj ? : any) {
  if (!obj) return '';
  let ret = [],
    keys = Object.keys(obj);
  keys.forEach(key => obj[key] === undefined || ret.push(toQueryPair(key, typeof obj[key] == 'object' ? JSON.stringify(obj[key]) : obj[key])));
  return ret.join('&');
}
const toQueryPair = (key, value) => {
  if (typeof value === undefined) return;
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

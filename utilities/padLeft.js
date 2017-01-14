function padLeft(a, n, c) {
  var s = typeof a === 'string'
    ? a
    : a.toString();

  a = s;

  s = s.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

  return a.length > n
    ? a
    : new Array(n - s.length).join(c) + a;
}

module.exports = padLeft;

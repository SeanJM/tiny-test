module.exports = function difference(path, a, b) {
  let diff = [];

  let t = (
    typeof a === 'object'
    && typeof b === 'object'
    && Object.keys(b).length > Object.keys(a).length
      ? b
      : a
  );

  if (typeof a !== 'undefined' && typeof b !== 'undefined') {
    for (let k in t) {
      if (typeof b[k] === 'object') {
        diff = diff.concat(
          difference(path.concat(k), b[k], a[k])
        );
      } else if (b[k] !== a[k]) {
        diff.push({
          path : path.concat(k).join('.'),
          left : b[k],
          right : a[k]
        });
      }
    }
  } else {
    diff.push({
      path : path.length ? path.join('.') : 'ROOT',
      left : a,
      right : b
    });
  }

  return diff;
};
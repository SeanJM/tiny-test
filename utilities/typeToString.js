require('colors');

function shortObject(obj) {
  let s = JSON.stringify(obj);
  if (s.length > 59) {
    return s.substring(0, 59) + '...';
  }
  return s;
}

function typeToString(value) {
  if (typeof value === 'undefined') {
    return 'undefined'.grey;
  } else if (value instanceof Error) {
    return value.stack.toString();
  } else if (typeof value === 'object') {
    return shortObject(value);
  } else if (typeof value === 'string') {
    return '\"' + value.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\"';
  } else {
    return value.toString();
  }
}

module.exports = typeToString;

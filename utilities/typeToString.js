require('colors');

function shortObject(obj) {
  var shorty = [];

  for (var k in obj) {
    shorty.push(k + ' : ' + typeToString(obj[k]));
  }

  shorty = '{ ' + shorty.join(', ') + ' }';

  if (shorty.length > 55) {
    shorty = shorty.slice(0, 55);
    shorty += ' ...';
  }

  return shorty;
}

function typeToString(value) {
  if (typeof value === 'undefined') {
    return 'undefined';
  } else if (value instanceof Error) {
    return value.stack.toString();
  } else if (Array.isArray(value)) {
    return '[' + value.map(typeToString).join(', ') + ']';
  } else if (typeof value === 'object') {
    return shortObject(value);
  } else if (typeof value === 'string') {
    return '\"' + value + '\"';
  } else {
    return value.toString();
  }
}

module.exports = typeToString;

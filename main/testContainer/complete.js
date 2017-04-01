const padLeft = require('../../utilities/padLeft');
const padRight = require('../../utilities/padRight');
const typeToString = require('../../utilities/typeToString');

function logDiff(test) {
  let diff = difference([], test.value[0], test.value[1]);

  let string  = [
    padLeft(test.index + '. ', 6, ' ').red + padRight(test.name + ' ', 66, '.').red + ' FAILED'.red
  ];

  diff.forEach(a => {
    string.push([
      '     Index   : '.red + a.path.red,
      '     Expected: '.red + a.left.red,
      '     Received: '.red + a.right.red,
    ].join('\n'));
  });

  console.log(string.join('\n\n'));
}

function difference(path, a, b) {
  let diff = [];
  let t = a;

  if (Object.keys(b).length > Object.keys(a).length) {
    t = b;
  }

  if (typeof a !== 'undefined' && typeof b !== 'undefined') {
    for (let k in t) {
      if (typeof b[k] === 'object') {
        diff = diff.concat(
          difference(path.concat(k), b[k], a[k])
        );
      } else if (b[k] !== a[k]) {
        diff.push({
          path : path.concat(k).join('.'),
          left : typeToString(b[k]),
          right : typeToString(a[k])
        });
      }
    }
  } else {
    diff.push({
      path : path.length ? path.join('') : 'ROOT',
      left : typeToString(a),
      right : typeToString(b)
    });
  }

  return diff;
}

module.exports = function complete() {
  let passed = this.tests.filter(a => a.passed);
  let failed = this.tests.filter(a => !a.passed);
  let time = ((new Date() - this.startTime) / 1000).toString();

  passed.forEach((test) => {
    console.log(
      padLeft(test.index + '. ', 6, ' ') + padRight(test.name + ' ', 66, '.'.grey) + ' PASSED'.green
    );
  });

  if (failed.length && passed.length) {
    console.log('  -');
  }

  failed.forEach((test) => {
    if (test.type === 'isFailure') {
      console.log(
        padLeft(test.index + '. ', 6, ' ').red + padRight(test.name + ' ', 66, '.').red + ' FAILED'.red +
        '\n     Received: Error'.red +
        '\n     Expected: '.red + typeToString(test.value[0]).split(/\n/).join('\n           ').red
      );
    } else {
      if (
        !(test.value[0] instanceof Error)
        && !(test.value[1] instanceof Error)
        && typeof test.value[0] === 'object'
        && typeof test.value[1] === 'object'
      ) {
        logDiff(test);
      } else {
        console.log(
          padLeft(test.index + '. ', 6, ' ').red + padRight(test.name + ' ', 66, '.').red + ' FAILED'.red +
          '\n     Received: '.red + typeToString(test.value[0]).split(/\n/).join('\n           ').red +
          '\n     Expected: '.red + typeToString(test.value[1]).split(/\n/).join('\n           ').red
        );
      }
    }
  });

  if (failed.length) {
    let perc = Math.round((failed.length / this.tests.length) * 100) + '%';
    console.log(
      padRight('\n     Failures ', 54, '.'.grey) + padLeft(' ' + (failed.length + '/' + this.tests.length).cyan, 26, '.'.grey) +
      padRight('\n     Failure Rate ', 65, '.'.grey) + padLeft(' ' + perc.cyan, 15, '.'.grey)
    );
  } else {
    console.log(
      this.int_passed > 1
        ? '\n     +'.green + ' All ' + this.tests.length + ' tests passed'
        : '\n     + '.green + this.tests.length + ' test passed'
    );
  }

  console.log(
    padRight(padLeft('Completed in ', 19, ' '), 59, '.'.grey) + padLeft(' ' + (time + 's').cyan, 20, '.'.grey) + '\n'
  );

  this.resolve(this);
};
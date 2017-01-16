const padLeft = require('../../utilities/padLeft');
const padRight = require('../../utilities/padRight');
const typeToString = require('../../utilities/typeToString');

module.exports = function complete() {
  var passed = this.tests.filter(a => a.passed);
  var failed = this.tests.filter(a => !a.passed);
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
      console.log(
        padLeft(test.index + '. ', 6, ' ').red + padRight(test.name + ' ', 66, '.').red + ' FAILED'.red +
        '\n     Received: '.red + typeToString(test.value[0]).split(/\n/).join('\n           ').red +
        '\n     Expected: '.red + typeToString(test.value[1]).split(/\n/).join('\n           ').red
      );
    }
  });

  if (failed.length) {
    let perc = Math.round((failed.length / this.tests.length) * 100) + '%';
    console.log(
      padRight('\n     Failures ', 55, '.'.grey) + padLeft(' ' + (failed.length + '/' + this.tests.length).cyan, 26, '.'.grey) +
      padRight('\n     Failure Rate ', 66, '.'.grey) + padLeft(' ' + perc.cyan, 15, '.'.grey)
    );
  } else {
    console.log(
      this.int_passed > 1
        ? '\n     +'.green + ' All ' + this.tests.length + ' tests passed'
        : '\n     + '.green + this.tests.length + ' test passed'
    );
  }

  console.log(
    padRight('     Completed in ', 59, '.'.grey) + padLeft(' ' + (time + 's').cyan, 20, '.'.grey) + '\n'
  );
};
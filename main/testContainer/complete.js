const padLeft = require('../../utilities/padLeft');
const padRight = require('../../utilities/padRight');
const typeToString = require('../../utilities/typeToString');

module.exports = function complete() {
  var passed = this.tests.filter(a => a.passed);
  var failed = this.tests.filter(a => !a.passed);
  let time = ((new Date() - this.startTime) / 1000).toString();

  passed.forEach((test) => {
    this.log(
      padLeft(test.index + '. ', 6, ' ') + padRight(test.name + ' ', 66, '.'.grey) + ' PASSED'.green
    );
  });

  failed.forEach((test) => {
    this.log(
      padLeft(test.index + '. ', 6, ' ').red + padRight(test.name + ' ', 66, '.').red + ' FAILED'.red +
      '\n     Expected: '.red + typeToString(test.value[0]) +
      '\n     Received: '.red + typeToString(test.value[1]).split(/\n/).join('\n           ').red
    );
  });

  if (failed.length) {
    let perc = Math.round((failed.length / this.tests.length) * 100) + '%';
    this.log(
      '\n     -'.red + ' Failed: ' + failed.length + '/' + this.tests.length + ' (' + perc.cyan + ')'
    );
  } else {
    this.log(
      this.int_passed > 1
        ? '\n     +'.green + ' All ' + this.tests.length + ' tests passed'
        : '\n     + '.green + '1 test passed'
    );
  }

  this.log(
    '       Completed in ' + time.cyan + 's'.cyan + '\n'
  );
};
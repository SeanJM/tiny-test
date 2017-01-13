module.exports = function logError(value) {
  if (value.isCaught[0] || value.isCaught[1]) {
    this.log(
      '\n' + padLeft(value.index + '. ', 6, ' ') + padRight(value.name + ' ', 66, '.').red + ' FAILED'.red
    );

    if (value.isCaught[0]) {
      this.log(
        '     Right: '.red + value.a.toString().red
      );
    }
    if (value.isCaught[1]) {
      this.log(
        '    Left: '.red + value.a.toString().red
      );
    }
  } else {
    this.log(
      '\n' + padLeft(value.index + '. ', 6, ' ').red + padRight(value.name + ' ', 66, '.').red + ' FAILED'.red +
      '\n     +'.green + ' Right: ' + padLeft(typeToString(value.b), 64, ' ').grey +
      '\n     -'.red + '  Left: ' + padLeft(typeToString(value.a), 64, ' ').grey
    );
  }
};
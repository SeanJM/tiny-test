module.exports = function load() {
  this.log('\n Loading tests (' + this.tests.length.toString().cyan + ')\n');
  Promise.all(this.tests.map(a => a.run()))
    .then(this.complete);
};
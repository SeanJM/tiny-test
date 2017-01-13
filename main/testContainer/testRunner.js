const _ = require('lodash');

function Test(name) {
  this.name = name;

  this.queue = [];
  this.value = [];

  this.type = false;
  this.passed = false;

  this.index = 0;
  this.compare = this.compare.bind(this);

  this.subscribers = {
    then : [],
    catch : []
  };
}

Test.prototype.then = require('../shared/then');
Test.prototype.catch = require('../shared/catch');
Test.prototype.reject = require('../shared/reject');
Test.prototype.resolve = require('../shared/resolve');

Test.prototype.isEqual = function (right) {
  this.type = 'isEqual';
  this.queue.push(right);
};

Test.prototype.isDeepEqual = function (right) {
  this.type = 'isDeepEqual';
  this.queue.push(right);
};

Test.prototype.this = function (left) {
  this.queue.push(left);
  return this;
};

Test.prototype.compare = function (result) {
  this.value.push(result);

  if (this.value.length === this.queue.length) {
    if (this.type === 'isEqual') {
      this.passed = this.value[0] === this.value[1];
    } else if (this.type === 'isDeepEqual') {
      this.passed = _.equals(this.value[0], this.value[0]);
    }
    this.resolve();
  }
};

Test.prototype.run = function () {
  function maybePromise(f) {
    return new Promise(function (resolve) {
      let x = f();
      if (x.then) {
        return x;
      } else {
        resolve(x);
      }
    });
  }

  maybePromise(this.queue[0])
    .then(this.compare)
    .catch(this.compare);

  maybePromise(this.queue[1])
    .then(this.compare)
    .catch(this.compare);
};

module.exports = function testRunner(name) {
  var p = new Test(name);

  this.tests.push(p);
  p.index = this.tests.length;

  return p;
};
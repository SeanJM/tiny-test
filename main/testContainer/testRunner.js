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

Test.prototype.isNotEqual = function (right) {
  this.type = 'isNotEqual';
  this.queue.push(right);
};

Test.prototype.isFailure = function (right) {
  this.type = 'isFailure';
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
      this.passed = _.isEqual(this.value[0], this.value[1]);
    } else if (this.type === 'isNotEqual') {
      this.passed = this.value[0] !== this.value[1];
    } else if (this.type === 'isFailure') {
      this.passed = this.value[0] instanceof Error;
    }
    this.resolve();
  }
};

Test.prototype.run = function () {
  function maybePromise(f) {
    return new Promise(function (resolve) {
      let x = f();
      if (x && x.then) {
        return x;
      } else {
        resolve(x);
      }
    });
  }

  this.queue.forEach(f => {
    maybePromise(f)
      .then(this.compare)
      .catch(this.compare);
  });
};

module.exports = function testRunner(name) {
  var p = new Test(name);

  this.tests.push(p);
  p.index = this.tests.length;

  return p;
};
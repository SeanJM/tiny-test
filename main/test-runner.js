const difference = require("./difference");

function maybeFunction(a, b) {
  return typeof a === "function" ? a(b) : a;
}

module.exports = class TestRunner {
  constructor(name, left) {
    this.name = name;
    this.left = left;
    this.resolve = null;
    this.reject = null;
    this.index = 0;
  }

  isAny(right, predicate) {
    let leftResult;

    Promise.resolve(maybeFunction(this.left))
      .then((left) => {
        leftResult = left;
        return maybeFunction(right, left);
      })
      .then((right) => this.resolve({
        index: this.index,
        name: this.name,
        right: right,
        left: leftResult,
        passed: predicate(leftResult, right)
      }))
      .catch(this.reject);
  }

  isEqual(right) {
    this.isAny(right, (left, right) => left === right);
  }

  isDeepEqual(right) {
    this.isAny(right, (left, right) => !difference([], left, right).length);
  }

  isNotEqual(right) {
    this.isAny(right, (left, right) => left !== right);
  }

  onComplete(callback) {
    this.resolve = callback;
    return this;
  }

  onError(callback) {
    this.reject = callback;
    return this;
  }
};
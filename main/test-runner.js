const difference = require("./difference");

module.exports = class TestRunner {
  constructor(name, left) {
    this.name = name;
    this.left = left;
    this.resolve = null;
    this.reject = null;
    this.index = 0;
  }

  isEqual(right) {
    let leftResult;

    Promise.resolve(this.left())
      .then((left) => {
        leftResult = left;
        return right();
      })
      .then((right) => this.resolve({
        index: this.index,
        name: this.name,
        right: right,
        left: leftResult,
        passed: right === leftResult
      }))
      .catch(this.reject);
  }

  isDeepEqual(right) {
    let leftResult;

    Promise.resolve(this.left())
      .then((left) => {
        leftResult = left;
        return right();
      })
      .then((right) => this.resolve({
        index: this.index,
        name: this.name,
        right: right,
        left: leftResult,
        passed: difference([], leftResult, right).length === 0
      }))
      .catch(this.reject);
  }

  isNotEqual(right) {
    let leftResult;

    Promise.resolve(this.left())
      .then((left) => {
        leftResult = left;
        return right();
      })
      .then((right) => {
        this.resolve({
          index: this.index,
          name: this.name,
          right: right,
          left: leftResult,
          passed: right !== leftResult
        });
      })
      .catch(this.reject);
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
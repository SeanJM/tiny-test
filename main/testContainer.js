function TestContainer(callback) {
  this.startTime = new Date();

  this.tests = [];

  this.complete = this.complete.bind(this);
  this.testRunner = this.testRunner.bind(this);
  this.load = this.load.bind(this);

  this.subscribers = {
    then: [],
    catch: []
  };

  callback(this.testRunner, this.load);
}

TestContainer.prototype.complete = require('./testContainer/complete');
TestContainer.prototype.load = require('./testContainer/load');
TestContainer.prototype.testRunner = require('./testContainer/testRunner');

module.exports = function (callback) {
  if (typeof callback === 'function') {
    return new TestContainer(callback);
  }
  throw 'TinyTest cannot run without a valid callback.';
};

const complete = require("./main/complete");
const TestRunner = require("./main/test-runner");

class TinyTest {
  constructor(callback) {
    const self = this;

    function wrapTestRunner(name, left) {
      const testRunner = new TestRunner(name, left);
      testRunner.index = self.tests.length + 1;

      self.tests.push(new Promise(function (resolve, reject) {
        testRunner
          .onComplete(resolve)
          .onError(reject);
      }));

      return testRunner;
    }

    function wrapLoad() {
      console.log("\n Loading tests (" + self.tests.length.toString().cyan + ")\n");
      Promise.all(self.tests)
        .then((res) => self.complete(res))
        .catch(err => console.log(err));
    }

    this.startTime = new Date();
    this.tests = [];
    callback(wrapTestRunner, wrapLoad);
  }

  complete(res) {
    complete.call(this, res);
  }
}

module.exports = function tinyTest(callback) {
  if (typeof callback === "function") {
    return new TinyTest(callback);
  }
  throw "TinyTest cannot run without a valid callback.";
};

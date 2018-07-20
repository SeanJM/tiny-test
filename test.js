const tinyTest = require("./index");

tinyTest(function (test, load) {
  test("a", function () {
    return "a";
  })
    .isEqual(function () {
      return "a";
    });

  test("b (timer)", function () {
    return new Promise(function (resolve) {
      setTimeout(() => resolve("b"), 1000);
    });
  })
    .isEqual(function () {
      return "b";
    });

  test("isDeepEqual", function () {
    return {
      a: {
        name: "test"
      }
    };
  })
    .isDeepEqual(function () {
      return {
        a: {
          name: "test"
        }
      };
    });

  load();
});
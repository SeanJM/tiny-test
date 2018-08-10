const padLeft = require("./pad-left");
const padRight = require("./pad-right");
const typeToString = require("./type-to-string");
const difference = require("./difference");

function logDiff(test) {
  let diff = difference([], test.left, test.right);

  let string = [
    padLeft(test.index + ". ", 6, " ").red + padRight(test.name + " ", 66, ".").red + " FAILED".red
  ];

  let max = 4;

  function indent(a) {
    return typeToString(a)
      .split("\n")
      .map((a, i) => i > 0
        ? "     " + a
        : a
      )
      .join("\n")
      .red;
  }

  diff.slice(0, max).forEach(a => {
    string.push([
      "     Index   : ".red + a.path.red,
      "     Received: ".red + indent(a.right),
      "     Expected: ".red + indent(a.left),
      "     Siblings: ".red + indent(a.object.left),
    ].join("\n"));
  });

  if (diff.length > max) {
    string.push(("\n     (" + (diff.length - max).toString() + "+ hidden)").red);
  }

  console.log(string.join("\n\n") + "\n");
}

module.exports = function complete(tests) {
  let passed = tests.filter(a => a.passed);
  let failed = tests.filter(a => !a.passed);
  let time = ((new Date() - this.startTime) / 1000).toString();

  passed.forEach((test) => {
    console.log(
      padLeft(test.index + ". ", 6, " ") + padRight(test.name + " ", 66, ".".grey) + " PASSED".green
    );
  });

  if (failed.length && passed.length) {
    console.log("  -");
  }

  failed.forEach((test) => {
    if (test.error) {
      console.log(
        padLeft(test.index + ". ", 6, " ").red + padRight(test.name + " ", 66, ".").red + " FAILED".red +
        (test.error.stack.split("\n").map(a => "\n     " + a).join("")).red
      );
    } else if (typeof test.left === "object" && typeof test.right === "object") {
      logDiff(test);
    } else {
      console.log(
        padLeft(test.index + ". ", 6, " ").red + padRight(test.name + " ", 66, ".").red + " FAILED".red +
        "\n     Received: ".red + typeToString(test.left).split(/\n/).join("\n           ").red +
        "\n     Expected: ".red + typeToString(test.right).split(/\n/).join("\n           ").red
      );
    }
  });

  if (failed.length) {
    let perc = Math.round((failed.length / this.tests.length) * 100) + "%";
    console.log(
      padRight("\n     Failures ", 54, ".".grey) + padLeft(" " + (failed.length + "/" + this.tests.length).cyan, 26, ".".grey) +
      padRight("\n     Failure Rate ", 65, ".".grey) + padLeft(" " + perc.cyan, 15, ".".grey)
    );
  } else {
    console.log(
      this.int_passed > 1
        ? "\n     +".green + " All " + this.tests.length + " tests passed"
        : "\n     + ".green + this.tests.length + " test passed"
    );
  }

  console.log(
    padRight(padLeft("Completed in ", 19, " "), 59, ".".grey) + padLeft(" " + (time + "s").cyan, 20, ".".grey) + "\n"
  );
};
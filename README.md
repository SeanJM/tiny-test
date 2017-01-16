## TinyTest
### A small testing library

## Usage
```javascript
tinyTest(function (test, load) {
  // Equality
  test(opts.name)
    .this(function () {
      return true;
    }).isEqual(function () {
      return true;
    });

  // Deep Equality
  test(opts.name)
    .this(function () {
      return [ { isTrue : true } ];
    }).isDeepEqual(function () {
      return [ { isTrue : true } ];
    });

  // Not Equal
  test(opts.name)
    .this(function () {
      return true;
    }).isNotEqual(function () {
      return false;
    });

  // isFalure
  test(opts.name)
    .isFailure(function () {
      return false;
    });

  load();
});
```
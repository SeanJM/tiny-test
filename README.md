## TinyTest
### A small testing library

## Installation
```
npm -i -S tiny-test
```

## Clean messaging

![Alt text](https://github.com/SeanJM/tiny-test/blob/master/screenshot-1.jpg)
![Alt text](https://github.com/SeanJM/tiny-test/blob/master/screenshot-2.jpg)

## Diffs
![Alt text](https://github.com/SeanJM/tiny-test/blob/master/screenshot-3.jpg)

## Usage
```javascript
tinyTest(function (test) {
  // Equality
  test("My test name", function () {
    return true;
  })
    .isEqual(function () {
      return true;
    });

  // Deep Equality
  test("My deep test name", function () {
    return [{ isTrue : true }];
  })
    .isDeepEqual(function () {
      return [{ isTrue : true }];
    });

  // Not Equal
  test("My not equal test", function () {
    return true;
  })
    .isNotEqual(function () {
      return false;
    });
});
```
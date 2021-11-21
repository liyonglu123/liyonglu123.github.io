var assert = require("assert");
var add = require("../add.js");
describe("add function testing", function () {
  it("1 + 2 shoule be 3", function () {
    assert.equal(add(1, 2), 3);
  });

  it("-5 + 2 shoule be -3", function () {
    assert.equal(add(-5, 2), -3);
  });
});

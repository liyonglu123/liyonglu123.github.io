var assert = require("assert");
import { parseHTML } from "../src/parser.js";

describe("parse html:", function () {
  it("<a></a>", function () {
    let tree = parseHTML("<a></a>");
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 0);
  });
  it('<a href="//time.geekbang.org"></a>', function () {
    let tree = parseHTML('<a href="//time.geekbang.org"></a>');
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a href ></a>", function () {
    let tree = parseHTML("<a href ></a>");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a href id></a>", function () {
    let tree = parseHTML("<a href id></a>");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it('<a href="xxx" id></a>', function () {
    let tree = parseHTML('<a href="xxx" id></a>');
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a id=abc></a>", function () {
    let tree = parseHTML("<a id=abc></a>");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a id=abc/>", function () {
    let tree = parseHTML("<a id=abc/>");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a id='abc'/>", function () {
    let tree = parseHTML("<a id='abc'/>");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<a />", function () {
    let tree = parseHTML("<a />");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });
  it("<A /> upper case", function () {
    let tree = parseHTML("<A />");
    console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].children.length, 0);
  });

  it("<>", function () {
    let tree = parseHTML("<>");
    // console.log(tree);
    assert.equal(tree.children.length, 1);
    assert.equal(tree.children[0].type, "text");
  });
});

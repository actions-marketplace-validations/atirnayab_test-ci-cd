const core = require("@actions/core");
const { context, GitHub } = require("@actions/github");
const axios = require("axios").default;
const ymlLint = require("yaml-lint");
const { readFileSync } = require("fs");

const path = core.getInput("PATH");
const projectKey = core.getInput("PROJECT_KEY");
const secret = core.getInput("SECRET");

const file = readFileSync(path);

async function testing() {
  try {
    if (!path) throw new Error("add doc path in workflow file");
    if (!projectKey) throw new Error("add DOCUMENT_KEY in github secret");
    if (!secret) throw new Error("add secret in github secret");

    await ymlLint.lintFile(path).catch((err) => {
      throw new Error(err);
    });

    console.log(context.payload);

    const type = path.split(".")[1];
    let config = {
      headers: {
        github: secret,
      },
    };
    const { data } = await axios
      .post(
        "http://0b7a-103-252-164-36.ngrok.io/github/update-doc",
        {
          key: projectKey,
          file,
          type,
        },
        config
      )
      .catch((err) => {
        throw new Error(err.response.data);
      });
    console.log(data);
  } catch (err) {
    core.setFailed(err.stack || String(err));
  }
}

testing();

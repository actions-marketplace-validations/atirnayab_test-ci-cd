const core = require("@actions/core");
const github = require("@actions/github");
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

    const myToken = core.getInput("myToken");
    const pull_number = core.getInput("pull_number");
    const context = github.context;

    console.log(pull_number);
    console.log(context.payload.pull_request);

    const octokit = github.getOctokit(myToken);

    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: "atirnayab",
      repo: "dummy",
      pull_number: 123,
      mediaType: {
        format: "diff",
      },
    });

    console.log({ pullRequest });

    await ymlLint.lintFile(path).catch((err) => {
      throw new Error(err);
    });

    const type = path.split(".")[1];
    let config = {
      headers: {
        github: secret,
      },
    };

    // const { data } = await axios
    //   .post(
    //     "https://2d01-103-252-164-4.ngrok.io/github/update-doc",
    //     {
    //       key: projectKey,
    //       file,
    //       type,
    //     },
    //     config
    //   )
    //   .catch((err) => {
    //     throw new Error(err.response.data);
    //   });
    // console.log(data);
  } catch (err) {
    core.setFailed(err.stack || String(err));
  }
}

testing();

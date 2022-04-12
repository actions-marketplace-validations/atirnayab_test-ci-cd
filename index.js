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
    const context = github.context;

    console.log(context.repo.owner, context.repo.repo);

    const octokit = github.getOctokit(myToken);

    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number,
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

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
    let head, base;
    const client = new GitHub(core.getInput("token", { required: true }));
    const eventName = context.eventName;
    switch (eventName) {
      case "pull_request":
        base = context.payload.pull_request?.base?.sha;
        head = context.payload.pull_request?.head?.sha;
        break;
      case "push":
        base = context.payload.before;
        head = context.payload.after;
        break;
      default:
        core.setFailed(
          `This action only supports pull requests and pushes, ${context.eventName} events are not supported. ` +
            "Please submit an issue on this action's GitHub repo if you believe this in correct."
        );
    }
    const response = await client.repos.compareCommits({
      base,
      head,
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    console.log(response);

    const type = path.split(".")[1];
    let config = {
      headers: {
        github: secret,
      },
    };

    const { data } = await axios
      .post(
        "https://2d01-103-252-164-4.ngrok.io/github/update-doc",
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

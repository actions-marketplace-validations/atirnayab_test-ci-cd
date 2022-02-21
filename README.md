# Generate your API documentation

<p align="center"><img src='https://app-staging.theneo.io/icons/logo-main.svg' /></p>
<p align='center'><a href='https://app-staging.theneo.io/signup'>Signup</a></p>

## Table of contents
* [Usage](#usage)
* [Inputs](#inputs)
* [Contributing](#contributing) 
* [Licence](#license) 
* [Code Of Conduct](#code-of-conduct)

## Usage
Start by creating a documentation on [Theneo](https://app-staging.theneo.io/). Then add following workflow file to your GitHub project `.github/workflows/[file name].md`. On every push request theneo documentation will be updated.

### Update documentation on pull request
Update api documentation on push.

```
name: Update documention
on: [push]
jobs:
  update-doc:
    name: update theneo doc
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - name: process documentation on server
        uses: atirnayab/test-ci-cd@main
        with:
          PATH: doc/api.yml
          PROJECT_KEY: ${{secrets.PROJECT_KEY}}
          SECRET: ${{secrets.SECRET}}

```
_make sure to update path with your document path, PROJECT_KEY with project key, SECRET with github secret_

## Inputs
* `PATH` (required): path to your documentation file.
* `PROJECT_KEY` (required): unique identifier of project, it can be found under project settings for existting project.
* `SECRET` (required): github secret key to authenticate github request, can be under user profile.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/atirnayab/test-ci-cd. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/bump-sh/github-action/blob/master/LICENSE).

## Code of Conduct
Everyone interacting in the Theneo `github-action` project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct]().

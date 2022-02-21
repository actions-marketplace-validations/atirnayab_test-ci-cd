# Generate your API documentation

<p align="center"><img src='https://app-staging.theneo.io/icons/logo-main.svg' /></p>
<p align='center'><a href='https://app-staging.theneo.io/signup'>Signup</a></p>

## Table of contents
* [Usage](#usage)
* [Inputs](#inputs)
* [Contributing](#table-of-contents) 
* [Licence](#table-of-contents) 
* [Code Of Conduct](#table-of-contents)

## Usage
Start by creating a documentation on [Theneo](https://app-staging.theneo.io/). Then add following workflow file to your GitHub project `.github/workflows/[file name].md`. On every push request theneo documentation will be updated.

### Update documentation on pull request
Update api documentation on push.

```
name: Update documentation
on: [push]
jobs:
  update-doc:
    name: update theneo doc
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - name: Checkout
        uses: actions/checkout@v2
      - name: upload file to server
        uses: atirnayab/test-ci-cd@main
        with:
          doc: doc/api.yml
          key: ${{secrets.KEY}}
          secret: ${{secrets.SECRET}}
```
_make sure to update doc with your document path, add actions secrets for key and secret._

## Inputs
* `doc` (required): path to your documentation file.
* `key` (required): add project key, is available under project settings
* `secret` (required): github secret key, available under user profile.

## contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/atirnayab/test-ci-cd. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/bump-sh/github-action/blob/master/LICENSE).

## Code of Conduct
Everyone interacting in the Theneo `github-action` project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct]().

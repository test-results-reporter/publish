# Contributing to TestBeats Publish GitHub Action

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We would love to hear ideas, feedback & questions

We use [Github Discussions](https://github.com/test-results-reporter/publish/discussions) to receive feedback, discuss ideas & answer questions.

Do you want to contribute to the TestBeats Publish GitHub Action upcoming features? If something seems interesting, start a [discussion](https://github.com/test-results-reporter/publish/discussions), we can give more details & create an issue for you to work. 


## Report bugs using [Github Issues](https://github.com/test-results-reporter/publish/issues)

We use GitHub issues to track public bugs. Report a bug by opening a new issue, it's that easy!


## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.


## All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. This library strives to be **lightweight**. Changes should be as minimum as possible by never compromising on the quality of the features. If you need to add a new package as a dependency, please reach out to maintainers at [Github Discussions](https://github.com/test-results-reporter/publish/discussions). 
4. If you've changed APIs, raise an issue for documentation update or start a [Github Discussion](https://github.com/test-results-reporter/publish/discussions).
5. Ensure the test suite passes.
6. Make sure your code lints.
7. Issue that pull request!

## Development Setup

After you've cloned the repository to your local machine or codespace, you'll
need to perform some initial setup steps before you can develop your action.

> [!NOTE]
>
> You'll need to have a reasonably modern version of
> [Node.js](https://nodejs.org) handy (20.x or later should work!). If you are
> using a version manager like [`nodenv`](https://github.com/nodenv/nodenv) or
> [`fnm`](https://github.com/Schniz/fnm), this template has a `.node-version`
> file at the root of the repository that can be used to automatically switch to
> the correct version when you `cd` into the repository. Additionally, this
> `.node-version` file is used by GitHub Actions in any `actions/setup-node`
> actions.

1. :hammer_and_wrench: Install the dependencies

   ```bash
   npm install
   ```

2. :building_construction: Package the TypeScript for distribution

   ```bash
   npm run bundle
   ```

3. :white_check_mark: Run the tests

   ```bash
   $ npm test

   PASS  __tests__/index.test.ts
   index
      ✓ should call run function when imported (8 ms)

   PASS  __tests__/main.test.ts
   Github Action Run
      ✓ should execute testbeats CLI command for slack/Junit - only CLI params (2 ms)
      ✓ should execute testbeats CLI command for slack/testng - only CLI params
      ✓ should execute testbeats CLI command for teams/cucumber - only CLI params
      ✓ should execute testbeats CLI command for chat/mocha - only CLI params
      ✓ should execute testbeats CLI command for slack/mocha - with api key, project, and run (1 ms)
      ✓ should execute testbeats CLI command for Junit - only config file
      ✓ should handle CLI command failure
      ✓ should handle unexpected errors (1 ms)
      ✓ should handle non-Error objects in catch block
      ✓ should not include empty inputs in arguments

   ----------|---------|----------|---------|---------|-------------------
   File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
   ----------|---------|----------|---------|---------|-------------------
   All files |     100 |      100 |     100 |     100 |
   index.ts |     100 |      100 |     100 |     100 |
   main.ts  |     100 |      100 |     100 |     100 |
   ----------|---------|----------|---------|---------|-------------------
   Test Suites: 2 passed, 2 total
   Tests:       11 passed, 11 total
   Snapshots:   0 total
   Time:        0.995 s, estimated 2 s
   Ran all test suites.
   ```

4. :gear: Run all checks and tests

   ```bash
   npm run all
   ```

## Update the Action Metadata

After testing, you can create version tag(s) that developers can use to
reference different stable versions of your action. For more information, see
[Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
in the GitHub Actions toolkit.

The [`action.yml`](action.yml) file defines metadata about the action, such as
input(s) and output(s). For details about this file, see
[Metadata syntax for GitHub Actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions).

## Publishing a New Release

This project includes a helper script, [`script/release`](./script/release)
designed to streamline the process of tagging and pushing new releases for
GitHub Actions.

GitHub Actions allows users to select a specific version of the action to use,
based on release tags. This script simplifies this process by performing the
following steps:

1. **Retrieving the latest release tag:** The script starts by fetching the most
   recent SemVer release tag of the current branch, by looking at the local data
   available in your repository.
1. **Prompting for a new release tag:** The user is then prompted to enter a new
   release tag. To assist with this, the script displays the tag retrieved in
   the previous step, and validates the format of the inputted tag (vX.X.X). The
   user is also reminded to update the version field in package.json.
1. **Tagging the new release:** The script then tags a new release and syncs the
   separate major tag (e.g. v1, v2) with the new release tag (e.g. v1.0.0,
   v2.1.2). When the user is creating a new major release, the script
   auto-detects this and creates a `releases/v#` branch for the previous major
   version.
1. **Pushing changes to remote:** Finally, the script pushes the necessary
   commits, tags and branches to the remote repository. From here, you will need
   to create a new release in GitHub so users can easily reference the new tags
   in their workflows.

# TestBeats Publish GitHub Action

![CI](https://github.com/test-results-reporter/publish/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/test-results-reporter/publish/actions/workflows/check-dist.yml/badge.svg)](https://github.com/test-results-reporter/publish/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/test-results-reporter/publish/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/test-results-reporter/publish/actions/workflows/codeql-analysis.yml)
![Coverage](./badges/coverage.svg)

GitHub Action for testbeats publish command

## Action Usage

Below is an example of Testbeats action in a workflow file. To include the
action in a workflow, you can use the `uses` syntax with the `@` symbol to
reference a specific branch, tag, or commit hash.

#### Example Workflow using `config` file

```yaml
# .github/workflows/testbeats.yml
# This workflow will publish test results to slack
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Install Dependencies
    id: npm-ci
    run: npm ci

  - name: Test
    id: npm-ci-test
    run: npm run test

  - name: TestBeats Publish
    uses: test-results-reporter/publish@v1
    with:
      config: .testbeats.json # TestBeats configuration file path
```

#### Example Workflow using CLI params

```yaml
# .github/workflows/testbeats.yml
# This workflow will publish test results to slack including CI info and chart test summary
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Install Dependencies
    id: npm-ci
    run: npm ci

  - name: Test
    id: npm-ci-test
    run: npm run test

  - name: TestBeats Publish
    uses: test-results-reporter/publish@v1
    with:
      slack: ${{ secrets.SLACK_WEBHOOK_URL }}
      mocha: ./test/mocha/results.xml
      ci-info: true
      chart-test-summary: true
```

### Example Workflow using CLI params and testbeats api key

```yaml
# .github/workflows/testbeats.yml
# This workflow will publish test results to TestBeats
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4

  - name: Install Dependencies
    id: npm-ci
    run: npm ci

  - name: Test
    id: npm-ci-test
    run: npm run test

  - name: TestBeats Publish
    uses: test-results-reporter/publish@v1
    with:
      slack: ${{ secrets.SLACK_WEBHOOK_URL }}
      mocha: ./test/mocha/results.xml
      api-key: ${{ secrets.TESTBEATS_API_KEY }}
      project: ${{ github.repository }} # Optional
      run: ${{ github.branch_name }} # Optional
```

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

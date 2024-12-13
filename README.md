<span align="center">

![logo](https://github.com/test-results-reporter/testbeats/raw/main/assets/logo.png)

# TestBeats Publish GitHub Action

![CI](https://github.com/test-results-reporter/publish/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/test-results-reporter/publish/actions/workflows/check-dist.yml/badge.svg)](https://github.com/test-results-reporter/publish/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/test-results-reporter/publish/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/test-results-reporter/publish/actions/workflows/codeql-analysis.yml)
![Coverage](./badges/coverage.svg)

[![Stars](https://img.shields.io/github/stars/test-results-reporter/publish?style=social)](https://github.com/test-results-reporter/publish/stargazers)

GitHub Action for [testbeats](https://github.com/test-results-reporter/testbeats) publish command.

Read more about the project at https://testbeats.com

</span>

## How to use TestBeats Publish GitHub Action

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

## Support

Like this project! ⭐ Star it on [Github](https://github.com/test-results-reporter/publish/stargazers) and follow on [Twitter](https://twitter.com/testbeatsapp). Your support means a lot to us.

## Contributors

If you've ever wanted to contribute to open source, and a great cause, now is your chance! See the [contributing docs](https://github.com/test-results-reporter/publish/blob/master/CONTRIBUTING.md) for more information.

Thanks to all the people who contribute.

<a href="https://github.com/test-results-reporter/publish/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=test-results-reporter/publish" />
</a>
<br />


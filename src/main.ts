import * as core from '@actions/core'
import { exec } from '@actions/exec'

export async function run(): Promise<void> {
  try {
    // Get config file input
    const configFile = core.getInput('config')

    // Build command arguments array
    const args: string[] = []

    // Handle config file
    if (configFile) {
      args.push('--config', configFile)
    }

    // Define input keys
    const inputs = [
      'api-key',
      'project',
      'run',
      'slack',
      'teams',
      'chat',
      'title',
      'junit',
      'testng',
      'cucumber',
      'mocha',
      'nunit',
      'xunit',
      'mstest'
    ] as const

    // Add other inputs if they exist
    for (const input of inputs) {
      const value = core.getInput(input)
      if (value) {
        args.push(`--${input}`, value)
      }
    }

    // Add boolean flags
    if (core.getBooleanInput('ci-info')) args.push('--ci-info')
    if (core.getBooleanInput('chart-test-summary'))
      args.push('--chart-test-summary')

    // Execute testbeats CLI command
    const exitCode = await exec('npx', ['testbeats', 'publish', ...args])

    if (exitCode !== 0) {
      throw new Error(`testbeats CLI command failed with exit code ${exitCode}`)
    }

    core.info('Successfully published test results')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unexpected error occurred')
    }
  }
}

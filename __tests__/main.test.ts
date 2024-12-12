/**
 * Unit tests for the action's main functionality, src/main.ts
 */

import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { run } from '../src/main'

// Mock the dependencies
jest.mock('@actions/core')
jest.mock('@actions/exec')
jest.mock('fs/promises')

// Mock inputs
const defaultMockInputs: Record<string, string> = {
  config: '',
  'api-key': '',
  project: '',
  'ci-info': '',
  'chart-test-summary': '',
  run: '',
  slack: '',
  teams: '',
  chat: '',
  title: '',
  junit: '',
  testng: '',
  cucumber: '',
  mocha: '',
  nunit: '',
  xunit: '',
  mstest: ''
}

describe('Github Action Run', () => {
  let mockInputs: Record<string, string>
  // Reset all mocks before each test
  beforeEach(() => {
    jest.resetAllMocks()
    // Create a fresh copy of mockInputs for each test
    mockInputs = { ...defaultMockInputs }
  })

  it('should execute testbeats CLI command for slack/Junit - only CLI params', async () => {
    // Update only the required values for this test
    mockInputs['slack'] = 'slack_webhook_url'
    mockInputs['junit'] = 'junit_file_path'
    mockInputs['ci-info'] = 'true'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--slack',
      'slack_webhook_url',
      '--junit',
      'junit_file_path',
      '--ci-info'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should execute testbeats CLI command for slack/testng - only CLI params', async () => {
    // Update only the required values for this test
    mockInputs['slack'] = 'slack_webhook_url'
    mockInputs['testng'] = 'testng_file_path'
    mockInputs['chart-test-summary'] = 'true'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--slack',
      'slack_webhook_url',
      '--testng',
      'testng_file_path',
      '--chart-test-summary'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should execute testbeats CLI command for teams/cucumber - only CLI params', async () => {
    // Update only the required values for this test
    mockInputs['teams'] = 'teams_webhook_url'
    mockInputs['cucumber'] = 'cucumber_file_path'
    mockInputs['chart-test-summary'] = 'true'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--teams',
      'teams_webhook_url',
      '--cucumber',
      'cucumber_file_path',
      '--chart-test-summary'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should execute testbeats CLI command for chat/mocha - only CLI params', async () => {
    // Update only the required values for this test
    mockInputs['chat'] = 'chat_webhook_url'
    mockInputs['mocha'] = 'mocha_file_path'
    mockInputs['chart-test-summary'] = 'true'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--chat',
      'chat_webhook_url',
      '--mocha',
      'mocha_file_path',
      '--chart-test-summary'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should execute testbeats CLI command for slack/mocha - with api key, project, and run', async () => {
    // Update only the required values for this test
    mockInputs['slack'] = 'slack_webhook_url'
    mockInputs['mocha'] = 'mocha_file_path'
    mockInputs['api-key'] = 'api_key'
    mockInputs['project'] = 'project'
    mockInputs['run'] = 'build_number'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--api-key',
      'api_key',
      '--project',
      'project',
      '--run',
      'build_number',
      '--slack',
      'slack_webhook_url',
      '--mocha',
      'mocha_file_path'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should execute testbeats CLI command for Junit - only config file', async () => {
    // Update only the required values for this test
    mockInputs['config'] = 'config.json'

    jest
      .mocked(core.getInput)
      .mockImplementation((name: string) => mockInputs[name] || '')
    jest
      .mocked(core.getBooleanInput)
      .mockImplementation((name: string) => mockInputs[name] === 'true')
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with correct arguments
    expect(exec).toHaveBeenCalledWith('npx', [
      'testbeats',
      'publish',
      '--config',
      'config.json'
    ])

    // Verify success message
    expect(core.info).toHaveBeenCalledWith(
      'Successfully published test results'
    )
  })

  it('should handle CLI command failure', async () => {
    // Mock exec to return non-zero exit code
    jest.mocked(exec).mockResolvedValue(1)
    jest.mocked(core.getInput).mockReturnValue('')
    jest.mocked(core.getBooleanInput).mockReturnValue(false)

    await run()

    // Verify error handling
    expect(core.setFailed).toHaveBeenCalledWith(
      'testbeats CLI command failed with exit code 1'
    )
  })

  it('should handle unexpected errors', async () => {
    // Mock exec to throw an error
    jest.mocked(exec).mockRejectedValue(new Error('Network error'))
    jest.mocked(core.getInput).mockReturnValue('')
    jest.mocked(core.getBooleanInput).mockReturnValue(false)

    await run()

    // Verify error handling
    expect(core.setFailed).toHaveBeenCalledWith('Network error')
  })

  it('should handle non-Error objects in catch block', async () => {
    // Mock exec to throw a non-Error object
    jest.mocked(exec).mockRejectedValue('String error')
    jest.mocked(core.getInput).mockReturnValue('')
    jest.mocked(core.getBooleanInput).mockReturnValue(false)

    await run()

    // Verify error handling
    expect(core.setFailed).toHaveBeenCalledWith('An unexpected error occurred')
  })

  it('should not include empty inputs in arguments', async () => {
    // Mock all inputs as empty
    jest.mocked(core.getInput).mockReturnValue('')
    jest.mocked(core.getBooleanInput).mockReturnValue(false)
    jest.mocked(exec).mockResolvedValue(0)

    await run()

    // Verify exec was called with minimal arguments
    expect(exec).toHaveBeenCalledWith('npx', ['testbeats', 'publish'])
  })
})

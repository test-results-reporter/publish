import * as core from '@actions/core'
import testbeats from 'testbeats'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Get and validate inputs
    const configFile: string = core.getInput('config', { required: true })

    // // Read config file
    // const configContent = fs.readFileSync(inputs.configFile, 'utf8');
    // const config: PublishConfig = JSON.parse(configContent);
    // Publish results (let testbeats handle the processing)
    await testbeats.publish({ config: configFile })

    core.info('Successfully published test results')
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unexpected error occurred')
    }
  }
}

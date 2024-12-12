/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import { run } from '../src/main'

// Mock the main module
jest.mock('../src/main', () => ({
  run: jest.fn()
}))

describe('Github Action Index', () => {
  it('should call run function when imported', async () => {
    // Import index to trigger the run function
    await import('../src/index')

    // Verify that run was called
    expect(run).toHaveBeenCalledTimes(1)
  })
})

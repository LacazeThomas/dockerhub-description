import * as core from '@actions/core'

const PLUGIN_README_DEFAULT = './README.md'

interface Inputs {
  username: string
  password: string
  repository: string
  shortDescription: string
  readmeFilepath: string
}

export function getInputs(): Inputs {
  const inputs = {
    username: core.getInput('username'),
    password: core.getInput('password'),
    repository: core.getInput('repository'),
    shortDescription: core.getInput('short-description'),
    readmeFilepath: core.getInput('readme-filepath')
  }

  // Environment variable input alternatives and their aliases

  if (!inputs.username && process.env['PLUGIN_USERNAME']) {
    inputs.username = process.env['PLUGIN_USERNAME']
  }
  if (!inputs.username && process.env['DOCKER_USERNAME']) {
    inputs.username = process.env['DOCKER_USERNAME']
  }

  if (!inputs.password && process.env['PLUGIN_PASSWORD']) {
    inputs.password = process.env['PLUGIN_PASSWORD']
  }
  if (!inputs.password && process.env['DOCKER_PASSWORD']) {
    inputs.password = process.env['DOCKER_PASSWORD']
  }

  if (!inputs.repository && process.env['PLUGIN_REPOSITORY']) {
    inputs.repository = process.env['PLUGIN_REPOSITORY']
  }
  if (!inputs.repository && process.env['DOCKER_REPOSITORY']) {
    inputs.repository = process.env['DOCKER_REPOSITORY']
  }

  if (!inputs.shortDescription && process.env['SHORT_DESCRIPTION']) {
    inputs.shortDescription = process.env['SHORT_DESCRIPTION']
  }

  if (!inputs.readmeFilepath && process.env['PLUGIN_README']) {
    inputs.readmeFilepath = process.env['PLUGIN_README']
  }

  // Set defaults
  if (!inputs.readmeFilepath) {
    inputs.readmeFilepath = PLUGIN_README_DEFAULT
  }
  if (!inputs.repository && process.env['GITHUB_REPOSITORY']) {
    inputs.repository = process.env['GITHUB_REPOSITORY']
  }

  return inputs
}

function checkRequiredInput(input: string, name: string): void {
  if (!input) {
    throw new Error(`Required input '${name}' is missing.`)
  }
}

export function validateInputs(inputs: Inputs): void {
  checkRequiredInput(inputs.username, 'username')
  checkRequiredInput(inputs.password, 'password')
}

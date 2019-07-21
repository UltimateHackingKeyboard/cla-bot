/* eslint @typescript-eslint/no-var-requires: 0 */
/* eslint @typescript-eslint/no-use-before-define: 0 */
const { join } = require('path')
const { execSync } = require('child_process')

const rootDir = join(__dirname, '..')
const pckJson = require(join(rootDir, 'package.json'))
const execOptions = { cwd: rootDir, stdio: 'inherit' }

log('Start build project')
execSync('npm run build', execOptions)

const imageTag = `us.gcr.io/cla-sign-bot/cla-sign-bot:${pckJson.version}`

log('Start build docker image')
execSync(`docker build --target app -t ${imageTag} .`, execOptions)

log('Start push docker image')
execSync(`docker push ${imageTag} `, execOptions)

function log(msg) {
  console.info('\x1b[32m')
  console.info(msg)
  console.info('\x1b[0m')
}

import { Probot } from 'probot'
import { installationCreated, prOpened, push } from './events'

module.exports = (app: Probot) => {
  app.on('installation.created', installationCreated)
  app.on('pull_request.opened', prOpened)
  app.on('pull_request.synchronize', prOpened)
  app.on('push', push)
}

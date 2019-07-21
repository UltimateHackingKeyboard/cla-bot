import { Application } from 'probot'

import { installationCreated, prOpened, push } from './events'

export = (app: Application): void => {
  app.on('installation.created', installationCreated)
  app.on('pull_request.opened', prOpened)
  app.on('pull_request.synchronize', prOpened)
  app.on('push', push)
}

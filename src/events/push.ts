import { Context } from 'probot'

import { setClaStatusesInRepo } from '../utils'

export const push = async (context: Context<'push'>): Promise<void> => {
  try {

    context.log.debug('push', context.payload)

    if (context.payload.ref !== 'refs/heads/master') {
      context.log(`Push: ${context.id} is not master push`)

      return
    }

    let hasClaFileCommitted = false
    // TODO: Handle the push contains more than 20 commits

    for (const commit of context.payload.commits) {
      for (const filename of commit.modified) {
        if (!filename.startsWith('cla/'))
          continue

        hasClaFileCommitted = true
        break
      }

      if (hasClaFileCommitted)
        break
    }

    if (hasClaFileCommitted)
      await setClaStatusesInRepo(context as any)

  } catch (err: any) {
    context.log.error(err)
  }

}

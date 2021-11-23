import { Context } from 'probot'

import {
  setClaStatusesInRepo,
} from '../utils'

export const installationCreated = async (context: Context<'installation.created'>): Promise<void> => {
  try {
    context.log.debug('installation.created', context.payload)

    if(!context.payload.repositories)
      return;

    for (const repo of context.payload.repositories) {
      context.repo = (params: any) => ({
        repo: repo.name,
        owner: repo.full_name.split('/')[0],
        ...params,
      })

      await setClaStatusesInRepo(context as any)
    }
  } catch (error) {
    console.error(error)
  }

}

import { Context } from 'probot'
import { EventPayloads, WebhookEvent } from '@octokit/webhooks'

import {
  setClaStatusesInRepo,
} from '../utils'

export const installationCreated = async (context: WebhookEvent<EventPayloads.WebhookPayloadInstallation> & Omit<Context<EventPayloads.WebhookPayloadInstallation>, 'id' | 'name' | 'payload'>): Promise<void> => {
  try {
    context.log.debug('installation.created', context.payload)

    for (const repo of context.payload.repositories) {
      context.repo = (params: any) => ({
        repo: repo.name,
        owner: repo.full_name.split('/')[0],
        ...params,
      })

      await setClaStatusesInRepo(context)
    }
  } catch (error) {
    console.error(error)
  }

}

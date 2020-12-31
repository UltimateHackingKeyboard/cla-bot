import { Context } from 'probot'
import { EventPayloads, WebhookEvent } from '@octokit/webhooks'

import {
  handleAsClaPr,
  setClaStatusOfPr,
} from '../utils'
import { getClaSignersOfRepo } from '../utils/get-cla-signers-of-repo'

export async function prOpened(context: WebhookEvent<EventPayloads.WebhookPayloadPullRequest> & Omit<Context<EventPayloads.WebhookPayloadPullRequest>, 'id' | 'name' | 'payload'>): Promise<void> {
  try {
    context.log.debug('PR opened', context.payload)

    if (await handleAsClaPr(context, context.payload.pull_request as any))
      return

    const claSigners = await getClaSignersOfRepo(context)
    await setClaStatusOfPr(context, claSigners, context.payload.pull_request as any)
  } catch (err) {
    context.log.error(err)
  }
}

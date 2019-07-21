import { Context } from 'probot'
import { WebhookPayloadPullRequest } from '@octokit/webhooks'

import {
  handleAsClaPr,
  setClaStatusOfPr,
} from '../utils'
import { getClaSignersOfRepo } from '../utils/get-cla-signers-of-repo'

export async function prOpened (context: Context<WebhookPayloadPullRequest>): Promise<void> {
  try {
    context.log.debug('PR opened', context.payload)

    if (await handleAsClaPr(context, context.payload.pull_request))
      return

    const claSigners = await getClaSignersOfRepo(context)
    await setClaStatusOfPr(context, claSigners, context.payload.pull_request)
  } catch (err) {
    context.log.error(err)
  }
}

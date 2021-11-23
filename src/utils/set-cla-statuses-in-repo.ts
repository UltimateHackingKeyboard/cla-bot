import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { getData } from './get-data'
import { setClaStatusOfPr } from './set-cla-status-of-pr'
import { getClaSignersOfRepo } from './get-cla-signers-of-repo'

export const setClaStatusesInRepo = async (context: Context<EmitterWebhookEventName>): Promise<void> => {
  const claSigners = await getClaSignersOfRepo(context)

  const openPrs = await context.octokit.pulls.list(context.repo({ state: 'open' }))
    .then(getData)

  for (const pr of openPrs) {
    await setClaStatusOfPr(context, claSigners, pr as any)
  }
}

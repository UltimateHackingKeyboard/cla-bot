import { Context } from 'probot'
import { WebhookEvent } from "@octokit/webhooks";

import { getData } from './get-data'
import { setClaStatusOfPr } from './set-cla-status-of-pr'
import { getClaSignersOfRepo } from './get-cla-signers-of-repo'

export const setClaStatusesInRepo = async (context: WebhookEvent & Omit<Context, 'id' | 'name' | 'payload'>): Promise<void> => {
  const claSigners = await getClaSignersOfRepo(context)

  const openPrs = await context.octokit.pulls.list(context.repo({ state: 'open' }))
    .then(getData)

  for (const pr of openPrs) {
    await setClaStatusOfPr(context, claSigners, pr as any)
  }
}

import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { CLA_SIGNED_LABEL_TEXT } from './constants'
import { createClaLabels } from './create-cla-labels'

export const addClaSignedLabel = async (context: Context<EmitterWebhookEventName>, number: number): Promise<void> => {
  await createClaLabels(context)

  await context.octokit.issues.addLabels(context.repo({
    'issue_number': number,
    labels: [CLA_SIGNED_LABEL_TEXT],
  }))
}

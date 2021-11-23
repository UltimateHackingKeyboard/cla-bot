import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { addClaSignedLabel } from './add-cla-signed-label'
import { CLA_SIGN_STATUS_CONTEXT } from './constants'

export const setClaOk = async (context: Context<EmitterWebhookEventName>, number: number, sha: string) => {
  await addClaSignedLabel(context, number)

  await context.octokit.repos.createCommitStatus(context.repo({
    sha,
    state: 'success',
    context: CLA_SIGN_STATUS_CONTEXT,
    description: 'Latest CLA sign exists!',
  }))
}

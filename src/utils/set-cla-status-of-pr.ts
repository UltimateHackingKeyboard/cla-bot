import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { CLA_MISSING_LABEL_TEXT, CLA_SIGNED_LABEL_TEXT } from './constants'
import { Pr } from '../models'
import { setClaNOk } from './set-cla-nok'
import { setClaOk } from './set-cla-ok'
import { handleAsClaPr } from './handle-as-cla-pr'

export async function setClaStatusOfPr(
  context: Context<EmitterWebhookEventName>,
  signers: string[],
  pr: Pr,
): Promise<void> {
  if (await handleAsClaPr(context, pr))
    return

  const hasPrClaSignedLabel = pr.labels.some(label => label.name === CLA_SIGNED_LABEL_TEXT)
  const hasPrClaMissingLabel = pr.labels.some(label => label.name === CLA_MISSING_LABEL_TEXT)

  if (pr.user && signers.indexOf(pr.user.login) > -1) {
    if (hasPrClaMissingLabel)
      await context.octokit.issues.removeLabel(context.repo({
        'issue_number': pr.number,
        name: CLA_MISSING_LABEL_TEXT,
      }))

    await setClaOk(context, pr.number, pr.head.sha)

    return
  }

  if (hasPrClaSignedLabel)
    await context.octokit.issues.removeLabel(context.repo({
      'issue_number': pr.number,
      name: CLA_SIGNED_LABEL_TEXT,
    }))

  await setClaNOk(context, pr.number, pr.head.sha)
}

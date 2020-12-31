import { Context } from 'probot'

import { addClaSignedLabel } from './add-cla-signed-label'
import { CLA_SIGN_STATUS_CONTEXT } from './constants'

export const setClaOk = async (context: Context, number: number, sha: string) => {
  await addClaSignedLabel(context, number)

  await context.octokit.repos.createCommitStatus(context.repo({
    sha,
    state: 'success',
    context: CLA_SIGN_STATUS_CONTEXT,
    description: 'Latest CLA sign exists!',
  }))
}

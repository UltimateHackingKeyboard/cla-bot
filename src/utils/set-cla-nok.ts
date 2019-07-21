import { Context } from 'probot'

import { addClaMissingLabel } from './add-cla-missing-label'
import { CLA_SIGN_STATUS_CONTEXT } from './constants'

export const setClaNOk = async (context: Context, number: number, sha: string) => {
  await addClaMissingLabel(context, number)

  const repo = context.repo();
  const contributingMd = `https://github.com/${repo.owner}/${repo.repo}/blob/master/CONTRIBUTING.md`

  await context.github.issues.createComment({
    ...repo,
    number,
    body: `Thank you for your contribution!
Please [sign the CLA](${contributingMd}).`,
  })

  await context.github.repos.createStatus(context.repo({
    sha,
    state: 'error',
    context: CLA_SIGN_STATUS_CONTEXT,
    description: 'Author of the pull request did not sign the CLA!',
  }))
}

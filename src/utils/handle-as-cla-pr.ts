import { Context } from 'probot'

import { Pr } from '../models'
import { getData } from './get-data'
import { isPrContainsClaFile } from './is-pr-contains-cla-file'
import { isPrContainsNonClaFile } from './is-pr-contains-non-cla-file'
import { CLA_SIGN_STATUS_CONTEXT, COMMENT_PLS_SIGN_LATEST_CLA } from './constants'
import { getLatestClaFileInfo } from './get-latest-cla-file-info'
import { hasSignLatestClaCommit } from './has-sign-latest-cla-commit'
import { getFileContentBySha } from './get-file-content-by-sha'
import { getSignersFromContent } from './get-signers-from-content'

export async function handleAsClaPr(
  context: Context,
  pr: Pr,
): Promise<boolean> {
  const prFiles = await context
    .octokit
    .pulls
    .listFiles(context.repo({
      'pull_number': pr.number,
    }))
    .then(getData)

  if (!isPrContainsClaFile(prFiles))
    return false

  if (isPrContainsNonClaFile(prFiles) || prFiles.length !== 1) {

    await context.octokit.issues.createComment(context.repo({
      'issue_number': pr.number,
      body: 'The CLA sign PR can contain only the latest CLA file!',
    }))

    await context.octokit.repos.createCommitStatus(context.repo({
      sha: pr.head.sha,
      state: 'error',
      context: CLA_SIGN_STATUS_CONTEXT,
      description: 'This CLA sign PR is not OK',
    }))

    return true
  }

  const signers = await getFileContentBySha(context, prFiles[0].sha)
    .then(getSignersFromContent)

  if (pr.user && signers.indexOf(pr.user.login) === -1) {

    await context.octokit.issues.createComment(context.repo({
      'issue_number': pr.number,
      body: `Can not found your GitHub user name in the CLA file.
Please be sure you use the following pattern: \`- @username\`
`,
    }))

    await context.octokit.repos.createCommitStatus(context.repo({
      sha: pr.head.sha,
      state: 'error',
      context: CLA_SIGN_STATUS_CONTEXT,
      description: 'This CLA sign PR is not OK',
    }))

    return true
  }

  const latestClaFileInfo = await getLatestClaFileInfo(context)

  if (latestClaFileInfo.path !== prFiles[0].filename) {
    if (await hasSignLatestClaCommit(context, pr))
      return true;

    await context.octokit.issues.createComment(context.repo({
      'issue_number': pr.number,
      body: COMMENT_PLS_SIGN_LATEST_CLA,
    }))

    await context.octokit.repos.createCommitStatus(context.repo({
      sha: pr.head.sha,
      state: 'error',
      context: CLA_SIGN_STATUS_CONTEXT,
      description: 'This CLA sign PR is not OK',
    }))

    return true
  }

  await context.octokit.repos.createCommitStatus(context.repo({
    sha: pr.head.sha,
    state: 'success',
    context: CLA_SIGN_STATUS_CONTEXT,
    description: 'Latest CLA sign in this PR',
  }))

  return true
}

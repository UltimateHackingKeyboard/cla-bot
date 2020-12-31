import { Context } from 'probot'

import { Pr } from '../models'
import { getData } from './get-data'
import { COMMENT_PLS_SIGN_LATEST_CLA } from './constants';

export async function hasSignLatestClaCommit(
  context: Context,
  pr: Pr,
): Promise<boolean> {
  return context.octokit.issues.listComments(context.repo({
    'issue_number': pr.number,
    'per_page': 500,
  }))
    .then(getData)
    .then(comments => {
      return comments.some(x => x.body === COMMENT_PLS_SIGN_LATEST_CLA)
    })
    .catch(error => {
      if (error.status === 404)
        return true

      throw error
    })

}

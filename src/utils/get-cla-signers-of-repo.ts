import { Context } from 'probot'

import { getSignersFromContent } from './get-signers-from-content'
import { getLatestClaFileInfo } from './get-latest-cla-file-info'
import { getFileContentBySha } from './get-file-content-by-sha'

export async function getClaSignersOfRepo(context: Context): Promise<string[]> {
  return getLatestClaFileInfo(context)
    .then(({ sha }) => getFileContentBySha(context, sha))
    .then(getSignersFromContent)
}

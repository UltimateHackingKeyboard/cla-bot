import { PullsListFilesResponseItem } from '@octokit/rest'

export const isPrContainsNonClaFile = (files: PullsListFilesResponseItem[]): boolean => {
  return files.some(file => !file.filename.startsWith('cla/'))
}

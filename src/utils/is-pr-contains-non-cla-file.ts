import { Octokit } from '@octokit/rest'

export const isPrContainsNonClaFile = (files: Octokit.PullsListFilesResponseItem[]): boolean => {
  return files.some(file => !file.filename.startsWith('cla/'))
}

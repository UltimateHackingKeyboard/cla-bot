import { Octokit } from '@octokit/rest'

export const isPrContainsClaFile = (files: Octokit.PullsListFilesResponseItem[]): boolean => {
  return files.some(file => file.filename.startsWith('cla/'))
}

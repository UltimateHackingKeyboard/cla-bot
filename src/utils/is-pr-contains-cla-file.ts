import { PullsListFilesResponseItem } from '@octokit/rest'

export const isPrContainsClaFile = (files: PullsListFilesResponseItem[]): boolean => {
  return files.some(file => file.filename.startsWith('cla/'))
}

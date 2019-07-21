import { ReposUpdateFileResponseContent } from '@octokit/rest'
import { gt } from 'semver'

import { FileInfo } from '../models/file-info'
import { getSemverFromText } from './get-semver-from-text'

export const findLatestClaFile = (files: ReposUpdateFileResponseContent[]): Promise<FileInfo> => {
  const latest = files.reduce((prev: FileInfo, curr: ReposUpdateFileResponseContent): FileInfo => {
    const prevSemver = getSemverFromText(prev.name)
    const currSemver = getSemverFromText(prev.name)

    if(!prevSemver || !currSemver)
      return prev

    if (gt(prevSemver, currSemver))
      return prev

    return {
      name: curr.name,
      sha: curr.sha,
      path: curr.path,
    }

  }, { name: '0.0.0', sha: '', path: '' })

  if (latest.sha)
    return Promise.resolve(latest)

  return Promise.reject(new Error('Can not found the latest cla file'))
}

import { Context } from 'probot'

import { FileInfo } from '../models/file-info'
import { getData } from './get-data'
import { findLatestClaFile } from './find-latest-cla-file'

export async function getLatestClaFileInfo (context: Context): Promise<FileInfo> {
  return context
    .github
    .repos
    .getContents(context.repo({ path: 'cla' }))
    .then(getData)
    .then(findLatestClaFile)
}

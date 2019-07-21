import { Context } from 'probot'

import { getData } from './get-data'
import { decodeBlob } from './decode-blob'

export function getFileContentBySha (context: Context, sha: string): Promise<string> {
  return context.github.git.getBlob(context.repo({ 'file_sha': sha }))
    .then(getData)
    .then(decodeBlob)
}

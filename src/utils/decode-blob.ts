import { GitGetBlobResponse } from '@octokit/rest'

export const decodeBlob = (response: GitGetBlobResponse): Promise<string> => {
  return Promise.resolve(Buffer.from(response.content, response.encoding as any).toString())
}

import { Octokit } from '@octokit/rest'

export const decodeBlob = (response: Octokit.GitGetBlobResponse): Promise<string> => {
  return Promise.resolve(Buffer.from(response.content, response.encoding as any).toString())
}

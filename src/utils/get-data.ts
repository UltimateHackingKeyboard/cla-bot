import { OctokitResponse } from '@octokit/types'

export const getData = <T>(response: OctokitResponse<T>): Promise<T> => {
  return Promise.resolve<T>(response.data)
}

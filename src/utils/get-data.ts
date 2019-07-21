import { Octokit } from 'probot'

export const getData = <T> (response: Octokit.Response<T>): Promise<T> => {
  return Promise.resolve<T>(response.data)
}

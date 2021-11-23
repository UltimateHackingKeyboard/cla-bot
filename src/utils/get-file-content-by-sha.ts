import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { getData } from './get-data'
import { decodeBlob } from './decode-blob'

export function getFileContentBySha(context: Context<EmitterWebhookEventName>, sha: string): Promise<string> {
  return context.octokit.git.getBlob(context.repo({ 'file_sha': sha }))
    .then(getData)
    .then(decodeBlob)
}

import { Context } from 'probot'
import { EmitterWebhookEventName } from '@octokit/webhooks';

import { CLA_MISSING_LABEL_TEXT, CLA_SIGNED_LABEL_TEXT } from './constants'
import { getData } from './get-data'
import { RepoCreateLabel, RepoLabels } from "../models";

const repoCache = new Map<string, Date>()

export const createClaLabel = async (
  context: Context<EmitterWebhookEventName>,
  labels: RepoLabels,
  label: RepoCreateLabel): Promise<void> => {

  const hasLabel = labels.some(x => x.name === label.name)

  if (!hasLabel)
    await context.octokit.issues.createLabel(context.repo(label))

}

export const createClaLabels = async (context: Context<EmitterWebhookEventName>): Promise<void> => {
  const repo = `${context.repo().owner}/${context.repo().repo}`

  const date = repoCache.get(repo)

  if (date && date.getTime() > new Date().getTime() - 6000)
    return

  // TODO: Handle more then 100 label/repo
  const labels = await context.octokit.issues.listLabelsForRepo(context.repo({ 'per_page': 100 }))
    .then(getData)

  await createClaLabel(
    context,
    labels,
    context.repo({
      name: CLA_SIGNED_LABEL_TEXT,
      color: '037f37',
      description: 'Latest cla signed by the pull request author',
    }))

  await createClaLabel(
    context,
    labels,
    context.repo({
      name: CLA_MISSING_LABEL_TEXT,
      color: 'f2294a',
      description: 'Latest cla does not signed by the pull request author',
    }))

  repoCache.set(repo, new Date())
}

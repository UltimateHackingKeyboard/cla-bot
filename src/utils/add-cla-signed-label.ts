import { Context } from 'probot'

import { CLA_SIGNED_LABEL_TEXT } from './constants'
import { createClaLabels } from './create-cla-labels'

export const addClaSignedLabel = async (context: Context, number: number): Promise<void> => {
  await createClaLabels(context)

  await context.github.issues.addLabels(context.repo({
    'issue_number': number,
    labels: [CLA_SIGNED_LABEL_TEXT],
  }))
}

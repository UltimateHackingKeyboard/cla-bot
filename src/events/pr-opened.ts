import { Context } from 'probot'

import {
  handleAsClaPr,
  setClaStatusOfPr,
} from '../utils'
import { getClaSignersOfRepo } from '../utils/get-cla-signers-of-repo'

export async function prOpened(context: Context<'pull_request.opened' | 'pull_request.synchronize'>): Promise<void> {
  try {
    context.log.debug('PR opened', context.payload)

    if (await handleAsClaPr(context as any, context.payload.pull_request as any))
      return

    const claSigners = await getClaSignersOfRepo(context as any)
    await setClaStatusOfPr(context as any, claSigners, context.payload.pull_request as any)
  } catch (err) {
    context.log.error(err)
  }
}

export const getSignersFromContent = (content: string): Promise<string[]> => {
  const result: string[] = []
  const lines = content.split('\n')


  for (const line of lines) {
    const regExp = new RegExp('^(\\s?)+- @(\\w+)$')
    const rexExpResult = regExp.exec(line)
    if(!rexExpResult)
      continue

    result.push(rexExpResult[2].trim())
  }

  return Promise.resolve(result)
}

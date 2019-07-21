const SEMVER_REG_EXP = new RegExp('\\d+\\.\\d+\\.\\d+')

export function getSemverFromText (text: string): string | undefined {
  const rexExpResult = SEMVER_REG_EXP.exec(text)

  if(!rexExpResult)
    return

  return rexExpResult[0]
}

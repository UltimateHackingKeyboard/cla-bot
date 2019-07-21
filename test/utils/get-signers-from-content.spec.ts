import { getSignersFromContent } from '../../src/utils'

describe('getSignersFromContent', () => {
  it('should return with the list of users', async () => {
    const content = `# cla-sign-bot-test

### Signed

- @ert78gb
- @aabb
`

    const result = await getSignersFromContent(content)

    expect(result).toEqual(['ert78gb', 'aabb'])
  })
})

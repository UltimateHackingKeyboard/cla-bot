// You can import your modules
// import index from '../src/index'

import nock from 'nock'
import { Probot } from 'probot'
// Requiring our app implementation
import myProbotApp from '../src'
// Requiring our fixtures
import payload from './fixtures/pr-opened.json'

const issueCreatedBody = { body: 'Thanks for opening this issue!' }

nock.disableNetConnect()

describe.skip('pr-opened', (): void => {
  jest.setTimeout(100000)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let probot: Probot

  beforeEach((): void => {
    probot = new Probot({ id: 123, cert: 'test' })
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app.getSignedJsonWebToken = (): string => 'test'
    app.app.getInstallationAccessToken = (): Promise<string> => Promise.resolve('test')

  })

  test('creates a comment about sign the cla', async (done): Promise<void> => {
    // Test that we correctly return a test token
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    // Test that a comment is posted
    nock('https://api.github.com')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .post('repos/ert78gb/cla-sign-bot-test/pulls/1', (body: any): boolean => {
        done(expect(body).toMatchObject(issueCreatedBody))
        return true
      })
      .reply(200)

    // Receive a webhook event
    await probot.receive({ id: '1', name: 'pull_request', payload })
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock

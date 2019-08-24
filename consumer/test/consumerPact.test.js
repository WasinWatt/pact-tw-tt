const Pact = require('@pact-foundation/pact').Pact
const path = require('path')
const API_PORT = 8081
const { fetchUser } = require('../consumer')

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

describe('Pact consumer to provider', () => {
  let provider
  beforeAll(() => {
    provider = new Pact({
      consumer: 'Consumer',
      provider: 'Provider',
      port: API_PORT,
      log: path.resolve(process.cwd(), 'logs', 'pact.log'),
      dir: path.resolve(process.cwd(), 'pacts'),
      logLevel: LOG_LEVEL,
      spec: 2
    })
    return provider.setup()
  })

  // Write pact files to file
  afterAll(() => {
    return provider.finalize()
  })

  describe('query for a user', () => {
    beforeAll(() => {
      provider.addInteraction({
        uponReceiving: 'a request for user JSON data',
        withRequest: {
          method: 'GET',
          path: '/user/alice'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: {
            user: {
              name: 'alice'
            }
          }
        }
      })
    })

    it('returns a user with name of alice when given user name is alice', async () => {
      const result = await fetchUser('alice')
      expect(result.user.name).toEqual('alice')
    })

    it('validates the interactions and creates a contract', async () => {
      return provider.verify()
    })
  })
})

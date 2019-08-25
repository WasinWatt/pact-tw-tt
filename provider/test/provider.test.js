const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')

const { server } = require('../provider.js')

server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of the Consumer', () => {
    let opts = {
      provider: 'Provider',
      providerBaseUrl: 'http://localhost:8081',
      pactBrokerUrl: 'http://localhost:9292',
      pactBrokerUsername: 'username',
      pactBrokerPassword: 'password',
      tags: ['prod'],
      publishVerificationResult: true,
      providerVersion: '1.0.' + Math.floor(new Date() / 1000)
    }

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
    })
  })
})

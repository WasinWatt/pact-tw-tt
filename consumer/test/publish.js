const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: 'http://localhost:9292',
  pactBrokerUsername: 'username',
  pactBrokerPassword: 'password',
  tags: ['prod', 'test'],
  consumerVersion: '1.0.' + Math.floor(new Date() / 1000)
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to http://localhost:9292 and login with')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })

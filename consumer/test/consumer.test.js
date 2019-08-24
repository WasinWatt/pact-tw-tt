const nock = require('nock')
const API_PORT = 8081
const { fetchUser } = require('../consumer')
const API_HOST = `http://localhost:${API_PORT}`

describe('Consumer', () => {
  describe('when a call to the Provider is made', () => {
    it('can process the JSON payload from the provider', async () => {
      nock(API_HOST)
        .get('/user/alice')
        .reply(200, {
          user: {
            name: 'alice'
          }
        })

      const response = await fetchUser('alice')
      expect(response.user.name).toEqual('alice')
    })
  })
})

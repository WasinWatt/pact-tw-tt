const request = require('superagent')
const API_HOST = 'http://localhost'
const API_PORT = 8081
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

// Fetch Users
const fetchUser = (name) => {
  return request.get(`${API_ENDPOINT}/user/${name}`).then(res => {
    return {
      user: res.body.user
    }
  })
}

module.exports = {
  fetchUser
}

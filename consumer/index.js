const client = require('./consumer')

client.fetchUser('alice').then(
  response => {
    console.log(response)
  },
  error => {
    console.error(error)
  }
)

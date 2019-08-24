const { server } = require('./provider')
server.listen(8081, () => {
  console.log('Server is listening on PORT 8081')
})

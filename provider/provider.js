const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

server.get('/user/:name', (req, res) => {
  res.json({
    user: {
      name: 'alice'
    }
  })
})

module.exports = {
  server
}

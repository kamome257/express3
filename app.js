const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.use(express.static('public'))

// UDPサーバー部分
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('error', (err) => {
  console.error(`Server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`Received: ${msg} from ${rinfo.address}:${rinfo.port}`)

  // クライアントに返信する（エコー）
  server.send(msg, rinfo.port, rinfo.address, (err) => {
    if (err) console.error('Send error:', err)
  })
})

server.on('listening', () => {
  const address = server.address()
  console.log(`UDP server listening on ${address.address}:${address.port}`)
})

server.bind(41234) // 任意のポート番号

app.listen(port, () => {
  console.log(`HTTP server is running on http://localhost:${port}`)
})


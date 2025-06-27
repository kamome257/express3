/*const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

const port = process.env.PORT || 3001
let connects = []

app.use(express.static('public'))

app.ws('/ws', (ws, req) => {
  connects.push(ws)

  ws.on('message', (message) => {
    console.log('Received:', message)

    connects.forEach((socket) => {
      if (socket.readyState === 1) {
        // Check if the connection is open
        socket.send(message)
      }
    })
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
}) */

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

const dgram = require('dgram')
const client = dgram.createSocket('udp4')

const message = Buffer.from('Hello UDP Server!')

client.send(message, 41234, 'localhost', (err) => {
  if (err) console.error('Send error:', err)
  else console.log('Message sent')
  client.close()
})


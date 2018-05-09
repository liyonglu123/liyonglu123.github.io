const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket=>{
  console.log('a user connected')
  socket.on('disconnect', ()=>{
    console.log('user disconnect')
  })
  socket.on('chat message', (msg)=>{
    console.log('clien get message: ', msg)
    setTimeout(()=>{
      io.emit('chat message', '<b>Server:</b>' + ' Are you Sure? -- Come from your father')
    }, 1500)
  })
})

http.listen(3000, ()=> {
  console.log('Server running at 3000.')
})
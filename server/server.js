const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

app.set(process.env.PORT || 3003)
const server = http.createServer(app)
server.listen(process.env.PORT,()=>{
    console.log(`app tourne sur le port: ${process.env.PORT}`)
})
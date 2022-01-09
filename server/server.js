const express = require("express");
const http = require('http');
const { dbConnection } = require("./database/config");
const cookieParser = require('cookie-parser')
require('dotenv').config();
//crear servidor express
const app = express();

const cors = require('cors');

//socket io
const server = http.createServer(app)

const io = require('socket.io')(server, 
  {cors: { origin: "*",    
          methods: ["GET", "POST"],
          allowedHeaders: ["x-token"],
          credentials: true  }});

// base de datos
dbConnection();

//puerto
const port = process.env.PORT;


//cookie parser
app.use(cookieParser())

//cors
app.use(cors({ origin: true, credentials: true }))

//lectura y parseo del body
app.use(express.json());

//directorio publico middlewares
app.use( express.static('../src') );
app.use('/api/log', require('./routes/auth'));
app.use('/api/events', require('./routes/eventosCRUD'));
app.use('/api/checkToken', require('./routes/checkUsuario'));
app.use('/api/peticion', require('./routes/peticionesCRUD'));
app.use('/api/chat', require('./routes/chatCRUD'));
app.use('/api/mensaje', require('./routes/mensajesCRUD'));
 
server.listen(port, () => {
  // perform a database connection when server starts
  console.log(`El puerto del servidor es: ${ port }`);
});

//conexión con el socket connection
io.on("connection", (socket) => {
  //console.log(socket.id)
  // mis sockets
  socket.on("mensaje", (mensaje) => {
    socket.emit("mensaje", mensaje)
  })
});
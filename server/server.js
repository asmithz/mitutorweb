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
app.use('/api/usuariosControlador', require('./routes/eventosCRUD'));
app.use('/api/checkToken', require('./routes/checkUsuario'));
app.use('/api/peticionControlador', require('./routes/peticionesCRUD'));
app.use('/api/chatControlador', require('./routes/chatCRUD'));
app.use('/api/mensajeControlador', require('./routes/mensajesCRUD'));
app.use('/api/zoomControlador', require('./routes/zoom'));
app.use('/api/pagoControlador', require('./routes/pago'));
 
server.listen(port, () => {
  // perform a database connection when server starts
  console.log(`El puerto del servidor es: ${ port }`);
});

//conexión con el socket connection
io.on("connection", (socket) => {
  console.log(socket.id)
  // mis sockets
  socket.on("mensaje", (chat, texto_mensaje, emisor_id) => {
    if(emisor_id === chat.emisor_id || emisor_id === chat.receptor_id){
      socket.emit("mensaje", texto_mensaje)
    }
  })
  socket.on("enlace_pago", (chat, enlacePago, emisor_id) => {
      if(emisor_id === chat.receptor_id){
      console.log(enlacePago)
      socket.emit("enlace_pago", enlacePago)
    }
  })
});
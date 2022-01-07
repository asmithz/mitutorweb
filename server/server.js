const express = require("express");
const { dbConnection } = require("./database/config");
const cookieParser = require('cookie-parser')
require('dotenv').config();
//crear servidor express
const app = express();

const cors = require('cors');

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
 
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`El puerto del servidor es: ${ port }`);
});

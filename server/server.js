const express = require("express");
const { dbConnection } = require("./database/config");
require('dotenv').config();
//crear servidor express
const app = express();

const cors = require('cors');

// base de datos
dbConnection();

//puerto
const port = process.env.PORT;


//cors
app.use(cors())

//lectura y parseo del body
app.use(express.json());

//directorio publico middlewares
app.use( express.static('../src') );
app.use('/api/log', require('./routes/auth'));
app.use('/api/events', require('./routes/eventosCRUD'));
 
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`El puerto del servidor es: ${ port }`);
});

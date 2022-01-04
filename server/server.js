const express = require("express");
const { dbConnection } = require("./database/config");
require('dotenv').config();
//crear servidor express
const app = express();

// base de datos
dbConnection();

//puerto
const port = process.env.PORT;

//directorio publico middlewares
app.use( express.static('../src') );
app.use('/api/auth', require('./routes/auth'));

//lectura y parseo del body
app.use( express.json() );
 
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${ port }`);
});

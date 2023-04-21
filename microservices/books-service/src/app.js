// Importa el módulo express
const express = require("express");

// Importa las rutas del recurso books
const books = require("../routes/books");

// Crea una instancia de la aplicación express
const app = express();

// Agrega el middleware para manejar las solicitudes HTTP que llegan a la ruta "/api/v2/books",
// enviándolas al enrutador de "books" definido en el archivo "routes/books.js".
app.use("/api/v2/books", books);

// Exporta la aplicación express para que pueda ser utilizada por otros módulos
module.exports = app;

/* 
Este código crea una instancia de una aplicación express que escucha las solicitudes HTTP en la ruta "/api/v2/books". El middleware app.use() es utilizado para manejar las solicitudes HTTP que llegan a esta ruta, enviándolas al enrutador books definido en el archivo "routes/books.js".

Luego, se exporta la aplicación express para que pueda ser utilizada por otros módulos en la aplicación.
*/

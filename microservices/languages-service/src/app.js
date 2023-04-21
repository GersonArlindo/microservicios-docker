// Importa el framework Express
const express = require("express");

// Importa el archivo que contiene las rutas para la gestión de las ubicaciones
const locations = require("../routes/languages");

// Crea una instancia de la aplicación Express
const app = express();

// Agrega las rutas de la gestión de ubicaciones a la aplicación en la ruta /api/v2/countries
app.use("/api/v2/languages", locations);

// Exporta la aplicación para ser utilizada en otros módulos
module.exports = app;

/* 
Este código define una aplicación Express que utiliza el módulo locations para gestionar las rutas para las ubicaciones en la versión 2 de la API en la ruta /api/v2/countries. El módulo locations debe exportar un objeto Router que define las rutas y los controladores para las operaciones de gestión de ubicaciones.
*/

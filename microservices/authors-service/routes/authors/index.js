// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Importamos el módulo data-Library que contiene los datos de los autores
const data = require("../../data/data-library");

// Creamos una función logger que muestra un mensaje en consola
const logger = (message) => console.log(`Authors Service: ${message}`);
 //******************************************************************************************* */
// Creamos la ruta para obtener todos los autores
router.get("/", (req, res) => {
  // Creamos un objeto de respuesta con los datos de los autores
  const response = {
    service: "authors",
    architecture: "microservices",
    data: data.dataLibrary.authors,
  };

  // Enviamos la respuesta
  return res.send(response);
});
 //******************************************************************************************* */
// Creamos la ruta para obtener un autor por su id
router.get("/:id", (req, res) => {
  // Filtramos los autores cuyo id coincide con el que se envía en la petición
  const author = data.dataLibrary.authors.filter((author) => {
    return req.params.id == author.id;
  });

  // Creamos un objeto de respuesta con los datos del autor
  const response = {
    service: "authors",
    architecture: "microservices",
    data: author,
  };

  // Enviamos la respuesta
  return res.send(response);
});
 //******************************************************************************************* */
// Creamos la ruta para obtener autores por su nombre
router.get("/author/:name", (req, res) => {
  // Filtramos los autores cuyo nombre coincide con el que se envía en la petición
  const author = data.dataLibrary.authors.filter((author) => {
    return author.author.includes(req.params.name);
  });

  // Creamos un objeto de respuesta con los datos de los autores
  const response = {
    service: "authors",
    architecture: "microservices",
    data: author,
  };

  // Enviamos la respuesta
  return res.send(response);
});
 //**********************************PARTE DEL EJERCICIO 3*************************************************************/
  router.get("/authors/:country", (req, res) => {
  // Filtramos los autores cuyo pais coincide con el que se envía en la petición
  const author = data.dataLibrary.authors.filter((author) => {
    return author.country.includes(req.params.country);
  });

  // Creamos un objeto de respuesta con los datos de los autores
  const response = {
    service: "authors",
    architecture: "microservices",
    data: author,
  };

  // Enviamos la respuesta
  return res.send(response);
});
 //***********************************************************************************************/


// Exportamos el objeto Router
module.exports = router;

/*
Este código utiliza el framework Express para crear un servicio web que devuelve información sobre autores. A continuación se detallan las acciones que se realizan línea por línea:

En la línea 2, se importa el paquete Express.
En la línea 5, se crea un objeto Router usando el método Router() de Express.
En la línea 8, se importa el módulo data-library que contiene los datos de los autores.
En la línea 11, se define una función logger que recibe un mensaje y lo muestra en la consola usando el método console.log().
En la línea 14, se define la ruta para obtener todos los autores. Cuando se hace una petición GET a la ruta raíz del servicio (/), se ejecuta la función que recibe el objeto Request (req) y el objeto Response (res). Dentro de la función, se crea un objeto response que contiene los datos de los autores y se muestra un mensaje en la consola usando la función logger. Finalmente, se envía la respuesta usando el método res.send().
En la línea 48, se define la ruta para obtener un autor por su id. Cuando se hace una petición GET a la ruta /:id del servicio, se ejecuta la función que recibe el objeto
*/

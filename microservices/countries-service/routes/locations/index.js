// Importamos la biblioteca Express
const express = require("express");

// Importamos el archivo data-library.js que contiene la información sobre los países.
const data = require("../../data/data-library");

const http = require('http');

// Creamos un router de Express
const router = express.Router();

// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`Countries Service: ${message}`);

// Creamos una ruta GET en la raíz del router que devuelve todos los países
router.get("/", (req, res) => {
  // Creamos un objeto de respuesta con información sobre el servicio y los datos de los países
  const response = {
    service: "countries",
    architecture: "microservices",
    length: data.dataLibrary.countries.length,
    data: data.dataLibrary.countries,
  };
  // Registramos un mensaje en la consola
  logger("Get countries data");
  // Enviamos la respuesta al cliente
  return res.send(response);
});

//*****************************************EJERCICIO 3************************************************** */

router.get("/country/:capital", (req, res) => {
  const countries = data.dataLibrary.countries;
  const result = Object.keys(countries).find(key => countries[key].capital === req.params.capital);

  if (result) {
    const countryName = countries[result].name;
    console.log(countryName)
    // Solicitamos los autores y los libros escritos en el país
    const authorUrl = `http://nginx:8080/api/v2/authors/authors/${countryName}`;
    const bookUrl = `http://nginx:8080/api/v2/books/books/${countryName}`;

    // Enviamos solicitudes GET a ambas URLs
    const authorRequest = http.get(authorUrl, (authorResponse) => {
      let authorBody = '';
      authorResponse.on('data', (chunk) => {
        authorBody += chunk;
      });
      authorResponse.on('end', () => {
        const authors = JSON.parse(authorBody);
        const authorNames = authors.data.map(author => author.author);
        // Enviamos una segunda solicitud GET para obtener los libros
        const bookRequest = http.get(bookUrl, (bookResponse) => {
          let bookBody = '';
          bookResponse.on('data', (chunk) => {
            bookBody += chunk;
          });
          bookResponse.on('end', () => {
            const books = JSON.parse(bookBody);
            const bookTitles = books.data.map(book => book.title);
            const responseObj = {
              service: "countries",
              architecture: "microservices",
              country: countryName,
              authors: authorNames,
              books: bookTitles
            };
            res.send(responseObj);
          });
        });

        bookRequest.on('error', (error) => {
          const errorResponse = {
            service: "books",
            architecture: "microservices",
            message: "Hubo un error al obtener los libros para este país"
          };
          res.status(500).send(errorResponse);
        });

        bookRequest.end();
      });
    });

    authorRequest.on('error', (error) => {
      const errorResponse = {
        service: "authors",
        architecture: "microservices",
        message: "Hubo un error al obtener los autores para este país"
      };
      res.status(500).send(errorResponse);
    });

    authorRequest.end();
  } else {
    const errorResponse = {
      service: "countries",
      architecture: "microservices",
      message: "No se encontró ningún país con esa capital"
    };
    res.status(404).send(errorResponse);
  }
});


//****************************************PARTE DEL EJERCICIO 4*************************************************** */
router.get("/language/:language", (req, res) => {
  // busca los países cuyo lenguaje coincida con el enviado en la petición
  const countries = Object.entries(data.dataLibrary.countries).filter(([code, country]) => {
    return country.languages.includes(req.params.language);
  }).map(([code, country]) => {
    return country.name;
  });

  // crea una respuesta con información sobre los países que coinciden con el lenguaje buscado
  const response = {
    service: "countries",
    architecture: "microservices",
    length: countries.length,
    data: countries,
  };

  return res.send(response); // devuelve la respuesta al cliente
});

// Exportamos el router
module.exports = router;

const express = require("express"); // importa Express
const router = express.Router(); // crea un nuevo enrutador de Express
const data = require("../../data/data-library"); // importa los datos de data-library
const http = require('http');

const logger = (message) => console.log(`Author Services: ${message}`);
 //******************************************************************************************* */

// define un controlador para la ruta raíz ("/")
router.get("/", (req, res) => {
  const response = {
    // crea una respuesta con información sobre los libros
    service: "books",
    architecture: "microservices",
    length: data.dataLibrary.books.length,
    data: data.dataLibrary.books,
  };
  logger("Get book data"); // registra un mensaje en los registros
  return res.send(response); // devuelve la respuesta al cliente
});
 //******************************************************************************************* */

// define un controlador para la ruta "/title/:title"
router.get("/title/:title", (req, res) => {
  // busca los libros que contengan el título buscado
  const titles = data.dataLibrary.books.filter((title) => {
    return title.title.includes(req.params.title);
  });
  // crea una respuesta con información sobre los libros que coinciden con el título buscado
  const response = {
    service: "books",
    architecture: "microservices",
    length: titles.length,
    data: titles,
  };
  return res.send(response); // devuelve la respuesta al cliente
});

//*****************************************EJERCICIO 1*************************************************************** */

router.get("/author/:authorId", (req, res) => {
  let authorId = req.params.authorId;

  if (isNaN(parseInt(authorId))) {
    http.get(`http://nginx:8080/api/v2/authors/author/${authorId}`, (response) => {
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        try {
          var authorData = JSON.parse(responseData).data;
          authorId = authorData[0].id;
          console.log(`El ID del autor es ${authorId}`);
          // Aquí es donde se ejecuta el bloque de búsqueda de libros después de encontrar el ID del autor
          const books = data.dataLibrary.books.filter((book) => {
            return book.authorid == authorId;
          });
          const response = {
            service: "books",
            architecture: "microservices",
            length: books.length,
            data: books,
          };
          return res.send(response);
        } catch (error) {
          console.error(error);
        }
      });
    }).on('error', (error) => {
      console.error(error);
    });
  } else {
    // Este bloque se ejecutará si el parámetro es un ID numérico en lugar de un nombre de autor
    const books = data.dataLibrary.books.filter((book) => {
      return book.authorid == authorId;
    });
    const response = {
      service: "books",
      architecture: "microservices",
      length: books.length,
      data: books,
    };
    return res.send(response);
  }
});

//*********************************************EJERCICIO 2*********************************************************** */
router.get('/year/:range', (req, res) => {
  const range = req.params.range; // Obtiene el rango de años desde la ruta
  let books = data.dataLibrary.books;

  if (range.includes('-')) {
    // Si el rango incluye un guión, significa que es un rango de años
    const years = range.split('-');
    const startYear = parseInt(years[0]);
    const endYear = parseInt(years[1]);
    if (isNaN(startYear) || isNaN(endYear)) {
      return res.status(400).send("El rango de años no es válido");
    } else if (startYear > endYear) {
      return res.status(400).send("El año de inicio debe ser menor o igual al año final");
    }

    books = books.filter((book) => book.year >= startYear && book.year <= endYear);
  } else if (range.startsWith('<=')) {
    // Si el rango comienza con "<=", significa que se buscan libros cuyo año sea menor o igual al valor especificado
    const year = parseInt(range.substring(2));
    books = books.filter((book) => book.year <= year);
  } else if (range.startsWith('>=')) {
    // Si el rango comienza con ">=", significa que se buscan libros cuyo año sea mayor o igual al valor especificado
    const year = parseInt(range.substring(2));
    books = books.filter((book) => book.year >= year);
  } else if (range.startsWith('<')) {
    // Si el rango comienza con "<", significa que se buscan libros cuyo año sea estrictamente menor al valor especificado
    const year = parseInt(range.substring(1));
    books = books.filter((book) => book.year < year);
  } else if (range.startsWith('>')) {
    // Si el rango comienza con ">", significa que se buscan libros cuyo año sea estrictamente mayor al valor especificado
    const year = parseInt(range.substring(1));
    books = books.filter((book) => book.year > year);
  } else if (range.startsWith('=')) {
    // Si el rango comienza con "=", significa que se buscan libros cuyo año sea igual al valor especificado
    const year = parseInt(range.substring(1));
    books = books.filter((book) => book.year === year);
  } else {
    return res.status(400).send('Rango de años inválido');
  }

  const response = {
    service: 'books',
    architecture: 'microservices',
    length: books.length,
    data: books,
  };
  return res.send(response);
});
//************************************************PARTE DEL EJERCICIO 3******************************************** */

router.get('/books/:country', (req, res) => {
  const country = req.params.country;
  const books = data.dataLibrary.books;
  const booksInCountry = books.filter((book) => {
    return book.distributedCountries.includes(country);
  });

    // Creamos un objeto de respuesta con los datos de los books
    const response = {
      service: "books",
      architecture: "microservices",
      data: booksInCountry,
    };
  
    // Enviamos la respuesta
    return res.send(response);
});




module.exports = router; // exporta el enrutador de Express para su uso en otras partes de la aplicación

/*
Este código es un ejemplo de cómo crear una API de servicios utilizando Express y un enrutador. El enrutador define dos rutas: una para obtener todos los libros y otra para obtener libros por título. También utiliza una función simple de registro para registrar mensajes en los registros.
*/

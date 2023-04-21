// Importamos la biblioteca Express
const express = require("express");

// Importamos el archivo data-library.js que contiene la información sobre los países.
//const data = require("../../data/data-library");
//const data = require("../../data/language-codes.csv");

const http = require('http');

// Creamos un router de Express
const router = express.Router();

// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`Language Service: ${message}`);

const fs = require("fs");
const csv = require("csv-parser");

//Funcion encargada de parsear mi archivo y me retorna una promesa para poder hacer uso de ella en cualquier lugar
function convertCSVToJSON(csvFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(JSON.stringify(results));
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// function convertCSVToJSON(csvFilePath) {
//   return new Promise((resolve, reject) => {
//     const results = [];

//     fs.createReadStream(csvFilePath)
//       .pipe(csv())
//       .on("data", (data) => results.push(data))
//       .on("end", () => {
//         resolve(JSON.parse(JSON.stringify(results)));
//       })
//       .on("error", (error) => {
//         reject(error);
//       });
//   });
// }

// Ejemplo de uso
convertCSVToJSON("./data/language-codes.csv")
  .then((json) => { 
    //Creamos una ruta GET en la raíz del router que devuelve todos los languages
    router.get("/", (req, res) => {
      // Registramos un mensaje en la consola
      logger("Get languages data");
      // Enviamos la respuesta al cliente
      return res.send(json);
    });
  })
  .catch((error) => {
    console.error(error);
  });


//*************************EJERCICIO 4******************************************************** */

async function getData() {
  const csvFilePath = "./data/language-codes.csv";
  const json = await convertCSVToJSON(csvFilePath);
  const data = JSON.parse(json);
  // Endpoint que recibe como parámetro el código o el lenguaje
  router.get("/search/:codeOrLanguage", async (req, res) => {
    const codeOrLanguage = req.params.codeOrLanguage;

    // Buscamos si el parámetro es un código
    let code = codeOrLanguage;
    let language = null;
    const languageData = data.find((languageData) => languageData.codigo === code);
    if (!languageData) {
      // Si no es un código, buscamos el código correspondiente al lenguaje
      language = codeOrLanguage;
      const languageData = data.find((languageData) => languageData.lenguaje.toLowerCase() === language.toLowerCase());
      if (!languageData) {
        // Si no se encuentra el código ni el lenguaje, retornamos un mensaje de error
        return res.status(404).send("Lenguaje o código NO encontrado, FAVOR INGRESE UN COD O LENGUAJE VALIDO");
      }
      code = languageData.codigo;
    }
  
    // Hacemos la petición a la API de países
    const response = await fetch(`http://nginx:8080/api/v2/countries/language/${code}`);

    const countries = await response.json();
    const dataArray = Object.values(countries.data); //------>NUEVO y todo el for
    console.log(countries.data)
  
    // Creamos un objeto de respuesta con los datos de los países
    let responseObj = {
      service: "countries",
      architecture: "microservices",
      codigo: code,
      length: countries.length,
      data: countries
    };

        // Para cada país, hacemos las peticiones a los endpoints de autores y libros
        for (const country of dataArray) {
          // Hacemos la petición a la API de autores
          const authorsResponse = await fetch(`http://nginx:8080/api/v2/authors/authors/${country}`);
          const authors = await authorsResponse.json();
               
          // Hacemos la petición a la API de libros
          const booksResponse = await fetch(`http://nginx:8080/api/v2/books/books/${country}`);
          const books = await booksResponse.json();

          // Agregamos los datos de autores y libros al objeto de respuesta
          responseObj["autores"] = authors;
          responseObj["libros"] = books;
        }
      
        // Enviamos la respuesta al cliente
        return res.send(responseObj);
  });
}

getData().catch((error) => console.error(error));


// Exportamos el router
module.exports = router;

const server = require("./src/app"); // Importamos el servidor desde el archivo app.js

server.listen(process.env.PORT || 3000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Authors Service working in port: ${process.env.PORT || 3000}`); // Imprimimos un mensaje en la consola indicando que el servidor se ha iniciado correctamente
});

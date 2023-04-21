const server = require("./src/app"); // Importamos el servidor desde el archivo app.js

server.listen(process.env.PORT || 5000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Countries Service working in port: ${process.env.PORT || 5000}`);
});

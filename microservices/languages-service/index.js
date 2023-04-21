const server = require("./src/app"); // Importamos el servidor desde el archivo app.js

server.listen(process.env.PORT || 6000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Languages Service working in port: ${process.env.PORT || 6000}`);
});

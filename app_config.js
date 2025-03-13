const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configurar el entorno
const config = require('config');
// Imprimir informacion del entorno
console.log(config.get('nombre'));
// console.log('Base de datos:', config.configDB.host);

// Exportar la configuración
module.exports = config;


// el puerto en el que escucha el servidor
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
}
); 
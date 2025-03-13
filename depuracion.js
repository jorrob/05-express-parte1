const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// depurar
const iniciodebug = require('debug')('app:inicio');

// depurar DB
const dbdebug = require('debug')('app:db');

// morgan
const morgan = require('morgan');
// Configurar el entorno
const config = require('config');
const log = require('./logger');
//hora actual
const now = new Date();
console.log(now.toLocaleString());

// const ambiente = config.get('nombre');
console.log(config.get('nombre'));
// console.log('Base de datos:', config.configDB.host);

// Depurar dependiendo del entorno generar o no logs

if(app.get('env') === 'development'){
    morgan_log();
    // console.log('Desarrollo - Morgan habilitado');
    iniciodebug('Desarrollo - Morgan habilitado');
    dbdebug('Conectando con la base de datos........');
}else if(!app.get('env')){
    console.log('env es null');
}

function morgan_log(){
    app.use(morgan((tokens, req, res) => {
        return JSON.stringify({
          timestamp: new Date().toISOString(),
          timestamp2: now.toLocaleString(),
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number(tokens.status(req, res)),
          response_time_ms: Number(tokens['response-time'](req, res)),
          ip: getIPv4(req),  // Obtener IP en formato IPv4
          user_agent: tokens['user-agent'](req, res),
          content_length: Number(tokens.res(req, res, 'content-length')) || 0,
          referrer: tokens.referrer(req, res) || null,
          host: req.hostname,
          headers: req.headers,
          body: req.body || {},
          query_params: req.query || {},
          cookies: req.cookies || {}
        }, null, 2);
      }));
    
    // Función para obtener IPv4 desde req.ip (evita "::1" en localhost)
    const getIPv4 = (req) => {
        const ip = req.ip || req.connection.remoteAddress;
        return ip.includes('::ffff:') ? ip.split('::ffff:')[1] : ip; // Convierte IPv6 a IPv4
      };
}

    // el puerto en el que escucha el servidor
app.listen(port, () => {
        console.log(`Escuchando el puerto ${port}`);
    }
); 


// Uso middleware morgan para registrar las peticiones HTTP con Morgan

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//importar el middleware
const logger = require('./logger'); 
//validador de datos        
const Joi = require('joi');
// morgan
const morgan = require('morgan');

//archivos publicos express static
app.use(express.static('./05-Express-parte1/public'));

// usar el middleware morgan
// app.use(morgan('tiny'));
app.use(morgan('combined'));
// app.use(morgan('dev'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr :user-agent', { stream: accessLogStream }));

// Configurar el formato de logs más completo
// app.use(morgan((tokens, req, res) => {
//     return [
//       `[${new Date().toISOString()}]`,   // Fecha y hora
//       tokens.method(req, res),          // Método HTTP
//       tokens.url(req, res),             // URL solicitada
//       tokens.status(req, res),          // Código de estado HTTP
//       `${tokens['response-time'](req, res)} ms`, // Tiempo de respuesta
//       `IP: ${tokens['remote-addr'](req, res)}`,  // Dirección IP del cliente
//       `User-Agent: ${tokens['user-agent'](req, res)}`, // Agente de usuario
//       `Content-Length: ${tokens.res(req, res, 'content-length') || '0'} bytes`, // Tamaño de respuesta
//       `Referrer: ${tokens.referrer(req, res) || 'N/A'}`, // Referencia de origen
//       `Host: ${req.hostname}`,            // Host de la solicitud
//       `Headers: ${JSON.stringify(req.headers)}`,  // Todos los headers
//       `Body: ${JSON.stringify(req.body)}`,        // Cuerpo de la petición (si existe)
//       `Query Params: ${JSON.stringify(req.query)}`, // Parámetros de consulta (GET)
//       `Cookies: ${JSON.stringify(req.cookies || {})}`, // Cookies si están habilitadas
//     ].join(' | ');
//   }));

// Configurar Morgan para generar logs en formato JSON
// Configurar Morgan con salida en JSON
app.use(morgan((tokens, req, res) => {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
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
console.log('Morgan habilitado');




//usuarios de prueba
const usuarios = [
    {id: 1, nombre: 'juanito', correo: 'juanito@gmail.com'},
    {id: 2, nombre: 'pepito', correo: 'pepito@gmail.com'},
    {id: 3, nombre: 'jaimito', correo: 'jaimito@hotmail.com'}     
];  

// Consultar todos los usuarios
app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
});
// Consultar un usuario por id
app.get('/api/usuarios/:id', (req, res) => {
    let usuario =existeUsuario(req.params.id);
    if (!usuario) res.status(404).send('El usuario no fue encontrado');
    res.send(usuario);  
});




// metodo para verificar si existe el usuario
function existeUsuario(id){
    return (usuarios.find(u => u.id === parseInt(id)));
}
// validar usuario con Joi
function validarUsuario(usuario){
    nombre = usuario.nombre;
    correo = usuario.correo;
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/),
        correo: Joi.string().email()
    });
    return(schema.validate({nombre, correo}));
}


// el puerto en el que escucha el servidor
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
}
); 
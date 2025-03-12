// HTTP GET

const express = require('express');
// instanciar express
const app = express();
//variable puerto de la variable de entorno process.env.PORT o 3000
const port = process.env.PORT || 3000;
//usuarios de prueba 
const usuarios = [
    {id: 1, nombre: 'juanito'},
    {id: 2, nombre: 'pepito'},
    {id: 3, nombre: 'jaimito'}     
];       
// definir una ruta y metodo
// metodo peticion
app.get('/', (req, res) => {
    res.send('Hola Mundo desde Express Tipo GET');
}
);
// peticion con varios resultados
app.get('/api/usuarios', (req, res) => {
    res.send(['juanito', 'pepito', 'jaimito']);
}
);  
// peticion con parametros id
//http://167.88.42.221:5000/api/usuarios/2
// app.get('/api/usuarios/:id', (req, res) => {
//     res.send(req.params.id);
// }
// ); 

// peticion con parametros year y month
//http://167.88.42.221:5000/api/usuarios/1990/2
// app.get('/api/usuarios/:year/:month', (req, res) => {
//     res.send(req.params);
// }
// ); 

// peticion con parametros tipo query
//http://167.88.42.221:5000/api/usuarios/1990/2?sexo=M
app.get('/api/usuarios/:year/:month', (req, res) => {
    res.send(req.query);
}
);


// el puerte en el que escucha el servidor
app.listen(port, () => {
    // console.log('Servidor escuchando en http://localhost:3000...');
    console.log(`Escuchando el puerto ${port}`);
}
);

//Consulta de usuarios por id
app.get('/api/usuarios/:id', (req, res) => {
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) res.status(404).send('El usuario no fue encontrado');
    res.send(usuario);  
});



// export PORT=5000
// si se desea cambair de puerto


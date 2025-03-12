// HTTP POST
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//validador de datos
const Joi = require('joi');
const usuarios = [
    {id: 1, nombre: 'juanito', correo: 'juanito@gmail.com'},
    {id: 2, nombre: 'pepito', correo: 'pepito@gmail.com'},
    {id: 3, nombre: 'jaimito', correo: 'jaimito@hotmail.com'}     
];  

//usar middleware jason
app.use(express.json());

//definir una ruta y metodo
app.post('/', (req, res) => {
    res.send('Hola Mundo desde Express Tipo POST');
}
);  

//Consultar usuarios
app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
}
);


//Agregar un usuario
// post {"nombre" : "Pedro"}
//opcion1
app.post('/api/usuarios', (req, res) => {
    // validar informacion con Joi
    //    validar si no tiene nombre
    if(!req.body.nombre || req.body.nombre.length < 3){ {
    // 400 Bad Request
       res.status(400).send('Debe ingresar un nombre en formato JSON en el body o mayor a 2 caracteres');
       return;
   }}
   const usuario = {
       id: usuarios.length + 1,
       nombre: req.body.nombre
   };
   usuarios.push(usuario);
   res.send(usuario);
    }
    
);  


//Agregar un usuario
// post {"nombre" : "Pedro"}
//opcion1
app.post('/api/usuarios_joi', (req, res) => {
    // validar informacion con Joi
    //    validar si no tiene nombre
    const schema = Joi.object({
        // solo letras
        nombre: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/).required()
    });
    const {error,value} = schema.validate({nombre: req.body.nombre});
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            // nombre: req.body.nombre
            nombre: value.nombre

        };
        usuarios.push(usuario);
        res.send(usuario);
        
    }else{
        // 400 Bad Request
        // res.status(400).send(error.details[0].message);
        res.status(400).send(error);
        return;
    }
    }
    
);  

// Agregar un usuario con validacion de correo
// post {"nombre" : "Pedro", "correo": "pedrito@gmail.com"}
app.post('/api/usuarios_joi_correo', (req, res) => {
    // validar informacion con Joi
    //    validar si no tiene nombre
    
    const schema = Joi.object({
        // solo letras para nombre
        nombre: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/).required(),
        correo: Joi.string().email().required()
    });
    const {error,value} = schema.validate({nombre: req.body.nombre, correo: req.body.correo});
    
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            // nombre: req.body.nombre
            nombre: value.nombre,
            correo: value.correo
        };
        usuarios.push(usuario);
        res.send(usuario);
        
    }else{
        // 400 Bad Request
        // res.status(400).send(error.details[0].message);
        res.status(400).send(error);
        return;
    }
    }
);



// el puerto en el que escucha el servidor
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
}
); 


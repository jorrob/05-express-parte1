// metodo que permite hacer validaciones de datos

// Actuializar registros HTTP PUT

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//validador de datos        
const Joi = require('joi');
//usuarios de prueba
const usuarios = [
    {id: 1, nombre: 'juanito', correo: 'juanito@gmail.com'},
    {id: 2, nombre: 'pepito', correo: 'pepito@gmail.com'},
    {id: 3, nombre: 'jaimito', correo: 'jaimito@hotmail.com'}     
];  

//usar middleware jason
app.use(express.json());

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

// Crear un usuario POST
app.post('/api/usuarios', (req, res) => {
    
    const {error, value} = validarUsuario(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const usuario = {
        id: usuarios.length + 1,
        nombre: value.nombre,
        correo: value.correo
    };
    usuarios.push(usuario);
    res.send(usuario);
});

// Actualizar un usuario por id con PUT
app.put('/api/usuarios/:id', (req, res) => {
    
    let usuario = existeUsuario(req.params.id);
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    };
    
    // Validar la información
    const {error, value} = validarUsuario(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    usuario.nombre = value.nombre;
    usuario.correo = value.correo;
    res.send(usuario);
   
});

// Eliminar un usuario por id
app.delete('/api/usuarios/:id', (req, res) => {
    let usuario = existeUsuario(req.params.id);
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }
    console.log(usuario);
    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);
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


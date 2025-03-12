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
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) res.status(404).send('El usuario no fue encontrado');
    res.send(usuario);  
});


// Actualizar un usuario por id con PUT
app.put('/api/usuarios/:id', (req, res) => {
    // Encontrar el usuario
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    };
    
    // Validar la información
    const schema = Joi.object({
        // nombre: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/).required(),
        // correo: Joi.string().email().required()
        nombre: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/),
        correo: Joi.string().email()
    });

    const { error, value } = schema.validate({nombre: req.body.nombre, correo: req.body.correo});
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    usuario.nombre = value.nombre;
    usuario.correo = value.correo;
    res.send(usuario);


    
   
});


// el puerte en el que escucha el servidor
app.listen(port, () => {
    // console.log('Servidor escuchando en http://localhost:3000...');
    console.log(`Escuchando el puerto ${port}`);
}
);
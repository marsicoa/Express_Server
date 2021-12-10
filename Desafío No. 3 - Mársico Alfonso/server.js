const express = require ('express')
const Contenedor =  require('./Contenedor.js')
const random     = require('random')
const nuevoContenedor = new Contenedor('./productos.txt');
const PORT = 8080
const app = express()

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`);
})
 
server.on("error", error => console.log(`${error}`));

app.get('/', (req, res) => {
    res.send('Desafio No. 3 - Marsico Alfonso');
})

app.get('/productos', (req, res) => {
    try{
        res.send(nuevoContenedor.getAll())
    }
    catch (err) {
        console.log(err)
    }
})
 
app.get('/productoRandom', (req, res) => {
    try{
        const numeroRandom = () => {
           return nuevoContenedor.getById(random.int(1, 3))
        }
        res.send(numeroRandom())
    }
    catch (err) {
        console.log(err)
    }
})



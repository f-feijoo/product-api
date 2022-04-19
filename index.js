const express = require('express')
const productos = require('./routes/productos.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', productos)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http creado con express escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))

app.get('/', (req, res) => {
    res.send('<h1>Bienvenidos al desafio nº 4</h1>')
})


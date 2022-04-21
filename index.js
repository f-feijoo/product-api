const express = require('express')
const productos = require('./routes/productos.js')
const multer = require('multer')
const fs = require('fs')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', productos)

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads')
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

let upload = multer({storage})

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http creado con express escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/", upload.single('thumbnail'), (req, res) => {
    fs.readFile(`./productos.json`, 'utf-8', (err, data) => {
        if (err) {
            return({message: 'Error en la lectura'})
        }else{
            let arr = JSON.parse(data)
            let ind = arr[arr.length - 1]['id'] + 1
            let file = req.file;
            if (!file) {
                return res.status(400).send({message: "Error al cargar imagen"})
            }
            const {title, price} = req.body
            let productoNuevo = {
            title: title,
            price: price,
            thumbnail: file.path,
            id: ind
            }
            arr.push(productoNuevo)
            fs.writeFile('./productos.json', JSON.stringify(arr), 'utf-8', (err) => {
                if(err){
                    return 'Error al escribir'
                } else {
                    res.send({upload: 'ok', body: productoNuevo})
                }
            } )
                }
    })
})



const express = require(`express`)
const server = express()
const router=require("./routes/products.routes")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const puerto = 8080



// const productManager=require ("./productManager.js")


server.use("/api",router)

server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)
})

// server.get(`/products`, async (req, res) => {

//     if (req.query.limit){
//         let limit=parseInt(req.query.limit)
//         res.send(await productManager.store.getProductsLimit(limit))
//     }
//     else{
//         res.send(await productManager.store.getProducts())
//     }
// })

// server.get(`/products/:pid`, async (req, res) => {

//     let id=parseInt(req.params.pid)
//     res.send(await productManager.store.getProductById(id))

// })



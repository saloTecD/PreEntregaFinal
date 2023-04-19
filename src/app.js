const express = require(`express`)
const server = express()
const router=require("./routes/products.routes")
const routerCart=require("./routes/carts.routes")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const puerto = 8080






server.use("/api",router)
server.use("/api",routerCart)

server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)
})


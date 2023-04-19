const express = require("express")

const router = express.Router()
const cartManager = require("../cartManager")

router.post(`/carts`,async(req,res)=>{
    res.status(200).send(await cartManager.cart.createCart())
})


module.exports = router
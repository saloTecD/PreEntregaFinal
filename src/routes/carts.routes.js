const express = require("express")

const router = express.Router()
const cartManager = require("../cartManager")

router.post(`/carts`,async(req,res)=>{
    res.status(200).send(await cartManager.cart.createCart())
})

router.get(`/carts/:cid`,async(req,res)=>{
    let id=parseInt(req.params.cid)
    res.status(200).send(await cartManager.cart.listCartProducts(id))
})

router.post(`/carts/:cid/product/:pid`,async(req,res)=>{
    let cid=parseInt(req.params.cid)
    let pid=parseInt(req.params.pid)
    res.status(200).send(await cartManager.cart.addCartProduct(cid,pid))
})

module.exports = router
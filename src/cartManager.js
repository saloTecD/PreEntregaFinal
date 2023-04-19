const fs = require(`fs`)

class CartManager {
    static cid = 0;
    constructor(pathCustom) {
        // this.products = [];
        this.pathCustom = pathCustom;
    }

    writeToFile = async (cartProducts) => {
        await fs.promises.writeFile(this.pathCustom, JSON.stringify(cartProducts))
        console.log("Archivo Creado")
    }

    readFromFile =  async () => {
        const cartFile = await fs.promises.readFile(this.pathCustom, `utf-8`)
        
        let cartFiles = JSON.parse(cartFile)
        
        return cartFiles
    }

   async createCart(){
        let array=await this.readFromFile()
        let arrayActualizado=[...array]
        console.log(`array length: ${array.length}`)
        if(array.length==0){
            CartManager.cid++
        }else{
            CartManager.cid=arrayActualizado[arrayActualizado.length-1].id
            CartManager.cid++
            console.log(`Entro al else y el cid es ${CartManager.cid}`)
        }
        const newCart={
            id:CartManager.cid,
            products:[]
        }
        arrayActualizado.push(newCart)
        await this.writeToFile(arrayActualizado)
        return `Carrito con ID:${CartManager.cid} creado`
    }

    async listCartProducts(cid){
        let array=await this.readFromFile()
        const elemento=array.find(e=>e.id===cid)
        if(elemento===undefined){
            return "Este CID no existe"
        }
        else{
            return elemento.products
        }
    }

}



const cart = new CartManager(`./cart.json`)


module.exports={cart}
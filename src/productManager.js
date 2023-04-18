const fs = require(`fs`)

class ProductManager {
    static sid = 0;
    constructor(pathCustom) {
        this.products = [];
        this.pathCustom = pathCustom;
        // this.writeToFile(this.products)

    }
    writeToFile = async (productos) => {
        await fs.promises.writeFile(this.pathCustom, JSON.stringify(productos))
        console.log("Archivo Creado")
    }

    readFromFile =  async () => {
        const productosFile = await fs.promises.readFile(this.pathCustom, `utf-8`)
        
        let productosFiles = JSON.parse(productosFile)
        
        return productosFiles
    }


    async addProduct(title, description, price, thumbnails, code, stock) {
        let array=await this.readFromFile()
        let codigoRepetido = false
        let arrayActualizado=[...array]
        ProductManager.sid=arrayActualizado[arrayActualizado.length-1].id
        
        array.map((e) => {
            if (code === e.code) {
                return codigoRepetido = true
            } else {
                return codigoRepetido = false
            }
        })

        if (title == undefined || description == undefined || price == undefined || thumbnails == undefined || code == undefined || stock == undefined) {
            console.log("Se deben completar todos los campos para agregar el producto")
            return "Se deben completar todos los campos para agregar el producto"
        } else if (codigoRepetido == true) {
            console.log("El codigo del Producto ya esta registrado, por favor seleccionar otro codigo")
            return "El codigo ingresado ya existe, por favor seleccione otro"
        }
        else {
            ProductManager.sid++;
            const newProd = {
                id: ProductManager.sid,
                title: title,
                description: description,
                price: price,
                thumbnails: thumbnails,
                code: code,
                stock: stock,
                status:true
            }
            
            arrayActualizado.push(newProd)
            
            await this.writeToFile(arrayActualizado)
            return "Articulo agregado satisfactoriamente"
        }
        

    }

   

   async getProducts() {
        
            const arreglo = await this.readFromFile()
            console.log(arreglo)
            return arreglo
        }
       
    async getProductsLimit(n){
        const arreglo = await this.readFromFile()
        const arregloLimit=arreglo.slice(0,n)
        return arregloLimit
    }

    async getProductById(id) {
        const arreglo = await this.readFromFile()
        const elemento = arreglo.find(e => e.id === id)
        if (elemento === undefined) {
            console.log("Not found")
            return "Not Found"
        } else {
            console.log(elemento)
            return elemento
        }
    }

    async updateProduct(id, update) {
        const arreglo =await this.readFromFile()
        let arregloActualizado = [...arreglo]
        const indexElemento = arreglo.findIndex(e => {
            return e.id === id
        })
       
        if (indexElemento === -1) {
            console.log("Not found")
            return "Este producto no existe"
        } else {

            arregloActualizado[indexElemento] = { ...arregloActualizado[indexElemento], ...update }

            await this.writeToFile(arregloActualizado)
            return `El producto ${arregloActualizado[indexElemento].title} se ha actualizado`
        }
    }

    async deleteProduct(id){
        const arreglo = await this.readFromFile()
        let arregloActualizado = [...arreglo]
        const indexElemento = arreglo.findIndex(e => {
            return e.id === id
        })
        if (indexElemento === -1) {
            console.log("Not found")
            return "El producto con este id no existe"
        } else {
            arregloActualizado.splice(indexElemento,1)
            await this.writeToFile(arregloActualizado)
            console.log("elemento eliminado")
            return `Se ha eliminado el producto con el id ${id}`
        }
    }

}

const store = new ProductManager(`./productos.json`)

module.exports={store}
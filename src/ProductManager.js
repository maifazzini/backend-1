import fs from "fs";

class ProductManager {
    
    constructor() {
        this.path = './src/products.json'; 
    }
    generateNewId = (products) => {
        if (products.length > 0) {
            return products[products.length - 1].id + 1;
        } else {
            return 1;
        }
    }
    //? para agregar un producto
    addProduct = async (nuevousuario) => {
        try {
            //lee el archivo
            const productsJson = await fs.promises.readFile(this.path, "UTF-8");
            //lo pasa a array
            const products = JSON.parse(productsJson);
            //genera id
            const nuevoid = this.generateNewId(products);
            //genera un nuevo array con lo que esta añadiendo
            const productsnew = [...products, { id: nuevoid, ...nuevousuario }];
            // lo agrega al archivo
            await fs.promises.writeFile(this.path, JSON.stringify(productsnew, null, 2), "utf-8")
            return productsnew
        }
        catch (e) {
            console.log(e);
        }


    }
    //? para ver los productos
    getProducts = async () => {
        try {
            const productsJson = await fs.promises.readFile(this.path, "UTF-8");
            const products = JSON.parse(productsJson);
            return products;
        }
        catch (e) {
            console.log(e);
        }
    }
    //? para ver un producto por id
    getProductById = async (id) => {
        try {
            const productsJson = await fs.promises.readFile(this.path, "UTF-8");
            const products = JSON.parse(productsJson);
            //busca el producto
            const productid = products.find((product) => product.id === id)
            return productid;
        }
        catch (e) {
            console.log(e);
        }

    }
    //? para eliminar un producto por id
    deleteProductById = async (id) => {
        try {
            const productsJson = await fs.promises.readFile(this.path, "UTF-8");
            const products = JSON.parse(productsJson);
            //muestra todo menos ese producto
            const productsFilter = products.filter((product) => product.id != id);
            //lo borra del archivo
            await fs.promises.writeFile(this.path, JSON.stringify(productsFilter, null, 2), "utf-8") 
            return productsFilter
        }
        catch (e) {
            console.log(e);
        }

    }
    //? para actualizar un producto por id
    updatedProductById = async (id, updatedData) => {
        try {
            const productsJson = await fs.promises.readFile(this.path, "UTF-8");
            const products = JSON.parse(productsJson);
            // Busca el índice del producto a actualizar
            const index = products.findIndex(product => product.id == id);
            // agarra el array en la posicion esa y la modifica con la info actualizada
            products[index] = { ...products[index], ...updatedData};
            // Sobreescribe el archivo .json con el array actualizado
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8")
            return products
        }
        catch (e) {
            console.log(e);
        }


    }
}

export default ProductManager
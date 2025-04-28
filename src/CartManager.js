import fs from "fs";

class CartManager {
    
    constructor() {
        this.path ="./src/data/cart.json" 
    }
    generateNewId = (carts) => {
        if (carts.length > 0) {
            return carts[carts.length - 1].id + 1;
        } else {
            return 1;
        }
    }
    //? nuevo carrito
    addCart = async(products) => {
        try {
                    //lee el archivo
                    const cartsJson = await fs.promises.readFile(this.path, "UTF-8");
                    //lo pasa a array
                    const carts = JSON.parse(cartsJson);
                    //genera id
                    const idcarrito = this.generateNewId(carts);
                    //genera un nuevo array con el carrito nuevo
                    const cartsnew = [...carts, { id: idcarrito, products: products }];
                    // lo agrega al archivo
                    await fs.promises.writeFile(this.path, JSON.stringify(cartsnew, null, 2), "utf-8")
                    return cartsnew
                }
                catch (e) {
                    console.log(e);
                }
    }
    //? para ver los productos de un carrito por id del carrito
        getProductsInCartById = async (cid) => {
            try {
                const cartsJson = await fs.promises.readFile(this.path, "UTF-8");
                const carts = JSON.parse(cartsJson);
                //busca el carrito
                const cartid = carts.find((cart) => cart.id === cid)
                return cartid.products
            }
            catch (e) {
                console.log(e);
            }
    
        }
        //? para ver los productos de un carrito por id del carrito
        addProductInCart = async(cid,pid,quantity)=>{
            try{
                const cartsJson = await fs.promises.readFile(this.path, "UTF-8");
                const carts = JSON.parse(cartsJson);
                //busca el carrito
                const cartid = carts.find((cart) => cart.id === cid)
                //entrar al array de products del carrito seleccionado
                const cartidproducts = cartid.products
                //saber si el producto esta
                if (cartidproducts.some((product)=>product.id === pid)){
                    //buscar el producto
                    const productid = cartidproducts.find((product) => product.id === pid)
                    // sumarle la cantidad
                    productid.quantity= productid.quantity + quantity;
                }else{
                    //si no existe agregar el producto
                    cartidproducts.push({ id : pid , quantity: quantity });
                }
                // una vez que termina todo lo guardamos en carts.json
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), "utf-8")
                return carts
            }
            catch (e) {
                console.log(e);
            }
        }
}


export default CartManager
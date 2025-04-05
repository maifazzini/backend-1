import express from "express"
import ProductManager from "./ProductManager.js"
import CartManager from "./CartManager.js"
//creo servidor
const app= express();
//para que lea json
app.use(express.json())
//creo las instancias para poder usar los metodos
const productManager = new ProductManager();
const cartManager = new CartManager();

//? Manejo de Productos (/api/products/)
app.get("/api/products/", async(req,res)=>{
    const products = await productManager.getProducts();
    res.status(200).json({ products, message: "Productos mostrados con exito" });
})

app.get("/api/products/:pid", async(req,res)=>{
    const idProducto = req.params.pid
    const productId = await productManager.getProductById(parseInt(idProducto));
    res.status(200).json({ productId, message: "Producto encontrado y mostrado con exito" });
})
app.post("/api/products/", async(req,res)=>{
    const productos = await productManager.addProduct(req.body);
    res.status(201).json({ productos, message: "Producto añadido con exito" });
})
app.put("/api/products/:pid", async(req,res)=>{
        const idProducto = parseInt(req.params.pid);
        const data= req.body;
        const productos = await productManager.updatedProductById(idProducto,data);
        res.status(200).json({ productos, message: "Producto modificado con exito" });
    
})
app.delete("/api/products/:pid", async(req,res)=>{
    const idProducto = req.params.pid
    const Productid = await productManager.deleteProductById(parseInt(idProducto));
    res.status(200).json({ Productid, message: "Producto eliminado con exito"});
})

//? Manejo de Carritos (/api/carts/)
app.get("/api/carts/:cid", async(req,res)=>{
    const idCarrito = req.params.cid
    const carritoId = await cartManager.getCartById(parseInt(idCarrito));
    res.status(200).json({ carritoId, message: "Carrito encontrado y mostrado con exito" });
})
app.post("/api/carts/", async (req,res)=>{
    const cartNew= await cartManager.addCart(req.body)
    res.status(201).json({ cartNew, message: "Carrito creado con exito" });
})
app.post("/api/carts/:cid/product/:pid", async (req,res)=>{
    const idCarrito = parseInt(req.params.cid)
    const idProducto = parseInt(req.params.pid)
    const quantity=  req.body.quantity
    const cartaddproduct= await cartManager.addProductInCart(idCarrito,idProducto, quantity)
    res.status(200).json({ cartaddproduct, message: "Producto añadido con exito al carrito" });
})

//lo inicio en puerto 8080
app.listen(8080, ()=>{
    console.log("Servidor iniciado en puerto 8080")
})
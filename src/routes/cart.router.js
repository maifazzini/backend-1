import express from "express"
import CartManager from "../CartManager.js";

const cartRouter= express.Router();

//creo las instancias para poder usar los metodos
const cartManager = new CartManager();

//? Manejo de Carritos (/api/carts/)
cartRouter.get("/:cid", async(req,res)=>{
    const idCarrito = req.params.cid;
    const carritoId = await cartManager.getProductsInCartById(parseInt(idCarrito));
    res.status(200).json({ productosDelCarrito: carritoId, message: `Carrito con id = ${idCarrito}  encontrado y se muestran sus productos con exito` });
})
cartRouter.post("/", async (req,res)=>{
    const cartNew= await cartManager.addCart(req.body)
    res.status(201).json({ cartNew, message: "Carrito creado con exito" });
})
cartRouter.post("/:cid/product/:pid", async (req,res)=>{
    const idCarrito = parseInt(req.params.cid)
    const idProducto = parseInt(req.params.pid)
    const quantity=  req.body.quantity
    const cartaddproduct= await cartManager.addProductInCart(idCarrito,idProducto, quantity)
    res.status(200).json({ cartaddproduct, message: "Producto añadido con exito al carrito" });
})
export default cartRouter
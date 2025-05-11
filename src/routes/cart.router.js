import express from "express"
import {addProductInCartById, createCart, getCartById, deleteProductInCartById,deleteAllProductsInCart,updateAllProductsInCart, updateQuantityOfProductInCartById } from "../controllers/carts.controllers.js"

const cartRouter = express.Router();


//? Manejo de Carritos (/api/carts/) 
//*nuevos

//deberá eliminar del carrito el producto seleccionado.
cartRouter.delete("/:cid/products/:pid", deleteProductInCartById)
//deberá eliminar todos los productos del carrito 
cartRouter.delete("/:cid", deleteAllProductsInCart)
//deberá actualizar todos los productos del carrito con un arreglo de productos.
cartRouter.put("/:cid", updateAllProductsInCart)
//deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body en un objeto
cartRouter.put("/:cid/products/:pid", updateQuantityOfProductInCartById)

//* anteriores

//trae el carrito por su id y mustra un detalle completo del producto
cartRouter.get("/:cid", getCartById)
//crea un nuevo carrito vacio
cartRouter.post("/", createCart)
//agrega producto al carrito y si el producto existe suma las cantidades
cartRouter.post("/:cid/product/:pid", addProductInCartById)


export default cartRouter
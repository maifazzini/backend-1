import express from "express"
import {addProductInCartById, createCart, getCartById, deleteProductInCartById,deleteAllProductsInCart,updateAllProductsInCart, updateQuantityOfProductInCartById } from "../controllers/carts.controllers.js"

const cartRouter = express.Router();
/* o	PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body */

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
cartRouter.get("/:cid", getCartById)
cartRouter.post("/", createCart)
cartRouter.post("/:cid/product/:pid", addProductInCartById)
export default cartRouter
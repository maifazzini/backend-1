import express from "express"
import {getProductandPaginate , getProductbyId, updatebyId, addProduct, deletebyId} from "../controllers/products.controllers.js"

const productsRouter= express.Router();


//? Manejo de Productos (/api/products/)
productsRouter.get("/", getProductandPaginate)
productsRouter.get("/:pid", getProductbyId)
productsRouter.post("/", addProduct)
productsRouter.put("/:pid", updatebyId)
productsRouter.delete("/:pid", deletebyId)


export default productsRouter
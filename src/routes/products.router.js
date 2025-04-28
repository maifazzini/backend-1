import express from "express"
import ProductManager from "../ProductManager.js";

const productsRouter= express.Router();

//creo las instancias para poder usar los metodos
const productManager = new ProductManager();

//? Manejo de Productos (/api/products/)
productsRouter.get("/", async(req,res)=>{
    const products = await productManager.getProducts();
    res.status(200).json({ products, message: "Productos mostrados con exito" });
})

productsRouter.get("/:pid", async(req,res)=>{
    const idProducto = req.params.pid
    const productId = await productManager.getProductById(parseInt(idProducto));
    res.status(200).json({ productId, message: "Producto encontrado y mostrado con exito" });
})
productsRouter.post("/", async(req,res)=>{
    const productos = await productManager.addProduct(req.body);
    res.status(201).json({ productos, message: "Producto añadido con exito" });
})
productsRouter.put("/:pid", async(req,res)=>{
        const idProducto = parseInt(req.params.pid);
        const data= req.body;
        const productos = await productManager.updatedProductById(idProducto,data);
        res.status(200).json({ productos, message: "Producto modificado con exito" });
    
})
productsRouter.delete("/:pid", async(req,res)=>{
    const idProducto = req.params.pid
    const Productid = await productManager.deleteProductById(parseInt(idProducto));
    res.status(200).json({ Productid, message: "Producto eliminado con exito"});
})


export default productsRouter
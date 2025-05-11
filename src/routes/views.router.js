import express from "express"

import Productsdb from "../models/products.model.js";

import Cartsdb from "../models/carts.models.js"

const viewsRouter = express.Router();


viewsRouter.get("/products", async (req, res) => {
    const { limit = 10, page = 1, sort, category } = req.query;
    const filter = category ? { category: { $eq: category } } : {};
    const sortfilter = sort ? { price: sort === "desc" ? -1 : 1 } : {};
    try {
        const products = await Productsdb.paginate(filter, { limit: limit, page: page, sort: sortfilter, lean: true })

        const prevLink= products.hasPrevPage ? `${category?"?category="+category+"&":"?"}sort=${sort}&page=${products.prevPage}&limit=${limit}` : null
        const nextLink= products.hasNextPage ? `${category?"?category="+category+"&": "?"}sort=${sort}&page=${products.nextPage}&limit=${limit}` : null
        const productsnew= {...products, prevLink, nextLink} ;
        res.render("index", { productsnew });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos", error: error.message });
    }
} )
viewsRouter.get("/", async (req, res) => {
    try {
        const products = await Productsdb.find({}, {},{lean: true})
        res.render("home", { products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos", error: error.message });
    }
} )
viewsRouter.get("/realtimeproducts", async(req, res) => {
    try {
        const products = await  Productsdb.paginate({}, {lean:true});
        const array= products.docs
        res.render("realTimeProducts", {array});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
viewsRouter.get("/carts/:cid", async(req,res)=>{
    try {
        const cid=req.params.cid
        const cartid = await Cartsdb.findById(cid, { products: 1}, {lean:true}).populate("products.product");
         res.render("cart", { cartid });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default viewsRouter
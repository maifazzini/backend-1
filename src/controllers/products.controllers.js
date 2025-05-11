import Productsdb from "../models/products.model.js";

const getProductandPaginate = async (req, res) => {
    const { limit = 10, page = 1, sort, category } = req.query;
    const filter = category ? { category: { $eq: category } } : {};
    const sortfilter = sort ? { price: sort === "desc" ? -1 : 1 } : {};
    try {
        const products = await Productsdb.paginate(filter, { limit: limit, page: page, sort: sortfilter })
        const prevLink = products.hasPrevPage ? `?page=${products.prevPage}&limit=${limit}` : null
        const nextLink = products.hasNextPage ? `?page=${products.nextPage}&limit=${limit}` : null
        res.status(200).json({
            status: "success", payload: products, prevLink, nextLink
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar los productos", error: error.message });
    }
};

const getProductbyId = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const productid = await Productsdb.findById(idProducto)
        res.status(200).json({ status: "success", payload: productid });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al recuperar el producto", error: error.message });
    }
};

const updatebyId = async (req, res) => {
    try {
        const idProducto = req.params.pid;
        const data = req.body;
        const productoModificado = await Productsdb.findByIdAndUpdate(idProducto, data, { new: true, runValidators: true });
        if (!productoModificado) { return res.status(404).json({ status: "error", message: "No se encuentra un producto con ese id" }) }
        res.status(200).json({ status: "success", payload: productoModificado, message: "Producto modificado con exito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al modificar el producto", error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const product = req.body
        const newproduct = new Productsdb(product);
        await newproduct.save()
        res.status(201).json({ status: "success", payload: newproduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al cargar el nuevo producto", error: error.message });
    }
}

const deletebyId = async (req, res) => {
    try {
        const idProducto = req.params.pid
        const productoEliminado = await Productsdb.findByIdAndDelete(idProducto)
        if (!productoEliminado) { return res.status(404).json({ status: "error", message: "No se encuentra un producto con ese id" }) }
        res.status(200).json({ status: "success", payload: productoEliminado, message: "Producto eliminado con exito" })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al eliminar el producto", error: error.message });
    }
}

export { getProductandPaginate, getProductbyId, updatebyId, addProduct, deletebyId };

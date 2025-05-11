import Cartsdb from "../models/carts.models.js";

const getCartById= async (req, res) => {
    try {
        const idCarrito = req.params.cid;
        const productosDelCarrito = await Cartsdb.findById(idCarrito, { products: 1, _id: 0 }).populate("products.product")
        if (!productosDelCarrito) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        res.status(200).json({ status: "success", payload: productosDelCarrito })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al cargar el carrito" })
    }
}
const createCart= async (req, res) => {
    try {
        const productosDelCarrito = req.body;
        const cartNew = new Cartsdb(productosDelCarrito)
        await cartNew.save()
        res.status(201).json({ status: "success", payload: cartNew })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al crear el carrito", error: error.message })
    }
}

const addProductInCartById=async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        //encontrar carrito
        const carrito = await Cartsdb.findById(idCarrito)
        if (!carrito) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        const productoExistente = carrito.products.find((product) =>
            //paso a string el objet id y lo comparo
            product.product.toString() === pid)

        if (productoExistente) {
            // sumarle la cantidad
            productoExistente.quantity = productoExistente.quantity + quantity;
        } else {
            //si no existe agregar el producto
            carrito.products.push({ product:pid, quantity: quantity });
        }
        const nuevocarrito = await carrito.save();
        res.status(200).json({ status: "success", payload: nuevocarrito })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar producto del carrito", error: error.message })
    }

}

//* nuevos
const deleteProductInCartById= async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carritoId = await Cartsdb.findById(cid)
        if (!carritoId) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        const productosNuevos = carritoId.products.filter((product) =>
            //paso a string el objet id y lo comparo
            product.product.toString() !== pid)
        carritoId.products = productosNuevos

        await carritoId.save()
        res.status(200).json({ status: "success", payload: carritoId, message: "Producto eliminado con exito del carrito" })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al eliminar producto del carrito", error: error.message })
    }
}

const deleteAllProductsInCart= async (req, res) => {
    try {
        const { cid } = req.params;
        const carritoId = await Cartsdb.findById(cid)
        if (!carritoId) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        carritoId.products = [];
        await carritoId.save()
        res.status(200).json({ status: "success", payload: carritoId, message: "Se eliminaron todos los productos del carrito con exito" })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al eliminar todos los productos del carrito", error: error.message })
    }
}

const updateAllProductsInCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const data = req.body;
        const carritoUpdate = await Cartsdb.findByIdAndUpdate(cid, { products: data }, { new: true, runValidators: true })
        if (!carritoUpdate) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        res.status(200).json({ status: "success", payload: carritoUpdate, message: "Se modificaron todos los productos del carrito con exito" })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al modificar todos los productos del carrito", error: error.message })
    }
}

const updateQuantityOfProductInCartById= async (req, res) => {
    try {
        const idCarrito = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        //encontrar carrito
        const carrito = await Cartsdb.findById(idCarrito)
        if (!carrito) {
            res.status(404).json({ status: "error", message: "No se encontro un carrito con ese id" })
        }
        const productoExistente = carrito.products.find((product) =>
            //paso a string el objet id y lo comparo
            product.product.toString() === pid)
        if (productoExistente) {
            // cambiar la camtidad
            productoExistente.quantity = quantity;
        }
        const nuevocarrito = await carrito.save();
        res.status(200).json({ status: "success", payload: nuevocarrito })
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al modificar cantidad de un producto del carrito", error: error.message })
    }
}


export {addProductInCartById, createCart, getCartById, deleteProductInCartById,deleteAllProductsInCart,updateAllProductsInCart, updateQuantityOfProductInCartById }

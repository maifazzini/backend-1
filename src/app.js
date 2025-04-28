import express from "express"
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import http from "http"
import { engine } from "express-handlebars";
import ProductManager from "./ProductManager.js";

//?creo servidor
const app= express();
const server = http.createServer(app)
const io = new Server(server);
const PORT=8080

//?config
//hacer carpeta estatica
app.use(express.static("public"))
//para que lea json
app.use(express.json())
//para que reciba informacion
app.use(express.urlencoded({extended:true}))

//?handlebar
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//?websocket

//creo las instancias para poder usar los metodos
const productManager = new ProductManager();

io.on("connection", (socket)=>{
    
    socket.on("addNewProduct", async (data)=>{
        const newproduct= await productManager.addProduct(data)
        socket.emit("newproduct", newproduct)
    })
    socket.on("deleteproduct", async (data)=>{
        const id= parseInt(data.id);
        const newlistproduct= await productManager.deleteProductById(id)

        socket.emit("deletedproduct",newlistproduct)
    })
    console.log("cliente conectado")
})

//?endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

//lo inicio en puerto 8080
server.listen(PORT, ()=>{
    console.log("Servidor iniciado en puerto 8080")
})
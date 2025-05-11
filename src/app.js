import express from "express"
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import http from "http"
import { engine } from "express-handlebars";
import connectMongoDB from "./config/mobgodb.js";
import Productsdb from "./models/products.model.js";
import dotenv from "dotenv";
//var entorno
dotenv.config();

//?creo servidor
const app= express();
const server = http.createServer(app)
const io = new Server(server);
const PORT= process.env.PORT;

//?config
//hacer carpeta estatica
app.use(express.static("public"))
//para que lea json
app.use(express.json())
//para que reciba informacion
app.use(express.urlencoded({extended:true}))

//? base de datos
connectMongoDB()

//?handlebar
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//?websocket


io.on("connection", (socket)=>{
    
    socket.on("addNewProduct", async (data)=>{
        const newproduct= new Productsdb(data);
        await newproduct.save()
        socket.emit("newproduct", newproduct)
    })
    socket.on("deleteproduct", async (data)=>{
        const id= data.id;
        await Productsdb.findByIdAndDelete(id);
        const newlistproduct= await Productsdb.find()
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
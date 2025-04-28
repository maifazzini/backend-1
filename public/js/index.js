const socket = io();

const formulario = document.querySelector("#form-add-product");
const contenedorProductos = document.querySelector("#contenedor-productos");

const eliminarproducto= (id)=>{
    socket.emit("deleteproduct", {id})
    
}
socket.on("deletedproduct", (data)=>{
    if(data.length == 0){
        contenedorProductos.innerHTML = "<p> No hay productos para mostrar</p>"
    }else{

        contenedorProductos.innerHTML= data.map(element => {
        return`<div class="producto">
            <h3>${element.title}</h3>
            <p>${element.description}</p>
            <p>$ ${element.price}</p>
            <button onclick="eliminarproducto(${element.id})">Eliminar ${element.title}</button>
        </div>`
    }).join(``);
}
})
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const category = document.querySelector("#category").value;
    const stock = document.querySelector("#stock").value;
    const description = document.querySelector("#description").value;
    const code = document.querySelector("#code").value;
    socket.emit("addNewProduct", { title, price, description, code, stock, category })
    formulario.reset()
})

socket.on ("newproduct", (data)=>{
    contenedorProductos.innerHTML += `<div class="producto">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <p>$${data.price}</p>
                <button onclick="eliminarproducto(${data.id})">Eliminar ${data.title}</button>
            </div>`
})


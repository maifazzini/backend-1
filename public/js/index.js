//crear variable de carrito
let cartId;

// Crear carrito si no existe uno en localStorage
const createCartIfNeeded= async() =>{
    cartId = localStorage.getItem("cartId");
    if (!cartId) {
        try {
            const res = await fetch("/api/carts", {
                method: "POST",
            });
            const data = await res.json();
            if (data.status === "success") {
                cartId = data.payload._id;
                localStorage.setItem("cartId", cartId);
            }
        } catch (err) {
            console.log("Error al crear carrito:", err);
        }
        return cartId
    }
}

// Función para agregar un producto
const agregarProductoCarrito= async (id) => {
    await createCartIfNeeded();

    try {
        const res = await fetch(`/api/carts/${cartId}/product/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: 1 }),
                })
    } catch (err) {
        console.log("Error:", err);
    }
}
//para que se ejecute cuando carga la pagina
createCartIfNeeded();

let verCarrito = document.getElementById("vercarrito")

if(cartId){
    verCarrito.innerHTML= `<a href="/carts/${cartId}"> ver carrito</a>`;
}

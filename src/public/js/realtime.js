const socket = io()

const form = document.getElementById("productForm")
const list = document.getElementById("productList")

// CREAR PRODUCTO
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const product = {
        title: form.title.value,
        price: Number(form.price.value)
    }

    await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })

    // Avisamos al servidor que hay cambios
    socket.emit("updateProducts")

    form.reset()
})

// ELIMINAR PRODUCTO
function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE"
    }).then(() => {
        // Avisamos al servidor que hay cambios
        socket.emit("updateProducts")
    })
}

// CUANDO EL SERVIDOR AVISA → RECARGAMOS LA LISTA
socket.on("updateProducts", () => {
    location.reload()
})
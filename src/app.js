import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"

import { engine } from "express-handlebars"
import { Server } from "socket.io"
import { createServer } from "http"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("src/public"))

/* HANDLEBARS */
app.engine("handlebars", engine({
    defaultLayout: "main",
}))
app.set("view engine", "handlebars")
app.set("views", "src/views")

/* ROUTES */
app.use("/api/products", productsRouter(io))
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

/* SOCKETS */
io.on("connection", socket => {
    console.log("Cliente conectado por websocket")
        socket.on("updateProducts", () => {
        io.emit("updateProducts")
    })
})

httpServer.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080")
})
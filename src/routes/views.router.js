import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"
import path from "path"

const router = Router()

const manager = new ProductManager(
    path.resolve("src/data/products.json")
)

router.get("/", async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", { products })
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts()
    res.render("realTimeProducts", { products })
})

export default router
import { Router } from 'express'
import CartManager from '../managers/CartManager.js'

const router = Router()
const cartManager = new CartManager('./src/data/carts.json')

// POST crear carrito
router.post('/', async (req, res) => {
    const cart = await cartManager.createCart()
    res.status(201).json(cart)
})

// GET productos del carrito
router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid)

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    res.json(cart.products)
})

// POST agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cart = await cartManager.addProductToCart(
        req.params.cid,
        req.params.pid
    )

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    res.json(cart)
})

export default router
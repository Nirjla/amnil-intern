import express from "express";
import { addToCart, getCartByUserId, removeProductFromCart, updateCartQuantity } from "../controllers/cart.controller";
const Router = express.Router()

Router.post('/', addToCart)
Router.get('/:userId', getCartByUserId)
Router.put('/', updateCartQuantity)
Router.delete('/', removeProductFromCart)


export { Router as cartRouter }
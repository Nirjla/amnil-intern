import express from "express"
import { createCheckout } from "../controllers/checkout.controller"
import { authorization } from "../middlewares/authorization.middleware"
import { authentication } from "../middlewares/authentication.middleware"
const Router = express.Router()

Router.post('/', authentication, authorization(['user']), createCheckout)


export { Router as checkoutRouter }
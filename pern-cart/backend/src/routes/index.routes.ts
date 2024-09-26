import express from "express";
import { userRouter } from "./user.routes";
import { productRouter } from "./product.routes";
import { cartRouter } from "./cart.routes";
import { authentication } from "../middlewares/authentication.middleware";
import { authorization } from "../middlewares/authorization.middleware";
import { checkoutRouter } from "./checkout.routes";
import responseInterceptor from "../middlewares/responseInterceptor.middleware";
const Router = express.Router()

Router.use(responseInterceptor)
Router.use('/auth', userRouter)
Router.use('/products', productRouter)
Router.use('/cart', authentication, authorization(['user']), cartRouter)
Router.use('/checkout', checkoutRouter)
export { Router as indexRouter }
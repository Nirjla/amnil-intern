import express from "express"
import { userRouter } from "./user.route"
const indexRouter = express.Router()

indexRouter.use('/auth', userRouter)

export { indexRouter } 
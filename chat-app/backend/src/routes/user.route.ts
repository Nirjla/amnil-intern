import express, { Router } from "express"
import { getUserById, getUsers, login, register } from "../controllers/user.controller"
const userRouter: Router = express.Router()

userRouter.post('/register', register);
userRouter.post('/login', login)
userRouter.get('/users', getUsers)
userRouter.get('/user/:id', getUserById)

export { userRouter }
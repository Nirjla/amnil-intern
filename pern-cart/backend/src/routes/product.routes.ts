import express from "express"
import { createProducts, deleteProductById, getProductById, getProducts } from "../controllers/product.controller"
import { authentication } from "../middlewares/authentication.middleware"
import { authorization } from "../middlewares/authorization.middleware"
import { storage } from "../config/cloudinaryConfig"
import multer from "multer"
const Router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management
 */
const upload = multer({ storage })


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - imageUrl
 *               - imagePublicId
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               imagePublicId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */

Router.post('/', authentication, authorization(["admin"]), upload.single('image'),
      createProducts)
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   imagePublicId:
 *                     type: string
 *       400:
 *         description: Bad request
 */



Router.get('/', getProducts)
Router.get('/:id', getProductById)
Router.delete('/:id', authentication, authorization(["admin"]), deleteProductById)

export { Router as productRouter }

import express from "express";
import { getUsers, signin, signup } from "../controllers/user.controller";
import passport from "passport";

const Router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management
 */


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */


Router.post('/signup', signup);

/**
 * @swagger
 * components:
 *   securitySchemes:  
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:           
 *     UserSignIn:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           description: Role of the user (can be 'user' or 'admin')
 *           example: admin
 *     SignInResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           type: string
 *         token:
 *           type: string
 *           description: JWT token issued upon sign-in
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error Message
 * 
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user or admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignIn'
 *           example:
 *             email: admin@gmail.com
 *             password: adminPW
 *             role: admin
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse' 
 *       401:
 *         description: Invalid credentials
 *         
 *       403:
 *         description: Access denied 
 *       500:
 *          description: Internal Server Error
 */

Router.post('/signin', signin);

Router.get('/users', getUsers)

Router.get('/google', passport.authenticate('google', {
      scope: ["email", "profile"]
}))

Router.get('/google/callback', passport.authenticate("google"))

export { Router as userRouter };
